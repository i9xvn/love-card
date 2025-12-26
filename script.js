// script.js (FINAL FLOW)

// ====== إعداداتك ======
const targetDate = new Date("2025-12-31T23:59:59+03:00");
const herName = "زهرائي";
const fromNameStatic = "سيف"; // النص الثابت "من سيف"
document.title = `${herName} ❤️`;

// ====== قلوب تطلع من الأسفل للأعلى تلقائي ======
const heartsWrap = document.getElementById("hearts");
function spawnHeart(){
  if(!heartsWrap) return;
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = "♥";
  h.style.left = (Math.random() * 100) + "vw";
  h.style.fontSize = (14 + Math.random() * 22) + "px";
  h.style.animationDuration = (4.5 + Math.random() * 5) + "s";
  h.style.setProperty("--drift", (Math.random() * 120 - 60).toFixed(0) + "px");
  const colors = [
  "#ff5fa2",  // وردي
  "#ff8ccf",  // وردي فاتح
  "#ffd1dc",  // زهري ناعم
  "#ffc0cb",  // وردي كلاسيك
  "#ffb7c5"   // روز
];

  h.style.color = colors[Math.floor(Math.random() * colors.length)];
  heartsWrap.appendChild(h);
  setTimeout(() => h.remove(), 11000);
}
setInterval(spawnHeart, 170);
for(let i=0;i<18;i++) setTimeout(spawnHeart, i*120);

// ====== عناصر ======
const stage = document.querySelector(".stage");
const envelope = document.getElementById("envelope");
const tapHint  = document.getElementById("tapHint");

const toGreeting = document.getElementById("toGreeting");
const toMemories = document.getElementById("toMemories");
const backToGreeting = document.getElementById("backToGreeting");

// ====== فتح الظرف ======
function openEnvelope(){
  if(!envelope) return;
  if(envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  if(tapHint) tapHint.style.display = "none";
}

if(envelope){
  envelope.addEventListener("click", openEnvelope);
  envelope.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openEnvelope();
    }
  });
}

// ====== انتقالات الصفحات ======
function showGreeting(){
  if(!stage) return;
  stage.classList.add("showGreeting");
  stage.classList.remove("showMemories");
}
function showMemories(){
  if(!stage) return;
  stage.classList.add("showMemories");
  stage.classList.remove("showGreeting");
}
function backGreeting(){
  if(!stage) return;
  stage.classList.add("showGreeting");
  stage.classList.remove("showMemories");
}

if(toGreeting){
  toGreeting.addEventListener("click", (e)=>{
    e.stopPropagation();
    showGreeting();
  });
}
if(toMemories){
  toMemories.addEventListener("click", showMemories);
}
if(backToGreeting){
  backToGreeting.addEventListener("click", backGreeting);
}

// ====== موسيقى ======
const musicBtn = document.getElementById("musicBtn");
const bgm = document.getElementById("bgm");
let musicOn = false;

if (musicBtn && bgm){
  musicBtn.addEventListener("click", async ()=>{
    try{
      if(!musicOn){
        await bgm.play();
        musicOn = true;
        musicBtn.textContent = "إيقاف الموسيقى";
      }else{
        bgm.pause();
        musicOn = false;
        musicBtn.textContent = "تشغيل الموسيقى";
      }
    }catch{
      alert("المتصفح منع التشغيل. اضغطي زر الموسيقى مرة ثانية.");
    }
  });
}

// ====== عدّ تنازلي ======
const dd = document.getElementById("dd");
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");

function pad(n){ return String(n).padStart(2,"0"); }

function tick(){
  if(!dd || !hh || !mm || !ss) return;
  const now = new Date();
  let diff = targetDate - now;
  if(diff < 0) diff = 0;

  const total = Math.floor(diff/1000);
  const days = Math.floor(total/(3600*24));
  const hours = Math.floor((total%(3600*24))/3600);
  const mins = Math.floor((total%3600)/60);
  const secs = total%60;

  dd.textContent = pad(days);
  hh.textContent = pad(hours);
  mm.textContent = pad(mins);
  ss.textContent = pad(secs);
}
tick();
setInterval(tick, 1000);

// ====== كونفيتي ======
const confettiBtn = document.getElementById("confettiBtn");
const canvas = document.getElementById("confetti");
const ctx = canvas ? canvas.getContext("2d") : null;

function resize(){
  if(!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let particles = [];

function burst(){
  if(!canvas || !ctx) return;

  const colors = ["#ff4d86", "#ff8fab", "#d63384", "#7c3aed", "#b5179e"];


  const n = 400;
  const cx = canvas.width / 2;
  const cy = canvas.height / 3;

  particles = Array.from({ length: n }).map(() => ({
    x: cx,
    y: cy,
    vx: (Math.random() * 7 - 3.5),
    vy: (Math.random() * -10 - 2),
    g: 0.20 + Math.random() * 0.12,
    s: 3 + Math.random() * 4,
    a: 1,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
}


function draw(){
  if(!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.a -= 0.008;

    ctx.globalAlpha = Math.max(p.a, 0);
    ctx.fillStyle = p.color;   // ← هنا اللون
    ctx.fillRect(p.x, p.y, p.s, p.s);
  });

  ctx.globalAlpha = 1;
  particles = particles.filter(p => p.a > 0 && p.y < canvas.height + 40);

  requestAnimationFrame(draw);
}

draw();

if(confettiBtn){
  confettiBtn.addEventListener("click", burst);
}

