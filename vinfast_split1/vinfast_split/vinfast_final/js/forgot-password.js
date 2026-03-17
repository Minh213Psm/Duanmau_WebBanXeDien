/* === FORGOT-PASSWORD.JS === */
function goStep2() {
  const email = document.getElementById('emailInput').value;
  if (!email) { alert('Vui lòng nhập email!'); return; }
  document.getElementById('otpSub').innerHTML = `Chúng tôi đã gửi mã 6 chữ số đến <strong>${email}</strong>. Mã có hiệu lực trong 5 phút.`;
  goPanel(2);
  document.getElementById('s1').className = 'step done'; document.getElementById('l1').className = 'step-line done';
  document.getElementById('s2').className = 'step active';
}
function goStep3() { goPanel(3); document.getElementById('s2').className = 'step done'; document.getElementById('l2').className = 'step-line done'; document.getElementById('s3').className = 'step active'; }
function goSuccess() { goPanel(4); }
function goPanel(n) { document.querySelectorAll('.panel').forEach(p => p.classList.remove('active')); document.getElementById('panel' + n).classList.add('active'); }
function moveOtp(el, prev, next) { if (el.value && next) next.focus(); }

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
}