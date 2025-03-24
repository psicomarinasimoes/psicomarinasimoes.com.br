document.addEventListener("DOMContentLoaded", function() {
  // Configuração do AOS atualizada
  AOS.init({
    duration: 600,
    once: true,
    offset: 120,
    easing: 'ease-out-quad',
    disable: function() {
      return window.innerWidth < 768 && this.hasAttribute('data-aos-disable-mobile');
    }
  });

  // Sua função handleScroll() existente
  function handleScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      header.classList.remove('scrolled');
      header.style.boxShadow = 'none';
    }
  }

  // Função nova para animações mobile
  function initMobileAnimations() {
    if (window.innerWidth < 768) {
      document.querySelectorAll('[data-aos]:not([data-aos-disable-mobile])').forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }, 50);
      });
    }
  }

  // Seu menu toggle existente
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    const toggleMenu = () => {
      const isActive = navLinks.classList.contains('active');
      if (isActive) {
        closeMenu();
      } else {
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };
    
    menuToggle.addEventListener('click', toggleMenu);
    
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
    
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // Seus event listeners existentes
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Inicializa animações mobile
  initMobileAnimations();
  window.addEventListener('resize', initMobileAnimations);

  // Seu código de pulse buttons existente
  const pulseButtons = document.querySelectorAll('.btn-pulse');
  pulseButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const wave = document.createElement('span');
      wave.className = 'wave';
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size/2;
      const y = e.clientY - rect.top - size/2;
      
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
      
      button.appendChild(wave);
      
      setTimeout(() => {
        wave.remove();
      }, 1000);
    });
  });
  
  // Debug
  if (!menuToggle) console.warn('Botão do menu não encontrado');
  if (!navLinks) console.warn('Links de navegação não encontrados');
});
