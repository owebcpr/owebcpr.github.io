// ============================================================
// 1. ВКЛАДКИ
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const target = document.getElementById(this.dataset.tab);
            if (target) target.classList.add('active');
        });
    });

    // ============================================================
    // 2. ЗАГАДКИ
    // ============================================================
    document.querySelectorAll('.puzzle-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            if (!answer) return;

            const isHidden = answer.style.display === 'none' || !answer.style.display;
            answer.style.display = isHidden ? 'block' : 'none';
            this.textContent = isHidden ? 'Сховати відповідь' : 'Показати відповідь';
        });
    });

    // ============================================================
    // 3. ШАХОВИЙ ТРЕНАЖЕР 
    // ============================================================
    const PIECES = {
        icons: {
            'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
            'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
        },
        names: {
            'K': '♔ Білий король', 'Q': '♕ Білий ферзь', 'R': '♖ Біла тура',
            'B': '♗ Білий слон', 'N': '♘ Білий кінь', 'P': '♙ Білий пішак',
            'k': '♚ Чорний король', 'q': '♛ Чорний ферзь', 'r': '♜ Чорна тура',
            'b': '♝ Чорний слон', 'n': '♞ Чорний кінь', 'p': '♟ Чорний пішак'
        }
    };

    // ЗАДАЧІ 
    const chessTasks = [
        {
            id: 1,
            level: '⭐ Легкий (Рівень 1)',
            name: 'Мат в 1 хід для новачків',
            // Б: Кg1, Лe3, Сb1, п. a2,c3,d2,f2,g2,h3 | Ч: Кg8, Лa6, п. a7,b6,c6,f7,g7,h6
            fen: '6k1/p4pp1/rp5p/8/8/2P1R2P/P2P1PP1/1B4K1 w - - 0 1',
            solution: { piece: 'R', from: 'e3', to: 'e8' },
            hint: 'Біла тура має напасти на короля по останній горизонталі.',
            description: '♖ Тура e3 → e8# (Мат)',
            explanation: 'Тура на e8 атакує короля. Власні пішаки заважають чорному королю втекти (мат на останній горизонталі).',
            moves: []
        },
        {
            id: 2,
            level: '⭐⭐ Середній (Рівень 2)',
            name: 'Мат в 2 ходи',
            // Б: Кh1, Фd1, Кb1, Лe4, п. b2,c2,d2,g2,h2 | Ч: Кa8, Фd6, Кe8, Лh7, п. a7,b7,c7,g7,g6
            fen: 'k3n3/ppp3pr/3q2p1/8/4R3/8/1PPP2PP/1N1Q3K w - - 0 1',
            solution: { piece: 'R', from: 'e4', to: 'e8' },
            hint: 'Пожертвуйте туру на e8, забравши коня, а потім заберіть захисника.',
            description: 'Заберіть коня турою на e8!',
            explanation: 'Після взяття ферзя чорні не можуть захиститися від шаху — це мат!',
            moves: [
                { from: 'e4', to: 'e8', piece: 'R', comment: 'Біла тура б\'є коня з шахом!' },
                { from: 'd6', to: 'd8', piece: 'q', comment: 'Чорний ферзь вимушено стає на захист' },
                { from: 'e8', to: 'd8', piece: 'R', comment: 'Тура б\'є ферзя і ставить МАТ! 🏆' }
            ]
        },
        {
            id: 3,
            level: '⭐⭐⭐ Складний (Рівень 3)',
            name: 'Мат в 3 ходи',
            // Б: Кe6, Лa7 | Ч: Кg8
            fen: '6k1/R7/4K3/8/8/8/8/8 w - - 0 1',
            solution: { piece: 'K', from: 'e6', to: 'f6' },
            hint: 'Тисніть білим королем, обмежуючи простір суперника.',
            description: 'Почніть маневр королем на f6.',
            explanation: 'Білий король допомагає турі затиснути чорного короля у кутку до повного мату.',
            moves: [
                { from: 'e6', to: 'f6', piece: 'K', comment: 'Білий король іде на f6, відтісняючи ворога' },
                { from: 'g8', to: 'h8', piece: 'k', comment: 'Чорний король ховається в кут' },
                { from: 'f6', to: 'g6', piece: 'K', comment: 'Білий король стає на g6, створюючи пастку' },
                { from: 'h8', to: 'g8', piece: 'k', comment: 'Чорний король змушений повернутися на g8' },
                { from: 'a7', to: 'a8', piece: 'R', comment: 'Тура йде на a8 — МАТ! 🏆' }
            ]
        }
    ];

    // DOM-посилання
    const $ = (selector, ctx = document) => ctx.querySelector(selector);
    const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

    const chessDOM = {
        board: $('#chessBoard'),
        taskNum: $('#taskNum'),
        taskLevel: $('#taskLevel'),
        taskName: $('#taskName'),
        totalTasks: $('#totalTasks'),
        taskText: $('#chessTaskText'),
        feedback: $('#chessFeedback'),
        hintBtn: $('#hintChessBtn'),
        nextBtn: $('#nextChessBtn'),
        taskHint: $('#taskHint'),
        moveHistory: $('#moveHistory')
    };

    let currentTask = 0;
    let selected = { cell: null, piece: null };
    let moveIndex = 0;
    let gameState = 'waiting';

    // === Допоміжні функції ===
    const getPieceChar = (cell, fen) => {
        const [boardPart] = fen.split(' ');
        const rows = boardPart.split('/');
        const letters = 'abcdefgh';
        const col = letters.indexOf(cell[0]);
        const row = parseInt(cell[1]) - 1;
        const boardRow = rows[7 - row];
        let idx = 0;

        for (const char of boardRow) {
            if (isNaN(char)) {
                if (idx === col) return char;
                idx++;
            } else {
                idx += parseInt(char);
                if (idx > col) return ' ';
            }
        }
        return ' ';
    };

    const getPieceIcon = (piece) => PIECES.icons[piece] || '';
    const getPieceName = (piece) => PIECES.names[piece] || piece;

    // === Оновлення дошки ===
    const updateBoard = (fen) => {
        const board = chessDOM.board;
        board.innerHTML = '';

        const letters = 'abcdefgh';
        const table = document.createElement('table');

        // Букви зверху
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th'));
        for (let i = 0; i < 8; i++) {
            const th = document.createElement('th');
            th.textContent = letters[i].toUpperCase();
            Object.assign(th.style, { fontWeight: 'bold', fontSize: '13px', padding: '3px', color: '#555' });
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        // Клітинки дошки
        for (let row = 8; row >= 1; row--) {
            const tr = document.createElement('tr');

            const rowLabel = document.createElement('th');
            rowLabel.textContent = row;
            Object.assign(rowLabel.style, { fontWeight: 'bold', fontSize: '13px', padding: '3px', color: '#555' });
            tr.appendChild(rowLabel);

            for (let col = 0; col < 8; col++) {
                const cell = letters[col] + row;
                const td = document.createElement('td');
                td.dataset.cell = cell;

                const piece = getPieceChar(cell, fen);
                td.textContent = getPieceIcon(piece);
                td.dataset.piece = piece;

                const isLight = (row + col) % 2 === 0;
                const bgColor = isLight ? '#f0d9b5' : '#b58863';
                const isWhite = piece === piece.toUpperCase() && piece !== ' ';

                Object.assign(td.style, {
                    backgroundColor: bgColor,
                    color: isWhite ? '#fff' : (piece !== ' ' ? '#1a1a1a' : 'inherit'),
                    textShadow: isWhite ? '0 1px 3px rgba(0,0,0,0.6)' : (piece !== ' ' ? '0 1px 2px rgba(255,255,255,0.3)' : 'none')
                });

                // Додаємо класи для стилізації з вашого CSS
                if (selected.cell === cell) {
                    td.classList.add('selected');
                }

                const coord = document.createElement('span');
                coord.textContent = cell;
                Object.assign(coord.style, {
                    position: 'absolute', bottom: '2px', right: '4px', fontSize: '8px',
                    color: isLight ? '#7f6b4a' : '#e8d5b5', opacity: '0.4', pointerEvents: 'none'
                });
                td.appendChild(coord);

                td.addEventListener('click', () => handleCellClick(td));
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        // Букви знизу
        const footerRow = document.createElement('tr');
        footerRow.appendChild(document.createElement('th'));
        for (let i = 0; i < 8; i++) {
            const th = document.createElement('th');
            th.textContent = letters[i].toUpperCase();
            Object.assign(th.style, { fontWeight: 'bold', fontSize: '13px', padding: '3px', color: '#555' });
            headerRow.appendChild(th);
            footerRow.appendChild(th);
        }
        table.appendChild(footerRow);
        board.appendChild(table);
    };

    // === Рендер задачі ===
    const renderBoard = (taskIndex) => {
        const task = chessTasks[taskIndex];
        moveIndex = 0;
        gameState = 'waiting';

        chessDOM.taskNum.textContent = taskIndex + 1;
        chessDOM.taskLevel.textContent = task.level;
        chessDOM.taskName.textContent = task.name;
        chessDOM.totalTasks.textContent = chessTasks.length;

        chessDOM.hintBtn.textContent = '💡 Підказка';
        chessDOM.hintBtn.style.background = '#f39c12';
        chessDOM.hintBtn.disabled = false;

        const maxMoves = task.moves.length > 0 ? Math.ceil(task.moves.length / 2) : 1;
        chessDOM.taskText.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
                <span style="background:#f0f7fc; padding:4px 12px; border-radius:20px; font-size:0.9rem;">${task.level}</span>
                <span style="background:#f0f7fc; padding:4px 12px; border-radius:20px; font-size:0.9rem;">${task.name}</span>
            </div>
            <div style="font-size:1.2rem; font-weight:bold; color:#1e5f7a;">
                🎯 Завдання: Постав мат у ${maxMoves} ${maxMoves === 1 ? 'хід' : 'ходи'}!
            </div>
            <div id="taskHint" style="font-size:0.9rem; color:#7f8c8d; margin-top:8px; display:none;">
                💡 Підказка: ${task.hint}
            </div>
        `;

        chessDOM.taskHint = document.getElementById('taskHint');
        chessDOM.feedback.textContent = '';
        chessDOM.feedback.className = 'quiz-feedback';
        chessDOM.nextBtn.style.display = 'none';
        chessDOM.moveHistory.innerHTML = '<div style="text-align:center; color:#999; font-size:0.85rem;">📝 Історія ходів</div>';
        selected.cell = null;
        selected.piece = null;

        updateBoard(task.fen);
    };

    // === Розрахунок нового FEN при ході ===
    const makeMove = (from, to, piece, comment) => {
        const task = chessTasks[currentTask];
        let fen = task.fen;
        const parts = fen.split(' ');
        let boardPart = parts[0];
        const rows = boardPart.split('/');
        const letters = 'abcdefgh';

        let fromRow = parseInt(from[1]) - 1;
        let fromCol = letters.indexOf(from[0]);
        let toRow = parseInt(to[1]) - 1;
        let toCol = letters.indexOf(to[0]);

        let boardArray = [];
        for (let r = 7; r >= 0; r--) {
            let row = [];
            for (const char of rows[7 - r]) {
                if (isNaN(char)) {
                    row.push(char);
                } else {
                    for (let i = 0; i < parseInt(char); i++) row.push(' ');
                }
            }
            boardArray.push(row);
        }

        const movingPiece = boardArray[7 - fromRow][fromCol];
        boardArray[7 - fromRow][fromCol] = ' ';
        boardArray[7 - toRow][toCol] = movingPiece; // Затирає фігуру, яку з'їли

        let newRows = [];
        for (let r = 0; r < 8; r++) {
            let rowStr = '';
            let empty = 0;
            for (let c = 0; c < 8; c++) {
                if (boardArray[r][c] === ' ') {
                    empty++;
                } else {
                    if (empty > 0) {
                        rowStr += empty;
                        empty = 0;
                    }
                    rowStr += boardArray[r][c];
                }
            }
            if (empty > 0) rowStr += empty;
            newRows.push(rowStr);
        }

        parts[0] = newRows.join('/');
        const newFen = parts.join(' ');
        task.fen = newFen;

        updateBoard(newFen);

        // Додавання до історії ходів
        const history = chessDOM.moveHistory;
        const moveEntry = document.createElement('div');
        moveEntry.style.cssText = `
            padding: 6px 12px; margin: 4px 0;
            background: ${piece === piece.toUpperCase() ? '#e3f2fd' : '#fce4ec'};
            border-radius: 8px; font-size: 0.9rem; animation: fadeIn 0.3s ease;
        `;
        moveEntry.innerHTML = `${getPieceIcon(piece)} <strong>${from} → ${to}</strong> <span style="color:#555; font-size:0.85rem;">${comment || ''}</span>`;
        history.appendChild(moveEntry);
        history.scrollTop = history.scrollHeight;
    };

    // === Обробка кліку клітинки дошки ===
    const handleCellClick = (td) => {
        const task = chessTasks[currentTask];
        const feedback = chessDOM.feedback;
        const cell = td.dataset.cell;
        const piece = td.dataset.piece || ' ';

        if (gameState === 'finished') return;

        if (gameState === 'computerMove') {
            feedback.innerHTML = '⏳ Зачекайте, чорні роблять хід...';
            feedback.style.color = '#f39c12';
            return;
        }

        // Рівень 1 (Мат в 1 хід)
        if (task.moves.length === 0) {
            handleSimpleTask(td, task, feedback);
            return;
        }

        // Рівні 2 та 3 (Багатоходівки)
        handleMultiMoveTask(td, task, feedback);
    };

    // Логіка для 1 задачі
    const handleSimpleTask = (td, task, feedback) => {
        const cell = td.dataset.cell;
        const piece = td.dataset.piece || ' ';
        const solution = task.solution;

        if (selected.cell === cell) {
            selected.cell = null; selected.piece = null;
            updateBoard(task.fen);
            return;
        }

        if (piece !== ' ' && piece === piece.toUpperCase()) {
            selected.cell = cell; selected.piece = piece;
            updateBoard(task.fen);
            return;
        }

        if (selected.cell) {
            if (selected.cell === solution.from && cell === solution.to) {
                makeMove(solution.from, solution.to, solution.piece, task.description);
                feedback.innerHTML = `🎉 <strong>Правильно!</strong> Мат поставлено!<br><span style="font-size:0.9rem; color:#555;">${task.explanation}</span>`;
                feedback.style.color = '#27ae60';
                gameState = 'finished';
                chessDOM.nextBtn.style.display = 'inline-block';
            } else {
                feedback.innerHTML = `❌ Неправильний хід. Спробуйте ще раз!`;
                feedback.style.color = '#e74c3c';
                selected.cell = null; selected.piece = null;
                updateBoard(task.fen);
            }
        }
    };

    // Логіка для 2 та 3 задач
    const handleMultiMoveTask = (td, task, feedback) => {
        const cell = td.dataset.cell;
        const piece = td.dataset.piece || ' ';
        const currentMove = task.moves[moveIndex];

        if (selected.cell === cell) {
            selected.cell = null; selected.piece = null;
            updateBoard(task.fen);
            return;
        }

        // Гравець вибирає білу фігуру
        if (piece !== ' ' && piece === piece.toUpperCase()) {
            selected.cell = cell; selected.piece = piece;
            updateBoard(task.fen);
            return;
        }

        // Гравець робить хід
        if (selected.cell) {
            if (selected.cell === currentMove.from && cell === currentMove.to) {
                makeMove(currentMove.from, currentMove.to, currentMove.piece, currentMove.comment);
                moveIndex++;
                selected.cell = null; selected.piece = null;

                if (moveIndex >= task.moves.length) {
                    gameState = 'finished';
                    feedback.innerHTML = `🎉 <strong>Блискуче!</strong> Останній хід зроблено. ${task.explanation}`;
                    feedback.style.color = '#27ae60';
                    chessDOM.nextBtn.style.display = 'inline-block';
                } else {
                    // Передаємо хід авто-комп'ютеру (чорним)
                    setTimeout(() => makeComputerMove(), 700);
                }
            } else {
                feedback.innerHTML = `❌ Не туди! Це не найкращий варіант ходу.`;
                feedback.style.color = '#e74c3c';
                selected.cell = null; selected.piece = null;
                updateBoard(task.fen);
            }
        }
    };

    // Авто-хід чорних
    const makeComputerMove = () => {
        const task = chessTasks[currentTask];
        const currentMove = task.moves[moveIndex];

        gameState = 'computerMove';
        makeMove(currentMove.from, currentMove.to, currentMove.piece, currentMove.comment);
        moveIndex++;

        gameState = 'waiting';
        chessDOM.feedback.innerHTML = `🎯 Ваш хід! Захистіть перевагу.`;
        chessDOM.feedback.style.color = '#2c3e50';
    };

    // Кнопка підказки
    chessDOM.hintBtn?.addEventListener('click', function () {
        const task = chessTasks[currentTask];
        if (chessDOM.taskHint) chessDOM.taskHint.style.display = 'block';

        this.textContent = '💡 Підказка відкрита';
        this.style.background = '#7f8c8d';
        this.disabled = true;

        const currentMove = task.moves.length > 0 ? task.moves[moveIndex] : task.solution;
        chessDOM.board.querySelectorAll('td').forEach(td => {
            if (td.dataset.cell === currentMove.from) {
                td.style.boxShadow = 'inset 0 0 0 4px #f39c12';
            }
        });
    });

    // Кнопка наступної задачі
    chessDOM.nextBtn?.addEventListener('click', () => {
        if (currentTask < chessTasks.length - 1) {
            currentTask++;
            renderBoard(currentTask);
        } else {
            chessDOM.feedback.innerHTML = '🏆 <strong>Чудово!</strong> Ви успішно пройшли всі 3 рівні шахового тренажера!';
            chessDOM.feedback.style.color = '#27ae60';
            chessDOM.nextBtn.style.display = 'none';
        }
    });

    // Старт
    renderBoard(0);
    // ============================================================
    // ============================================================
    // 4. ХРЕСТИКИ-НОЛІКИ
    // ============================================================
    // ============================================================
    const tttDOM = {
        board: document.getElementById('tttBoard'),
        status: document.getElementById('tttStatus'),
        scoreX: document.getElementById('scoreX'),
        scoreO: document.getElementById('scoreO'),
        scoreDraw: document.getElementById('scoreDraw'),
        resetBtn: document.getElementById('tttReset'),
        mode2Btn: document.getElementById('tttMode2'),
        mode1Btn: document.getElementById('tttMode1'),
        diffBlock: document.getElementById('tttDifficultyBlock'),
        diffEasyBtn: document.getElementById('tttDiffEasy'),
        diffSmartBtn: document.getElementById('tttDiffSmart'),
        modal: document.getElementById('tttModal'),
        modalTitle: document.getElementById('tttModalTitle'),
        modalText: document.getElementById('tttModalText'),
        modalClose: document.getElementById('tttModalClose')
    };

    let tttState = {
        board: Array(9).fill(''),
        currentPlayer: 'X',
        gameOver: false,
        winner: null,
        mode: 2, // 1 - против бота, 2 - на одном экране
        difficulty: 'smart', // 'easy' или 'smart'
        scores: { X: 0, O: 0, draw: 0 }
    };

    const WIN_PATTERNS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const renderTTT = () => {
        const { board, currentPlayer, gameOver, winner, scores, mode } = tttState;

        tttDOM.board.innerHTML = '';
        board.forEach((cell, index) => {
            const div = document.createElement('div');
            div.className = 'ttt-cell';
            div.textContent = cell;

            if (cell === 'X') div.classList.add('x-color');
            if (cell === 'O') div.classList.add('o-color');

            div.dataset.index = index;
            div.addEventListener('click', () => tttMove(index));
            tttDOM.board.appendChild(div);
        });

        if (tttDOM.diffBlock) {
            tttDOM.diffBlock.style.display = mode === 1 ? 'flex' : 'none';
        }

        if (gameOver) {
            if (winner === 'draw') {
                tttDOM.status.textContent = '🤝 Нічия!';
            } else {
                tttDOM.status.textContent = `🏆 Переміг ${winner}!`;
            }
        } else {
            tttDOM.status.textContent = mode === 1 && currentPlayer === 'O'
                ? '🤖 Комп\'ютер думає...'
                : `Хід гравця ${currentPlayer}`;
        }

        tttDOM.scoreX.textContent = scores.X;
        tttDOM.scoreO.textContent = scores.O;
        tttDOM.scoreDraw.textContent = scores.draw;
    };

    const showModal = (title, text) => {
        if (!tttDOM.modal) return;
        tttDOM.modalTitle.textContent = title;
        tttDOM.modalText.textContent = text;
        tttDOM.modal.style.display = 'flex';
    };

    const hideModal = () => {
        if (tttDOM.modal) tttDOM.modal.style.display = 'none';
    };

    const tttCheckWin = (boardState, player) => {
        return WIN_PATTERNS.some(pattern =>
            pattern.every(i => boardState[i] === player)
        );
    };

    const tttMove = (index) => {
        const { board, currentPlayer, gameOver, mode } = tttState;
        if (gameOver || board[index] !== '') return;

        board[index] = currentPlayer;

        // Победа
        if (tttCheckWin(board, currentPlayer)) {
            tttState.scores[currentPlayer]++;
            tttState.winner = currentPlayer;
            tttState.gameOver = true;
            renderTTT();

            setTimeout(() => {
                if (mode === 1) {
                    if (currentPlayer === 'X') {
                        showModal('🎉 Вітаємо з перемогою!', 'Ти переміг комп\'ютера! Блискуча гра!');
                    } else {
                        showModal('🤖 Комп\'ютер переміг!', 'Він виявився уважнішим! Спробуй ще раз!');
                    }
                } else {
                    showModal('🏆 Перемога!', `Гравець ${currentPlayer} переміг у цій партії!`);
                }
            }, 300);
            return;
        }

        // Ничья
        if (!board.includes('')) {
            tttState.scores.draw++;
            tttState.winner = 'draw';
            tttState.gameOver = true;
            renderTTT();

            setTimeout(() => {
                showModal('🤝 Нічия!', 'Рівна боротьба! Жодного вільного місця.');
            }, 300);
            return;
        }

        tttState.currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        renderTTT();

        if (mode === 1 && tttState.currentPlayer === 'O' && !tttState.gameOver) {
            setTimeout(tttComputerMove, 400);
        }
    };

    // ============================================================
    // ЛОГИКА УМНОГО БОТА (ИИ)
    // ============================================================
    const tttComputerMove = () => {
        if (tttState.gameOver) return;

        const board = tttState.board;
        const emptyIndices = board.map((v, i) => v === '' ? i : null).filter(v => v !== null);

        if (emptyIndices.length === 0) return;

        let targetIndex = null;

        // В легком режиме бот иногда "подтупливает" (шанс 40% сделать случайный ход)
        if (tttState.difficulty === 'easy' && Math.random() < 0.4) {
            targetIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        } else {
            // 1. ПРОВЕРКА: Может ли бот (O) выиграть прямо сейчас?
            for (let idx of emptyIndices) {
                let tempBoard = [...board];
                tempBoard[idx] = 'O';
                if (tttCheckWin(tempBoard, 'O')) {
                    targetIndex = idx;
                    break;
                }
            }

            // 2. БЛОКИРОВКА: Может ли игрок (X) выиграть следующим ходом? Если да — блокируем!
            if (targetIndex === null) {
                for (let idx of emptyIndices) {
                    let tempBoard = [...board];
                    tempBoard[idx] = 'X';
                    if (tttCheckWin(tempBoard, 'X')) {
                        targetIndex = idx;
                        break;
                    }
                }
            }

            // 3. СТРАТЕГИЯ: Занимаем центр (4), если свободен
            if (targetIndex === null && board[4] === '') {
                targetIndex = 4;
            }

            // 4. СТРАТЕГИЯ: Занимаем углы (0, 2, 6, 8)
            if (targetIndex === null) {
                const corners = [0, 2, 6, 8].filter(i => board[i] === '');
                if (corners.length > 0) {
                    targetIndex = corners[Math.floor(Math.random() * corners.length)];
                }
            }

            // 5. Если ничего из этого не подошло — случайно
            if (targetIndex === null) {
                targetIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            }
        }

        tttMove(targetIndex);
    };

    const tttReset = () => {
        tttState.board = Array(9).fill('');
        tttState.currentPlayer = 'X';
        tttState.gameOver = false;
        tttState.winner = null;
        hideModal();
        renderTTT();
    };

    tttDOM.resetBtn?.addEventListener('click', tttReset);
    tttDOM.modalClose?.addEventListener('click', tttReset);

    tttDOM.mode2Btn?.addEventListener('click', function () {
        tttState.mode = 2;
        this.classList.add('active');
        tttDOM.mode1Btn?.classList.remove('active');
        tttReset();
    });

    tttDOM.mode1Btn?.addEventListener('click', function () {
        tttState.mode = 1;
        this.classList.add('active');
        tttDOM.mode2Btn?.classList.remove('active');
        tttReset();
    });

    // Переключение сложности
    tttDOM.diffEasyBtn?.addEventListener('click', function () {
        tttState.difficulty = 'easy';
        this.classList.add('active');
        tttDOM.diffSmartBtn?.classList.remove('active');
        tttReset();
    });

    tttDOM.diffSmartBtn?.addEventListener('click', function () {
        tttState.difficulty = 'smart';
        this.classList.add('active');
        tttDOM.diffEasyBtn?.classList.remove('active');
        tttReset();
    });

    renderTTT();
});