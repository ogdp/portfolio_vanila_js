import { useEffect } from "../../lib";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import About from "../About/about";
import Skills from "../Skill/skills";
import Contact from "../Contact/contact";
import Projects from "../Projects/projects";
import Banner from "./banner";
import GotoTop from "./gotoTop";
import AOS from "aos";
import "aos/dist/aos.css";
const Home = () => {
  function loadCSS(src) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${src}`;
    document.head.appendChild(link);
  }
  useEffect(() => {
    loadCSS("./src/css/style.css");
    loadCSS("./src/css/home.css");
  }, []);
  // AOS.init();
  // console.log("ddd");
  return ` 
  <div id="gototop"></div>
  ${Header()}
  ${Banner()}
  ${About()}
  ${Skills()}
  ${Projects("", [{ limitedCard: 3 }])}
  ${Contact()}
  ${GotoTop()}
  ${Footer()}
  `;
};
export default Home;
// ${Header()}
//   ${Banner()}
//   ${About()}
//   ${Skills()}
//   ${Projects("", [{ limitedCard: 3 }])}
//   ${Contact()}
//   ${GotoTop()}
//   ${Footer()}
