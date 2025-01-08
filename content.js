var oldVideoSpeed;
var VideoSpeed = -2;

// Listen for changes in the YouTube video player
const observer = new MutationObserver(() => {
  const video = document.querySelector("video");
  console.log("-- Location 1: ");
  console.log("-- video.playbackRate: ", video.playbackRate);
  console.log("-- oldVideoSpeed: ", oldVideoSpeed);
  console.log("-- VideoSpeed: ", VideoSpeed);
  oldVideoSpeed = VideoSpeed;
  VideoSpeed = video.playbackRate;
  console.log("-- Location 2: ");
  console.log("-- oldVideoSpeed: ", oldVideoSpeed);
  console.log("-- VideoSpeed: ", VideoSpeed);
  if (oldVideoSpeed == -2){
    oldVideoSpeed = VideoSpeed;
  }
  console.log("-- Location 3: ");
  console.log("-- video.playbackRate: ", video.playbackRate);
  console.log("-- oldVideoSpeed: ", oldVideoSpeed);
  console.log("-- VideoSpeed: ", VideoSpeed);

  if (video) {
    const isAd = document.querySelector('.ad-showing'); // Check if an ad is playing
    if (isAd) {
      console.log("-- ADD WAS LOADED");
      const delay = Math.random() * 0.5 + 0.5; // Random number between 0.5 and 1

      // Set a timeout before speeding up the ad
      setTimeout(() => {
        video.playbackRate = 10; // Speed up during the ad
        console.log("-- SPEED UP");
      }, delay * 1000);
    } else {
      video.playbackRate = oldVideoSpeed; // Reset speed for regular content
      console.log("-- RESET");
    }
  }
});

// Observe the DOM for changes in the video player container
observer.observe(document.body, {
  childList: true,
  subtree: true
});