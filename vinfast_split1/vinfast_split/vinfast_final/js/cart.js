/* === CART.JS === */
function changeQty(btn, delta) {
  const input = btn.parentElement.querySelector('.qty-num');
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  input.value = val;
}
function closeAnnouncement() {
  document.getElementById("announcement").style.display = "none";
}

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
    localStorage.setItem("announcementClosed", "true");
}

window.onload = function () {
    if (localStorage.getItem("announcementClosed") === "true") {
        var bar = document.getElementById("announcement");
        if (bar) {
            bar.style.display = "none";
        }
    }
}