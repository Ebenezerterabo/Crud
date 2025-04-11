import { User } from "./models.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();


// Create a new user
router.post("/users", async (req, res) => {
    try {
        const {name, email, password, isAdmin} = req.body;
        const user = new User({name, email, password, isAdmin});
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send("Error creating user");
    }
});

// Get all users
router.get("/users", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// Get a specific user
router.get("/users/:id", async (req, res) => {
    
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("User not found");
    }

    try {
        const user = await User.findById(id);
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// Update a specific user
router.put("/users/:id", async (req, res) => {
    
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid ID");
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).send("User not found");
    }
    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.password = req.body.password ?? user.password;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;
    await user.save();
    res.send(user);
    
    
    // try {
    //     const user = await User.findById(id);
    //     user.name = req.body.name ?? user.name;
    //     user.email = req.body.email ?? user.email;
    //     user.password = req.body.password ?? user.password;
    //     user.isAdmin = req.body.isAdmin;
    //     await user.save();
    // } catch (error) {
    //     res.status(500).send("Internal server error");
    // }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.deleteOne()
        res.send("deleted successfully");

    } catch {
        res.status(400).send("Deletion unsuccessful")
    }
})


export default router;