const express = require('express')
const category = require('../models/category')
var router = express.Router();
const { verify } = require('../middleware/jwt_token')

router.use(verify)

router.post('/add', async (req, res) => {
    var data = category({
        name: req.body.name,
        description: req.body.description,
        
    })

    try {
        var result = await data.save();
        if (!result)
            res.status(400).send({ message: 'Category not added' })

        else res.status(200).send({ category: result })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }
})

router.get('/get', async (req, res) => {
    try {
        var data = await category.find();

        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: 'Error Occured!', error: error })
    }

})

module.exports = router;