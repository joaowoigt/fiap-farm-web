"use client";
import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "ui-font-bold ui-py-3 ui-px-10 ui-rounded ui-rounded-[12px] mobile:ui-px-3 mobile:ui-w-[144px]",
  {
    variants: {
      intent: {
        primary: "ui-bg-primary ui-text-white hover:ui-bg-primary-light",
        secondary: "ui-bg-secondary ui-text-white hover:ui-bg-secondary-light",
        negative: "ui-bg-error ui-text-white hover:ui-bg-primary-error-light",
        black: "ui-bg-black ui-text-white",
        secondaryVariant:
          "ui-bg-black ui-text-secondary ui-outline ui-outline-2 ui-outline-secondary",
        blackVariant:
          "ui-bg-transparent ui-text-black  ui-outline ui-outline-2 ui-utline-black hover:ui-bg-white",
      },
      spacing: {
        mSmall: "ui-m-1",
        mMedium: "ui-m-2",
        mBig: "ui-m-6",
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
