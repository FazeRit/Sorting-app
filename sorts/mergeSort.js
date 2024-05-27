/**
 * Клас MergeSort для виконання сортування злиттям масиву.
 */
class MergeSort {
    /**
     * Створює новий екземпляр MergeSort.
     * @param {Array} array - Масив, який потрібно відсортувати.
     * @param {Array} swaps - Масив для зберігання обмінів елементів.
     * @param {number} depth - Поточна глибина рекурсії
     */
    constructor(array) {
        this.array = array;
        this.swaps = [];
        this.depth = 0;
    }


    /**
     * Об'єднує два відсортованих підмасиви this.array.
     * @param {number} p - Початковий індекс першого підмасиву.
     * @param {number} q - Кінцевий індекс першого підмасиву.
     * @param {number} r - Кінцевий індекс другого підмасиву.
     * @returns {Object} - Об'єкт, що містить відсортований масив та глибину рекурсії.
     */
    merge(p, q, r) {
        let i = p;
        let j = q + 1;
        let B = [];

        while (i <= q && j <= r) {
            if (this.array[i] <= this.array[j]) {
                B.push(this.array[i]);
                i++;
            } else {
                B.push(this.array[j]);
                j++;
            }
        }

        while (i <= q) {
            B.push(this.array[i]);
            i++;
        }

        while (j <= r) {
            B.push(this.array[j]);
            j++;
        }

        for (let k = p; k <= r; k++) {
            this.array[k] = B[k - p];
        }

        this.swaps.push(this.array.slice(p, r + 1));
        return { sortedArray: this.array, depth: this.depth };
    }


    /**
     * Сортує частину this.array за допомогою сортування злиттям.
     * @param {number} p - Початковий індекс частини, яку потрібно відсортувати.
     * @param {number} r - Кінцевий індекс частини, яку потрібно відсортувати.
     * @param {number} [depth=0] - Поточна глибина рекурсії.
     * @returns {Object} - Об'єкт, що містить відсортований масив та глибину рекурсії.
     */
    sort(p, r, depth = 0) {
        if (p < r) {
            let q = Math.floor((p + r) / 2);
            let leftResult = this.sort(p, q, depth + 1);
            let rightResult = this.sort(q + 1, r, depth + 1);
            this.depth = Math.max(this.depth, leftResult.depth, rightResult.depth);
            return this.merge(p, q, r);
        }
        this.depth = Math.max(this.depth, depth);
        return { sortedArray: this.array, depth: this.depth };
    }
}

module.exports = MergeSort;
