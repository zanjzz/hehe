// ===== DOM ELEMENTS =====
const clickButton = document.getElementById('clickButton');
const homeSection = document.getElementById('home');
const mainSection = document.getElementById('main');
const animationContainer = document.getElementById('animation-container');
const popup = document.getElementById('popup');
const messageBox = document.getElementById('messageBox');
const overlay = document.getElementById('overlay');
const allPetals = [...document.querySelectorAll('.petal')];

// ===== CONSTANTS =====
const TOTAL_PETALS = allPetals.length;
const POPUP_DURATION = 4000; // matches your CSS animation

// ===== MESSAGES =====
const baseMessages = [
    'You are very gorgeous!🌸',
    'Sunshine always reminds me of you ☀️',
    'You are petal-perfect 💛',
    '"D" stands for demure ;)',
    'Your intelligence is attractive 💕',
    'You’re my favorite notification 💌',
    'Why am I doing this lmao 💖',
    'I hope you liked my gift, and me... kimiee ✨',
    'Even silence feels sweet with you 🌷',
    'I love your calmness 💞',
    'Six sevennnnnnn',
    'You’re the soft thought in my loud days 💭',
    'I smile easier because of you 😊',
    'God loves you <3',
    'My favorite place is next to you 🤍',
    'This flower blooms because of you 🌻'
];

// ===== STATE =====
let availableMessages = [];
let petalsHidden = 0;
let hasTransitioned = false;
let finalShown = false;

// ===== INIT =====
resetState();

// ===== BUTTON CLICK =====
clickButton.addEventListener('click', () => {
    if (hasTransitioned) return;
    hasTransitioned = true;

    clickButton.style.display = 'none';
    animationContainer.classList.remove('hidden');
    animationContainer.classList.add('show');

    setTimeout(() => {
        animationContainer.classList.add('fade-out');
        setTimeout(() => {
            homeSection.classList.add('hidden');
            mainSection.classList.add('active');
        }, 600);
    }, 3000);
});

// ===== PETAL CLICK HANDLER =====
allPetals.forEach(petal => {
    petal.addEventListener('click', () => handlePetalClick(petal));
});

function handlePetalClick(petal) {
    if (petal.dataset.used === 'true') return;
    petal.dataset.used = 'true';

    petal.classList.add('fade-out');

    setTimeout(() => {
        petal.classList.add('hidden-petal');
        petalsHidden++;

        // Show a popup immediately (overlapping allowed)
        if (availableMessages.length > 0) {
            const index = Math.floor(Math.random() * availableMessages.length);
            const msg = availableMessages.splice(index, 1)[0];
            triggerPopup(msg);
        }

        // Show final message box if all petals gone
        if (petalsHidden === TOTAL_PETALS && !finalShown) {
            finalShown = true;
            showMessageBox();
        }
    }, 300);
}

// ===== POPUP FUNCTION =====
function triggerPopup(msg) {
    const clone = popup.cloneNode(true);
    clone.textContent = msg;
    clone.style.display = 'block';
    document.body.appendChild(clone);

    clone.classList.add('show');

    setTimeout(() => {
        clone.classList.remove('show');
        setTimeout(() => clone.remove(), 400); // cleanup after animation
    }, POPUP_DURATION);
}

// ===== FINAL MESSAGE BOX =====
function showMessageBox() {
    overlay.classList.add('show');
    messageBox.classList.add('show');
}

// ===== RESET =====
function doneClicked() {
    messageBox.classList.remove('show');
    overlay.classList.remove('show');

    setTimeout(() => {
        messageBox.style.display = 'none';
        overlay.style.display = 'none';
        resetState();
    }, 600);
}

// ===== RESET STATE =====
function resetState() {
    petalsHidden = 0;
    finalShown = false;

    allPetals.forEach(petal => {
        petal.classList.remove('hidden-petal', 'fade-out');
        delete petal.dataset.used;
    });

    availableMessages = shuffleArray([...baseMessages]);
}

// ===== UTILITY =====
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
