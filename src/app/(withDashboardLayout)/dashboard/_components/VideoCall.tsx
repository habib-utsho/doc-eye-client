import { VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import React from "react";

const VideoCall = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        isIconOnly
        startContent={<VideoCameraOutlined />}
        // isLoading={}
        onPress={onOpen}
        variant="shadow"
        className="text-white bg-primary text-lg flex-1 rounded-l-none"
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        className="!max-w-2xl"
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="py-12 px-8 w-full">
          {(onClose) => (
            <>
              <h2 className="font-bold text-xl text-center">Video call demo</h2>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoCall;
