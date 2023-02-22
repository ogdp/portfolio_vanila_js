import axios from "axios";
import { router, useEffect, useState } from "../../../lib";

const index = () => {
  const [data, setData] = useState([]);
  const [topTitle, setTopTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [topContent, setTopContent] = useState([]);
  const [topContentLeft, setTopContentLeft] = useState([]);
  const [topContentRight, setTopContentRight] = useState([]);
  const [bottomContent, setBottomContent] = useState([]);
  useEffect(async () => {
    try {
      const myInfo = await fetch("https://uo56vw-8080.preview.csb.app/about");
      const res = await myInfo.json();
      setData(res);
      setTopTitle(res[0]);
      setContent(res[0].content);
      setTopContent(res[0].content[0]);
      setTopContentLeft(res[0].content[0].basicInfo[0].content);
      setTopContentRight(res[0].content[0].basicInfo[1].content);
      setBottomContent(res[0].content[1]);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const formAbout = document.querySelector("#form_about");
    // console.log(formAbout);
    formAbout.addEventListener("submit", async function (e) {
      e.preventDefault();
      const title = document.querySelector("#title").value;
      const nameBig = document.querySelector("#nameBig").value;
      const name = document.querySelector("#name").value;
      const education = document.querySelector("#education").value;
      const birthdate = document.querySelector("#birthdate").value;
      const phone = document.querySelector("#phone").value;
      const email = document.querySelector("#email").value;
      const specialized = document.querySelector("#specialized").value;
      const address = document.querySelector("#address").value;
      const myskill = document.querySelector("#myskill").value;
      const imgNew = document.querySelector("#user_avatar").files;
      const imgOld = document.querySelector("#imgOld").value;
      const about = document.querySelector("#about").value;
      let urlImg;
      if (imgNew.length > 0) {
        urlImg = await uploadImgs(imgNew[0]);
      } else {
        urlImg = imgOld;
      }
      const dataUpdated = configAbout([
        title,
        nameBig,
        name,
        birthdate,
        address,
        myskill,
        education,
        specialized,
        email,
        phone,
        urlImg,
        about,
      ]);
      updateData(dataUpdated);
      async function updateData(dataUpdated) {
        try {
          const res = await axios.put(
            "https://uo56vw-8080.preview.csb.app/about/1",
            dataUpdated
          );
          router.navigate("/admin/about");
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
  const configAbout = (arrData) => {
    return {
      id: 1,
      title: arrData[0],
      name: arrData[1],
      srcImg: arrData[10],
      content: [
        {
          id: 1,
          title: "Information:",
          basicInfo: [
            {
              id: 1,
              content: [
                {
                  id: 1,
                  title: "Name: &ensp;",
                  content: arrData[2],
                },
                {
                  id: 2,
                  title: "Birthdate: &ensp;",
                  content: arrData[3],
                },
                {
                  id: 3,
                  title: "Address: &ensp;",
                  content: arrData[4],
                },
                {
                  id: 4,
                  title: "My skill: &ensp;",
                  content: arrData[5],
                },
              ],
            },
            {
              id: 2,
              content: [
                {
                  id: 1,
                  title: "Education: &ensp;",
                  content: arrData[6],
                },
                {
                  id: 2,
                  title: "Specialized: &ensp;",
                  content: arrData[7],
                },
                {
                  id: 3,
                  title: "Email: &ensp;",
                  content: arrData[8],
                },
                {
                  id: 4,
                  title: "Phone: &ensp;",
                  content: arrData[9],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          title: "Introduce yourself: ",
          introduce: arrData[11],
        },
      ],
    };
  };
  const uploadImgs = async (file) => {
    if (file) {
      const CLOUD_NAME = "minhduc";
      const PRESET_NAME = "myPortfolio";
      const FOLDER_NAME = "myPortfolio";
      const urls = [];
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      // Mặc định khi xử lý ảnh phải có form Data
      const formData = new FormData(); // key : value
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);
      formData.append("file", file);
      // Khởi tạo một async và ở await (async nằm đầu func thực thi , await được gắn vào một biến cho đến khi phần lệnh đó được thực thi)
      const response = await axios.post(api, formData, {
        headers: { "Content-Type": "application/form-data" },
      });
      urls.push(response.data.url);
      return urls;
    }
  };
  return `
  <section class="min-h-screen dark:text-sky-100 dark:#1d1f20">
  <h1
    class="md:py-10 md:pb-14 font-bold text-2xl md:text-[50px] text-center dark:text-sky-100"
  >
    Quản lý giới thiệu
  </h1>
  <form id="form_about" class="relative max-w-5xl m-auto container_about">
      <div style="display: none"  class="min-w-[120%] min-h-full">
      <div id="loadding" class="flex absolute -ml-[10%] -mt-[5%] min-w-[120%]  min-h-[110%] transition-all duration-300 opacity-95 rounded-lg blur-lg items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"></div>
      <div id="loadding_child" class="px-5 py-2 absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 z-[1000] text-[15px] font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
      </div>
      <div class="grid gap-4 mb-6 md:grid-cols-2">
          <div>
              <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề</label>
              <input value="${topTitle.title}" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
          </div>
          <div>
              <label for="nameBig" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ tên(Ngay dưới tiêu đề)</label>
              <input value="${topTitle.name}" type="text" id="nameBig" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
          </div>
          <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ tên</label>
              <input type="text" value="${topContentLeft[0]?.content}" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
          </div>
          <div>
              <label for="education" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trường học</label>
              <input type="text" value="${topContentRight[0]?.content}" id="education" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
          </div>
          <div>
              <label for="birthdate"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày sinh</label>
              <input type="date" value="${topContentLeft[1]?.content}" id="birthdate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>  
          <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
              <input type="tel" value="${topContentRight[3]?.content}" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          </div>
          <div>
              <label for="specialized" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chuyên ngành</label>
              <input type="text" value="${topContentRight[1]?.content}"id="specialized" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="address"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
              <input type="address" value="${topContentLeft[2]?.content}" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
          </div>

          <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" value="${topContentRight[2]?.content}" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
          </div> 
          <div class="mb-6">
              <label for="myskill" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">My skill</label>
              <input type="text" value="${topContentLeft[3]?.content}" id="myskill" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
           
          <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
          <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file">
          <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Chọn một bức ảnh đại diện cho thẻ giới thiệu</div>
          </div>

          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Ảnh đại diện</label>
            <img src="${topTitle.srcImg}" width=64 height=64 />
            <input id="imgOld" type="text" value="${topTitle.srcImg}" hidden>
          </div> 
          

      </div>
      <div class="mb-6">
          <label for="about" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới thiệu</label>
          <textarea id="about" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">${bottomContent.introduce}</textarea>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Lưu thay đổi</button>
      <button type="reset" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Trở lại như cũ</button>
  </form>
  </section>
  `;
};

export default index;
