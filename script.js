
const photoPaths = [
  'images/August.jpg',
  'images/April.jpg',
  'images/February.jpg',
  'images/January.JPG',
  'images/1.jpg',
  'images/2.jpeg',
  'images/3.jpg',
  'images/4.jpg',
  'images/5.jpeg',
  'images/6.jpg',
  'images/7.jpg',
  'images/8.jpg',
  'images/9.jpeg',
  'images/11.jpeg',
  'images/12.jpeg',
  'images/13.jpeg',
  'images/14.jpeg',
  'images/15.jpeg',
  
];

let stripVisible = false;
let timeoutId;

// Play shutter sound
function playShutterSound() {
  const audio = new Audio("bgMUSIC/Camera Shutter (Sound Effect) - Sound effect club.mp3");
  audio.play();
}

function printPhotoStrip() {
  const slot = document.getElementById("slot");

  // Play shutter sound
  playShutterSound();

  const existingStrip = document.getElementById("photoStrip");

  // If strip is already visible, fade out and remove
  if (stripVisible && existingStrip) {
    existingStrip.classList.add("fade-out");

    existingStrip.addEventListener("animationend", () => {
      existingStrip.remove();
      stripVisible = false;
    }, { once: true });

    clearTimeout(timeoutId);
    return;
  }

  // Create new strip
  const strip = document.createElement("div");
  strip.id = "photoStrip";
  strip.style.overflowY = "auto";
  strip.style.maxHeight = "350px";

  photoPaths.forEach((path, index) => {
    const photo = document.createElement("div");
    photo.className = "photo";
    photo.style.animation = `fadeIn 0.6s ease forwards`;
    photo.style.animationDelay = `${index * 0.4}s`;

    const img = document.createElement("img");
    img.src = path;
    img.alt = "Memory";

    photo.appendChild(img);
    strip.appendChild(photo);
  });

  slot.appendChild(strip);
  stripVisible = true;

  // Auto hide after 15 seconds
  timeoutId = setTimeout(() => {
    if (stripVisible && strip.parentElement) {
      strip.classList.add("fade-out");
      strip.addEventListener("animationend", () => {
        strip.remove();
        stripVisible = false;
      }, { once: true });
    }
  }, 15000);
}

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '💕';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = Math.random() * 10 + 15 + 'px';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}

// Launch floating hearts repeatedly
setInterval(createHeart, 800);

// Music toggle button
const music = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('musicToggle');

toggleBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = 'Pause Music';
  } else {
    music.pause();
    toggleBtn.textContent = 'Play Music';
  }
});

function startExperience() {
  document.querySelector('.welcome-screen').classList.add('fade-out');

  // Start background music (user interaction triggered)
  const music = document.getElementById('bgMusic');
  music.play().catch((error) => {
    console.log("Music autoplay was blocked:", error);
  });

  // Show main content after fade-out
  setTimeout(() => {
    document.querySelector('.welcome-screen').style.display = 'none';
    document.querySelector('.container').style.display = 'block';

    // Optional: fade music in by lowering and increasing volume
    music.volume = 0;
    let vol = 0;
    const fadeIn = setInterval(() => {
      if (vol < 1) {
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(fadeIn);
      }
    }, 100);
  }, 1500);
}
function openLetter() {
  document.querySelector('.envelope-container').style.display = 'none';
  document.getElementById('loveLetter').classList.remove('hidden');
}