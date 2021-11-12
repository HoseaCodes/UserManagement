import React from 'react';
import User from './user';
import './display.css';
import UnregisteredUsers from './unregistedUser';

const Display = () => {
    return (
        <>
            <div class="container marketing">
                <h2 className="text-center">Registered Users</h2>
                <hr class="featurette-divider"/>
                <div class="row display-row">
                    <User/> 
                <hr class="featurette-divider"/>
                </div>
                <h2 className="text-center">Unregistered *Demo* Users</h2>
                <hr class="featurette-divider"/>
                <div class="row display-row">
                    <UnregisteredUsers/>
                </div>
                <hr class="featurette-divider"/>
                <div class="row ">
                    <p className="display-row"><a class="btn btn-secondary" href="/create">Add Demo Profile &raquo;</a></p>
                </div>
                <hr class="featurette-divider"/>
            </div>

        </>
    )
}

export default Display;