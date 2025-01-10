var UserSpeed = 1;         // Defualt Video Speed *Changes*
const adSpeed = 10.1;      // Amount Multiplied
const adDelay = 0.5;       // Second(s) till ad FF's (Always +/- 0.25 seconds)
const StartingAdDelay = 2; // Extra second(s) till the first ad FF's
var startingAd = true;     // Is this a starting ad
var urlCode = window.location.href.substring(10).substring(window.location.href.substring(10).indexOf('/')+1);

// Listen for changes in the YouTube video player
const observer = new MutationObserver(() => {
  const video = document.querySelector("video");
  if (video) {
    // setTimeout(() => {}, 500);
    console.warn("== UserSpeed    : ", UserSpeed);
    console.warn("== startingAd   : ", startingAd);
    console.warn("== playbackRate : ", video.playbackRate);

    if (window.location.href.substring(10).substring(window.location.href.substring(10).indexOf('/')+1) != urlCode){
      startingAd = true;
      urlCode = window.location.href.substring(10).substring(window.location.href.substring(10).indexOf('/')+1);
    }
    const isAd = document.querySelector('.ad-showing'); // Check if an ad is playing

    if (isAd) {

      if (video.playbackRate != adSpeed){
        UserSpeed = video.playbackRate;
      }

      // Ad is playing
      var delay = adDelay + Math.random() * 0.5 + 0.25;
      if (startingAd){
        delay = delay + StartingAdDelay; // Random delay between 0.5 and 1 second; // Random delay between 2.5 and 3 second (Bypass "Using Ad Block" banner)
      }
      setTimeout(() => {
        video.playbackRate = 10; // Speed up during the ad
      }, delay * 1000);
    } else {

      if (video.playbackRate == adSpeed){
        video.playbackRate = UserSpeed;
      } else {
        UserSpeed = video.playbackRate;
      }

      startingAd = false;

    }
  }
});

// Observe the DOM for changes in the video player container
observer.observe(document.body, {
  childList: true,
  subtree: true
});
