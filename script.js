// 🌗 Theme Toggle
const toggleButton = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (prefersDark) document.documentElement.setAttribute("data-theme", "light");

toggleButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  toggleButton.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// 🎞️ Scroll Animations
const fadeElements = document.querySelectorAll(".fade-in");
function handleScroll() {
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("visible");
  });
}
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);
