const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Prajval_123:<Prajval@123>@cluster0.kq4ie.mongodb.net/Bank", { useNewUrlParser: true, useUnifiedTopology: true });

const customer = [
    {
        name: 'Pratik Naphade',
        email: 'pratiknnaphade@gmail.com',
        credits: 10000
    },
    {
        name: 'sumit patil',
        email: 'sumit2000@gmail.com',
        credits: 7000
    },
    {
        name: 'prasad patil',
        email: 'patilprasad143@gmail.com',
        credits: 4500
    },
    {
        name: 'Vaibhav kharche',
        email: 'vaibhavgkharche@gmail.com',
        credits: 8600
    },
    {
        name: 'Kunal Narkhede',
        email: 'kunalpnarkhede@gmail.com',
        credits: 7500
    },
    {
        name: 'Abhishek rane',
        email: 'abhishek@gmail.com',
        credits: 6900
    },
    {
        name: 'piyush more',
        email: 'morepiyush@gmail.com',
        credits: 3000
    },
    {
        name: 'ankesh chaudhary',
        email: 'chaudharyankesh@gmail.com',
        credits: 2100
    },
    {
        name: 'mahesh bhangale',
        email: 'bhangalemahesh07@gmail.com',
        credits: 5300
    }
]

Users.insertMany(customer)
    .then(res => console.log(res))
    .catch(err => console.log(err)
);

