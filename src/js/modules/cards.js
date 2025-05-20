/**
 * NOTE: This script relies on the viewport size determined at page load.
 * For development and testing:
 * - Clear browser cache or enable "Disable cache" in DevTools when switching viewports.
 * - Ensure the page is reloaded after changing viewport size for proper behavior.
 */

import { addFinishedClass } from "./utils";
import { isMobileDevice } from "./utils";

const isMobile = isMobileDevice();

// Загрузить JSON относительно текущего модуля (т к json не в public)
export async function loadCardsData() {
    try {
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

    // Создать фон
    const cardImage = document.createElement("div");
    cardImage.classList.add("card__img");
    cardImage.style.backgroundImage = `url("${cardData.image.default}")`;

    // Создать текст
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

    // Обработчики ховера для десктопа
    if (!isMobile) {
        cardItem.addEventListener("mouseenter", () => {
            cardImage.style.backgroundImage = `url("${cardData.image.hover}")`;
        });

        cardItem.addEventListener("mouseleave", () => {
            cardImage.style.backgroundImage = `url("${cardData.image.default}")`;
        });
    }

    // Добавить data-атрибуты для Intersection Observer
    cardItem.dataset.hoverImage = cardData.image.hover;
    cardItem.dataset.defaultImage = cardData.image.default;

    // Вставить карточку в ссылку
    linkElement.appendChild(cardItem);

    return linkElement;
}

// Рендер карточек
export async function renderCards(containerSelector) {
    const cardsData = await loadCardsData();

    // Получить контейнер для карточек
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(
            `Container with selector "${containerSelector}" not found.`
        );
        return;
    }

    // Генерировать карточки
    const cardElements = [];
    cardsData.forEach((cardData) => {
        const cardElement = createCardElement(cardData);
        cardElements.push(cardElement);
        container.appendChild(cardElement);
    });

    // Добавить Intersection Observer ТОЛЬКО для мобильных устройств
    if (isMobile) {
        const observerOptions = {
            root: null, // Вьюпорт
            rootMargin: "0px",
            threshold: 0.5, // 50% в зоне видимости
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const cardItem = entry.target;
                const cardImage = cardItem.querySelector(".card__img");

                if (entry.isIntersecting) {
                    // Добавить класс активности и изменить фон в зоне видимости
                    cardItem.classList.add("active");
                    cardImage.style.backgroundImage = `url("${cardItem.dataset.hoverImage}")`;
                } else {
                    // Убрать класс активности и вернуть фон вне зоны видимости
                    cardItem.classList.remove("active");
                    cardImage.style.backgroundImage = `url("${cardItem.dataset.defaultImage}")`;
                }
            });
        }, observerOptions);

        // Добавить каждую карточку в observer
        cardElements.forEach((cardElement) => {
            const cardItem = cardElement.querySelector(".card-item");
            observer.observe(cardItem);
        });
    }

    // Анимации при загрузке
    addFinishedClass(".card-item", 100);
    addFinishedClass(".center", 0);
}
