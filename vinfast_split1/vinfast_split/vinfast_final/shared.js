// ===== SHARED HEADER & FOOTER =====
const HEADER_HTML = `
<div class="announce-bar" id="announceBar">
  <span>
    🎉 Ưu đãi tháng 2/2026 – Giảm đến 50 triệu & lãi suất 0%!
    <a href="promotion.html">Khám phá ngay →</a>
  </span>
  <button class="close-announce" onclick="closeAnnounce()">✕</button>
</div>
<header id="header">
  <a href="index.html" class="logo"><span class="logo-text">VinFast</span></a>
  <nav>
    <a href="index.html">Trang chủ</a>
    <a href="products.html">Xe điện</a>
    <a href="promotion.html">Khuyến mãi</a>
    <a href="news.html">Tin tức</a>
    <a href="about.html">Về chúng tôi</a>
    <a href="information.html">Thông tin</a>
    <a href="contact.html">Liên hệ</a>
  </nav>
  <div class="header-actions">
    <div class="header-icons">
      <a href="search.html" class="icon-btn" title="Tìm kiếm">🔍</a>
      <a href="cart.html" class="icon-btn cart-badge" title="Giỏ hàng">🛒</a>
      <a href="profile.html" class="icon-btn" title="Tài khoản">👤</a>
    </div>
    <a href="contact.html" class="btn-header btn-outline">Lái thử</a>
    <a href="products.html" class="btn-header btn-solid">Mua xe</a>
  </div>
  <button class="hamburger" onclick="toggleMenu()"><span></span><span></span><span></span></button>
</header>
<div class="mobile-menu" id="mobileMenu">
  <a href="index.html" onclick="toggleMenu()">Trang chủ</a>
  <a href="products.html" onclick="toggleMenu()">Xe điện</a>
  <a href="promotion.html" onclick="toggleMenu()">Khuyến mãi</a>
  <a href="news.html" onclick="toggleMenu()">Tin tức</a>
  <a href="about.html" onclick="toggleMenu()">Về chúng tôi</a>
  <a href="information.html" onclick="toggleMenu()">📋 Thông tin VinFast</a>
  <a href="contact.html" onclick="toggleMenu()">Liên hệ</a>
  <a href="search.html" onclick="toggleMenu()">Tìm kiếm</a>
  <a href="cart.html" onclick="toggleMenu()">Giỏ hàng</a>
  <a href="profile.html" onclick="toggleMenu()">Tài khoản</a>
  <a href="contact.html" style="color:var(--blue);font-weight:700" onclick="toggleMenu()">Đặt lịch lái thử</a>
</div>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-main">
    <div class="footer-brand">
      <span class="logo-text" style="font-size:28px;font-weight:900;color:white;">VinFast</span>
      <p>Tiên phong trong cuộc cách mạng xe điện tại Việt Nam và trên toàn thế giới. Vì một tương lai xanh bền vững.</p>
      <div class="footer-socials">
        <a class="social-btn" href="#">f</a>
        <a class="social-btn" href="#">in</a>
        <a class="social-btn" href="#">▶</a>
        <a class="social-btn" href="#">ig</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Dòng xe</h4>
      <a href="products.html">VF 5 Plus</a>
      <a href="products.html">VF 6</a>
      <a href="products.html">VF 7</a>
      <a href="products.html">VF 8</a>
      <a href="products.html">VF 9</a>
      <a href="products.html">Xe máy điện</a>
    </div>
    <div class="footer-col">
      <h4>Hỗ trợ</h4>
      <a href="contact.html">Liên hệ</a>
      <a href="cart.html">Giỏ hàng</a>
      <a href="order-history.html">Đơn hàng</a>
      <a href="profile.html">Tài khoản</a>
      <a href="promotion.html">Khuyến mãi</a>
      <a href="terms.html">Điều khoản</a>
    </div>
    <div class="footer-col">
      <h4>Công ty</h4>
      <a href="about.html">Về VinFast</a>
      <a href="news.html">Tin tức</a>
      <a href="contact.html">Showroom</a>
      <a href="#">1900 23 23 89</a>
      <a href="terms.html">Chính sách bảo mật</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 VinFast Trading & Production LLC. Bản quyền thuộc về VinFast.</span>
    <div class="footer-bottom-links">
      <a href="terms.html">Điều khoản</a>
      <a href="terms.html">Bảo mật</a>
      <a href="terms.html">Cookie</a>
    </div>
  </div>
</footer>`;

function updateHeaderTop() {
  var bar = document.getElementById("announceBar");
  var header = document.getElementById("header");
  if (!header) return;
  if (bar && bar.style.display !== "none") {
    header.style.top = bar.offsetHeight + "px";
  } else {
    header.style.top = "0";
  }
}

function initPage() {
  document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Highlight active nav
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Header scroll
  window.addEventListener('scroll', () => {
    const h = document.getElementById('header');
    if (window.scrollY > 50) h.classList.add('scrolled');
    else h.classList.remove('scrolled');
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Ẩn thanh thông báo nếu người dùng đã đóng trước đó
  if (sessionStorage.getItem("announcementClosed") === "true") {
    var bar = document.getElementById("announceBar");
    if (bar) bar.style.display = "none";
  }

  // Tự động tính chiều cao thực tế để đặt header đúng vị trí
  updateHeaderTop();
  window.addEventListener('resize', updateHeaderTop);
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ✅ HÀM ĐÚNG: tên khớp với onclick="closeAnnounce()" trong HTML, id khớp "announceBar"
function closeAnnounce() {
  var bar = document.getElementById("announceBar");
  if (bar) bar.style.display = "none";
  updateHeaderTop();
  sessionStorage.setItem("announcementClosed", "true");
}

document.addEventListener('DOMContentLoaded', initPage);