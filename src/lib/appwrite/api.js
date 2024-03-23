import { account } from "./config";
import { ID } from "appwrite";

//create user;
export async function creatUser(value) {
  try {
    console.log("here is the values", value);
    const userInfo = await account.create(
      ID.unique(),
      value?.email,
      value?.password,
      value?.name
    );

    console.log(userInfo);
    if (!userInfo) throw new Error();

    await account.createEmailPasswordSession(value?.email, value?.password);

    return userInfo;
  } catch (err) {
    console.error(err);
  }
}

//login user
export async function loginUser(value) {
  try {
    const userInfo = await account.createEmailPasswordSession(
      value?.email,
      value?.password
    );

    if (!userInfo) throw new Error();

    console.log(userInfo);
    return userInfo;
  } catch (err) {
    console.error(err);
  }
}

//get current session;

export async function getActiveSession() {
  try {
    const activeUser = await account.get();

    if (!activeUser) throw new Error();

    console.log(activeUser);
    return activeUser;
  } catch (err) {
    console.log(err);
  }
}

export async function signOutLoggedInUser() {
  try {
    await account.deleteSession("current");
    console.log("logged out");
  } catch (error) {
    console.log(error);
  }
}
