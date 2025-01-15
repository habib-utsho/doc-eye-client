"use client";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import React, { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

type TMyInp = {
  name: string;
  type:
    | "text"
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

  const [isVisible, setIsVisible] = React.useState(false);

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
