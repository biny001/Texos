import { useUploadFile } from "@/lib/react-query/queryAndMutations";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const PostInput = ({ register, isSuccess }) => {
  const { mutateAsync: UploadFile, isPending } = useUploadFile();
  const [imgInfo, setImageInfo] = useState(null);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles[0]);
      const imageDetails = await UploadFile(acceptedFiles[0]);
      console.log(imageDetails);

      setImageInfo(imageDetails);
      register("imageUrl", imageDetails.href);
    },
    [UploadFile, register]
  );
  console.log(isSuccess);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      className="  rounded-xl   justify-center items-center  flex flex-col  min-w-[350px]   sm:w-full py-3 px-1 h-[250px]  border-blue-600"
      {...getRootProps()}
      onClick={open}
    >
      <div className=" w-full h-full relative bg-black py-4  rounded-2xl  cursor-pointer">
        {isSuccess ? (
          <img
            type="file"
            className=" w-full h-full    object-contain"
            src={`/icons/file-upload.svg`}
          />
        ) : (
          <img
            type="file"
            className=" w-full h-full    object-contain"
            src={` ${imgInfo ? imgInfo?.href : "/icons/file-upload.svg"} `}
          />
        )}

        <div
          className={` ${
            imgInfo ? "hidded" : " "
          } w-full justify-center absolute bottom-1   flex text-slate-500`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' dropfiles or click to select files</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostInput;
