import { User } from "./models.js";
import express from "express";

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
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(404).send("User not found");
    }
});

// Update a specific user
router.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.isAdmin = req.body.isAdmin;
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(404).send("User not found");
    }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.deleteOne()
        res.send("Deleted succefully")

    } catch {
        res.status(400).send("Deletion unsuccessful")
    }
})


export default router;