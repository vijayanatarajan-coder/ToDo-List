import { footer } from "./footer.js";
import { header } from "./header.js";
import { content } from "./taskManager.js";
import "../styles/content.css";

header();

document.addEventListener("DOMContentLoaded", () => {
  content(); // Initialize the application
});

footer();
