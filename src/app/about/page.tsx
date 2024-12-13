import Line from "@/components/Line";
import Link from "next/link";

export default function About() {
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
