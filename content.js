var VideoSpeed = 1; // Default playback speed
var backFromAd = 0;

// Listen for changes in the YouTube video player
const observer = new MutationObserver(() => {
  const video = document.querySelector("video");
  if (video) {
    console.log("-* Current Video Speed: ", VideoSpeed);
    const isAd = document.querySelector('.ad-showing'); // Check if an ad is playing

    if (isAd) {
      // Ad is playing
      const delay = Math.random() * 0.5 + 0.5; // Random delay between 0.5 and 1 second
      backFromAd = 0; // Reset backFromAd counter
      setTimeout(() => {
        video.playbackRate = 10; // Speed up during the ad
      }, delay * 1000);
    } else {
      // Regular content is playing
      if (backFromAd === 0) {
        // First frame after returning from an ad, restore the saved speed
        video.playbackRate = VideoSpeed;
      } else {
        // Save the current speed if it's not already saved
        VideoSpeed = video.playbackRate;
      }
      backFromAd++;
    }
  }
});

// Observe the DOM for changes in the video player container
observer.observe(document.body, {
  childList: true,
  subtree: true
});
