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
    const linkElement = document.createElement("a");
    linkElement.href = cardData.link;
    linkElement.target = "_blank";
    linkElement.classList.add("card-link");

    const cardItem = document.createElement("div");
    cardItem.classList.add("card-item");

    const cardImageWrapper = document.createElement("div");
    cardImageWrapper.classList.add("card__img-wrapper");

    const defaultImg = document.createElement("div");
    defaultImg.classList.add("card__img", "default");
    defaultImg.style.backgroundImage = `url("${cardData.image.default}")`;

    const hoverImg = document.createElement("div");
    hoverImg.classList.add("card__img", "hover");
    hoverImg.style.backgroundImage = `url("${cardData.image.hover}")`;

    // Поместить ссылки в dataset родителя
    cardItem.dataset.defaultImgEl = "default";
    cardItem.dataset.hoverImgEl = "hover";

    // Добавить data-role для прямого поиска
    defaultImg.dataset.role = "default";
    hoverImg.dataset.role = "hover";

    cardImageWrapper.appendChild(defaultImg);
    cardImageWrapper.appendChild(hoverImg);

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

    cardText.appendChild(description);
    cardText.appendChild(name);
    cardText.appendChild(category);

    cardItem.appendChild(cardImageWrapper);
    cardItem.appendChild(cardText);
    linkElement.appendChild(cardItem);

    return linkElement;
}

export async function renderCards(containerSelector) {
    const cardsData = await loadCardsData();
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(
            `Container with selector "${containerSelector}" not found.`
        );
        return;
    }

    const fragment = document.createDocumentFragment();
    const cardElements = [];

    cardsData.forEach((cardData) => {
        const cardElement = createCardElement(cardData);
        const cardItem = cardElement.querySelector(".card-item");

        // Добавить loaded после рендера кадра
        requestAnimationFrame(() => {
            cardItem.classList.add("loaded");
        });

        cardElements.push(cardElement);
        fragment.appendChild(cardElement);
    });

    container.appendChild(fragment);

    // IntersectionObserver — для мобилки
    if (isMobile) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const cardItem = entry.target;
                    const defaultImg = cardItem.querySelector(
                        '[data-role="default"]'
                    );
                    const hoverImg = cardItem.querySelector(
                        '[data-role="hover"]'
                    );

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
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.8,
            }
        );

        cardElements.forEach((cardElement) => {
            const cardItem = cardElement.querySelector(".card-item");
            observer.observe(cardItem);
        });
    }
}
