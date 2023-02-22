import { useEffect, useState } from "../../lib";
const Contact = () => {
  const [dataContact, setDataContact] = useState([]);
  const [checkLoad, setCheckLoad] = useState(0);
  let contentContact = "";
  useEffect(() => {
    fetch("https://uo56vw-8080.preview.csb.app/contacts")
      .then((res) => res.json())
      .then((data) => {
        setDataContact(data[0]);
        setCheckLoad(checkLoad + 1);
      })
      .catch((err) => console.log(err));
  }, []);
  if (checkLoad == 1) {
    let contactMeInner = "";
    const { content: content_1 } = dataContact;
    const content = content_1?.find((item) => item.id == 1);
    const detail1 = content.details?.find((item) => item.id == 1);
    const detail2 = content.details?.find((item) => item.id == 2);
    contactMeInner = `
            <div class="py-6 md:py-0 md:px-6">
            <h1 class="text-4xl font-bold">${content.title}</h1>
            <p class="pt-2 pb-4">${content.smallTitle}</p>
            <div class="space-y-4">
                ${detail1.content
                  ?.map(
                    (item) => `<p class="flex items-center">
                              ${item.svg}
                              <span>${item.title}</span>
                            </p>`
                  )
                  .join("")}
            </div>
            <div class="py-10 flex flex-wrap max-w-[70%] gap-3">
                    ${detail2.content
                      ?.map(
                        (item) => `<a  data-aos="fade-up"
                                data-aos-easing="linear"
                                data-aos-duration="700" href="${item.href}" target="_blank" rel="noopener noreferrer">
                                    <button id="${item.id}" class="${item.css}">
                                        ${item.icon}
                                    </button>
                                </a>`
                      )
                      .join("")}
            </div>
        </div>
        `;

    contentContact = /*html*/ `
    <h1 class="md:py-10 md:pt-[120px] md:pb-14 font-bold text-2xl md:text-[50px] text-center dark:text-sky-100">
    ${dataContact.title}
    </h1>
    <section class="dark:bg-[#0F172A] dark:text-gray-50 md:pb-10">
    <div class="grid max-w-6xl grid-cols-1 py-6 md:pt-10 md:pb-28 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x _neumophic_ shadow-[3.3px_3.3px_15px_#DCDCDC,-3.3px_-3.3px_15px_#FFFFFF] rounded-[10px] background: #fbfbfb dark:shadow-none">
      ${contactMeInner}
      <form id="form_contact" class="flex flex-col py-6 space-y-6 md:py-0 md:px-6 ng-untouched ng-pristine ng-valid">
      <h1 class="text-4xl font-bold">Message</h1>
      <label class="block">
        <h5 class="mb-1 text-[19px] font-normal">Full name</h5>
        <input id="name_contact" type="text" placeholder="Le Quang Minh Duc" class="text-[18px] px-4 py-2 block w-full focus:outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:bg-gray-800" />
        <h5 id="notification_name" class="text-red-600 pt-1 px-2 text-sm font-bold truncate-[1]">
          
        </h5>
      </label>
      <label class="block">
        <h5 class="mb-1 text-[19px] font-normal">Email address</h5>
        <input id="email_contact" type="email" placeholder="abc@email.com" class="text-[18px] px-4 py-2 block w-full rounded-md shadow-sm focus:ring focus:outline-none focus:ring-opacity-75 focus:ring-violet-400 dark:bg-gray-800"  />
        <h5 id="notification_email" class="text-red-600 pt-1 px-2 text-sm font-bold truncate-[1]">
          
        </h5>
      </label>
      <label class="block">
        <h5 class="mb-1 text-[19px] font-normal">Message</h5>
        <textarea id="message_contact" rows="3" class="text-[18px] px-4 py-2 block w-full rounded-md focus:ring focus:ring-opacity-75 shadow-sm focus:outline-none focus:ring-violet-400 dark:bg-gray-800" placeholder="Message"></textarea>
        <h5 id="notification_message" class="text-red-600 pt-1 px-2 text-sm font-bold truncate-[1]">
          
        </h5>
      </label>
      <div class="w-auto self-center">
        <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
        <span class="mr-2">Send</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
        </svg>
        </button>
      </div>
      </form>
    </div>
    </section>`;
  }
  useEffect(() => {
    if (checkLoad == 1) {
      const form_contact = document.querySelector("#form_contact");
      form_contact.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.querySelector("#name_contact").value.trim();
        const email = document.querySelector("#email_contact").value.trim();
        const message = document.querySelector("#message_contact").value.trim();
        const noti_name = document.querySelector("#notification_name");
        const noti_email = document.querySelector("#notification_email");
        const noti_message = document.querySelector("#notification_message");
        let checkValidated = true;
        if (name === "") {
          noti_name.innerHTML = "Tên không được bỏ trống";
          checkValidated = false;
        } else if (/\d/.test(name)) {
          noti_name.innerHTML = "Tên không phải là số";
          checkValidated = false;
        } else {
          noti_name.innerHTML = "";
        }
        if (email === "") {
          noti_email.innerHTML = "Email không được bỏ trống";
          checkValidated = false;
        } else if (!isValidEmail(email)) {
          noti_email.innerHTML = "Email không đúng định dạng";
          checkValidated = false;
        } else {
          noti_email.innerHTML = "";
        }
        if (message === "") {
          noti_message.innerHTML = "Nội dung không được bỏ trống";
          checkValidated = false;
        } else {
          noti_message.innerHTML = "";
        }
        if (checkValidated == true) {
          alert("Gửi form thành công!");
          location.reload();
        }
      });
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    }
  });

  return /*html*/ `
      <section  id="contact"
      data-aos="fade-right"
      data-aos-offset="500"
      data-aos-easing="ease-in-sine"
      class="bg-[#F0F1F3] dark:bg-[#0F172A] dark:text-sky-100 text-gray-900">
      ${contentContact}
    </section>`;
};
export default Contact;
