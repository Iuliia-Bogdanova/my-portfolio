export function isCurrentPage(pageId) {
  return document.body.id === pageId;
}

export function addFinishedClass(selector, delay) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("finished");
    }, index * delay); // Задержка для каждой следующей карточки/элемента
  });
}

export function isMobileDevice() {
  return window.matchMedia("(max-width: 768px)").matches;
}

export function toggleScrollForPage(pageId) {
  if (isCurrentPage(pageId)) {
    document.body.style.overflowY = "auto";
  } else {
    document.body.style.overflowY = "hidden";
  }
}
