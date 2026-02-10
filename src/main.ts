import './style.css'

// Add scroll animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  section.classList.add('reveal');
  observer.observe(section);
});

// Update Reveal styles in CSS
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

console.log('KB Beyond Creative Website Loaded');
