"use client";

import Wrapper from "./Wrapper";
import { AuroraBackground } from "./ui/aurora-background";
import { useTheme } from "@/context/ThemeProvider";
import Logo from "./shared/Logo";
import SignInBtn from "./shared/SignInBtn";

const Intro = () => {
  const { mode } = useTheme();

  return (
    <section>
      <AuroraBackground>
        <Wrapper className="grid h-screen place-content-center max-lg:w-full">
          <div
            className={`z-10 flex flex-col items-center gap-10 rounded-3xl p-16 shadow-lg max-lg:mx-auto max-lg:w-4/5 max-lg:px-8 ${mode === "dark" ? "bg-darkGray" : "bg-white"}`}
          >
            <Logo />
            <p className="w-[750px] text-center text-[18px] font-bold text-mediumGray max-lg:w-full max-lg:text-sm">
              Welcome to Kanban, an advanced management tool to help you
              organize everything from grocery shopping lists to
              enterprise-level tasks completely for FREE! There is no limit to
              the number of boards and tasks you can create. Sign in to create
              your first board, or access your existing boards.
            </p>
            <SignInBtn navbar={false} sheet={true} />
          </div>
        </Wrapper>
      </AuroraBackground>
    </section>
  );
};

export default Intro;
