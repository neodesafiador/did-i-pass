import { Request, Response } from 'express';
import { students, addStudent, getStudent, calculateFinalExamScore } from '../models/StudentModel';

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

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParam;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404); // 404 Not Found - student was not in the dataset
  }

  res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParam;
  // TODO: Get the student's data from the dataset
  const student = getStudent(studentName);

  const finalData: FinalExamScores = {
    neededForA: 0,
    neededForB: 0,
    neededForC: 0,
    neededForD: 0,
  };

  if (!student) {
    res.sendStatus(404);
    return;
  }

  // TODO: Get the current average and weights from the student's data
  const currAverage = student.currentAverage;
  const weightData = student.weights.finalExamWeight;

  // TODO: Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  finalData.neededForA = calculateFinalExamScore(currAverage, weightData, 90);
  // TODO: Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  finalData.neededForB = calculateFinalExamScore(currAverage, weightData, 80);
  // TODO: Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  finalData.neededForC = calculateFinalExamScore(currAverage, weightData, 70);
  // TODO: Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  finalData.neededForD = calculateFinalExamScore(currAverage, weightData, 60);

  // TODO: Send a JSON response with an object containing the grades needed for an A through D
  res.json(finalData);
}

export default { getAllStudents, createNewStudent, getStudentByName, getFinalExamScores };
