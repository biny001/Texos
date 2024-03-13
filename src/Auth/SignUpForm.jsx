import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
  confirmPassword: z
    .string({
      required_error: "Please confirm your password.",
    })
    .refine((value, data) => value !== data?.password),
  avatar: z.any(),
});

export default function SignUpForm() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit({ confirmPassword, ...values }) {
    console.log(values);
  }
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      form.setValue("avatar", acceptedFiles[0]); // Corrected spelling of acceptedFiles
    },
    [form]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1    w-60 sm:w-64 md:w-72 lg:w-80  xl:w-96 2xl:w-96"
      >
        {/* Username field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Avatar field */}
        <FormItem className="flex flex-col w-full text-xs  ">
          <FormLabel>Avatar</FormLabel>
          <div
            {...getRootProps()}
            className="flex  w-full items-center  justify-center   h-20 border-dashed border-2 border-gray-800 rounded-lg cursor-pointer"
          >
            <div className=" flex flex-col  items-center gap-3 justify-center ">
              <img
                width={"36px"}
                src="src\assets\icons\gallery-add.svg"
              />
              <span>Drag or click to select avatar</span>
            </div>
            <input {...getInputProps()} />
          </div>
        </FormItem>

        <Button
          className="w-full   "
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
