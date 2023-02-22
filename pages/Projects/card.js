const card = (projects) => {
  // data-aos="flip-right"
  // data-aos-offset="100"
  // data-aos-delay="50"
  // data-aos-duration="500"
  // data-aos-easing="ease-in-out"
  // data-aos-mirror="true"
  // data-aos-once="false"
  // data-aos-anchor-placement="top-center"
  return `
  ${projects
    ?.map((item) => {
      let cc = "";
      const { id, title, img, member, content, create_at, link } = item;
      return `
    <div   data-aos="flip-right"
    data-aos-offset="100"
    data-aos-delay="50"
    data-aos-duration="500"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="false"
    data-aos-anchor-placement="top-center" id="item" data-id="${id}" class="cursor-pointer mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-inner duration-500 max-sm:hover:scale-100 hover:scale-105 dark:bg-[#303033] dark:border-gray-700"
            >
            <a class="overflow-hidden h-64">
            <div class="relative rounded-t-lg overflow-hidden h-64">
                <img
                class="rounded-t-lg w-full h-full scale-105 hover:scale-110 transition-all ease-in-out duration-500 object-cover"
                src="${img}"
                alt=""
                />
            </div>
            </a href="#">
            <div class="p-5">
            <a "/#/projects/${id}">
                <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"style="
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-word;
                "
                >
                ${title}
                </h5>
            </a>
            <p
                class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                style="
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-word;
                ">
                <p>
                <div class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                style="
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-word;
                ">
                ${content}
                </div>
                </p>
            </p>
            <a "/#/projects/${id}">
                <p
                class="block text-right py-2 text-sm font-bold italic hover:underline cursor-pointer"
                >
                ${(() => {
                  let selectedDate = new Date(create_at);
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
                })()}
                </p>
            </a>
            <a
                "/#/projects/${id}"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Read more
                <svg
                aria-hidden="true"
                class="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                ></path>
                </svg>
            </a>
            </div>
            </div>
    `;
    })
    .join("")}
  `;
};

export default card;
