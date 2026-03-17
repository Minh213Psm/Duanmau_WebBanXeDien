/* === TERMS.JS === */
document.querySelectorAll('.tab-sw-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tab-sw-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});
// Highlight active TOC
const sections = document.querySelectorAll('.terms-section');
window.addEventListener('scroll', () => {
  sections.forEach(s => {
    const rect = s.getBoundingClientRect();
    if (rect.top < 200 && rect.bottom > 100) {
      document.querySelectorAll('.toc-list a').forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.toc-list a[href="#${s.id}"]`);
      if (link) link.classList.add('active');
    }
  });
});

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
}