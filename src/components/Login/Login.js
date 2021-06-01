// import logo from './logo.svg';
import { useContext, useState } from 'react';


import './Login.css';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGithubSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

const [loggedInUser, setLoggedInUser] = useContext(userContext);
const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };


const googleSignIn = () => {
 handleGoogleSignIn()
 .then(res => {
 handleResponse(res, true);
 })
}


const facebookSignIn = () => {
  handleFbSignIn()
  .then (res => {
   handleResponse(res,true);
  })
}

const githubSignIn = () => {
  handleGithubSignIn()
  .then(res => {
    handleResponse(res, true);
  })
}


const signOut = () => {
  handleSignOut()
  .then(res => {
   handleResponse(res, false);
  })
}

const handleResponse = (res, redirect) => {
  setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
}


  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
   signInWithEmailAndPassword(user.email, user.password)
   .then(res => {
    handleResponse(res, true);
   })
    }

    e.preventDefault();
  }


  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isFieldValid);
    }

    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }


  


  return (
    <div className="App">
      {
        user?.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>

      }
      <br />
      <button onClick={facebookSignIn}>Sign in with facebook</button>
      <br />
      <button onClick={githubSignIn}>Sign in with GitHub</button>


      {
        user.isSignedIn &&
        <div>
           <h1 style={{color:'red'}}>Welcome, {user.name}</h1>
          <p> {user.email}</p>
          <img src={user.photo} alt="" />
         
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" value="" />
      <label htmlFor="newUser">New User Sign Up</label>


      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" required />}
        <br />
        <input type="name" name="email" onBlur={handleBlur} placeholder="Your Email Address" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : "Logged In"} Successfully</p>}
      
    </div>
  );
}

export default Login;
