//Initialize object that will have the operation functions.

const auth = require('./auth.js'); // Needed for hashing operations
const nodemailer = require("nodemailer");


operation = {};
//Basic getAll
operation.toGetAll = function (schema) {
	return (req, res) => {
		// our null can be used a a security params
		schema.find(null, (err, data) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.status(200).send(data);
			}
		});
	}
}

operation.getUserByUsername = function (schema) {
	return async (req, res) => {
		schema.find({username: req.params.username}, function (err, docs) {
			console.log(req.params.username);
			console.log(docs);
			if (err) {
				res.status(400).send(err)
			}
			else {
				if (docs === null) {
					res.status(200).send("No such user")
				}
				else {
					res.status(200).json(docs)
				}
			}
		});
	}
}

// Get one specific Item in the database
operation.toGet = function (schema) {
	console.log('in toGet function')
	return async (req, res) => {
		schema.findById(req.params.id, function (err, docs) {
			if (err) {
				res.status(400).send(err)
			}
			else {
				if (docs === null) {
					res.status(200).send("No such Item")
				}
				else {
					res.status(200).json(docs)
				}
			}
		});
	}
}

// Create an object in the database
operation.toCreate = function (schema) {
	console.log('why not here')
	return async (req, res) => {
		const userInfo = req.body;
		console.log(userInfo);
		userInfo.password = await auth.hashPassword(userInfo.password);

		schema.create(userInfo, null, (err, data) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.status(201).send(data);
			}
		})
	}
}

//Update one specific item in the database
operation.toUpdate = function (schema) {
	return async (req, res) => {
		const id = req.params.id;
		schema.findByIdAndUpdate(req.params.id, req.body, function (err, docs) {
			if (err) {
				res.status(400).send(err)
			}
			else {
				res.status(200).json(docs)
			}
		});
	}
}

// Delete a specifc Item in the database
operation.toDelete = function (schema) {
	return async (req, res) => {
		schema.findByIdAndDelete(req.params.id, function (err, docs) {
			if (err) {
				res.status(400).send("You have error")
			}
			else {
				if (docs === null) {
					res.status(200).send("Already Deleted")
				}
				else {
					res.status(200).send(docs)
					console.log("Deleted : ", docs);
				}
			}
		});
	}
}

operation.loginUser = function (schema) {
	return async (req, res) => {
		console.log('in login')
		const {email, password} = req.body; // store login form input

		const user = await schema.findOne({ email }).lean() // grab that users(email) data from the database

		// validation to see if username / email exists in db
		if(!user){
			return res.json({status: 'error', error: 'Invalid Username or Password'})
		}

		if (await auth.compareHash(password, user.password) == false){
			// return res.json({status: 'error', error: "Invalid Username or Password"})
			return res.json({status: 'error', error: "Invalid Username or Password"})

		}
		
		const token = auth.jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '10m' })
		
		// return res.header('auth-token', token).send(token);
		return res.status(200).json({
			success: true,
			token: token,
			expiresIn: 600, // this is 10m in seconds
			user:{
				id: user._id,
				username: user.username
			}
		})
	}
}

// QUIZ STUFF

// Create an object in the database
operation.createQuiz = function (schema) {
	console.log('creating a quiz')
	return async (req, res) => {
		const quizInfo = req.body;

		schema.create(quizInfo, null, (err, data) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.status(201).send(data);
			}
		})
	}
}

operation.getQuizzesForUser = function (schema) {
	return async (req, res) => {
		schema.find({authorId: req.params.userId}, function (err, docs) {
			if (err) {
				res.status(400).send(err)
			}
			else {
				console.log(req.params.userId);
				console.log('quiz info for user')
				console.log(docs);
				if (docs === null) {	
					res.status(200).send("No such Item")
				}
				else {
					res.status(200).json(docs)
				}
			}
		});
	}
}

operation.deleteQuiz = function (schema) {
	return async (req, res) => {
		console.log('deleting quiz')
		schema.findByIdAndDelete(req.params.quizId, function (err, docs) {
			if (err) {
				res.status(400).send("You have error")
			}
			else {
				if (docs === null) {
					res.status(200).send("Already Deleted")
				}
				else {
					res.status(200).send(docs)
					console.log("Deleted : ", docs);
				}
			}
		});
	}
}

operation.getQuizQuestions = function (schema) {
	return async (req, res) => {
		console.log('reached');
		console.log(req.params.quizId);
		schema.find({quizId: req.params.quizId}, function (err, docs) {
			console.log(req.params.quizId)
			if (err) {
				res.status(400).send(err)
			}
			else {
				if (docs === null) {	
					res.status(200).send("No such Item")
				}
				else {
					res.status(200).json(docs)
				}
			}
		});
	}
}

// createQuestion

operation.createQuestion = function (schema) {
	console.log('creating a question')
	return async (req, res) => {
		const questionInfo = req.body;
		console.log('in questionInfo')
		console.log(questionInfo)

		schema.create(questionInfo, null, (err, data) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.status(201).send(data);
			}
		})
	}
}

