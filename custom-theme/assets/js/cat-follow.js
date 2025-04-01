document.addEventListener('DOMContentLoaded', function () {
    const cat = document.getElementById('cat');
  
    window.addEventListener('mousemove', function (e) {
      const x = e.clientX;
      if (cat) {
        cat.style.transform = `translateX(${x - cat.offsetWidth / 2}px)`;
      }
    });
  });