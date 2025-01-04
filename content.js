// Listen for changes in the YouTube video player
const observer = new MutationObserver(() => {
    const video = document.querySelector("video");
    if (video) {
      const isAd = document.querySelector('.ad-showing'); // Check if an ad is playing
      if (isAd) {
        video.playbackRate = 12; // Speed up during the ad
      } else {
        video.playbackRate = 1; // Reset speed for regular content
      }
    }
  });
  
  // Observe the DOM for changes in the video player container
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  