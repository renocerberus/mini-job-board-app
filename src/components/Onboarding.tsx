import Image from "next/image";

export default function Onboarding() {
  return (
    <div className="flex flex-row items-center justify-between w-full h-[640px]">
      <div className="relative w-full h-[640px]">
        <Image
          src="/onboarding.jpg"
          alt="Onboarding"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full h-[640px] py-8 px-10 absolute bg-black/50 z-10 justify-center items-center gap-4">
        <h1 className="text-4xl font-bold text-white text-center">
          Let&apos;s find your dream job
        </h1>
        <p className="text-lg text-accent text-center">
          Discover the best remote jobs at top remote companies.
        </p>
      </div>
    </div>
  );
}
