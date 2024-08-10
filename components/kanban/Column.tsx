import { ColumnProps, Task } from "@/types";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import { updateTaskStatus } from "@/lib/actions/task.action";

const Column: React.FC<ColumnProps> = ({
  title,
  cards,
  status,
  setCards,
  board,
  tasks,
}) => {
  const LOCAL_STORAGE_KEY = `board-${board?._id}-column-${status}-order`;

  const [localCards, setLocalCards] = useState(cards);

  useEffect(() => {
    const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedOrder) {
      const orderArray = JSON.parse(savedOrder);
      
      const cardMap = Object.fromEntries(cards.map((card) => [card._id, card]));

      const orderedCards = orderArray
        .map((id: string) => cardMap[id])
        .filter(Boolean);

      const remainingCards = cards.filter(
        (card) => !orderArray.includes(card._id)
      );
      setLocalCards([...orderedCards, ...remainingCards]);
    } else {
      setLocalCards(cards);
    }
  }, [cards, LOCAL_STORAGE_KEY]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Task) => {
    e.dataTransfer.setData("cardId", card._id);
  };

  const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...localCards];

      let cardToTransfer = copy.find((c) => c._id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status };

      copy = copy.filter((c) => c._id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el._id === before);
        if (insertAtIndex === -1) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setLocalCards(copy);
      setCards(copy);

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(copy.map((c) => c._id))
      );

      await updateTaskStatus(cardId, status);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="${status}"]`)
    ) as HTMLElement[];
  };

  const handleDragLeave = () => {
    clearHighlights();
  };

  const filteredCards = localCards.filter((c) => c.status === status);

  return (
    <div className="shrink-0">
      <div className="mb-3 flex items-center gap-1">
        <h3 className={`font-bold uppercase tracking-[2.4px] text-mediumGray`}>
          {title}
        </h3>
        <span className="rounded text-base font-bold text-mediumGray">
          ({filteredCards.length})
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {filteredCards.map((c) => {
          return (
            <Card
              key={c._id}
              {...c}
              handleDragStart={handleDragStart}
              board={board}
              tasks={tasks}
            />
          );
        })}

        {filteredCards.length === 0 && (
          <div className="flex h-[100px] items-center justify-center border-2 border-dashed border-[#ccc]">
            <DropIndicator beforeId={null} status={status} />
          </div>
        )}

        <DropIndicator beforeId={null} status={status} />
      </div>
    </div>
  );
};

export default Column;
