import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import googleLoggin from '../../assets/media/1x/btn_google_signin_light_normal_web.png'
import './login.styles.scss';

import { firebaseApp } from '../../utils/firebaseUtils/firebaseUtils';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updatePhoneNumber,  } from "firebase/auth";

import { updateUserEmail, updateUserPassword, updateUserPasswordCheck, updateUserFirstName, updateUserLastName, updateUserPhoneNumber, updateType, updateLoginPortalStatus, updateLoggedinStatus } from '../../redux/portal/signinPortal'; 

import Button from '../button/button.component'

const Login = () => {
    const dispatch = useDispatch();
    const { firstName, lastName, email, phoneNumber } = useSelector(store => store.activeUser)

    const { isLoggedIn, type, userFirstName, userLastName, userPhoneNumber, userEmail, userPassword, userPasswordCheck } = useSelector(state => state.loggin);

    const auth = getAuth(firebaseApp);

    const createNewUser = () => {
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then(userCredential => {
                const user = userCredential.user;
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`Error Code ${errorCode}: \nError Message: ${errorMessage}`)
            });
        updateProfile(auth.currentUser, {
            displayName: `${userFirstName} ${userLastName}`
        })
    }

    const updateUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: `${userFirstName} ${userLastName}`
        })
    }

    const signInToApp = () => {
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then(userCredential => {
                const user = userCredential
                console.log(user);
            })
            .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error Code ${errorCode}: \nError Message: ${errorMessage}`)
            })
    }

    const signOutOfApp = () => {
        signOut(auth).then(() => {
        }).catch(error => {

        })
    }

    return (
        <>  <section className='backdrop' onClick={() => {dispatch(updateLoginPortalStatus(false))}} />
            <section className='loggin' >
                {
                    !isLoggedIn && type==="loggin" ? (
                        <>
                            <h2 >Log In</h2>
                            <section className='loggin__fields' >
                                <label className='loggin__fields__label' for="email" >E-mail</label>
                                <input className='loggin__fields__field' type="text" id='email' onChange={e => dispatch(updateUserEmail(e.currentTarget.value))} />
                            </section>
                            <section className='loggin__fields' >
                                <label className='loggin__fields__label' for="email" >Password</label>
                                <input className='loggin__fields__field' type="password" id='email' onChange={e => dispatch(updateUserPassword(e.currentTarget.value))} />
                            </section>
                            <Button customStyle={"logginButton"} onClick={signInToApp} >Log In</Button>
                            <section className='loggin__options' >
                                {/* <img src={googleLoggin} /> */}
                            </section>
                            <p className='loggin__signinText' >Don't have an account yet? <span className='loggin__signinText__link' onClick={e => dispatch(updateType("signin"))} >Sign In</span></p>
                        </>
                    ) : !isLoggedIn && type==="signin" ?
                    <>
                        <h2 >Sing In</h2>
                            <section className='loggin__fields' >
                                <label className='loggin__fields__label' for="firstName" >First Name:</label>
                                <input className='loggin__fields__field' type="text" id='firstName' onChange={e => dispatch(updateUserFirstName(e.currentTarget.value))} />
                            </section>
                            <section className='loggin__fields' >
                                <label className='loggin__fields__label' for="lastName" >Last Name:</label>
                                <input className='loggin__fields__field' type="text" id='lastName' onChange={e => dispatch(updateUserLastName(e.currentTarget.value))} />
                            </section>
                            <section className='loggin__fields' >
                                <label className='loggin__fields__label' for="phoneNumber" >Phone Number:</label>
                                <input className='loggin__fields__field' type="text" id='phoneNumber' onChange={e => dispatch(updateUserPhoneNumber(e.currentTarget.value))} />
                            </section>
                            <section className='loggin__fields' >
                                <label className='loggin__fields__label' for="email" >E-mail</label>
                                <input className='loggin__fields__field' type="text" id='email' onChange={e => dispatch(updateUserEmail(e.currentTarget.value))} />
                            </section>
                            <section className='loggin__fields' >
                                <label className='loggin__fields__label' for="password" >Create Password</label>
                                <input className='loggin__fields__field' type="password" id='password' onChange={e => dispatch(updateUserPassword(e.currentTarget.value))} />
                            </section>
                            <section className='loggin__fields' >
                                <label className='loggin__fields__label' for="checkPassword" >Re-enter Password</label>
                                <input className='loggin__fields__field' type="password" id='checkPassword' onChange={e => dispatch(updateUserPasswordCheck(e.currentTarget.value))} />
                            </section>
                            <Button customStyle={"logginButton"} onClick={createNewUser} >Sign In</Button>
                            <p className='loggin__signinText' >Already have an account? <span className='loggin__signinText__link' onClick={e => dispatch(updateType("loggin"))} >Log In</span></p>

                    </> :
                    <>
                        <h2 >Welcome!</h2>
                        <p className='loggin__fields' >{firstName}</p>
                        <p className='loggin__fields' >{lastName}</p>
                        <p className='loggin__fields' >{email}</p>
                        <p className='loggin__fields' >{phoneNumber}</p>
                        <Button customStyle={"logginButton signOut"} onClick={signOutOfApp} >Sign Out</Button>
                    </>
                }
            </section>
        </>
    );
};

export default Login;