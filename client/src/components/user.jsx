import React, { useContext, useEffect, useState } from 'react';
import icon from '../assets/usericon.jpeg'
import { GlobalContext } from '../context/globalState';

const User = () => {
    const { user, getAllUsers} = useContext(GlobalContext);
    const [allUsers, setAllUsers] = useState([{
        _id: "",
        name: "",
    }])
    const users = user[1];

    useEffect(() => {

        async function render() {
            const res = await getAllUsers()
            if (res) setAllUsers(res)
        }

        render();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (users) {
        return (
            <>
            {allUsers.map((user) => {
                return (
                <div class="col-lg-5 user-display">
                    <img src={user.images || icon} alt="name" class="bd-placeholder-img rounded-circle" width="140" height="140"/>
                    <div class="content">
                        <ul class="brands brands-inline hidden-xs">
                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                        </ul>   
                        <h2 class="name text-truncate">{user.name}</h2>
                        <ul class="brands brands-inline hidden-xs">
                            <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                            <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                        </ul>       
                    </div>
                    <p>{user.bio}</p>
                    <p><a class="btn btn-secondary" href={`/user/${user._id}`}>View Account &raquo;</a></p>
                    {/* <p><a class="btn btn-secondary" href={`/edit/${user._id}`}>Update profile &raquo;</a></p> */}
                </div>
            )
            })}
            </>
        )
    } else {
        return (
           <h2> Loading...</h2>
        )
    }
}

export default User;