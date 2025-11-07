"use client";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  PlusIcon,
  XMarkIcon,
} from "../icons";
import { toast } from "sonner";
import { get } from "http";

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
  fields?: any[];
  setArr?: Dispatch<SetStateAction<any[]>>;
  append?: (e: any) => void;
  remove?: (e: any) => void;
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
  fields,
  append,
  remove,
}: TMyInp) => {
  const {
    control,
    getValues,
    formState: { errors },
    trigger,
  } = useFormContext();

  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const [inputValue, setInputValue] = useState("");

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

  const getErrorMessage = (errors: any, name: string): string | undefined => {
    if (!errors || !name) return undefined;

    // Handle names like "medications[1].duration"
    const match = name.match(/^([^\[]+)\[(\d+)\]\.(.+)$/);

    if (match) {
      const [, arrayKey, indexStr, fieldKey] = match;
      const index = parseInt(indexStr, 10);

      const arrayErrors = errors[arrayKey];
      if (Array.isArray(arrayErrors) && arrayErrors[index]) {
        const fieldError = arrayErrors[index][fieldKey];
        if (fieldError && typeof fieldError.message === "string") {
          return fieldError.message;
        }
      }
    }

    // Handle direct field errors like "doctor", "appointment"
    const error = errors[name] || errors[name?.split("[")?.[0]];
    if (typeof error?.message === "string") return error.message;

    // Handle array of primitive fields like problems[], advices[], tests[]
    if (Array.isArray(error)) {
      for (const item of error) {
        if (typeof item?.message === "string") return item.message;
      }
    }

    return undefined;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field }) => {
        const handleChange = (e: any) => {
          // For select multiple, convert comma-separated string to array
          if (type === "select" && selectionMode === "multiple") {
            const vals = e?.target?.value ? e.target.value.split(",") : [];
            field.onChange(vals);
            if (onChange) onChange(e);
            return;
          }

          // For number inputs, convert string value to actual number (or empty string for blank)
          if (type === "number") {
            const raw = e?.target?.value;
            const parsed = raw === "" || raw === undefined ? "" : Number(raw);
            // Pass the parsed number to react-hook-form
            field.onChange(parsed);
            // If a caller provided an onChange prop, call it with a normalized event-like object
            if (onChange)
              onChange({
                ...e,
                target: { ...e.target, value: parsed },
              });
            return;
          }

          // Default behavior: pass through the event
          field.onChange(e);
          if (onChange) onChange(e);
        };

        // Using built in append and remove props from react-hook-form
        // For array of string
        const handleAdd = async () => {
          const value = inputValue.trim();
          if (getValues(name)?.find((f: string) => f === value)) {
            toast.error("Item already added", {
              description: "You cannot add duplicate items.",
            });
            return;
          }
          if (value && append && !fields?.includes(value)) {
            append(value);
            setInputValue("");
            await trigger(name);
          }
        };

        if (type === "array") {
          return (
            <div className="shadow p-4 rounded-md">
              <div className="relative">
                <Input
                  id={name}
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAdd();
                    }
                  }}
                  isInvalid={!!getErrorMessage(errors, name)}
                  errorMessage={getErrorMessage(errors, name)}
                />
                <PlusIcon
                  onClick={handleAdd}
                  className={`cursor-pointer text-primary text-[12px] absolute right-[7px] top-[40px] ${
                    !!errors ? "-translate-y-[24px]" : "-translate-y-1/2"
                  } translate`}
                />
              </div>

              {/* Render Items */}
              <div className="flex flex-wrap gap-4 mt-3">
                {fields?.map((item, index) => (
                  <div key={item.id || index} className="relative">
                    <span className="text-primary bg-primary bg-opacity-20 pl-2 pr-6 rounded-r-md">
                      {/* Display fallback value */}
                      {getValues(name)?.[index] || ""}
                    </span>
                    <XMarkIcon
                      onClick={() => remove && remove(index)}
                      className="text-danger text-[10px] cursor-pointer absolute top-0 right-0 translate-x-[8px] -translate-y-[8px] bg-danger bg-opacity-20 rounded-md p-[2px]"
                      aria-label="remove item"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

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
            disabled={disabled}
            // isInvalid={!!errors[name]}
            isInvalid={!!getErrorMessage(errors, name)}
            // errorMessage={errors[name]?.message as string}
            errorMessage={getErrorMessage(errors, name)}
            className={`${className}`}
          />
        );
      }}
    />
  );
};

export default MyInp;
