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
      <div className="w-1/2 h-full bg-gradient-to-b from-primary to-tertiary flex flex-col gap-4 justify-between">
        <Image
          src="/logo.svg"
          alt="Jobshare logo"
          width={140}
          height={40}
          className="w-40 object-contain ml-4 mt-4"
        />
        <div className="flex flex-col gap-4 justify-center items-center">
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
          className="w-61 h-35 object-contain self-end"
        />
      </div>
      <div className="w-1/2 h-full bg-white p-4">
        <div className="flex flex-col w-full h-full">
          <CloseButton type="primary" onClick={onClose} />
          {mode === "signup" ? (
            <SignUpForm onChangeMode={setMode} />
          ) : (
            <SignInForm onChangeMode={setMode} onClose={onClose} />
          )}
        </div>
      </div>
    </Modal>
  );
}
