document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuBtn && navLinks) {
        // Toggle menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && 
                !navLinks.contains(e.target) && 
                navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close menu on window resize if open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
}); 