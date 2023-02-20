const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sun = $("#sun");
const moon = $("#moon");
// themme vars
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (systemTheme == false) {
  $("#banner").classList.add("banner");
  // $(".particles-js").removeAttribute("id");
} else {
  // $(".particles-js").setAttribute("id", "particles-js");
  $("#banner").classList.remove("banner");
}
const iconToggle = () => {
  sun.classList.toggle("display-none");
  moon.classList.toggle("display-none");
};

// const themeCheck = () => {
//   if (userTheme === "dark" || (!userTheme && systemTheme)) {
//     document.documentElement.classList.add("dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//   }
//   sun.classList.add("display-none");
// };

const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
};
moon.addEventListener("click", () => {
  themeSwitch();
});
sun.addEventListener("click", () => {
  themeSwitch();
});
// themeCheck();
