const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

//image upload
router.post(
	"/upload", async (req, res) => {
		try {
			if (!req.files || Object.keys(req.files).length === 0)
				return res.status(400).send({ msg: "No files were uploaded." });

			const file = req.files.file;
			if (file.size > 1024 * 1024) {
				removeTmp(file.tempFilePath);
				return res.status(400).json({ msg: "File size too large" });
			}

			if (file.mimetype !== "image/jpeg" || file.mimetype !== "image/jpg" || file.mimetype !== "image/png") {
				console.log('here')
			} else {
				removeTmp(file.tempFilePath);
				return res.status(400).json({ msg: "File format is incorrect" });
			}			

			const cloudinaryUpload = async () => {
				try {
					const data = await cloudinary.v2.uploader.upload(file.tempFilePath, {
					 folder: "UserManagement" 
					});
					return data;
				} catch (e) {
					console.log(e.message, e);
					return {result: ""};

				}
			};
			const result = await cloudinaryUpload()
			return res.json({result});
		} catch (err) {
			console.log(err)
			return res.status(500).json({ msg: err.message });
		}
	}
);

const removeTmp = (path) => {
	fs.unlink(path, (err) => {
		if (err) throw err;
	});
};

module.exports = router;