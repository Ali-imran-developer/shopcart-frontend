import React from "react";
import { Input } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
>;

interface InputNumberProps extends NativeInputProps {
  value: number | string | undefined;
  name: string;
  setFieldValue?: (field: string, value: any) => void;
  lengthLimit?: number;
  min?: number;
  suffix?: string;
  max?: number;
  label?: string;
  error?: boolean;
  enableBlurReset?: boolean;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  name,
  setFieldValue,
  onChange,
  onFocus,
  onBlur,
  className,
  suffix,
  min = 0,
  max = 1000,
  lengthLimit,
  label,
  error,
  enableBlurReset = true,
  ...props
}) => {
  const blockedKeys = ["e", "E", "+", "-"];

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value === 0 || value === "0") {
      setFieldValue?.(name, "");
    }
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (enableBlurReset && value === "") {
      setFieldValue?.(name, 0);
    }
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (lengthLimit && val.length > lengthLimit) {
      val = val.slice(0, lengthLimit);
    }

    const parsed = parseInt(val);
    if (!isNaN(parsed)) {
      if (parsed > max) val = max.toString();
      else if (parsed < min) val = min.toString();
      setFieldValue?.(name, parsed);
    } else {
      setFieldValue?.(name, "");
    }
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (blockedKeys.includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (blockedKeys.some((char) => pasteData.includes(char))) {
      e.preventDefault();
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <Input
      label={label}
      {...props}
      suffix={suffix}
      type="number"
      name={name}
      value={value}
      onWheel={handleWheel}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      className={cn("w-20 p-0", className)}
      error={error as any}
    />
  );
};

export default InputNumber;
