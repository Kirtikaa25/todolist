const express=require("express");
const bodyParser=require("body-parser");
const app=express();

let items=[];
let funItems=[];
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
    res.render('index',{listTitle:day,newItem:items})
})
app.get("/fun",(req,res)=>{
    res.render("index",{listTitle:"Fun",newItem:funItems});
})
app.post("/fun",(req,res)=>{
    let item=req.body.newItem;
    funItems.push(item);
    res.redirect("/fun");
})
app.post("/",(request,response)=>{
    let item=(request.body.newItem);
    console.log(request.body.list);
   if(request.body.list==="Fun"){
      funItems.push(item);
      response.redirect("/fun");
   }else{
    items.push(item);
    response.redirect("/");
   }
   
})

app.listen(3000,()=>{
    console.log("server on the port 3000 is running!")
})
