/* === REGISTER.JS === */
function togglePw(id) { const i = document.getElementById(id); i.type = i.type === 'password' ? 'text' : 'password'; }
function checkStrength(v) {
  const bar = document.getElementById('strengthBar'), txt = document.getElementById('strengthText');
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  const levels = [['', ''], ['25%', '#ef4444', 'Yếu'], ['50%', '#f59e0b', 'Trung bình'], ['75%', '#3b82f6', 'Khá mạnh'], ['100%', '#22c55e', 'Mạnh']];
  const l = levels[score] || levels[0];
  bar.style.width = l[0]; bar.style.background = l[1]; txt.textContent = l[2] || ''; txt.style.color = l[1];
}

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
}