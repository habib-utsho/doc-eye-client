"use client";
import { Button } from "@heroui/button";
import React from "react";
import { toast } from "sonner";

const SubscribeButton = () => {
  return (
    <Button
      color="primary"
      className="absolute bottom-2 left-0 right-0 mx-5 text-white"
      onPress={() => toast.warning("Subscription feature coming soon!")}
    >
      Subscribe Now
    </Button>
  );
};

export default SubscribeButton;
