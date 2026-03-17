/* === LOGIN.JS === */
function togglePw() {
  const i = document.getElementById('pwInput');
  i.type = i.type === 'password' ? 'text' : 'password';
}

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
}
