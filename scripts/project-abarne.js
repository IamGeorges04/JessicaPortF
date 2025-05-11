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
            title: "Kundresan",
            description: "En detaljerad analys av kundens resa genom butiken, från första intryck till köpbeslut.",
            details: [
                "Analys av kundens beteende",
                "Identifiering av nyckelmoment",
                "Förbättringsförslag för kundupplevelsen"
            ]
        },
        {
            title: "Produktinteraktion",
            description: "Kartläggning av hur kunder interagerar med produkter och vilka faktorer som påverkar köpbeslut.",
            details: [
                "Produktinteraktionsanalys",
                "Köpprocesskartläggning",
                "Rekommendationer för förbättringar"
            ]
        },
        {
            title: "Kundupplevelse",
            description: "Analys av den totala kundupplevelsen i butiken, inklusive service, atmosfär och presentation.",
            details: [
                "Butiksmiljöanalys",
                "Serviceflödeskartläggning",
                "Atmosfär och presentation"
            ]
        },
        {
            title: "Digital Interaktion",
            description: "Kartläggning av kundens digitala interaktion med varumärket och förbättringsförslag.",
            details: [
                "Digitala kanalanalys",
                "Användarupplevelse",
                "Konverteringsoptimering"
            ]
        },
        {
            title: "Kampanjflöde",
            description: "Strategisk planering av kampanjer och hur de påverkar kundbeteendet.",
            details: [
                "Kampanjstrategi",
                "Kundengagemang",
                "Mätbara resultat"
            ]
        },
        {
            title: "Lojalitetsprogram",
            description: "Analys och förbättringsförslag för lojalitetsprogrammet.",
            details: [
                "Lojalitetsstrategi",
                "Kundvärde",
                "Engagemangsmätning"
            ]
        },
        {
            title: "Visuell Identitet",
            description: "Analys av den visuella identiteten och hur den kommunicerar med målgruppen.",
            details: [
                "Färgpalettanalys",
                "Typografisk profil",
                "Visuell stilguide"
            ]
        },
        {
            title: "Målgruppsstil",
            description: "Kartläggning av målgruppens stilpreferenser och hur de påverkar designval.",
            details: [
                "Målgruppsanalys",
                "Livsstilsreferenser",
                "Estetiska preferenser"
            ]
        },
        {
            title: "Konkurrensanalys",
            description: "Analys av konkurrenternas positionering och hur Abarne kan differentiera sig.",
            details: [
                "Marknadsanalys",
                "Konkurrentjämförelse",
                "Positioneringsstrategi"
            ]
        },
        {
            title: "Prisstrategi",
            description: "Analys av prissättningsstrategin och hur den påverkar kundbeteendet.",
            details: [
                "Prisanalys",
                "Värdebaserad prissättning",
                "Marknadsanpassning"
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