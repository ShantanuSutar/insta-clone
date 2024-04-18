"use client";
import React, { useState } from "react";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

interface ImageUploadProps {
  imageUrl: string;
  setImageUrl: (value: string) => void;
}

const ImageUpload = ({ imageUrl, setImageUrl }: ImageUploadProps) => {
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl.length > 0 && (
        <div className=" border p-2">
          <Image src={imageUrl} alt="my image" width={300} height={500} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
