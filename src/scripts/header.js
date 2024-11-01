import "../styles/header.css";

export function header() {
  let divContainer = document.getElementById("header");

  let headerElement = document.createElement("div");
  headerElement.classList.add("header");

  let heading = document.createElement("p");
  heading.textContent = "TODO-LIST";
  heading.classList.add("heading");

  divContainer.appendChild(headerElement);

  headerElement.appendChild(heading);
}
