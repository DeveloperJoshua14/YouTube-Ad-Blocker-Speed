var VideoSpeed;

// Listen for changes in the YouTube video player
const observer = new MutationObserver(() => {
  const video = document.querySelector("video");
  if (video) {
    const isAd = document.querySelector('.ad-showing'); // Check if an ad is playing
    
    if (!isAd) {
      VideoSpeed = video.playbackRate;
    }
    
    if (isAd) {
      const delay = Math.random() * 0.5 + 0.5; // Random number between 0.5 and 1

      // Set a timeout before speeding up the ad
      setTimeout(() => {
        video.playbackRate = 10; // Speed up during the ad
      }, delay * 1000);
    } else {
      video.playbackRate = VideoSpeed; // Reset speed for regular content
    }
  }
});

// Observe the DOM for changes in the video player container
observer.observe(document.body, {
  childList: true,
  subtree: true
});