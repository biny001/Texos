import { AuthContext } from "@/Context/AuthProvider";
import { account } from "@/lib/appwrite/config";
import {
  useCreateUser,
  useLoginUser,
} from "@/lib/react-query/queryAndMutations";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid }, // Destructure isValid from formState
  } = useForm();

  const { checkAuthUser, loading, setAvatarUrl } = useContext(AuthContext);
  const { mutateAsync: loginUser, isPending } = useLoginUser();

  async function onSubmit(values) {
    const userData = await loginUser(values);
    if (userData) {
      setAvatarUrl(userData?.avatarUrl);

      checkAuthUser();
    }
  }

  return (
    <div className=" flex flex-col gap-4  border border-blue-900 py-10 px-20 rounded-lg  shadow-lg shadow-blue-300/30">
      <div className="flex flex-col items-center gap-2">
        <img
          className="  w-54"
          src={"/logo.svg"}
        />
        <h3 className=" text-xs">Welcome back</h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" min-w-52 space-y-3 "
      >
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
          disabled={!isValid || isPending || loading} // Disable button if form is not valid
          className={` text-sm font-extralight  bg-blue-950   text-stone-300 py-1 px-2 rounded-lg ${
            !isValid ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isPending || loading ? "loading..." : "login"}
        </button>
      </form>
      <div>
        <p className=" text-xs">
          Don't have an account?{" "}
          <Link
            className="  text-blue-900 text-sm  underline "
            to={"/sign-up"}
          >
            Sign-Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
