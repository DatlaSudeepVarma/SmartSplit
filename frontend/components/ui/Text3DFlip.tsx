"use client";

import React from "react";
import { m, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import Text3DFlip from "@/registry/magicui/text-3d-flip";

/**
 * Magic UI Text3DFlipDemo2-style settings; colors inherit from the parent button
 * so colored buttons do not get white `bg-background` boxes.
 */
export const TEXT_3D_FLIP_LABEL_PROPS = {
  className:
    "inline-flex flex-nowrap bg-transparent font-inherit leading-none [font-size:inherit] [font-weight:inherit] [color:inherit]",
  textClassName: "bg-inherit text-inherit",
  flipTextClassName: "bg-inherit text-inherit",
  rotateDirection: "top" as const,
  staggerDuration: 0.03,
  staggerFrom: "center" as const,
  transition: { type: "spring" as const, damping: 25, stiffness: 160 },
  hideOnReset: true,
} as const;

function labelText(children: React.ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(labelText).join("");
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props.children != null) return labelText(props.children);
  }
  return "";
}

function isIconElement(child: React.ReactElement): boolean {
  if (child.type === Loader2) return true;
  if (child.type === "svg") return true;
  if (typeof child.type === "function") {
    const props = child.props as { size?: number; children?: React.ReactNode };
    if (props.size != null && props.children == null) return true;
  }
  return false;
}

export function wrapButtonLabelChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (child == null || typeof child === "boolean") return child;
    if (typeof child === "string" || typeof child === "number") {
      const text = String(child);
      return (
        <Text3DFlip key={`flip-${text}`} as="span" {...TEXT_3D_FLIP_LABEL_PROPS}>
          {text}
        </Text3DFlip>
      );
    }
    if (!React.isValidElement(child)) return child;
    if (isIconElement(child)) return child;
    if (child.type === "img" || child.type === "input") return child;

    const el = child as React.ReactElement<{ children?: React.ReactNode }>;
    if (el.props.children != null) {
      return React.cloneElement(el, {}, wrapButtonLabelChildren(el.props.children));
    }
    return child;
  });
}

type FlipButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const FlipButton = React.forwardRef<HTMLButtonElement, FlipButtonProps>(
  ({ children, ...props }, ref) => (
    <button ref={ref} {...props}>
      {wrapButtonLabelChildren(children)}
    </button>
  ),
);
FlipButton.displayName = "FlipButton";

type FlipMotionButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: React.ReactNode;
};

export const FlipMotionButton = React.forwardRef<HTMLButtonElement, FlipMotionButtonProps>(
  ({ children, ...props }, ref) => (
    <m.button ref={ref} {...props}>
      {wrapButtonLabelChildren(children)}
    </m.button>
  ),
);
FlipMotionButton.displayName = "FlipMotionButton";
