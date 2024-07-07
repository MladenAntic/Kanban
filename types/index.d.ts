import { ReactNode } from "react";

export interface WrapperProps {
  className?: string;
  children: ReactNode;
}

export interface Board {
  name: string;
  columns?: string[];
}
