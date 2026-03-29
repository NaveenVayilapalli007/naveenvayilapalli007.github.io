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

// 📅 Calendar + Clock

function updateDateTime() {
  const now = new Date();

  const days = [
    "Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday"
  ];

  const months = [
    "January","February","March","April",
    "May","June","July","August",
    "September","October","November","December"
  ];

  const dayName = days[now.getDay()];
  const date = String(now.getDate()).padStart(2, "0");
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  hours = String(hours).padStart(2, "0");

  const formatted =
    `${dayName} ${date} / ${monthName} / ${year} ${hours}:${minutes}:${seconds} ${ampm}`;

  document.getElementById("datetime").textContent = formatted;
}

// Run immediately + every second
updateDateTime();
setInterval(updateDateTime, 1000);