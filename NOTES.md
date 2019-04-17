#Notes

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
  