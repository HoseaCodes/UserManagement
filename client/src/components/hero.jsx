import React from 'react';
import heroBackground from '../assets/herobackground.jpeg'
import { SIGNUP } from "../navigation/constants";

const Hero = () => {
    return (
        <>
            <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={heroBackground} alt="waves"  class="bd-placeholder-img" width="100%" height="100%"/>
                        <div class="container">
                            <div class="carousel-caption text-start">
                                <h1>Manage New A User</h1>
                                <p>Create and manage a new user profile account.</p>
                                <p><a class="btn btn-lg btn-primary" href={SIGNUP}>Sign up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
                </button> */}
            </div>
        </>
    )
}

export default Hero;