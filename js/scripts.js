document.addEventListener("DOMContentLoaded", function() {
    // 1. Inicialização imediata do AOS (sem delay)
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out',
        offset: 100,
        disable: false
    });

    // 2. Verificação segura de elementos
    function safeStyleApply(elements, styles) {
        elements.forEach(el => {
            if (el) {
                Object.assign(el.style, styles);
            }
        });
    }

    // 3. Aplicação de estilos com fallback
    safeStyleApply(document.querySelectorAll('#instagram, footer'), {
        opacity: '1',
        transform: 'none'
    });

    // 4. Header scroll (otimizado)
    const header = document.querySelector('header');
    if (header) {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            header.classList.toggle('scrolled', isScrolled);
            header.style.boxShadow = isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // 5. Menu toggle (versão mais segura)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        };

        menuToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            navLinks.classList.toggle('active', !isActive);
            menuToggle.classList.toggle('active', !isActive);
            document.body.style.overflow = isActive ? '' : 'hidden';
        });

        // Event delegation melhorada
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    // 6. Botões pulse (com verificação)
    document.querySelectorAll('.btn-pulse').forEach(button => {
        button.addEventListener('click', function(e) {
            const wave = document.createElement('span');
            wave.className = 'wave';
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            Object.assign(wave.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${e.clientX - rect.left - size/2}px`,
                top: `${e.clientY - rect.top - size/2}px`
            });

            button.appendChild(wave);
            setTimeout(() => wave.remove(), 1000);
        });
    });
});

// Garantia de carregamento
window.addEventListener('load', function() {
    document.body.classList.add('fully-loaded');
    console.log('Todos recursos carregados');
});
