// import dataProject from "../../data/data";
import { router, useEffect, useState } from "../../lib";
import searchBar from "./search/searchBar";
import cardInner from "./card";
const Projects = (params, control) => {
  // console.log(params, control);
  const [projects, setProjects] = useState([]);
  const [projectConfig, setProjectConfig] = useState([]);
  const [projectFollowPage, setProjectFollowPage] = useState([]);
  useEffect(() => {
    getProjectsAll();
  }, []);
  function getProjectsAll() {
    return fetch("https://uo56vw-8080.preview.csb.app/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetch("https://uo56vw-8080.preview.csb.app/projectsConfig", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data2) => setProjectConfig(data2[0]))
      .catch((err2) => console.log(err2));
  }, []);
  // let card;
  if (control?.filter((item) => item?.cardMin === true).length > 0) {
    let newProjects = projects?.slice(projects.length - 3);
    // setProjects(newProjects);
  }
  useEffect(() => {
    const items = document.querySelectorAll("#item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const idItem = item.dataset.id;
        router.navigate(`/projects/${idItem}`);
      });
    });
  });
  const onHandleClick = (id) => {
    if (id == 0) {
      getProjectsAll();
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
    getProjectsAll();
    console.log(projects);
  };
  // const { limitedCard } = control[0];
  // console.log(control[0]);
  // console.log(limitedCard);
  // if (projects.length > 0) {
  //   console.log(projects.length);
  //   console.log(projects);
  //   let pro = projects;
  //   console.log(limitedCard);
  //   checklistProjects(limitedCard, pro);
  // }

  const checklistProjects = (numberCard, projects) => {
    let sliceProject = projects?.slice(projects.length - numberCard);
    setProjectFollowPage(sliceProject);
  };
  useEffect(() => {
    if (control.length > 0) {
      let { limitedCard } = control[0];
      checklistProjects(limitedCard, projects);
    }
  }, [projects]);

  return /*html*/ `
  ${console.log(Date())}
  <section id="projects" class="md:pb-[3rem] bg-[#F0F1F3] dark:bg-zinc-900 dark:text-sky-100 text-gray-900">
  <h1 class="md:py-10 md:pt-[120px] md:pb-14 max-md:pb-8 font-bold text-4xl md:text-[50px] text-center dark:text-sky-100">${
    projectConfig.title
  }</h1>
    ${
      control?.filter((item) => item.search == true).length > 0
        ? searchBar({ submitSearch, onHandleClick })
        : ""
    }
  <section class="max-w-6xl py-9 grid max-sm:gap-4 gap-16 grid-cols-3 max-sm:grid-cols-1 mx-auto items-stretch">
      ${cardInner(projectFollowPage)}
  </section>
  <div class="w-full text-center">
  <a href="#/${
    projectConfig.linkBtn
  }" data-navigo data-navigo-options="updateBrowserURL:false ,  resolveOptionsStrategy: ALL, resolveOptionsHash: false" class="viewmore" ><button
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          type="button"
          class="dark:hover:bg-blue-300 relative px-8 py-2 overflow-hidden font-semibold rounded bg-zinc-900 text-sky-100 dark:bg-gray-100 dark:text-gray-900"
      >
          ${projectConfig.titleBtn}
          <span class="absolute top-0 right-0 bg-blue-700 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 dark:bg-violet-400">New</span>
      </button></a>
  </div>
</section> 
    `;
};
export default Projects;
