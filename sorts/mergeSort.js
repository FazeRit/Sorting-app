function merge(A, p, q, r, swaps, depth) {
    let i = p;
    let j = q + 1;
    let B = [];

    for (let k = p; k <= r; k++) {
        if (i <= q && (j > r || A[i] <= A[j])) {
            B[k] = A[i];
            i++;
        } else {
            B[k] = A[j];
            j++;
        }
    }

    for (let k = p; k <= r; k++) {
        A[k] = B[k];
    }

    swaps.push(A.slice(p, r + 1));
    return { sortedArray: A, depth: depth + 1 };
}

function mergeSort(A, p, r, swaps, depth) {
    if (p < r) {
        let q = Math.floor((p + r) / 2);
        let leftResult = mergeSort(A, p, q, swaps, depth + 1);
        let rightResult = mergeSort(A, q + 1, r, swaps, depth + 1);
        return merge(leftResult.sortedArray, p, q, r, swaps, Math.max(leftResult.depth, rightResult.depth));
    }
    return { sortedArray: A, depth: depth };
}

module.exports = mergeSort;