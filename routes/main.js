const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');

/**
 * Цей файл містить основні маршрути для додатку Electron.
 * Він включає створення основного вікна додатку та модальних вікон з помилками.
 * Він також обробляє події міжпроцесорного спілкування та функціональність збереження файлів.
 */

/**
 * Основне вікно додатку.
 * @type {BrowserWindow}
 */
let mainWindow;

/**
 * Створює основне вікно додатку.
 */

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        minHeight:550,
        minWidth:780,
        autoHideMenuBar: true,
    });

    // Відкриває DevTools.
    // mainWindow.webContents.openDevTools();

    // Завантажує HTML-файл основного вікна.
    mainWindow.loadFile('./views/mainWindow.html')

    // Викликається, коли вікно закривається.
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

// Цей метод буде викликано, коли Electron завершить
// ініціалізацію і готовий створити вікна браузера.
app.on('ready', createWindow);

// Вихід, коли всі вікна закриті.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

/**
 * Створює модальне вікно, яке відображає повідомлення про помилку.
 * @param {string} error - Повідомлення про помилку для відображення.
 *
 */
function createModal(error) {
    let newWindowError = new BrowserWindow({
        width: 300,
        height: 200,
        minWidth: 300,
        minHeight: 200,
        maxWidth: 300,
        maxHeight: 200,
        webPreferences: {
            webSecurity: false,
            plugins: true,
            nodeIntegration: true
        },
        autoHideMenuBar: true,
        modal: true,
        show: false
    });

    // Завантажує повідомлення про помилку в модальне вікно.
    newWindowError.loadURL(`data:text/html,
    <html>
    <head>
        <title>Помилка вводу</title>
        <meta charset="UTF-8">
    </head>
    <body>
    <h1>Помилка вводу</h1>
    <p>${error}</p>
    </body>
    </html>
`);


// Вставляє CSS в модальне вікно, коли воно завантажується.
newWindowError.webContents.on('did-finish-load', () => {
    newWindowError.webContents.insertCSS(
        'html{color:navajowhite;display:flex;flex-direction: column;background-color: #232323;font-family: "Times New Roman", sans-serif;font-weight: 400;font-style: normal;}\n' +
        '\n'
    );
});

// Показує модальне вікно, коли воно готове, і закриває його через 5 секунд.
newWindowError.once('ready-to-show', () => {
    newWindowError.show();
    setTimeout(() => {
        if (newWindowError && !newWindowError.isDestroyed()) {
            newWindowError.close();
        }
    }, 5000);
});

// Викликається, коли вікно закривається.
    newWindowError.on('closed', () => {
        newWindowError = null;
    });
}

// Події міжпроцесорного спілкування для різних умов помилок.
ipcMain.on("minValueError", function (event, arg) {
    createModal( `Неприпустиме значення для мінімального значення елементу масиву. Допустимі значення від 1 до 100`);
});
ipcMain.on("maxValueError", function (event, arg) {
    createModal(`Неприпустиме значення для максимального значення елементу масиву. Допустимі значення від 1 до 100`);
});
ipcMain.on("arraySizeError", function (event, arg) {
    createModal(`Неприпустиме значення для розміру масиву. Допустимі значення від 2 до ${arg}.`);
});
ipcMain.on("minmaxValueError", function (event, arg) {
    createModal(`Мінімальне значення для розміру масиву не може бути більше максимального.`);
});
ipcMain.on("valueDifferenceError", function (event, arg) {
    createModal(`Різниця між мінімальним та максимальним значенням повинна бути більше 1.`);
});

/**
* Зберігає відсортований масив у файл.
* @param {Event} event - Об'єкт події.
* @param {Array} sortedArray - Відсортований масив для збереження.
* @param {string} nameOfMethod - Назва використаного методу сортування.
*/
ipcMain.on('save-file', (event, sortedArray, nameOfMethod) => {
// Показує діалог збереження.
    dialog.showSaveDialog({
        title: 'Save Sorted Array',
        defaultPath: app.getPath('downloads') + '/sorted_array.txt',
        filters: [{ name: 'Text Files', extensions: ['txt'] }]
    }).then((result) => {
        // Якщо користувач не скасував діалог, зберігає файл.
        if (!result.canceled) {
            fs.writeFile(result.filePath, `Sorted array by ${nameOfMethod}: ${sortedArray.join(', ')}`, (err) => {
                if (err) {
                    console.error('Error saving file:', err);
                } else {
                    console.log('File saved successfully!');
                }
            });
        }
    }).catch((err) => {
        console.error('Error showing save dialog:', err);
    });
});