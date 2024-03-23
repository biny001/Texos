import { useMutation } from "@tanstack/react-query";
import { creatUser, getActiveSession } from "../appwrite/api";
import toast from "react-hot-toast";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (value) => creatUser(value),
    // onSuccess: () => toast.success("user Created successfully"),
  });
};

export const useGetActiveUser = () => {
  return useMutation({
    mutationFn: getActiveSession,
    // onSuccess: () => toast.success("user Created successfully"),
  });
};
