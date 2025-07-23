import Image from "next/image";
import BannerCaption from "@/components/BannerCaption";

export default function Banner() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-r from-primary to-tertiary justify-center">
      <div className="relative w-full py-8 px-10 flex justify-end">
        <Image
          src="/banner.svg"
          alt="Banner"
          width={246}
          height={140}
          className="w-61 h-35 object-contain"
        />
      </div>
      <div className="flex flex-col w-full py-8 px-10 bg-black/50 absolute justify-center">
        <BannerCaption
          title="Let&apos;s find your dream job"
          subtitle="Discover the best remote jobs at top remote companies."
        />
      </div>
    </div>
  );
}
