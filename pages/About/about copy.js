import { useEffect, useState } from "../../lib";

const About = () => {
  const [myInfo, setMyInfo] = useState([]);
  const [infoLeft, setInfoLeft] = useState([]);
  const [infoRight, setInfoRight] = useState([]);
  const [InfoTop, setInfoTop] = useState([]);
  const [introduce, setIntroduce] = useState([]);
  useEffect(() => {
    fetch("https://uo56vw-8080.preview.csb.app/about/1")
      .then((res) => res.json())
      .then((data) => {
        setMyInfo(data);
        if (Object.keys(data).length !== 0) {
          if (data.content.length !== 0) {
            setIntroduce(data.content[1]);
            if (data.content[0].basicInfo.length !== 0) {
              setInfoTop(data.content[0]);
              setInfoLeft(data.content[0].basicInfo[0]);
              setInfoRight(data.content[0].basicInfo[1]);
            }
          }
        }
      })
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    if (
      Object.keys(infoRight).length !== undefined &&
      Object.keys(infoRight).length !== 0
    ) {
      if (
        infoRight.content
          ?.map(
            (item) => ` <div class="py-1 flex">
            <h5 class="font-semibold">${item.title}</h5>
            <h5 class="font-semibold">${item.content}</h5>
            </div>`
          )
          .join("") != undefined
      ) {
        setInfoRight(
          infoRight.content
            ?.map(
              (item) => ` <div class="py-1 flex">
                      <h5 class="font-semibold">${item.title}</h5>
                      <h5 class="font-semibold">${item.content}</h5>
                      </div>`
            )
            .join("")
        );
      }
    }
    if (Object.keys(infoLeft).length !== 0) {
      if (
        infoLeft.content
          ?.map(
            (item) => ` <div class="py-1 flex">
           <h5 class="font-semibold">${item.title}</h5>
           <h5 class="font-semibold">${item.content}</h5>
           </div>`
          )
          .join("") != undefined
      ) {
        setInfoLeft(
          infoLeft.content
            ?.map(
              (item) => ` <div class="py-1 flex">
                        <h5 class="font-semibold">${item.title}</h5>
                        <h5 class="font-semibold">${item.content}</h5>
                        </div>`
            )
            .join("")
        );
      }
    }
  }, [infoRight, infoLeft]);
  return /*html*/ `
  <section id="about" class="dark:text-sky-100 dark:bg-[#1d1f20] md:pb-16">
     <h1 class="py-10 md:pt-[120px] md:pb-14 font-bold text-2xl md:text-[50px] text-center dark:text-sky-100">
          ${myInfo.title}
     </h1>
     <div class="container_about max-w-[1000px] m-auto flex justify-center items-center">
          <div data-aos="zoom-out-up" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true" data-aos-once="false" class="dark:shadow-none shadow-[rgba(0,0,0,0.35)_0px_5px_15px] rounded-xl w-full bg-gradient-to-r p-[3px] from-[#7928ca] to-[#ff0080]">
               <div class="flex flex-col justify-between h-full dark:bg-[#1d1f20] rounded-lg p-4">
                    <div class="flex-wrap pt-3 px-3 content_about flex dark:shadow-[9.91px_9.91px_15px_#1a1c1d,-9.91px_-9.91px_15px_#202223] dark:rounded-[5px]; dark:background: linear-gradient(145deg, #222426, #181a1a)  text-sm">
                         <div class="max-md:order-1 max-md:w-full l_about w-[25%]">
                              <div class="w-full">
                                   <div data-aos="flip-up" data-aos-offset="200" data-aos-delay="150" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true" data-aos-once="false" class="w-full bg-white p-2 rounded-lg">
                                        <img class="rounded-lg md:w-full" src="${myInfo.srcImg}" alt="" srcset="" />
                                   </div>
                              </div>
                         </div>
                         <div class="gradient_about_font font-raleway max-md:order-2 max-md:w-full r_about w-[75%] flex justify-center text-sky-100">
                              <div class="md:p-10 md:pr-0 md:pt-0">
                                   <div>
                                        <h1 class="uppercase font-bold md:text-4xl max-md:text-xl max-md:text-center max-md:py-3">
                                            ${myInfo.name}
                                        </h1>
                                        <!-- Basic information -->
                                        <div class="text-lg md:p-5 md:pb-0 md:pl-0 md:pr-0">
                                             <h5 class="font-semibold md:text-xl">${InfoTop.title}</h5>
                                             <div class="flex-wrap grid md:grid-cols-2 max-md:grid-cols-1 pt-2">
                                                  <div class="left">
                                                       ${infoLeft}
                                                  </div>
                                                  <div class="right">
                                                      ${infoRight}
                                                  </div>
                                             </div>
                                        </div>
                                        <!-- My lover -->
                                        <div class="md:p-5 md:pb-0 md:pl-0 md:pr-0">
                                             <h5 class="font-semibold md:text-xl">
                                                  ${introduce.title}
                                             </h5>
                                             <p class="pt-2 text-lg">
                                                  ${introduce.introduce}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</section>

  `;
};

export default About;
