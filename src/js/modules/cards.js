import { addFinishedClass } from "./utils";

export async function loadCardsData() {
  try {
    // Загрузить JSON относительно текущего модуля (т к json не в public)
    const response = await fetch(new URL("./cards.json", import.meta.url));
    if (!response.ok) throw new Error("Failed to load cards data");
    return await response.json();
  } catch (error) {
    console.error("Error loading cards data:", error);
    return [];
  }
}

export function createCardElement(cardData) {
  
  // Создать обертку-ссылку
  const linkElement = document.createElement("a");
  linkElement.href = cardData.link;
  linkElement.target = "_blank";
  linkElement.classList.add("card-link");

  // Создать карточку
  const cardItem = document.createElement("div");
  cardItem.classList.add("card-item");

  // Создать background-image
  const cardImage = document.createElement("div");
  cardImage.classList.add("card__img");
  cardImage.style.backgroundImage = `url("${cardData.image.default}")`;

  // Создать текст карточки
  const cardText = document.createElement("div");
  cardText.classList.add("card__text");

  const description = document.createElement("p");
  description.classList.add("about");
  description.textContent = cardData.description;

  const name = document.createElement("h3");
  name.textContent = cardData.name;

  const category = document.createElement("p");
  category.classList.add("topics");
  category.textContent = cardData.category;

  // Собрать текст
  cardText.appendChild(description);
  cardText.appendChild(name);
  cardText.appendChild(category);

  // Собрать карточку
  cardItem.appendChild(cardImage);
  cardItem.appendChild(cardText);

  // Определить вид устройства
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // Обработчики ховера для десктопа
  if (!isMobile) {
    cardItem.addEventListener("mouseenter", () => {
      cardImage.style.backgroundImage = `url("${cardData.image.hover}")`;
    });

    cardItem.addEventListener("mouseleave", () => {
      cardImage.style.backgroundImage = `url("${cardData.image.default}")`;
    });
  }

  // Обработчики тача для мобильных
  cardItem.addEventListener("touchstart", () => {
    // Добавить класс для активации стилей ховера
    cardItem.classList.add("touched");

    // Динамически изменить фон
    cardImage.style.backgroundImage = `url("${cardData.image.hover}")`;
  });

  // Убрать класс ховера
  cardItem.addEventListener("touchend", () => {
    cardItem.classList.remove("touched");

    // Вернуть фон
    cardImage.style.backgroundImage = `url("${cardData.image.default}")`;
  });

  // Вставить карточку в ссылку
  linkElement.appendChild(cardItem);

  return linkElement;
}

  // Загрузить данные из JSON
export async function renderCards(containerSelector) {
  const cardsData = await loadCardsData();

  // Получить контейнер для карточек
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found.`);
    return;
  }

  // Генерировать и добавлять карточки
  cardsData.forEach((cardData) => {
    const cardElement = createCardElement(cardData);
    container.appendChild(cardElement);
  });

  // addFinishedClass для анимации карточек
  addFinishedClass(".card-item", 100); 
  addFinishedClass(".center", 0);
}
