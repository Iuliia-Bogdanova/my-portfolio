import { isCurrentPage } from "./utils";

export function initTitleAnimation() {
    if (!isCurrentPage("home-page")) return;

    // Ждать загрузки DOM для запуска анимации
    document.addEventListener("DOMContentLoaded", () => {
        const typewriter = document.getElementById("typewriter");
        const sections = document.querySelectorAll(".main, .footer");

        // Проверить, есть ли элемент для анимации
        if (typewriter) {
            typewriter.style.opacity = "1";
            typewriter.style.visibility = "visible";
        }

        // Обработать окончание анимации
        typewriter.addEventListener("animationend", () => {
            document.body.style.overflow = "auto";
            typewriter.classList.add("finished");
            sections.forEach((section) => {
                section.style.opacity = "1";
                section.style.visibility = "visible";
                section.classList.add("finished");
            });
        });
    });
}
