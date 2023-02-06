import { Request, Response } from 'express';
// import { students, addStudent, getStudent } from '../models/StudentModel';
import { students, addStudent } from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  // Assign `req.body` as a `NewStudentRequest`
  const studentData = req.body as NewStudentRequest;

  let subtotal = 0;
  for (const assignment of studentData.weights.assignmentWeights) {
    subtotal += assignment.weight;
  }
  const totalWeights = subtotal + studentData.weights.finalExamWeight;

  if (totalWeights !== 100) {
    res.sendStatus(400);
  } else {
    // Call the `addStudent` function using the student's data
    const didAddStudent = addStudent(studentData);

    // If the student's data was not added successfully
    // Responds with status 409 (This means 409 Conflict)
    if (!didAddStudent) {
      res.sendStatus(409);
    } else {
      // Send status 201 (This means 201 Created)
      res.sendStatus(201);
    }
  }
}

export default { getAllStudents, createNewStudent };
