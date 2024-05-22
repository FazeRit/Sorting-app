/**
 * Функція swapHeights виконує обмін висотами між двома елементами div.
 * Вона використовує рекурсивний setTimeout для постійного обміну, поки всі обміни не будуть виконані або функція stopSwap не поверне true.
 *
 * @param {Array} swaps - Масив масивів, де кожен підмасив представляє пару індексів для обміну.
 * @param {HTMLElement} parentDiv - Батьківський HTML-елемент, який містить divs для обміну.
 * @param {NodeListOf<*>} divsArray - Масив HTML-елементів div, висоти яких потрібно обміняти.
 * @param {Function} stopSwap - Функція, яка повертає булеве значення. Якщо вона повертає true, обмін зупиняється.
 */
function swapHeights(swaps, parentDiv, divsArray, stopSwap) {
    let delay = 0;
    let currentIndex = 0;

    /**
     * Функція swapNext виконує наступний обмін в масиві swaps.
     * Вона також встановлює таймаут для виклику себе самої знову, щоб продовжити обмін.
     */
    function swapNext() {
        if (currentIndex < swaps.length && !stopSwap()) {
            let swap = swaps[currentIndex];
            let div1 = divsArray[swap[0]];
            let div2 = divsArray[swap[1]];
            [div1.style.height, div2.style.height] = [div2.style.height, div1.style.height];
            currentIndex++;
            setTimeout(swapNext, delay);
        } else {
            console.log("Обмін завершено або divs відсортовано.");
        }
    }

    swapNext();
}

module.exports = swapHeights;