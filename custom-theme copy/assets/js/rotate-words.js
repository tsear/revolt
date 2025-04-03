document.addEventListener("DOMContentLoaded", function() {
    // Array of words to cycle through
    var words = ["Startups", "Entrepreneurs", "Bloggers", "Musicians", "Weirdos", "Promoters", "Foodies", "Everyone"];
    var currentIndex = 0;
    var rotatingWord = document.getElementById("rotating-word");
  
    // If the element doesn't exist, stop here
    if (!rotatingWord) return;
  
    setInterval(function() {
      // Fade out the current word
      rotatingWord.style.opacity = 0;
  
      // Wait for the fade-out effect to complete (500ms)
      setTimeout(function() {
        // Increment the index and wrap around if necessary
        currentIndex = (currentIndex + 1) % words.length;
        // Change the text to the next word
        rotatingWord.textContent = words[currentIndex];
        // Fade in the new word
        rotatingWord.style.opacity = 1;
      }, 500);
    }, 3000); // Change word every 3 seconds
  });