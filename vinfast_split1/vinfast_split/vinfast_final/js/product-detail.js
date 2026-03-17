/* === PRODUCT-DETAIL.JS === */
document.querySelectorAll('.color-opt').forEach(opt => {
  opt.addEventListener('click', function () {
    document.querySelectorAll('.color-opt').forEach(o => o.classList.remove('active'));
    this.classList.add('active');
  });
});
document.querySelectorAll('.trim-opt').forEach(opt => {
  opt.addEventListener('click', function () {
    document.querySelectorAll('.trim-opt').forEach(o => o.classList.remove('active'));
    this.classList.add('active');
  });
});
document.querySelectorAll('.thumb').forEach((t, i) => {
  t.addEventListener('click', function () {
    document.querySelectorAll('.thumb').forEach(th => th.classList.remove('active'));
    this.classList.add('active');
  });
});
function switchTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tabs-nav button').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
}