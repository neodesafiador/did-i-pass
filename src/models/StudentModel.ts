const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let subtotal = 0;
  let count = 0;

  for (const assignment of weights.assignmentWeights) {
    subtotal += assignment.weight;
    count += 1;
  }

  return subtotal / count;
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
  if (studentName in students) {
    return undefined; // exit the function immediately
  }

  // return the student's information (their name is the key for 'students')
  return students[studentName];
}

export { students, addStudent, getStudent };
