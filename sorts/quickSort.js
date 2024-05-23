/**
 * Цей модуль надає реалізацію алгоритму швидкого сортування у JavaScript.
 * @module quickSort
 */

/**
 * Рекурсивно сортує масив за допомогою алгоритму швидкого сортування.
 * @param {Array} arr - Масив, який потрібно відсортувати.
 * @param {number} low - Індекс нижньої межі масиву для сортування.
 * @param {number} high - Індекс верхньої межі масиву для сортування.
 * @param {Array} swaps - Масив для зберігання проміжних результатів процесу сортування.
 * @param {number} depth - Поточна глибина стеку рекурсивних викликів.
 * @returns {Object} Об'єкт, що містить відсортований масив та максимальну глибину стеку рекурсивних викликів.
 */
function quickSort(arr, low, high, swaps, depth) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high, swaps);
        depth++;
        if (depth > maxDepth) {
            maxDepth = depth;
        }
        quickSort(arr, low, pivotIndex - 1, swaps, depth);
        quickSort(arr, pivotIndex + 1, high, swaps, depth);
        depth--;
    }
    return { sortedArray: arr, maxDepth };
}

/**
 * Розбиває масив на дві частини за допомогою опорного елемента.
 * @param {Array} arr - Масив, який потрібно розбити.
 * @param {number} low - Індекс нижньої межі масиву для розбиття.
 * @param {number} high - Індекс верхньої межі масиву для розбиття.
 * @param {Array} swaps - Масив для зберігання проміжних результатів процесу розбиття.
 * @returns {number} Індекс опорного елемента в розбитому масиві.
 */
function partition(arr, low, high, swaps) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            swaps.push([i, j]);
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps.push([i + 1, high]);
    return i + 1;
}

let maxDepth = 0;
module.exports = quickSort;