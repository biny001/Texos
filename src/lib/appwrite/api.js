import {
  account,
  Apiavatars,
  database,
  Databaseid,
  userid,
  storage,
  mediaid,
  postid,
} from "./config";
import { ID, Query } from "appwrite";
import { v4 as uuidv4 } from "uuid";

//create user;
export async function creatUser(value) {
  try {
    // console.log("here is the values", value);
    const userInfo = await account.create(
      ID.unique(),
      value?.email,
      value?.password,
      value?.name
    );
    const AvatarImg = Apiavatars.getInitials(value?.name);
    if (!userInfo) throw new Error();

    const data = {
      accountId: userInfo?.$id,
      name: userInfo?.name,
      email: userInfo?.email,
      password: value?.password,
      username: value?.username,
      avatarUrl: AvatarImg?.href,
    };

    // console.log(data);
    // console.log(AvatarImg?.href);

    //write user to database
    const user = await database.createDocument(
      Databaseid,
      userid,
      ID.unique(),
      {
        ...data,
      }
    );

    if (!user) throw new Error("Error writing to database");

    // console.log(user);

    return user;
  } catch (err) {
    console.error(err);
  }
}

//login user
export async function loginUser(value) {
  try {
    const userInfo = await account.createEmailSession(
      value?.email,
      value?.password
    );

    if (!userInfo) throw new Error();

    return userInfo;
  } catch (err) {
    console.error(err);
  }
}

//get user avatar

export async function avatarInitials(name) {
  try {
    console.log(name);
    const avatarInitial = Apiavatars.getInitials(name);
    // console.log(avatarInitial);

    if (!avatarInitial) throw new Error("error getting avatar");
    // console.log(avatarInitial.href);
    return avatarInitial?.href;
  } catch (err) {
    console.error(err);
  }
}

//get current session;

export async function getActiveSession() {
  try {
    const activeUser = await account.get();

    // console.log(activeUser);
    return activeUser;
  } catch (err) {
    console.log(err);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getActiveSession();

    if (!currentAccount) throw new Error("error getting currentAccount");

    // console.log(currentAccount, currentAccount.$id);
    const currentUser = await database.listDocuments(Databaseid, userid, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    // console.log(currentUser);

    if (!currentUser) throw new Error("error getting  current user");

    return currentUser.documents[0];
  } catch (err) {
    console.log(err);
  }
}

export async function signOutLoggedInUser() {
  try {
    const data = await account.deleteSession("current");

    // console.log(data);
    // if (data) console.log("logged out");

    return data;
  } catch (error) {
    console.log(error);
  }
}

//upload to bucket
export async function uploadMedia(file) {
  try {
    const data = await storage.createFile(mediaid, ID.unique(), file);

    if (!data) throw new Error("Error uploading file");

    const metaData = storage.getFilePreview(mediaid, data.$id);
    // console.log(metaData);
    return metaData;
  } catch (err) {
    console.log(err);
  }
}

//upload to postDb
// console.log("random id", uuidv4());

export async function createNewPost(value) {
  try {
    const postinfo = { ...value, imageId: uuidv4() };
    // console.log(postinfo.imageUrl);
    const post = await database.createDocument(
      Databaseid,
      postid,
      ID.unique(),
      postinfo
    );

    if (!post) throw new Error();
    console.log("here are the values", post);
    return post;
  } catch (err) {
    console.log(err);
  }
}

export async function getPosts() {
  try {
    const { documents } = await database.listDocuments(Databaseid, postid, [
      Query.orderDesc("$createdAt"),
    ]);
    // console.log(post);

    if (!documents) throw new Error("Error getting posts");
    return documents;
  } catch (err) {
    console.log(err);
  }
}

export async function likePost(data) {
  console.log(data);
  try {
    // console.log(id, accountid);
    const post = await database.getDocument(Databaseid, postid, data.postId);
    const user = await database.getDocument(Databaseid, userid, data.userId);

    console.log(post, user);
    // Check if the user has already liked the post
    const likedIndex = post.userlike?.indexOf(data.userId);
    if (likedIndex === -1) {
      // User hasn't liked the post, so add the like
      post.userlike.push(data.userId);
      await database.updateDocument(Databaseid, postid, data.postId, {
        ...post,
      });

      // Update user's likedpost array
      user.likedPost.push(postid);
      await database.updateDocument(Databaseid, userid, data.userId, {
        ...user,
      });

      return true; // Indicate that post was liked
    } else {
      // User has already liked the post, so remove the like
      post.userlike.splice(likedIndex, 1);
      await database.updateDocument(Databaseid, postid, data.postId, {
        ...post,
      });

      // Update user's likedpost array
      const likedPostIndex = user.likedPost?.indexOf(data.postId);
      if (likedPostIndex !== -1) {
        user.likedPost.splice(likedPostIndex, 1);
        await database.updateDocument(Databaseid, userid, data.userId, {
          ...user,
        });
      }

      return false; // Indicate that post was unliked
    }
  } catch (error) {
    console.error("Error liking post:", error);
    throw new Error("Error liking post");
  }
}
