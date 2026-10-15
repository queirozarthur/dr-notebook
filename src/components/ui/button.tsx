import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Slot } from "radix-ui";
import { tv, type VariantProps } from "tailwind-variants";

// Botão da marca: pílula, como no estilo da Apple, com o acabamento do rich-button
// do Spell UI (degradê vertical, brilho interno, sombra no texto) na variante
// principal. A API é a do botão do shadcn (Button, buttonVariants, variant, size,
// asChild) para os componentes instalados do Spell UI e do 21st funcionarem.
export const buttonVariants = tv({
  base: [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none",
    "transition-[color,background-color,border-color,filter,scale] duration-150 ease-out",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:not-disabled:scale-96 disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      default: [
        "border border-black/20 bg-linear-to-b from-primary/85 to-primary text-primary-foreground",
        "shadow-md shadow-black/20 inset-shadow-2xs inset-shadow-white/25 text-shadow-2xs text-shadow-black/30",
        "hover:brightness-110",
      ],
      outline: "border border-link text-link hover:bg-link/10",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "text-foreground hover:bg-muted",
      link: "rounded-none text-link underline-offset-4 hover:underline",
      destructive: "bg-destructive text-white hover:bg-destructive/90",
    },
    size: {
      default: "h-11 px-5 text-base [&_svg:not([class*='size-'])]:size-5",
      xs: "h-8 px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      sm: "h-9 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "h-14 px-7 text-lg [&_svg:not([class*='size-'])]:size-6",
      icon: "size-11 [&_svg:not([class*='size-'])]:size-5",
      "icon-xs": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
      "icon-sm": "size-9 [&_svg:not([class*='size-'])]:size-4",
      "icon-lg": "size-14 [&_svg:not([class*='size-'])]:size-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Componente = asChild ? Slot.Root : "button";

    return (
      <Componente
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
