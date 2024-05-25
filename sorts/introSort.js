/**
 * Прапорець, що вказує, чи використовується heapsort у поточній операції сортування.
 * @type {boolean}
 */
let usingHeapsort = false;

/**
 * Лічильник для кількості обмінів, виконаних під час heapsort.
 * @type {number}
 */
let swapsHeapsort = 0;

/**
 * Лічильник для поточної глибини рекурсії під час quicksort.
 * @type {number}
 */
let currentDepthQuick = 0;

/**
 * Максимальна глибина рекурсії, досягнута під час quicksort.
 * @type {number}
 */
let maxDepthQuick = 0;

/**
 * Функція heapsort сортує масив на місці за допомогою алгоритму сортування купи.
 * Спочатку вона перетворює масив на максимальну купу, а потім постійно видаляє найбільший елемент і розміщує його в кінці масиву.
 *
 * @param {Array} arr - Масив для сортування.
 * @param {Array} swaps - Масив для зберігання операцій обміну.
 */
function heapsort(arr, swaps) {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, swaps);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        swaps.push([0, i]);
        swapsHeapsort++;
        heapify(arr, i, 0, swaps);
    }
}


/**
 * Функція heapify - це допоміжна функція для алгоритму сортування купи.
 * Вона забезпечує, що піддерево з коренем за заданим індексом є максимальною купою.
 *
 * @param {Array} arr - Масив для перетворення в купу.
 * @param {Number} n - Розмір купи.
 * @param {Number} i - Індекс кореня піддерева.
 * @param {Array} swaps - Масив для зберігання операцій обміну.
 */
function heapify(arr, n, i, swaps) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
        swapsHeapsort++;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
        swapsHeapsort++;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        swapsHeapsort++;
        swaps.push([i, largest]);
        heapify(arr, n, largest, swaps);
    }
}

/**
 * Функція insertionSort сортує частину масиву на місці за допомогою алгоритму сортування вставками.
 *
 * @param {Number} begin - Початковий індекс частини для сортування.
 * @param {Number} end - Кінцевий індекс частини для сортування.
 * @param {Array} arr - Масив для сортування.
 * @param {Array} swaps - Масив для зберігання операцій обміну.
 * @returns {Array} Масив операцій обміну.
 */
function insertionSort(begin, end, arr, swaps) {
    const left = begin;
    for (let i = left + 1; i <= end; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            swaps.push([j + 1, j]);
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return swaps;
}

/**
 * Функція partition - це допоміжна функція для алгоритму швидкого сортування.
 * Вона розділяє масив навколо опорного елемента і повертає індекс опорного елемента після розділення.
 *
 * @param {Number} low - Початковий індекс частини для розділення.
 * @param {Number} high - Кінцевий індекс частини для розділення.
 * @param {Array} arr - Масив для розділення.
 * @param {Array} swaps - Масив для зберігання операцій обміну.
 * @returns {Number} Індекс опорного елемента після розділення.
 */
function partition(low, high, arr, swaps) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i = i + 1;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            swaps.push([i, j]);
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps.push([i + 1, high]);
    return i + 1;
}

/**
 * Функція medianOfThree - це допоміжна функція для алгоритму швидкого сортування.
 * Вона повертає індекс медіани трьох елементів у масиві.
 *
 * @param {Number} a - Індекс першого елемента.
 * @param {Number} b - Індекс середнього елемента.
 * @param {Number} d - Індекс кінцевого елемента.
 * @param {Array} arr - Масив, що містить елементи.
 * @returns {Number} Індекс медіани трьох елементів.
 */
function medianOfThree(a, b, d, arr) {
    const A = arr[a];
    const B = arr[b];
    const C = arr[d];
    if ((A <= B && B <= C) || (C <= B && B <= A)) return b;
    if ((B <= A && A <= C) || (C <= A && A <= B)) return a;
    if ((B <= C && C <= A) || (A <= C && C <= B)) return d;
}

/**
 * Функція isSorted перевіряє, чи відсортований масив в порядку зростання.
 *
 * @param {Array} arr - Масив для перевірки.
 * @returns {Boolean} True, якщо масив відсортований, інакше false.
 */
function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Функція introSort сортує масив на місці за допомогою алгоритму інтроспективного сортування.
 * Це гібридний алгоритм сортування, який забезпечує швидке середнє виконання і (асимптотично) оптимальне виконання в найгіршому випадку.
 *
 * @param {Number} begin - Початковий індекс частини для сортування.
 * @param {Number} end - Кінцевий індекс частини для сортування.
 * @param {Array} arr - Масив для сортування.
 * @param {Array} swaps - Масив для зберігання операцій обміну.
 * @returns {Array} Відсортований масив.
 */
function introSort(begin, end, arr, swaps) {
    usingHeapsort = false;
    swapsHeapsort = 0;
    maxDepthQuick = 0;
    currentDepthQuick = 0;

    if (isSorted(arr.slice(begin, end + 1))) {
        return { usingHeapsort, swapsHeapsort, maxDepthQuick };
    }

    let depthLimit = 2*Math.floor(Math.log2(end - begin + 1));
    introsortUtil(begin, end, depthLimit, arr, swaps);
    return { usingHeapsort, swapsHeapsort, maxDepthQuick };
}
/**
 * Функція introsortUtil - це допоміжна функція для алгоритму інтроспективного сортування.
 * Вона вибирає відповідний алгоритм сортування на основі розміру масиву і глибини рекурсії.
 *
 * @param {Number} begin - Початковий індекс частини для сортування.
 * @param {Number} end - Кінцевий індекс частини для сортування.
 * @param {Number} depthLimit - Максимально допустима глибина рекурсії.
 * @param {Array} arr - Масив для сортування.
 * @param {Array} swaps - Масив для зберігання операцій обміну.
 */
function introsortUtil(begin, end, depthLimit, arr, swaps) {
    const size = end - begin + 1;

    if (size < 16) {
        insertionSort(begin, end, arr, swaps);
        return usingHeapsort;
    }else if (depthLimit === 0 && !isSorted(arr.slice(begin, end + 1))) {
        usingHeapsort = true;
        heapsort(arr, swaps);
        return usingHeapsort;
    }else {
        currentDepthQuick++;
        if (currentDepthQuick > maxDepthQuick) {
            maxDepthQuick = currentDepthQuick;
        }
        const pivot = medianOfThree(begin, begin + Math.floor(size / 2), end, arr);
        [arr[pivot], arr[end]] = [arr[end], arr[pivot]];
        swaps.push([pivot, end]);
        const partitionPoint = partition(begin, end, arr, swaps);
        introsortUtil(begin, partitionPoint - 1, depthLimit - 1, arr, swaps);
        introsortUtil(partitionPoint + 1, end, depthLimit - 1, arr, swaps);
        currentDepthQuick--;
    }
}

module.exports = introSort;

