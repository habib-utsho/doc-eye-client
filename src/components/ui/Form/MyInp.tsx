"use client";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React, { ReactNode, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  PlusIcon,
  XMarkIcon,
} from "../icons";
import { Badge } from "@heroui/badge";

type TMyInp = {
  name: string;
  type:
    | "text"
    | "array"
    | "file"
    | "number"
    | "password"
    | "email"
    | "date"
    | "time"
    | "select"
    | "textarea";
  size?: "sm" | "md" | "lg";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  label?: ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => void;
  options?: { key: string; label: string }[];
  className?: string;
  selectionMode?: "single" | "multiple";
};

const MyInp = ({
  name,
  type = "text",
  label,
  placeholder,
  radius = "md",
  size = "sm",
  color = "default",
  disabled,
  defaultValue,
  onChange,
  options = [],
  className,
  selectionMode = "single",
}: TMyInp) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const [arr, setArr] = useState<string[]>([]);

  if (type === "file") {
    return (
      <Input
        type="file"
        onChange={onChange}
        size={size}
        radius={radius}
        color={color}
        label={label}
        placeholder={placeholder}
        isInvalid={!!errors[name]}
        disabled={disabled}
        errorMessage={errors[name]?.message as string}
        className={className}
      />
    );
  }

  // Arr functions
  const handleAddArrFunc = () => {
    const inputValue = (document.getElementById(name) as HTMLInputElement)
      ?.value;
    console.log(name, inputValue, "inputValue");
    if (inputValue && !arr.includes(inputValue)) {
      setArr((prev) => [...prev, inputValue]);
      (document.getElementById(name) as HTMLInputElement).value = "";
    }
  };
  const handleRemoveArrFunc = (item: string) => {
    setArr((prev) => prev.filter((i) => i !== item));
  };

  console.log(arr, "arr");

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field }) => {
        const handleChange = (e: any) => {
          field.onChange(e);
          if (onChange) onChange(e);

          if (type === "select" && selectionMode === "multiple") {
            console.log(e?.target?.value?.split(","), "e");
            field.onChange(e?.target?.value?.split(","));
          }
        };

        if (type === "textarea") {
          return (
            <Textarea
              {...field}
              onChange={handleChange}
              size={size}
              radius={radius}
              color={color}
              label={label}
              placeholder={placeholder}
              isInvalid={!!errors[name]}
              disabled={disabled}
              errorMessage={errors[name]?.message as string}
              className={className}
            />
          );
        }

        if (type === "array") {
          return (
            <div className="shadow p-4 rounded-md">
              <div className="relative ">
                <Input
                  {...field}
                  onChange={handleChange}
                  size={size}
                  radius={radius}
                  color={color}
                  label={label}
                  id={name}
                  placeholder={placeholder}
                  isInvalid={!!errors[name]}
                  disabled={disabled}
                  errorMessage={errors[name]?.message as string}
                  className={className}
                />
                <PlusIcon
                  onClick={() => handleAddArrFunc()}
                  className={`cursor-pointer text-primary text-[12px] absolute right-1 top-1/2 ${
                    !!errors[name] ? "-translate-y-[24px]" : "-translate-y-1/2"
                  } translate`}
                />
              </div>

              {/* Arr items */}
              <div className="flex flex-wrap gap-4 mt-3">
                {arr.map((item) => (
                  <div key={item} className="relative">
                    <span className="text-primary bg-primary bg-opacity-20 pl-2 pr-6 rounded-r-md">
                      {item}
                    </span>
                    <XMarkIcon
                      onClick={() => handleRemoveArrFunc(item)}
                      className="text-danger text-[10px] cursor-pointer absolute top-0 right-0 translate-x-[8px] -translate-y-[8px] bg-danger bg-opacity-20 rounded-md p-[2px]"
                      aria-label="remove item"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (type === "password") {
          return (
            <Input
              {...field}
              onChange={handleChange}
              type={isVisible ? "text" : "password"}
              size={size}
              radius={radius}
              color={color}
              label={label}
              placeholder={placeholder}
              isInvalid={!!errors[name]}
              disabled={disabled}
              errorMessage={errors[name]?.message as string}
              className={className}
              endContent={
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setIsVisible(!isVisible)}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          );
        }

        if (type === "select") {
          return (
            <Select
              {...field}
              onChange={handleChange}
              size={size}
              radius={radius}
              color={color}
              label={label}
              placeholder={placeholder}
              isInvalid={!!errors[name]}
              disabled={disabled}
              className={className}
              errorMessage={errors[name]?.message as string}
              selectionMode={selectionMode}
            >
              {options.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          );
        }

        return (
          <Input
            {...field}
            onChange={handleChange}
            type={type}
            size={size}
            radius={radius}
            color={color}
            label={label}
            placeholder={placeholder}
            isInvalid={!!errors[name]}
            disabled={disabled}
            errorMessage={errors[name]?.message as string}
            className={className}
          />
        );
      }}
    />
  );
};

export default MyInp;
