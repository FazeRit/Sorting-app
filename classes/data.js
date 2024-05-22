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
        this.array = this.generateRandomArray();
    }

    /**
     * Генерує випадковий масив заданого розміру з числами в заданому діапазоні.
     * @returns {Array} Випадковий масив.
     */

    generateRandomArray(){
        let array = [];
        for (let i = 0; i < this.arraySize; i++) {
            array.push(Math.floor(Math.random() * (this.maxValue - this.minValue + 1)) + this.minValue);
        }
        return array;
    }
}

module.exports = Data;