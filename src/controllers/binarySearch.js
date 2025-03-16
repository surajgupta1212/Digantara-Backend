const binarySearch = (arr, target) => {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};

// Helper function to check if an array is sorted
const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
};

const binarySearchController = async (req, res) => {
    const { array, target } = req.body;
    if (!Array.isArray(array) || typeof target !== "number") {
        return res.status(400).json({ error: "Invalid input" });
    }

    // Check if the input array is sorted
    if (!isSorted(array)) {
        return res.status(400).json({ 
            error: "Binary search cannot be applied on unsorted arrays",
            message: "Please provide a sorted array in ascending order"
        });
    }

    const startTime = Date.now();
    // No need to sort again if already sorted
    const result = binarySearch(array, target);
    const executionTime = Date.now() - startTime;
    
    const found = result !== -1;
    const output = { 
        index: result !== -1 ? result : null, 
        found
    };

    res.json({output, executionTime});
};

module.exports = binarySearchController;
