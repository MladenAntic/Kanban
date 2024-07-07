import Wrapper from "./Wrapper";
import ThemeToggler from "./shared/ThemeToggler";
import Logo from "./shared/Logo";
import SignInBtn from "./shared/SignInBtn";
import ToggleMenu from "./navbar/ToggleMenu";

const Navbar = () => {
  return (
    <nav className="relative z-[99] bg-white dark:bg-darkGray">
      <Wrapper className="relative flex items-center justify-between py-8">
        <Logo />
        <ThemeToggler sheet={false} />
        <SignInBtn navbar={true} sheet={false} />
        <ToggleMenu />
      </Wrapper>
    </nav>
  );
};

export default Navbar;
