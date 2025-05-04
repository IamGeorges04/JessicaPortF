document.addEventListener('DOMContentLoaded', () => {
    const mockupItems = document.querySelectorAll('.mockup-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeLightbox = lightbox.querySelector('.close-lightbox');
    const prevBtn = lightbox.querySelector('.prev-btn');
    const nextBtn = lightbox.querySelector('.next-btn');
    
    let currentIndex = 0;
    const mockupDetails = [
        {
            title: "Brun/Beige Coffee Shop Feed",
            description: "Ett modernt kaféflöde i varma beige- och bruna toner. Fokus på att marknadsföra nya drycker, specialerbjudanden, kundfavoriter och öppettider för att öka lojaliteten och framhäva dagliga kampanjer",
            details: [
                "Beige och brun färgpalett.",
                "Blandning av drycker och kampanjer.",
                "Produkter och texter tydligt placerade.",
                "Lugnt och enhetligt bildflöde"
            ]
        },
        {
            title: "Hösttema Coffee Shop",
            description: "Ett mysigt och inbjudande Instagram-flöde med hösttema skapat för ett kafé. Varm färgpalett, säsongserbjudanden och frestande bilder på kaffe och bakverk.",
            details: [
                "Mysigt hösttema med fokus på kaffe och bakverk",
                "Varm färgpalett används genom hela flödet",
                "Blandning av produkter, miljöbilder och kampanjer",
                "Kampanjtexter och produkter är tydligt placerade"
            ]
        },
        {
            title: "Grön/Orange Coffee Shop Feed",
            description: "Mockup-flöde för kafé med livfull grön och orange färgpalett, konsekvent design och tydlig placering av kampanjer och produkter.",
            details: [
                "Livligt flöde med fokus på kampanjer och nyheter",
                "Grön och orange färg dominerar flödet konsekvent",
                "Blandning av produktnyheter, kampanjer och helgerbjudanden",
                "Viktiga erbjudanden och produkter placeras synligt"
            ]
        },
        {
            title: "Restaurang Feed",
            description: "Mockup-flöde för restaurang med färgstark, lekfull palett och enhetlig design. Fokus på tydlig exponering av mat, dryck och kampanjer.",
            details: [
                "Färgglatt flöde som lyfter mat, dryck och kampanjer",
                "Färgstark och livlig palett används genom hela flödet",
                "Variation av matbilder, drycker och erbjudandeinlägg",
                "Menyer och kampanjer strategiskt placerade i fokus"
            ]
        },
        {
            title: "Dollface Beauty kosmetikafeed (Påhittat varumärke)",
            description: "Ett elegant flöde för fiktivt skönhetsvarumärke Dollface Beauty. Mjuka neutrala färger hålls konsekventa genom hela flödet, blandning av produktbilder och modellbilder, produkter och texter strategiskt placerade för balans.",
            details: [
                " Elegant flöde för fiktivt skönhetsvarumärke Dollface Beauty",
                "Mjuka neutrala färger hålls konsekventa genom hela flödet",
                "Blandning av produktbilder och modellbilder",
                "Produkter och texter strategiskt placerade för balans"
            ]
        }
    ];

    // Function to update lightbox content
    function updateLightboxContent(index) {
        const mockup = mockupItems[index];
        const img = mockup.querySelector('img');
        const details = mockupDetails[index];

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.querySelector('h3').textContent = details.title;
        lightboxCaption.querySelector('.description').textContent = details.description;

        // Update details list
        const detailsList = lightboxCaption.querySelector('.details-list');
        detailsList.innerHTML = details.details
            .map(detail => `<li>${detail}</li>`)
            .join('');

        // Update navigation buttons
        prevBtn.style.display = index === 0 ? 'none' : 'flex';
        nextBtn.style.display = index === mockupItems.length - 1 ? 'none' : 'flex';
    }

    // Function to open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close lightbox
    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }

    // Add click event to mockup items
    mockupItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Navigation event listeners
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxContent(currentIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < mockupItems.length - 1) {
            currentIndex++;
            updateLightboxContent(currentIndex);
        }
    });

    // Close lightbox when clicking close button
    closeLightbox.addEventListener('click', closeLightboxFunc);

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightboxFunc();
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) {
                    currentIndex--;
                    updateLightboxContent(currentIndex);
                }
                break;
            case 'ArrowRight':
                if (currentIndex < mockupItems.length - 1) {
                    currentIndex++;
                    updateLightboxContent(currentIndex);
                }
                break;
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all mockup items for scroll animations
    mockupItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        observer.observe(item);
    });
}); 