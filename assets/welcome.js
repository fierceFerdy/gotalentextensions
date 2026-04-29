(function () {
    const vscode = acquireVsCodeApi();

    // Handle project card clicks
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const path = card.dataset.path;
            if (path) {
                vscode.postMessage({
                    command: 'openProject',
                    path: path
                });
            }
        });

        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Handle action button clicks
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            if (action) {
                vscode.postMessage({
                    command: action
                });
            }
        });
    });
})();

(function initMatrixBackground() {
    function start() {
        var matrix = document.getElementById('matrix');
        if (!(matrix instanceof HTMLCanvasElement)) return;

        var context = matrix.getContext('2d');
        if (!context) return;

        var fontSize = 16;
        var drops = [];
        var columns = 0;

        function resize() {
            matrix.width = window.innerWidth;
            matrix.height = window.innerHeight;
            columns = Math.floor(matrix.width / fontSize);
            drops = Array.from({ length: columns }, (_, i) => drops[i] ?? 1);
        }

        function drawMatrix() {
            context.fillStyle = 'rgba(0,0,0,0.1)';
            context.fillRect(0, 0, matrix.width, matrix.height);

            context.fillStyle = 'rgb(8, 78, 131)';
            context.font = `${fontSize}px monospace`;

            for (var i = 0; i < columns; i++) {
                context.fillText(String(Math.floor(Math.random() * 2)), i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > (matrix.height * 2 / 3) && Math.random() > 0.85) drops[i] = 0;
                drops[i]++;
            }
        }

        window.addEventListener('resize', resize);
        resize();
        setInterval(drawMatrix, 40);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();
