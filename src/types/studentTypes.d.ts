type CourseGrades = {
  assignmentWeights: array<CourseGrade>;
  finalExamWeight: number;
};

type CourseGrade = {
  name: string;
  weight: number;
  grade: number;
};

type Student = {
  name: string;
  weights: CourseGrades;
  currentAverage: number;
};

type StudentManager = Record<string, Student>;

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

type StudentNameParam = {
  studentName: string;
};
