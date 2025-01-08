'use client'
import submitAction from "@/app/actions/submitAction"
import { ActionResponse } from "@/app/types"
import { useActionState, useEffect, useState } from "react"


const initialStateBase:ActionResponse = {
  success: false,
  message: '',
  inputs: {
    name: '', email:'', message: '' 
  }
}

export default function ContactForm(){
  const [showSuccessSubmit, setShowSuccessSubmit] = useState<boolean>(false)
  const [state, action, isPending] = useActionState<any, any>(submitAction, initialStateBase)
  
  useEffect(() => {
    setShowSuccessSubmit(state.success)
  }, [state])
  
  return showSuccessSubmit 
    ? (<div className="flex h-full items-center justify-center"> 
        <div 
          className="flex flex-col justify-between items-center  
          bg-black p-16 border-8 border-white border-double rounded-3xl"
          >
         <div>Your contact request has been sent successfully.<br/> I'll get back to you as soon as possible. <br/> <br/> <br/> Best,<br/> Luis Q.</div>
      
<button
          onClick={() => setShowSuccessSubmit(false)}
          type="button" className="w-fit
          bg-white text-black font-bold rounded-full px-4 py-2 border
          hover:bg-black hover:text-white hover:border-white
          hover:outline hover:outline-offset-2 hover:outline-white
          "
> Go back </button>

              </div>
      
      </div>)
    :(<div className="flex justify-center size-full">
      <form 
        action={action} 
        className="flex flex-col gap-4 basis-2/4 w-full 
        bg-black p-16 border-8 border-white border-double rounded-3xl">
        <label>Name <br/> 
          <input 
            type="text" 
            name="name" 
            defaultValue={state?.inputs?.name || '' } 
            //value={state?.name || ''}
            //onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Jone Jones"
            className="rounded-3xl mb-2
            outline outline-offset-2 outline-white focus:outline-offset-4 text-gray-800 px-4
          "/>
          {state?.errors?.name && (<div className="text-sm text-red-400">{state?.errors?.name[0]}</div>)}
        </label>
        <label>Email: <br/>  
          <input 
            //type="email" 
            name="email" 
            placeholder="jone@email.com"
            defaultValue={state?.inputs?.email || '' } 
            //value={state?.email || ''}
            //onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="rounded-3xl mb-2
            outline outline-offset-2 outline-white focus:outline-offset-4  text-gray-800 px-4
           "/>
          {state?.errors?.email && (<div className="text-sm text-red-400">{state?.errors?.email[0]}</div>)}
        </label>
        <label>Message: <br/> 
          <textarea 
            name="message" 
            placeholder="Enter message"
            defaultValue={state?.inputs?.message || '' } 
            //value={state?.message || ''}
            //onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
            className="rounded-3xl text-gray-800 px-4 py-2 sm:w-full mb-1
            outline outline-offset-2 outline-white focus:outline-offset-4 
            "/>
          {state?.errors?.message  && (<div className="text-sm text-red-400">{state?.errors?.message[0]}</div>)}
        </label>
      {state?.errors?.message  && (
          <div 
            className="text-sm text-red-400 
            outline outline-offset-2 px-4 outline-red-400 rounded-3xl">
          {state.message}
        </div>)}
        <button 
          disabled={isPending}
          type="submit" className={`w-fit
          bg-white text-black font-bold rounded-full px-4 py-2 border
          hover:bg-black hover:text-white hover:border-white
          hover:outline hover:outline-offset-2 hover:outline-white
          `}
         >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form> 
  </div>)
}
