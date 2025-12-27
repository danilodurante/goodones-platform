import * as React from "react";
import { Field } from "./field";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  showCounter?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = "",
      id,
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      showCounter,
      maxLength,
      value,
      defaultValue,
      disabled,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const stringValue =
      typeof value === "string"
        ? value
        : typeof defaultValue === "string"
        ? defaultValue
        : "";

    const valueLength = stringValue.length;
    const hasError = Boolean(errorText);

    // Allineamento ottico alla prima riga (con py-3 e text-sm/leading-5)
    // 0.875rem ≈ 14px: funziona bene con top padding 12px
    const iconTop = "0.875rem";

    return (
      <Field
        id={id ?? "textarea"}
        label={label}
        required={required}
        helperText={helperText}
        errorText={errorText}
        showCounter={showCounter}
        maxLength={maxLength}
        valueLength={valueLength}
        disabled={disabled}
      >
        <div className="relative">
          {leftIcon ? (
            <div className="pointer-events-none absolute left-3" style={{ top: iconTop }}>
              <span className="text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
                {leftIcon}
              </span>
            </div>
          ) : null}

          <textarea
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={`${id}-message`}
            rows={rows}
            className={`
              w-full resize-none rounded-md border bg-background
              text-sm leading-5 text-foreground
              placeholder:text-muted-foreground
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-60
              ${hasError ? "border-destructive focus-visible:ring-destructive/40" : ""}
              ${className}
            `}
            style={{
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              paddingLeft: leftIcon ? "2.5rem" : "0.75rem",
              paddingRight: rightIcon ? "2.5rem" : "0.75rem",
            }}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />

          {rightIcon ? (
            <div className="pointer-events-none absolute right-3" style={{ top: iconTop }}>
              <span className="text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
                {rightIcon}
              </span>
            </div>
          ) : null}
        </div>
      </Field>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };

