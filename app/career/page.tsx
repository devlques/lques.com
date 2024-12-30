'use client'
import "./styles.css"

import { CAREER_DATA } from "./careersData";
import { BsArrowDownSquareFill, BsArrowLeftSquareFill, BsArrowRightSquareFill,  BsArrowUpSquareFill } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import { RiSpace } from "react-icons/ri";
import Image from "next/image";

export default function Career(){

const getDucksRect = useCallback(() => {
  const result:any = {}
  const ducks = document.querySelectorAll(".duckItem") 
  ducks.forEach((e, i) => {
    result[`duck${i+1}`] = {
      duckRect : e.getBoundingClientRect(),
      element: e,
    }
  }) 

  return result

}, [])

const getSnipperRect = useCallback((snipper: HTMLElement) => snipper.getBoundingClientRect()
, [])

const getDrops = useCallback(() => {
  const result:any = {}
  const drops = document.querySelectorAll(".dropItem") 
  drops.forEach((e, i) => {
    result[`drop${i+1}`] = e
  }) 
  return result
}
, [])

const checkOverlap = useCallback((duckRect:any, snipperRec: any) => {
  const maxTop = Math.max(snipperRec.top, duckRect.top)
  const minTop = Math.min(snipperRec.top, duckRect.top)
  const maxLeft = Math.max(snipperRec.left, duckRect.left)
  const minLeft = Math.min(snipperRec.left, duckRect.left)

  if( maxTop - minTop <= 50 && 
      maxLeft - minLeft <= 50
  ){
    return true
  }
}, [])
useEffect(() => {
  const snipper = document.querySelector<HTMLElement>("#snipper") as HTMLElement
  const container = snipper.parentElement as HTMLElement
  const upArrow = document.querySelector<HTMLElement>("#upArrow") as HTMLElement
  const downArrow = document.querySelector<HTMLElement>("#downArrow") as HTMLElement
  const leftArrow = document.querySelector<HTMLElement>("#leftArrow") as HTMLElement
  const rightArrow = document.querySelector<HTMLElement>("#rightArrow") as HTMLElement
  const spaceKey = document.querySelector<HTMLElement>("#spaceKey") as HTMLElement

  const position = {
    x: container.offsetWidth / 2,
    y: container.offsetHeight / 2
  }

  const step = 15
  let moved = false

  if(snipper){
    snipper.classList.remove('hidden') 
    snipper.style.transform = `translate(${container?.offsetWidth / 2}px, ${container?.offsetHeight / 2}px)`
  }

  setInterval(() => {
    const ducks = getDucksRect()
    const snipperRec = getSnipperRect(snipper)
    const drops = getDrops()

    if(checkOverlap(ducks.duck1.duckRect, snipperRec)){
      ducks.duck1.element.style.border = "3px dashed red" 
      ducks.duck1.element.classList.add("faster-move-effect") 
      drops.drop1.classList.remove('hidden')
    }else{
      ducks.duck1.element.style.border = "none" 
      ducks.duck1.element.style.backgroundColor = "none" 
      ducks.duck1.element.classList.remove("faster-move-effect") 
      drops.drop1.classList.add('hidden')
    }
    if(checkOverlap(ducks.duck2.duckRect, snipperRec)){
      ducks.duck2.element.style.border = "3px dashed red" 
      ducks.duck2.element.classList.add("faster-move-effect") 
      drops.drop2.classList.remove('hidden')
    }else{
      ducks.duck2.element.style.border = "none" 
      ducks.duck2.element.style.backgroundColor = "none" 
      ducks.duck2.element.classList.remove("faster-move-effect") 
      drops.drop2.classList.add('hidden')
    }
    if(checkOverlap(ducks.duck3.duckRect, snipperRec)){
      ducks.duck3.element.style.border = "3px dashed red" 
      ducks.duck3.element.classList.add("faster-move-effect") 
      drops.drop3.classList.remove('hidden')
    }else{
      ducks.duck3.element.style.border = "none" 
      ducks.duck3.element.style.backgroundColor = "none" 
      ducks.duck3.element.classList.remove("faster-move-effect") 
      drops.drop3.classList.add('hidden')
    }

  }, 100)

  const keyDownHandler = (e:KeyboardEvent) => {
    e.preventDefault()

    if(e.code.toLowerCase() === "space"){
      snipper.classList.remove("shoot-effect")
      snipper.classList.add("shoot-effect")
      spaceKey.style.color = "white"
      spaceKey.style.backgroundColor = "black"
      spaceKey.style.outline = "2px solid white"
      const ducks = getDucksRect()
      for (const key in ducks) {
          if(ducks[key].element.classList.contains('faster-move-effect')){
              ducks[key].element.style.backgroundColor = "orange"
          }
      }
    }

    if(e.code.toLowerCase() === "arrowup"){
      if(position.y > 20){
        upArrow.style.color = "black"
        upArrow.style.backgroundColor = "white"
        upArrow.style.outline = "2px solid white"
        position.y -= step
        moved = true
      }
    } 
    if(e.code.toLowerCase() === "arrowdown"){
      if(position.y < container.offsetHeight - snipper.offsetHeight - 20){
        downArrow.style.color = "black"
        downArrow.style.backgroundColor = "white"
        downArrow.style.outline = "2px solid white"
        position.y += step
        moved = true
      }
    } 
    if(e.code.toLowerCase() === "arrowleft"){
      if(position.x > 20 ){
       leftArrow.style.color = "black"
       leftArrow.style.backgroundColor = "white"
       leftArrow.style.outline = "2px solid white"
       position.x -= step
       moved = true
      }
    } 
    if(e.code.toLowerCase() === "arrowright"){
      if(position.x < container.offsetWidth - snipper.offsetWidth - 20)
       rightArrow.style.color = "black"
       rightArrow.style.backgroundColor = "white"
       rightArrow.style.outline = "2px solid white"
       position.x += step
       moved = true
    } 

    if(moved){
      if(snipper){
        snipper.style.transform = `translate(${position.x}px, ${position.y}px)`
      }
    }
  }

  const keyUpHandler = (e: KeyboardEvent) => {
    e.preventDefault()
    if(e.code.toLowerCase() === "space"){
      snipper.classList.remove("shoot-effect")
      spaceKey.style.color = "black"
      spaceKey.style.backgroundColor = "white"
      spaceKey.style.outline = "none"
      const ducks = getDucksRect()
      for (const key in ducks) {
        ducks[key].element.style.backgroundColor = null
      }
    }
    if(e.code.toLowerCase() === "arrowup"){
      upArrow.style.color = "white"
      upArrow.style.backgroundColor = "transparent"
      upArrow.style.outline = "none"
    } 
    if(e.code.toLowerCase() === "arrowdown"){
      downArrow.style.color = "white"
      downArrow.style.backgroundColor = "transparent"
      downArrow.style.outline = "none"
    } 
    if(e.code.toLowerCase() === "arrowleft"){
      leftArrow.style.color = "white"
      leftArrow.style.backgroundColor = "transparent"
      leftArrow.style.outline = "none"
    } 
    if(e.code.toLowerCase() === "arrowright"){
      rightArrow.style.color = "white"
      rightArrow.style.backgroundColor = "transparent"
      rightArrow.style.outline = "none"
    } 
  }
  document.addEventListener("keydown", keyDownHandler)
  document.addEventListener("keyup", keyUpHandler)
  return () => {
    document.removeEventListener("keydown", keyDownHandler)
    document.removeEventListener("keyup", keyUpHandler)
  }
}, [])

const Timeline = () => {
  return (
    <div className="w-full overflow-hidden mt-auto">
      <div className="flex w-full">
        <div className="flex flex-row-reverse w-full justify-between timeline-effect">
           {CAREER_DATA.map((data,i) => {
             return (
              <div key={"dataName" + i} className="flex flex-col relative">
                <span className="">
                    {data.company}
                  </span>
                  <span className="">
                    {data.period}
                  </span>
                <Image 
                  className="absolute top-20 left-14 z-10 dropItem hidden"
                  alt="drop of water pixel art"
                  src="/dropWaterPixA.svg" 
                  width={40} height={40} 
                  unoptimized  
                />
                <div className="transform scale-x-[-1]">

                <Image 
                  className=" move-effect rounded-full duckItem"
                  alt="duck pixel art"
                  src="/pixelDuckNoBg.svg" 
                  width={150} height={150} 
                  unoptimized  
                />
                </div>
               </div>
              )
            })} 
         </div>
        </div>
      </div>
    )
  }
  
  const arrowStyles = {
    "borderRadius": "10px",
  } 
  const spaceKeyStyles = {
    "borderRadius": "10px",
    "backgroundColor": "white",
    "color": "black",
    "width": "100%"
  }
  return(
      <div id="snipper-container" className="flex flex-col h-full w-full overflow-hidden relative">
        <div 
          id="snipper" 
          className="size-36 rounded-full bg-transparent border-2 absolute hidden z-30">
          <div className="h-full border border-white border-dashed left-1/2 absolute"></div>
          <div className="w-full border border-white border-dashed top-1/2 absolute"></div>
        </div>
        <Timeline/>
        <div className="flex justify-around items-end gap-4 basis-1/2 w-full">
          <div className="flex flex-col justify-center items-center gap-2">
            <RiSpace id="spaceKey" size={50} style={{...spaceKeyStyles }}/>
            <div className="text-sm">Press space to fire</div>
          </div>

          <div className="flex flex-col items-center gap-2">
              <div>
                <BsArrowUpSquareFill id="upArrow" size={50} style={{"borderRadius": "10px"}} />
              </div>
              <div className="flex gap-2">
                <BsArrowLeftSquareFill id="leftArrow" size={50 } style={{...arrowStyles}} />
                <BsArrowDownSquareFill  id="downArrow" size={50} style={{...arrowStyles}}  />
                <BsArrowRightSquareFill  id="rightArrow" size={50} style={{...arrowStyles}}  />
              </div>
            <div className="text-sm">
              Move with arrow keys
            </div>
          </div>
        </div>
      </div>
  )
}
