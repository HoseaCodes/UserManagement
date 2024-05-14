import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/globalState';

const EditUser = () => {
    const state = useContext(GlobalContext)
	const { user, editProfile, getAllUsers } = useContext(GlobalContext);
	const token = state.token
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState(false);
	const [updateduser, setUser] = useState();

    const id = window.location.href.split('/')[window.location.href.split('/').length -1];
    console.log(user, 'user')
    
    useEffect(() => {
        
        async function render() {
            await getAllUsers();
        }
        
        render();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
        
    useEffect(() => {
        if (user[0]) {
            user[0].map((user)=> {
                if (user._id === id) {
                    setUser(user)
                    console.log(updateduser, 'update')
                }
            })
        } 
        if (user[1]) {
            console.log(user[1], '1')
            user[1].map((user)=> {
                if (user._id === id) {
                    setUser(user)
                    console.log(updateduser, 'update')
                }
            })
        }
        setImages(true);
    }, [user]);
    
    console.log(updateduser)
    const onChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...updateduser, [name]: value });
	};

    const handleSubmit = (e) => {
		e.preventDefault();
		try {
			// if (!images) return alert("No Image Upload")
			setUser({ ...updateduser, images })
			editProfile(updateduser._id);

		} catch (error) {
			alert(error.response.data.msg)
		}
	}

    const handleUpload = async e => {
        e.preventDefault()
        const { name } = e.target;
        try {
            const file = e.target.files[0]
            if (!file) return alert("File not exist")
            if (file.size > 1024 * 1024) return alert("Size too large")
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert("File format is incorrect")

            let formData = new FormData()
            formData.append('file', file)
            setLoading(true)

            const res = await axios.post(`https://storm-gate.net/api/upload`, formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setUser({...updateduser, [name]: res.data.result.secure_url })
            setImages(res.data.result)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

	const handleDestory = async e => {
        try {
            setLoading(true)
            await axios.post(`https://storm-gate.net/api/destroy`, { public_id: images.public_id }, {
                headers: { Authorization: token }

            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    if (updateduser) {
        const {name, bio } = updateduser;
        return (
            <>
                    <div id="login-page-container">
                        <div className="login-page">
                            <div className="upload">
                                <input type="file" name="images" id="file_up"
                                    onChange={handleUpload} />
                                    {
                                        loading ?
                                            <div id="file_img"><h3>Loading...</h3></div>
                                            :
                                            <div id="file_img" style={styleUpload}>
                                                <img src={images ? images : ''} alt="" />
                                                <span onClick={handleDestory}>X</span>
                                            </div>
                                    }
                            </div>
                            <form onSubmit={(e)=> handleSubmit(e)}>
                                <h2>Update User info</h2>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    id="name"
                                    placeholder="Your name here"
                                    value={name}
                                    onChange={onChangeInput}
                                />                               
                                <label htmlFor="bio">Bio</label>
                                <input
                                    type="text"
                                    name="bio"
                                    id="bio"
                                    required
                                    autoComplete="on"
                                    placeholder="Enter your bio"
                                    value={bio}
                                    onChange={onChangeInput}
                                />
                                <div className="row">
                                    <button type="submit">Try It Out</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </>
        )
    } else {
        return (
            <h3>Loading...</h3>
        )
    }
    
}
export default EditUser;
