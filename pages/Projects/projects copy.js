// // import dataProject from "../../data/data";
// import { router, useEffect, useState } from "../../lib";
// import searchBar from "./searchBar";
// const Projects = (params, control) => {
//   const [projects, setProjects] = useState([]);
//   const [projectConfig, setProjectConfig] = useState([]);
//   useEffect(() => {
//     fetch("https://uo56vw-8080.preview.csb.app/projects")
//       .then((res) => res.json())
//       .then((data) => setProjects(data))
//       .catch((err) => console.log(err));
//   }, []);
//   useEffect(() => {
//     fetch("https://uo56vw-8080.preview.csb.app/projectsConfig", {
//       method: "GET",
//     })
//       .then((res) => res.json())
//       .then((data2) => setProjectConfig(data2[0]))
//       .catch((err2) => console.log(err2));
//   }, []);

//   let card;
//   if (control?.filter((item) => item.cardMin === true).length > 0) {
//     let newProjects = projects.slice(projects.length - 3);
//     card = newProjects
//       .map((item) => {
//         const { id, title, img, member, content, create_at, link } = item;
//         return `<div data-aos="flip-right"
//       data-aos-offset="100"
//       data-aos-delay="50"
//       data-aos-duration="500"
//       data-aos-easing="ease-in-out"
//       data-aos-mirror="true"
//       data-aos-once="false"
//       data-aos-anchor-placement="top-center" id="item" data-id="${id}" class="cursor-pointer mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-inner duration-500 max-sm:hover:scale-100 hover:scale-105 dark:bg-[#303033] dark:border-gray-700"
//   >
//     <a "/#/projects/${id}" class="overflow-hidden h-64">
//       <div class="relative rounded-t-lg overflow-hidden h-64">
//         <img
//           class="rounded-t-lg w-full h-full scale-105 hover:scale-110 transition-all ease-in-out duration-500 object-cover"
//           src="${img}"
//           alt=""
//         />
//       </div>
//     </a>
//     <div class="p-5">
//       <a "/#/projects/${id}">
//         <h5
//           class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"style="
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           word-break: break-word;
//         "
//         >
//           ${title}
//         </h5>
//       </a>
//       <p
//         class="mb-3 font-normal text-gray-700 dark:text-gray-400"
//         style="
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           word-break: break-word;
//         "
//       >
//         ${content}
//       </p>
//       <a "/#/projects/${id}">
//         <p
//           class="block text-right py-2 text-sm font-bold italic hover:underline cursor-pointer"
//         >
//           ${create_at}
//         </p>
//       </a>
//       <a
//         "/#/projects/${id}"
//         class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       >
//         Read more
//         <svg
//           aria-hidden="true"
//           class="w-4 h-4 ml-2 -mr-1"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill-rule="evenodd"
//             d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//             clip-rule="evenodd"
//           ></path>
//         </svg>
//       </a>
//     </div>
//   </div>
//     `;
//       })
//       .join("");
//   } else {
//     card = projects
//       .map((item) => {
//         const { id, title, img, member, content, create_at, link } = item;
//         return `<div data-aos="flip-right"
//       data-aos-offset="100"
//       data-aos-delay="50"
//       data-aos-duration="500"
//       data-aos-easing="ease-in-out"
//       data-aos-mirror="true"
//       data-aos-once="false"
//       data-aos-anchor-placement="top-center" id="item" data-id="${id}" class="cursor-pointer mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-inner duration-500 max-sm:hover:scale-100 hover:scale-105 dark:bg-[#303033] dark:border-gray-700"
//   >
//     <a "/#/projects/${id}" class="overflow-hidden h-64">
//       <div class="relative rounded-t-lg overflow-hidden h-64">
//         <img
//           class="rounded-t-lg w-full h-full scale-105 hover:scale-110 transition-all ease-in-out duration-500 object-cover"
//           src="${img}"
//           alt=""
//         />
//       </div>
//     </a>
//     <div class="p-5">
//       <a "/#/projects/${id}">
//         <h5
//           class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"style="
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           word-break: break-word;
//         "
//         >
//           ${title}
//         </h5>
//       </a>
//       <p
//         class="mb-3 font-normal text-gray-700 dark:text-gray-400"
//         style="
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           word-break: break-word;
//         "
//       >
//         ${content}
//       </p>
//       <a "/#/projects/${id}">
//         <p
//           class="block text-right py-2 text-sm font-bold italic hover:underline cursor-pointer"
//         >
//           ${create_at}
//         </p>
//       </a>
//       <a
//         "/#/projects/${id}"
//         class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       >
//         Read more
//         <svg
//           aria-hidden="true"
//           class="w-4 h-4 ml-2 -mr-1"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill-rule="evenodd"
//             d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//             clip-rule="evenodd"
//           ></path>
//         </svg>
//       </a>
//     </div>
//   </div>
//     `;
//       })
//       .join("");
//   }
//   useEffect(() => {
//     const items = document.querySelectorAll("#item");
//     items.forEach((item) => {
//       item.addEventListener("click", () => {
//         const idItem = item.dataset.id;
//         router.navigate(`/projects/${idItem}`);
//       });
//     });
//   });
//   let searchBarInner = "";
//   (() => {
//     if (control?.filter((item) => item.search == true).length > 0) {
//       searchBarInner = searchBar();
//     }
//   })();
//   return /*html*/ `
//   <section id="projects" class="md:pb-[3rem] bg-[#F0F1F3] dark:bg-zinc-900 dark:text-sky-100 text-gray-900">
//   <h1 class="md:py-10 md:pt-[120px] md:pb-14 max-md:pb-8 font-bold text-4xl md:text-[50px] text-center dark:text-sky-100">
//       ${projectConfig.title}
//   </h1>
//   ${searchBarInner}
//   <section class="max-w-6xl py-9 grid max-sm:gap-4 gap-16 grid-cols-3 max-sm:grid-cols-1 mx-auto items-stretch">
//       ${card}
//   </section>
//   <div class="w-full text-center">
//   <a href="#/${projectConfig.linkBtn}" data-navigo data-navigo-options="updateBrowserURL:false ,  resolveOptionsStrategy: ALL, resolveOptionsHash: false" class="viewmore" ><button
//           data-aos="fade-up"
//           data-aos-anchor-placement="bottom-bottom"
//           type="button"
//           class="dark:hover:bg-blue-300 relative px-8 py-2 overflow-hidden font-semibold rounded bg-zinc-900 text-sky-100 dark:bg-gray-100 dark:text-gray-900"
//       >
//           ${projectConfig.titleBtn}
//           <span class="absolute top-0 right-0 bg-blue-700 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 dark:bg-violet-400">New</span>
//       </button></a>
//   </div>
// </section>
//     `;
// };
// export default Projects;
