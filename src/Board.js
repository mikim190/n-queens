// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
    
     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      //bind a variable to the invocation of this.rows
      let matrix = this.rows();
      //isolate target row using provided rowIndex
      var targetRow = matrix[rowIndex];
      let counter = 0;
      //iterate over target row and detect the conflicts
      for (let i = 0; i < targetRow.length; i++) {
        if (targetRow[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      //bind a variable to the invocation of this.rows
      var matrix = this.rows();
      for (let i = 0; i < matrix.length; i++) {
        var counter = 0;
        var currentRow = matrix[i];
        for (let j = 0; j < currentRow.length; j++) {
          if (currentRow[j] === 1) {
            counter++;
          }
        }
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      let matrix = this.rows();
      //isolate target row using provided rowIndex
      let counter = 0;
      for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][colIndex] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false;

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      let matrix = this.rows();
      for (let i = 0; i < matrix.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) { // j
      let matrix = this.rows();
      let counter = 0; // declare counter
      let row;
      let col;
      if (majorDiagonalColumnIndexAtFirstRow >= 0) { // if (majorDiagonalColumnIndexAtFirstRow > 0) {
        row = 0; // start at [0][input]
        col = majorDiagonalColumnIndexAtFirstRow;
      } else {
        row = majorDiagonalColumnIndexAtFirstRow * (-1); //   // start at [input * (-1)][0];
        col = 0; // }
      }
      const loops = matrix.length - (row + col);
      for (let i = 0; i < loops; i++) { // loop for n - (row + column) times
        if (matrix[row][col]) { // if start value [row + 1][col + 1] === 1
          counter++;
        }
        row++;
        col++;
      }
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      let matrix = this.rows(); // declare matrix
      for (let i = 0; i < matrix.length; i++) {  // for loop i - row
        for (let j = 0; j < matrix.length; j++) { // for loop j - column
          if (matrix[i][j]) { // if matrix[i][j] === truthy 
            if (this.hasMajorDiagonalConflictAt(j - i)) {
              return true;
            }
          }
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      let matrix = this.rows();
      let counter = 0;
      let row = 0;
      let col = minorDiagonalColumnIndexAtFirstRow;
      for (let i = 0; i < matrix.length; i++) {
        if (matrix[row][col]) {
          counter++
        }
        row++;
        col--;
      }
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      let matrix = this.rows();
      for (let i = 0; i < matrix.length; i++) {  // for loop over rows
        for (let j = 0; j < matrix.length; j++) { // for loop over columns
          if (matrix[i][j]) {  // if matrix[row][col] === 1
            if (this.hasMinorDiagonalConflictAt(i + j)) {
              return true;
            }
          }
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
