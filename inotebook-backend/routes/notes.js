const express = require("express");
const router = express.Router();
const getUser = require("../middleware/getUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE1 - Fetch all notes of user using GET "/api/notes/getallnotes" Login required
router.get("/getallnotes", getUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes); 
  } catch (error) {
    console.error("Error getting notes:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE2 - Add a note using POST "/api/notes/addnote" Login required
router.post(
  "/addnote",
  getUser,
  [
    body("title", "Enter a valid title.").isLength({ min: 3 }),
    body("description","The description must be atleast 5 characters.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      let {title, description, tag} = req.body;
      const errors = validationResult(req);
      //if there are errors return bad request and error.
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if (tag === ""){
        tag = "general"
      }
      const note = new Notes({title, description, tag, user: req.user.id});
      const savedNote = await note.save();
      res.json(savedNote);     
    } catch (error) {
      console.error("Error adding note:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE3 - Update an existing note using PUT "/api/notes/updatenote" Login required
router.put("/updatenote/:id", getUser,
  async (req, res) => {
    try {
      const {title, description, tag} = req.body;
      const newNote = {};
      //if there are updates add it to req body and update changes to new note object
      if(title){
        newNote.title = title;
      }
      if(description){
        newNote.description = description;
      }
      if(tag){
        newNote.tag = tag;
      }

      //Find note to be updated by finding note id from mongo DB
      let note = await Notes.findById(req.params.id);
      if(!note) {
        return res.status(404).send("Note not found")
      }

      //only the owner of the note should be able to update it the note schema contains id of user(owner)
      if(note.user.toString() !== req.user.id) {
        return res.status(401).send("Access denied")
      }

      //now finally update the note 
      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
      res.send(note)
    } catch (error) {
      console.error("Error in updating note:", error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE4 - Delete an existing note DELETE "/api/notes/deletenote" Login required
router.delete("/deletenote/:id", getUser,
  async (req, res) => {
    try {
      //Find note to be updated by finding note id from mongo DB
      let note = await Notes.findById(req.params.id);
      if(!note) {
        return res.status(404).send("Note not found")
      }

      //only the owner of the note should be able to update it the note schema contains id of user(owner)
      //authenticating user using token
      if(note.user.toString() !== req.user.id) {
        return res.status(401).send("Access denied")
      }
      //now finally delete the note 
      note = await Notes.findByIdAndDelete(req.params.id);
      res.send(`Successfully deleted ${note.title}`);
    } catch (error) {
      console.error("Error in updating note:", error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
