var VideoSpeed = 1;
var backFromAd = 0;

// Listen for changes in the YouTube video player
const observer = new MutationObserver(() => {
  const video = document.querySelector("video");
  if (video) {
    console.log("-* Current Video Speed: ", VideoSpeed)
    const isAd = document.querySelector('.ad-showing'); // Check if an ad is playing
    
    if (!isAd && backFromAd > 0) {
      VideoSpeed = video.playbackRate;
    }
    
    if (isAd) {
      const delay = Math.random() * 0.5 + 0.5; // Random number between 0.5 and 1
      backFromAd = 0

      // Set a timeout before speeding up the ad
      setTimeout(() => {
        video.playbackRate = 10; // Speed up during the ad
      }, delay * 1000);
    } else {
      // if (backFromAd > 5){
      //   video.playbackRate = parseFloat(VideoSpeed.toFixed(2)); // Reset speed for regular content
      // }
      backFromAd++;

      video.playbackRate = 2; //Fix for now ):

    }
  }
});

// Observe the DOM for changes in the video player container
observer.observe(document.body, {
  childList: true,
  subtree: true
});