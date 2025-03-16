const express = require("express");

const binarySearchController = require("../controllers/binarySearch");
const quickSortController = require("../controllers/quickSort");
const bfsController = require("../controllers/bfs");

const router = express.Router();

router.post("/binary-search", binarySearchController);
router.post("/quick-sort", quickSortController);
router.post("/bfs", bfsController);

module.exports = router;
