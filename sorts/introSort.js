class IntroSort {
    /**
     * Створює новий екземпляр IntroSort.
     * @param {boolean} usingHeapsort - Використання сортування купою.
     * @param {number} swapsHeapsort - Кількість обмінів при сортуванні купою.
     * @param {number} currentDepthQuick - Поточна глибина рекурсії при швидкому сортуванні.
     * @param {number} maxDepthQuick - Максимальна глибина рекурсії при швидкому сортуванні.
     */
    constructor() {
        this.usingHeapsort = false;
        this.swapsHeapsort = 0;
        this.currentDepthQuick = 0;
        this.maxDepthQuick = 0;
    }

    /**
     * Виконує сортування купою.
     * @param {Array} arr - Масив, який потрібно відсортувати.
     * @param {Array} swaps - Масив для зберігання обмінів елементів.
     */
    heapsort(arr, swaps) {
        const n = arr.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i, swaps);
        }

        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            swaps.push([0, i]);
            this.swapsHeapsort++;
            this.heapify(arr, i, 0, swaps);
        }
    }

    /**
     * Виконує процедуру "просіювання" для сортування купою.
     * @param {Array} arr - Масив, який потрібно відсортувати.
     * @param {number} n - Розмір масиву.
     * @param {number} i - Індекс елемента, для якого виконується процедура.
     * @param {Array} swaps - Масив для зберігання обмінів елементів.
     */
    heapify(arr, n, i, swaps) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
            this.swapsHeapsort++;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
            this.swapsHeapsort++;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.swapsHeapsort++;
            swaps.push([i, largest]);
            this.heapify(arr, n, largest, swaps);
        }
    }

    /**
     * Виконує сортування вставками.
     * @param {number} begin - Початковий індекс частини масиву, яку потрібно відсортувати.
     * @param {number} end - Кінцевий індекс частини масиву, яку потрібно відсортувати.
     * @param {Array} arr - Масив, який потрібно відсортувати.
     * @param {Array} swaps - Масив для зберігання обмінів елементів.
     * @returns {Array} - Масив з обмінами елементів.
     */
    insertionSort(begin, end, arr, swaps) {
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
     * Виконує процедуру розбиття для швидкого сортування.
     * @param {number} low - Початковий індекс частини масиву, яку потрібно відсортувати.
     * @param {number} high - Кінцевий індекс частини масиву, яку потрібно відсортувати.
     * @param {Array} arr - Масив, який потрібно відсортувати.
     * @param {Array} swaps - Масив для зберігання обмінів елементів.
     * @returns {number} - Індекс опорного елемента після розбиття.
     */
    partition(low, high, arr, swaps) {
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
     * Визначає медіану трьох елементів масиву.
     * @param {number} a - Індекс першого елемента.
     * @param {number} b - Індекс другого елемента.
     * @param {number} d - Індекс третього елемента.
     * @param {Array} arr - Масив, в якому потрібно знайти медіану.
     * @returns {number} - Індекс елемента, який є медіаною.
     */
    medianOfThree(a, b, d, arr) {
        const A = arr[a];
        const B = arr[b];
        const C = arr[d];
        if ((A <= B && B <= C) || (C <= B && B <= A)) return b;
        if ((B <= A && A <= C) || (C <= A && A <= B)) return a;
        if ((B <= C && C <= A) || (A <= C && C <= B)) return d;
    }

    /**
     * Перевіряє, чи відсортований масив.
     * @param {Array} arr - Масив, який потрібно перевірити.
     * @returns {boolean} - true, якщо масив відсортований, інакше - false.
     */
    isSorted(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Виконує інтросортування.
     * @param {number} begin - Початковий індекс частини масиву, яку потрібно відсортувати.
     * @param {number} end - Кінцевий індекс частини масиву, яку потрібно відсортувати.
     * @param {Array} arr - Масив, який потрібно відсортувати.
     * @param {Array} swaps - Масив для зберігання обмінів елементів.
     * @returns {Object} - Об'єкт, що містить інформацію про використання сортування купою, кількість обмінів при сортуванні купою та максимальну глибину рекурсії при швидкому сортуванні.
     */
    introSort(begin, end, arr, swaps) {
        this.usingHeapsort = false;
        this.swapsHeapsort = 0;
        this.maxDepthQuick = 0;
        this.currentDepthQuick = 0;

        if (this.isSorted(arr.slice(begin, end + 1))) {
            return { usingHeapsort: this.usingHeapsort, swapsHeapsort: this.swapsHeapsort, maxDepthQuick: this.maxDepthQuick };
        }

        let depthLimit = 2*Math.floor(Math.log2(end - begin + 1));
        this.introsortUtil(begin, end, depthLimit, arr, swaps);
        return { usingHeapsort: this.usingHeapsort, swapsHeapsort: this.swapsHeapsort, maxDepthQuick: this.maxDepthQuick };
    }

    /**
     * Виконує інтросортування з обмеженням глибини рекурсії.
     * @param {number} begin - Початковий індекс частини масиву, яку потрібно відсортувати.
     * @param {number} end - Кінцевий індекс частини масиву, яку потрібно відсортувати.
     * @param {number} depthLimit - Обмеження глибини рекурсії.
     * @param {Array} arr - Масив, який потрібно відсортувати.
     * @param {Array} swaps - Масив для зберігання обмінів елементів.
     * @returns {boolean} - true, якщо використовується сортування купою, інакше - false.
     */
    introsortUtil(begin, end, depthLimit, arr, swaps) {
        const size = end - begin + 1;

        if (size < 16) {
            this.insertionSort(begin, end, arr, swaps);
            return this.usingHeapsort;
        } else if (depthLimit === 0 && !this.isSorted(arr.slice(begin, end + 1))) {
            this.usingHeapsort = true;
            this.heapsort(arr, swaps);
            return this.usingHeapsort;
        } else {
            this.currentDepthQuick++;
            if (this.currentDepthQuick > this.maxDepthQuick) {
                this.maxDepthQuick = this.currentDepthQuick;
            }
            const pivot = this.medianOfThree(begin, begin + Math.floor(size / 2), end, arr);
            [arr[pivot], arr[end]] = [arr[end], arr[pivot]];
            swaps.push([pivot, end]);
            const partitionPoint = this.partition(begin, end, arr, swaps);
            this.introsortUtil(begin, partitionPoint - 1, depthLimit - 1, arr, swaps);
            this.introsortUtil(partitionPoint + 1, end, depthLimit - 1, arr, swaps);
            this.currentDepthQuick--;
        }
    }
}

module.exports = IntroSort;