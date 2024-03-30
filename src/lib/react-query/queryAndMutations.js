import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  avatarInitials,
  createNewPost,
  creatUser,
  getActiveSession,
  getPosts,
  likePost,
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
  const queryClient = useQueryClient();
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value) => createNewPost(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

//Queryfunction

export const useGetInitalAvatar = () => {
  return useMutation({
    mutationFn: (name) => avatarInitials(name),
  });
};

export const useGetPost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => likePost(data),
    onSuccess: () => {
      // Invalidate cache or perform any actions after mutation success
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
