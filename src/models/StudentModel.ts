const students: StudentManager = {};

// function calculateAverage(): number {
//   let count = Object.keys(students).length;
//   let total = 0;
//   let average = 0;
//   if (count !== 0) {
//     for (let i = 0; i < count; i += 1){
//       total += students.[i].[currentAverage];
//     }
//     average = total / count;
//   }

//   return average;
// }

function addStudent(): StudentManager {
  return students;
}

// export { calculateAverage, addStudent };
export { addStudent };
