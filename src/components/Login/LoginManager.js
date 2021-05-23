import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';



export const initializeLoginFramework = () => {
// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }


}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        return signedInUser;
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }



 export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

   return firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        user.success = true;
        return user;
        var accessToken = credential.accessToken;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }


  export const handleGithubSignIn = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {

        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        user.success = true;
        return user;
        console.log("Github USer Info : ", user);
        
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, errorCode, email, credential);
      });
  }


 export  const handleSignOut = () => {
   return firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
        return signedOutUser;
      })
      .catch(err => {
        console.log(err);
      })
  }


  export const createUserWithEmailAndPassword = (name, email, password) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const newUserInfo = userCredential.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
    //   setUser(newUserInfo);
    updateUserName(name);
    return newUserInfo;
      
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.success = false;
      newUserInfo.error = error.message;
    //   setUser(newUserInfo);
      // ..
    });
  }


  export const signInWithEmailAndPassword = (email, password) => {
   return firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userCredential) => {
      const newUserInfo = userCredential.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
   
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.success = false;
      newUserInfo.error = error.message;
    //   setUser(newUserInfo);
    return newUserInfo;
    });
  }


  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function () {

    }).catch(function (error) {
      console.log(error);
    });
  }