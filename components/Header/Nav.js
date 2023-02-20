import { useEffect, useState } from "../../lib";

const Nav = () => {
  const [navs, setNavs] = useState([]);
  useEffect(() => {
    fetch("https://uo56vw-8080.preview.csb.app/nav")
      .then((response) => response.json())
      .then((data) => setNavs(data))
      .catch((error) => console.log(error));
  }, []);
  return `<nav>
  <a
     class="mx-2 text-lg font-medium text-gray-900 dark:text-sky-100 hover:text-sky-500 duration-[250ms]"
     href="/"
     > ${navs
       .map(
         (
           menu
         ) => `<a class="mx-2 tracking-[0px] text-base font-[600] text-gray-900 dark:text-sky-100 uppercase hover:text-sky-500 duration-[250ms]"
       href="#${menu.link}">${menu.name}</a>`
       )
       .join("")}</a
   >
  </nav>`;
};
export default Nav;
