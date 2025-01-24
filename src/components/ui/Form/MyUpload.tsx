import Image from "next/image";
import React, { useState } from "react";
import { DeleteIcon, FileUploadIcon } from "../icons";
import MyInp from "./MyInp";
import { Button } from "@heroui/button";
import signinBG from "@/src/assets/img/Sign/signinBG.jpg";

const MyUpload = ({
  setSelectedFile,
  previewUrl,
  setPreviewUrl,
  height = 170,
  width,
  defaultValue,
  placeholder = "Upload your avatar",
  align = "left",
}: {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  defaultValue?: string | null;
  height?: number;
  width?: number;
  placeholder?: string;
  align?: "center" | "left" | "right";
}) => {
  const [myDefaultValue, setMyDefaultValue] = useState<string | null>(
    defaultValue || null
  );
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validImageTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, JPG, PNG, or GIF)");
        return;
      }

      // Set the selected file state
      setSelectedFile(file);

      // Read the file for preview
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };
  return (
    <div className={`flex justify-${align}`}>
      <div
        className={`avatar-wrapper w-full h-full`}
        style={{
          height: `${height}px`,
          width: `${width ? `${width}px` : "full"}`,
        }}
      >
        {previewUrl || myDefaultValue ? (
          <div className="relative h-full w-full rounded-lg overflow-hidden border border-primary">
            <Image
              alt="avatar"
              src={previewUrl || myDefaultValue || ""}
              // height={350}
              // width={350}
              layout="fill"
              className="border rounded-lg h-full w-full object-coverf"
            />
            <span className="bg-white bg-opacity-30 hover:bg-danger hover:bg-opacity-20 border border-danger p-2 rounded-bl-lg rounded-tr-lg inline-block absolute top-0  right-0 cursor-pointer">
              <DeleteIcon
                className=" text-danger scale-150"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                  setMyDefaultValue(null);
                }}
              />
            </span>
          </div>
        ) : (
          <div
            className="h-full w-full  border flex items-center justify-center rounded-lg cursor-pointer relative"
            style={{ backgroundImage: `url(${signinBG.src})` }}
          >
            <Button isIconOnly className="h-full w-full bg-opacity-50">
              <div className="flex flex-col gap-1 items-center justify-center">
                <FileUploadIcon className="text-white size-6" />
                <span className="text-white">{placeholder}</span>
              </div>
              <MyInp
                type="file"
                name="file"
                onChange={onFileChange}
                className="opacity-0 absolute top-0 left-0 bottom-0 w-full h-full"
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyUpload;
