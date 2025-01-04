document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        document.getElementById("time").textContent = "No active tab found.";
        return;
      }
  
      // Send message to content script
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getVideoTime" },
        (response) => {
          // Handle response or error
          if (chrome.runtime.lastError) {
            // Content script not available
            document.getElementById("time").textContent =
              "This extension only works on YouTube video pages.";
          } else if (response && response.currentTime && response.totalTime) {
            document.getElementById("time").textContent = `${response.currentTime} out of ${response.totalTime}`;
          } else {
            document.getElementById("time").textContent =
              "Unable to fetch video time.";
          }
        }
      );
    });
  });
  