

jQuery(document).ready(function($) {
    console.log('Custom slider JS file loaded and jQuery ready.');
  
    var slider = $('#slider');
    if (!slider.length) {
      console.error('Slider element not found.');
      return;
    } else {
      console.log('Slider element found.');
    }
    
    var dots = $('.dot');
    if (!dots.length) {
      console.error('No dot elements found.');
      return;
    } else {
      console.log('Found ' + dots.length + ' dot(s).');
    }
    
    var leftControl = $('#leftControl');
    if (!leftControl.length) {
      console.error('Left control element not found.');
      return;
    } else {
      console.log('Left control element found.');
    }
    
    var rightControl = $('#rightControl');
    if (!rightControl.length) {
      console.error('Right control element not found.');
      return;
    } else {
      console.log('Right control element found.');
    }
    
    var totalSlides = slider.children().length;
    console.log('Total slides: ' + totalSlides);
    var currentSlide = 0;
  
    function updateSlider() {
      slider.css('transform', 'translateX(-' + (currentSlide * 100) + '%)');
      console.log('Updated slider to slide ' + currentSlide);
      updateDots();
    }
  
    function updateDots() {
      dots.removeClass('active');
      dots.eq(currentSlide).addClass('active');
      console.log('Active dot updated.');
    }
  
    dots.on('click', function() {
      currentSlide = parseInt($(this).data('index'), 10);
      console.log('Dot clicked. New slide: ' + currentSlide);
      updateSlider();
    });
  
    leftControl.on('click', function() {
      if (currentSlide > 0) {
        currentSlide--;
        console.log('Left control clicked. New slide: ' + currentSlide);
        updateSlider();
      } else {
        console.log('Already at first slide. Cannot move left.');
      }
    });
  
    rightControl.on('click', function() {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        console.log('Right control clicked. New slide: ' + currentSlide);
        updateSlider();
      } else {
        console.log('Already at last slide. Cannot move right.');
      }
    });
  });