const router = require("express").Router();
const User = require("../models/users.model");

router.get("/", async (req, res) => {
  try {
    const { filter, value } = req.query;

    const users = await User.find({});


    if (filter && value) {
      return res
        .status(200)
        .send(
          users.filter((user) =>
            user[filter].toLowerCase().includes(value.toLowerCase())
          )
        );
    }

    return res.status(200).send(users);
  } catch (error) {
    return res
      .status(500)
      .send({ msg: `Error getting users: ${error.message}` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getUser = await User.findById(id);

    if (!getUser) return res.status(404).send({ msg: "User not found" });

    return res.status(200).send(getUser);
  } catch (error) {
    return res
      .status(500)
      .send({ msg: `Error getting user: ${error.message}` });
  }
});
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    if (!newUser) return res.status(400).send({ msg: "User not created" });
    return res.status(201).send(newUser);
  } catch (error) {
    return res
      .status(500)
      .send({ msg: `Error creating user: ${error.message}` });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .send({ msg: `Error updating user: ${error.message}` });
  }
});

router.patch("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const updateData=req.body;
        const updatedData = await User.findByIdAndUpdate(id,updateData,{ new:true });
        if(!updatedData) return res.status(404).send({msg:'User not found'});
        return res.status(200).send(updatedData);
    }catch(error){
        return res.status.send({msg:'Error updating the user'});
    }
});

router.delete("/:id",async (req,res)=>{
    try{
        const { id }=req.params;

        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) return res.status(404).send({msg:"User not found"});

        return res.status(200).send({msg:'User deleted successfully'});

    }catch(error){
        return res
        .status(500)
        .send({ msg: `Error deleting user: ${error.message}` });
    }
});

module.exports = router;
