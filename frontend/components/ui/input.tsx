"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type InputVariant = "default" | "error";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  /** Label sopra il campo */
  label?: string;

  /** Testo helper (default) */
  helperText?: string;

  /** Testo di errore (mostrato se variant=error) */
  errorText?: string;

  /** Variante visuale */
  variant?: InputVariant;

  /** Icona a sinistra */
  leftIcon?: React.ReactNode;

  /** Icona a destra (es. clear, show/hide) */
  rightIcon?: React.ReactNode;

  /** Callback click su icona destra */
  onRightIconClick?: () => void;

  /** Full width di default */
  fullWidth?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      helperText,
      errorText,
      variant = "default",
      leftIcon,
      rightIcon,
      onRightIconClick,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) {
    const inputId = id ?? React.useId();
    const isError = variant === "error" || Boolean(errorText);

    return (
      <div className={cn(fullWidth && "w-full")}>
        {/* LABEL */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-1 block text-sm font-medium text-zinc-900",
              disabled && "opacity-60"
            )}
          >
            {label}
          </label>
        )}

        {/* INPUT WRAPPER */}
        <div
          className={cn(
            "relative flex items-center rounded-md border bg-transparent transition-colors",
            "focus-within:ring-2 focus-within:ring-zinc-900/10",
            disabled && "opacity-60",
            isError
              ? "border-red-500"
              : "border-zinc-300 focus-within:border-zinc-900"
          )}
        >
          {/* ICON LEFT */}
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 inline-flex items-center text-zinc-500">
              {leftIcon}
            </span>
          )}

          {/* INPUT */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={isError || undefined}
            className={cn(
              "h-11 w-full bg-transparent px-3 text-sm outline-none",
              "placeholder:text-zinc-400",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {/* ICON RIGHT */}
          {rightIcon && (
            <button
              type="button"
              tabIndex={onRightIconClick ? 0 : -1}
              onClick={onRightIconClick}
              className={cn(
                "absolute right-2 inline-flex h-8 w-8 items-center justify-center rounded-md transition",
                onRightIconClick
                  ? "hover:bg-zinc-100"
                  : "pointer-events-none"
              )}
              aria-label={onRightIconClick ? "Input action" : undefined}
            >
              {rightIcon}
            </button>
          )}
        </div>

        {/* HELPER / ERROR */}
        {(isError ? errorText : helperText) && (
          <p
            className={cn(
              "mt-1 text-xs",
              isError ? "text-red-600" : "text-zinc-500"
            )}
          >
            {isError ? errorText : helperText}
          </p>
        )}
      </div>
    );
  }
);
