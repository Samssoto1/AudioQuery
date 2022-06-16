
const prioritySchema = require("../model/prioritySchema.js")
// funct to get all the prioritys in the database
const getPriorities = (req, res) => {
    res.status(200).json({ 'message': 'Get all priorities' })
}

// funct to get all the priorities in the database
const getAPriorities = (req, res) => {
    res.status(200).json({ 'message': `Get a priority ${req.params.id}` })
}

// funct to get all the priorities in the database
const createPriorities = async (req, res) => {
    // res.status(200).json({ 'message': 'creates priority' })

    const userInfo = req.body;
    prioritySchema.create(userInfo, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
    // try {
    //     // this will save the info into the database
    //     await test.save()

    //     res.status(201).json(test);
    // } catch (error) {
    //     // send an error to the response 
    //     res.status(401).send({ message: error.message })
    // }
}

// funct to get all the priorities in the database
const updatePriority = (req, res) => {
    res.status(200).json({ 'message': `update priority ${req.params.id}` })
}

// funct to get all the priorities in the database
const deletePriorities = (req, res) => {
    res.status(200).json({ 'message': `delete priority ${req.params.id}` })
}



module.exports = {
    getPriorities,
    updatePriority,
    deletePriorities,
    createPriorities,
    getAPriorities
}