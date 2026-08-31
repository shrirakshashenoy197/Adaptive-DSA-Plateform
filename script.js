// ============================================================
// NAVIGATION
// ============================================================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const sectionId =
            this.getAttribute("data-section");

        const section =
            document.getElementById(sectionId);

        if (section) {

            section.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ============================================================
// START PRACTICING BUTTON
// ============================================================

const startButton =
    document.getElementById("startButton");

if (startButton) {

    startButton.addEventListener("click", function () {

        const problemsSection =
            document.getElementById("problems");

        if (problemsSection) {

            problemsSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}


// ============================================================
// PROBLEM CARDS
// ============================================================

const problemCards =
    document.querySelectorAll(".problem-card");

    


// ============================================================
// FILTERS
// ============================================================

const topicFilter =
    document.getElementById("topicFilter");

const difficultyFilter =
    document.getElementById("difficultyFilter");

const statusFilter = 
    document.getElementById("statusFilter");  
    
const problemSearch =

document.getElementById("problemSearch");  

const resetFilters =
    document.getElementById("resetFilters");

   
function filterProblems() {

    

    

    const selectedTopic =
        topicFilter.value;

    const selectedDifficulty =
        difficultyFilter.value;

    const selectedStatus =
        statusFilter.value;

    const searchText =
        problemSearch.value
            .trim()
            .toLowerCase();

    problemCards.forEach(card => {

        const paragraphs =
            card.querySelectorAll("p");

        if (paragraphs.length < 2) {
            return;
        }

        // -----------------------------
        // TOPIC
        // -----------------------------

        const topicText =
            paragraphs[0]
                .textContent
                .replace("Topic:", "")
                .trim()
                .toLowerCase();

        // -----------------------------
        // DIFFICULTY
        // -----------------------------

        const difficultyText =
            paragraphs[1]
                .textContent
                .replace("Difficulty:", "")
                .trim()
                .toLowerCase();

        // -----------------------------
        // TITLE
        // -----------------------------

        const titleElement =
            card.querySelector("h3");

        const titleText =
            titleElement
                ? titleElement.textContent
                    .trim()
                    .toLowerCase()
                : "";

        // -----------------------------
        // PROBLEM ID
        // -----------------------------

        const problemId =
            card.dataset.problem;

        // -----------------------------
        // SOLVED STATUS
        // -----------------------------

        const isSolved =
            localStorage.getItem(
                "problem-" + problemId
            ) === "solved";

        // -----------------------------
        // NORMALIZE TOPIC
        // -----------------------------

        const normalizedSelectedTopic =
            selectedTopic
                .replace("-", " ");

        // -----------------------------
        // TOPIC MATCH
        // -----------------------------

        const topicMatches =
            selectedTopic === "all" ||
            topicText === normalizedSelectedTopic;

        // -----------------------------
        // DIFFICULTY MATCH
        // -----------------------------

        const difficultyMatches =
            selectedDifficulty === "all" ||
            difficultyText === selectedDifficulty;

        // -----------------------------
        // STATUS MATCH
        // -----------------------------

        const statusMatches =
            selectedStatus === "all" ||
            (selectedStatus === "solved" && isSolved) ||
            (selectedStatus === "unsolved" && !isSolved);

        // -----------------------------
        // SEARCH MATCH
        // -----------------------------

        const searchMatches =
            searchText === "" ||
            titleText.includes(searchText) ||
            topicText.includes(searchText) ||
            difficultyText.includes(searchText);

        // -----------------------------
        // FINAL RESULT
        // -----------------------------

        if (
            topicMatches &&
            difficultyMatches &&
            statusMatches &&
            searchMatches
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";
        }
    });
}
// ============================================================
// FILTER EVENT LISTENERS
// ============================================================

topicFilter.addEventListener("change", filterProblems);

difficultyFilter.addEventListener("change", filterProblems);

statusFilter.addEventListener("change", filterProblems);

problemSearch.addEventListener("input", filterProblems);

resetFilters.addEventListener("click", function () {

    topicFilter.value = "all";
    difficultyFilter.value = "all";
    statusFilter.value = "all";
    problemSearch.value = "";

    filterProblems();
});

// ============================================================
// LOAD SAVED PROGRESS
// ============================================================

let savedSolvedCount =
    Number(
        localStorage.getItem("solvedCount")
    ) || 0;

let savedAttemptCount =
    Number(
        localStorage.getItem("attemptCount")
    ) || 0;

let savedFailedCount =
    Number(
        localStorage.getItem("failedCount")
    ) || 0;

let savedSuccessfulCount =
    Number(
        localStorage.getItem("successfulCount")
    ) || 0;


document.getElementById(
    "solvedCount"
).textContent = savedSolvedCount;


document.getElementById(
    "attemptCount"
).textContent = savedAttemptCount;


document.getElementById(
    "failedCount"
).textContent = savedFailedCount;


// ============================================================
// ACCURACY
// ============================================================

let initialAccuracy = 0;

if (savedAttemptCount > 0) {

    initialAccuracy =
        Math.round(
            (savedSuccessfulCount /
            savedAttemptCount) * 100
        );
}

document.getElementById(
    "accuracy"
).textContent =
    initialAccuracy + "%";


// ============================================================
// PROBLEM DATA
// ============================================================

const problemData = {

    "two-sum": {

        title: "Two Sum",

        difficulty: "easy",

        statement:
            "Given an array of integers and a target value, find two different numbers in the array whose sum equals the target.",

        example:
            "Input: nums = [2, 7, 11, 15], target = 9 → Output: [0, 1]",

        testInput:
            "nums = [2, 7, 11, 15], target = 9",

        testOutput:
            "[0, 1]",

        constraints: [
            "2 ≤ nums.length ≤ 10⁴",
            "Each input has exactly one solution.",
            "You may not use the same element twice."
        ],

        hint:
            "Think about how you can remember numbers you have already seen while scanning the array.",

        approach:
            "Use a hash map to store each number and its index. For every number, calculate target - number and check whether that value already exists in the map.",

        time: "O(n)",

        space: "O(n)"
    },


    "reverse-string": {

        title: "Reverse a String",

        difficulty: "easy",

        statement:
            "Given a string, reverse the order of its characters and return the reversed string.",

        example:
            "Input: s = \"hello\" → Output: \"olleh\"",

        testInput:
            "s = \"hello\"",

        testOutput:
            "\"olleh\"",

        constraints: [
            "1 ≤ s.length ≤ 10⁵",
            "The string contains printable characters."
        ],

        hint:
            "Think about two pointers: one starting from the beginning and one from the end.",

        approach:
            "Use two pointers, one at the beginning and one at the end of the string. Swap the characters at these positions and move both pointers toward the center.",

        time: "O(n)",

        space: "O(1)"
    },


    "binary-search": {

        title: "Binary Search",

        difficulty: "medium",

        statement:
            "Given a sorted array of integers and a target value, find the index of the target element. Return -1 if the target is not present.",

        example:
            "Input: nums = [1, 3, 5, 7, 9], target = 5 → Output: 2",

        testInput:
            "nums = [1,3,5,7,9],target=5",

        testOutput:
            "2",

        constraints: [
            "1 ≤ nums.length ≤ 10⁵",
            "The array is sorted in ascending order.",
            "All values are integers."
        ],

        hint:
            "Since the array is sorted, you don't need to check every element. Compare the target with the middle element.",

        approach:
            "Use two pointers, left and right, to represent the search range. Find the middle element. If it equals the target, return its index. If the target is smaller, search the left half; otherwise search the right half.",

        time: "O(log n)",

        space: "O(1)"
    },


    "find-maximum": {

        title: "Find Maximum Element",

        difficulty: "easy",

        statement:
            "Given an array of integers, find and return the largest element in the array.",

        example:
            "Input: nums = [3, 7, 2, 9, 4] → Output: 9",

        testInput:
            "nums = [3,7,2,9,4]",

        testOutput:
            "9",

        constraints: [
            "1 ≤ nums.length ≤ 10⁵",
            "All elements are integers."
        ],

        hint:
            "Keep track of the largest value you have seen while traversing the array.",

        approach:
            "Initialize a variable with the first element of the array. Traverse the remaining elements and update the maximum whenever you find a larger value.",

        time: "O(n)",

        space: "O(1)"
    },


    "valid-parantheses": {

        title: "Valid Parentheses",

        difficulty: "medium",

        statement:
            "Given a string containing only the characters '(', ')', '{', '}', '[' and ']', determine whether the brackets are correctly matched and properly nested.",

        example:
            "Input: s = \"()[]{}\" → Output: true",

        testInput:
            "s = \"()[]{}\"",

        testOutput:
            "true",

        constraints: [
            "1 ≤ s.length ≤ 10⁴",
            "The string contains only bracket characters."
        ],

        hint:
            "A stack can remember the opening brackets and help you match each closing bracket with the most recent opening bracket.",

        approach:
            "Use a stack. Push every opening bracket onto the stack. When a closing bracket appears, check whether it matches the bracket on top of the stack. At the end, the stack should be empty.",

        time: "O(n)",

        space: "O(n)"
    },


    
    "binary-tree": {

    title: "Binary Tree Traversal",

    difficulty: "medium",

    statement:
        "Given the root of a binary tree, traverse the tree and visit all its nodes level by level from left to right.",

    example:
        "Input: [1, 2, 3, 4, 5] → Output: [1, 2, 3, 4, 5]",

    testInput:
        "root = [1, 2, 3, 4, 5]",

    testOutput:
        "[1, 2, 3, 4, 5]",

    constraints: [
        "1 ≤ number of nodes ≤ 10⁴",
        "Node values are integers."
    ],

    hint:
        "Think about which data structure can help you process nodes level by level.",

    approach:
        "Use a queue to perform Breadth-First Search (BFS). Start by adding the root node to the queue. Then repeatedly remove a node, process it, and add its left and right children to the queue.",

    time: "O(n)",

    space: "O(n)"
},


"move-zeroes": {

    title: "Move Zeroes",

    difficulty: "easy",

    statement:
        "Given an array of integers, move all zeroes to the end while maintaining the relative order of the non-zero elements.",

    example:
        "Input: nums = [0, 1, 0, 3, 12] → Output: [1, 3, 12, 0, 0]",

    testInput:
        "nums = [0, 1, 0, 3, 12]",

    testOutput:
        "[1, 3, 12, 0, 0]",

    constraints: [
        "1 ≤ nums.length ≤ 10⁵",
        "The relative order of non-zero elements must remain unchanged."
    ],

    hint:
        "Use a pointer to keep track of where the next non-zero element should go.",

    approach:
        "Use a pointer to track the position for the next non-zero element. Traverse the array and move each non-zero value to that position. Fill the remaining positions with zeroes.",

    time: "O(n)",

    space: "O(1)"
},


"maximum-subarray": {

    title: "Maximum Subarray",

    difficulty: "medium",

    statement:
        "Given an integer array, find the contiguous subarray with the largest sum and return its sum.",

    example:
        "Input: nums = [-2,1,-3,4,-1,2,1,-5,4] → Output: 6",

    testInput:
        "nums = [-2,1,-3,4,-1,2,1,-5,4]",

    testOutput:
        "6",

    constraints: [
        "1 ≤ nums.length ≤ 10⁵",
        "Each element is an integer."
    ],

    hint:
        "At each position, decide whether it is better to extend the current subarray or start a new one.",

    approach:
        "Use Kadane's algorithm. Keep track of the maximum sum ending at the current position and the best sum found so far.",

    time: "O(n)",

    space: "O(1)"
},


"valid-anagram": {

    title: "Valid Anagram",

    difficulty: "easy",

    statement:
        "Given two strings, determine whether one string is an anagram of the other.",

    example:
        "Input: s = \"anagram\", t = \"nagaram\" → Output: true",

    testInput:
        "s = \"anagram\", t = \"nagaram\"",

    testOutput:
        "true",

    constraints: [
        "1 ≤ s.length, t.length ≤ 5 × 10⁴",
        "The strings contain lowercase English letters."
    ],

    hint:
        "If two strings are anagrams, they contain the same characters with the same frequencies.",

    approach:
        "Count the frequency of each character in both strings and compare the counts.",

    time: "O(n)",

    space: "O(1)"
},


"longest-common-prefix": {

    title: "Longest Common Prefix",

    difficulty: "easy",

    statement:
        "Given an array of strings, find the longest common prefix shared by all strings.",

    example:
        "Input: strs = [\"flower\", \"flow\", \"flight\"] → Output: \"fl\"",

    testInput:
        "strs = [\"flower\", \"flow\", \"flight\"]",

    testOutput:
        "\"fl\"",

    constraints: [
        "1 ≤ strs.length ≤ 200",
        "0 ≤ strs[i].length ≤ 200"
    ],

    hint:
        "Compare the characters at the same position across all strings.",

    approach:
        "Start with the first string as the prefix. Compare it with each remaining string and shorten the prefix whenever characters do not match.",

    time: "O(n × m)",

    space: "O(1)"
},


"next-greater-element": {

    title: "Next Greater Element",

    difficulty: "medium",

    statement:
        "Given an array of integers, find the next greater element for each element. If no greater element exists, return -1.",

    example:
        "Input: nums = [2,1,2,4,3] → Output: [4,2,4,-1,-1]",

    testInput:
        "nums = [2,1,2,4,3]",

    testOutput:
        "[4,2,4,-1,-1]",

    constraints: [
        "1 ≤ nums.length ≤ 10⁵",
        "Elements are integers."
    ],

    hint:
        "A monotonic stack can help you find the next greater element efficiently.",

    approach:
        "Traverse the array from right to left while maintaining a decreasing stack. Remove elements that cannot be the next greater element.",

    time: "O(n)",

    space: "O(n)"
},


"min-stack": {

    title: "Min Stack",

    difficulty: "medium",

    statement:
        "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",

    example:
        "Operations: push(-2), push(0), push(-3), getMin() → Output: -3",

    testInput:
        "stack operations: push(-2), push(0), push(-3), getMin()",

    testOutput:
        "-3",

    constraints: [
        "All operations should run in O(1) time.",
        "The stack may contain integer values."
    ],

    hint:
        "Keep track of the minimum value while elements are pushed and removed.",

    approach:
        "Use an additional stack to store the minimum value at each level of the main stack. This allows getMin() to return the current minimum in O(1) time.",

    time: "O(1) per operation",

    space: "O(n)"
},


"maximum-depth-tree": {

    title: "Maximum Depth of Binary Tree",

    difficulty: "easy",

    statement:
        "Given the root of a binary tree, find its maximum depth.",

    example:
        "Input: [3,9,20,null,null,15,7] → Output: 3",

    testInput:
        "root = [3,9,20,null,null,15,7]",

    testOutput:
        "3",

    constraints: [
        "0 ≤ number of nodes ≤ 10⁴",
        "Node values are integers."
    ],

    hint:
        "The depth of a node depends on the depth of its left and right subtrees.",

    approach:
        "Use recursion. The depth of a tree is one plus the maximum depth of its left and right subtrees.",

    time: "O(n)",

    space: "O(h)"
},


"invert-binary-tree": {

    title: "Invert Binary Tree",

    difficulty: "easy",

    statement:
        "Given the root of a binary tree, invert the tree by swapping the left and right children of every node.",

    example:
        "Input: [4,2,7,1,3,6,9] → Output: [4,7,2,9,6,3,1]",

    testInput:
        "root = [4,2,7,1,3,6,9]",

    testOutput:
        "[4,7,2,9,6,3,1]",

    constraints: [
        "0 ≤ number of nodes ≤ 100",
        "Node values are integers."
    ],

    hint:
        "At every node, swap its left and right children.",

    approach:
        "Use recursion or a queue. For each node, swap its left and right children and then continue processing the child nodes.",

    time: "O(n)",

    space: "O(n)"
},
"reverse-linked-list": {

    title: "Reverse Linked List",

    difficulty: "easy",

    statement:
        "Given the head of a singly linked list, reverse the list and return the new head.",

    example:
        "Input: [1,2,3,4,5] → Output: [5,4,3,2,1]",

    testInput:
        "head = [1,2,3,4,5]",

    testOutput:
        "[5,4,3,2,1]",

    constraints: [
        "0 ≤ number of nodes ≤ 5000",
        "Node values are integers."
    ],

    hint:
        "Keep track of the previous node while changing each node's next pointer.",

    approach:
        "Use three pointers: previous, current, and next. Reverse the next pointer of each node while moving through the list.",

    time: "O(n)",

    space: "O(1)"
},


"merge-sorted-lists": {

    title: "Merge Two Sorted Lists",

    difficulty: "easy",

    statement:
        "Given the heads of two sorted linked lists, merge them into one sorted linked list.",

    example:
        "Input: list1 = [1,2,4], list2 = [1,3,4] → Output: [1,1,2,3,4,4]",

    testInput:
        "list1 = [1,2,4], list2 = [1,3,4]",

    testOutput:
        "[1,1,2,3,4,4]",

    constraints: [
        "0 ≤ number of nodes in each list ≤ 50",
        "Both lists are sorted in ascending order."
    ],

    hint:
        "Compare the current nodes of both lists and attach the smaller one.",

    approach:
        "Use a dummy node and a pointer to build the merged list. Compare the current nodes of both lists and connect the smaller node each time.",

    time: "O(n + m)",

    space: "O(1)"
},


"linked-list-cycle": {

    title: "Linked List Cycle",

    difficulty: "easy",

    statement:
        "Given the head of a linked list, determine whether the linked list contains a cycle.",

    example:
        "Input: [3,2,0,-4], where the last node points to the second node → Output: true",

    testInput:
        "head = [3,2,0,-4], pos = 1",

    testOutput:
        "true",

    constraints: [
        "0 ≤ number of nodes ≤ 10⁴",
        "The linked list may contain a cycle."
    ],

    hint:
        "Use two pointers moving at different speeds.",

    approach:
        "Use Floyd's cycle detection algorithm. Move one pointer one step at a time and another pointer two steps at a time. If they meet, a cycle exists.",

    time: "O(n)",

    space: "O(1)"
},


"queue-using-stacks": {

    title: "Implement Queue Using Stacks",

    difficulty: "easy",

    statement:
        "Implement a queue using two stacks. The queue should support adding elements, removing elements, and checking the front element.",

    example:
        "push(1), push(2), pop() → Output: 1",

    testInput:
        "push(1), push(2), pop()",

    testOutput:
        "1",

    constraints: [
        "Queue operations should preserve FIFO order.",
        "Use stacks as the underlying data structure."
    ],

    hint:
        "Use one stack for incoming elements and another for outgoing elements.",

    approach:
        "Maintain two stacks. Push new elements onto the input stack. When removing an element, transfer elements to the output stack when necessary.",

    time: "O(1) amortized",

    space: "O(n)"
},


"recent-calls": {

    title: "Number of Recent Calls",

    difficulty: "easy",

    statement:
        "Implement a RecentCounter that counts the number of requests received within the last 3000 milliseconds.",

    example:
        "ping(1), ping(100), ping(3001), ping(3002) → Output: [1,2,3,3]",

    testInput:
        "ping(1), ping(100), ping(3001), ping(3002)",

    testOutput:
        "[1,2,3,3]",

    constraints: [
        "1 ≤ t ≤ 10⁹",
        "Requests arrive with increasing timestamps."
    ],

    hint:
        "A queue can store the timestamps of recent requests.",

    approach:
        "Store each timestamp in a queue. When a new request arrives, remove timestamps that are older than t - 3000. The remaining queue size is the answer.",

    time: "O(n)",

    space: "O(n)"
},


"circular-queue": {

    title: "Design Circular Queue",

    difficulty: "medium",

    statement:
        "Design a circular queue that supports inserting, deleting, checking the front, and checking the rear element.",

    example:
        "k = 3, enQueue(1), enQueue(2), enQueue(3) → Output: [1,2,3]",

    testInput:
        "k = 3, enQueue(1), enQueue(2), enQueue(3), Front()",

    testOutput:
        "1",

    constraints: [
        "1 ≤ k ≤ 1000",
        "Queue operations should work correctly when the rear wraps around."
    ],

    hint:
        "Use modulo arithmetic to move the front and rear positions around the circular structure.",

    approach:
        "Use an array with front and rear indices. When either index reaches the end of the array, use modulo arithmetic to wrap it back to the beginning.",

    time: "O(1) per operation",

    space: "O(k)"
}

};


// ============================================================
// RESTORE SOLVED BUTTONS
// ============================================================

problemCards.forEach(card => {

    const problemId =
        card.dataset.problem;

    const savedStatus =
        localStorage.getItem(
            "problem-" + problemId
        );

    if (savedStatus === "solved") {

        const button =
            card.querySelector(".solveButton");

        card.classList.add("solved");

        button.textContent = "Solved";

        button.disabled = true;
    }
});


// ============================================================
// TOPIC PERFORMANCE
// ============================================================

function updateTopicPerformance() {

    const topicCards =
        document.querySelectorAll(".topic-card");

    topicCards.forEach(topicCard => {

        const heading =
            topicCard.querySelector("h3");

        if (!heading) {
            return;
        }

        const topicName =
            heading.textContent
                .trim()
                .toLowerCase();

        let solved = 0;
        let totalProblems = 0;

        problemCards.forEach(problem => {

            const paragraphs =
                problem.querySelectorAll("p");

            if (paragraphs.length < 2) {
                return;
            }

            const topic =
                paragraphs[0]
                    .textContent
                    .replace("Topic:", "")
                    .trim()
                    .toLowerCase();

            if (topic === topicName) {

                totalProblems++;

                const problemId =
                    problem.dataset.problem;

                const isSolved =
                    localStorage.getItem(
                        "problem-" + problemId
                    ) === "solved";

                if (isSolved) {
                    solved++;
                }
            }
        });


        // -----------------------------------------
        // Problems solved
        // -----------------------------------------

        const countElement =
            topicCard.querySelector("span");

        if (countElement) {

            countElement.textContent =
                solved;
        }


        // -----------------------------------------
        // Completion percentage
        // -----------------------------------------

        const percentageElement =
            topicCard.querySelector(
                ".topic-percentage"
            );

        if (percentageElement) {

            const percentage =
                totalProblems > 0
                    ? Math.round(
                        (solved / totalProblems) * 100
                    )
                    : 0;

            percentageElement.textContent =
                percentage + "%";
        }
    });
}
// ============================================================
// GET TOPIC STATISTICS
// ============================================================

function getTopicStats() {

    const topicStats = {};

    problemCards.forEach(card => {

        const problemId =
            card.dataset.problem;

        const topic =
            card.querySelector("p")
                .textContent
                .replace("Topic:", "")
                .trim()
                .toLowerCase();

        if (!topicStats[topic]) {

            topicStats[topic] = {
                solved: 0,
                failed: 0,
                attempts: 0
            };
        }


        const solved =
            localStorage.getItem(
                "problem-" + problemId
            ) === "solved";


        const failed =
            Number(
                localStorage.getItem(
                    "failed-" + problemId
                )
            ) || 0;


        if (solved) {

            topicStats[topic].solved++;
        }


        topicStats[topic].failed += failed;


        topicStats[topic].attempts +=
            (solved ? 1 : 0) + failed;
    });

    return topicStats;
}


// ============================================================
// FIND WEAKEST TOPIC
// ============================================================

function getWeakestTopic() {

    const topicStats =
        getTopicStats();

    let weakestTopic = null;

    let lowestSolved =
        Infinity;

    // Preferred order when topics are tied.
    // This makes Stack appear before Trees
    // when both have zero solved problems.

    const topicOrder = [
        "arrays",
        "strings",
        "stack",
        "trees",
        "linked list",
        "queue"
    ];


    topicOrder.forEach(topic => {

        if (!topicStats[topic]) {
            return;
        }

        const solved =
            topicStats[topic].solved;


        if (solved < lowestSolved) {

            lowestSolved =
                solved;

            weakestTopic =
                topic;
        }
    });


    return weakestTopic;
}


// ============================================================
// RECOMMENDATION
// ============================================================

function updateRecommendation() {

    const recommendationElement =
        document.getElementById("recommendationText");

    if (!recommendationElement) {
        return;
    }

    const topicStats =
        getTopicStats();

    let weakestTopic = null;
    let lowestSolved = Infinity;

    // Check all topics
    for (const topic in topicStats) {

        const solved =
            topicStats[topic].solved;

        if (solved < lowestSolved) {

            lowestSolved = solved;
            weakestTopic = topic;
        }
    }

    if (!weakestTopic) {

        recommendationElement.textContent =
            "Solve some problems to get a personalized recommendation.";

        return;
    }

    // Find an unsolved problem from the weakest topic
    let recommendedProblem = null;

    for (const [id, problem] of Object.entries(problemData)) {

        const card =
            [...problemCards].find(
                card =>
                    card.dataset.problem === id
            );

        if (!card) {
            continue;
        }

        const topic =
            card.querySelector("p")
                .textContent
                .replace("Topic:", "")
                .trim()
                .toLowerCase();

        const solved =
            localStorage.getItem(
                "problem-" + id
            ) === "solved";

        if (
            topic === weakestTopic &&
            !solved
        ) {

            recommendedProblem = problem;
            break;
        }
    }

    if (!recommendedProblem) {

        recommendationElement.textContent =
            "Great work! You have completed the available problems in your focus areas.";

        return;
    }

    const displayTopic =
        weakestTopic.charAt(0).toUpperCase() +
        weakestTopic.slice(1);

    recommendationElement.textContent =
        "Focus on " +
        displayTopic +
        ". Next try " +
        recommendedProblem.title +
        " (" +
        recommendedProblem.difficulty +
        ").";
}
// ============================================================
// SOLVE BUTTONS
// ============================================================

const solveButtons = document.querySelectorAll(".solveButton");

solveButtons.forEach(button => {
    button.addEventListener("click", function () {

        const card = this.closest(".problem-card");
        const problemId = card.dataset.problem;

        const topic =
            card.querySelector("p").textContent
                .replace("Topic:", "")
                .toLowerCase();

        const topicKey = "topic-" + topic;

        const currentTopicCount =
            Number(localStorage.getItem(topicKey)) || 0;

        localStorage.setItem(
            topicKey,
            currentTopicCount + 1
        );

        const topicCard =
            [...document.querySelectorAll(".topic-card")]
                .find(card =>
                    card.querySelector("h3")
                        .textContent
                        .toLowerCase() === topic
                );

        if (topicCard) {
            topicCard.querySelector("span").textContent =
                currentTopicCount + 1;
        }

        this.textContent = "Solved";
        card.classList.add("solved");
        this.disabled = true;

        localStorage.setItem(
            "problem-" + problemId,
            "solved"
        );

        updateTopicPerformance();
        updateRecommendation();
        updateLearningAnalysis();

    });
});

// ============================================================
// LEARNING ANALYSIS
// ============================================================

function updateLearningAnalysis() {

    const analysis =
        document.getElementById(
            "learningAnalysisText"
        );

    if (!analysis) {
        return;
    }

    const topicStats =
        getTopicStats();

    const activeTopics = [];

    for (const topic in topicStats) {

        const solved =
            topicStats[topic].solved;

        const failed =
            topicStats[topic].failed;

        const attempts =
            topicStats[topic].attempts;

        if (attempts > 0) {

            const successRate =
                Math.round(
                    (solved / attempts) * 100
                );

            activeTopics.push({

                name: topic,

                solved: solved,

                failed: failed,

                attempts: attempts,

                successRate: successRate
            });
        }
    }

    // No activity
    if (activeTopics.length === 0) {

        analysis.textContent =
            "Start solving problems to generate your personalized learning analysis.";

        return;
    }

    // Only one active topic
    if (activeTopics.length === 1) {

        const topic =
            activeTopics[0];

        const displayName =
            topic.name.charAt(0).toUpperCase() +
            topic.name.slice(1);

        analysis.textContent =
            "You currently have activity only in " +
            displayName +
            " (" +
            topic.successRate +
            "% success rate). Keep solving problems from other topics to build a more complete learning profile.";

        return;
    }

    // ------------------------------------------------
    // STRONGEST TOPIC
    // Prefer topics with at least 3 attempts.
    // ------------------------------------------------

    const reliableTopics =
        activeTopics.filter(
            topic =>
                topic.attempts >= 3
        );

    let strongest;

    if (reliableTopics.length > 0) {

        strongest =
            reliableTopics[0];

        reliableTopics.forEach(topic => {

            if (
                topic.successRate >
                strongest.successRate
            ) {

                strongest =
                    topic;

            } else if (
                topic.successRate ===
                strongest.successRate &&
                topic.attempts >
                strongest.attempts
            ) {

                strongest =
                    topic;
            }
        });

    } else {

        strongest =
            activeTopics[0];

        activeTopics.forEach(topic => {

            if (
                topic.successRate >
                strongest.successRate
            ) {

                strongest =
                    topic;

            } else if (
                topic.successRate ===
                strongest.successRate &&
                topic.attempts >
                strongest.attempts
            ) {

                strongest =
                    topic;
            }
        });
    }

    // ------------------------------------------------
    // WEAKEST TOPIC
    // ------------------------------------------------

    const weakestTopic =
        getWeakestTopic();

    const weakestStats =
        topicStats[weakestTopic];

    if (!weakestStats) {
        return;
    }

    const strongestName =
        strongest.name.charAt(0).toUpperCase() +
        strongest.name.slice(1);

    const weakestName =
        weakestTopic.charAt(0).toUpperCase() +
        weakestTopic.slice(1);

    const weakestSolved =
        weakestStats.solved;

    // ------------------------------------------------
    // SAME TOPIC
    // ------------------------------------------------

    if (
        strongest.name ===
        weakestTopic
    ) {

        analysis.textContent =
            "You are building your DSA skills in " +
            strongestName +
            ". Keep practicing across different topics to build a stronger learning profile.";

        return;
    }

    // ------------------------------------------------
    // FINAL ANALYSIS
    // ------------------------------------------------

    analysis.textContent =
        "You are currently strongest in " +
        strongestName +
        " (" +
        strongest.successRate +
        "% success rate). Your weakest area is " +
        weakestName +
        " (" +
        weakestSolved +
        " problems solved). Focus on " +
        weakestName +
        " before increasing difficulty.";
}
// ============================================================
// VIEW PROBLEM
// ============================================================

let currentProblemId = null;


const viewButtons =
    document.querySelectorAll(
        ".viewProblemButton"
    );


viewButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const problemId =
                this.dataset.problem;

            const problem =
                problemData[problemId];


            currentProblemId =
                problemId;


            if (!problem) {
                return;
            }


            document.getElementById(
                "detailTitle"
            ).textContent =
                problem.title;


            document.getElementById(
                "detailStatement"
            ).textContent =
                problem.statement;


            document.getElementById(
                "detailExample"
            ).textContent =
                problem.example;


            document.getElementById(
                "testInput"
            ).textContent =
                "Input: " +
                problem.testInput;


            document.getElementById(
                "detailHint"
            ).textContent =
                problem.hint;


            document.getElementById(
                "detailApproach"
            ).textContent =
                problem.approach;


            document.getElementById(
                "detailTime"
            ).textContent =
                problem.time;


            document.getElementById(
                "detailSpace"
            ).textContent =
                problem.space;


            const constraints =
                document.getElementById(
                    "detailConstraints"
                );


            constraints.innerHTML =
                "";


            problem.constraints.forEach(
                item => {

                    const li =
                        document.createElement(
                            "li"
                        );

                    li.textContent =
                        item;

                    constraints.appendChild(
                        li
                    );
                }
            );


            const approach =
                document.getElementById(
                    "approach"
                );


            approach.style.display =
                "none";


            const showApproachButton =
                document.getElementById(
                    "showApproachButton"
                );


            showApproachButton.textContent =
                "Show Approach";


            showApproachButton.disabled =
                false;


            const problemDetails =
                document.getElementById(
                    "problemDetails"
                );


            problemDetails.style.display =
                "block";


            problemDetails.scrollIntoView({
                behavior: "smooth"
            });
        }
    );
});


