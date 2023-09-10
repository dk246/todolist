
const express = require("express")
const bodyparser = require("body-parser")

const mongoose = require("mongoose")

const app = express()
// let items =["Buy food", "eat food"]
// let workItems =[]
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))

const Item = require("./Item")
const Lst = require("./listItems")
//mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")
mongoose.connect("mongodb+srv://dkaushalya:Dumindu24@cluster0.joe8hmm.mongodb.net/todolistDB")
const defaultItems = []

async function run(){
  

  const item1 = await Item.create({
    name: "Welcome to your todolist.",
  })
  const item2 = await  Item.create({
    name: "Hit the + button to add a new item."
  })  
  
  const item3 = await  Item.create({
    name: "<--- Hit this to delete an item."
  }) 
  defaultItems.push(item1)
  defaultItems.push(item2)
  defaultItems.push(item3)
 

}



app.get("/", function(req, res){
  // if(currentDay==6 || currentDay==0){  
  //   day = "weekend"
  // }
  // else{
  
  //   day = "weekday"
  // }
  // console.log(currentDay)
  // switch(currentDay){

  //   case 0:
  //     day = "sunday"
  //     break
  //   case 1:
  //     day = "monday"
  //     break
  //   case 2:
  //     day = "tuesday"
  //     break
  //   case 3:
  //     day = "wednesday"
  //     break
  //   case 4:
  //     day = "thursday"
  //     break
  //   case 5:
  //     day = "friday"
  //     break
  //   case 6:
  //     day = "saturday"
  //     break
  //   default:
  //     console.log("error"+ currentDay)  
  // }
  founded()
  async function founded(){


    const items = await Item.find({})

    if(items.length == 0){
      run()
    }
  
    else{
      res.render('list', {listTitle: "today", newIListItem: items});
    }
   
  }

})
 
app.post("/", function(req,res){


  let itemName = req.body.newItem
 
  userItems()
  async function userItems(){

    const item = await Item.create({
      name: itemName,
    })
   
    res.redirect("/")
  }
  
 
  // if(req.body.btn == "Work"){
  //   workItems.push(item)
  //   res.redirect("/work")
  // }else{
  //   items.push(item)
  //   res.redirect("/")
  // }


})


app.post("/delete", function(req,res){
  //console.log(req.body.checkbox)
  //const checkedItemId = req.body.checkbox
  
  

  
  let checkedItemId = req.body.checkbox
  //console.log(checkedItemId)
  userItems()
  async function userItems(){

    // const item = await Item.find({
    //   _id:checkedItemId ,
    // })
    const items = await Item.findById(checkedItemId)
    await Item.deleteOne({ name: items.name });
    //console.log(items)
    res.redirect("/")
  }

})


// app.get("/:customListName", function(req,res){
//   //console.log(req.params.customListName)
//   const customListName = req.params.customListName

//   console.log("link "+customListName)
//   newList()
//   async function newList(){

//     const list = await Lst.create({
//       name: customListName,
//       items: defaultItems,
//     })

//     console.log("list "+list)
//     let found = Lst.findOne({name: customListName})
//     console.log("name "+found.name)

//     // if(!found){
//     //   console.log(found.name)
//     //   const list = await Lst.create({
//     //     name: customListName,
//     //     items: defaultItems,
//     //   })
//     // }
//     // else{
//     //   console.log(found.name)
//     //   //res.render('list', {listTitle: found.name, newIListItem: found.items});
//     //   res.redirect("/"+customListName)

//     // }
   
   
//     //res.redirect("/")
//   }
// })

app.listen(3000, function(){

  console.log("server started")
})