"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  errorText?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, helperText, errorText, disabled, className, ...props }, ref) => {
    const autoId = React.useId();
    const textareaId = id ?? autoId;

    const hasError = Boolean(errorText);

    const helperId = helperText ? `${textareaId}-help` : undefined;
    const errorId = errorText ? `${textareaId}-error` : undefined;
    const describedBy = [hasError ? errorId : helperId].filter(Boolean).join(" ");

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm text-muted-foreground"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "ds-field",
            disabled && "ds-field--disabled",
            hasError && "ds-field--error"
          )}
        >
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy || undefined}
            className={cn(
              "min-h-[140px] w-full resize-none rounded-[var(--ds-radius-field)] bg-transparent p-4 text-sm",
              "text-[color:var(--ds-field-text)] placeholder:text-[color:var(--ds-field-placeholder)]",
              "outline-none",
              disabled && "cursor-not-allowed"
            )}
            {...props}
          />
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

Textarea.displayName = "Textarea";

