//Initialize object that will have the operation functions.

const auth = require('./auth.js'); // Needed for hashing operations


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

module.exports = operation;