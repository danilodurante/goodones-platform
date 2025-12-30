"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;

  required?: boolean;
  disabled?: boolean;

  // per Textarea (counter)
  showCounter?: boolean;
  maxLength?: number;
  valueLength?: number;
}

export function Field({
  id,
  label,
  helperText,
  errorText,
  required,
  disabled,
  showCounter,
  maxLength,
  valueLength,
  className,
  children,
  ...props
}: FieldProps) {
  const hasError = Boolean(errorText);
  const messageId = id ? `${id}-message` : undefined;

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {/* LABEL */}
      {label ? (
        <label
          htmlFor={id}
          className={cn(
            "block text-sm font-medium leading-none",
            disabled && "opacity-60"
          )}
        >
          {label}
          {required ? <span className="ml-1 opacity-70">*</span> : null}
        </label>
      ) : null}

      {/* CONTROL (Input/Textarea wrapper) */}
      <div className="w-full">{children}</div>

      {/* MESSAGE ROW: helper/error + counter */}
      {(helperText || errorText || showCounter) && (
        <div className="flex items-start justify-between gap-4">
          <p
            id={messageId}
            className={cn(
              "text-sm leading-5",
              hasError ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {hasError ? errorText : helperText}
          </p>

          {showCounter && typeof maxLength === "number" ? (
            <p className="text-xs text-muted-foreground tabular-nums">
              {(valueLength ?? 0)}/{maxLength}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

