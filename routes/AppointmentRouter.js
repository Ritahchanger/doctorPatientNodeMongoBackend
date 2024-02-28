const router=require("express").Router();
const Appointment = require("../models/appointments.model");


router.post('/', async (req, res) => {
    try {
        const newAppointment = await Appointment.create(req.body);
        if(!newAppointment) return res.status(400).send({msg:'Failed to create appointment'});
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find({});
        if(!appointments) return res.status(404).send({msg:'appointments not found'});
        res.status(201).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateAppointment = req.body;
      const updatedAppointments = await Appointment.findByIdAndUpdate(id, updateAppointment, {
        new: true,
      });
  
      if (!updatedAppointments) {
        return res.status(404).send({ msg: "User not found" });
      }
  
      return res.status(200).send(updatedAppointments);
    } catch (error) {
      return res
        .status(500)
        .send({ msg: `Error updating user: ${error.message}` });
    }
  });
  
router.delete("/:id",async (req,res)=>{
    try{
        const { id }=req.params;

        const deletedAppointent = await Appointment.findByIdAndDelete(id)

        if (!deletedAppointent) return res.status(404).send({msg:"Appointment not found"});

        return res.status(200).send({msg:'Appointment successfully canceled'});

    }catch(error){
        return res
        .status(500)
        .send({ msg: `Error deleting the appointment: ${error.message}` });
    }
});

  


module.exports=router;