operation.deleteQuizQuestion = function (schema) {
	return async (req, res) => {
		schema.findByIdAndDelete(req.params.questionId, function (err, docs) {
			if (err) {
				res.status(400).send("You have error")
			}
			else {
				if (docs === null) {
					res.status(200).send("Already Deleted")
				}
				else {
					res.status(200).send(docs)
					console.log("Deleted : ", docs);
				}
			}
		});
	}
}

operation.deleteAllQuizQuestions = function (schema) {
	return async (req, res) => {
		console.log('deleting quiz QUESTIONS')
		schema.deleteMany({quizId: req.params.quizId}, function (err, docs) {
			if (err) {
				res.status(400).send("You have error")
			}
			else {
				if (docs === null) {
					res.status(200).send("Already Deleted")
				}
				else {
					res.status(200).send(docs)
					console.log("Deleted : ", docs);
				}
			}
		});
	}
}

// upload song (move this later)
operation.uploadSong = function (schema) {
	console.log('creating a song')
	return async (req, res) => {
		const songInfo = req.body;

		schema.create(songInfo, null, (err, data) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.status(201).send(data);
			}
		})
	}
}

// get list of songs

operation.getListOfSongs = function (schema) {
	return (req, res) => {
		// our null can be used a a security params
		schema.find(null, (err, data) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.status(200).send(data);
			}
		});
	}
}

operation.getQuizById = function (schema) {
	return async (req, res) => {
		schema.findById(req.params.quizId, function (err, docs) {
			if (err) {
				res.status(400).send(err)
			}
			else {
				if (docs === null) {
					res.status(200).send("No such Item")
				}
				else {
					res.status(200).json(docs)
				}
			}
		});
	}
}

operation.getQuestionById = function (schema) {
	return async (req, res) => {
		schema.findById(req.params.questionId, function (err, docs) {
			if (err) {
				res.status(400).send(err)
			}
			else {
				if (docs === null) {
					res.status(200).send("No such Item")
				}
				else {
					res.status(200).json(docs)
				}
			}
		});
	}
}



operation.forgotPassword = function (schema) {
	console.log('forgot password')
	return async (req, res) => {
		// const { email } = req.body;
		const {email} = req.body;
		console.log(email);


		const user = await schema.findOne({ email }).lean() // grab that users(email) data from the database

		// validation to see if username / email exists in db
		if(!user){
			return res.json({status: 'No User Found', error: 'No user exists with this email. Please try again'})
		}
		
		const token = auth.jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET2, { expiresIn: '10m' })
		const link = `http://localhost:3000/resetPassword/${user.id}/${token}`;

		// res.send('Password reset link has been sent to your email...'); 
		
		// (Using NodeMailer to send emails ......... (Send Grid or Gmail API can be future options... currently using Nodemailer)
		// let testAccount = await nodemailer.createTestAccount();
		console.log(process.env.SONG_SLEUTH_EMAILER, " ", process.env.SONG_SLUETH_APP_PASS)
		let transporter = nodemailer.createTransport({
			service: "gmail",
			// host: "smtp.ethereal.email",
			// port: 587,
			// secure: false, //true for 465, false for other ports
			auth: {
				// user: testAccount.user,
				// pass: testAccount.pass
				user: process.env.SONG_SLEUTH_EMAILER,
				pass: process.env.SONG_SLUETH_APP_PASS
			},
			tls: {
				rejectUnauthorized: false
			  }
		});

		console.log(email);

		// email: SongSleuthEmailer@gmail.com
		// pass: Pqwk4hjgi0oqijnew!s

		// send the mail
			let info = await transporter.sendMail({
			from: 'SongSleuthEmailer@gmail.com',
			to: email,
			subject: "Reset Password",
			// text: + link,
			html: `<p>You are receiving this email for attempting to reset your password. If this isn't you, you can safely ignore this. Otherwise, click the link below:</p><a href="${link}">Reset Password</a>`
			});

			console.log("Message sent", info.messageId);
			// console.log("Preview", nodemailer.getTestMessageUrl(info));



		console.log('email should have sent?')


		return res.status(200).json({
			success: true,
			token: token,
			expiresIn: 600, // this is 10m in seconds
			link: link
		})
	}
}

operation.resetPassword = function (schema) {
	return async (req, res) => {
		const {id, resetPasswordToken} = req.params;

		const user = await schema.findOne({ email }).lean() // grab that users(email) data from the database

		// check if id exists in db
		if (id !== !user.id){
			return
		}

		// If here.. have a valid id, and has a valid user with this id
		try{
			const payload = jwt.verify(resetPasswordToken, process.env.JWT_SECRET2)
			res.status(200).json({status: ok}); // if status res = this on frontend... take to reset form
		}
		catch{
			console.log('error verifying payload');
		}



	}
}

module.exports = operation;