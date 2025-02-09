const words = [
  { word: "TỰHÀO", row: 6, col: 9, direction: "horizontal" },
  { word: "TRUYỀNTHỐNG", row: 4, col: 1, direction: "horizontal" },
  { word: "QUÊHƯƠNG", row: 14, col: 6, direction: "horizontal" },
  { word: "PHÁTHUY", row: 2, col: 7, direction: "horizontal" },
  { word: "GÌNGIỮ", row: 0, col: 14, direction: "vertical" },
  { word: "CHĂMCHỈ", row: 5, col: 2, direction: "diagonal" },
  { word: "CẦNCÙ", row: 6, col: 6, direction: "diagonal" },
  { word: "HIẾUHỌC", row: 6, col: 11, direction: "vertical" },
  { word: "LỄHỘI", row: 12, col: 3, direction: "horizontal" },
  { word: "NGHỀTRUYỀNTHỐNG", row: 0, col: 1, direction: "vertical" }
];

const matrixSize = 15;
const matrix = Array.from({ length: matrixSize }, () => Array.from({ length: matrixSize }, () => ''));

// Hàm điền từ vào ma trận tại vị trí cố định
function fillWords() {
  words.forEach(({ word, row, col, direction }) => {
    for (let i = 0; i < word.length; i++) {
      if (direction === "horizontal") {
        matrix[row][col + i] = word[i];
      } else if (direction === "vertical") {
        matrix[row + i][col] = word[i];
      } else if (direction === "diagonal") {
        matrix[row + i][col + i] = word[i];
      }
    }
  });

  // Điền các ô trống bằng chữ cái ngẫu nhiên
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (matrix[i][j] === '') {
        matrix[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
      }
    }
  }
}

// Hàm hiển thị ma trận lên trang web
function renderMatrix() {
  const matrixElement = document.getElementById('matrix');
  matrixElement.innerHTML = '';

  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = matrix[i][j];
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleCellClick);
      matrixElement.appendChild(cell);
    }
  }
}

// Hàm xử lý khi người dùng nhấn vào một ô
function handleCellClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  words.forEach(({ word, row: wordRow, col: wordCol, direction }) => {
    if (
      (direction === "horizontal" && row === wordRow && col === wordCol) ||
      (direction === "vertical" && col === wordCol && row === wordRow) ||
      (direction === "diagonal" && row - wordRow === col - wordCol && row === wordRow)
    ) {
      highlightWord(wordRow, wordCol, direction, word.length);
    }
  });
}

// Hàm tô màu các ô chứa từ
function highlightWord(startRow, startCol, direction, length) {
  const cells = document.querySelectorAll('.cell');
  for (let i = 0; i < length; i++) {
    let row = startRow;
    let col = startCol;
    if (direction === "horizontal") {
      col += i;
    } else if (direction === "vertical") {
      row += i;
    } else if (direction === "diagonal") {
      row += i;
      col += i;
    }
    const cell = Array.from(cells).find(cell =>
      parseInt(cell.dataset.row) === row && parseInt(cell.dataset.col) === col
    );
    if (cell) {
      cell.classList.add('highlight');
    }
  }
}

// Khởi tạo ma trận và hiển thị
fillWords();
renderMatrix();