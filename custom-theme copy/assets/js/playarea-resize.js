document.addEventListener("DOMContentLoaded", function() {
    function setPlayAreaHeight() {
      const playArea = document.getElementById("cat-play-area");
      if (playArea) {
        // Get the distance from the top of the play area to the top of the viewport.
        const rect = playArea.getBoundingClientRect();
        const topOffset = rect.top;
        // Set the play area's height so its bottom touches the bottom of the viewport.
        playArea.style.height = (window.innerHeight - topOffset) + "px";
      }
    }
    
    setPlayAreaHeight();
    window.addEventListener("resize", setPlayAreaHeight);
  });