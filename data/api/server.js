const express = require('express');
const db = require('../helpers/actionModel')

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ sanity: 'check'})
});

server.post('/api', (req, res) => {
    
});

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

server.get('/api/:id', validateId, (req, res) => {
    // const {id} = req.params
    console.log('check@@@@here',req.post)
    // db.get(id)
        res.status(200).json(req.post)       
    })
    // .catch(()=>res.status(500).json({error: 'It no work'}))

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