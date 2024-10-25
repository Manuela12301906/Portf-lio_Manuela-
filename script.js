const toggleThemeBtn = document.getElementById('toggle-theme');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);

toggleThemeBtn.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});

let currentSlide = 0;
const slides = document.querySelectorAll('.projeto');
const totalSlides = slides.length;

document.getElementById('total-projetos').textContent = totalSlides;

document.querySelector('.next-btn').addEventListener('click', () => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  updateCarousel();
});

document.querySelector('.prev-btn').addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - 1;
  }
  updateCarousel();
});

function updateCarousel() {
  const slideWidth = slides[0].clientWidth;
  document.querySelector('.carousel-slide').style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  document.getElementById('projeto-atual').textContent = currentSlide + 1;
}

window.addEventListener('resize', updateCarousel);

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  
  let errorMessage = '';

  if (nome === '') {
    errorMessage += 'Por favor, preencha o nome.\n';
  }

  if (email === '') {
    errorMessage += 'Por favor, preencha o email.\n';
  } else if (!validateEmail(email)) {
    errorMessage += 'Por favor, insira um email válido.\n';
  }

  if (telefone === '') {
    errorMessage += 'Por favor, preencha o telefone.\n';
  } else if (!validatePhone(telefone)) {
    errorMessage += 'Por favor, insira um telefone válido.\n';
  }

  if (mensagem === '') {
    errorMessage += 'Por favor, escreva uma mensagem.\n';
  }

  if (errorMessage !== '') {
    document.getElementById('form-messages').textContent = errorMessage;
  } else {
    document.getElementById('form-messages').textContent = 'Mensagem enviada com sucesso!';
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return re.test(phone);
}

document.getElementById('telefone').addEventListener('input', function(event) {
  let input = event.target.value;
  
  input = input.replace(/\D/g, '');
  
  if (input.length > 10) {
    input = input.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (input.length > 5) {
    input = input.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (input.length > 2) {
    input = input.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else {
    input = input.replace(/^(\d*)/, '($1');
  }

  event.target.value = input;
});
