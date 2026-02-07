let yesSize = 1;

function moveNo() {

  const btn = document.getElementById("noBtn");

  const x = Math.random() * 250;
  const y = Math.random() * 80;

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

  window.location.href = "celebrate.html";
}

function noClicked() {
  const popup = document.createElement("div");
  popup.className = "cute-popup";
  popup.innerHTML = `
    <div class="popup-content">
      <p>✨ Oops, wrong option! ✨</p>
      <p>Try again? 💕</p>
      <button onclick="this.parentElement.parentElement.remove()">Got it! 🥰</button>
    </div>
  `;
  document.body.appendChild(popup);
  
  setTimeout(() => popup.remove(), 3000);
}
