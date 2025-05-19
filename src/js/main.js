import "modern-normalize/modern-normalize.css";
import "../scss/style.scss";

import { initThemeSwitcher } from "./modules/theme-switcher";
import { initTitleAnimation } from "./modules/title-animation";
import { initArrowUp } from "./modules/arrow-up";
import { initBackArrow } from "./modules/back-arrow";

import { isCurrentPage, toggleScrollForPage } from "./modules/utils";

import { renderCards } from "./modules/cards";

initThemeSwitcher();
initTitleAnimation();
initArrowUp();
initBackArrow();

if (isCurrentPage("projects-page")) {
    toggleScrollForPage("projects-page");
    renderCards(".cards");
}
