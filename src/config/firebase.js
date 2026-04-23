import serviceAccount from "./credentials/firebase.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// import admin from "firebase-admin";

// /**
//  * Initialize Firebase Admin SDK.
//  * Make sure to provide the service account JSON or use GOOGLE_APPLICATION_CREDENTIALS environment variable.
//  */
// if (!admin.apps.length) {
//   try {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//       }),
//     });
//     console.log("Firebase Admin initialized successfully");
//   } catch (error) {
//     console.error("Firebase Admin initialization error:", error.message);
//   }
// }

// export default admin;
