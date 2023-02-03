type CourseGrades = {
  assignmentWeights: number;
  finalExamWeight: number;
};

type CourseGrade = {
  name: string;
  weight: number;
  grade: string;
};

type Student = {
  name: string;
  weights: CourseGrade;
  currentAverage: number;
};

type NewStudentRequest = {
  name: string;
  weights: CourseGrades;
};

type AssignmentGrade = {
  grade: number;
};

type FinalGrade = {
  overallScore: number;
  letterGrade: string;
};

type FinalExamScores = Record<string, number>;
