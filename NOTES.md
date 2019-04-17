# Notes -  This sprint makes me want to play chess.

## Time complexity
  Worst case time complexty is factorial because searching through every possible placement of a queen or rook
  would consider placement 1 to be (on a 9 square board)
    first placement in one of nine possible squares,
    second placement in one of eight possible squares
    third placement in one of seven possible square
    ...
  ninth placemenet in one possible square.

  It would generate a 9! number of possible placements for each second placement.
  
  Then -> third placement would be in one of each possible unoccupied square for every possible first and second
    possible placement combination.

  Third queen/ rook placement would be:
    First in one of seven possible squares for each combination of first a second placement
    Second in one of six possible squares for each combination of first and second placement
    ...
    Seventh in one possible square for each combination of first and second placements.
  
  ...On and on for every new piece added to the board with an increasing n-size of board requiring n-number of queens or rooks.

## Considerations
  All board sizes may not have a n-queens solution:
  All board sizes may not have a n-rooks solution:

  Input will be a number (n);

  Problem is to determine whether a n-number of rooks/ queens can fit on a 'n by n' square chess board without any attack conflicts
    - n-rooks will never have to consider diagonal conflicts, only diagonal and vertical conflicts
    - n-queens has to consider horizontal, vertical and diagonal conflicts.

  Ignoring optomization, this is a proportional matrix algorithm issue.
  I'm going to be working with a data structure that is a nested array of:
    - n-arrays (each representing a row)
    - n-length arrays (each index representing a square in a board column)

  board = [
    [0, 1, 2, 3], // row 0
    [0, 1, 2, 3], // row 1
    [0, 1, 2, 3], // row 2
    [0, 1, 2, 3]  // row 3
  ];

  Every value at index 0 === column 0
  Every value at index 1 === column 1
  Every value at index 2 === column 2
  Every value at index 3 === column 3
  
  ## Considerations
    n-queens(4) solution is extremely similar to n-queens(5).
      > the main differenect is that the 5th queen appears in a corner located in the new row-column added

      Qusetion: Will n-queen solutions, where n is an even number, ever have a queen placed in the corner?
        > I don't think so. I believe that only odd-numbered n for n-queens can have a queen placed in the corner.
        > However, this will have to be confirmed.
        