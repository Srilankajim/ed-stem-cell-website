const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-apply-form]");
const statusNode = document.querySelector("[data-form-status]");

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (navToggle && nav && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      header.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-label", "打开导航");
    });
  });
}

if (form && statusNode) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const city = String(formData.get("city") || "").trim();
    statusNode.textContent = `${name || "合作伙伴"}，已记录本地演示意向。正式上线时请接入CRM与隐私授权流程，当前页面未上传任何数据。`;
    if (city) {
      statusNode.textContent += ` 所在城市：${city}。`;
    }
    form.reset();
  });
}
