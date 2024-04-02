import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TbCameraPlus } from "react-icons/tb";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

const ProfileSetupModal = () => {
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const { register, handleSubmit } = useForm();

  const handleInput = (values) => {
    console.log(values);
  };

  const onDrop = (acceptedFiles) => {
    // Do something with the uploaded file (image)
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handleNextStep = () => {
    if (step >= 2) {
      // Save user profile data
      // Close modal
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <Dialog>
      <DialogTrigger className="border rounded-md py-1 px-2  hover:bg-zinc-700  transition-colors duration-200 ease-in-out">
        Open
      </DialogTrigger>
      <form onSubmit={handleSubmit(handleInput)}>
        <DialogContent className="h-[500px]">
          <DialogHeader>
            {/* Conditionally render description based on the step */}
            {step === 1 && (
              <>
                <DialogTitle>Pick a profile Picture</DialogTitle>
                <DialogDescription>
                  Have a favorite selfie Upload it now
                </DialogDescription>
              </>
            )}
            {step === 2 && (
              <>
                <DialogTitle>Describe yourself</DialogTitle>
                <DialogDescription>
                  Whats makes you special? Dont't think too hard, just have fun
                  with it.
                </DialogDescription>
              </>
            )}
            {/* Add more descriptions for additional steps */}
          </DialogHeader>

          {/* Conditionally render content based on the step */}
          {step === 1 && (
            <div className="flex items-center justify-center h-96">
              <div
                className="absolute top-28 cursor-pointer"
                {...getRootProps()}
                onClick={open}
              >
                <img
                  className="size-24 object-cover object-center rounded-full"
                  src={
                    profileImage
                      ? profileImage
                      : "public/icons/profile-placeholder.svg"
                  }
                  alt={
                    profileImage ? "Uploaded Profile" : "Profile Placeholder"
                  }
                />
                <div className="absolute right-0 bottom-1">
                  <input
                    {...register("image")}
                    {...getInputProps()}
                  />
                  <TbCameraPlus size={"24px"} />
                </div>
              </div>
              <div className=" w-48 absolute bottom-8 ">
                <Button
                  variant="outline "
                  className=" rounded-sm w-full  bg-zinc-900 hover:bg-black"
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex items-center justify-center h-96">
              <div className=" w-full px-2  space-y-1 h-full">
                <div>
                  <Label className="text-xs   pl-2 text-zinc-400">
                    username
                  </Label>
                  <Input
                    {...register("username")}
                    className="  outline-zinc-300 h-12 text-zinc-400"
                  ></Input>
                </div>
                <Label className="text-xs   pl-2 text-zinc-400">your bio</Label>
                <Input
                  {...register("bio")}
                  className="  outline-zinc-300 h-12 text-zinc-400"
                ></Input>
              </div>
              <div className=" w-80 absolute bottom-8  ">
                <div className=" flex w-full  justify-between gap-4">
                  <Button
                    variant="outline "
                    className=" rounded-sm   bg-white text-zinc-950 hover:bg-black hover:text-white"
                    onClick={handlePreviousStep}
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    variant="outline "
                    className=" rounded-sm   bg-zinc-900 hover:bg-black"
                    onClick={handleNextStep}
                  >
                    Setup Profile
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Add more steps as needed */}
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ProfileSetupModal;
