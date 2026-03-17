/* === SEARCH.JS === */
function setSearch(val) { document.getElementById('searchInput').value = val; document.getElementById('queryDisplay').textContent = val; }
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', function () { document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active')); this.classList.add('active'); });
});

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
}