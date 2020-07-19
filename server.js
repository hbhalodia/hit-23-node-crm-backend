
/*
//how we write function in java script
var test = function (req,res){
    console.log("Hello")
}

//Arrow Function... More Convinient Way 
 var test1= (req,res)=> {

}
// To call the function 

test(req,res)

test1(req,res)
*/
//three lind we can use to send
//res.json()
//res.send()
//res.end()
//app.createServer(function (req,res) {
  //  res.send("Hello From Node Js...")
//})
// We can also write as above 

const app = require('http')

const expAppmodule = require('./app')

const server = app.createServer(expAppmodule)
/*
    if(req.url=='/student')
    {
        res.end("Hello From Node Js app created by students...")
    }
    if(req.url=='/faculty')
    {
        res.end("Hello From Node Js app created by facultiese...")
    }
    
})

*/
server.listen( 3000);