// My solution to "Maximal Square" coding challenge at https://www.coderbyte.com/editor/guest:Maximal%20Square:JavaScript
// Initially had a shorter solution (single loop) but this one would scale better with more data (requires less processing)

function MaximalSquare(strArr) {

    const height = strArr.length;
    const width = strArr[0].length;
    const maxSideLength = (height > width) ? width : height;
    let area = 0;

    function squareFinder(firstRow, firstCol, miniMatrixSize, refArr) {
        let lastRow = firstRow + miniMatrixSize - 1;
        let lastCol = firstCol + miniMatrixSize - 1;
        let biggestArea = 1;
        
        for (let row = firstRow; row <= lastRow; row++) {
            for (let col = firstCol; col <= lastCol; col++) {
                if (refArr[row][col] !== '1') { // found a 0
                    if (row - firstRow >= col - firstCol) { // 0 is on or left of the diagonal -- no bigger square can be found
                        return biggestArea;
                    } else { // 0 is right of diagonal, so maybe bigger square can be found -- shrink mini-matrix accordingly
                        lastRow = lastRow - (lastCol - (col - 1));
                        lastCol = col - 1;
                        if (row === lastRow) { // we've shrunk 'too much' -- no bigger square can be found
                            return biggestArea;    
                        }
                    }
                }
                if (row - firstRow === col - firstCol) { // found a bigger square
                    biggestArea = Math.pow(row - firstRow + 1, 2);
                    if (row === lastRow) { // square is biggest we can find in this mini-matrix
                        return biggestArea;
                    }
                }
            }
        }
    }    
    
    for (let i = 0; i < height; i++) {
        let remainingRows = height - i; // (including this row)
        if (Math.pow(remainingRows, 2) <= area) {
            return area; // can't fit a square bigger than we've already found -- we're done
        }
        for (let j = 0; j < width; j++) {
            let remainingCols = width - j; // (including this column)
            if (Math.pow(remainingCols, 2) <= area) {
                break; // can't fit a square in this row bigger than we've already found, so try next row
            }
            if (strArr[i][j] === '1') {
                let currentMaxSideLength = // sets size of largest square to search for based on what will fit
                    (remainingCols >= maxSideLength && remainingRows >= maxSideLength) ? maxSideLength :
                    (remainingCols > remainingRows) ? remainingRows :
                    remainingCols;
                let currArea = squareFinder(i, j, currentMaxSideLength, strArr);
                area = (currArea > area) ? currArea : area;
                if (area === Math.pow(maxSideLength, 2)) {
                    return area;
                }
            }
        }
    }

    return area; 
}

MaximalSquare(readline());
