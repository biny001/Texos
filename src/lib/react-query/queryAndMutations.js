import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  avatarInitials,
  creatUser,
  getActiveSession,
  loginUser,
  signOutLoggedInUser,
} from "../appwrite/api";
import toast from "react-hot-toast";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value) => creatUser(value),
    onSuccess: () => {
      console.log("hello");
    },

    // onSuccess: () => toast.success("user Created successfully"),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (value) => loginUser(value),

    // onSuccess: () => toast.success("user Created successfully"),
  });
};

export const useGetActiveUser = () => {
  return useMutation({
    mutationFn: getActiveSession,
    // onSuccess: () => toast.success("user Created successfully"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avatars"] });
    },
  });
};

export const useUserSignOut = () => {
  return useMutation({
    mutationFn: signOutLoggedInUser,
  });
};

//Queryfunction

export const useGetInitalAvatar = () => {
  return useMutation({
    mutationFn: (name) => avatarInitials(name),
  });
};
