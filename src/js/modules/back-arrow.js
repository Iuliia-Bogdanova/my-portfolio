import { isCurrentPage } from "./utils.js";

export function initBackArrow() {
    if (!isCurrentPage("page-404")) return;

    const backArrow = document.querySelector(".back-arrow-404");

    if (!backArrow) {
        console.error("Back arrow not found on 404 page");
        return;
    }

    backArrow.removeAttribute("hidden"); // Показываем стрелку, если она была скрыта

    backArrow.addEventListener("click", (e) => {
        e.preventDefault();

        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "./index.html";
        }
    });
}
