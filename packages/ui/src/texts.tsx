import { cva, VariantProps } from "class-variance-authority";

const textStyles = cva("ui-font-sans", {
  variants: {
    intent: {
      ExtraHeading: "ui-text-[32px]",
      Heading: "ui-text-big ",
      Regular: "ui-text-medium",
      RegultarBorded:
        "ui-text-medium ui-drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]",
      Small: "ui-text-small",
      ExtraSmall: "ui-text-extra_small",
    },
    color: {
      primary: "ui-text-primary",
      secondary: "ui-text-secondary",
      negative: "ui-text-negative",
      grey: "ui-text-grey",
      white: "ui-text-white",
      black: "ui-text-black",
      darkGray: "ui-text-darkGray",
    },
    style: {
      bold: "ui-font-bold",
    },
    mt: {
      big: "ui-mt-big",
      medium: "ui-mt-medium",
      small: "ui-mt-small",
    },
    hover: {
      pointer: "ui-hover:cursor-pointer",
    },
    defaultVarians: {
      intent: "ui-primary",
      spacing: "ui-mSmall",
    },
  },
});

interface ButtonProps extends VariantProps<typeof textStyles> {
  text: string | undefined;
}

export function Text({
  intent,
  color,
  style,
  mt,
  text,
  hover,
  ...props
}: ButtonProps) {
  return (
    <text
      className={textStyles({ intent, color, style, hover, mt })}
      {...props}
    >
      {text}
    </text>
  );
}
