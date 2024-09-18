// TODO
import React from "react";

type MyInpProps = {
  name: string | string[];
  label: string;
  type:
    | "text"
    | "number"
    | "password"
    | "email"
    | "checkbox"
    | "radio"
    | "select"
    | "textarea"
    | "date";
  rules?: any[];
  disabled?: boolean;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  options?: { label: string; value: string }[];
  size?: "small" | "middle" | "large";
  prefix?: React.ReactNode;
  mode?: "multiple" | "tags" | undefined;
};

// className="my-inp"
// defaultValue={"admin@gmail.com"}
const MyInp: React.FC<MyInpProps> = ({
  type,
  placeholder,
  name,
  label,
  rules,
  options,
  disabled,
  size = "large",
  defaultValue,
  value,
  prefix,
  mode,
}) => {
  return "inp";
};

export default MyInp;
