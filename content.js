(function () {
  const attachObserver = () => {
    const player = document.querySelector('ytd-player');

    if (!player) {
      console.log('YouTube player not found.');
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isAdShowing = player.classList.contains('ad-showing');
          const adOverlay = document.querySelector('.ytp-ad-player-overlay');

          if (isAdShowing || adOverlay) {
            alert('An ad is currently playing.');
          } else {
            console.log('Ad has ended or not playing.');
          }
        }
      });
    });

    observer.observe(player, { attributes: true });
    console.log('Observer attached to YouTube player.');
  };

  const initObserver = () => {
    const bodyObserver = new MutationObserver(() => {
      attachObserver();
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true });
    console.log('Body observer initialized.');
  };

  initObserver();
})();
