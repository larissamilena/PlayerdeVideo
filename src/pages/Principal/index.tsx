import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeOff, FaPlay, FaPause } from 'react-icons/fa';
import {
    Canvas,
    Container,
    Conteudo,
    MuteIcon,
    PlayControls,
    PlayIcon,
    Time,
    TimeContainer,
    TimeTotal,
    Video,
    ContainerVideo,
    VolumeControl,
    Buttons,
    Button
} from '../../styles';
const Home: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const [video, setVideo] = useState<string>("");
    const [volume, setVolume] = useState<number>(1);
    const [gray, setGray] = useState<number>(1);
    const [redF, setRed] = useState<number>(0);
    const [blueF, setBlue] = useState<number>(0);
    const [greenF, setGreen] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(1);
    const [lastVolume, setLastVolume] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(false);
    //const [time, setTime] = useState<number>(0);

    var updatedImages = Array<string>();
    var cont = 0;

    useEffect(() => {
        configVideo("./videos/video.mp4");
    }, []);

    /*useEffect(()=> {
        setTimeout(() => {
            setTime(time - 1);
            setImages(updatedImages);
            alert(updatedImages.length);
        }, 3000);
    }, [time]);*/

    const draw = () => {

        if (videoRef.current != null) {

            const playingVideo = videoRef.current;
            if (playingVideo.paused || playingVideo.ended) return;

            const x = 0;
            const y = 0;
            if (canvasRef.current != null) {

                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");
                if (context != null) {

                    context.drawImage(playingVideo, x, y, canvas.width, canvas.height);
                    const imageData = context.getImageData(x, y, canvas.width, canvas.height);
                    const data = imageData.data;
                    console.log(data.length);

                    for (var i = 0; i < data.length; i += 4) {
                        const red = data[i];
                        const green = data[i + 1];
                        const blue = data[i + 2];

                        if (gray === 3) {
                            const media = (red + green + blue) / gray;
                            data[i] = media;
                            data[i + 1] = media;
                            data[i + 2] = media;
                        }
                        if(redF === 1){
                            data[i] = red;
                            data[i + 1] = 0;
                            data[i + 2] = 0;
                        }
                        if(blueF === 1){
                            data[i] = 0;
                            data[i + 1] = 0;
                            data[i + 2] = green;
                        }
                        if(greenF === 1){
                            data[i] = 0;
                            data[i + 1] = blue;
                            data[i + 2] = 0;
                        }
                    }
                    context.putImageData(imageData, x, y);
                    if (cont++ % 30 === 0) {
                        const imageUrl = canvas.toDataURL("image/png");
                        updatedImages = [...updatedImages, imageUrl];
                        const image = new Image();
                        image.src = imageUrl;
                        if (divRef.current != null) {
                            divRef.current.appendChild(image);
                        }
                    }
                }
            }

        }
        requestAnimationFrame(draw);
    }

    useEffect(() => {

    }, [video]);

    const configVideo = (videoUrl: string) => {
        setVideo(videoUrl);

        const video = videoRef.current;
        if (video != null) {

            video.onloadedmetadata = () => {
                setTotalTime(video.duration);
            }

            video.ontimeupdate = () => {
                setCurrentTime(video.currentTime);
            }
        }
    }

    const toonglePlayPause = () => {
        const updatedIsPlaying = !isPlaying;
        if (isPlaying) {
            pause();
        }
        else {
            play();
        }
        setIsPlaying(updatedIsPlaying);
    }
    const convertTimeToString = (time: number) => {
        const minutes = Math.trunc(time / 60);
        const seconds = Math.trunc(time % 60);
        return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
    }
    const configMute = () => {
        const updatedMute = !isMute;
        const video = videoRef.current;
        if (video != null) {
            video.muted = updatedMute;
            setIsMute(updatedMute);
            if (updatedMute) {
                setLastVolume(volume);
                video.volume = 0;
                setVolume(0);
            }
            else {
                video.volume = lastVolume;
                setVolume(lastVolume);
            }
        }
    }

    const configCurrentTime = (time: number) => {
        const video = videoRef.current;
        if (video != null) {
            video.currentTime = time;
            setCurrentTime(time);
        }
    }

    const configVolume = (value: number) => {
        const video = videoRef.current;
        if (video != null) {
            video.volume = value;
            setLastVolume(volume);
            setVolume(value);
            if (value === 0) {
                video.muted = true;
                setIsMute(true);

            }
            else {
                video.muted = false;
                setIsMute(false);
            }
        }
    }
    const setCinza = () => {
        setRed(0);
        setBlue(0);
        setGreen(0);
        setGray(3);
        toonglePlayPause();
    }
    const setVermelho = () => {
        setRed(1);
        setBlue(0);
        setGreen(0);
        setGray(1);
        toonglePlayPause();
    }
    const setAzul = () => {
        setRed(0);
        setBlue(1);
        setGreen(0);
        setGray(1);
        toonglePlayPause();
    }
    const setVerde = () => {
        setRed(0);
        setBlue(0);
        setGreen(1);
        setGray(1);
        toonglePlayPause();
    }
    const setColorido = () => {
        setRed(0);
        setBlue(0);
        setGreen(0);
        setGray(1);
        toonglePlayPause();
    }

    const play = () => {
        const video = videoRef.current;
        if (video != null) {
            video.play();
            draw();
        }
    }

    const pause = () => {
        const video = videoRef.current;
        if (video != null) {
            video.pause();
        }
    }
    return (
        <Container >
            <ContainerVideo>

                <Canvas ref={canvasRef} onClick={toonglePlayPause}></Canvas>
                <Video>
                    <Conteudo src="./videos/video.mp4" ref={videoRef} hidden ></Conteudo>

                    <TimeContainer >
                        <Time

                            type="range"
                            min={0}
                            max={totalTime}
                            value={currentTime}
                            onChange={e => configCurrentTime(Number(e.target.value))}
                        />
                    </TimeContainer>

                    <PlayControls >
                        {isPlaying ?
                            (<PlayIcon onClick={toonglePlayPause}> <FaPause /></PlayIcon>)
                            :
                            (<PlayIcon onClick={toonglePlayPause} ><FaPlay /></PlayIcon>)
                        }
                        {isMute ?
                            (<MuteIcon onClick={configMute}><FaVolumeOff /></MuteIcon>)
                            :
                            (<MuteIcon onClick={configMute}><FaVolumeUp /></MuteIcon>)
                        }
                        <VolumeControl
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={e => configVolume(Number(e.target.value))}
                        >
                        </VolumeControl>
                        <TimeTotal >
                            <span>{convertTimeToString(currentTime)}</span> / <span>{convertTimeToString(totalTime)}</span>
                        </TimeTotal>
                    </PlayControls>
                </Video>
            </ContainerVideo>
            <Buttons>
                <Button onClick={setVermelho}>Vermelho</Button>
                <Button onClick={setAzul}>Azul</Button>
                <Button onClick={setVerde}>Verde</Button>
                <Button onClick={setColorido}>Colorido</Button>
                <Button onClick={setCinza}>Preto e Branco</Button>
            </Buttons>
        </Container>
    );

}

export default Home;