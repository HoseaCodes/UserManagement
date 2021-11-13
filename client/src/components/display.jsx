import React, {useEffect, useState} from 'react';
import User from './user';
import './display.css';
import UnregisteredUsers from './unregistedUser';
import SkeletonCard from "./skeleton/skeletonCard";

const Display = () => {
    const [loading, setLoading] = useState(false);

    // Load this effect on mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
        setLoading(false);
    }, 5000);
    // Cancel the timer while unmounting
    return () => clearTimeout(timer);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  
    return (
        <>
            <div class="container marketing">
                <h2 className="text-center">Registered Users</h2>
                <hr class="featurette-divider"/>
                <div class="row display-row">
                {loading && (   
                    <div class="row display-row">         
                        <SkeletonCard/>
                        <SkeletonCard/>
                        <SkeletonCard/>
                    </div>
                )}
                {!loading && (
                    <User/> 
                    )}
                </div>
                <hr class="featurette-divider"/>
                <div class="row ">
                    <p className="display-row"><a class="btn btn-secondary" href="/create">Add Demo Profile &raquo;</a></p>
                </div>
                <hr class="featurette-divider"/>
                <h2 className="text-center">Unregistered *Demo* Users</h2>
                <div class="row display-row">
                    {loading && (   
                        <div class="row display-row">         
                            <SkeletonCard/>
                        </div>
                    )}
                    {!loading && (
                        <UnregisteredUsers/>
                    )}
                </div>
                <hr class="featurette-divider"/>
            </div>

        </>
    )
}

export default Display;