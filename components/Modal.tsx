import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { CAREER_DATA } from "@/app/career/data";
import { ModalProps } from "@/app/types";

export default function Modal({
  openStatus,
  setOpenStatus,
  selectedDataId,
}: ModalProps) {
  useEffect(() => {
    setOpenStatus(openStatus);
  }, [openStatus, setOpenStatus]);

  const carrerData = CAREER_DATA.find((d) => d.id === selectedDataId);

  return (
    openStatus && (
      <div
        className=" overflow-y-scroll sm:overflow-y-hidden
      p-2 sm:p-8 absolute h-full w-3/4 flex
      flex-col sm:flex-row self-center justify-between 
      border-8 bg-black border-double rounded-3xl 
      slide-from-top gap-4 z-40
    "
      >
        <div className="flex flex-col items-center self-center sm:basis-2/8 sm:self-end order-last sm:order-first gap-2">
          <a
            href="https://files.devlques.com/cv.pdf"
            target="_blank"
            className="text-2xl font-bold text-nowrap p-2 border-2 border-white rounded-2xl
                hover:bg-white hover:text-black hover:outline hover:outline-offset-4 hover:outline-white"
          >
            {" "}
            DOWNLOAD CV
          </a>
          <Image
            className="sm:w-36"
            alt="duck pixel art "
            src="/happyDogNoBG.png"
            width={100}
            height={100}
            unoptimized
          />
        </div>

        <div
          className="
          basis-5/8 border-4 border-white border-double
          text-gray-400 rounded-3xl
          p-4 overflow-y-auto
        "
        >
          {carrerData?.company}
          <br />
          {carrerData?.type}
          {carrerData?.projects.map((project, i) => {
            return (
              <div
                key={`project+${i}`}
                className="border-2 border-dashed my-3 p-2 rounded-3xl"
              >
                <div className="border-b border-dashed">
                  <span className="text-white">Date: </span>
                  {`${project.start} - ${project.end}`}
                </div>
                <div className="border-b border-dashed">
                  <span className="text-white">Project: </span>
                  {project.product}
                </div>
                {project.reference.length > 0 && (
                  <div className="border-b border-dashed text-white w-full">
                    <a href={project.reference} target="_blank">
                      Visit website
                    </a>
                  </div>
                )}
                <div className="border-b border-dashed">
                  <span className="text-white">Role: </span>
                  {` ${project.roleDescription}`}{" "}
                </div>
                <div>
                  <span className="text-white">Techstack: </span>
                  {` ${project.techStack}`}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col basis-1/8 items-center order-first sm:order-last">
          <button type="button" onClick={() => setOpenStatus(false)}>
            <IoCloseOutline
              className="sm:hidden size-12 
                bg-white rounded-full h-fit cursor-pointer
                hover:bg-black hover:text-white hover:border-white text-black
                hover:outline hover:outline-offset-2 hover:outline-white"
            />
            <div
              className="text-4xl font-bold px-2 hidden sm:block rounded-2xl
                hover:bg-white hover:text-black border-2 border-white
                hover:outline hover:outline-offset-2 hover:outline-white"
            >
              ESC
            </div>
          </button>
        </div>
      </div>
    )
  );
}
