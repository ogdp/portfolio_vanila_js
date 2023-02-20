import { useEffect, useState } from "../../lib";

const skills = () => {
  const [skll, setSkill] = useState([]);
  const [checkLoad, setCheckLoad] = useState(0);
  let contentSkill = "";
  // useEffect(() => {
  //   fetch("https://uo56vw-8080.preview.csb.app/skills")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setSkill(res);
  //       setCheckLoad(checkLoad + 1);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // if (checkLoad == 1) {
  //   contentSkill = `
  //   <h1
  //   class="md:py-10 md:pt-[120px] md:pb-14 max-md:pb-8 font-bold text-4xl md:text-[50px] text-center dark:text-sky-100"
  // >
  //   My skill
  // </h1>

  // <div class="container_about max-w-[1000px] m-auto flex justify-center items-center">
  //   <div class="mx-auto w-full flex max-w-screen items-center justify-center">
  //     <div  data-aos="fade-up" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true" data-aos-once="false"
  //       class="dark:bg-[#0F172A] w-full dark:shadow-none shadow-[12.91px_12.91px_15px_#D3D4D8,-12.91px_-12.91px_15px_#FFFFFF] rounded-[8%]; background: #eef0f4 bg-slate-100 z-[1] mx-auto my-0 rounded-xl max-md:px-6 max-md:py-3 max-md:pb-10 md:px-14 md:py-3 md:pb-16"
  //     >
  //       <div class="flex items-center p-[9px] pl-0 md:mb-5">
  //         <div class="px-1 py-0">
  //           <span
  //             class="bg-[#ff605c] inline-block items-center w-3.5 h-3.5 p-px rounded-[50%]"
  //           ></span>
  //         </div>
  //         <div class="px-1 py-0">
  //           <span
  //             class="bg-[#ffbd44] inline-block items-center w-3.5 h-3.5 p-px rounded-[50%]"
  //           ></span>
  //         </div>
  //         <div class="px-1 py-0">
  //           <span
  //             class="bg-[#00ca4e] inline-block items-center w-3.5 h-3.5 p-px rounded-[50%]"
  //           ></span>
  //         </div>
  //       </div>
  //       <div class="">
  //         <div class="card__content md:px-10">
  //           <div
  //             class="grid grid-cols-4 max-md:grid-cols-2 flex-wrap md:gap-10"
  //           >${skll
  //             .map((item) => {
  //               return ` <div data-aos="fade-up"
  //               data-aos-duration="3000"
  //               class="text-center rounded-md bg-gradient-to-r from-pink-800 via-sky-100 to-blue-500 p-[2px]"
  //             >
  //               <div
  //                 class="py-4 px-7 grid row-span-1 h-full w-full items-center justify-center rounded-md bg-slate-50 dark:bg-gray-800 back"
  //               >
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   xmlns:xlink="http://www.w3.org/1999/xlink"
  //                   version="1.1"
  //                   id="Layer_1"
  //                   x="0px"
  //                   y="0px"
  //                   width="64px"
  //                   height="64px"
  //                   viewBox="0 0 512 512"
  //                   enable-background="new 0 0 512 512"
  //                   xml:space="preserve"
  //                 >
  //                   <image
  //                     id="image0"
  //                     width="512"
  //                     height="512"
  //                     x="0"
  //                     y="0"
  //                     href="${item.href}">
  //                   />
  //                 </svg>
  //                 <h5 class="font-bold py-3 pb-0">${item.title}</h5>
  //               </div>
  //             </div>`;
  //             })
  //             .join("")}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>`;
  // }
  return /*html*/ `
  <section id="skills" class="dark:text-sky-100 dark:#1d1f20 pb-20">
  ${contentSkill}
</section>
  `;
};

export default skills;
