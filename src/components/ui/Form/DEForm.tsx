"use client";

import React, { ReactNode, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
  defaultValues?: any;
  resolver?: any;
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
  ...rest
}: DEFormProps) => {
  const formConfig: TFormConfig = {};
  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <FormProvider {...methods}>
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
