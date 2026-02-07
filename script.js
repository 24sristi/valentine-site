let yesSize = 1;
let noClickCount = 0;
let noMoveSpeed = 1;

const funnyMessages = [
  { msg: "Really? 😏", emoji: "🤨" },
  { msg: "Are you sure? 💔", emoji: "💔" },
  { msg: "Last chance! ⚠️", emoji: "⚠️" },
  { msg: "Don't break my heart 😭", emoji: "😭" },
  { msg: "Think again! 🤔", emoji: "🤔" },
  { msg: "Say yes! Pretty please? 🥺", emoji: "🥺" },
  { msg: "This is your sign! ✨", emoji: "✨" },
  { msg: "C'mon, you know you want to 😉", emoji: "😉" }
];

// Play sound (using Web Audio API)
function playSound(type) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  if (type === "yes") {
    // Cute ding sound
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } else if (type === "no") {
    // Funny nope sound
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  }
}

// Confetti explosion
function createConfetti() {
  const colors = ['#ff4d88', '#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.innerHTML = ['💖', '💕', '💗', '💘', '💓'][Math.floor(Math.random() * 5)];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    confetti.style.fontSize = (Math.random() * 20 + 20) + "px";
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Emoji rain
function createEmojiRain() {
  for (let i = 0; i < 30; i++) {
    const emoji = document.createElement("div");
    emoji.className = "emoji-rain";
    emoji.innerHTML = ['💕', '💖', '🌹', '💐', '✨'][Math.floor(Math.random() * 5)];
    emoji.style.left = Math.random() * 100 + "%";
    emoji.style.animationDelay = Math.random() * 0.8 + "s";
    emoji.style.fontSize = (Math.random() * 30 + 40) + "px";
    document.body.appendChild(emoji);
    
    setTimeout(() => emoji.remove(), 4000);
  }
}

function moveNo() {
  const btn = document.getElementById("noBtn");
  
  // Increase difficulty with each attempt
  const x = Math.random() * (300 + noMoveSpeed * 50);
  const y = Math.random() * (150 + noMoveSpeed * 30);

  btn.style.left = x + "px";
  btn.style.top = y + "px";

  growYes();
}

function growYes() {
  yesSize += 0.15;
  const yesBtn = document.getElementById("yesBtn");
  yesBtn.style.transform = `scale(${yesSize})`;
}

function yesClicked() {
  playSound("yes");
  createConfetti();
  createEmojiRain();
  
  // Show love meter full
  const meter = document.querySelector(".love-meter-fill");
  if (meter) {
    meter.style.width = "100%";
  }
  
  setTimeout(() => {
    window.location.href = "celebrate.html";
  }, 1000);
}

function noClicked() {
  playSound("no");
  noClickCount++;
  noMoveSpeed += 0.3;
  
  // Update love meter (decreases)
  const meter = document.querySelector(".love-meter-fill");
  if (meter) {
    const currentWidth = Math.max(0, 100 - noClickCount * 15);
    meter.style.width = currentWidth + "%";
  }
  
  const messageObj = funnyMessages[Math.min(noClickCount - 1, funnyMessages.length - 1)];
  
  const popup = document.createElement("div");
  popup.className = "cute-popup";
  popup.innerHTML = `
    <div class="popup-content">
      <p style="font-size: 40px;">${messageObj.emoji}</p>
      <p>${messageObj.msg}</p>
      <button onclick="this.parentElement.parentElement.remove()">Oops! 🥰</button>
    </div>
  `;
  document.body.appendChild(popup);
  
  setTimeout(() => popup.remove(), 2500);
}

// Hover effect on YES button
document.addEventListener("DOMContentLoaded", function() {
  const yesBtn = document.getElementById("yesBtn");
  yesBtn.addEventListener("mouseenter", function() {
    this.style.filter = "drop-shadow(0 0 15px rgba(255, 77, 136, 0.8))";
  });
  yesBtn.addEventListener("mouseleave", function() {
    this.style.filter = "drop-shadow(0 5px 15px rgba(255, 77, 136, 0.4))";
  });
});
