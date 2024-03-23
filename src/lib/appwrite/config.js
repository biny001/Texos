import { Account, Avatars, Client, Databases } from "appwrite";

export const projectid = import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const accountid = import.meta.env.VITE_APPWRITE_ACCOUNT_ID;
export const Databaseid = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const postid = import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID;
export const userid = import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID;
export const avatarid = import.meta.env.VITE_APPWRITE_AVATAR_STORAGE_ID;
export const savedid = import.meta.env.VITE_APPWRITE_SAVED_COLLECTION_ID;
export const mediaid = import.meta.env.VITE_APPWRITE_MEDIA_STORAGE_ID;

console.log(projectid);
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectid);

export const account = new Account(client);
export const database = new Databases(client);
export const avatar = new Avatars(client);
