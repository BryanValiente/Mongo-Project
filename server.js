const express = require('express')
require('dotenv').config()
const cors = require("cors");
const mongoose = require('mongoose');
const ProfileModel = require('./models/Profiles')

require("dotenv").config();

const app = express();
const port = process.env.PORT;;

//setting up middleware
app.use(cors({
    origin: true, 
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {console.log('Connected to Mongo DB')}, err => {console.log(`Cannot connect to DB ${err}`)});

//routes
app.get('/', (req,res) => {
    async function getProfiles(){
        try{
            const allUsers = await ProfileModel.find()

            res.status(200).send({
                payload: allUsers
            })
        }catch(e){
            res.status(400).send({
                message: 'error in get request',
                data: e,
            })
        }
    }
    getProfiles()
    
});


app.post('/add-profile', (req, res) => {
    const incomingData = req.body;

    try {
        const newProfile = new ProfileModel(incomingData);
        newProfile.save();
        res.status(200).send({
            message: 'saved blog'
        })
    } catch (err) {
        console.log(err);
    }
});
app.delete('/delete-profile', (req, res) => {
    const data = req.body;
    async function deleteUser(){
        try {
            await ProfileModel.findByIdAndDelete(data._id)
        res.status(200).send({
            message: 'deleted Profile'
        })
    } catch (err) {
        console.log(err);
    }
    }
    deleteUser()
    
});

app.listen(port, () => {
     console.log(`Server is running on https://localhost:${port}`);
});