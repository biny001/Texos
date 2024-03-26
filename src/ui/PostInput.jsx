import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const PostInput = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      className="  rounded-xl  bg-slate-900 justify-center items-center  flex flex-col min-w-[400px] py-3 px-3 h-[250px]  border-blue-600"
      {...getRootProps()}
    >
      <div className=" w-full h-full relative bg-black py-3   cursor-pointer">
        <img
          className=" w-full h-full object-contain"
          src={"src/assets/icons/file-upload.svg"}
        />
        <div className=" w-full justify-center absolute bottom-0   flex text-slate-500 ">
          <input
            className=" "
            {...getInputProps()}
            type={""}
          />
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
