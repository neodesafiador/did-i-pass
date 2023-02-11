import express, { Express } from 'express';
// import { notImplemented } from './controllers/NotImplementedController';
import StudentController from './controllers/StudentController';

const app: Express = express();
const PORT = 8091;

// Enable JSON Request body parsing
app.use(express.json());

app.get('/api/students', StudentController.getAllStudents);
app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getStudentByName);

app.get('/api/students/:studentName/finalExam', StudentController.getFinalExamScores);
// app.post('/api/students/:studentName/finalExam', notImplemented);
// app.post('/api/students/:studentName/grade/:assignmentName', notImplemented);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
