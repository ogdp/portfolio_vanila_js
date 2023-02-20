import { useEffect } from "../../lib";
import Nav from "./Nav";
const Header = () => {
  useEffect(() => {
    // console.log("CUNG");
  }, []);
  const darkMode = `
      <div class="darkmode relative w-11">
      <i
          id="moon"
          class="fa-solid text-xl fa-moon text-gray-900 dark:text-sky-100 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
          ></i>
      <i
          id="sun"
          class="display-none fa-solid text-xl fa-sun-bright dark:text-sky-100 text-gray-900 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
          ></i>
    </div>`;
  const urlLogo =
    "https://raw.githubusercontent.com/ogdp/vuesax-icon/main/d%20logoo%201.2.jpg";
  return /*html*/ `
  <header id="header" data-aos="fade-down"
  data-aos-offset="200"
  data-aos-delay="50"
  data-aos-duration="1000"
  data-aos-easing="ease-in-out"
  data-aos-mirror="true"
  data-aos-once="false"
  class="border-b header border-blue-100/[.1] w-full blur-sm fixed bg-slate-900/[.1] backdrop-blur-sm z-50 md:filter-none"
  >
  <section class="max-w-6xl m-auto flex py-5">
     <div id="menu" class="w-full flex items-center justify-between">
        <a href="/#/">
        <img
           class="w-12 rounded-full"
           src="${urlLogo}"
           alt=""
           srcset=""
           />
        </a>
        ${Nav()}
     </div>
     ${darkMode}
  </section>
</header>
  `;
};
export default Header;
