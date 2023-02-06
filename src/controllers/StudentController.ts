import { Request, Response } from 'express';
// import { students, addStudent, getStudent } from '../models/StudentModel';
import { students, addStudent } from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  // Assign `req.body` as a `NewStudentRequest`
  const studentData = req.body as NewStudentRequest;

  // Call the `addStudent` function using the student's data
  const didAddStudent = addStudent(studentData);

  let subtotal = 0;
  for (const assignment of studentData.weights.assignmentWeights) {
    subtotal += assignment.weight;
  }
  const totalWeights = subtotal + studentData.weights.finalExamWeight;
  if (totalWeights !== 100) {
    res.sendStatus(400);
    return;
  }

  // If the student's data was not added successfully
  // Responds with status 409 (This means 409 Conflict)
  // return from the function
  if (!didAddStudent) {
    res.sendStatus(409);
    return;
  }

  // Send status 201 (This means 201 Created)
  res.sendStatus(201);
}

export default { getAllStudents, createNewStudent };
