import "../styles/footer.css";

export function footer() {
  let divContainer = document.getElementById("footer");

  let footerElement = document.createElement("div");
  footerElement.classList.add("footer");

  let footer = document.createElement("p");
  footer.textContent = "Copyright 2024 Vijaya TODO-LIST";
  footer.classList.add("headingpara");

  divContainer.appendChild(footerElement);
  footerElement.appendChild(footer);
}
