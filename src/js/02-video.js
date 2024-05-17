// Import necessary libraries
import { Player } from '@vimeo/player';
import throttle from 'lodash.throttle';

// Initialize Vimeo Player
const vimeoPlayer = new Player('vimeo-player');

// Track playback time and save to local storage
vimeoPlayer.on('timeupdate', throttle(async (event) => {
    const currentTime = await vimeoPlayer.getCurrentTime();
    localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000)); // Throttle to update local storage at most once per second

// Retrieve playback time from local storage on page load
document.addEventListener('DOMContentLoaded', async () => {
    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime) {
        await vimeoPlayer.setCurrentTime(parseFloat(savedTime));
    }
});

