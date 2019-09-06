const express = require('express');
const db = require('../helpers/actionModel')

const server = express();

server.use(express.json())

//w
server.get('/', (req, res) => {
    res.status(200).json({ sanity: 'check'})
});

//c
server.post('/api', (req, res) => {
    const { project_id, description, notes } = req.body
    const post = req.body
    //tried one word const incase that messed with it being a parameter.
    //noticed in README is wans name && description. (Update)and wrong db that would be why XD
    if( !project_id || !description || !notes) {
        return res.status(400).json({ error: 'Please provide correct data'})
    }
    console.log(req.body)
    //should work like this..?
    db.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {res.status(400).json({ error: 'something weird happened. oops' })})

});

//w
server.get('/api',  (req, res) => {
    const {post} = req.params
    db.get()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({ error: err})
    })
})

//w
server.get('/api/:id', validateId, (req, res) => {
    // const {id} = req.params
    console.log('check@@@@here',req.post)
    // db.get(id)
        res.status(200).json(req.post)       
    })
    // .catch(()=>res.status(500).json({error: 'It no work'}))


//w
server.put('/api/:id', (req, res) => {
    const { id } = req.params
    const { description, notes } = req.body
    if(!description || !notes){
        return res.status(400).json({ error: 'Need name and description' })
    }
    // console.log(req.body)
    db.update(id, req.body)
        .then(post => {
            console.log(id)
            res.status(200).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Something happened'})
        })
});

//w
server.delete('/api/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
        .then(post=>{res.status(204).end()})
        .catch(()=> res.status(500).json({ error: 'oops something happened' }))
});

function validateId(req, res, next){
    const { id } = req.params
    db.get(id)
     .then(post => {
        //  console.log(post,'skjhldfb')
         if(post){
            console.log('ValidationID',id)
            req.post = post
            // console.log(post)
            next()
            //BWAHAHA wasnt in else statement thats why it double ran XD 
         } else {
            res.status(404).json({ error: 'Id no exsist'})
         }     
     })
     .catch(err => {
        res.status(500).json({ error: 'couldnt process'})
     })
}

module.exports = server