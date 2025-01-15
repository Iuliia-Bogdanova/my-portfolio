export async function loadCardsData() {
  
  try {
    // Загружаем JSON-файл относительно текущего модуля
    const response = await fetch(new URL("./cards.json", import.meta.url));
    if (!response.ok) throw new Error("Failed to load cards data");
    return await response.json();
  } catch (error) {
    console.error("Error loading cards data:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}

export function createCardElement(cardData) {
  // Создаем обертку ссылки
  const linkElement = document.createElement("a");
  linkElement.href = cardData.link;
  linkElement.target = "_blank"; // Открыть в новой вкладке
  linkElement.classList.add("card-link");

  // Создаем карточку
  const cardItem = document.createElement("div");
  cardItem.classList.add("card-item");

  // Создаем блок изображения
  const cardImage = document.createElement("div");
  cardImage.classList.add("card__img");
  cardImage.style.backgroundImage = `url("${cardData.image.default}")`;

  // Обработчик событий для смены изображения при наведении
  cardImage.addEventListener("mouseenter", () => {
    cardImage.style.backgroundImage = `url("${cardData.image.hover}")`;
  });

  cardImage.addEventListener("mouseleave", () => {
    cardImage.style.backgroundImage = `url("${cardData.image.default}")`;
  });

  // Создаем текстовую часть карточки
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

  // Собираем текстовую часть
  cardText.appendChild(description);
  cardText.appendChild(name);
  cardText.appendChild(category);

  // Собираем карточку
  cardItem.appendChild(cardImage);
  cardItem.appendChild(cardText);

  // Вставляем карточку в ссылку
  linkElement.appendChild(cardItem);

  return linkElement;
}

export async function renderCards(containerSelector) {
  // Загружаем данные из JSON
  const cardsData = await loadCardsData();

  // Получаем контейнер для карточек
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found.`);
    return;
  }

  // Генерируем и добавляем карточки
  cardsData.forEach((cardData) => {
    const cardElement = createCardElement(cardData);
    container.appendChild(cardElement);
  });
}
