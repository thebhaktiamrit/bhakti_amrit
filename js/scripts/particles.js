// ============ PARTICLES ============
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const symbols = ['🕉️', '✨', '🌸', '⭐', '🪔', '🏹', '🌺', '🌼'];
  const particleCount = window.matchMedia('(max-width: 768px)').matches
    ? 8
    : 15;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `
    left: ${Math.random() * 100}%;
    font-size: ${20 + Math.random() * 20}px;
    animation-duration: ${15 + Math.random() * 25}s;
    animation-delay: ${Math.random() * 20}s;
  `;
    container.appendChild(p);
  }
}

