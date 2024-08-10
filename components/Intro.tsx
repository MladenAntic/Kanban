"use client";

import Wrapper from "./Wrapper";
import { useTheme } from "@/context/ThemeProvider";
import Logo from "./shared/Logo";
import SignInBtn from "./shared/SignInBtn";
import { WavyBackground } from "./ui/wavy-background";
import { IoMdPlayCircle } from "react-icons/io";
import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const Intro = () => {
  const { mode } = useTheme();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative">
      <Wrapper className="boardSpaceHeight grid place-content-center max-lg:w-full">
        <div
          className={`z-10 flex flex-col items-center gap-10 rounded-3xl border p-16 shadow-lg max-lg:mx-auto max-lg:w-4/5 max-lg:px-8 ${mode === "dark" ? "border-darkGray bg-darkGray" : "bg-white"}`}
        >
          <Logo />
          <p className="w-[750px] text-center text-[18px] font-bold text-mediumGray max-lg:w-full max-lg:text-sm max-sm:text-xs">
            Welcome to Kanban, an advanced management tool to help you organize
            everything from grocery shopping lists to enterprise-level tasks
            completely for FREE! There is no limit to the number of boards and
            tasks you can create. Sign in to create your first board, or access
            your existing boards.
          </p>
          <div className="flex items-center gap-4 max-md:w-full max-md:flex-col max-md:gap-2">
            <button
              onClick={() => setIsVideoOpen(true)}
              type="button"
              className="max-md:w-full"
            >
              <HoverBorderGradient
                className="flex h-[48px] w-[200px] items-center justify-center gap-2 rounded-3xl bg-almostBlack text-center text-[15px] font-bold text-white transition-colors duration-300 ease-in-out hover:bg-lightGray hover:text-almostBlack max-md:w-full"
                containerClassName="max-md:w-full"
              >
                See How It Works
                <IoMdPlayCircle size={25} />
              </HoverBorderGradient>
            </button>
            <SignInBtn navbar={false} sheet={true} />
          </div>
        </div>
      </Wrapper>

      <WavyBackground />

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-sm:w-[90%] md:min-w-[750px] lg:min-h-[700px] lg:min-w-[1000px]">
          <video
            src="/how-it-works.mp4"
            autoPlay
            controls
            className="size-full object-contain"
          ></video>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Intro;
