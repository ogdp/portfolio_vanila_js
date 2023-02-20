import Typed from "typed.js";
import { useEffect, useState } from "../../lib";
// import AOS from "aos";
// import "aos/dist/aos.css";
const Banner = () => {
  const [dataBanner, setDataBanner] = useState([]);
  const [checkLoad, setCheckLoad] = useState(0);
  let titleBanner = "";
  let imgBanner = "";
  useEffect(() => {
    fetch("https://uo56vw-8080.preview.csb.app/banner")
      .then((res) => res.json())
      .then((data) => {
        setDataBanner(data[0]);
        setCheckLoad(checkLoad + 1);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(checkLoad);
  console.log("banner");
  if (checkLoad == 1) {
    const { name, specialized, link, subName, titleBtn, srcImg } = dataBanner;
    titleBanner = `
    <div data-aos="fade-right" class="flex md:items-center md:justify-start ">
      <h1
        class="max-md:text-3xl tracking-tight font-black md:text-[40px] md:leading-[4rem] text-slate-900 dark:text-sky-100"
      >
      <span class="flex">
      <span
        class="max-md:text-3xl tracking-tight font-black md:text-[65px] text-slate-900 dark:text-sky-100"
      >
        ${subName}
      </span>
      <span class="ml-4 flex items-center mt-[-10px] justify-center px-2 md:py-[5px]" style="background: linear-gradient(#fefb72, #fefca3);">
      <span class="p-2 w-12/12 md:text-[55px] " style="background: linear-gradient(#ede801, #fefb72);transform: skew(-5deg);color: #343F65;">${name}</span>
      </span>
      </span>
        <span
          class=" bg-gradient-to-r from-blue-500 to-green-500 auto_text max-md:text-3xl tracking-tight font-black md:text-[28px] md:leading-[6rem] text-slate-900 dark:text-sky-100"
        >
          <span
            id="saydev"
            class="bg-gradient-to-r from-blue-500 to-green-500 auto_text tracking-tight font-black md:leading-[3rem] text-slate-900 dark:text-sky-100"
          >
          </span>
        </span>
        <br/>
        <div class=" mt-10 animate-bounce h-16 w-54 flex justify-start items-center relative">
        <div class="flex justify-center  items-center">
           <div class="btn_mycv shadow-lg shadow-cyan-500/50 left-0 flex justify-center  items-center i h-12 w-48 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-[10px] shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
              <a href="${link}" class=" text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center">
                 <span class="">
                    <svg class="w-5 h-5 right-1.5 relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                       <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                 </span>
                 <span class="text-[18px]">
                 ${titleBtn}
                 </span>
              </a>
           </div>
        </div>
     </div>
      </h1>
    </div>
    `;
    imgBanner = `
  <img class="dark:w-[300px] dark:absolute dark:top-[50%] dark:left-[50%] dark:-translate-x-2/4 dark:-translate-y-2/4" src="${srcImg}" />
    `;
    useEffect(() => {
      if (titleBanner != "" && srcImg != "") {
        const btnMyCv = document.querySelector(".btn_mycv");
        btnMyCv?.addEventListener("click", () => {
          window.open(`${link}`, "_blank");
        });
        var typed = new Typed(".auto_text", {
          strings: ["npm instal", `${specialized}`],
          startDelay: 0,
          typeSpeed: 130,
          backSpeed: 70,
          loop: true,
        });
      }
    });
  }
  return `
  <section id="banner" class="md:min-h-[100vh]">
  <div class="md:min-h-screen dark:pt-[88px]  dark:bg-slate-900 min-w-full">
  <div style="border-radius: 5%;" class="h-[calc(100%_-_88px)] dark:bg-[#0F172A] dark:shadow-[inset_9.91px_9.91px_15px_#0E1526,inset_-9.91px_-9.91px_15px_#10192E] rounded-[15%] md:w-[80%] md:px-[10%] m-auto grid md:grid-cols-2 md:justify-center md:min-h-screen  dark:md:min-h-[calc(100vh_-_115px)] ">
    ${titleBanner}
    <div class="md:pt-9 md:justify-end md:pl-6 md:flex md:items-center">
    <div data-aos="zoom-out"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="false" class="dark:relative dark:rounded-[50%] dark:w-[450px] dark:h-[450px]">
      <div class="dark:position dark:rounded-[50%] dark:w-[450px] dark:h-[450px] dark:shadow-[inset_9.91px_9.91px_15px_#0E1526,inset_-9.91px_-9.91px_15px_#10192E] dark:rounded-[100%];
      dark:background: #0f172a;">
      </div>
      ${imgBanner}
    </div>
  </div>
</div>
  </section>
  `;
};
export default Banner;
