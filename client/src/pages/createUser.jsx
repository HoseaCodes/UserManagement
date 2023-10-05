import React, {useState, useContext} from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/globalState';

const CreateUser = () => {
    const state = useContext(GlobalContext)
	const { addProfile } = useContext(GlobalContext);
	const token = state.token
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState(false);
	const [user, setUser] = useState({
		name: "",
		bio: ""
	});


	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

    const handleSubmit = (e) => {
		e.preventDefault();
		try {
			if (!images) return alert("No Image Upload")
			setUser({ ...user, images })
			addProfile({user, images});

		} catch (error) {
			alert(error.response.data.msg)
		}
	}

    const handleUpload = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            if (!file) return alert("File not exist")
            if (file.size > 1024 * 1024) return alert("Size too large")
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert("File format is incorrect")

            let formData = new FormData()
            formData.append('file', file)
            setLoading(true)

            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/upload`, formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setImages(res.data.result.secure_url)

        } catch (err) {
            alert(err)
            alert(err.response.data.msg)
        }
    }

	const handleDestory = async e => {
        try {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_BACKEND}/api/destroy`, { public_id: images.public_id }, {
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

    const { name, bio } = user
    return (
        <>
            	<div id="login-page-container">
			        <div className="login-page">
                        <div className="upload">
                            <input type="file" name="file" id="file_up"
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
                            <h2>User info</h2>
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
}
export default CreateUser;
