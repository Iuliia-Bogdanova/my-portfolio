export function isCurrentPage(pageId) {
    return document.body.id === pageId;
}

export function isMobileDevice() {
    return window.matchMedia("(max-width: 768px)").matches;
}

// Запретить прокрутку главной страницы
// export function toggleScrollForPage(pageId) {
//     if (isCurrentPage(pageId)) {
//         document.body.style.overflowY = "auto";
//     } else {
//         document.body.style.overflowY = "hidden";
//     }
// }
