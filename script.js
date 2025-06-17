// ==== DOM Ready Handler ====
document.addEventListener('DOMContentLoaded', () => {
    fadeInMain()
    initContactForm()
    highlightCurrentNav()
    initBurgerMenu()
    updateLoginButtonState()
})

// ==== Fade-in Animation ====
function fadeInMain() {
    const mainContent = document.querySelector('main')
    if (!mainContent) return
    let opacity = 0
    mainContent.style.opacity = 0
    const interval = setInterval(() => {
        opacity += 0.05
        mainContent.style.opacity = opacity
        if (opacity >= 1) clearInterval(interval)
    }, 50)
}

// ==== Contact Form ====
function initContactForm() {
    const contactForm = document.getElementById('contactForm')
    if (!contactForm) return

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const nameInput = document.getElementById('name')
        const emailInput = document.getElementById('email')
        const messageTextarea = document.getElementById('message')
        const submitButton = contactForm.querySelector('button[type="submit"]')

        const name = nameInput.value.trim()
        const email = emailInput.value.trim()
        const message = messageTextarea.value.trim()

        if (!name) return alertField(nameInput, 'Nama tidak boleh kosong.')
        if (!email) return alertField(emailInput, 'Email tidak boleh kosong.')
        if (!isValidEmail(email)) return alertField(emailInput, 'Format email tidak valid.')
        if (!message) return alertField(messageTextarea, 'Pesan tidak boleh kosong.')

        const whatsappNumber = '6281938172950'
        const messageText = `Halo RinTek\n\nSaya ingin menghubungi Anda:\n\n Nama: ${name}\n Email: ${email}\n Pesan: ${message}\n\nTerima kasih `
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`

        submitButton.textContent = 'Mengalihkan ke WhatsApp...'
        submitButton.disabled = true

        setTimeout(() => {
            window.location.href = whatsappURL
            submitButton.textContent = 'Kirim Pesan'
            submitButton.disabled = false
            contactForm.reset()
        }, 1500)
    })
}

function alertField(input, message) {
    alert(message)
    input.focus()
}

function isValidEmail(email) {
    return /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)
}

// ==== Navigation Highlight ====
function highlightCurrentNav() {
    const currentPath = window.location.pathname.split('/').pop()
    document.querySelectorAll('.main-nav ul li a').forEach((link) => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active')
        }
    })
}

// ==== Burger Menu ====
function initBurgerMenu() {
    const menuToggle = document.getElementById('menu-toggle')
    const mainNav = document.getElementById('main-nav')
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active')
            menuToggle.classList.toggle('active')
        })
    }
}

function updateLoginButtonState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const username = localStorage.getItem('username') || 'Login'
    const loginBtn = document.querySelector('.login-btn')
    if (loginBtn) {
        loginBtn.textContent = username
        loginBtn.href = isLoggedIn ? 'dashboard.html' : 'login.html'
    }
}

// ==== Shared Utility ====
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId)
    const icon = button.querySelector('i')
    const isPassword = input.type === 'password'
    input.type = isPassword ? 'text' : 'password'
    icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
}

function showModal(type, title, message) {
    const modal = document.getElementById('modal')
    const iconWrap = document.getElementById('modalIcon')
    const icon = document.getElementById('modalIconClass')
    const modalTitle = document.getElementById('modalTitle')
    const modalMessage = document.getElementById('modalMessage')

    if (!modal || !iconWrap || !icon || !modalTitle || !modalMessage) return

    iconWrap.className = `mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center ${type === 'success' ? 'bg-green-100' : 'bg-red-100'}`
    icon.className = `text-2xl fas ${type === 'success' ? 'fa-check text-green-600' : 'fa-times text-red-600'}`
    modalTitle.textContent = title
    modalMessage.textContent = message

    modal.classList.remove('hidden')
    modal.classList.add('flex')
}

function closeModal() {
    const modal = document.getElementById('modal')
    if (modal) modal.classList.replace('flex', 'hidden')
}

document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal()
})

function showLoading() {
    toggleLoading(true)
}

function hideLoading() {
    toggleLoading(false)
}

function toggleLoading(show) {
    const btn = document.getElementById('loginButton')
    const text = document.getElementById('buttonText')
    const loading = document.getElementById('loadingText')
    const overlay = document.getElementById('loadingOverlay')
    const user = document.getElementById('loginUsername')
    const pass = document.getElementById('loginPassword')

    btn.disabled = show
    if (show) {
        text.classList.add('hidden')
        loading.classList.remove('hidden')
        overlay.classList.replace('hidden', 'flex')
    } else {
        text.classList.remove('hidden')
        loading.classList.add('hidden')
        overlay.classList.replace('flex', 'hidden')
    }
    user.disabled = show
    pass.disabled = show
}

// ==== Login & Register ====
const loginForm = document.getElementById('loginForm')
const registerForm = document.getElementById('registerForm')
const registerTab = document.getElementById('registerTab')
const loginTab = document.getElementById('loginTab')

if (registerTab) registerTab.onclick = () => (location.href = 'register.html')
if (loginTab) loginTab.onclick = () => (location.href = 'login.html')

if (loginForm) {
    if (localStorage.getItem('isLoggedIn') === 'true') location.href = 'dashboard.html'
    loginForm.onsubmit = (e) => {
        e.preventDefault()
        const username = loginForm['loginUsername'].value
        const password = loginForm['loginPassword'].value

        showLoading()
        fetch('https://rintek-backend.vercel.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, password }),
        })
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => {
                hideLoading()
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('username', username)
                localStorage.setItem('id', data.data.id)
                showModal('success', 'Login Berhasil!', `Selamat datang, ${username}!`)
                setTimeout(() => (location.href = 'dashboard.html'), 1500)
            })
            .catch(() => {
                hideLoading()
                showModal('error', 'Error!', 'Username atau password salah. Silakan coba lagi.')
            })
    }
}

if (registerForm) {
    const pass = registerForm['registerPassword']
    const confirm = registerForm['confirmPassword']
    const matchText = document.getElementById('passwordMatch')

    const checkMatch = () => {
        if (!confirm.value) return matchText.classList.add('hidden')
        matchText.classList.remove('hidden')
        if (pass.value === confirm.value) {
            matchText.textContent = '✓ Password cocok'
            matchText.className = 'text-sm mt-1 text-green-600'
        } else {
            matchText.textContent = '✗ Password tidak cocok'
            matchText.className = 'text-sm mt-1 text-red-600'
        }
    }

    pass.oninput = checkMatch
    confirm.oninput = checkMatch

    registerForm.onsubmit = (e) => {
        e.preventDefault()
        const username = registerForm['registerUsername'].value
        if (pass.value !== confirm.value) return showModal('error', 'Error!', 'Password dan konfirmasi password tidak cocok.')

        fetch('https://rintek-backend.vercel.app/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, password: pass.value }),
        })
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then(() => showModal('success', 'Registrasi Berhasil!', `Akun ${username} telah dibuat. Silakan login.`))
            .catch(() => showModal('error', 'Error!', 'Terjadi kesalahan saat membuat akun. Silakan coba lagi.'))
    }
}

// ==== Ripple Effect on Category Cards ====
document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', function () {
        const ripple = document.createElement('div')
        ripple.className = 'absolute inset-0 bg-white/20 rounded-2xl opacity-0 pointer-events-none'
        this.querySelector('.relative').appendChild(ripple)
        ripple.style.animation = 'ripple 0.6s ease-out'
        setTimeout(() => ripple.remove(), 600)
    })
})

const rippleStyle = document.createElement('style')
rippleStyle.textContent = `@keyframes ripple { 0%{opacity:0;transform:scale(0.8);} 50%{opacity:1;transform:scale(1.05);} 100%{opacity:0;transform:scale(1);} }`
document.head.appendChild(rippleStyle)
