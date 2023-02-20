import { useEffect, useState } from "../../../lib";
import categories from "./categories";
const searchBar = ([submitSearch, onHandleClick]) => {
  const url = "https://uo56vw-8080.preview.csb.app/projects";
  const [data, setData] = useState([]);
  const getApi = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getApi(url);
  }, []);
  function searchKyw(string, kyw, obj) {
    const outputs = [];
    let strings = string.toLowerCase();
    let search = `${kyw}`;
    if (strings.includes(search.toLowerCase())) {
      outputs.push(obj);
    } else {
    }
    return outputs[0];
  }
  useEffect(() => {
    const form = document.querySelector("#form_search");
    form.addEventListener("submit", (e) => {
      const kyw = document.querySelector(".kyw");
      e.preventDefault();
      getApi(url);
      submitSearch(kyw.value);
      // console.log(kyw.value);
      // data.filter((item) => {
      //   dataSearch.push(searchKyw(item.title, kyw.value, item));
      // });
      // setProject(
      //   dataSearch.filter((item) => {
      //     if (item != undefined) return item;
      //   })
      // );
      // check = false;
    });
    // console.log(check);
    // console.log(project);
    // if (project.length > 0) {
    //   setProject(project);
    // }
  }, []);
  return `
  <form id="form_search" class="relative z-10">
  <div
    class="flex items-center dark:bg-[#4d4d5021] justify-around max-w-6xl m-auto p-4 space-x-2 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition duration-200"
  >
    <div
      class="flex bg-gray-100 dark:bg-[#2b2b2b] p-3 w-[65%] space-x-4 rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 opacity-30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        class="kyw bg-gray-100 dark:bg-[#2b2b2b] dark:text-sky-100 text-black outline-none w-full"
        type="text"
        placeholder="Article name or keyword..."
      />
    </div>
    ${categories(onHandleClick)}
    <button class="bg-indigo-600 w-[20%] text-center py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer" type="submit">
    <div>
      <span>Search</span>
    </div>
    </button>
  </div>
</form>`;
};

export default searchBar;
