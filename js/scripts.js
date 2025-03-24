document.addEventListener("DOMContentLoaded", function() {
    // 1. Corrigindo a inicialização do AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
            offset: 100,
            disable: false, // Ativa em todos os dispositivos
            startEvent: 'DOMContentLoaded'
        });
        
        // Força reset das durações das animações
        setTimeout(() => {
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.style.transitionDuration = '0.3s';
                el.style.animationDuration = '0.3s';
            });
            AOS.refresh();
        }, 100);
    }

    // 2. Verificação segura de elementos
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
        transitionDuration: '0.3s' // Garante duração adequada
    });

    // 4. Header scroll (com durações corrigidas)
    const header = document.querySelector('header');
    if (header) {
        // Corrige a transição do header
        header.style.transition = 'background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease';
        
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
        // Ajusta a transição do menu
        navLinks.style.transitionDuration = '0.3s';
        
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

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    // Add this to your existing DOMContentLoaded function
const atendimentosSection = document.querySelector('#atendimentos .atendimentos-content');
if (atendimentosSection && !document.getElementById('cta-button')) {
  const ctaButton = document.createElement('a');
  ctaButton.id = 'cta-button';
  ctaButton.className = 'cta-button';
  ctaButton.href = '#contact';
  ctaButton.textContent = 'Agende sua consulta';
  atendimentosSection.appendChild(ctaButton);

    // 6. Botões pulse (com verificação e tempo ajustado)
    document.querySelectorAll('.btn-pulse').forEach(button => {
        button.style.transitionDuration = '0.3s'; // Corrige duração
        
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
                animationDuration: '0.3s' // Tempo adequado
            });

            button.appendChild(wave);
            setTimeout(() => wave.remove(), 300); // Tempo reduzido para 0.3s
        });
    });
    
    // Corrige durações em todos os elementos animados
    setTimeout(() => {
        document.querySelectorAll('*').forEach(el => {
            const style = getComputedStyle(el);
            if (style.transitionDuration === '0.00001s') {
                el.style.transitionDuration = '0.3s';
            }
            if (style.animationDuration === '0.00001s') {
                el.style.animationDuration = '0.3s';
            }
        });
    }, 200);
});

window.addEventListener('load', function() {
    document.body.classList.add('fully-loaded');
    console.log('Todos recursos carregados');
    
    // Refresh final para garantir animações
    if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 300);
    }
    
    // Garante overflow visível
    document.body.style.overflow = 'visible';
});
