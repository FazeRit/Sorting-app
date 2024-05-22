const { ipcRenderer } = require('electron');

const errorHandling = (min, max, size,screenWidth) => {
    if (isNaN(min) || min < -5000 || min > 5000) {
        ipcRenderer.send("minValueError");
        return false;
    } else if (isNaN(max) || max < -5000 || max > 5000) {
        ipcRenderer.send("maxValueError");
        return false;
    } else if (isNaN(size) || size < 2 || size > 50000 && screenWidth > 1200) {
        ipcRenderer.send("arraySizeError",50000);
        return false;
    }else if (isNaN(size) || size < 2 || size > 35000 && screenWidth <= 1200) {
        ipcRenderer.send("arraySizeError",35000);
        return false;
    } else if (min > max) {
        ipcRenderer.send("minmaxValueError");
        return false;
    } else if (max - min < 1) {
        ipcRenderer.send("valueDifferenceError");
        return false;
    }
    return true;
}

module.exports = errorHandling;