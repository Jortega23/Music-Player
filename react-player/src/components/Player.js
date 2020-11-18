import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft,faPause, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs, setCurrentSong }) => {

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
        setCurrentSong(songs[currentIndex + 1]);
      }
    }


    return (
      <div className='player'>
        <div className='time-control'>
          <p>{getTime(songInfo.currentTime)}</p>
          <input 
            min={0} 
            max={songInfo.duration || 0} 
            value={songInfo.currentTime}
            onChange={dragHandler} 
            type='range' 
          />
          <p>{getTime(songInfo.duration)}</p>
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
