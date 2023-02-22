const router = require('express').Router();
const Blog = require('../models/Blog')
const mongoose = require('mongoose')
// Your routing code goes here


router.get('/search/:key',async (req,res)=>{
    const data = await Blog.find({
        "$or":[
            {"topic": {$regex: req.params.key} }
        ]
    })
    res.json({
        status: "Success",
        result: data
    })
})


router.post('/', async(req, res)=>{
    const blog = new Blog(req.body)
    const data = await blog.save()
    res.json({
        status: "Success",
        result: data
    })
})

router.put('/:id', async(req, res) =>{
    const {id} =req.params

    if(!mongoose.Type.ObjectId.isValid(id)){
        return res.status(404).json({error : "No such workout"})
    }
    const data = await Blog.findOneAndUpdate({_id: id}, {...req.body})
    if(!data){
        return res.status(404).json({error: "no such workout"})
    }
    res.json({
        status: "Success",
        result: data
    })
})
router.delete('/:id', async(req, res) =>{
    const {id} =req.params

    if(!mongoose.Type.ObjectId.isValid(id)){
        return res.status(404).json({error : "No such workout"})
    }
    const data = await Blog.findOneAndUpdate({_id: id}, {...req.body})
    if(!data){
        return res.status(404).json({error: "no such workout"})
    }
    res.json({
        status: "Success",
        result: data
    })
})


module.exports = router;