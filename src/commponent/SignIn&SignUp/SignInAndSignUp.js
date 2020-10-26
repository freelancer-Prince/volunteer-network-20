import React, { useState, useEffect } from 'react';
import './SignInAndSignUp.css';
import { Link } from 'react-router-dom';
import log from '../../images/undraw_maker_launch_crhe.svg'
import register from '../../images/undraw_press_play_bx2d.svg'
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation} from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginAndSignupManager';

const SignInAndSignUp = () => {


const [classNames, setClassName] = useState(``);
const [slider, setSlider] = useState(false);
useEffect(()=>{
    setClassName(`${slider ? "sign-up-mode" : "" }`)
}, [slider]);




const [newUser, setNewUser] = useState(false);
const [user, setUser] = useState({
  isSignedIn: false,
  name: '',
  email: '',
  password: '',
  number: '',
  photo: ''
});

initializeLoginFramework();

const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };

const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
}

const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })

}

 const handleResponse = (res, redirect) =>{
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
      history.replace(from);
  }
}

const handleBlur = (e) => {
  let isFieldValid = true;
  if(e.target.name === 'email'){
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
  }
  if(e.target.name === 'password'){
    const isPasswordValid = e.target.value.length > 6;
    const passwordHasNumber =  /\d{1}/.test(e.target.value);
    isFieldValid = isPasswordValid && passwordHasNumber;
  }
  if(isFieldValid){
    const newUserInfo = {...user};
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  }
}
const handleSubmit = (e) => {
  if(newUser && user.email && user.password){
    createUserWithEmailAndPassword(user.name, user.email, user.password, user.number)
    .then(res => {
      handleResponse(res, true);
    })
  }

  if(!newUser && user.email && user.password){
    signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      handleResponse(res, true);
      history.replace(from)
    })
  }
  e.preventDefault();
}


    return (
        <>
            <div id="container-wrap" className={classNames}>
                <div className="forms-container">
                      <div className="signin-signup" action="" onSubmit={handleSubmit}>
                        <form  action="" className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i class="fas fa-envelope"></i>
                                <input type="email" name="email" onBlur={handleBlur}  placeholder="Email"required/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password"  name="password" onBlur={handleBlur}  placeholder="Password"/>
                            </div>
                            <input type="submit" value="Login" id="btn"/>
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <Link onClick={googleSignIn} className="social-icon">
                                <i className="fab fa-google"></i>
                                </Link>
                                <Link onClick={fbSignIn} className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                                </Link>
                            </div>
                        </form>

                        <form action="" className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input name="name" type="text" onBlur={handleBlur} placeholder="Username" required/>
                            </div>
                            <div className="input-field">
                                <i class="fas fa-envelope"></i>
                                <input type="email" name="email" onBlur={handleBlur}  placeholder="Email"required/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
                            </div>
                            <input value="Sign Up"  type="submit" onClick={newUser} id="btn"/>
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <Link onClick={googleSignIn} className="social-icon">
                                <i className="fab fa-google"></i>
                                </Link>
                                <Link   onClick={fbSignIn} className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                                </Link>
                            </div>
                        </form>
                        </div>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque tenetur fugit dicta, dolorum libero quas?</p>
                             <Button onBlur={() => setNewUser(!newUser)} onClick={() => setSlider(slider => !slider)} className="btn transparent" id="sign-up-btn"> Sign up</Button>
                        </div>
                        <img src={log} className="image" alt="img"/>
                    </div>

                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque tenetur fugit dicta, dolorum libero quas?</p>
                            <Button onBlur={() => setNewUser(!newUser)} onClick={() => setSlider(slider => !slider)}  className="btn transparent" id="sign-in-btn">Sign in</Button>
                        </div>
                        <img src={register} className="image" alt="img"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignInAndSignUp;