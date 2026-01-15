/**
 * 🔘 BUTTON COMPONENT - BOTÓN REUTILIZABLE
 *
 * Responsabilidad: Componente base para todos los botones de la app
 * Flujo: Importado por páginas y componentes → Botones consistentes
 *
 * Variants disponibles:
 * - default: Botón primario (azul)
 * - outline: Botón con borde
 * - ghost: Botón transparente
 *
 * Sizes disponibles:
 * - sm: Pequeño
 * - default: Normal
 * - lg: Grande
 *
 * Usa CSS variables para temas y diseño consistente
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90",
      outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--accent)]",
      ghost: "hover:bg-[var(--accent)]",
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
