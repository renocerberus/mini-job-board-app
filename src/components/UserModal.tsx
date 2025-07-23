import Image from "next/image";
import { useMemo, useState } from "react";
import BannerCaption from "@/components/BannerCaption";
import CloseButton from "@/components/CloseButton";
import Modal from "@/components/Modal";
import SignUpForm from "@/components/SignUpForm";
import SignInForm from "@/components/SignInForm";

export default function UserModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const bannerCaptionTitle = useMemo(() => {
    return mode === "signin" ? "Sign In" : "Sign Up";
  }, [mode]);
  const bannerCaptionSubtitle = useMemo(() => {
    return mode === "signin"
      ? "Start posting jobs and found your best talent."
      : "Create your new account as company";
  }, [mode]);

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Banner Section - Mobile: Top, Desktop: Left */}
        <div className="w-full lg:w-2/5 h-56 lg:h-full bg-gradient-to-b from-primary to-tertiary flex flex-col gap-6 justify-between relative">
          <Image
            src="/logo.svg"
            alt="Jobshare logo"
            width={140}
            height={40}
            className="w-32 lg:w-36 object-contain ml-6 mt-6"
          />
          <div className="flex flex-col gap-6 justify-center items-center px-6">
            <BannerCaption
              title={bannerCaptionTitle}
              subtitle={bannerCaptionSubtitle}
            />
          </div>
          <Image
            src="/banner.svg"
            alt="Banner"
            width={246}
            height={140}
            className="w-32 lg:w-48 h-20 lg:h-28 object-contain self-end mr-6 mb-6"
          />
        </div>
        
        {/* Form Section - Mobile: Bottom, Desktop: Right */}
        <div className="w-full lg:w-3/5 h-full bg-white p-6 flex flex-col">
          <div className="flex flex-col w-full h-full">
            <CloseButton type="primary" onClick={onClose} />
            {mode === "signup" ? (
              <SignUpForm onChangeMode={setMode} />
            ) : (
              <SignInForm onChangeMode={setMode} onClose={onClose} />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
