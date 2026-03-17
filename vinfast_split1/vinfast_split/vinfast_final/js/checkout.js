/* === CHECKOUT.JS === */
document.querySelectorAll('.pay-opt').forEach(opt => {
  opt.addEventListener('click', function () {
    const grp = this.querySelector('input').name;
    document.querySelectorAll(`.pay-opt input[name="${grp}"]`).forEach(r => r.closest('.pay-opt').classList.remove('active'));
    this.classList.add('active');
    this.querySelector('input').checked = true;
  });
});

function closeAnnouncement() {
  document.getElementById("announcement").style.display = "none";
}