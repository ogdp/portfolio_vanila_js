import axios from "axios";
import { router, useEffect, useState } from "../../../lib";

const category = () => {
  const [data, setData] = useState([]);
  const [lists, setLists] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://uo56vw-8080.preview.csb.app/categories"
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    setLists(
      data
        .map(
          (item) => `
    <form id="form_update_cate" class="grid grid-cols-2">
    <div class="mb-2">
      <label
        for="category_new"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >${item.title}</label
      >
      <input data-id="${item.id}"
        type="text"
        value="${item.title}"
        id="category_new"
        placeholder="Tên danh mục ..."
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-2">
      <label
        for="category_new"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Tuỳ chỉnh</label
      >
      <button data-id="${item.id}"
        type="submit"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-1 mb-2"
      >
        Cập nhật
      </button>
      <button data-id="${item.id}"
        id="btnCateRemove"
        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-1 mb-2"
      >
        Xoá
      </button>
    </div>
            </form>`
        )
        .join("")
    );
  }, [data]);
  useEffect(() => {
    const listFormCate = document.querySelectorAll("#form_update_cate");
    listFormCate.forEach((item) => {
      item.addEventListener("submit", (e) => {
        e.preventDefault();
        const element = item
          .querySelector("div")
          .querySelector("input#category_new");
        const value = element.value;
        const id = element.dataset.id;
        if (value !== "") {
          (async () => {
            try {
              const res = await axios.put(
                `https://uo56vw-8080.preview.csb.app/categories/${id}`,
                {
                  title: value,
                }
              );
              location.reload();
              //   router.navigate(`/admin/projects/cate/`);
            } catch (error) {
              console.log(error);
            }
          })();
        }
      });
    });

    // Remove

    const btnCateRemove = document.querySelectorAll("#btnCateRemove");
    btnCateRemove.forEach((item) => {
      item.addEventListener("click", (e) => {
        const comfirmed = confirm(
          "Bạn có chắc chắn muốn xoá không? (Những dự án thuộc danh mục này sẽ trở nên vô danh)"
        );
        const id = item.dataset.id;
        if (comfirmed) {
          setTimeout(
            (async () => {
              try {
                const res = await axios.delete(
                  `https://uo56vw-8080.preview.csb.app/categories/${id}`
                );
                if (res.status == 200) {
                  location.reload();
                }
              } catch (error) {
                console.log(error);
              }
            })(),
            1000
          );
        }
      });
    });

    // Add
    const form_add_cate = document.querySelector("#form_add_cate");
    form_add_cate.addEventListener("submit", (e) => {
      e.preventDefault();
      const element = form_add_cate
        .querySelector("div")
        .querySelector("#category_new");
      const value = element.value;
      if (value !== "") {
        (async () => {
          try {
            const res = await axios.post(
              "https://uo56vw-8080.preview.csb.app/categories",
              {
                title: value,
              }
            );
            location.reload();
          } catch (error) {
            console.log(error);
          }
        })();
      }
    });
  });

  return `
  <section class="min-h-screen dark:text-sky-100 dark:#1d1f20">
  <h1
    class="md:py-10 md:pb-14 font-bold text-2xl md:text-[50px] text-center dark:text-sky-100"
  >
    Quản lý danh mục
  </h1>
    <div class="relative max-w-5xl m-auto container_about">
    <div class="grid w-full md:gap-4 md:grid-cols-2 grid-cols-1">
    <div class="border border-r-stone-500 rounded-3xl px-4">
      <h4 class="text-2xl font-bold text-center my-6">
        Danh mục hiện có
      </h4>
     ${lists}
      </div>
      <div class="border border-l-stone-500 rounded-3xl px-4">
            <h4 class="text-2xl font-bold text-center my-6">Thêm danh mục</h4>
            <form id="form_add_cate">
              <div class="mb-6">
                <label
                  for="category_new"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tên danh mục mới</label
                >
                <input
                  type="text"
                  id="category_new"
                  placeholder="Tên danh mục ..."
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div class="mb-6">
                <button
                  type="submit"
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Thêm danh mục
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
  </section>
  `;
};

export default category;
