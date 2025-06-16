document.addEventListener('DOMContentLoaded', () => {
    // Start Fade-in Animation on page load
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = 0;
        let opacity = 0;
        let fadeInInterval = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.05;
                mainContent.style.opacity = opacity;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 50);
    }
    // End Fade-in Animation

    // Start Form Validation for Contact Us page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah pengiriman formulir default

            // Mendapatkan elemen input dari formulir
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageTextarea = document.getElementById('message');
            const submitButton = contactForm.querySelector('button[type="submit"]');

            // Mendapatkan nilai dari input
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageTextarea.value.trim();

            let isValid = true;

            // 1. Validasi Formulir
            // Memeriksa apakah semua field wajib diisi
            if (name === '') {
                alert('Nama tidak boleh kosong.');
                nameInput.focus();
                isValid = false;
            } else if (email === '') {
                alert('Email tidak boleh kosong.');
                emailInput.focus();
                isValid = false;
            } else if (!isValidEmail(email)) {
                // Memeriksa format email valid
                alert('Format email tidak valid.');
                emailInput.focus();
                isValid = false;
            } else if (message === '') {
                alert('Pesan tidak boleh kosong.');
                messageTextarea.focus();
                isValid = false;
            }

            // Jika validasi berhasil
            if (isValid) {
                // 4. Nomor WhatsApp Tujuan
                const whatsappNumber = '6281938172950'; // Ganti dengan nomor WhatsApp Anda

                // 2. Format Pesan WhatsApp
                const whatsappMessage = `Halo RinTek \n\nSaya ingin menghubungi Anda:\n\n Nama: ${name}\n Email: ${email}\n Pesan: ${message}\n\nTerima kasih `;

                // 3. Menggunakan encodeURIComponent() untuk mengubah karakter khusus
                const encodedMessage = encodeURIComponent(whatsappMessage);

                // 5. URL Redirect ke WhatsApp
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

                // 9. Efek loading ringan
                submitButton.textContent = 'Mengalihkan ke WhatsApp...';
                submitButton.disabled = true; // Nonaktifkan tombol untuk mencegah klik ganda

                // Redirect setelah sedikit penundaan untuk menampilkan efek loading
                setTimeout(() => {
                    window.location.href = whatsappURL;
                    // Setelah redirect, reset tombol dan formulir (opsional, tergantung UX)
                    submitButton.textContent = 'Kirim Pesan';
                    submitButton.disabled = false;
                    contactForm.reset(); // Mengosongkan formulir
                }, 1500); // Penundaan 1.5 detik
            }
        });
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
    // End Form Validation

    // Add active class to current page in navigation
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Start Burger Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    // End Burger Menu Toggle
}); 