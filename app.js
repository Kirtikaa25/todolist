const express=require("express");
const bodyParser=require("body-parser");
const app=express();

let items=[];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.get("/",function(req,res){
   
    let options={
        weekday:'long',
        month:'long',
        day:'numeric'
    };
    const today=new Date();
    let day=today.toLocaleDateString("en-US",options);
    res.render('index',{kindOfDay:day,newItem:items})
})
app.post("/",(request,response)=>{
    let item=(request.body.newItem);
    items.push(item);
    response.redirect("/");
   
})
app.listen(3000,()=>{
    console.log("server on the port 3000 is running!")
})