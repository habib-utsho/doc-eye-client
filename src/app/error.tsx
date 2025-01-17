"use client";
import { Button } from "@heroui/button";
import Link from "next/link";
import React from "react";
import Container from "../components/ui/Container";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <Container className="h-[80vh] flex flex-col gap-1 items-center justify-center">
      <h2 className="font-semibold mb-2">
        {" "}
        {error?.message || "Something went wrong!"}
      </h2>
      <div className="flex gap-4 items-center justify-center flex-wrap">
        <Link href={"/"}>
          <Button>Back to home</Button>
        </Link>
        <Button color="primary" onClick={reset} className="text-white">
          Try again
        </Button>
      </div>
    </Container>
  );
};

export default ErrorPage;
