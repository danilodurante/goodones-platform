import * as React from "react";
import { cn } from "@/lib/cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, errorText, disabled, children, ...props }, ref) => {
    const hasError = Boolean(errorText);

    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            className={cn(
              // base (coerente con Input/Textarea)
              "w-full h-11 rounded-md border bg-transparent px-3 pr-10 text-sm text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              // hide native arrow
              "appearance-none",
              // states
              hasError ? "border-destructive focus:ring-destructive/40" : "border-input",
              className
            )}
            {...props}
          >
            {children}
          </select>

          {/* Chevron custom */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {(helperText || errorText) && (
          <p
            className={cn(
              "text-xs",
              hasError ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {errorText ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

