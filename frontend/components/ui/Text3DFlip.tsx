"use client";

import React from "react";
import { m, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import AnimatedText from "./animated-text";
import { useButtonLabelTrigger } from "./useButtonLabelTrigger";

/** Tuned for button labels — inherits parent font/color. */
export const BUTTON_ANIMATED_TEXT_PROPS = {
  className:
    "inline-flex flex-nowrap bg-transparent font-inherit leading-none [font-size:inherit] [font-weight:inherit] [color:inherit] pointer-events-none",
  animationType: "letters" as const,
  duration: 0.4,
  delay: 0,
  staggerDelay: 0.03,
  initialY: 8,
  initialOpacity: 0,
  animateY: 0,
  animateOpacity: 1,
} as const;

function isIconElement(child: React.ReactElement): boolean {
  if (child.type === Loader2) return true;
  if (child.type === "svg") return true;
  if (typeof child.type === "function") {
    const props = child.props as { size?: number; children?: React.ReactNode };
    if (props.size != null && props.children == null) return true;
  }
  return false;
}

export function wrapButtonLabelChildren(
  children: React.ReactNode,
  animKey = 0
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (child == null || typeof child === "boolean") return child;

    if (typeof child === "string" || typeof child === "number") {
      const text = String(child);
      if (!text.trim()) return child;
      return (
        <AnimatedText
          key={`btn-anim-${text}`}
          text={text}
          replayKey={animKey}
          {...BUTTON_ANIMATED_TEXT_PROPS}
        />
      );
    }

    if (!React.isValidElement(child)) return child;

    if (child.type === React.Fragment) {
      const frag = child as React.ReactElement<{ children?: React.ReactNode }>;
      return (
        <>
          {wrapButtonLabelChildren(frag.props.children, animKey)}
        </>
      );
    }

    if (isIconElement(child)) return child;
    if (child.type === "img" || child.type === "input") return child;

    const el = child as React.ReactElement<{ children?: React.ReactNode }>;
    if (el.props.children != null) {
      return React.cloneElement(el, {}, wrapButtonLabelChildren(el.props.children, animKey));
    }
    return child;
  });
}

const buttonHoverMotion = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 28 },
};

type FlipButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const FlipButton = React.forwardRef<HTMLButtonElement, FlipButtonProps>(
  ({ children, onMouseEnter, onClick, className = "", ...props }, ref) => {
    const { animKey, bindInteractionHandlers } = useButtonLabelTrigger();
    const interaction = bindInteractionHandlers({ onMouseEnter, onClick });

    return (
      <m.button
        ref={ref}
        {...buttonHoverMotion}
        className={`transition-colors duration-200 ${className}`}
        {...(props as HTMLMotionProps<"button">)}
        {...interaction}
      >
        {wrapButtonLabelChildren(children, animKey)}
      </m.button>
    );
  }
);
FlipButton.displayName = "FlipButton";

type FlipMotionButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: React.ReactNode;
};

export const FlipMotionButton = React.forwardRef<HTMLButtonElement, FlipMotionButtonProps>(
  ({ children, onMouseEnter, onClick, ...props }, ref) => {
    const { animKey, bindInteractionHandlers } = useButtonLabelTrigger();
    const interaction = bindInteractionHandlers({ onMouseEnter, onClick });

    return (
      <m.button
        ref={ref}
        {...buttonHoverMotion}
        {...props}
        {...interaction}
      >
        {wrapButtonLabelChildren(children, animKey)}
      </m.button>
    );
  }
);
FlipMotionButton.displayName = "FlipMotionButton";
