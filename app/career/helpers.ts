import { EventInteractionControls } from "../types";
import { CAREER_DATA } from "./data";

//ARROW CONTROLS
export const arrowElPressedHandler = (e: HTMLElement): void => {
  e.style.color = "black";
  e.style.backgroundColor = "white";
  e.style.outline = "2px solid white";
};
export const arrowElReleasedHandler = (e: HTMLElement): void => {
  e.style.color = "white";
  e.style.backgroundColor = "transparent";
  e.style.outline = "none";
};

//SPACE CONTROLS
export const spaceElPressedHandler = (
  snipper: HTMLElement,
  spaceKey: HTMLElement,
  setDataId: (prop: string) => void,
  setOpenModal: (prop: boolean) => void,
): void => {
  snipper.classList.remove("shoot-effect");
  snipper.classList.add("shoot-effect");
  spaceKey.style.color = "white";
  spaceKey.style.backgroundColor = "black";
  spaceKey.style.outline = "2px solid white";
  CAREER_DATA.forEach((_, i: number) => {
    const duck = document.querySelector(`#duckItem${i}`) as HTMLElement;
    if (duck.classList.contains("faster-move-effect")) {
      const dataId = (i + 1).toString();
      duck.style.backgroundColor = "orange";
      setTimeout(() => {
        setDataId(dataId);
        setOpenModal(true);
      }, 200);
    }
  });
};

export const spaceElReleasedHandler = (
  e: HTMLElement,
  snipper: HTMLElement,
): void => {
  snipper.classList.remove("shoot-effect");
  e.style.color = "black";
  e.style.backgroundColor = "white";
  e.style.outline = "none";
};

// MASTER CONTROLS
export const eventInteractionControls = ({
  ...props
}: EventInteractionControls): void => {
  const {
    keyCode,
    iconId,
    position,
    controlElements,
    step,
    snipperContainer,
    snipper,
    setDataId,
    setOpenModal,
  } = props;
  if (keyCode === "space" || iconId === "spaceKey") {
    spaceElPressedHandler(
      snipper,
      controlElements.spaceKey,
      setDataId,
      setOpenModal,
    );
  }
  if (keyCode === "arrowup" || iconId === "upArrow") {
    if (position.y > 20) {
      arrowElPressedHandler(controlElements.upArrow);
      position.y -= step;
      props.moved = true;
    }
  }
  if (keyCode === "arrowdown" || iconId === "downArrow") {
    if (
      position.y <
      snipperContainer.offsetHeight - snipper.offsetHeight - 20
    ) {
      arrowElPressedHandler(controlElements.downArrow);
      position.y += step;
      props.moved = true;
    }
  }
  if (keyCode === "arrowleft" || iconId === "leftArrow") {
    if (position.x > 20) {
      arrowElPressedHandler(controlElements.leftArrow);
      position.x -= step;
      props.moved = true;
    }
  }
  if (keyCode === "arrowright" || iconId === "rightArrow") {
    if (position.x < snipperContainer.offsetWidth - snipper.offsetWidth - 20) {
      arrowElPressedHandler(controlElements.rightArrow);
      position.x += step;
      props.moved = true;
    }
  }
  if (props.moved) {
    if (snipper) {
      snipper.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }
};
