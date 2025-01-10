"use client";
import "./styles.css";

import { CAREER_DATA } from "./careersData";
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

export default function Career() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataId, setDataId] = useState<string>("1");

  const getSnipperRect = useCallback(
    (snipper: HTMLElement) => snipper.getBoundingClientRect(),
    [],
  );
  const checkOverlap = useCallback((duckRect: any, snipperRec: any) => {
    const maxTop = Math.max(snipperRec.top, duckRect.top);
    const minTop = Math.min(snipperRec.top, duckRect.top);
    const maxLeft = Math.max(snipperRec.left, duckRect.left);
    const minLeft = Math.min(snipperRec.left, duckRect.left);

    if (maxTop - minTop <= 50 && maxLeft - minLeft <= 50) {
      return true;
    }
  }, []);

  const onTargetAnimation = useCallback((duck:HTMLElement, drop:HTMLElement) => {
        duck.style.border = "3px dashed red";
        duck.classList.add("faster-move-effect");
        drop.classList.remove("hidden");
  }, [])

  const offTargetAnimation = useCallback((duck:HTMLElement, drop:HTMLElement) => {
        duck.style.border = "none";
        duck.style.backgroundColor = "none";
        duck.classList.remove("faster-move-effect");
        drop.classList.add("hidden");
  }, [])

  useEffect(() => {
    const timeline = document.querySelector("#timeline") as HTMLElement;
    if (openModal) {
      timeline.style.opacity = "0";
    } else {
      timeline.style.opacity = "100%";
    }
  }, [openModal]);

  useEffect(() => {
    const snipper = document.querySelector<HTMLElement>(
      "#snipper",
    ) as HTMLElement;
    const container = snipper.parentElement as HTMLElement;
    const upArrow = document.querySelector<HTMLElement>(
      "#upArrow",
    ) as HTMLElement;
    const downArrow = document.querySelector<HTMLElement>(
      "#downArrow",
    ) as HTMLElement;
    const leftArrow = document.querySelector<HTMLElement>(
      "#leftArrow",
    ) as HTMLElement;
    const rightArrow = document.querySelector<HTMLElement>(
      "#rightArrow",
    ) as HTMLElement;
    const spaceKey = document.querySelector<HTMLElement>(
      "#spaceKey",
    ) as HTMLElement;

    const position = {
      x: container.offsetWidth / 2,
      y: container.offsetHeight / 2,
    };

    const step = 15;
    let moved = false;

    if (snipper) {
      snipper.classList.remove("hidden");
      snipper.style.transform = `translate(${container?.offsetWidth / 2}px, ${container?.offsetHeight / 2}px)`;
    }

    const duckTargetInterval = setInterval(() => {
      const snipperRec = getSnipperRect(snipper);

      CAREER_DATA.forEach((_,i) => {
         const duck = document.querySelector(`#duckItem${i}`) as HTMLElement;
         const duckRect = duck.getBoundingClientRect()
         const drop = document.querySelector(`#dropItem${i}`) as HTMLElement;
        
         if(checkOverlap(duckRect, snipperRec)){
            onTargetAnimation(duck, drop)
         }else {
            offTargetAnimation(duck, drop)
         }

      })
    }, 100);

    const arrowKeyDownHandler = (key: HTMLElement):void => {
      key.style.color = "black";
      key.style.backgroundColor = "white";
      key.style.outline = "2px solid white";
    }

    const keyDownHandler = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.code.toLowerCase() === "escape") {
        setOpenModal(false);
      }

      if (e.code.toLowerCase() === "space") {
        snipper.classList.remove("shoot-effect");
        snipper.classList.add("shoot-effect");
        spaceKey.style.color = "white";
        spaceKey.style.backgroundColor = "black";
        spaceKey.style.outline = "2px solid white";
        CAREER_DATA.forEach((_,i:number) => {
          const duck = document.querySelector(`#duckItem${i}`) as HTMLElement
          if (duck.classList.contains("faster-move-effect")) {
            const dataId = (i+1).toString()
            duck.style.backgroundColor = "orange";
            setTimeout(() => {
              setDataId(dataId);
              setOpenModal(true);
            }, 200);
          }
        })
      }

      if (e.code.toLowerCase() === "arrowup") {
        if (position.y > 20) {
          arrowKeyDownHandler(upArrow)
          position.y -= step;
          moved = true;
        }
      }
      if (e.code.toLowerCase() === "arrowdown") {
        if (position.y < container.offsetHeight - snipper.offsetHeight - 20) {
          arrowKeyDownHandler(downArrow)
          position.y += step;
          moved = true;
        }
      }
      if (e.code.toLowerCase() === "arrowleft") {
        if (position.x > 20) {
          arrowKeyDownHandler(leftArrow)
          position.x -= step;
          moved = true;
        }
      }
      if (e.code.toLowerCase() === "arrowright") {
        if (position.x < container.offsetWidth - snipper.offsetWidth - 20){
          arrowKeyDownHandler(rightArrow)
          position.x += step;
          moved = true;
        }
      }

      if (moved) {
        if (snipper) {
          snipper.style.transform = `translate(${position.x}px, ${position.y}px)`;
        }
      }
    };

    const arrowKeyUpHandler = (key: HTMLElement):void => {
      key.style.color = "white";
      key.style.backgroundColor = "transparent";
      key.style.outline = "none";
    }
    const keyUpHandler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.code.toLowerCase() === "space") {
        snipper.classList.remove("shoot-effect");
        spaceKey.style.color = "black";
        spaceKey.style.backgroundColor = "white";
        spaceKey.style.outline = "none";
      }
      if (e.code.toLowerCase() === "arrowup") {
        arrowKeyUpHandler(upArrow)
      }
      if (e.code.toLowerCase() === "arrowdown") {
        arrowKeyUpHandler(downArrow)
      }
      if (e.code.toLowerCase() === "arrowleft") {
        arrowKeyUpHandler(leftArrow)
      }
      if (e.code.toLowerCase() === "arrowright") {
        arrowKeyUpHandler(rightArrow)
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
      clearInterval(duckTargetInterval);
    };
  }, []);

  const Timeline = memo(() => {
    return (
      <div id="timeline" className="w-full overflow-hidden mt-auto">
        <div className="flex w-full">
          <div
            id="timeline-row"
            className="flex flex-row-reverse w-full justify-between timeline-effect py-2"
          >
            {CAREER_DATA.map((data, i) => {
              return (
                <div
                  key={"dataName" + i}
                  className="flex flex-col relative items-center"
                >
                  <span className=""> {data.company} </span>
                  <span className=""> {data.period} </span>
                  <div className="w-fit relative">
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
      </div>
    );
  });

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
        className="size-24 rounded-full bg-transparent border-2 absolute hidden z-30"
      >
        <div className="h-full border border-white border-dashed left-1/2 absolute"></div>
        <div className="w-full border border-white border-dashed top-1/2 absolute"></div>
      </div>
      <Timeline />
      <div className="flex justify-around items-end gap-4 basis-1/3 w-full">
        <div className="flex flex-col justify-center items-center gap-2">
          <RiSpace id="spaceKey" size={50} style={{ ...spaceKeyStyles }} />
          <div className="text-sm">Press space to fire</div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div>
            <BsArrowUpSquareFill
              id="upArrow"
              size={50}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="flex gap-2">
            <BsArrowLeftSquareFill
              id="leftArrow"
              size={50}
              style={{ ...arrowStyles }}
            />
            <BsArrowDownSquareFill
              id="downArrow"
              size={50}
              style={{ ...arrowStyles }}
            />
            <BsArrowRightSquareFill
              id="rightArrow"
              size={50}
              style={{ ...arrowStyles }}
            />
          </div>
          <div className="text-sm">Move with arrow keys</div>
        </div>
      </div>
    </div>
  );
}
