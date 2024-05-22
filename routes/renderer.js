const { ipcRenderer } = require('electron');

// Утиліти для зміни висоти
const swapHeightsQuick = require('../utils/swapHeightsQuick');
const swapHeightsMerge = require('../utils/swapHeightsMerge');

// Алгоритми сортування
const mergeSort  = require('../sorts/mergeSort');
const quickSort = require('../sorts/quickSort');
const introSort = require('../sorts/introSort');

// Утиліта для обробки помилок
const errorHandling = require('../utils/errorHandling');

// Класи для Bars та Data
const Bars = require('../classes/bars');
const Data = require('../classes/data');


/**
 * Ініціалізує обробники подій після завантаження документа.
 * Додає події кліку до кнопок сортування.
 */
document.addEventListener('DOMContentLoaded', () => {
    const sortButtons = ['mergeSortbtn', 'quickSortbtn', 'introSortbtn'];
    const sortArticles = ['mergeSort', 'quickSort', 'introSort'];

    sortButtons.forEach((buttonId, index) => {
        const button = document.querySelector(`#${buttonId}`);
        const article = document.querySelector(`.${sortArticles[index]}`);
        button.addEventListener('click', () => toggleHidden(article, sortArticles));
    });
});


/**
 * Перемикає видимість елементів і керує станом чекбоксів.
 * @param {HTMLElement} element - Елемент, який слід зробити видимим.
 * @param {string[]} articles - Масив класів елементів, які потрібно приховати.
 */
function toggleHidden(element, articles) {
    articles.forEach((article) => {
        const el = document.querySelector(`.${article}`);
        el.classList.add('hidden');
        el.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.disabled = true;
            checkbox.checked = false;
        });
    });
    element.classList.remove('hidden');
    element.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.disabled = false;
    });
}


/**
 * Видаляє всі елементи стовпчиків із візуалізації.
 */
function deleteElements() {
    const visualizeMergeBars = document.getElementById("visualizeMerge")?.querySelectorAll('.bar');
    const visualizeQuickBars = document.getElementById("visualizeQuick")?.querySelectorAll('.bar');
    const visualizeIntroBars = document.getElementById("visualizeIntro")?.querySelectorAll('.bar');

    if (visualizeMergeBars) {
        visualizeMergeBars.forEach(bar => {
            bar.parentNode.removeChild(bar);
        });
    }

    if (visualizeQuickBars) {
        visualizeQuickBars.forEach(bar => {
            bar.parentNode.removeChild(bar);
        });
    }

    if (visualizeIntroBars) {
        visualizeIntroBars.forEach(bar => {
            bar.parentNode.removeChild(bar);
        });
    }
}


/**
 * Обробляє кліки на чекбокси для управління станом інших чекбоксів.
 */
document.querySelectorAll('input[type="checkbox"]:not([style*="display:none"])').forEach((checkbox) => {
    checkbox.addEventListener("click", function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:not([style*="display:none"])');
        checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.disabled = this.checked;
                otherCheckbox.checked = false;
            } else {
                otherCheckbox.disabled = false;
            }
        });
    });
});


/**
 * Обробляє форму для сортування злиттям.
 * @param {Event} event - Подія форми.
 */
document.querySelector('#MergeForm').addEventListener('submit', (event) => {
    event.preventDefault();

    deleteElements();

    const [minMergeValue, maxMergeValue, arrayMergeSize] =
        ['minMergeValue', 'maxMergeValue', 'arrayMergeSize'].map(id =>
            parseInt(document.querySelector(`#${id}`).value));
    const screenWidth = window.innerWidth;

    if (!errorHandling(minMergeValue, maxMergeValue, arrayMergeSize, screenWidth)) return;

    let stopSwapVariable = false;
    const stopSwap = () => stopSwapVariable;
    const stopMergeSort = () => stopSwapVariable = true;
    document.querySelector('#stopMergeBtn').addEventListener('click', stopMergeSort);

    let MergeData = new Data(arrayMergeSize, minMergeValue, maxMergeValue);
    if (document.getElementById("sortArrayReversedMerge").checked) MergeData.array.sort((a, b) => b - a);
    if (document.getElementById("sortArraySortedMerge").checked) MergeData.array.sort((a, b) => a - b);

    document.getElementById("maxRecursionDepthMerge").textContent = "Глибина рекурсії: 0 мс";
    document.getElementById("sortingTimeMerge").textContent = "Час сортування: 0";

    let parentDivMerge = document.getElementById("visualizeMerge");
    let barsList = new Bars(MergeData, parentDivMerge);
    const screenSize = screenWidth < 1200 ? 75 : 80;
    barsList.createBars(screenSize);

    let swaps = [], depth = 0;
    const startTime = performance.now();
    let { sortedArray, depth: recursionDepth } = mergeSort(MergeData.array, swaps, depth);
    const endTime = performance.now();
    const sortingTime = endTime - startTime;

    swapHeightsMerge(swaps, parentDivMerge, parentDivMerge.querySelectorAll('.bar'), stopSwap, screenWidth);

    const outputArrayElement = document.querySelector('.outputArray#mergeSortArray');
    outputArrayElement.textContent = sortedArray.slice(0, 50).join(', ') + '...';

    const saveFileMergeBtn = document.getElementById("saveFileMerge");
    saveFileMergeBtn.removeAttribute("disabled");
    saveFileMergeBtn.addEventListener('click', () => {
        ipcRenderer.send('save-file', sortedArray, 'Merge sort');
    });

    const maxRecursionDepthMerge = document.getElementById("maxRecursionDepthMerge");
    maxRecursionDepthMerge.textContent = `Глибина рекурсії: ${recursionDepth}`;
    document.getElementById("sortingTimeMerge").textContent = `Час сортування: ${sortingTime} мс`;
});


