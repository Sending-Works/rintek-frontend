document.addEventListener('DOMContentLoaded', () => {
    // Start Fade-in Animation on page load
    const mainContent = document.querySelector('main')
    if (mainContent) {
        mainContent.style.opacity = 0
        let opacity = 0
        let fadeInInterval = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.05
                mainContent.style.opacity = opacity
            } else {
                clearInterval(fadeInInterval)
            }
        }, 50)
    }
    // End Fade-in Animation

    // Start Form Validation for Contact Us page
    const contactForm = document.getElementById('contactForm')
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault() // Mencegah pengiriman formulir default

            // Mendapatkan elemen input dari formulir
            const nameInput = document.getElementById('name')
            const emailInput = document.getElementById('email')
            const messageTextarea = document.getElementById('message')
            const submitButton = contactForm.querySelector('button[type="submit"]')

            // Mendapatkan nilai dari input
            const name = nameInput.value.trim()
            const email = emailInput.value.trim()
            const message = messageTextarea.value.trim()

            let isValid = true

            // 1. Validasi Formulir
            // Memeriksa apakah semua field wajib diisi
            if (name === '') {
                alert('Nama tidak boleh kosong.')
                nameInput.focus()
                isValid = false
            } else if (email === '') {
                alert('Email tidak boleh kosong.')
                emailInput.focus()
                isValid = false
            } else if (!isValidEmail(email)) {
                // Memeriksa format email valid
                alert('Format email tidak valid.')
                emailInput.focus()
                isValid = false
            } else if (message === '') {
                alert('Pesan tidak boleh kosong.')
                messageTextarea.focus()
                isValid = false
            }

            // Jika validasi berhasil
            if (isValid) {
                // 4. Nomor WhatsApp Tujuan
                const whatsappNumber = '6281938172950' // Ganti dengan nomor WhatsApp Anda

                // 2. Format Pesan WhatsApp
                const whatsappMessage = `Halo RinTek \n\nSaya ingin menghubungi Anda:\n\n Nama: ${name}\n Email: ${email}\n Pesan: ${message}\n\nTerima kasih `

                // 3. Menggunakan encodeURIComponent() untuk mengubah karakter khusus
                const encodedMessage = encodeURIComponent(whatsappMessage)

                // 5. URL Redirect ke WhatsApp
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

                // 9. Efek loading ringan
                submitButton.textContent = 'Mengalihkan ke WhatsApp...'
                submitButton.disabled = true // Nonaktifkan tombol untuk mencegah klik ganda

                // Redirect setelah sedikit penundaan untuk menampilkan efek loading
                setTimeout(() => {
                    window.location.href = whatsappURL
                    // Setelah redirect, reset tombol dan formulir (opsional, tergantung UX)
                    submitButton.textContent = 'Kirim Pesan'
                    submitButton.disabled = false
                    contactForm.reset() // Mengosongkan formulir
                }, 1500) // Penundaan 1.5 detik
            }
        })
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(email).toLowerCase())
    }
    // End Form Validation

    // Add active class to current page in navigation
    const currentPath = window.location.pathname.split('/').pop()
    const navLinks = document.querySelectorAll('.main-nav ul li a')

    navLinks.forEach((link) => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active')
        }
    })

    // Start Burger Menu Toggle
    const menuToggle = document.getElementById('menu-toggle')
    const mainNav = document.getElementById('main-nav')

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active')
            menuToggle.classList.toggle('active')
        })
    }
    // End Burger Menu Toggle
})

// ==== Shared Script ====

// Password visibility toggle
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId)
    const icon = button.querySelector('i')

    if (input.type === 'password') {
        input.type = 'text'
        icon.className = 'fas fa-eye-slash'
    } else {
        input.type = 'password'
        icon.className = 'fas fa-eye'
    }
}

// Modal functions
function showModal(type, title, message) {
    const modal = document.getElementById('modal')
    const modalIcon = document.getElementById('modalIcon')
    const modalIconClass = document.getElementById('modalIconClass')
    const modalTitle = document.getElementById('modalTitle')
    const modalMessage = document.getElementById('modalMessage')

    if (type === 'success') {
        modalIcon.className = 'mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-green-100'
        modalIconClass.className = 'text-2xl fas fa-check text-green-600'
    } else {
        modalIcon.className = 'mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-red-100'
        modalIconClass.className = 'text-2xl fas fa-times text-red-600'
    }

    modalTitle.textContent = title
    modalMessage.textContent = message
    modal.classList.remove('hidden')
    modal.classList.add('flex')
}

function closeModal() {
    const modal = document.getElementById('modal')
    modal.classList.add('hidden')
    modal.classList.remove('flex')
}

// Close modal when clicking outside
document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal()
    }
})

