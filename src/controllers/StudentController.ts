import { Request, Response } from 'express';
import {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  const studentData = req.body as NewStudentRequest;

  let subtotal = 0;
  for (const assignment of studentData.weights.assignmentWeights) {
    subtotal += assignment.weight;
  }
  const totalWeights = subtotal + studentData.weights.finalExamWeight;

  if (totalWeights !== 100) {
    res.sendStatus(400);
  } else {
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
  const { studentName } = req.params as StudentNameParam;
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

  const currAverage = student.currentAverage;
  const weightData = student.weights.finalExamWeight;

  // Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  finalData.neededForA = calculateFinalExamScore(currAverage, weightData, 90);
  // Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  finalData.neededForB = calculateFinalExamScore(currAverage, weightData, 80);
  // Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  finalData.neededForC = calculateFinalExamScore(currAverage, weightData, 70);
  // Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  finalData.neededForD = calculateFinalExamScore(currAverage, weightData, 60);

  // Send a JSON response with an object containing the grades needed for an A through D
  res.json(finalData);
}

function calcFinalScore(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParam;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404);
    return;
  }

  const gradeData = req.body as AssignmentGrade;
  const currAverage = student.currentAverage;
  const weightData = student.weights.finalExamWeight;

  // Calculate the final score that would receive using their current average and the hypothetical final exam grade.
  const overallScore = (currAverage * (100 - weightData) + gradeData.grade * weightData) / 100;
  // Get the letter grade they would receive given this score
  const letterGrade = getLetterGrade(overallScore);

  // Send back a JSON response containing their `overallScore` and `letterGrade.
  res.json({ overallScore, letterGrade });
}

function updateGrade(req: Request, res: Response): void {
  const { studentName, assignmentName } = req.params as GradeUpdateParams;
  const gradeData = req.body as AssignmentGrade;

  // Update the student's grade
  const updated = updateStudentGrade(studentName, assignmentName, gradeData.grade);

  // If the update did not complete (this means the student or the assignment wasn't found)
  if (!updated) {
    res.sendStatus(404);
  }

  // Respond with status 200 OK
  res.sendStatus(200);
}

export default {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
