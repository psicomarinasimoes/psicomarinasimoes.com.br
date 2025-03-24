document.addEventListener("DOMContentLoaded", function() {
    // 1. Inicialização do AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
            offset: 100,
            disable: false,
            startEvent: 'DOMContentLoaded'
        });

        setTimeout(() => {
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.style.transitionDuration = '0.3s';
                el.style.animationDuration = '0.3s';
            });
            AOS.refresh();
        }, 100);
    }

    // 2. Função auxiliar para aplicar estilos
    function safeStyleApply(elements, styles) {
        elements.forEach(el => {
            if (el) {
                Object.assign(el.style, styles);
                // Corrige durações extremamente curtas
                if (el.style.transitionDuration === '1e-05s') {
                    el.style.transitionDuration = '0.3s';
                }
                if (el.style.animationDuration === '1e-05s') {
                    el.style.animationDuration = '0.3s';
                }
            }
        });
    }

    // 3. Aplicação de estilos com fallback
    safeStyleApply(document.querySelectorAll('#instagram, footer'), {
        opacity: '1',
        transform: 'none',
        transitionDuration: '0.3s'
    });

    // 4. Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        header.style.transition = 'background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease';
        
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            header.classList.toggle('scrolled', isScrolled);
            header.style.boxShadow = isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // 5. Menu mobile toggle - CÓDIGO REVISADO E CORRIGIDO
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        navLinks.style.transitionDuration = '0.3s';
        
        const closeMenu = () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede a propagação do evento
            const isActive = navLinks.classList.contains('active');
            navLinks.classList.toggle('active', !isActive);
            menuToggle.classList.toggle('active', !isActive);
            document.body.style.overflow = isActive ? '' : 'hidden';
        });

        // Fecha o menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Fecha o menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        // Fecha o menu ao clicar nos links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 6. Criação do botão CTA na seção de atendimentos
    const atendimentosSection = document.querySelector('#atendimentos .atendimentos-content');
    if (atendimentosSection && !document.getElementById('cta-button')) {
        const ctaButton = document.createElement('a');
        ctaButton.id = 'cta-button';
        ctaButton.className = 'cta-button';
        ctaButton.href = '#contact';
        ctaButton.textContent = 'Agende sua consulta';
        atendimentosSection.appendChild(ctaButton);
    }

    // 7. Efeito pulse nos botões
    document.querySelectorAll('.btn-pulse').forEach(button => {
        button.style.transitionDuration = '0.3s';
        
        button.addEventListener('click', function(e) {
            const wave = document.createElement('span');
            wave.className = 'wave';
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            Object.assign(wave.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${e.clientX - rect.left - size/2}px`,
                top: `${e.clientY - rect.top - size/2}px`,
                animationDuration: '0.3s'
            });

            button.appendChild(wave);
            setTimeout(() => wave.remove(), 300);
        });
    });
});

// Evento de load da página
window.addEventListener('load', function() {
    document.body.classList.add('fully-loaded');
    console.log('Todos recursos carregados');
    
    if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 300);
    }
    
    document.body.style.overflow = 'visible';
});