// Show loading state
function showLoading() {
    const loginButton = document.getElementById('loginButton')
    const buttonText = document.getElementById('buttonText')
    const loadingText = document.getElementById('loadingText')
    const loadingOverlay = document.getElementById('loadingOverlay')

    // Disable button and show loading text
    loginButton.disabled = true
    buttonText.classList.add('hidden')
    loadingText.classList.remove('hidden')

    // Show loading overlay
    loadingOverlay.classList.remove('hidden')
    loadingOverlay.classList.add('flex')

    // Disable form inputs
    document.getElementById('loginUsername').disabled = true
    document.getElementById('loginPassword').disabled = true
}

// Hide loading state
function hideLoading() {
    const loginButton = document.getElementById('loginButton')
    const buttonText = document.getElementById('buttonText')
    const loadingText = document.getElementById('loadingText')
    const loadingOverlay = document.getElementById('loadingOverlay')

    // Enable button and hide loading text
    loginButton.disabled = false
    buttonText.classList.remove('hidden')
    loadingText.classList.add('hidden')

    // Hide loading overlay
    loadingOverlay.classList.add('hidden')
    loadingOverlay.classList.remove('flex')

    // Enable form inputs
    document.getElementById('loginUsername').disabled = false
    document.getElementById('loginPassword').disabled = false
}

// ==== Login Script ====
const loginForm = document.getElementById('loginForm')
const registerTab = document.getElementById('registerTab')

if (loginForm && registerTab) {
    // Navigate to register page
    registerTab.addEventListener('click', () => {
        window.location.href = 'register.html'
    })

    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
        window.location.href = 'dashboard.html'
    }

    // Form submission with loading
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const username = document.getElementById('loginUsername').value
        const password = document.getElementById('loginPassword').value

        // Show loading state
        showLoading()

        // Simulate API call (replace with your actual API endpoint)
        fetch('https://rintek-backend.vercel.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                password: password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log('Success:', data)

                // Hide loading state
                hideLoading()

                // Show success modal
                showModal('success', 'Login Berhasil!', `Selamat datang, ${username}!`)

                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('username', username)
                localStorage.setItem('id', data.data.id)

                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html'
                }, 1500)
            })
            .catch((error) => {
                console.error('Error:', error)

                // Hide loading state
                hideLoading()

                // Show error modal
                showModal('error', 'Error!', 'Username atau password salah. Silakan coba lagi.')
            })
    })
}

// ==== Register Script ====
const registerForm = document.getElementById('registerForm')
const loginTab = document.getElementById('loginTab')

if (registerForm && loginTab) {
    // Navigate to login page
    loginTab.addEventListener('click', () => {
        window.location.href = 'login.html'
    })

    // Password confirmation validation
    const registerPassword = document.getElementById('registerPassword')
    const confirmPassword = document.getElementById('confirmPassword')
    const passwordMatch = document.getElementById('passwordMatch')

    function checkPasswordMatch() {
        if (confirmPassword.value === '') {
            passwordMatch.classList.add('hidden')
            return
        }

        passwordMatch.classList.remove('hidden')
        if (registerPassword.value === confirmPassword.value) {
            passwordMatch.textContent = '✓ Password cocok'
            passwordMatch.className = 'text-sm mt-1 text-green-600'
        } else {
            passwordMatch.textContent = '✗ Password tidak cocok'
            passwordMatch.className = 'text-sm mt-1 text-red-600'
        }
    }

    registerPassword.addEventListener('input', checkPasswordMatch)
    confirmPassword.addEventListener('input', checkPasswordMatch)

    // Form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const username = document.getElementById('registerUsername').value
        const password = registerPassword.value
        const confirmPass = confirmPassword.value

        if (password !== confirmPass) {
            showModal('error', 'Error!', 'Password dan konfirmasi password tidak cocok.')
            return
        }

        fetch('https://rintek-backend.vercel.app/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                password: password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log('Success:', data)
                showModal('success', 'Registrasi Berhasil!', `Akun ${username} telah dibuat. Silakan login.`)
            })
            .catch((error) => {
                console.error('Error:', error)
                showModal('error', 'Error!', 'Terjadi kesalahan saat membuat akun. Silakan coba lagi.')
            })
    })
}

// Add click interactions
document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', function () {
        const categoryName = this.querySelector('h3').textContent
        console.log(`Kategori ${categoryName} dipilih`)

        // Add ripple effect
        const ripple = document.createElement('div')
        ripple.className = 'absolute inset-0 bg-white/20 rounded-2xl opacity-0 pointer-events-none'
        this.querySelector('.relative').appendChild(ripple)

        ripple.style.animation = 'ripple 0.6s ease-out'

        setTimeout(() => {
            ripple.remove()
        }, 600)
    })
})

// Add CSS for ripple animation
const style = document.createElement('style')
style.textContent = `
@keyframes ripple {
    0% { opacity: 0; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 0; transform: scale(1); }
}
`
document.head.appendChild(style)
