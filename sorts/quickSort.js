class QuickSort {
    /**
     * Створює новий екземпляр QuickSort.
     * @param {Array} array - Масив, який потрібно відсортувати.
     * @param {number} depth - Поточна глибина рекурсії.
     * @param {number} maxDepth - Максимальна глибина рекурсії.
     * @param {Array} swaps - Масив для зберігання обмінів елементів.
     */
    constructor(array) {
        this.array = array;
        this.swaps = [];
        this.depth = 0;
        this.maxDepth = 0;
    }

    /**
     * Виконує процедуру розбиття для швидкого сортування.
     * @param {number} low - Початковий індекс частини масиву, яку потрібно відсортувати.
     * @param {number} high - Кінцевий індекс частини масиву, яку потрібно відсортувати.
     * @returns {number} - Індекс опорного елемента після розбиття.
     */
    partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (this.array[j] < pivot) {
                i++;
                [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                this.swaps.push([i, j]);
            }
        }
        [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
        this.swaps.push([i + 1, high]);
        return i + 1;
    }

    /**
     * Виконує швидке сортування.
     * @param {number} low - Початковий індекс частини масиву, яку потрібно відсортувати.
     * @param {number} high - Кінцевий індекс частини масиву, яку потрібно відсортувати.
     * @param {number} [depth=0] - Поточна глибина рекурсії.
     * @returns {Object} - Об'єкт, що містить відсортований масив та максимальну глибину рекурсії.
     */
    sort(low = 0, high = this.array.length - 1, depth = 0) {
        if (low < high) {
            const pivotIndex = this.partition(low, high);
            this.maxDepth = Math.max(this.maxDepth, depth + 1);
            this.sort(low, pivotIndex - 1, depth + 1);
            this.sort(pivotIndex + 1, high, depth + 1);
        }
        return { sortedArray: this.array, maxDepth: this.maxDepth };
    }
}

module.exports = QuickSort;
