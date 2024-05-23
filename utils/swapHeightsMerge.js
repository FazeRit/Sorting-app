function updateBars(screenSize, arr, bars) {
    const adjustedArray = [...arr];
    const minVal = Math.min(...adjustedArray);

    if (minVal < 0) {
        const adjustment = Math.abs(minVal) + 1;
        adjustedArray.forEach((val, index) => adjustedArray[index] = val + adjustment);
    }

    const maxHeight = Math.max(...adjustedArray);
    for (let i = 0; i < adjustedArray.length; i++) {
        bars[i].style.height = (adjustedArray[i] / maxHeight) * 80 + '%';
    }
}

function visualizeArraySwaps(swaps, parentDiv, bars, stopSwap, screenSize) {
    let index = 0;

    function swapWithTimeout() {
        if (index < swaps.length && !stopSwap()) {
            updateBars(screenSize, swaps[index], bars);
            index++;
            requestAnimationFrame(swapWithTimeout);
        }
    }

    swapWithTimeout();
}

module.exports = visualizeArraySwaps;