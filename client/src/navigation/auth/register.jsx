import React, { useState, useContext } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from '../../context/globalState';

import "./login.css";

const Register = () => {
	const state = useContext(GlobalContext)
	const { register } = useContext(GlobalContext);
	const token = state.token

	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState(false);
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		bio: "",
		images: ""
	});

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

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

            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/upload`, formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
		
            setLoading(false)
            setImages(res.data.result);
			setUser({...user, [name]: res.data.result.secure_url })
			console.log(user)
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

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			if (!images) return alert("No Image Upload")
			setUser({ ...user, images })
			console.log(user)
			register(user, images);

		} catch (error) {
			alert(error.response.data.msg)
		}
	}

	const { name, email, password, bio } = user
	return (
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
                            <img src={images ? images.url : ''} alt="" />
                            <span onClick={handleDestory}>X</span>
                        </div>

                }

            </div>
				<form onSubmit={(e)=> handleSubmit(e)}>
					<h2>Registration</h2>
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
					<label htmlFor="e-mail">E-mail</label>
					<input
						type="email"
						name="email"
						id="e-mail"
						required
						placeholder="Your e-mail address"
						value={email}
						onChange={onChangeInput}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						autoComplete="on"
						placeholder="Enter your password"
						value={password}
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
						<button type="submit">Register</button>
						<div>
							Already have an account? <Link to="/login">Log in here!</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
