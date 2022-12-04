
const { request } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const request1 = require('request')

const {initializeApp , cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./serviceAccountKey.json");
const math=
{
	add:function(a,b)
	{
		return a+b;
	}
}             

initializeApp({
    credential: cert(serviceAccount)
})
const db = getFirestore(); 
app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render('home3')
});

app.get("/registration",(req,res)=>{
    res.render('registration')
 });
 app.get("/shop",(req,res)=>{
    res.render('shop')
 });
 app.get("/home2",(req,res)=>{
    res.render('home2')
 });
 app.get("/home3",(req,res)=>{
    res.render('home3')
 });
 
 
 app.get("/decor",(req,res)=>{
    res.render('decor')
 });
 app.get("/bonsai",(req,res)=>{
    res.render('bonsai')
 });
 app.get("/fruits",(req,res)=>{
    res.render('fruits')
 });
 app.get("/about",(req,res)=>{
    res.render('about')
 });
 
 app.get('/flowerseeds',(req,res)=>{
    res.render('flowerseeds')
 });
 app.get('/contact',(req,res)=>{
    res.render('contact')
 });
 
 app.get('/inforeceive',(req,res)=>{
    res.render('inforeceive')
 });
 app.get('/regsuccess',(req,res)=>{
    res.render('regsuccess')
 });
 


 app.get("/signin",(req,res)=>{
    const user = req.query.Fname;
    const pass = req.query.pwwd;
    db.collection('work').where('Name','==',user).where('passWord','==',pass).get().then((docs)=>{
        if(docs.size>0){
            res.render("categories")
        }
        else{
            res.render('loginfail');
        }
    });
    /*db.collection('work')
    .where("Name","==",user)
    .where("passWord","==",pass)
    .get()
    .then((docs) =>{
        if(docs.size >0){
            res.render("Login successful")
        }
        else{
            res.render('Invalid credentials')
        }
    })*/

 });


 

 app.get('/signup',function(req,res) {
    console.log(req.query.MailId)
    console.log(req.query.FFname);
    
   db.collection('work').add({
        email:req.query.MailId,
        Name:req.query.FFname,
        passWord:req.query.pwd
    })
    .then(()=>{
        res.render('regsuccess')
    });
});

app.get("/orderconfirmed",function(req,res){
    res.render("orderconfirmed");
  });

app.get('/send',function(req,res) {
    console.log(req.query.MailId)
    console.log(req.query.FFname);
    
   db.collection('message').add({
        first_name:req.query.firname,
        last_name:req.query.lasname,
        mail_id:req.query.gmail,
        MobilleNo:req.query.mobile,
        Msg:req.query.message,


    })
    .then(()=>{
        res.render('inforeceive')
    });
});
const arr=[];
const costs=[];
var amount=0;
app.get("/addedToCart",(req,res)=>{
	const val=req.query.item;
	var c=req.query.cost;
	costs.push(c);
	c=eval(c.slice(0,c.length-2));
	console.log(c);
	amount=math.add(amount,c);
	arr.push(val);
	
});

app.get("/cart",(req,res)=>{
	if(typeof(arr) != "undefined"){
		db.collection("cart").add({
			Cart : arr,
			Costs : costs,
			TotalCost : amount,
		}).then(()=>{
			res.render("cart",{booksData : arr, amount : amount, costs : costs});
		});
	}
});

 


app.listen(port ,() =>{
    console.log("example app running $(port)")
});
