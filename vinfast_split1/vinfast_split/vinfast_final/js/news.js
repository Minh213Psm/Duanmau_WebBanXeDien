/* === NEWS.JS === */
document.querySelectorAll('.cat-tag').forEach(tag => {
  tag.addEventListener('click', function () {
    document.querySelectorAll('.cat-tag').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});
document.querySelectorAll('.page-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
    if (!['←', '→', '...'].includes(this.textContent)) this.classList.add('active');
  });
});

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
}
