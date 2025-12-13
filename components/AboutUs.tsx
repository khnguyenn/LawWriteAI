"use client";
import Image from "next/image";
import userImage1 from "@/assets/char.jpeg";
import userImage2 from "@/assets/mai.jpeg";
import userImage3 from "@/assets/khoinguyennguyen.jpg";
import userImage4 from "@/assets/amanda.jpeg";

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center text-center mt-20">
      <h3 className="text-lg font-semibold text-mq-red mb-2">About Us</h3>
      <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800">
        Meet Our People
      </h1>
      <p className="w-3/5 mb-14 text-gray-500 text-sm">
        Macquarie Law School x Macquarie School of Computing Joint Initiative
      </p>
      <div className="flex flex-wrap gap-6 items-stretch justify-center">
        <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-full min-h-[280px] rounded-md cursor-pointer hover:border-mq-red hover:bg-mq-red transition-all duration-200 focus:outline-none focus-visible:outline-none active:bg-mq-red active:border-mq-red select-none">
          <img
            className="w-24 rounded-full"
            src={userImage1.src}
            alt="userImage1"
          />
          <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">
            Ms Charanya Ramakrishnan
          </h2>
          <p className="text-gray-500 group-hover:text-white/80">
            Course Director - Bachelor of IT
          </p>
          <p className="text-center text-mq-red font-bold group-hover:text-white w-3/4 mt-4">
            Development Supervisor
          </p>
        </div>

        <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-full min-h-[280px] rounded-md cursor-pointer hover:border-mq-red hover:bg-mq-red transition-all duration-200 focus:outline-none focus-visible:outline-none active:bg-mq-red active:border-mq-red select-none">
          <img
            className="w-24 rounded-full"
            src={userImage4.src}
            alt="userImage4"
          />
          <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">
            Dr Amanda Head
          </h2>
          <p className="text-gray-500 group-hover:text-white/80">
            {" "}
            Course Director - Bachelor of LLB
          </p>
          <p className="text-center text-mq-red font-bold group-hover:text-white w-3/4 mt-4">
            Product Owner
          </p>
        </div>

        <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-full min-h-[280px] rounded-md cursor-pointer hover:border-mq-red hover:bg-mq-red transition-all duration-200 focus:outline-none focus-visible:outline-none active:bg-mq-red active:border-mq-red select-none">
          <img
            className="w-24 rounded-full"
            src={userImage3.src}
            alt="userImage2"
          />
          <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">
            Tran Khoi Nguyen Nguyen
          </h2>
          <p className="text-gray-500 group-hover:text-white/80">
            Bachelor of IT (SoftTech & AI)
          </p>
          <p className="text-center text-mq-red font-bold group-hover:text-white w-3/4 mt-4">
            Software Developer
          </p>
        </div>

        <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-full min-h-[280px] rounded-md cursor-pointer hover:border-mq-red hover:bg-mq-red transition-all duration-200 focus:outline-none focus-visible:outline-none active:bg-mq-red active:border-mq-red select-none">
          <img
            className="w-24 rounded-full"
            src={userImage2.src}
            alt="userImage3"
          />
          <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">
            Ngoc Mai Trinh
          </h2>
          <p className="text-gray-500 group-hover:text-white/80">
            Bachelor of Business Anaylytics
          </p>
          <p className="text-center text-mq-red font-bold group-hover:text-white w-3/4 mt-4">
            Design and Ethics Lead
          </p>
        </div>
      </div>
    </div>
  );
}
