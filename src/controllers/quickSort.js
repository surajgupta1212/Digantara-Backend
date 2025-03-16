const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    let pivot = arr[arr.length - 1];
    let left = arr.filter(el => el < pivot);
    let right = arr.filter(el => el > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
};

const quickSortController = async (req, res) => {
    const { array } = req.body;
    if (!Array.isArray(array)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const startTime = Date.now();
    const result = quickSort(array);
    const executionTime = Date.now() - startTime;

    res.json({ result, executionTime });
};

module.exports = quickSortController;
