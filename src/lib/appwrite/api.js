import { account, avatar, database, Databaseid, userid } from "./config";
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

    if (!userInfo) throw new Error();

    await account.createEmailPasswordSession(value?.email, value?.password);

    const data = {
      accountId: userInfo?.$id,
      name: userInfo?.name,
      email: userInfo?.email,
      password: value?.password,
      username: value?.username,
    };
    //write user to database
    const user = await database.createDocument(
      Databaseid,
      userid,
      ID.unique(),
      data
    );

    if (!user) throw new Error("Error writing to database");

    const AvatarImg = await avatarInitials();

    const userData = {
      ...user,
      avatarUrl: AvatarImg,
    };

    return userData;
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
    const AvatarImg = await avatarInitials();

    console.log(userInfo);

    const userData = {
      ...userInfo,
      avatarUrl: AvatarImg,
    };
    return userData;
  } catch (err) {
    console.error(err);
  }
}

//get user avatar

export async function avatarInitials() {
  try {
    const avatarInitial = avatar.getInitials();
    console.log(avatarInitial);

    if (!avatarInitial) throw new Error("error getting avatar");
    return avatarInitial;
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
