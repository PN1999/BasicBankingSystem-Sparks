//

const { concatSeries } = require('async');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');



mongoose.connect("mongodb+srv://Prajval_123:Prajval@123@cluster0.kq4ie.mongodb.net/Bank", { useNewUrlParser: true, useUnifiedTopology: true });
   

// mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
mongoose.set('useFindAndModify', false);

const transactionSchema = new mongoose.Schema({
    fromName : {
        type : String,
        required: true
    },
    toName : {
        type : String,
        required: true
    },
    transfer : {
        type : Number,
        required: true
    }
})

const Transactions = mongoose.model('Transaction', transactionSchema);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        min: 0,
        required: true
    }
})

const Users = mongoose.model('User', userSchema);
//------------------------------------------------------------------------


// const customer = [
//     {
//         name: 'Pratik Naphade',
//         email: 'pratiknnaphade@gmail.com',
//         credits: 10000
//     },
//     {
//         name: 'sumit patil',
//         email: 'sumit2000@gmail.com',
//         credits: 7000
//     },
//     {
//         name: 'prasad patil',
//         email: 'patilprasad143@gmail.com',
//         credits: 4500
//     },
//     {
//         name: 'Vaibhav kharche',
//         email: 'vaibhavgkharche@gmail.com',
//         credits: 8600
//     },
//     {
//         name: 'Kunal Narkhede',
//         email: 'kunalpnarkhede@gmail.com',
//         credits: 7500
//     },
//     {
//         name: 'Abhishek rane',
//         email: 'abhishek@gmail.com',
//         credits: 6900
//     },
//     {
//         name: 'piyush more',
//         email: 'morepiyush@gmail.com',
//         credits: 3000
//     },
//     {
//         name: 'ankesh chaudhary',
//         email: 'chaudharyankesh@gmail.com',
//         credits: 2100
//     },
//     {
//         name: 'mahesh bhangale',
//         email: 'bhangalemahesh07@gmail.com',
//         credits: 5300
//     }
// ]

// Users.insertMany(customer)
//     .then(res => console.log(res))
//     .catch(err => console.log(err)
// );


//-----------------------------------


app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/sender", async (req, res)=>{
    const users = await Users.find({})
    res.render("sender", {users});
});

app.get("/sender/:id", async(req, res) =>{
    const { id } = req.params;
    const user = await Users.findById(id);
    const users = await Users.find({})
    res.render("reciver", {user, users});
});

app.get("/sender/:id1/:id2", async(req, res) =>{
    const {id1, id2} = req.params;
    const fromUser = await Users.findById(id1);
    const toUser = await Users.findById(id2);
    res.render("form", {fromUser, toUser});
});

app.put("/view/:id1/:id2", async(req, res) =>{
    const {id1, id2} = req.params;
    const credit = parseInt(req.body.credit);
    const fromUser = await Users.findById(id1);
    const toUser = await Users.findById(id2);

    if( credit != null &&  credit <= fromUser.credits && credit>0){
        
        let fromCreditsNew = fromUser.credits - credit;
        let toCreditsNew = parseInt(toUser.credits + credit);
        await Users.findByIdAndUpdate(id1, {credits : fromCreditsNew}, { runValidators: true, new: true });
        await Users.findByIdAndUpdate(id2, {credits : toCreditsNew}, { runValidators: true, new: true });

        let newTransaction = new Transactions();
        newTransaction.fromName = fromUser.name;
        newTransaction.toName = toUser.name;
        newTransaction.transfer = credit;
        await newTransaction.save();
        
        res.redirect("/sender");
    
    }
    else{
        res.render('error');
    }
});

app.get("/history", async(req, res)=>{
    const transactions = await Transactions.find({});
    res.render("history", {transactions});
});

app.listen(process.env.PORT || 3000, ()=>{

});
