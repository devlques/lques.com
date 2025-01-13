"use client";
import "./styles.css";

import { CAREER_DATA } from "./data";
import {
  BsArrowDownSquareFill,
  BsArrowLeftSquareFill,
  BsArrowRightSquareFill,
  BsArrowUpSquareFill,
} from "react-icons/bs";
import { memo, useCallback, useEffect, useState } from "react";
import { RiSpace } from "react-icons/ri";
import Image from "next/image";
import Modal from "@/components/Modal";
import {
  arrowElReleasedHandler,
  eventInteractionControls,
  spaceElReleasedHandler,
} from "./helpers";

export default function Career() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataId, setDataId] = useState<string>("1");

  const getSnipperRect = useCallback(
    (snipper: HTMLElement) => snipper.getBoundingClientRect(),
    [],
  );
  const checkOverlap = useCallback((duckRect: DOMRect, snipperRec: DOMRect) => {
    const maxTop = Math.max(snipperRec.top, duckRect.top);
    const minTop = Math.min(snipperRec.top, duckRect.top);
    const maxLeft = Math.max(snipperRec.left, duckRect.left);
    const minLeft = Math.min(snipperRec.left, duckRect.left);

    if (maxTop - minTop <= 50 && maxLeft - minLeft <= 50) {
      return true;
    }
  }, []);

  const onTargetAnimation = useCallback(
    (duck: HTMLElement, drop: HTMLElement) => {
      duck.style.border = "3px dashed red";
      duck.classList.add("faster-move-effect");
      drop.classList.remove("hidden");
    },
    [],
  );

  const offTargetAnimation = useCallback(
    (duck: HTMLElement, drop: HTMLElement) => {
      duck.style.border = "none";
      duck.style.backgroundColor = "none";
      duck.classList.remove("faster-move-effect");
      drop.classList.add("hidden");
    },
    [],
  );

  const getElementById = (id: string): HTMLElement =>
    document?.querySelector(`#${id}`) as HTMLElement;

  useEffect(() => {
    const timeline = document.querySelector("#timeline") as HTMLElement;
    if (openModal) {
      timeline.style.opacity = "0";
    } else {
      timeline.style.opacity = "100%";
    }
  }, [openModal]);

  useEffect(() => {
    const snipper = getElementById("snipper");
    const snipperContainer = snipper.parentElement as HTMLElement;
    const upArrow = getElementById("upArrow");
    const downArrow = getElementById("downArrow");
    const leftArrow = getElementById("leftArrow");
    const rightArrow = getElementById("rightArrow");
    const spaceKey = getElementById("spaceKey");

    const upArrowBtn = getElementById("upArrowBtn");
    const downArrowBtn = getElementById("downArrowBtn");
    const leftArrowBtn = getElementById("leftArrowBtn");
    const rightArrowBtn = getElementById("rightArrowBtn");
    const spaceKeyBtn = getElementById("spaceKeyBtn");
    const controlBtns: Array<HTMLElement> = [
      upArrowBtn,
      downArrowBtn,
      leftArrowBtn,
      rightArrowBtn,
      spaceKeyBtn,
    ];
    const position = {
      x: snipperContainer.offsetWidth / 2,
      y: snipperContainer.offsetHeight / 2,
    };

    const step = 15;

    if (snipper) {
      snipper.classList.remove("hidden");
      snipper.style.transform = `translate(${snipperContainer?.offsetWidth / 2}px, ${snipperContainer?.offsetHeight / 2}px)`;
    }

    const duckTargetInterval = setInterval(() => {
      const snipperRec = getSnipperRect(snipper);

      CAREER_DATA.forEach((_, i) => {
        const duck = getElementById(`duckItem${i}`) as HTMLElement;
        const duckRect = duck?.getBoundingClientRect();
        const drop = getElementById(`dropItem${i}`) as HTMLElement;

        if (checkOverlap(duckRect, snipperRec)) {
          onTargetAnimation(duck, drop);
        } else {
          offTargetAnimation(duck, drop);
        }
      });
    }, 100);

    // KEYBOARD EVENTS HANDLERS
    const keyDownHandler = (e: KeyboardEvent) => {
      e.preventDefault();
      const keyCode = e.code.toLowerCase();

      if (e.code.toLowerCase() === "escape") {
        setOpenModal(false);
      }
      eventInteractionControls({
        keyCode,
        snipper,
        snipperContainer,
        position,
        step,
        setDataId,
        setOpenModal,
        controlElements: {
          upArrow,
          downArrow,
          rightArrow,
          leftArrow,
          spaceKey,
        },
      });
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.code.toLowerCase() === "space") {
        spaceElReleasedHandler(spaceKey, snipper);
      }
      if (e.code.toLowerCase() === "arrowup") {
        arrowElReleasedHandler(upArrow);
      }
      if (e.code.toLowerCase() === "arrowdown") {
        arrowElReleasedHandler(downArrow);
      }
      if (e.code.toLowerCase() === "arrowleft") {
        arrowElReleasedHandler(leftArrow);
      }
      if (e.code.toLowerCase() === "arrowright") {
        arrowElReleasedHandler(rightArrow);
      }
    };

    // MOUSE EVENTS HANDLERS
    const mouseDownHandler = (e: MouseEvent): void => {
      const targetBtn = e.currentTarget as HTMLElement;
      const icon = targetBtn.firstElementChild as HTMLElement;
      const iconId = icon.id;
      eventInteractionControls({
        snipper,
        iconId,
        snipperContainer,
        position,
        step,
        setDataId,
        setOpenModal,
        controlElements: {
          upArrow,
          downArrow,
          rightArrow,
          leftArrow,
          spaceKey,
        },
      });
    };

    const mouseUpHandler = (e: MouseEvent) => {
      const targetBtn = e.currentTarget as HTMLElement;
      const btnIcon = targetBtn.firstElementChild as HTMLElement;

      if (btnIcon.id === "spaceKey") {
        spaceElReleasedHandler(btnIcon, snipper);
      } else {
        arrowElReleasedHandler(btnIcon);
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    controlBtns.forEach((e: HTMLElement) => {
      e.addEventListener("mousedown", mouseDownHandler);
      e.addEventListener("mouseup", mouseUpHandler);
    });

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
      controlBtns.forEach((e: HTMLElement) => {
        e.removeEventListener("mousedown", mouseDownHandler);
        e.removeEventListener("mouseup", mouseUpHandler);
      });
      clearInterval(duckTargetInterval);
    };
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const Timeline = memo(() => {
    return (
      <div id="timeline" className="flex flex-col size-full justify-center">
          <div
            id="timeline-row"
            className="flex flex-row-reverse justify-between timeline-effect gap-4 sm:gap-0"
          >
            {CAREER_DATA.map((data, i) => {
              return (
                <div
                  key={"dataName" + i}
                  className="flex flex-col flex-1 relative items-center text-nowrap overflow-hidden p-2 gap-2 h-full"
                >
                  <div className="flex flex-col self-start sm:self-center items-start sm:items-center">
                    <span className="text-sm sm:text-2xl"> {data.company} </span>
                    <span className="text-sm sm:text-2xl"> {data.title} </span>
                    <span className="text-sm sm:text-2xl"> {data.period} </span>
                  </div>
                  <div className="relative">
                    <div className="transform scale-x-[-1]">
                      <Image
                        id={`duckItem${i}`}
                        className=" move-effect rounded-full duckItem"
                        alt="duck pixel art"
                        src="/pixelDuckNoBg.svg"
                        width={150}
                        height={150}
                        unoptimized
                      />
                    </div>
                    <Image
                      id={`dropItem${i}`}
                      className="absolute top-1/4 left-1/4 z-10 dropItem hidden"
                      alt="drop of water pixel art"
                      src="/dropWaterPixA.svg"
                      width={40}
                      height={40}
                      unoptimized
                    />
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    );
  });
  Timeline.displayName = "TimelineCmpt"

  const arrowStyles = {
    borderRadius: "10px",
  };
  const spaceKeyStyles = {
    borderRadius: "10px",
    backgroundColor: "white",
    color: "black",
    width: "100%",
  };

  return (
    <div
      id="snipper-container"
      className="flex flex-col h-full w-full overflow-hidden relative"
    >
      <Modal
        openStatus={openModal}
        setOpenStatus={setOpenModal}
        selectedDataId={dataId}
      />
      <div
        id="snipper"
        className="size-16 sm:size-24 rounded-full bg-transparent border-2 absolute hidden z-30"
      >
        <div className="h-full border border-white border-dashed left-1/2 absolute"></div>
        <div className="w-full border border-white border-dashed top-1/2 absolute"></div>
      </div>
      <Timeline />
      <div className="flex justify-around items-end gap-4 basis-1/3 w-full">
        <div className="flex flex-col justify-center items-center gap-2">
          <button id="spaceKeyBtn" className="w-28 sm:w-full" type="button">
            <RiSpace id="spaceKey" size={50} style={{ ...spaceKeyStyles }} />
          </button>
          <div className="hidden sm:block text-sm">
            Fire with space key or clicking the icon
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button id="upArrowBtn" type="button">
            <BsArrowUpSquareFill
              id="upArrow"
              size={50}
              style={{ borderRadius: "10px" }}
            />
          </button>
          <div className="flex gap-2">
            <button id="leftArrowBtn" type="button">
              <BsArrowLeftSquareFill
                id="leftArrow"
                size={50}
                style={{ ...arrowStyles }}
              />
            </button>
            <button id="downArrowBtn" type="button">
              <BsArrowDownSquareFill
                id="downArrow"
                size={50}
                style={{ ...arrowStyles }}
              />
            </button>
            <button id="rightArrowBtn" type="button">
              <BsArrowRightSquareFill
                id="rightArrow"
                size={50}
                style={{ ...arrowStyles }}
              />
            </button>
          </div>
          <div className="hidden sm:block text-sm">
            Move with arrow keys or clicking the icons
          </div>
        </div>
      </div>
    </div>
  );
}
