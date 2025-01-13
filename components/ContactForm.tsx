"use client";
import submitAction from "@/app/actions/submitAction";
import { ActionResponse } from "@/app/types";
import { useActionState, useEffect, useState } from "react";

const initialStateBase: ActionResponse = {
  success: false,
  errorMessage: "",
  inputs: {
    name: {},
    email: {},
    message: {},
  },
};

export default function ContactForm() {
  const [showSuccessSubmit, setShowSuccessSubmit] = useState<boolean>(false);
  const [state, action, isPending] = useActionState(
    submitAction, initialStateBase,
  );

  useEffect(() => {
    setShowSuccessSubmit(state.success);
  }, [state]);

  return showSuccessSubmit ? (
    <div className="flex items-center justify-center size-full text-xl sm:text-2xl">
      <div
        className="flex flex-col justify-between items-center w-11/12 sm:w-1/2
          bg-black p-8 sm:p-16 border-8 border-white border-double rounded-3xl"
      >
        <div>
          Thank you for reaching out,{" "}
          <span className="text-orange-400">{`${state?.successScreen?.name}`}</span>
          !.
          <br />
          <br />
          Your message has been sent successfully, I will get back to you soon at
          the email address provided:
          <span className="text-orange-400">{` ${state?.successScreen?.email}`}</span>
          <br />
          <br />
          <br />
          Best,
          <br /> Luis Q.
        </div>

        <button
          onClick={() => setShowSuccessSubmit(false)}
          type="button"
          className="w-fit
          bg-white text-black font-bold rounded-full px-4 py-2 border
          hover:bg-black hover:text-white hover:border-white
          hover:outline hover:outline-offset-2 hover:outline-white
          "
        >
          {" "}
          Go back{" "}
        </button>
      </div>
    </div>
  ) : (
    <div className="flex size-full justify-center items-center text-xl sm:text-2xl">
      <form
        action={action}
        className="flex flex-col gap-4 basis-2/4 w-full 
        bg-black p-16 border-8 border-white border-double rounded-3xl"
      >
        <label>
          Name <br />
          <input
            type="text"
            name="name"
            defaultValue={state?.inputs?.name?.value || ""}
            placeholder="Jone Jones"
            required
            className="rounded-3xl mb-2
            outline outline-offset-2 outline-white focus:outline-offset-4 text-gray-800 px-4
          "
          />
          {state?.inputs?.name?.error?.length  && (
            <div className="text-orange-400">
              {state?.inputs?.name?.error[0]}
            </div>
          )}
        </label>
        <label>
          Email: <br />
          <input
            type="email"
            name="email"
            placeholder="jone@email.com"
            defaultValue={state?.inputs?.email?.value || ""}
            required
            className="rounded-3xl mb-2
            outline outline-offset-2 outline-white focus:outline-offset-4  text-gray-800 px-4
           "
          />
          {state?.inputs?.email?.error?.length && (
            <div className="text-orange-400">
              {state?.inputs?.email?.error[0]}
            </div>
          )}
        </label>
        <label>
          Message: <br />
          <textarea
            name="message"
            placeholder="Enter message"
            defaultValue={state?.inputs?.message?.value || ""}
            required
            className="rounded-3xl text-gray-800 px-4 py-2 sm:w-full mb-1
            outline outline-offset-2 outline-white focus:outline-offset-4 
            "
            rows={4}
          />
          {state?.inputs?.message?.error?.length && (
            <div className="text-orange-400">
              {state?.inputs?.message?.error[0]}
            </div>
          )}
        </label>
        <button
          disabled={isPending}
          type="submit"
          className={`w-fit
          bg-white text-black font-bold rounded-full px-4 py-2 border
          hover:bg-black hover:text-white hover:border-white
          hover:outline hover:outline-offset-2 hover:outline-white
          `}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
        {state?.errorMessage?.length > 0  && (
          <div
            className="text-orange-400 p-4 
             border-2 px-4 border-orange-400 border-dashed rounded-3xl"
          >
            {state.errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}
