"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type InputVariant = "default" | "error";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  variant?: InputVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
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
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-2 block text-sm font-medium",
              "text-[color:var(--ds-field-label)]",
              disabled && "opacity-60"
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "relative flex items-center",
            "h-11 w-full",
            "rounded-[var(--ds-field-radius)] border",
            "bg-[color:var(--ds-field-bg)]",
            "transition-colors",
            disabled && "opacity-60",
            isError
              ? "border-[color:var(--ds-field-border-error)]"
              : "border-[color:var(--ds-field-border)] hover:border-[color:var(--ds-field-border-hover)]",
            "focus-within:border-[color:var(--ds-field-border-focus)]",
            "focus-within:ring-2 focus-within:ring-[color:var(--ds-field-ring)]"
          )}
        >
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 inline-flex items-center text-white/60">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={isError || undefined}
            className={cn(
             "h-full w-full appearance-none bg-green-500"
              "px-3 text-sm outline-none",
              "text-[color:var(--ds-field-text)]",
              "placeholder:text-[color:var(--ds-field-placeholder)]",
              leftIcon && "pl-10",
              rightIcon && "pr-11",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <button
              type="button"
              tabIndex={onRightIconClick ? 0 : -1}
              onClick={onRightIconClick}
              className={cn(
                "absolute right-2 inline-flex h-8 w-8 items-center justify-center rounded-md",
                onRightIconClick
                  ? "text-white/70 hover:bg-white/5 hover:text-white/90"
                  : "pointer-events-none text-white/50"
              )}
              aria-label={onRightIconClick ? "Input action" : undefined}
            >
              {rightIcon}
            </button>
          )}
        </div>

        {(isError ? errorText : helperText) && (
          <p
            className={cn(
              "mt-2 text-xs",
              isError
                ? "text-[color:var(--ds-field-error)]"
                : "text-[color:var(--ds-field-helper)]"
            )}
          >
            {isError ? errorText : helperText}
          </p>
        )}
      </div>
    );
  }
);
