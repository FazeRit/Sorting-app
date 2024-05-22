/**
 * Клас Bars створює візуалізацію масиву у вигляді стовпців.
 */
class Bars {
    /**
     * Створює новий екземпляр класу Bars.
     * @param {Object} data - Об'єкт, що містить масив для візуалізації.
     * @param {HTMLElement} parent - Батьківський елемент, до якого будуть додані стовпці.
     */
    constructor(data, parent) {
        this.data = data;
        this.parent = parent;
    }

    /**
     * Створює стовпці для візуалізації масиву.
     * @param {number} screenSize - Ширина екрану, яка використовується для визначення ширини стовпців.
     */
    createBars(screenSize) {
        const adjustedArray = [...this.data.array];

        const minVal = Math.min(...adjustedArray);

        if (minVal < 0) {
            const adjustment = Math.abs(minVal) + 1;
            adjustedArray.forEach((val, index) => adjustedArray[index] = val + adjustment);
        }

        const maxHeight = Math.max(...adjustedArray);
        for (let i = 0; i < adjustedArray.length; i++) {
            const bar = document.createElement("span");
            bar.style.height = (adjustedArray[i] / maxHeight) * 80 + '%';
            bar.style.width = screenSize / this.data.array.length + 'vw';
            bar.classList.add('bar');
            this.parent.appendChild(bar);
        }
    }
}

module.exports = Bars;