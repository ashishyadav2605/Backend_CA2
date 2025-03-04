const express = require('express');
const mongoose = require('mongoose');
const LoginPage = require('./schema');

const app = express();
app.use(express.json()); 

const PORT = 8080;

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email required" });
    } 
    if (!password) {
        return res.status(400).json({ error: "Password required" });
    }

    try {
        
        const user = await LoginPage.findOne({ email, password });
        if (user) {
            return res.status(200).json({ message: "Successfully logged in!" });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});
