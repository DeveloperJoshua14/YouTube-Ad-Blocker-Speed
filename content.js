var UserSpeed = 1;         // Defualt Video Speed *Changes*
const adSpeed = 10;      // Amount Multiplied
const adDelay = 0.5;       // Second(s) till ad FF's (Always +/- 0.25 seconds)
const StartingAdDelay = 2; // Extra second(s) till the first ad FF's
var startingAd = true;     // Is this a starting ad
var wasJustAd = false;
var currentTimeInVideo = 0;
var adSpeedSet = false;
var urlCode = window.location.href.substring(10).substring(window.location.href.substring(10).indexOf('/')+1);
console.warn("== RESET ):");

// Listen for changes in the YouTube video player
const observer = new MutationObserver(() => {
  const video = document.querySelector("video");

  if (video) {
    // setTimeout(() => {}, 500);

    if (window.location.href.substring(10).substring(window.location.href.substring(10).indexOf('/')+1) != urlCode){
      startingAd = true;
      video.playbackRate = UserSpeed;
      urlCode = window.location.href.substring(10).substring(window.location.href.substring(10).indexOf('/')+1);
    }
    const isAd = document.querySelector('.ad-showing'); // Check if an ad is playing

    if (!isAd) {
      currentTimeInVideo = video.currentTime;
    }

    console.warn("=U UserSpeed    : ", UserSpeed);
    console.warn("=s startingAd   : ", startingAd);
    console.warn("=R playbackRate : ", video.playbackRate);
    console.warn("=a isAd         : ", isAd != null);

    if (isAd) {

      if (currentTimeInVideo <= 1) {
        startingAd = true;
      }

      wasJustAd = true;


      // Ad is playing
      var delay = adDelay + Math.random() * 0.5 + 0.25;
      if (startingAd){
        delay = delay + StartingAdDelay; // Random delay between 0.5 and 1 second; // Random delay between 2.5 and 3 second (Bypass "Using Ad Block" banner)
      }
      if (!adSpeedSet){
        adSpeedSet = true;
        setTimeout(() => {
          video.playbackRate = 10; // Speed up during the ad
        }, delay * 1000);
      }
      
    } else {

      if (wasJustAd){
        video.playbackRate = UserSpeed;
        wasJustAd = false;
      } else {
        UserSpeed = video.playbackRate;
      }

      adSpeedSet = false;
      startingAd = false;

    }
  }
});

// Observe the DOM for changes in the video player container
observer.observe(document.body, {
  childList: true,
  subtree: true
});
