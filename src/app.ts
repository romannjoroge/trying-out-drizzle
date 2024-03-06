import express from 'express';
const app = express();
import db from './db/queryClient.js';
import { classStudents, classes, students } from './db/schema.js';
import { eq } from 'drizzle-orm';

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/users', async (req, res) => {
    const data = await db.select({
        name: students.name,
        dob: students.dob
    }).from(students);

    return res.json(data);
})

app.post('/users', async (req, res) => {
    let {
        name,
        dob
    } = req.body;

    await db.insert(students).values({
        name,
        dob
    });

    return res.status(201).json({message: "Student Created"});
})

app.post('/class', async (req, res) => {
    let {
        name
    } = req.body;

    await db.insert(classes).values({
        name
    });

    return res.status(201).json({message: "Class Created"});
});

app.post('/assignUser', async (req, res) => {
    let {
        studentid,
        classid
    } = req.body;

    await db.insert(classStudents).values({
        studentId: Number.parseInt(studentid),
        classId: Number.parseInt(classid)
    });

    return res.status(201).json({message: "Assigned Student To Class"});
})

app.get('/studentsClass', async (req, res) => {
    const data = await db.select({
        student: students.name,
        class: classes.name
    }).from(students)
    .leftJoin(classStudents, eq(classStudents.studentId, students.id))
    .leftJoin(classes, eq(classes.id, classStudents.classId));

    return res.json(data);
})


app.get('*', (req, res) => {
    return res.status(500).json({message: "Route Does Not Exist"})
});

app.listen(6500, () => {
    console.log("Server is listening on port 6000...")
})