// ============================================================
// SHOW APPROACH
// ============================================================

const showApproachButton =
    document.getElementById(
        "showApproachButton"
    );


const approach =
    document.getElementById(
        "approach"
    );


showApproachButton.addEventListener(
    "click",
    function () {

        approach.style.display =
            "block";


        showApproachButton.textContent =
            "Approach Shown";


        showApproachButton.disabled =
            true;
    }
);


// ============================================================
// RUN CODE
// ============================================================

const runCodeButton =
    document.getElementById(
        "runCodeButton"
    );


const codeEditor =
    document.getElementById(
        "codeEditor"
    );


const codeResult =
    document.getElementById(
        "codeResult"
    );


runCodeButton.addEventListener(
    "click",
    function () {

        const userAnswer =
            codeEditor.value.trim();


        if (userAnswer === "") {

            codeResult.textContent =
                "Please enter your answer first.";

            codeResult.style.color =
                "#dc2626";

            return;
        }


        if (!currentProblemId) {

            codeResult.textContent =
                "Please select a problem first.";

            codeResult.style.color =
                "#dc2626";

            return;
        }


        const problem =
            problemData[currentProblemId];


        const expectedAnswer =
            problem.testOutput.trim();


        // TOTAL ATTEMPTS

        let attemptCount =
            Number(
                localStorage.getItem(
                    "attemptCount"
                )
            ) || 0;


        attemptCount++;


        localStorage.setItem(
            "attemptCount",
            attemptCount
        );


        document.getElementById(
            "attemptCount"
        ).textContent =
            attemptCount;


        // CORRECT ANSWER

        if (
            userAnswer ===
            expectedAnswer
        ) {

            const alreadySolved =
                localStorage.getItem(
                    "problem-" +
                    currentProblemId
                ) === "solved";


            if (!alreadySolved) {

                let solvedCount =
                    Number(
                        localStorage.getItem(
                            "solvedCount"
                        )
                    ) || 0;


                solvedCount++;


                localStorage.setItem(
                    "solvedCount",
                    solvedCount
                );


                document.getElementById(
                    "solvedCount"
                ).textContent =
                    solvedCount;
            }


            // Successful attempts

            let successfulCount =
                Number(
                    localStorage.getItem(
                        "successfulCount"
                    )
                ) || 0;


            successfulCount++;


            localStorage.setItem(
                "successfulCount",
                successfulCount
            );


            // Mark solved

            localStorage.setItem(
                "problem-" +
                currentProblemId,
                "solved"
            );


            // Accuracy

            const accuracy =
                Math.round(
                    (successfulCount /
                    attemptCount) * 100
                );


            document.getElementById(
                "accuracy"
            ).textContent =
                accuracy + "%";


            codeResult.textContent =
                "Passed! Your answer is correct.";


            codeResult.style.color =
                "#16a34a";


            // Update solve button

            const currentCard =
                document.querySelector(
                    `[data-problem="${currentProblemId}"]`
                );


            if (currentCard) {

                const solveButton =
                    currentCard.querySelector(
                        ".solveButton"
                    );


                if (solveButton) {

                    solveButton.textContent =
                        "Solved";

                    solveButton.disabled =
                        true;
                }


                currentCard.classList.add(
                    "solved"
                );
            }



            updateTopicPerformance();
            updateRecommendation();
            updateDifficultyRecommendation();
            updateSpecificRecommendation();
            updateLearningAnalysis();


            // AI Coach

            if (
                typeof aiHintText !==
                "undefined"
            ) {

                aiHintText.textContent =
                    "AI Coach: Great! You solved this problem. Try another problem of the same topic.";

                aiHintText.style.display =
                    "block";
            }


        } else {

            // FAILED ATTEMPT

            let failedCount =
                Number(
                    localStorage.getItem(
                        "failedCount"
                    )
                ) || 0;


            failedCount++;


            localStorage.setItem(
                "failedCount",
                failedCount
            );


            document.getElementById(
                "failedCount"
            ).textContent =
                failedCount;


            // Problem-specific failures

            const problemFailKey =
                "failed-" +
                currentProblemId;


            const problemFailCount =
                Number(
                    localStorage.getItem(
                        problemFailKey
                    )
                ) || 0;


            const newProblemFailCount =
                problemFailCount + 1;


            localStorage.setItem(
                problemFailKey,
                newProblemFailCount
            );


            codeResult.textContent =
                "Not quite. Check your answer and try again.";


            codeResult.style.color =
                "#dc2626";


            // Accuracy

            const currentFailedCount =
                Number(
                    localStorage.getItem(
                        "failedCount"
                    )
                ) || 0;


            const successfulAttempts =
                attemptCount -
                currentFailedCount;


            const accuracy =
                attemptCount > 0
                    ? Math.round(
                        (successfulAttempts /
                        attemptCount) * 100
                    )
                    : 0;


            document.getElementById(
                "accuracy"
            ).textContent =
                accuracy + "%";


            updateDifficultyRecommendation();
            updateSpecificRecommendation();
            updateLearningAnalysis();


            // AI Coach

            // AI Coach

            if (
               typeof aiHintText !==
               "undefined"
            ) {

               if (newProblemFailCount === 1) {

                   aiHintText.textContent =
                      "AI Coach: Here's a hint — " +
                       problem.hint;

                } else if (newProblemFailCount === 2) {

                   aiHintText.textContent =
                     "AI Coach: You are close. Re-read the problem carefully and think about the data structure or pattern that could make the solution simpler. Hint: " +
                      problem.hint;

                } else {

                   aiHintText.textContent =
                     "AI Coach: You have attempted this problem " +
                      newProblemFailCount +
                      " times. Before coding again, explain your approach step by step. Think about the input, expected output, edge cases, and the most suitable algorithm. Hint: " +
                      problem.hint;
                }
                aiHintText.style.display =
                    "block";
            }
        }
    }
);


