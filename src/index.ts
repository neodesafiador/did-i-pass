import express, { Express } from 'express';
import { notImplemented } from './controllers/NotImplementedController';
import StudentController from './controllers/StudentController';

const app: Express = express();
const PORT = 8091;

app.post('/api/students', StudentController.getStudent);
app.get('/api/students/:studentName', notImplemented);
app.get('/api/students/:studentName/finalExam', notImplemented);
app.post('/api/students/:studentName/finalExam', notImplemented);
app.post('/api/students/:studentName/grade/:assignmentName', notImplemented);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
