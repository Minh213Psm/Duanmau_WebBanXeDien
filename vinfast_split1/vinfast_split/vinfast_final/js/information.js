/* === INFORMATION.JS === */
/* FAQ accordion */
function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  // Đóng tất cả
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  // Mở cái vừa click nếu chưa mở
  if (!wasOpen) item.classList.add('open');
}

/* Sidebar highlight theo scroll */
const sections = document.querySelectorAll('article[id]');
const navLinks = document.querySelectorAll('.sidebar-nav a');
const OFFSET = 140;

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY + OFFSET >= s.offsetTop) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* Quick-nav smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
}
