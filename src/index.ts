import express, { Express } from 'express';
import chalk from 'chalk';
import { notImplemented } from './controllers/NotImplementedController';
import StudentController from './controllers/StudentController';

const app: Express = express();
const PORT = 8091;

// Enable JSON Request body parsing
app.use(express.json());

app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getAllStudents);
app.get('/api/students/:studentName/finalExam', notImplemented);
app.post('/api/students/:studentName/finalExam', notImplemented);
app.post('/api/students/:studentName/grade/:assignmentName', notImplemented);

app.listen(PORT, () => {
  console.log(`Server listening on ${chalk.underline.cyanBright(`http://localhost:${PORT}`)}`);
});
