import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Camada3DProps = {
  pronta: boolean;
  children: ReactNode;
};

// Camada onde fica o <canvas>: aparece com um fade quando a cena fica pronta.
export const Camada3D: FC<Camada3DProps> = ({ pronta, children }) => {
  return (
    <div className={cn("absolute inset-0 transition-opacity duration-700 ease-out", pronta ? "opacity-100" : "opacity-0")}>
      {children}
    </div>
  );
};
