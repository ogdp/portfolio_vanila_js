import axios from "axios";
import { router, useEffect, useState } from "../../../lib";

const add = (id) => {
  const [dataAdd, setDataAdd] = useState([]);
  const [category, setCategory] = useState([]);
  const [checkLoad, setCheckLoad] = useState(false);
  useEffect(() => {
    fetch("https://uo56vw-8080.preview.csb.app/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => console.error(error));
  }, []);
  let categoryInner = "";
  if (Object.keys(category).length != 0) {
    categoryInner = category
      ?.map((item) => `<option value="${item.id}">${item.title}</option>`)
      .join("");
  }
  useEffect(() => {
    if (Object.keys(category).length != 0) {
      let editor;
      ClassicEditor.create(document.querySelector("#editor"))
        .then((newEditor) => {
          editor = newEditor;
        })
        .catch((error) => {
          console.error(error);
        });
      const formAdd = document.querySelector("#form_add");
      formAdd.addEventListener("submit", async function (e) {
        e.preventDefault();
        const content = editor.getData();
        const title = document.querySelector("#title").value;
        const namePro = document.querySelector("#namePro").value;
        const link = document.querySelector("#link").value;
        const member = document.querySelector("#member").value;
        // const img = document.querySelector("#img").value;
        const pricePro = document.querySelector("#pricePro").value;
        const create_at = document.querySelector("#create_at").value;
        const category = document.querySelector("#category").value;
        const multiple_imgs = document.querySelector("#multiple_imgs").files;
        const dataImgs = await uploadImgs(multiple_imgs);
        const newProject = {
          title: title,
          namePro: namePro,
          views: Number(0),
          content: content,
          pricePro: pricePro,
          member: [member],
          link: link,
          img: dataImgs,
          create_at: create_at,
          categoryId: Number(category),
        };
        fetch(`https://uo56vw-8080.preview.csb.app/projects/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject),
        })
          .then(() => router.navigate("/admin/projects"))
          .catch((error) => console.log(error));
      });
      const uploadImgs = async (files) => {
        if (files) {
          const CLOUD_NAME = "minhduc";
          const PRESET_NAME = "myPortfolio";
          const FOLDER_NAME = "myPortfolio";
          const urls = [];
          const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
          // Mặc định khi xử lý ảnh phải có form Data
          const formData = new FormData(); // key : value
          formData.append("upload_preset", PRESET_NAME);
          formData.append("folder", FOLDER_NAME);
          for (const file of files) {
            formData.append("file", file);
            // Khởi tạo một async và ở await (async nằm đầu func thực thi , await được gắn vào một biến cho đến khi phần lệnh đó được thực thi)
            const response = await axios.post(api, formData, {
              headers: { "Content-Type": "application/form-data" },
            });
            urls.push(response.data.url);
          }
          return urls;
        }
      };
      showImgs();
      function showImgs() {
        const showImages = document.querySelector(".viewImg");
        showImages?.addEventListener("click", () => {
          let check;
          showImages.classList.forEach((item) => {
            if (item == "active") {
              check = true;
            } else {
              check = false;
            }
          });
          if (check) {
            showImages.classList.remove("active");
            document.querySelector(".imgPro").style.display = "none";
          } else {
            showImages.classList.add("active");
            document.querySelector(".imgPro").style.display = "block";
          }
        });
      }
      (() => {
        multiple_imgs.addEventListener("change", function () {
          const multiple_imgs = document.querySelector("#multiple_imgs");
          if (multiple_imgs.files.length > 0) {
            const fileList = [...multiple_imgs.files]; //
            const listImgs = document.querySelector(".listImgs"); // Lấy đối tượng DOM của thẻ có class là 'listImgs'
            fileList.forEach((file) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function () {
                const img = document.createElement("img");
                img.src = reader.result;
                img.classList.add(
                  "rounded-md",
                  "w-[7rem]",
                  "h-[7rem]",
                  "object-cover",
                  "mx-1"
                ); // thêm các class vào thẻ img
                listImgs.appendChild(img); // Thêm thẻ img vào thẻ có class là 'listImgs'
              };
            });
          } else {
            while (document.querySelector(".listImgs").firstChild) {
              document
                .querySelector(".listImgs")
                .removeChild(document.querySelector(".listImgs").firstChild);
            }
          }
        });
      })();
    }
  });

  return `<section class="min-h-screen dark:text-sky-100 dark:#1d1f20">
  <h1
    class="md:py-10 md:pb-14 font-bold text-2xl md:text-[50px] text-center dark:text-sky-100"
  >
    Chi tiết dự án
  </h1>
  <div class="py-4 max-w-5xl m-auto">
  <a href="#/admin/projects/" type="button" class="text-white gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  <span class="-mt-[1px]">
  Danh sách dự án
  </span>
</a>
  </div>
  <div
    class="max-w-5xl m-auto container_about flex justify-center items-center"
  >
    <form id="form_add" class="m-auto w-full flex flex-col gap-2">
    <div class="grid grid-cols-2 flex-wrap gap-x-10 gap-y-0">
    <div class="mb-6">
      <label
        for="title"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Tiêu đề</label
      >
      <input
        id="title"
        type="text"
        value=""
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-6">
      <label
        for="namePro"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Tên dự án</label
      >
      <input
        id="namePro"
        type="text"
        value=""
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-6">
      <label
        for="link"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Link dự án</label
      >
      <input
        type="text"
        id="link"
        value=""
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-6">
      <label
        for="member"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Thành viên tham gia</label
      >
      <input
        type="text"
        id="member"
        value=""
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-6 relative">
      <label
        for="multiple_imgs"
        class="cursor-pointer block float-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Tải lên ảnh (Tải được nhiều ảnh) </label
      ><span class="cursor-pointer viewImg mx-2 underline">
      <i class="fa-duotone fa-eye mx-1"></i>Xem ảnh
    </span>
        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_imgs" type="file" multiple>
        <div class="imgPro absolute hidden z-50">
        <div class="listImgs bg-[#0000002e] flex flex-wrap gap-1 top-1 duration-150">
          
        </div>
        </div>
    </div>
    <div class="mb-6">
      <label
        for="pricePro"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Định giá dự án</label
      >
      <input
        type="number"
        id="pricePro"
        value=""
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-6">
      <label
        for="category"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Danh mục</label>
        <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          ${categoryInner}
        </select>
    </div>
    <div class="mb-6">
      <label
        for="create_at"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Ngày phát triển dự án</label
      >
      <input
        type="datetime-local"
        id="create_at"
        value=""
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    </div>
    <div id="editor"></div>
      <div class="flex max-w-xs m-auto gap-4 pt-10">
            <button
              type="submit"
              id="btnAdd"
              class="bg-sky-500 hover:bg-sky-700 px-10 py-2 text-sm leading-5 rounded-full font-semibold text-white"
            >
              Lưu
            </button>
            <button 
              type="reset"
              class="cursor-pointer text-center bg-red-500 hover:bg-red-700 px-10 py-2 text-sm leading-5 rounded-full font-semibold text-white"
            >
              Reset
            </button>
          </div>
    </form>
  </div>
</section>`;
};

export default add;
