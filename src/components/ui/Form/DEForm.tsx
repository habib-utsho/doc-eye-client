"use client";

import React, { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
  defaultValues?: any;
  resolver?: any;
};
type DEFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
} & TFormConfig;

const DEForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: DEFormProps) => {
  const formConfig: TFormConfig = {};
  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  const handleSubmit = methods.handleSubmit;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {children}
      </form>
    </FormProvider>
  );
};

export default DEForm;
