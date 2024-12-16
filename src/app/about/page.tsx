"use client";
import Line from "@/components/Line";
import { ImagesLink } from "@/constants/AboutDetails";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const goRight = () => {
    const slide: HTMLElement | null = document.getElementById("slider");
    if (slide) {
      slide.scrollLeft += 250;
    }
  };

  const goLeft = () => {
    const slide: HTMLElement | null = document.getElementById("slider");
    if (slide) {
      slide.scrollLeft -= 250;
    }
  };

  return (
    <>
      <main>
        <section className="flex flex-col py-20 items-center justify-center space-y-10 w-full">
          <div className="text-4xl sm:text-3xl sm:px-10 text-center">
            About Us!
          </div>
          <div className="text-xl mx-32 sm:mx-2 sm:text-xl sm:px-6 text-justify font-sans">
            Athawda Bazaar is an initiative by Parle Tilak Vidyalaya
            Association&apos;s Sathaye College (Autonomous), it is more than
            just a college event, it&apos;s a platform to inspire and empower
            students with real-world business skills. Every year, we bring
            together a diverse group of talented individuals who set up unique
            stalls showcasing products ranging from delicious food to trendy
            clothing, handcrafted jewelry, refreshing beverages, and more. This
            event serves as a launchpad for students to hone their
            entrepreneurial spirit, creativity, and teamwork.
          </div>
          <div className="flex px-4 items-center justify-center w-[80%] sm:w-[100%]">
            <button onClick={goLeft}>
              <Image
                src={"/assets/svgs/backButton.svg"}
                width={0}
                height={0}
                alt="BackButton"
                className="min-w-8 sm:min-w-5"
              />
            </button>
            <div
              id="slider"
              className="overflow-x-scroll scroll-smooth flex py-4 gap-x-4 border-gray-600 border-2 border-x-0 mx-10 sm:mx-4"
            >
              {ImagesLink.map((item, index) => (
                <Image
                  key={index}
                  src={item.image}
                  width={300}
                  height={300}
                  alt="Athawda Bazaar Image"
                  className="h-96 w-72 sm:w-64 border-2 border-background-start rounded-lg"
                />
              ))}
            </div>
            <button onClick={goRight}>
              <Image
                src={"/assets/svgs/nextButton.svg"}
                width={0}
                height={0}
                alt="NextButton"
                className="min-w-8 sm:min-w-5"
              />
            </button>
          </div>
        </section>
        <Line />
        <section className="flex flex-col py-20 items-center justify-center space-y-10 w-full">
          <div className="text-4xl sm:text-3xl sm:px-10 text-center">
            Event Details
          </div>
          <div className="text-xl sm:text-xl sm:px-4 space-y-10 text-center font-sans">
            <p className="flex flex-col space-y-2">
              <span className="font-bold">Dates: </span>
              <span>14th to 20th December 2024</span>
            </p>
            <p className="flex flex-col space-y-2">
              <span className="font-bold">Timings: </span>
              <span> 9:00 AM to 4:00 PM</span>
            </p>
            <p className="flex flex-col space-y-2">
              <span className="font-bold">Location: </span>
              <span>Sathaye College Campus</span>
            </p>
            <p className="pt-10 font-serif text-opacity-80">
              Join us for an unforgettable experience filled with innovation,
              energy, and community spirit!
            </p>
          </div>
          <div className=" flex justify-center items-center text-center w-full pt-4">
            <Link
              href={"/"}
              className="normalButton flex justify-center items-center space-x-2 px-4 py-2 text-xl sm:text-lg leading-tight tracking-widest text-gray-300 hover:text-gray-100 rounded-lg border-2 border-slate-950"
            >
              Go to homepage!
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
