import Projects from "./Projects";
import { Header, Footer } from "../../Global/components/components";
import gotoTop from "../Home/gotoTop";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const index = () => {
  return `
  <div id="gototop"></div>
  ${Header()}
  ${gotoTop()}
  ${Projects()}
  ${Footer()}
  `;
};
export default index;
// ${Header()}
//   ${Projects()}
//   ${Footer()}
// ${Projects("", [
//   { name: "search", search: true },
//   { name: "showMore", showMore: true },
// ])}
