const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')



const multer = require('multer')
const path = require('path')

const UserModel = require('./models/Users')
const PostModel = require('./models/Posts')

const app = express()
app.use(cors({
    origin: 'http://localhost:5174', 
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.static('public'))

app.listen(3001, ()=> {
    console.log("Server is Running")
})

mongoose.connect("") 


//The Login Functionalities 


app.post("/Register", async (req, res) => {
    const { Name, Email, Password } = req.body;

    // Check if the user already exists
    const userName = await UserModel.findOne({
        Name: { $regex: Name, $options: 'i' }
    });

    // If a user is found, send a response and return to stop further execution
    if (userName) {
        return res.json("User already exists");
    }

    // Hash the password and create a new user if no existing user is found
    bcrypt.hash(Password, 10)
        .then(hash => {
            const newUser = new UserModel({ Name, Email, Password: hash });
            return newUser.save();
        })
        .then(user => res.json(user))
        .catch(err => {
            console.error("Error creating user:", err);
            res.status(500).json({ error: "Failed to create user" });
        });
});


app.post("/loginForm", async (req, res) => {
    console.log("Login endpoint hit");
    const { Email, Password } = req.body;

    try {
        // Check if email exists
        const user = await UserModel.findOne({
            Email: { $regex: Email, $options: 'i' }
        });

        if (!user) {
            return res.json("No record existed");
        }

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(Password, user.Password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.json("An error occurred during password comparison");
            }

            if (isMatch) {
                const token = jwt.sign({Email: user.Email, Name: user.Name}, "jwt-secret-key" , {expiresIn:"1d"})
                res.cookie("token",token)
                console.log("Done")

                return res.json("Success");
            } else {
                return res.json("The password is incorrect");
            }
        });
    } catch (err) {
        console.error("Error during login:", err); // Log error for debugging
        res.status(500).json("An error occurred"); // Send 500 for server error
    }
});



app.get('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    return res.json("Success");
});


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token:", token); // Debugging line
    if (!token) {
        return res.json("The token was not available");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {return res.json("The token is wrong"); }
            else {
                console.log("Decoded Token:", decoded);
                req.Email = decoded.Email ;
                req.Name = decoded.Name ;
                next();
            }
        })
    }
};



app.get("/home", verifyUser , (req,res) => {
    return res.json({Email: req.Email , Name: req.Name })
})


app.post('/forgot-password' , (req,res) => {
    const {email} = req.body ;
    UserModel.findOne({Email: email})
    .then(user => 
    {
        if(!user){
            return res.json("User doesn't exist")
        }
    
        const token = jwt.sign({id:user._id}, "jwt_secret_key", {expiresIn:"1d"})
    
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'saja.hamade5@gmail.com',
              pass: ''
            }
          });
          
          var mailOptions = {
            from: 'saja.hamade5@gmail.com',
            to: 'saja.hamade5@gmail.com',
            subject: 'Sending Email using Node.js , Soo Reset your password',
            text: `http://localhost:5174/ResetPassword/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.json("Success")
            }
          });
    
    
    
    })
    });
    
app.post('/reset-password/:id/:token', (req, res) => {
        const { id, token } = req.params;
        const { password } = req.body;
    
        console.log("Received Token:", token); // Log token to verify it's being sent correctly
    
        jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if (err) {
                console.log("Error verifying token:", err); // Log the specific error
                return res.json({ Status: "Error with token" });
            } else {
                console.log("Decoded Token:", decoded); // Check the decoded token
    
                bcrypt.hash(password, 10).then(hash => {
                    UserModel.findByIdAndUpdate({ _id: id }, { Password: hash })
                        .then(u => {
                            return res.json("Success");
                        })
                        .catch(err => {
                            console.log("Error updating password:", err);
                            return res.json("error");
                        });
                });
            }
        });
    });
    
    //End of Login stuff

    //Uploading the Posts 

    //Starting with the images    
     const storage = multer.diskStorage({
        destination: (req, file , cb) => {
            cb(null , 'public/Images')
          },
          filename: (req, file , cb)=> {
            cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname))
          }
        })
        
        const upload = multer ({
            storage: storage
        })
        


      
      
      app.post('/upload', upload.single('file'), (req, res) => {
        const { title, description } = req.body; // when you use FormData get non-file stuff from req.body
        PostModel.create({ image: req.file.filename,title : title, description:description  })
            .then(result => res.json(result))
            .catch(err => console.log(err));
    });
    


    app.get('/getPosts',(req,res) => {
        PostModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
    })

    //Dealing with the posts 

    app.get('/getPost/:id', (req, res) => {
        const { id } = req.params;
      
        PostModel.findById(id) // Use findById for fetching by `_id`
          .then(post => {
            if (!post) {
              return res.status(404).json({ message: "Post not found" });
            }
            res.json(post); // Send the post back to the frontend
          })
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: "An error occurred", error: err });
          });
      });
      

      app.delete('/DeletePost/:id',(req,res)=>{
        const { id } = req.params;

        PostModel.deleteOne(
            {_id:id}
        ).then(
      
        res.json("Deleted Successfully"))
        .catch(err => console.log("an error occured" , err))
        
    })

/*app.put('/EditPost/:id',upload.single('file'),(req,res) =>{
    const {id} = req.params ;
    const { title , description } = req.body ;

  
        PostModel.updateOne( 
            { _id: id},
            { $set:{ image: req.file.filename,title : title, description:description  }}
        )
            .then(result => res.json(result))
            .catch(err => console.log(err));
    });
  
            
     app.put('/EditPost/:id',(req,res) =>{
        const {id} = req.params ;
        const { title , description } = req.body ;
    
      
            PostModel.updateOne( 
                { _id: id},
                { $set:{ title : title, description:description  }}
            )
                .then(result => res.json(result))
                .catch(err => console.log(err));
        });
      */ 


        app.put('/editPost/:id', upload.single('file'),  (req, res) => {
            const {id} = req.params ;
            const { title, description } = req.body; 
            const image = req.file.filename ;
            
           
            PostModel.updateOne( 
                { _id: id},
                { $set:{ title : title, description:description, image: image }}
            )
                .then(result => res.json(result))
                .catch(err => console.log(err));
            }
          );