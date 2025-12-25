"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type TextareaVariant = "default" | "error";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    helperText?: string;
    errorText?: string;
    variant?: TextareaVariant;
    showCounter?: boolean;
    fixed88?: boolean;
    fullWidth?: boolean;
  };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      helperText,
      errorText,
      variant = "default",
      showCounter = false,
      fixed88 = false,
      fullWidth = true,
      className,
      id,
      disabled,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) {
    const textareaId = id ?? React.useId();
    const isError = variant === "error" || Boolean(errorText);

    const [internal, setInternal] = React.useState<string>(() => {
      if (typeof value === "string") return value;
      if (typeof defaultValue === "string") return defaultValue;
      return "";
    });

    React.useEffect(() => {
      if (typeof value === "string") setInternal(value);
    }, [value]);

    const currentLen =
      typeof value === "string" ? value.length : internal.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (typeof value !== "string") setInternal(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={cn(fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "mb-2 block text-sm font-medium",
              "text-[color:var(--ds-field-label)]",
              disabled && "opacity-60"
            )}
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={isError || undefined}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            "w-full",
            "appearance-none bg-transparent", // 🔑 FIX browser style
            "outline-none transition-colors",
            "rounded-[var(--ds-field-radius)] border",
            "bg-[color:var(--ds-field-bg)]",
            "px-3 py-3 text-sm",
            "text-[color:var(--ds-field-text)]",
            "placeholder:text-[color:var(--ds-field-placeholder)]",
            "resize-none",
            fixed88 ? "h-[88px]" : "min-h-[112px]",
            disabled && "opacity-60",
            isError
              ? "border-[color:var(--ds-field-border-error)]"
              : "border-[color:var(--ds-field-border)] hover:border-[color:var(--ds-field-border-hover)]",
            "focus:border-[color:var(--ds-field-border-focus)]",
            "focus:ring-2 focus:ring-[color:var(--ds-field-ring)]",
            className
          )}
          {...props}
        />

        <div className="mt-2 flex items-start justify-between gap-3">
          <p
            className={cn(
              "text-xs",
              isError
                ? "text-[color:var(--ds-field-error)]"
                : "text-[color:var(--ds-field-helper)]"
            )}
          >
            {isError ? errorText : helperText}
          </p>

          {showCounter && typeof maxLength === "number" && (
            <p className="shrink-0 text-xs text-[color:var(--ds-field-helper)]">
              {currentLen} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);
