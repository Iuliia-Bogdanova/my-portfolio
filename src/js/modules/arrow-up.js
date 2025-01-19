import { isCurrentPage } from "./utils.js";

export function initArrowUp() {
  if (!isCurrentPage("projects-page")) return;

  const arrowUp = document.querySelector(".arrow-up");

  if (!arrowUp) {
    console.error("Arrow-up button not found in the DOM");
    return;
  }

  // Скрыть кнопку
  arrowUp.classList.add("hidden");

  // Функция для переключения видимости кнопки
  const toggleButtonVisibility = () => {
    if (window.scrollY > 150) {
      arrowUp.classList.add("visible");
      arrowUp.classList.remove("hidden");
    } else {
      arrowUp.classList.remove("visible");
    }
  };

  // Вызов функции сразу после загрузки
  toggleButtonVisibility();

  // Добавление обработчиков на события
  window.addEventListener("scroll", toggleButtonVisibility);
  window.addEventListener("resize", toggleButtonVisibility);

  // Обработчик клика по кнопке
  arrowUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
