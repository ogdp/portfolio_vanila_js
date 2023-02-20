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
router.notFound(() => {
  console.log("NotFound");
});

router.resolve();
