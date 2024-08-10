import React, { ReactNode } from "react";

export interface WrapperProps {
  className?: string;
  children: ReactNode;
}

export interface Board {
  _id: string;
  name: string;
  columns?: string[];
  tasks?: string[];
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  subtasks?: string[];
  status: string;
  board?: string;
}

export interface BoardAreaProps {
  boards?: Board[];
  tasks?: Task[];
  decodedId: string;
}

export interface ColumnProps {
  title: string;
  headingColor: string;
  status: string;
  cards: Task[];
  setCards: React.Dispatch<React.SetStateAction<Task[]>>;
  board: Board | undefined;
  tasks: Task[];
}

export interface CardProps {
  title: string;
  description?: string;
  subtasks?: string[];
  _id: string;
  status: string;
  handleDragStart: (e: DragEvent<HTMLDivElement>, card: Task) => void;
  board: Board | undefined;
  tasks: Task[];
}

export interface DropIndicatorProps {
  beforeId: string | null;
  status: string;
}

export interface AddNewColumnDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  boardId: string;
}

export interface AddNewTaskDialogProps {
  tasks: Task[];
  pathname: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectOptions: string[];
  mongoUserId: string;
  boardId: string;
}

export interface DeleteBoardDialogProps {
  isOpen: boolean;
  setIsDeleteOpen: (value: boolean) => void;
  boards: Board[];
  pathname: string;
  decodedId: string;
}

export interface DeleteTaskDialogProps {
  isOpen: boolean;
  setIsDeleteOpen: (value: boolean) => void;
  title: string;
  id: string;
  boardId: string;
}

export interface EditBoardDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  boards: Board[];
  pathname: string;
  decodedId: string;
}

export interface EditTaskDialogProps {
  id: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectOptions: string[];
  title: string;
  description?: string;
  subtasks?: string[];
  status: string;
  boardId: string;
  tasks: Task[];
}

export interface NewBoardDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  mongoUserId: string;
  pathname?: string;
  boards?: Board[];
}

export interface ViewTaskDialogProps {
  id: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description?: string;
  subtasks?: string[];
  status: string;
  board: Board | undefined;
  checkedSubtasks: string[];
  updateCheckedSubtasks: (updatedSubtasks: string[]) => void;
  tasks: Task[];
}

export interface MobileDropdownProps {
  boards: Board[];
  isBoardDropdownOpen: boolean;
  setIsBoardDropdownOpen: (value: boolean) => void;
  handleNewBoard: () => void;
  mode: string;
}