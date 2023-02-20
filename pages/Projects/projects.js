// import dataProject from "../../data/data";
import { router, useEffect, useState } from "../../lib";
import searchBar from "./search/searchBar";
import card from "./card";
const Projects = (params1, params2) => {
  console.log("index project run");
  const [projectConfig, setProjectConfig] = useState([]);
  const [projects, setProjects] = useState([]);
  const [cardProjects, setCardProjects] = useState([]);
  const [checkLoad, setCheckLoad] = useState(0);
  let title = "";
  let btnViewMore = "";
  let cardInner = "";
  let searchBarInner = "";
  useEffect(() => {
    Promise.all([
      fetch("https://uo56vw-8080.preview.csb.app/projectsConfig", {
        method: "GET",
      }),
      fetch("https://uo56vw-8080.preview.csb.app/projects", { method: "GET" }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        setProjectConfig(data1[0]);
        setProjects(data2);
        setCheckLoad(checkLoad + 1);
      })
      .catch((err) => console.log(err));
  }, []);
  const onHandleClick = (id) => {
    if (Number(id) == 0) {
      fetch(`https://uo56vw-8080.preview.csb.app/projects`)
        .then((response) => response.json())
        .then((data) => {
          setProjects(data);
        });
    } else {
      fetch(
        `https://uo56vw-8080.preview.csb.app/categories/${id}?_embed=projects`
      )
        .then((response) => response.json())
        .then((data) => setProjects(data.projects));
    }
  };
  const submitSearch = (kyw) => {
    console.log(kyw);
  };
  if (checkLoad == 1) {
    title = `<h1 class="md:py-10 md:pt-[120px] md:pb-14 max-md:pb-8 font-bold text-4xl md:text-[50px] text-center dark:text-sky-100">${projectConfig.title}</h1>`;
    if (params2?.map((item) => item.limitedCard == 3)) {
      const lastThree = [...projects].reverse().slice(0, 3);
      cardInner = lastThree?.map((item) => card([item])).join("");
      btnViewMore = `<a href="#/${projectConfig.linkBtn}" data-navigo data-navigo-options="updateBrowserURL:false ,  resolveOptionsStrategy: ALL, resolveOptionsHash: false" class="viewmore">
        <button data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" type="button" class="dark:hover:bg-blue-300 relative px-8 py-2 overflow-hidden font-semibold rounded bg-zinc-900 text-sky-100 dark:bg-gray-100 dark:text-gray-900">
        ${projectConfig.titleBtn}
        <span class="absolute top-0 right-0 bg-blue-700 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 dark:bg-violet-400">
          New
        </span>
        </button>
      </a>`;
    } else {
      searchBarInner = searchBar([submitSearch, onHandleClick]);
      cardInner = projects?.map((item) => card([item])).join("");
    }
  } else {
    title = `<h1 class="py-[10rem] text-lg font-bold text-center dark:text-sky-100">Loadding... </h1>`;
  }
  if (cardInner != undefined && cardInner !== "") {
    useEffect(() => {
      const items = document.querySelectorAll("#item");
      console.log(items);
      items.forEach((item) => {
        const idItem = item.dataset.id;
        router.navigate(`/projects/${idItem}`);
      });
    }, []);
  }
  return /*html*/ `
      <section id="projects" class="md:pb-[3rem] bg-[#F0F1F3] dark:bg-zinc-900 dark:text-sky-100 text-gray-900">
        ${title}
        ${searchBarInner}
        <section class="max-w-6xl py-9 grid max-sm:gap-4 gap-16 grid-cols-3 max-sm:grid-cols-1 mx-auto items-stretch">
        ${cardInner}
        </section>
        <div class="w-full text-center">
        ${btnViewMore}
        </div>
      </section>`;
};
export default Projects;
