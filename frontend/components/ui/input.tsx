"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      onRightIconClick,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;

    const hasError = Boolean(errorText);
    const hasLeft = Boolean(leftIcon);
    const hasRight = Boolean(rightIcon);

    const helperId = helperText ? `${inputId}-help` : undefined;
    const errorId = errorText ? `${inputId}-error` : undefined;
    const describedBy = [hasError ? errorId : helperId].filter(Boolean).join(" ");

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm text-muted-foreground"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "ds-field relative flex items-center",
            disabled && "ds-field--disabled",
            hasError && "ds-field--error"
          )}
        >
          {hasLeft && (
            <div className="pointer-events-none absolute left-3 flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy || undefined}
            className={cn(
              "h-11 w-full rounded-[var(--ds-radius-field)] bg-transparent px-4 text-sm",
              "text-[color:var(--ds-field-text)] placeholder:text-[color:var(--ds-field-placeholder)]",
              "outline-none",
              hasLeft && "pl-11",
              hasRight && "pr-11",
              disabled && "cursor-not-allowed"
            )}
            {...props}
          />

          {hasRight && (
            <button
              type="button"
              onClick={onRightIconClick}
              disabled={disabled || !onRightIconClick}
              className={cn(
                "absolute right-3 flex items-center",
                !onRightIconClick && "pointer-events-none",
                disabled && "opacity-60"
              )}
              aria-label="Input action"
            >
              {rightIcon}
            </button>
          )}
        </div>

        {hasError ? (
          <p id={errorId} className="text-sm text-[color:var(--ds-field-error)]">
            {errorText}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-sm text-[color:var(--ds-field-helper)]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

