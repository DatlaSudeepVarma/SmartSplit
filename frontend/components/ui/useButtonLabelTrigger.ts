"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type MouseEventHandler,
} from "react";

/** Laptops: mouseEnter. Touch devices: click (mouseEnter often never fires). */
export function useButtonLabelTrigger() {
  const [animKey, setAnimKey] = useState(0);
  const preferClickTriggerRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => {
      preferClickTriggerRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const triggerAnimation = useCallback(() => {
    setAnimKey((k) => k + 1);
  }, []);

  const bindInteractionHandlers = useCallback(
    (handlers?: {
      onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
      onClick?: MouseEventHandler<HTMLButtonElement>;
    }) => ({
      onMouseEnter: (e: MouseEvent<HTMLButtonElement>) => {
        triggerAnimation();
        handlers?.onMouseEnter?.(e);
      },
      onClick: (e: MouseEvent<HTMLButtonElement>) => {
        if (preferClickTriggerRef.current) triggerAnimation();
        handlers?.onClick?.(e);
      },
    }),
    [triggerAnimation]
  );

  return { animKey, bindInteractionHandlers };
}
