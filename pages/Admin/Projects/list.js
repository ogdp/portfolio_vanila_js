import { router, useEffect, useState } from "../../../lib";
import axios from "axios";
const list = () => {
  const api = "https://uo56vw-8080.preview.csb.app/projects";
  const [projects, setProjects] = useState([]);
  const [checkLoad, setCheckLoad] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://uo56vw-8080.preview.csb.app/projects");
        const data = await res.json();
        setProjects(data);
        setCheckLoad(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    // Edit projects
    const btnEdit = document.querySelectorAll("#btnEdit");
    if (btnEdit != null) {
      btnEdit.forEach((element) => {
        element.addEventListener("click", function () {
          const id = this.dataset.id;
          router.navigate(`/admin/projects/${id}/edit`);
        });
      });
    }
    // Remove projects
    const btnRemove = document.querySelectorAll("#btnRemove");
    if (btnRemove != null) {
      btnRemove.forEach((element) => {
        element.addEventListener("click", function () {
          const confirmed = window.confirm(
            "Bạn có chắc chắn muốn xóa dự án này không?"
          );
          if (confirmed) {
            const id = this.dataset.id;
            fetch(`${api}/${id}`, {
              method: "DELETE",
            }).then(() => {
              alert("Xóa thành công"), location.reload();
            });
          } else {
            console.log("Không");
          }
        });
      });
    }
    // btnRemoves
    const getCheckbox = [];
    const btnRemoves = document.querySelector("#btnRemoves");
    const checkAll = document.querySelector("#checkAll");
    const check = document.querySelectorAll("#checkProject");
    if (btnRemoves != null && checkAll != null) {
      checkAll.addEventListener("click", () => {
        if (checkAll.checked) {
          check.forEach((item) => {
            item.checked = true;
          });
        } else {
          check.forEach((item) => {
            item.checked = false;
          });
        }
      });
    }
    btnRemoves.addEventListener("click", () => {
      check.forEach((item) => {
        if (item.checked == true) {
          getCheckbox.push(item.dataset.id);
        }
      });
      const confirmed = window.confirm(
        "Bạn có chắc chắn xóa dự án đã chọn không?"
      );
      if (confirmed) {
        let i = 0;
        function deleteItem() {
          if (i < getCheckbox.length) {
            const loadding = document.querySelector("#loadding");
            loadding.style.zIndex = "1000";
            const id = Number(getCheckbox[i]);
            fetch(`${api}/${id}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((data) => console.log(data))
              .catch((error) => console.error(error));
            i++;
            setTimeout(deleteItem, 2000);
          } else {
            if (i == 0) {
              return alert("Đã tick đâu mà xoá ngớ ngẩn quá đi mất ^_^ ");
            } else {
              const loadding = document.querySelector("#loadding");
              loadding.style.zIndex = "-1";
              return alert("Xóa thành công"), location.reload();
            }
          }
        }
        deleteItem();
      } else {
        console.log("No");
      }
    });
  });
  return `
 
  <section class="min-h-screen dark:text-sky-100 dark:#1d1f20">
  <h1
    class="md:py-10 md:pb-14 font-bold text-2xl md:text-[50px] text-center dark:text-sky-100"
  >
    Dự án
  </h1>
  <div class=" py-4">
  <a href="#/admin/projects/add" type="button" class="text-white gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  <i class="fa-solid fa-plus"></i>
  <span class="-mt-[1px]">
  Thêm dự án
  </span>
</a>
<button type="button" id="btnRemoves" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Xoá mục đã chọn</button>
  </div>
  <div class="container_about flex justify-center items-center relative">
  <div id="loadding" class="absolute -z-10 flex items-center justify-center min-w-full min-h-full border border-gray-200 rounded-lg bg-gray-50 opacity-90 dark:bg-gray-800 dark:border-gray-700">
  <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
</div>
    <table class="table w-full">

      <thead>
        <th class="text-lg border border-slate-200 py-2 text-center px-2">
        <input id="checkAll" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        </th>
        <th class="text-lg border border-slate-200 py-2 text-center px-2">
          STT
        </th>
        <th class="text-lg border border-slate-200 py-2 text-center px-2">
          Tên dự án
        </th>
        <th class="text-lg border border-slate-200 py-2 text-center px-2">
          Tên website
        </th>
        <th class="text-lg border border-slate-200 py-2 text-center px-2">
          Định giá
        </th>
        <th class="text-lg border border-slate-200 py-2 text-center px-2">
          Thành viên tham gia
        </th>
        <th class="text-lg border border-slate-200 py-2 text-center px-2">
          Ngày phát triển
        </th>
        <th class="text-lg border border-slate-200 py-2 text-center px-2">
          Đường dẫn
        </th>
        <th class="text-lg border border-slate-200 py-2 text-center px-2">
          Tuỳ chỉnh
        </th>
      </thead>
      <tbody class="text-center">
        ${projects
          ?.map((item, index) => {
            return `
              <tr>
                <td class="border border-slate-200 py-3 px-2"><input data-id="${
                  item.id
                }" id="checkProject" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></td>
                <td class="border border-slate-200 py-3 px-2">${index + 1}</td>
                <td class="border border-slate-200 py-3 px-2">${item.title}</td>
                <td class="border border-slate-200 py-3 px-2">${
                  item.namePro
                }</td>
                <td class="border border-slate-200 py-3 px-2">${(() => {
                  const formattedNumber = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.pricePro);
                  return formattedNumber;
                })()}</td>
                <td class="border border-slate-200 py-3 px-2">
                ${item.member}
                </td>
                <td class="border border-slate-200 py-3 px-2">${(() => {
                  let selectedDate = new Date(item.create_at);
                  const formattedDate = selectedDate.toLocaleDateString(
                    "vi-VN",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );
                  return formattedDate;
                })()}</td>
                <td class="border border-slate-200 max-w-[100px] py-3 px-2">
                  <a
                    style="display:-webkit-box;
                    -webkit-line-clamp:1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-word;"
                    class="text-sky-500"
                    href="${item.link}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  ${item.link}
                  </a>
                </td>
                <td class="border border-slate-200 py-3 px-2">
                  <button data-id="${item.id}"
                    id="btnEdit"
                    class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
                  >
                    Chỉnh sửa
                  </button>
                  <button data-id="${item.id}"
                    id="btnRemove"
                    class="bg-red-500 hover:bg-red-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
              `;
          })
          .join("")}
      </tbody>
    </table>
  </div>
</section>
  `;
};
export default list;
{
  /* <tr>
          <td class="border border-slate-200 py-3 px-2">1</td>
          <td class="border border-slate-200 py-3 px-2">Xshop</td>
          <td class="border border-slate-200 py-3 px-2">1000$</td>
          <td class="border border-slate-200 py-3 px-2">
            Lê Quang Minh Đức
          </td>
          <td class="border border-slate-200 py-3 px-2">20/10/2023</td>
          <td class="border border-slate-200 py-3 px-2">
            <a
              class="text-sky-500"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/ogdp
            </a>
          </td>
          <td class="border border-slate-200 py-3 px-2">
            <button
              id="btnEdit"
              class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
            >
              Chỉnh sửa
            </button>
            <button
              id="btnRemove"
              class="bg-red-500 hover:bg-red-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
            >
              Xoá
            </button>
          </td>
        </tr> */
}
