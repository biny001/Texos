import { AuthContext } from "@/Context/AuthProvider";
import { account } from "@/lib/appwrite/config";
import { useCreateUser } from "@/lib/react-query/queryAndMutations";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid }, // Destructure isValid from formState
  } = useForm();

  const { checkAuthUser } = useContext(AuthContext);
  const { mutateAsync: createUser, isPending } = useCreateUser();

  async function onSubmit(values) {
    const userData = await createUser(values);
    if (userData) {
      checkAuthUser();
    }
  }

  return (
    <div className=" flex flex-col gap-4  border border-blue-900 py-10 px-20 rounded-lg  shadow-lg shadow-blue-300/30">
      <div className="flex flex-col items-center gap-2">
        <img
          className="  w-54"
          src="src\assets\images\logo.svg"
        />
        <h3 className=" text-xs">join our growing community</h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" min-w-52 space-y-3 "
      >
        <div className="label-div">
          <label htmlFor="name">name </label>
          <input
            {...register("name", {
              required: "name is required",
            })}
            id="name"
            className=" bg-slate-800/40 outline-none"
          ></input>
          {errors?.name && (
            <p className=" text-red-600 text-sm">{errors?.name?.message}</p>
          )}
        </div>
        <div className="label-div">
          <label htmlFor="username">username </label>
          <input
            {...register("username", {
              required: "username is required",
            })}
            id="username"
            className=" bg-slate-800/40 outline-none"
          ></input>
          {errors?.username && (
            <p className=" text-red-600 text-sm">{errors?.username?.message}</p>
          )}
        </div>
        <div className="label-div">
          <label htmlFor="email">email </label>
          <input
            type="email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            id="email"
            className=" bg-slate-800/40 outline-none"
          ></input>
          {errors?.email && (
            <p className=" text-red-600 text-sm">{errors?.email?.message}</p>
          )}
        </div>
        <div className="label-div">
          <label htmlFor="password">password </label>
          <input
            type="password"
            {...register("password", {
              required: "password is required",
              minLength: 6,
            })}
            id="password"
            className=" bg-slate-800/40 outline-none"
          ></input>
          {errors?.password && (
            <p className=" text-red-600 text-sm">{errors?.password?.message}</p>
          )}
        </div>
        <button
          disabled={!isValid || isPending} // Disable button if form is not valid
          className={` text-sm font-extralight  bg-blue-950   text-stone-300 py-1 px-2 rounded-lg ${
            !isValid ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isPending ? "loading..." : "sign up"}
        </button>
      </form>
      <div>
        <p className=" text-xs">
          Already have an account?{" "}
          <Link
            className="  text-blue-900 text-sm  underline "
            to={"/sign-in"}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
