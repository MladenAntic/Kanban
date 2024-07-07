import { cn } from "@/lib/utils";
import { WrapperProps } from "@/types";

const Wrapper = ({ className, children }: WrapperProps) => {
  return (
    <div className={cn("w-4/5 mx-auto max-w-7xl", className)}>{children}</div>
  );
};

export default Wrapper;
