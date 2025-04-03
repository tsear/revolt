document.addEventListener("DOMContentLoaded", function() {
  const cat = document.getElementById('cat-container');
  const playArea = document.getElementById('cat-play-area');
  if (!cat || !playArea) return;
  
  // Force initial inline positioning
  cat.style.left = "0px";
  cat.style.bottom = "0px";
  
  // Initialize facing direction.
  let facing = 1;
  // Default: if sprite naturally faces left, force it to face right.
  cat.style.transform = "scaleX(-1)";
  
  // --- SPRITE CONFIGURATION ---
  const frameWidth = 128;    // Each frame is 32px wide
  const frameHeight = 128;   // Each frame is 32px tall
  let state = "idle";       // Initial state: idle
  let previousState = state;
  let currentFrame = 0;     // Starting frame index
  const fps = 6;            // Frames per second for sprite animation
  const frameInterval = 1000 / fps;
  let lastFrameTime = performance.now();
  
  // Define animation states based on your mapping (rows are zero-indexed)
  const animations = {
    idle: { row: 0, frames: 4 },
    run: { rows: [1, 2], frames: [8, 5], total: 13 },
    crouch: { row: 3, frames: 4 },
    jump: { row: 6, frames: 5 },
    land: { row: 7, frames: 6 }
  };
  
  // --- MOVEMENT CONFIGURATION ---
  let targetX = 0;
  let targetY = playArea.offsetHeight; // initial target at bottom left
  const speedRun = 1.25;  // reduced speed when running
  const speedIdle = 0.5;  // reduced speed when idle
  let jumping = false;    // flag to prevent multiple jump triggers
  let transitionScheduled = false; // flag for scheduling state transitions
  
  // For jump physics
  let verticalVelocity = 0;
  const gravity = 400;    // Gravity in px/s² (adjust as needed)
  let lastPosTime = performance.now();
  
  // --- SPRITE ANIMATION LOOP ---
  function updateSprite(timestamp) {
    // Reset frame if state changes.
    if (state !== previousState) {
      currentFrame = 0;
      previousState = state;
      transitionScheduled = false;
    }
    
    if (timestamp - lastFrameTime >= frameInterval) {
      const anim = animations[state];
      let backgroundX, backgroundY;
      
      if (anim.row !== undefined) {
        // Single-row states: idle, crouch, jump, land
        currentFrame = (currentFrame + 1) % anim.frames;
        backgroundX = -(currentFrame * frameWidth);
        backgroundY = -(anim.row * frameHeight);
        
        // Transitions:
        if (state === "jump" && currentFrame === anim.frames - 1 && !transitionScheduled) {
          transitionScheduled = true;
          setTimeout(() => {
            state = "land";
            currentFrame = 0;
            transitionScheduled = false;
          }, 50);
        }
        if (state === "land" && currentFrame === anim.frames - 1 && !transitionScheduled) {
          transitionScheduled = true;
          // Force landing on ground
          cat.style.bottom = "0px";
          setTimeout(() => {
            state = "crouch";
            currentFrame = 0;
            transitionScheduled = false;
          }, 50);
        }
        if (state === "crouch" && currentFrame === anim.frames - 1 && !transitionScheduled) {
          transitionScheduled = true;
          setTimeout(() => {
            state = "idle";
            currentFrame = 0;
            transitionScheduled = false;
          }, 300); // Pause before returning to idle
        }
      } else if (anim.rows) {
        // Multi-row state (run)
        currentFrame = (currentFrame + 1) % anim.total;
        if (currentFrame < anim.frames[0]) {
          backgroundX = -(currentFrame * frameWidth);
          backgroundY = -(anim.rows[0] * frameHeight);
        } else {
          backgroundX = -((currentFrame - anim.frames[0]) * frameWidth);
          backgroundY = -(anim.rows[1] * frameHeight);
        }
      }
      
      cat.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
      lastFrameTime = timestamp;
    }
    requestAnimationFrame(updateSprite);
  }
  requestAnimationFrame(updateSprite);
  
  // --- MOUSE / TOUCH INTERACTION ---
  playArea.addEventListener('mouseenter', function(e) {
    let rect = playArea.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    state = "run";
  });
  
  playArea.addEventListener('mousemove', function(e) {
    let rect = playArea.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  });
  
  playArea.addEventListener('mouseleave', function(e) {
    state = "idle";
    targetX = 0;
    targetY = playArea.offsetHeight;
  });
  
  // --- MOVEMENT / STATE UPDATE LOOP with Jump Physics ---
function updatePosition() {
  let currentLeft = parseFloat(cat.style.left) || 0;
  let currentBottom = parseFloat(cat.style.bottom) || 0;
  
  let playAreaHeight = playArea.offsetHeight;
  // For jump/land, calculate target bottom normally; otherwise, target bottom is 0.
  let targetBottom = (state === "jump" || state === "land") ? (playAreaHeight - targetY) : 0;
  
  let diffX = targetX - currentLeft;
  let diffY = targetBottom - currentBottom;
  let distance = Math.sqrt(diffX * diffX + diffY * diffY);
  
  // Always update facing so the cat faces the cursor.
  // If target is to the right, we want it to face right. Since the sprite naturally faces left,
  // we flip it (scaleX(-1)) when the target is to the right.
  if (diffX > 0) {
    facing = -1;
  } else if (diffX < 0) {
    facing = 1;
  }
  cat.style.transform = `scaleX(${facing})`;
  
  // Determine horizontal speed.
  let speed = (state === "run" || state === "escape") ? speedRun : speedIdle;
  
  // Trigger jump only if in "run" state, distance is small, the cat is on the ground,
  // and we aren't already in a jump.
  if (state === "run" && distance < 20 && currentBottom === 0 && !jumping) {
    state = "jump";
    jumping = true;
    let jumpHeight = 50;
    cat.style.bottom = (currentBottom + jumpHeight) + "px";
    setTimeout(() => {
      jumping = false;
    }, 300);
  }
  
  // Update horizontal position (vertical position is only updated in jump/land states)
  if (distance > 1) {
    let moveX = (diffX / distance) * speed;
    let moveY = (diffY / distance) * speed;
    cat.style.left = (currentLeft + moveX) + "px";
    if (state === "jump" || state === "land") {
      cat.style.bottom = (currentBottom + moveY) + "px";
    } else {
      // When not in a vertical movement state, pin the cat to the ground.
      cat.style.bottom = "0px";
    }
  }
  
  requestAnimationFrame(updatePosition);
}
updatePosition();
});