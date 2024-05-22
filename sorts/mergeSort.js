/**
 * Цей модуль надає реалізацію алгоритму сортування злиттям у JavaScript.
 * @module mergeSort
 */

/**
 * Рекурсивно сортує масив за допомогою алгоритму сортування злиттям.
 * @param {Array} arr - Масив, який потрібно відсортувати.
 * @param {Array} swaps - Масив для зберігання проміжних результатів процесу сортування.
 * @param {number} depth - Поточна глибина стеку рекурсивних викликів.
 * @returns {Object} Об'єкт, що містить відсортований масив та глибину стеку рекурсивних викликів.
 */

function mergeSort(arr, swaps, depth) {
    if (arr.length <= 1) {
        return { sortedArray: arr, depth: 0 };
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const leftResult = mergeSort(left, swaps, depth + 1);
    const rightResult = mergeSort(right, swaps, depth + 1);

    return merge(leftResult.sortedArray, rightResult.sortedArray, swaps, leftResult.depth, rightResult.depth);
}


/**
 * Об'єднує два відсортованих масиви в один відсортований масив.
 * @param {Array} left - Перший відсортований масив.
 * @param {Array} right - Другий відсортований масив.
 * @param {Array} swaps - Масив для зберігання проміжних результатів процесу сортування.
 * @param {number} leftDepth - Глибина стеку рекурсивних викликів для лівого масиву.
 * @param {number} rightDepth - Глибина стеку рекурсивних викликів для правого масиву.
 * @returns {Object} Об'єкт, що містить об'єднаний масив та глибину стеку рекурсивних викликів.
 */
function merge(left, right, swaps, leftDepth, rightDepth) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    swaps.push(result);
    return { sortedArray: result, depth: Math.max(leftDepth, rightDepth) + 1 };
}

module.exports = mergeSort;