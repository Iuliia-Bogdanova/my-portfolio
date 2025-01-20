export function isCurrentPage(pageId) {
  return document.body.id === pageId;
}

export function addFinishedClass(selector, delay) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('finished');
    }, index * delay); // Задержка для каждой следующей карточки/элемента
  });
}

