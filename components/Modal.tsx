'use client'

import { useEffect} from "react"
import { IoCloseOutline } from "react-icons/io5"
import Image from "next/image";
import { CAREER_DATA } from "@/app/career/careersData";

interface ModalProps  {
  openStatus: boolean
  setOpenStatus: any
  selectedDataId: string
}
export default function Modal({openStatus, setOpenStatus, selectedDataId}:ModalProps){

  useEffect(() => {
    setOpenStatus(openStatus)

  }, [openStatus])

  const data = CAREER_DATA.find(d => d.id === selectedDataId)

  return openStatus && (
    <div className="
      p-8 absolute h-full w-3/4 
      flex self-center justify-between 
      border-8 bg-black border-double rounded-3xl
      slide-from-top gap-4 z-40
    ">
      <div className="basis-11/12 flex gap-2">
        <div
          className="basis-1/4 flex items-end"
        >
        <Image
          alt="duck pixel art"
          src="/happyDogNoBG.png" 
          width={150} height={150} 
          unoptimized 
        />
        </div>
        <div className="
          basis-3/4 border-4 border-white border-double
          text-gray-400 rounded-3xl
          p-4
        ">
          {data?.company}    
          <br/>
          {data?.type}    
        </div>
      </div>
      <button className="
        bg-white rounded-full h-fit cursor-pointer
        hover:bg-black hover:text-white hover:border-white text-black
        hover:outline hover:outline-offset-2 hover:outline-white
        " 
         type="button" onClick={() => setOpenStatus(false)}>
        <IoCloseOutline  size={60}/>
      </button>
    </div>
  )
}
