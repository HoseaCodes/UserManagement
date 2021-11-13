import React, { useContext, useEffect } from 'react';
import './profile.css';
import { GlobalContext } from '../../context/globalState';
import icon from '../../assets/usericon.jpeg';

const Profile = () => {
    const { user, token, getUser, getRefreshToken } = useContext(GlobalContext)

    useEffect(() => {
        
        async function render() {
            await getRefreshToken()
        }
        
        render();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if (token !== null) {
            getUser(token);
        }
    }, [token]);



    console.log(user, 'user')

    const { images, name, bio, email } = user;

    if (user) {
        return (
            <>
                <div class="container" style={{padding: "80px"}}>
                    <div class="row">
                        <div class="col-lg-5 col-md-6">
                            <div class="mb-2">
                                <img class="w-100" src={user.images || icon} alt={name}/>
                            </div>
                            <div class="mb-2 d-flex">
                                <h4 class="font-weight-normal">{name}</h4>
                            </div>
                            <div class="mb-2">
                                <ul class="list-unstyled">
                                    <li class="media">
                                    <span class="w-25 text-black font-weight-normal">Email: </span>
                                    <label class="media-body">{email}</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-6 pl-xl-3">
                            <h3 class="dark-color">Bio</h3>
                            {/* <h4 class="theme-color">UI / UX Designer &amp; Web Developer</h4> */}
                            <p>{bio}</p>  
                            <div class="btn-bar">
                                <a class="px-btn theme" href={`/edit/${user._id}`}>Edit Profile</a>
                                <a class="px-btn theme-t" href="/">Go Back</a>
                            </div>                      
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h2>You Must be logged in to see a user profile</h2>
            </>
        )
    }
} 

export default Profile;