// ============================================================
// AI DSA COACH
// ============================================================

const aiHintButton =
    document.getElementById(
        "aiHintButton"
    );


const aiHintText =
    document.getElementById(
        "aiHintText"
    );


aiHintButton.addEventListener(
    "click",
    function () {

        if (!currentProblemId) {

            aiHintText.textContent =
                "Please open a problem first.";

            aiHintText.style.display =
                "block";

            return;
        }


        const problem =
            problemData[currentProblemId];


        aiHintText.textContent =
            "AI Hint: " +
            problem.hint;


        aiHintText.style.display =
            "block";
    }
);
// ============================================================
// ADAPTIVE DIFFICULTY
// ============================================================

const difficultyLevels = {

    easy: 1,

    medium: 2,

    hard: 3
};


function getAdaptiveDifficulty(problemId) {

    const problem =
        problemData[problemId];

    if (!problem) {
        return "easy";
    }

    const currentLevel =
        difficultyLevels[problem.difficulty];

    if (!currentLevel) {
        return "easy";
    }

    const solved =
        localStorage.getItem(
            "problem-" + problemId
        ) === "solved";

    const failed =
        Number(
            localStorage.getItem(
                "failed-" + problemId
            )
        ) || 0;


    // If the problem was solved successfully,
    // move to the next difficulty level.

    if (solved) {

        if (currentLevel === 1) {
            return "medium";
        }

        if (currentLevel === 2) {
            return "hard";
        }

        return "hard";
    }


    // If the user failed this problem
    // three or more times, reduce difficulty.

    if (failed >= 3) {

        if (currentLevel === 3) {
            return "medium";
        }

        if (currentLevel === 2) {
            return "easy";
        }

        return "easy";
    }


    // Otherwise keep the current difficulty.

    return problem.difficulty;
}

