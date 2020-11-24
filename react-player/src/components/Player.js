import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft,faPause, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import {playAudio} from '../util'

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs, setCurrentSong, setSongs }) => {

    //use effect
    useEffect(() => {
    const newSongs = songs.map((song) => {
      if(song.id === currentSong.id){
        return{
          ...song,
          active: true,
        }
      }else{
        return{
          ...song,
          active: false,
        }
      }
    });
    setSongs(newSongs);
  }, [currentSong]);

    //eventhandlers------------------------------------------>
    const playSongHandler = () => {
      if(isPlaying) {
        audioRef.current.pause()
        setIsPlaying(!isPlaying)
      }else {
        audioRef.current.play()
        setIsPlaying(!isPlaying)
      }
    };

    const getTime = (time) => {
      return(
        Math.floor(time / 60) + ':' +('0' + Math.floor(time % 60)).slice(-2)
      )
    };

    const dragHandler = (e) =>{
      audioRef.current.currentTime = e.target.value
      setSongInfo({...songInfo, currentTime: e.target.value})
    };

    const skipDragHandler = (direction) => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      if(direction === 'skip-forward') {
        setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      }
      if(direction ==='skip-back'){
        if((currentIndex - 1) % songs.length === -1){
          setCurrentSong(songs[songs.length - 1]);
          playAudio(isPlaying, audioRef);
          return
        }
        setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      }
      playAudio(isPlaying, audioRef);
    };
    //Add styles
    const trackAnim = {
      transform: `translateX(${songInfo.animationPercentage}%)`
    };


    return (
      <div className='player'>
        <div className='time-control'>
          <p>{getTime(songInfo.currentTime)}</p>
          <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}  className="track">
          <input 
            min={0} 
            max={songInfo.duration || 0} 
            value={songInfo.currentTime}
            onChange={dragHandler} 
            type='range' 
          />
          <div className="animate-track" style={trackAnim}></div>
          </div>
          <p>{songInfo.duration ? getTime(songInfo.duration) : '00:00'}</p>
        </div>
        
        <div className="play-control">
          <FontAwesomeIcon 
            onClick={()=> skipDragHandler('skip-back')}
            className='skip-back' 
            icon={faAngleLeft} 
            size='2x'
          />
          <FontAwesomeIcon 
            onClick={playSongHandler} 
            className='play' 
            icon={isPlaying ? faPause : faPlay} 
            size='2x'
          />
          <FontAwesomeIcon 
            onClick={()=> skipDragHandler('skip-forward')}
            className='skip-forward' 
            icon={faAngleRight} 
            size='2x'
          />
        </div>
      </div>
    )
}

export default Player
