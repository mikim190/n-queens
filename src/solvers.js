/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  let solution = undefined; //fixme
  let board = new Board({ n: n });
  let matrix = board.rows();
  let counter = n;
  for (let i = 0; i < n; i++) { // row loop
    // if no row conflict
    for (let j = 0; j < n; j++) { // col loop
      debugger;
      board.attributes[i][j] = 1;
      matrix[i][j] = 1;
      counter--;
      if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
        board.attributes[i][j] = 0;
        matrix[i][j] = 0;
        counter++;
      }
    }
  }
  if (counter === 0) {
    solution = matrix;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0; //fixme
  let board = arguments[1] || new Board({ n: n }); // make matrix = args[1] || new matrix
  let row = arguments[2] || 0; // var row = args[2] || 0;
  let col = arguments[3] || 0; // var col = args[3] || 0;
  for (let i = 0; i < n; i++) { // set a loop for n times
    board.attributes[row][col] = 1; // set a value
    if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(col)) { // if matrix with set value has no conflicts
      if (row < n - 1) {
        solutionCount += countNRooksSolutions(n, board, row + 1, 0); // recursively call this function
      } else {
        solutionCount++;
      }
    }
    board.attributes[row][col] = 0; // when callback finishes, unset value
    col++;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
