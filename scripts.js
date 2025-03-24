document.addEventListener("DOMContentLoaded", function() {
  // Inicializa AOS depois de um pequeno delay para garantir que o DOM está pronto
  setTimeout(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
      disable: window.innerWidth < 768 // Desativa em mobile se necessário
    });
  }, 100);

  // Força a exibição dos elementos ocultos
  const hiddenElements = document.querySelectorAll('#instagram, footer');
  hiddenElements.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  // Efeito de scroll no header - versão melhorada
  function handleScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      // Adiciona sombra apenas quando scrolled
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      header.classList.remove('scrolled');
      header.style.boxShadow = 'none';
    }
  }
  
  // Adiciona o event listener e executa imediatamente
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Executa logo ao carregar para verificar a posição

  // Menu toggle - versão mais robusta
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    // Função para fechar o menu
    const closeMenu = () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = ''; // Restaura o scroll do body
    };
    
    // Função para abrir/fechar o menu
    const toggleMenu = () => {
      const isActive = navLinks.classList.contains('active');
      
      if (isActive) {
        closeMenu();
      } else {
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede scroll do body quando menu está aberto
      }
    };
    
    // Evento de clique no toggle
    menuToggle.addEventListener('click', toggleMenu);
    
    // Fecha o menu ao clicar nos links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', closeMenu);
    });
    
    // Fecha o menu ao clicar fora (opcional)
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
    
    // Fecha o menu ao redimensionar a janela (para desktop)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // Adiciona efeito de onda nos botões com classe btn-pulse
  const pulseButtons = document.querySelectorAll('.btn-pulse');
  pulseButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Cria elemento de onda
      const wave = document.createElement('span');
      wave.className = 'wave';
      
      // Posiciona o efeito onde foi clicado
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size/2;
      const y = e.clientY - rect.top - size/2;
      
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
      
      button.appendChild(wave);
      
      // Remove após a animação
      setTimeout(() => {
        wave.remove();
      }, 1000);
    });
  });
  
  // Debug - verifica se os elementos principais existem
  if (!menuToggle) console.warn('Botão do menu não encontrado');
  if (!navLinks) console.warn('Links de navegação não encontrados');
});
