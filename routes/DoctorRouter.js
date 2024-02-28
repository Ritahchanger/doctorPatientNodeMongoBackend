const router = require("express").Router();
const Doctor = require("../models/doctors.model");

router.post("/", async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    if (!newDoctor) return res.status(400).send({ msg: "Bad request" });
    res.status(200).json(newDoctor);
  } catch (error) {
    res.status(500).send({ msg: `${error.message}` });
  }
});
router.get("/", async (req, res) => {
    try {
      const doctors = await Doctor.find({});
      if (!doctors) return res.status(400).send({ msg: "Bad request" });
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).send({ msg: `${error.message}` });
    }
 });

 router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateDoctors = req.body;
      const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateDoctors, {
        new: true,
      });
  
      if (!updatedDoctor) {
        return res.status(404).send({ msg: "User not found" });
      }
  
      return res.status(200).send(updatedDoctor);
    } catch (error) {
      return res
        .status(500)
        .send({ msg: `Error updating user: ${error.message}` });
    }
  });

  router.delete("/:id",async (req,res)=>{
    try{
        const { id }=req.params;

        const deletedDoctor = await Doctor.findByIdAndDelete(id)

        if (!deletedDoctor) return res.status(404).send({msg:"Doctor not found"});

        return res.status(200).send({msg:'Doctor deleted successfully'});

    }catch(error){
        return res
        .status(500)
        .send({ msg: `Error deleting  doctor: ${error.message}` });
    }
});

  
  


module.exports = router;
