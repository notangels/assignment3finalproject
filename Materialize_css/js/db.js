import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {getFirestore, collection, addDoc, query, where, getDocs, doc, setDoc, deleteDoc, enableIndexedDbPersistence} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4GH3T1xVgyVRfB5EH9-RWyESjIvttWUI",
    authDomain: "moss-thorns-gallery-of-art.firebaseapp.com",
    projectId: "moss-thorns-gallery-of-art",
    storageBucket: "moss-thorns-gallery-of-art.appspot.com",
    messagingSenderId: "659601768265",
    appId: "1:659601768265:web:d164ba24ed114f650aa498",
    measurementId: "G-86H5YNN87M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to add a comment
async function addComment(user, postId, commentText) {
  try {
    // Check if the user is logged in
    if (user) {
      const commentsCollection = collection(db, "comments");
      const commentData = {
        userId: user.uid,
        postId,
        text: commentText,
        timestamp: new Date()
      };
      const newCommentRef = await addDoc(commentsCollection, commentData);
      console.log("Comment added with ID: ", newCommentRef.id);
    } else {
      console.log("User not logged in.");
    }
  } catch (error) {
    console.error("Error adding comment: ", error);
  }
}

// Function to get comments for a specific post
async function getCommentsForPost(postId) {
  try {
    const commentsCollection = collection(db, "comments");
    const q = query(commentsCollection, where("postId", "==", postId));
    const querySnapshot = await getDocs(q);
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return comments;
  } catch (error) {
    console.error("Error getting comments: ", error);
    return [];
  }
}

// Function to update a comment
async function updateComment(user, commentId, newText) {
  try {
    // Check if the user is logged in
    if (user) {
      const commentRef = doc(db, "comments", commentId);
      const commentDoc = await getDoc(commentRef);

      // Check if the comment exists
      if (commentDoc.exists()) {
        // Check if the user owns the comment
        if (commentDoc.data().userId === user.uid) {
          await setDoc(commentRef, {
            text: newText
          }, {
            merge: true
          });
          console.log("Comment updated successfully");
        } else {
          console.log("User does not own the comment.");
        }
      } else {
        console.log("Comment not found.");
      }
    } else {
      console.log("User not logged in.");
    }
  } catch (error) {
    console.error("Error updating comment: ", error);
  }
}

// Function to delete a comment
async function deleteComment(user, commentId) {
  try {
    // Check if the user is logged in
    if (user) {
      const commentRef = doc(db, "comments", commentId);
      const commentDoc = await getDoc(commentRef);

      // Check if the comment exists
      if (commentDoc.exists()) {
        // Check if the user owns the comment
        if (commentDoc.data().userId === user.uid) {
          await deleteDoc(commentRef);
          console.log("Comment deleted successfully");
        } else {
          console.log("User does not own the comment.");
        }
      } else {
        console.log("Comment not found.");
      }
    } else {
      console.log("User not logged in.");
    }
  } catch (error) {
    console.error("Error deleting comment: ", error);
  }
}

export {
  addComment,
  getCommentsForPost,
  updateComment,
  deleteComment
};


enableIndexedDbPersistence(db)
    .then(() => console.log("Enabled offline persistence"))
    .catch((error) => {
      if (error.code == "failed-precondition") {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        console.log("Persistence failed");
      } else if (error.code == "unimplemented") {
        // The current browser does not support all of the
        // features required to enable persistence
        console.log("[Persistence is not valid");
      }
});


