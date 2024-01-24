//MVC - model, view, controller design pattern
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// app.use(bodyParser.json)
app.use(express.urlencoded({ extended:true })) //for form submission
app.use(express.json()) //json response
app.use(
    cors(
        { origin : "http://localhost:3000" }  //front end
    )
)

const userDB = [
    {
        id: 1,
        username: "admin",
        password: "password123",
        status: 1,
        email: "myTest@yahoo.com"
    },
    {
        id: 2,
        username: "staff",
        password: "123",
        status: 0,
        email: "staff@google.com"
    }

]
//CRUD  create, read, update, delete
const profileDB = [
    {
        id:1,
        firstname : "James",
        lastname : "Bond",
        phone : "97987",
        address : "New York USA",
        email : "james@yahoo.com",
    },
    {   
        id:2,
        firstname : "Peter",
        lastname : "Pan",
        phone : "97987",
        address : "California USA",
        email : "peter@yahoo.com",
    },
    {
        id:3,
        firstname : "Michael",
        lastname : "Jordan",
        phone : "97987",
        address : "California USA",
        email : "mic@google.com",
    },
    {
        id:4,
        firstname : "Vic",
        lastname : "Saints",
        phone : "9742342987",
        address : "CDO Mindanao",
        email : "vic@google.com",
    },
];

app.get('/all-profiles', (req, res)=>{
    res.json(profileDB)
})

app.get('/one-profile/:id', (req, res)=>{
   const profileId = req.params.id;
   const userFound = profileDB.find( 
            (user)=>{
                return parseInt(profileId) === parseInt(user.id)   
            } 
    )
    if (userFound){
        res.json(userFound);
    } else {
        res.status(400).json("Invalid Id")
    }
})

app.put('/update-user/:userId', (req, res)=>{
    const user_id = req.params.userId;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;

    const updateUserRecord = {
        id: user_id,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        address: address,
        email: email,
    }

   const updateThisRecord =  profileDB.findIndex( (obj) => obj.id == user_id );
   profileDB[updateThisRecord] = updateUserRecord;

   if (profileDB) {
        res.json(
            {
                code : "success",
                msg : "Update Done"
            }
        )
   } else {
      res.status(400).json(
        {
            code : "failed",
            msg : "Error encountered while updating"
        }
      )
   }

})
         
app.get('/delete-user/:userId', (req, res)=>{
    const user_id = req.params.userId;
    const indexValue =  profileDB.findIndex( (obj) => obj.id == user_id );
    profileDB.splice(indexValue, 1);

    if (profileDB) {
        res.json(
            {
                code : "success",
                msg : "Delete Done"
            }
        )
   } else {
      res.status(400).json(
        {
            code : "failed",
            msg : "Error encountered while deleting"
        }
      )
   }
    
})
 

app.post('/registration', (req, res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;

    let idCount = profileDB.length + 1;
    const newRecord = {
        id: idCount,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        address: address,
        email: email
    }
    const emailTaken = profileDB.some(db => db.email === email);
    if (emailTaken) {
        return res.status(409).json(
            {code: "conflict", msg:"Email has already been used"}
        )
        
    }

    profileDB.push(newRecord);  
    console.log(profileDB)
    
   if (profileDB.length > idCount - 1) {
     res.status(200).json(
        { code: "success", msg:"registration successful" }   
     )
   } else {
     res.status(401).json(
        { code: "failed", msg:"registration error in saving" }   
     )
   }

})

app.post('/login-validation', (req, res)=>{
    let username_login = req.body.username;
    let password_login = req.body.password;

   const user = userDB.find(
        (ob)=>{
          return ob.username === username_login && ob.password === password_login 
        }
    );
    
    if (user) {

        res.status(200).json(
           { code: "success", msg : "Username and Password matched a record", loginUser : user }   
        )

    } else {
       res.status(401).json({ code: "failed", msg:"Incorrect Username and Password testing"}) 
    }


})

//HTTP METHODS
//GET, POST, PUT, HEAD, DELETE, PATCH
app.get('/test/:num1/:num2', (req, res) => {
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    //database query

    const twoNumbers = [
        {
           id : num1,
           name: "Odeth",
           signal: true, 
        },
        {
            id : num2,
            name: "Odeth",
            signal: true,   
        }
    ]

    let sample = [num1, num2]

    let z = parseInt(num1);

    let m = "Hello WD95P";

    res.json(twoNumbers);
    
}
);


app.post('/save-data', (req, res) => {
    let fname = req.body.firstname;
    let lname = req.body.lastname;

    res.json([fname, lname])

})

app.put('/put-data/:id', (req, res) => {
     let fname = req.body.firstname;
    //let lname = req.body.lastname;

    let id = req.params.id;
   //update change firstname where id = id

    res.json([num1, fname])
})

app.delete('/delete/record/:id', (req, res)=>{
  
})


const pageContentArr = [
    {
        id:'home',
        content:'sample content for home page'
    },
    {
        id:'about',
        content:'sample content for about'
    },
    {
        id:'contact',
        content:'sample content for contact us'
    },
]

// app.post('/page-content', (req, res)=>{
   
//    let pageId = req.body.pageContent; 
//    let actualContent = req.body.contentValue;

//    newObject = {
//         id: pageId,
//         content:actualContent,
//    } 
    
//    const contentIndex =  pageContent.findIndex( (obj) => obj.id === pageId );
//    pageContent[contentIndex] = newObject;

//    if (pageContent) {
//     res.json(
//         {
//             code : "success",
//             msg : "Saving Done",
//             //obj: pageContent
//         }
//     )
//     } else {
//     res.status(400).json(
//         {
//             code : "failed",
//             msg : "Error encountered while saving home page content"
//         }
//     )
//     }

// })

app.post('/page-content', (req, res) => {
    const { pageContent, contentValue } = req.body;
    console.log(req.body)
    // Do something with the received data, e.g., save it to a database
    console.log('Received content for page:', pageContent);
    console.log('Content value:', contentValue);
    pageContentArr[0].content = contentValue;
    // Respond to the frontend
    res.json({ code: 'success', message: 'Content received successfully' });
});

app.get('/page-content/:id', (req, res)=>{
    const pageId = req.params.id;

    const pageFound = pageContentArr.find( 
             (page) => {
                 return pageId === page.id  
             } 
     )
     if (pageFound){
         res.json(pageFound.content);
     } else {
         res.status(400).json("Invalid Id")
     }
 })

const messageDB = [];
app.post('/save-message', (req, res) => {
    const {fullname, email, message} = req.body;
    
    if(fullname === ""){
        return res.status(400).json({code: 'failed', message: 'Invalid input!'})
    }

    let messageID = messageDB.length + 1;
    let messageDate = Date();
    const newMessage = {
        msgID: messageID,
        date: messageDate,
        fullname: fullname,
        email: email,
        message: message
    }
    messageDB.push(newMessage);
    console.log(messageDB)
    res.status(200).json({code: 'success', message: 'Message sent successfully!'})
})
app.listen(5000)
console.log('Server is running in port 5000')