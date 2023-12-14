import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4GH3T1xVgyVRfB5EH9-RWyESjIvttWUI",
    authDomain: "moss-thorns-gallery-of-art.firebaseapp.com",
    projectId: "moss-thorns-gallery-of-art",
    storageBucket: "moss-thorns-gallery-of-art.appspot.com",
    messagingSenderId: "659601768265",
    appId: "1:659601768265:web:d164ba24ed114f650aa498",
    measurementId: "G-86H5YNN87M"
  };

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BO9i9MnDs-XIC1k8pvAf8lMDsZwBdfee3Rw9xVG4qp-aOGvfyRlsM8eKahG4OVRKUnHCKjpRE5Xb0FjlDiPqfG0",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();