function updateBars(screenSize, arr, bars) {
    let minVal = Infinity;
    let maxHeight = -Infinity;

    const adjustedArray = arr.map(val => {
        minVal = Math.min(minVal, val);
        maxHeight = Math.max(maxHeight, val);
        return val + Math.max(0, -minVal + 1);
    });

    adjustedArray.forEach((val, i) => {
        bars[i].style.height = `${(val / maxHeight) * 80}%`;
    });
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