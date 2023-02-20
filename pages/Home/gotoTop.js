import { useEffect } from "../../lib";

const gotoTop = () => {
  let gotoTopInner = `
      <a data-aos="fade-up" href="#gototop" class="shadow-lg shadow-cyan-500/50 flex justify-center  items-center i bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-[10px] shadow-2xl  cursor-pointer overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out  fixed z-[1000] m-[3rem] rounded-sm px-3 py-3 bottom-0 right-0 bg-sky-300 text-black">
      <i class="fa-regular fa-up font-extrabold"></i>
      </a>`;
  let dao = "";
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY < 100) {
        dao = "";
        document.getElementById("gotoTopInner").innerHTML = dao;
      } else {
        dao = gotoTopInner;
        document.getElementById("gotoTopInner").innerHTML = dao;
      }
    });
  }, []);

  return `<div id="gotoTopInner"></div>`;
};
export default gotoTop;
