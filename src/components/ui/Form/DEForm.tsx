"use client";

import { error } from "console";
import React, { ReactNode, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
  defaultValues?: any;
  resolver?: any;
  methods?: any;
};
type DEFormProps = {
  className?: string;
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
} & TFormConfig;

const DEForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
  className,
  methods,
  ...rest
}: DEFormProps) => {
  const formConfig: TFormConfig = {};
  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const internalMethods = methods || useForm(formConfig);
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = internalMethods;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  console.log(errors, watch("currentWorkPlace"));

  return (
    <FormProvider {...internalMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full ${className}`}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default DEForm;
