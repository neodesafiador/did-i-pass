const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let total = 0;

  for (const grade of weights.assignmentWeights) {
    total += (grade.grade * grade.weight) / (100 - weights.finalExamWeight);
  }

  return total;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  // the the name is already in `students`
  if (name in students) {
    return false; // exit the function immediately
  }

  // Calculate the student's current average (use the function previously defined)
  const currentAverage = calculateAverage(weights);

  // Create a `Student` object using the `name`, `weights` and `currentAverage`
  const newStudent: Student = { name, weights, currentAverage };

  // Add the new Student to the `students` object. The student's name is the key
  students[name] = newStudent;

  // Finally, return true since the student was added
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // If the student's name is not in 'students'
  if (!(studentName in students)) {
    return undefined; // exit the function immediately
  }

  // return the student's information (their name is the key for 'students')
  return students[studentName];
}

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // TODO: Calculate the final exam score needed to get the targetScore in the class
  let needScore = (100 * targetScore - currentAverage * (100 - finalExamWeight)) / finalExamWeight;
  needScore = Math.floor(needScore * 100) / 100;
  return needScore;
}

export { students, addStudent, getStudent, calculateFinalExamScore };
