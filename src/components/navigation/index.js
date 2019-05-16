import "./styles.scss";

if (document.querySelector(".navigation__button")) {
  const navButton = document.querySelector(".navigation__button");
  const nav = document.querySelector(".navigation");
  const navLinks = document.querySelectorAll(
    ".navigation__list--mobile .navigation__item"
  );
  navButton.onclick = () => nav.classList.toggle("open");

  navLinks.forEach(link => {
    link.addEventListener("click", () => nav.classList.toggle("open"));
  });
}
