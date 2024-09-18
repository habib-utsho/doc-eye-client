"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="h-[80vh] flex flex-col gap-1 items-center justify-center">
      <h2 className="font-semibold mb-2">
        {" "}
        {error?.message || "Something went wrong!"}
      </h2>
      <div className="flex gap-4 items-center justify-center flex-wrap">
        <Link href={"/"}>
          <Button>Back to home</Button>
        </Link>
        <Button color="primary" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
