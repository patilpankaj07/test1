const router = require("express").Router();

const StudentMarks = require("./model/Subjectschema.js");

router.get("/Pran", (req, res) => {
  try {



    res.status(200).json({ msg: "From Pranav" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server ERROR in Pran" });
  }
});

router.post("/insert", async (req, res) => {
  try {
    const { name, rollNo, wadMarks, ccMarks, dsbdaMarks, cnsMarks, aiMarks } =
      req.body;

    // console.log(req.body);

    const data = await StudentMarks.create({
      name,
      rollNo,
      wadMarks,
      ccMarks,
      dsbdaMarks,
      cnsMarks,
      aiMarks,
    });

    // await data.save();

    res.status(200).json({ msg: "Marks Added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server ERROR in insert" });
  }
});

// Display total count and list all documents
router.get("/list", async (req, res) => {
  try {
    // const count = await StudentMarks.countDocuments();
    const students = await StudentMarks.find();

    // console.log(count, students);

    res.status(200).json({students});
  } catch (err) {
    res.status(500).send("Error listing documents in list");
  }
});

// List names of students who got more than 20 marks in DSBDA
router.get("/dsbda", async (req, res) => {
  try {
    const students = await StudentMarks.find({ dsbdaMarks: { $gt: 20 } });

    // console.log(students);
    const names = students.map((stu) => stu.name);

    res.status(200).json({ names });
  } catch (err) {
    res.status(500).send("Error listing documents in list");
  }
});

// Update marks by 10 for specified students
router.patch('/update/:rollNo', async (req, res) => {
    const { rollNo } = req.params;

    try {

        await StudentMarks.updateOne({ rollNo}, {
            $inc: {
                wadMarks: 10,
                ccMarks: 10,
                dsbdaMarks: 10,
                cnsMarks: 10,
                aiMarks: 10,
            },
        });

        res.status(200).send(`Marks updated for Roll No ${rollNo}`);
    } catch (err) {
        res.status(500).json({msg:'Error updating marks'});
    }
});

// router.patch("/update/:rollNo", async (req, res) => {
//   try {
//     const { rollNo } = req.params;
//     const { subject } = req.query; // Get subject name from query parameter

//     console.log(rollNo,subject);

//     // Check if subject parameter is provided
//     if (!subject) {
//       return res.status(400).send("Subject parameter is required");
//     }

//     const validSubjects = [
//       "wadMarks",
//       "ccMarks",
//       "dsbdaMarks",
//       "cnsMarks",
//       "aiMarks",
//     ];

//     // Check if subject parameter is a valid subject
//     if (!validSubjects.includes(subject)) {
//       return res.status(400).send("Invalid subject");
//     }

//     const updateField = {};
//     updateField[subject] = 10; // Increase marks by 10 for the specified subject

//     await StudentMarks.updateOne({rollNo }, {
//         $inc: updateField,
//     });

//     res.send(`Marks updated for Roll No ${rollNo} in ${subject} by 10`);
//   } catch (err) {
//     res.status(500).send("Error updating marks");
//   }
// });


// List names of students who got more than 20 marks in DSBDA

// List names of students who got more than 25 marks in all subjects


router.get('/allSubjects', async (req, res) => {
    try {
        const students = await StudentMarks.find({
            $and: [
                { wadMarks: { $gt: 25 } },
                { ccMarks: { $gt: 25 } },
                { dsbdaMarks: { $gt: 25 } },
                { cnsMarks: { $gt: 25 } },
                { aiMarks: { $gt: 25 } },
            ],
        });

        const names = students.map(student => student.name);
        res.status(200).json({names});
    } catch (err) {
        res.status(500).send('Error listing students with more than 25 marks in all subjects');
    }
});

router.get('/lessthan', async (req, res) => {
    try {
        const students = await StudentMarks.find({
            $and: [
                { wadMarks: { $lt: 40} },
                { dsbdaMarks: { $lt: 40 } },
                
            ],
        });

        const names = students.map(student => student.name);
        res.status(200).json({names});
    } catch (err) {
        res.status(500).send('Error listing students with more than 25 marks in all subjects');
    }
});


router.delete("/delete/:rollNo",async(req,res)=>{
    try {
        const {rollNo}=req.params;

        console.log(rollNo);

        await StudentMarks.deleteOne({rollNo});

        res.status(200).json({msg:"Done"});
        
    } catch (error) {
        res.status(500).send('Error in deleting')
    }
})

module.exports = router;
