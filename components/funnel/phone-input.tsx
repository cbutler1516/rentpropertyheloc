"use client";

import { Input } from "@/components/ui/input";
import { formatPhoneDisplay, parsePhoneInput } from "@/lib/phone-format";
import type { ComponentProps } from "react";

type PhoneInputProps = Omit<ComponentProps<typeof Input>, "value" | "onChange" | "type"> & {
  /** Normalized digits only */
  value: string;
  onChange: (digits: string) => void;
};

export function PhoneInput({
  value,
  onChange,
  onPaste,
  placeholder = "(000) 000-0000",
  inputMode = "tel",
  autoComplete = "tel",
  ...props
}: PhoneInputProps) {
  const displayValue = formatPhoneDisplay(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(parsePhoneInput(e.target.value));
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    onChange(parsePhoneInput(pasted));
    onPaste?.(e);
  }

  return (
    <Input
      {...props}
      type="tel"
      inputMode={inputMode}
      autoComplete={autoComplete}
      value={displayValue}
      onChange={handleChange}
      onPaste={handlePaste}
      placeholder={placeholder}
    />
  );
}
