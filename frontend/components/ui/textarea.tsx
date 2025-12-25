"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type TextareaVariant = "default" | "error";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Label sopra il campo */
  label?: string;

  /** Testo helper (default) */
  helperText?: string;

  /** Testo di errore (mostrato se variant=error) */
  errorText?: string;

  /** Variante visuale */
  variant?: TextareaVariant;

  /** Mostra contatore x / maxLength */
  showCounter?: boolean;

  /** Altezza fissa 88px (come da Figma) */
  fixed88?: boolean;

  /** Full width di default */
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

    // Counter compatibile sia con controlled che uncontrolled
    const [internal, setInternal] = React.useState<string>(() => {
      if (typeof value === "string") return value;
      if (typeof defaultValue === "string") return defaultValue;
      return "";
    });

    React.useEffect(() => {
      if (typeof value === "string") setInternal(value);
    }, [value]);

    const currentLen = typeof value === "string" ? value.length : internal.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (typeof value !== "string") setInternal(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={cn(fullWidth && "w-full")}>
        {/* LABEL */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "mb-1 block text-sm font-medium text-zinc-900",
              disabled && "opacity-60"
            )}
          >
            {label}
          </label>
        )}

        {/* TEXTAREA */}
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
            "w-full resize-none rounded-md border bg-transparent px-3 py-3 text-sm outline-none transition-colors",
            "focus:ring-2 focus:ring-zinc-900/10",
            "placeholder:text-zinc-400",
            disabled && "opacity-60",
            fixed88 ? "h-[88px]" : "min-h-[112px]",
            isError ? "border-red-500" : "border-zinc-300 focus:border-zinc-900",
            className
          )}
          {...props}
        />

        {/* HELPER/ERROR + COUNTER */}
        <div className="mt-1 flex items-start justify-between gap-3">
          <p className={cn("text-xs", isError ? "text-red-600" : "text-zinc-500")}>
            {isError ? errorText : helperText}
          </p>

          {showCounter && typeof maxLength === "number" && (
            <p className="shrink-0 text-xs text-zinc-500">
              {currentLen} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);
