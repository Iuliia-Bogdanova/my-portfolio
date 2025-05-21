/**
 * NOTE: This script relies on the viewport size determined at page load.
 * For development and testing:
 * - Clear browser cache or enable "Disable cache" in DevTools when switching viewports.
 * - Ensure the page is reloaded after changing viewport size for proper behavior.
 */

// import { addFinishedClass } from "./utils";
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

    // Обертка для изображений
    const cardImageWrapper = document.createElement("div");
    cardImageWrapper.classList.add("card__img-wrapper");

    // Изображение по умолчанию
    const defaultImg = document.createElement("div");
    defaultImg.classList.add("card__img", "default");
    defaultImg.style.backgroundImage = `url("${cardData.image.default}")`;

    // Ховер-изображение
    const hoverImg = document.createElement("div");
    hoverImg.classList.add("card__img", "hover");
    hoverImg.style.backgroundImage = `url("${cardData.image.hover}")`;

    // Вложить в обертку
    cardImageWrapper.appendChild(defaultImg);
    cardImageWrapper.appendChild(hoverImg);

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
    cardItem.appendChild(cardImageWrapper);
    cardItem.appendChild(cardText);

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
            root: null,
            rootMargin: "0px",
            threshold: 0.85, // 85% в зоне видимости
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const cardItem = entry.target;
                const defaultImg = cardItem.querySelector(".card__img.default");
                const hoverImg = cardItem.querySelector(".card__img.hover");

                if (entry.isIntersecting) {
                    cardItem.classList.add("active");
                    hoverImg.style.opacity = "1";
                    defaultImg.style.opacity = "0";
                } else {
                    cardItem.classList.remove("active");
                    hoverImg.style.opacity = "0";
                    defaultImg.style.opacity = "1";
                }
            });
        }, observerOptions);

        // Добавить каждую карточку в observer
        cardElements.forEach((cardElement) => {
            const cardItem = cardElement.querySelector(".card-item");
            observer.observe(cardItem);
        });
    }
}
