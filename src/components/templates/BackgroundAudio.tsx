import { useState, useEffect, useMemo } from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import {
  Audiotrack,
  VolumeMute,
  VolumeUp,
  PlayArrow,
  Pause,
  Close,
} from '@mui/icons-material';

import sound from '../../assets/sounds/fluffing_a_duck.mp3';
import {
  BACKGORUND_MUSIC_PAUSE,
  BACKGORUND_MUSIC_VOLUME,
} from '../../constants/localStorage';

export const BackgroundAudio = () => {
  const initIsPaused = 'true' === localStorage.getItem(BACKGORUND_MUSIC_PAUSE);
  const initVolume = localStorage.getItem(BACKGORUND_MUSIC_VOLUME);

  const [isPaused, setIsPaused] = useState(initIsPaused);
  const [volume, setVolume] = useState(0.5);

  const myAudio = useMemo(() => new Audio(sound), []);

  const onPlay = () => {
    setIsPaused(false);
    myAudio.play();
    localStorage.setItem(BACKGORUND_MUSIC_PAUSE, 'false');
  };

  const onPause = () => {
    setIsPaused(true);
    myAudio.pause();
    localStorage.setItem(BACKGORUND_MUSIC_PAUSE, 'true');
  };

  const setNewVolume = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem(BACKGORUND_MUSIC_VOLUME, `${newVolume}`);
    myAudio.volume = newVolume;
  };

  useEffect(() => {
    const volumeNum = Number(initVolume);

    if (!isNaN(volumeNum) && 0.1 <= volumeNum && 1 >= volumeNum) {
      setNewVolume(volumeNum);
    } else {
      setNewVolume(0.5);
    }

    if (!initIsPaused) {
      onPlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPlayToggle = () => (isPaused ? onPlay() : onPause());

  const onVolumeUp = () => {
    if (volume >= 1) return;
    const newVolume = (Math.round(volume * 10) + 1) / 10;
    setNewVolume(newVolume);
  };

  const onVolumeMute = () => {
    if (volume <= 0.1) return;
    const newVolume = (Math.round(volume * 10) - 1) / 10;
    setNewVolume(newVolume);
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 8, left: 8 }}
        icon={<SpeedDialIcon icon={<Audiotrack />} openIcon={<Close />} />}
      >
        <SpeedDialAction
          icon={isPaused ? <PlayArrow /> : <Pause />}
          tooltipTitle={isPaused ? 'Play' : 'Pause'}
          onClick={onPlayToggle}
        />

        <SpeedDialAction icon={Math.round(volume * 10)} tooltipTitle="Volume" />

        <SpeedDialAction
          icon={<VolumeMute />}
          tooltipTitle="Volume Mute"
          disableTouchListener={volume <= 0}
          onClick={onVolumeMute}
        />

        <SpeedDialAction
          icon={<VolumeUp />}
          tooltipTitle="Volume Up"
          disableTouchListener={volume >= 1}
          onClick={onVolumeUp}
        />
      </SpeedDial>
    </>
  );
};
