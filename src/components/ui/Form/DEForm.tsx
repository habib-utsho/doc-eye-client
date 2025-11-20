"use client";

import React, { ReactNode, useEffect, useRef } from "react";
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
  const internalMethods = useForm(formConfig);
  const methodsToUse = methods || internalMethods;
  const { handleSubmit, reset } = methodsToUse;

  const prevDefaultValuesRef = useRef<string>();

  useEffect(() => {
    const currentDefaultValues = JSON.stringify(defaultValues);

    if (
      defaultValues &&
      prevDefaultValuesRef.current !== currentDefaultValues
    ) {
      prevDefaultValuesRef.current = currentDefaultValues;
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // console.log(errors, watch("currentWorkPlace"));

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
