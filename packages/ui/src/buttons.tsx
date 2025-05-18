"use client";
import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "hover:ui-bg-black ui-font-bold ui-py-[12px] ui-px-[42px] ui-rounded ui-rounded-[12px] mobile:ui-px-small mobile:ui-w-[144px]",
  {
    variants: {
      intent: {
        primary: "ui-bg-primary ui-text-white",
        secondary: "ui-bg-secondary ui-text-white",
        negative: "ui-bg-negative ui-text-white",
        black: "ui-bg-black ui-text-white",
        secondaryVariant:
          "ui-bg-black ui-text-secondary ui-outline ui-outline-2 ui-outline-secondary",
        blackVariant:
          "ui-bg-transparent ui-text-black  ui-outline ui-outline-2 oui-utline-black",
      },
      spacing: {
        mSmall: "ui-m-small",
        mMedium: "ui-m-medium",
        mBig: "ui-m-big",
      },
      defaultVarians: {
        intent: "ui-primary",
      },
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  text: string;
  onClick?: (event: any) => void;
  children?: any;
}

export function Button({
  intent,
  spacing,
  text,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ intent, spacing })}
      onClick={onClick}
      {...props}
    >
      {text}
      {props.children}
    </button>
  );
}
