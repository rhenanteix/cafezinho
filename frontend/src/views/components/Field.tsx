import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { CircleAlert } from "lucide-react";

interface WrapperProps {
  label: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  count?: { value: number; max: number };
  htmlFor: string;
  children: ReactNode;
}

export function FieldWrapper({ label, hint, error, optional, count, htmlFor, children }: WrapperProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-espresso">
          {label}
          {optional && <span className="ml-1.5 font-normal text-mocha/70">(opcional)</span>}
        </label>
        {count && (
          <span className={`text-xs tabular-nums ${count.value > count.max ? "text-red-600" : "text-mocha/60"}`}>
            {count.value}/{count.max}
          </span>
        )}
      </div>
      {children}
      {error ? (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <CircleAlert className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : (
        hint && <p className="text-xs leading-relaxed text-mocha/80">{hint}</p>
      )}
    </div>
  );
}

export const inputClass = (error?: string) =>
  `w-full rounded-xl bg-white px-4 py-3 text-[15px] text-espresso placeholder:text-mocha/40 ring-1 transition outline-none focus:ring-2 ${
    error ? "ring-red-300 focus:ring-red-400" : "ring-black/10 hover:ring-black/20 focus:ring-brand-400"
  }`;

type InputProps = InputHTMLAttributes<HTMLInputElement> & Omit<WrapperProps, "children" | "htmlFor" | "count"> & {
  id: string;
  showCount?: boolean;
  prefix?: ReactNode;
};

export function TextField({ label, hint, error, optional, id, showCount, maxLength, prefix, className = "", ...rest }: InputProps) {
  const count = showCount && maxLength ? { value: String(rest.value ?? "").length, max: maxLength } : undefined;
  return (
    <FieldWrapper label={label} hint={hint} error={error} optional={optional} count={count} htmlFor={id}>
      {prefix ? (
        <div className={`flex items-center overflow-hidden ${inputClass(error)} p-0! focus-within:ring-2 ${error ? "" : "focus-within:ring-brand-400"}`}>
          <span className="select-none whitespace-nowrap pl-4 text-[15px] text-mocha/60">{prefix}</span>
          <input id={id} maxLength={maxLength} className={`w-full bg-transparent py-3 pr-4 text-[15px] outline-none ${className}`} {...rest} />
        </div>
      ) : (
        <input id={id} maxLength={maxLength} className={`${inputClass(error)} ${className}`} {...rest} />
      )}
    </FieldWrapper>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Omit<WrapperProps, "children" | "htmlFor" | "count"> & {
  id: string;
};

export function TextAreaField({ label, hint, error, optional, id, maxLength, className = "", ...rest }: TextAreaProps) {
  const count = maxLength ? { value: String(rest.value ?? "").length, max: maxLength } : undefined;
  return (
    <FieldWrapper label={label} hint={hint} error={error} optional={optional} count={count} htmlFor={id}>
      <textarea id={id} maxLength={maxLength} rows={4} className={`${inputClass(error)} resize-none ${className}`} {...rest} />
    </FieldWrapper>
  );
}
