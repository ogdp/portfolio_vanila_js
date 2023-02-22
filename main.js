import { render, router } from "./lib";
import {
  Header,
  Footer,
  Home,
  Projects,
  indexProject,
  ProjectDetail,
  About,
  Contact,
  Posts,
  Admin,
  AdminProjects,
  AdminProjectsAdd,
  AdminProjectsEdit,
  AdminAbout,
  AdminContacts,
} from "./Global/components/components";
// Import font awesome
import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// ----

const app = document.querySelector("#app");
// fontAwesome
library.add(faUser);
const app2 = createApp(app);
app2.component("font-awesome-icon", FontAwesomeIcon);
app2.mount("#app");
// ---------
router.on("/", () => render(app, Home));
// router.on("/projects", (params) =>
//   render(app, (params) => {
//     if (typeof Projects === "function") {
//       return (
//         Header() +
//         `<div class="min-w-full h-[88px]"></div>` +
//         Projects(params) +
//         Footer()
//       );
//     } else {
//       return Header() + Projects + Footer();
//     }
//   })
// );
router.on("/projectsList", () => render(app, indexProject));
router.on("/projects/:id", ({ data }) => {
  const id = data.id;
  render(app, () => {
    if (typeof ProjectDetail === "function") {
      return Projects() + ProjectDetail(id);
    } else {
      return ProjectDetail;
    }
  });
});
// router.on("/about", () => render(app, About));
// router.on("/contact", () => render(app, Contact));
// router.on("/posts", () => render(app, Posts));
// router.on("/postsDetail/:id", () => render(app, PostsDetail));
// router.notFound(() => render(app, () => console.log("NotFound")));
// ---Admin ----
router.on("/admin/", () => render(app, Admin));
router.on("/admin/projects", () => render(app, AdminProjects));
router.on("/admin/projects/add", () => render(app, AdminProjectsAdd));
router.on("/admin/projects/:id/:action", ({ data }) => {
  const id = data.id;
  render(app, () => {
    if (typeof AdminProjectsEdit == "function") {
      // console.log(typeof AdminProjectsEdit);
      return AdminProjectsEdit(id);
    } else {
      return AdminProjectsEdit;
    }
  });
});
router.notFound(function () {
  console.log("page not found");
});
router.resolve();
