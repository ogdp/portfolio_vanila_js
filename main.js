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
  AdminHeader,
  AdminProjects,
  AdminProjectsAdd,
  AdminProjectsEdit,
  AdminProjectsCategory,
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
// user | {"id": 1}
router.on("/admin/*", () => {}, {
  before: (next) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user | (user && user.id != 1)) return (window.location.href = "/");
    next();
  },
});
router.on("/admin/", () => render(app, () => AdminHeader()));
router.on("/admin/about", () =>
  render(app, () => AdminHeader() + AdminAbout())
);
router.on("/admin/projects", () =>
  render(app, () => AdminHeader() + AdminProjects())
);
router.on("/admin/projects/add", () =>
  render(app, () => AdminHeader() + AdminProjectsAdd())
);
router.on("/admin/projects/cate", () =>
  render(app, () => AdminHeader() + AdminProjectsCategory())
);
router.on("/admin/projects/:id/:action", ({ data }) => {
  const id = data.id;
  render(app, () => {
    if (typeof AdminProjectsEdit == "function") {
      // console.log(typeof AdminProjectsEdit);
      return AdminHeader() + AdminProjectsEdit(id);
    } else {
      return AdminHeader() + AdminProjectsEdit;
    }
  });
});
router.notFound(function () {
  console.log("page not found");
});
router.resolve();
