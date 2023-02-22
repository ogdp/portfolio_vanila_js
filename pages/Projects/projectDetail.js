// import dataProject from "../../data/data";
import axios from "axios";
import { router, useEffect, useState } from "../../lib";
const ProjectDetail = (id) => {
  const idItem = id;
  const [projectDetail, setProjectDetail] = useState([]);
  const [checkGetData, setCheckGetData] = useState(false);
  // useEffect(() => {

  //   fetch(`https://uo56vw-8080.preview.csb.app/projects/${idItem}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((resData) => {
  //       setProjectDetail(resData);
  //       setCheckGetData(true);
  //     })
  //     .catch((error) => console.log(error));
  // }, [checkGetData]);
  useEffect(async () => {
    try {
      const response = await fetch(
        `https://uo56vw-8080.preview.csb.app/projects/${idItem}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const resData = await response.json();
      setProjectDetail(resData);
      setCheckGetData(true);
    } catch (error) {
      console.log(error);
    }
  }, [checkGetData]);

  const {
    title,
    namePro,
    content,
    member,
    link,
    img,
    create_at,
    views,
    pricePro,
  } = projectDetail;
  useEffect(() => {
    const closeTab = document.querySelector(".closeTab");
    closeTab.addEventListener("click", () => {
      // window.history.back();
      router.navigate("/projectsList");
    });
  });

  const [listImgs, setListImgs] = useState("");
  const [anhBia, setAnhBia] = useState("");
  useEffect(() => {
    if (checkGetData == true && img.length >= 1) {
      let aBia = `<img src="${img[0]}" alt="Lỗi tải hình ảnh" class="mx-auto max-sm:w-[100%] w-[90%]"/>`;
      setAnhBia(aBia);
      let cc = "";
      for (let index = 1; index < img.length; index++) {
        cc =
          cc +
          `<div class="flex justify-center items-center object-cover h-48 overflow-hidden" ><img src="${img[index]}" alt="Image 1" class="min-w-[120%]"/></div>`;
      }
      setListImgs(cc);
    }
  }, [checkGetData]);
  return [
    checkGetData,
    `<section data-aos="zoom-out-up" 
      class="fixed w-full z-10 h-screen top-0 left-0 bg-white/[0.2] backdrop-blur-sm justify-center flex items-center scroll-auto"
    >
      <div
        class="shadow-[rgba(0,0,0,0.24)_0px_3px_8px] max-sm:w-[96%] w-3/5 h-[80%] py-14 pt-3 rounded-lg max-sm:px-3 px-12 
        bg-slate-100/[.9] dark:dark:bg-[#303033] backdrop-blur-2xl dark:text-white-100 scroll-auto"
      >
        <h2
          class="dark:text-neutral-50	 text-center text-[2.3rem] mb-4 max-sm:text-2xl font-medium"
          style="
          
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
          "
        >
          ${title}
        </h2>
        <div
          class="w-[100%] h-[85%] overflow-x-hidden overflow-y-auto border-2 border-red-900/[.7] rounded-md"
        >
          <div class="mt-3">
            ${anhBia}
          </div>
          <div
            class="bg-zinc-400/[.5] rounded-b-md max-sm:w-[100%] w-[90%] mx-auto"
          >
            <p class="dark:text-neutral-50 text-center py-1">
              Hình ảnh giao diện trang chủ website
              <a href="${link}" class="dark:text-neutral-50 underline">${namePro}</a>
            </p>
          </div>
          <div class="w-full px-1 py-2 grid grid-cols-4 gap-1">
          ${listImgs}
          </div>
          <div
            class="max-sm:w-[100%] w-[90%] dark:text-neutral-50 mx-auto py-3 pt-2 pb-5 px-[.2rem]"
          >
            <h2 class="dark:text-neutral-50 font-semibold my-2">
              Giới thiệu website:
              <a href="${link}" class="dark:text-neutral-50 font-semibold underline">${namePro}</a>
            </h2>
            <p class="dark:text-neutral-50">
              ${content}
            </p>
            <h2 class="dark:text-neutral-50 font-semibold my-2">
              Developers: <a class="dark:text-neutral-50">${member}</a>
            </h2>
            <p class="dark:text-neutral-50">
              Thống kê lượt truy cập đến thời điểm hiện tại:
              <span class="dark:text-neutral-50 font-semibold"> ${views} <i class="fa-duotone fa-eye mx-1"></i> </span>
            </p>
            <p class="dark:text-neutral-50">Ngày tạo: <span class=" font-semibold">${create_at}</span></p>
            <p class="dark:text-neutral-50">
            <span class="dark:text-neutral-50">
            Chi phí ước tính:
            </span>  
              <span class="font-semibold"> ~ ${pricePro} $</span>
            </p>
          </div>
        </div>
        <div class="absolute top-0 right-0 mr-9 mt-3">
          <span
            class="rounded-full absolute w-5 h-5 bg-green-500 -ml-12"
          ></span>
          <span
            class="rounded-full absolute w-5 h-5 bg-yellow-600 -ml-6"
          ></span>
          <a class="closeTab">
          <span
            title="Close"
            class="cursor-pointer hover:w-6 hover:h-6 duration-200 rounded-full absolute w-5 h-5 bg-red-600"
          ></span>
          </a>
        </div>
        <i
          class="fa-brands fa-apple absolute caret-slate-900 top-[100%] left-[50%] -translate-x-[50%] -translate-y-[100%] pb-6 text-4xl"
        ></i>
      </div>
    </section>`,
  ];
};
export default ProjectDetail;