// ============================================================
// DIFFICULTY RECOMMENDATION
// ============================================================

function updateDifficultyRecommendation() {

    const recommendation =
        document.getElementById("difficultyRecommendation");

    if (!recommendation) {
        return;
    }

    const successfulCount =
        Number(
            localStorage.getItem("successfulCount")
        ) || 0;

    const attemptCount =
        Number(
            localStorage.getItem("attemptCount")
        ) || 0;

    let difficulty = "Easy";

    if (attemptCount > 0) {

        const successRate =
            Math.round(
                (successfulCount / attemptCount) * 100
            );

        if (successRate < 50) {
            difficulty = "Easy";
        } else if (successRate < 80) {
            difficulty = "Medium";
        } else {
            difficulty = "Hard";
        }
    }

    recommendation.textContent =
        "Recommended difficulty: " +
        difficulty;
}



function updateSpecificRecommendation() {

    const recommendation =
        document.getElementById("specificRecommendation");

    if (!recommendation) {
        return;
    }

    // --------------------------------
    // 1. Get overall recommended difficulty
    // --------------------------------

    const successfulCount =
        Number(
            localStorage.getItem("successfulCount")
        ) || 0;

    const attemptCount =
        Number(
            localStorage.getItem("attemptCount")
        ) || 0;

    let recommendedDifficulty = "easy";

    if (attemptCount > 0) {

        const accuracy =
            Math.round(
                (successfulCount / attemptCount) * 100
            );

        if (accuracy < 50) {

            recommendedDifficulty = "easy";

        } else if (accuracy < 80) {

            recommendedDifficulty = "medium";

        } else {

            recommendedDifficulty = "medium";
        }
    }


    // --------------------------------
    // 2. Find weakest topic
    // --------------------------------

    const topicStats =
        getTopicStats();

    let weakestTopic = null;

    let lowestSolved = Infinity;

    const topicOrder = [
        "arrays",
        "strings",
        "stack",
        "trees",
        "linked list",
        "queue"
    ];

    topicOrder.forEach(topic => {

        if (!topicStats[topic]) {
            return;
        }

        const solved =
            topicStats[topic].solved;

        if (solved < lowestSolved) {

            lowestSolved = solved;

            weakestTopic = topic;
        }
    });


    if (!weakestTopic) {

        recommendation.textContent =
            "Recommended Problem: Start with an Easy problem.";

        return;
    }


    // --------------------------------
    // 3. Find exact topic + difficulty
    // --------------------------------

    let nextProblem = null;

    for (const [id, problem] of Object.entries(problemData)) {

        const card =
            [...problemCards].find(
                card =>
                    card.dataset.problem === id
            );

        if (!card) {
            continue;
        }

        const topic =
            card.querySelector("p")
                .textContent
                .replace("Topic:", "")
                .trim()
                .toLowerCase();

        const solved =
            localStorage.getItem(
                "problem-" + id
            ) === "solved";

        if (
            topic === weakestTopic &&
            problem.difficulty === recommendedDifficulty &&
            !solved
        ) {

            nextProblem = problem;
            break;
        }
    }


    // --------------------------------
    // 4. If exact match doesn't exist,
    // use any unsolved problem in weakest topic
    // --------------------------------

    let difficultyFallback = false;

    if (!nextProblem) {

        difficultyFallback = true;

        for (const [id, problem] of Object.entries(problemData)) {

            const card =
                [...problemCards].find(
                    card =>
                        card.dataset.problem === id
                );

            if (!card) {
                continue;
            }

            const topic =
                card.querySelector("p")
                    .textContent
                    .replace("Topic:", "")
                    .trim()
                    .toLowerCase();

            const solved =
                localStorage.getItem(
                    "problem-" + id
                ) === "solved";

            if (
                topic === weakestTopic &&
                !solved
            ) {

                nextProblem = problem;
                break;
            }
        }
    }


    // --------------------------------
    // 5. Display recommendation
    // --------------------------------

    const displayTopic =
        weakestTopic.charAt(0).toUpperCase() +
        weakestTopic.slice(1);


    if (nextProblem) {

        const displayDifficulty =
            nextProblem.difficulty
                .charAt(0)
                .toUpperCase() +
            nextProblem.difficulty.slice(1);


        if (difficultyFallback) {

            recommendation.textContent =
            "Recommended Problem: " +
            nextProblem.title +
            " — " +
            displayDifficulty +
            ". Focus on " +
            displayTopic +
            ". No " +
            recommendedDifficulty +
            " problem is currently available in this topic, so this available " +
            displayDifficulty +
            " problem is recommended first.";

        } else {

        recommendation.textContent =
            "Recommended Problem: " +
            nextProblem.title +
            " — " +
            displayDifficulty +
            ". Focus on " +
            displayTopic +
            ".";

        }

        } else {

        recommendation.textContent =
            "Recommended Problem: Keep practicing your current focus topic.";

        }
}    
// ============================================================
// INITIAL UPDATE
// ============================================================

// IMPORTANT:
// All functions are called here only AFTER
// problemData and all functions have been created.

updateTopicPerformance();

updateRecommendation();

updateDifficultyRecommendation();

updateSpecificRecommendation();

updateLearningAnalysis();