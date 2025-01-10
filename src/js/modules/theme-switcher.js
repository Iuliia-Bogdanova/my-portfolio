export function initThemeSwitcher() {
  document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.querySelector(".sun-moon");
    const body = document.body;

    // Установить начальную тему
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      body.setAttribute("data-theme", savedTheme);
    } else {
      body.setAttribute("data-theme", userPrefersDark ? "dark" : "light");
    }

    // Переключить тему
    themeToggleButton.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  });
}

