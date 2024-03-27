import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  avatarInitials,
  createNewPost,
  creatUser,
  getActiveSession,
  loginUser,
  signOutLoggedInUser,
  uploadMedia,
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

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (file) => uploadMedia(file),
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (value) => createNewPost(value),
  });
};

//Queryfunction

export const useGetInitalAvatar = () => {
  return useMutation({
    mutationFn: (name) => avatarInitials(name),
  });
};
