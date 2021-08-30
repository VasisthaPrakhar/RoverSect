const mongoose = require('mongoose');
const cities = require ('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DATABASE CONNECTED!!!!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '612a2686c71b335a247bd079',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias animi provident quas. Rem, molestias nostrum nulla delectus sed ullam maxime, blanditiis ratione et possimus laboriosam voluptates at, exercitationem quasi minima!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzzilo0vt/image/upload/v1630263820/YelpCamp/pxc68xexy55budhqdkru.jpg',
                    filename: 'YelpCamp/pxc68xexy55budhqdkru'
                },
                {
                    url: 'https://res.cloudinary.com/dzzilo0vt/image/upload/v1630263820/YelpCamp/clx6kbltj2fpuwneiscr.jpg',
                    filename: 'YelpCamp/clx6kbltj2fpuwneiscr'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})