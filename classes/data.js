/**
 * Клас Data генерує випадковий масив заданого розміру з числами в заданому діапазоні.
 */
class Data {
    /**
     * Створює новий екземпляр класу Data.
     * @param {number} arraySize - Розмір масиву, який потрібно згенерувати.
     * @param {number} minValue - Мінімальне значення чисел у масиві.
     * @param {number} maxValue - Максимальне значення чисел у масиві.
     */
    constructor(arraySize, minValue, maxValue) {
        this.arraySize = arraySize;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.array = this.generateRandomArray( this.minValue, this.maxValue, this.arraySize);
    }

    /**
     * Генерує випадковий масив заданого розміру з числами в заданому діапазоні.
     * @returns {Array} Випадковий масив.
     */
    generateRandomArray(minValue, maxValue, arraySize) {
        let array = [];
        for (let i = 0; i < arraySize; i++) {
            array.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
        }
        return array;
    }
}

module.exports = Data;