/**
 * Обробляє форму для швидкого сортування.
 * @param {Event} event - Подія форми.
 */
document.querySelector('#QuickForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    deleteElements();

    const minQuickValue = parseInt(document.querySelector('#minQuickValue').value);
    const maxQuickValue = parseInt(document.querySelector('#maxQuickValue').value);
    const arrayQuickSize = parseInt(document.querySelector('#arrayQuickSize').value);
    const screenWidth = window.innerWidth;

    if (!errorHandling(minQuickValue, maxQuickValue, arrayQuickSize, screenWidth)) return;

    let stopSwapVariable = false;
    const stopSwap = () => stopSwapVariable;
    const stopQuickSort = () => { stopSwapVariable = true; };
    document.querySelector('#stopQuickBtn').addEventListener('click', stopQuickSort);

    let QuickData = new Data(arrayQuickSize, minQuickValue, maxQuickValue);
    if (document.getElementById("sortArrayReversedQuick").checked) {
        QuickData.array.sort((a, b) => b - a);
    } else if (document.getElementById("sortArraySortedQuick").checked) {
        QuickData.array.sort((a, b) => a - b);
    }

    document.getElementById("maxRecursionDepthQuick").textContent = "Масимальна глибина рекурсії: 0";
    document.getElementById("sortingTimeQuick").textContent = "Час сортування: 0 мс";
    let parentDivQuick = document.getElementById("visualizeQuick");
    let barsList = new Bars(QuickData, parentDivQuick);
    let screenSize = screenWidth < 1200 ? 75 : 80;
    barsList.createBars(screenSize);

    let swaps = [], depth = 0;
    let startTime = performance.now();
    let result = quickSort(QuickData.array, 0, QuickData.array.length - 1, swaps, depth);
    let endTime = performance.now();
    let sortingTime = endTime - startTime;
    let sortedArray = result.sortedArray;

    swapHeightsQuick(swaps, parentDivQuick, parentDivQuick.querySelectorAll('.bar'), stopSwap);
    document.getElementById("saveFileQuick").removeAttribute("disabled");
    document.querySelector('.outputArray#quickSortArray').textContent = sortedArray.slice(0, 50).join(', ') + '...';
    document.getElementById('saveFileQuick').addEventListener('click', () => {
        ipcRenderer.send('save-file', sortedArray, 'Quick sort');
    });
    document.getElementById("maxRecursionDepthQuick").textContent =
        `Практична складність (максимальна глибина рекурсії * розмір масиву): 
        ${result.maxDepth}*${QuickData.array.length} = ${result.maxDepth*QuickData.array.length}`;
    document.getElementById("sortingTimeQuick").textContent = `Час сортування: ${sortingTime} мс`;
});


/**
 * Обробляє форму для інтроспективного сортування.
 * @param {Event} event - Подія форми.
 */
document.querySelector('#IntroForm').addEventListener('submit', (event) => {
    event.preventDefault();

    deleteElements();

    const minIntroValue = parseInt(document.querySelector('#minIntroValue').value);
    const maxIntroValue = parseInt(document.querySelector('#maxIntroValue').value);
    const arrayIntroSize = parseInt(document.querySelector('#arrayIntroSize').value);
    const screenWidth = window.innerWidth;

    if (!errorHandling(minIntroValue, maxIntroValue, arrayIntroSize, screenWidth)) return;

    let stopSwapVariable = false;
    const stopSwap = () => stopSwapVariable;
    const stopIntroSort = () => stopSwapVariable = true;
    document.querySelector('#stopIntroBtn').addEventListener('click', stopIntroSort);

    let IntroData = new Data(arrayIntroSize, minIntroValue, maxIntroValue);
    if (document.getElementById("sortArrayReversedIntro").checked) {
        IntroData.array.sort((a, b) => b - a);
    }
    if (document.getElementById("sortArraySortedIntro").checked) {
        IntroData.array.sort((a, b) => a - b);
    }

    document.getElementById("sortingTimeIntro").textContent = "Час сортування:";
    document.getElementById('messageIntro').textContent = "";

    let parentDivIntro = document.getElementById("visualizeIntro");
    let barsList = new Bars(IntroData, parentDivIntro);
    let screenSize = screenWidth < 1200 ? 75 : 80;
    barsList.createBars(screenSize);

    const swaps = [];
    let startTime = performance.now();
    let usingHeapSort = introSort(0, IntroData.array.length - 1, IntroData.array, swaps);
    let endTime = performance.now();
    let sortingTime = endTime - startTime;

    swapHeightsQuick(swaps, parentDivIntro, parentDivIntro.querySelectorAll('.bar'), stopSwap);
    const outputArrayElement = document.querySelector('.outputArray#introSortArray');
    outputArrayElement.textContent = IntroData.array.slice(0, 50).join(', ') + '...';

    const saveFileIntroBtn = document.getElementById("saveFileIntro");
    saveFileIntroBtn.removeAttribute("disabled");
    saveFileIntroBtn.addEventListener('click', () => {
        ipcRenderer.send('save-file', IntroData.array, 'Intro sort');
    });

    usingHeapSort === true ? document.getElementById('messageIntro').textContent = '':
        document.getElementById('messageIntro').textContent =
        `Практична складність (максимальна глибина рекурсії * розмір масиву): 
        *${IntroData.array.length} =${IntroData.array.length}`;
    document.getElementById("sortingTimeIntro").textContent = `Час сортування: ${sortingTime} мс`;
});
