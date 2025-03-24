document.addEventListener("DOMContentLoaded", function () {
  // Inicializa a biblioteca AOS (Animate On Scroll)
  AOS.init({
      duration: 1000,
      once: true,
  });

  // Seleciona o botão de toggle do menu
  const menuToggle = document.querySelector('.menu-toggle');
  // Seleciona os links de navegação
  const navLinks = document.querySelector('.nav-links');

  // Verifica se os elementos existem antes de adicionar event listeners
  if (menuToggle && navLinks) {
      // Adiciona um evento de clique ao botão de toggle do menu
      menuToggle.addEventListener('click', () => {
          // Alterna a classe 'active' nos links de navegação
          navLinks.classList.toggle('active');
          // Alterna a classe 'active' no botão do menu (para animar o ícone)
          menuToggle.classList.toggle('active');
          console.log('Menu toggle clicked. Active class toggled.'); // Debug
      });

      // Fecha o menu ao clicar em um link (opcional)
      const navItems = document.querySelectorAll('.nav-links a');
      navItems.forEach(item => {
          item.addEventListener('click', () => {
              navLinks.classList.remove('active');
              menuToggle.classList.remove('active');
          });
      });
  } else {
      console.error('Elementos do menu não encontrados!');
  }
