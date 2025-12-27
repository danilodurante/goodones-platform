import * as React from "react";
import { Field } from "./field";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  /** Se presente, la rightIcon diventa un'azione cliccabile (es. clear) */
  onRightIconClick?: () => void;
}

function normalizeIcon(icon: React.ReactNode): React.ReactNode {
  if (!icon || !React.isValidElement(icon)) return icon;

  return React.cloneElement(icon as any, {
    size: 16,
    width: 16,
    height: 16,
    style: { width: 16, height: 16, display: "block" },
  });
}

/**
 * Spaziature robuste (inline) => non vengono “purgate” e non dipendono da classi dinamiche.
 * Regola qui se vuoi più/meno stacco.
 */
const ICON_COL_PX = 52; // larghezza colonna icona (px)
const INPUT_PAD_X_PX = 12; // padding base quando NON ci sono icone
const GAP_AFTER_ICON_PX = 12; // gap tra colonna icona e testo (stacco percepito)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
      className = "",
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(errorText);
    const hasLeft = Boolean(leftIcon);
    const hasRight = Boolean(rightIcon);

    const left = normalizeIcon(leftIcon);
    const right = normalizeIcon(rightIcon);

    const wrapperCls =
      "relative flex items-center h-11 rounded-md border bg-background overflow-hidden " +
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 " +
      "disabled:cursor-not-allowed disabled:opacity-60 " +
      (hasError ? "border-destructive focus-within:ring-destructive/40 " : "");

    // padding che deve SEMPRE funzionare (inline)
    const inputStyle: React.CSSProperties = {
      paddingLeft: hasLeft ? GAP_AFTER_ICON_PX : INPUT_PAD_X_PX,
      paddingRight: hasRight ? GAP_AFTER_ICON_PX : INPUT_PAD_X_PX,
    };

    return (
      <Field
        id={id ?? "input"}
        label={label}
        helperText={helperText}
        errorText={errorText}
        disabled={disabled}
      >
        <div className={wrapperCls}>
          {/* LEFT ICON COLUMN */}
          {hasLeft && (
            <div
              className="flex h-full items-center justify-center text-muted-foreground"
              style={{ width: ICON_COL_PX, paddingTop: 1 }} // optical align
            >
              {left}
            </div>
          )}

          {/* INPUT */}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            className={
              "flex-1 h-full bg-transparent outline-none " +
              "text-sm leading-5 text-foreground placeholder:text-muted-foreground " +
              className
            }
            style={inputStyle}
            {...props}
          />

          {/* RIGHT ICON / ACTION */}
          {hasRight && (
            <div
              className="flex h-full items-center justify-center"
              style={{ width: ICON_COL_PX, paddingTop: 1 }} // optical align
            >
              {onRightIconClick ? (
                <button
                  type="button"
                  onClick={onRightIconClick}
                  disabled={disabled}
                  aria-label="Clear"
                  className="appearance-none bg-transparent border-0 m-0 inline-flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground outline-none focus:outline-none focus:ring-0 disabled:opacity-60"
                  style={{ WebkitAppearance: "none" as any }}
                >
                  {right}
                </button>
              ) : (
                <div className="text-muted-foreground">{right}</div>
              )}
            </div>
          )}
        </div>
      </Field>
    );
  }
);

Input.displayName = "Input";
export { Input };

