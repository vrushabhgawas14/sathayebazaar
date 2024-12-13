"use client";
import { useState } from "react";

export default function Support() {
  const [result, setResult] = useState("");

  // eslint-disable-next-line
  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // const accessKey = ;
    formData.append("access_key", "b49d46e3-540b-43d7-8811-91b9209e3ccc");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully.");
      event.target.reset();
    } else {
      setResult(data.message);
    }
  };
  return (
    <>
      <main>
        <section className="flex flex-col py-20 items-center justify-center space-y-10 w-full">
          {/* <div className="text-4xl sm:text-3xl sm:px-10 text-center">
            Support
          </div> */}
          <div className="flex flex-col text-xl w-[60vw] sm:w-[90vw] sm:mx-2 sm:text-xl sm:px-6 text-center">
            <span className="text-center font-sans">
              We&apos;re Here to Help!
            </span>
            <span className="font-sans">
              If you have any questions, need assistance, or want to share your
              feedback about Athawda Bazaar, we&apos;re just a click away.
            </span>
          </div>
          <div className="py-6">
            <h2 className="text-4xl text-center pb-10">Get In Touch</h2>
            <form
              onSubmit={onSubmit}
              className="flex flex-col items-center gap-y-4 font-bold"
            >
              <input
                type="text"
                name="name"
                className="w-80 px-4 py-2 rounded-3xl  focus:outline-none bg-slate-800 text-zinc-200"
                placeholder="Enter Name : "
                required
              />
              <input
                type="email"
                name="email"
                className="w-80 px-4 py-2 rounded-3xl focus:outline-none bg-slate-800 text-zinc-200"
                placeholder="Enter Email : "
                required
              />
              <textarea
                name="message"
                rows={4}
                className="w-80 px-4 py-2 rounded-xl  focus:outline-none bg-slate-800 text-zinc-200"
                placeholder="Enter Message : "
                required
              ></textarea>
              <button className="bg-background-start flex items-center justify-center space-x-2 px-4 py-1 text-base text-red-100 border-2 border-black border-opacity-30 rounded-xl ease-in duration-200 hover:bg-opacity-90">
                Submit
              </button>
            </form>

            {result && (
              <p className="text-center px-2 py-1 mt-4 mx-4 bg-white text-green-600 border-2 border-background-start rounded-2xl">
                {result}
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
