import { useEffect, useState } from "../../../lib";

const categories = (onHandleClick) => {
  // const url = "https://uo56vw-8080.preview.csb.app/categories";
  const [data, setData] = useState([]);
  const [checkLoad, setCheckLoad] = useState(false);
  let categoryInner = "";
  // useEffect(() => {
  //   fetch("https://uo56vw-8080.preview.csb.app/categories")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //       setCheckLoad(true);
  //     })
  //     .catch((error) => console.error(error));
  // }, [checkLoad]);
  async function fetchData() {
    try {
      const response = await fetch(
        "https://uo56vw-8080.preview.csb.app/categories"
      );
      const data = await response.json();
      setData(data);
      setCheckLoad(true);
    } catch (error) {
      console.error(error);
    }
  }
  if (checkLoad == true) {
    categoryInner = data
      .map(
        (item) => `
    <div data-id="${item.id}" class="category_btn flex my-1 mx-1 py-1 px-3 bg-slate-600 hover:bg-slate-500 rounded-lg text-sky-100 font-semibold cursor-pointer">
    <span>${item.title}</span>
    </div>`
      )
      .join("");
  }
  useEffect(() => {
    fetchData();
  }, [checkLoad]);

  useEffect(() => {
    getCategory();
  });
  function getCategory() {
    const btns = document.querySelectorAll(".category_btn");
    for (const btn of btns) {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        console.log(id);
        document.querySelector("#categories").textContent =
          this.querySelector("span").textContent;
        onHandleClick(id);
      });
    }
  }
  // if (!checkLoad) {
  //   return null;
  // }
  return `
        <div
        class="relative group flex justify-around py-3 px-4 bg-slate-700 w-[18%] rounded-lg text-sky-100 font-semibold cursor-pointer"
        >
        <span class="truncate" id="categories">All categories</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
            />
        </svg>
        <div
            class="hidden group-hover:block absolute z-50 top-[100%] min-w-full bg-slate-700 rounded-md left-0">
            <div data-id="0" class="category_btn flex my-1 mx-1 py-1 px-3 bg-slate-600 hover:bg-slate-500 rounded-lg text-sky-100 font-semibold cursor-pointer">
              <span>All categories</span>
              </div>
            ${categoryInner}
        </div>
    </div>
  `;
};

export default categories;
