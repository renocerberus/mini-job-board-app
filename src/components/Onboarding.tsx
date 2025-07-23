import Image from "next/image";

export default function Onboarding() {
  return (
    <div className="flex flex-row items-center justify-between w-full h-72 sm:h-80 md:h-96 lg:h-[640px]">
      <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[640px]">
        <Image
          src="/onboarding.jpg"
          alt="Onboarding"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full h-72 sm:h-80 md:h-96 lg:h-[640px] py-6 sm:py-8 px-6 sm:px-10 absolute bg-black/50 z-10 justify-center items-center gap-4 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight">
          Let&apos;s find your dream job
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-accent text-center max-w-md sm:max-w-lg">
          Discover the best remote jobs at top remote companies.
        </p>
      </div>
    </div>
  );
}
