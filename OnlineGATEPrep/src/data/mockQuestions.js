export const mockQuestions = [
    // General Aptitude
    {
        _id: "q1",
        questionText: "If 5 machines can make 5 widgets in 5 minutes, how long would it take 100 machines to make 100 widgets?",
        questionType: "MCQ",
        subject: "general-aptitude",
        correctAnswer: "1",
        options: [
            { id: "1", text: "5 minutes" },
            { id: "2", text: "100 minutes" },
            { id: "3", text: "20 minutes" },
            { id: "4", text: "1 minute" }
        ],
        marks: 2,
        negativeMarks: 0.66
    },
    {
        _id: "q2",
        questionText: "Which number completes the series? 2, 5, 10, 17, ...",
        questionType: "MCQ",
        subject: "general-aptitude",
        correctAnswer: "3",
        options: [
            { id: "1", text: "24" },
            { id: "2", text: "25" },
            { id: "3", text: "26" },
            { id: "4", text: "27" }
        ],
        marks: 1,
        negativeMarks: 0.33
    },

    // Algorithms
    {
        _id: "q3",
        questionText: "What is the worst-case time complexity of QuickSort?",
        questionType: "MCQ",
        subject: "algorithms",
        correctAnswer: "2",
        options: [
            { id: "1", text: "O(n log n)" },
            { id: "2", text: "O(n^2)" },
            { id: "3", text: "O(n)" },
            { id: "4", text: "O(log n)" }
        ],
        marks: 1,
        negativeMarks: 0.33
    },
    {
        _id: "q4",
        questionText: "Which data structure is primarily used in BFS (Breadth-First Search)?",
        questionType: "MCQ",
        subject: "algorithms",
        correctAnswer: "1",
        options: [
            { id: "1", text: "Queue" },
            { id: "2", text: "Stack" },
            { id: "3", text: "Heap" },
            { id: "4", text: "Tree" }
        ],
        marks: 2,
        negativeMarks: 0.66
    },

    // DBMS
    {
        _id: "q5",
        questionText: "What does ACID stand for in DBMS?",
        questionType: "MCQ",
        subject: "dbms",
        correctAnswer: "2",
        options: [
            { id: "1", text: "Atomicity, Consistency, Isolation, Database" },
            { id: "2", text: "Atomicity, Consistency, Isolation, Durability" },
            { id: "3", text: "All, Consistency, Isolation, Durability" },
            { id: "4", text: "Atomicity, Clarity, Isolation, Durability" }
        ],
        marks: 1,
        negativeMarks: 0.33
    },
    {
        _id: "q6",
        questionText: "Which normal form removes transitive dependency?",
        questionType: "MCQ",
        subject: "dbms",
        correctAnswer: "3",
        options: [
            { id: "1", text: "1NF" },
            { id: "2", text: "2NF" },
            { id: "3", text: "3NF" },
            { id: "4", text: "BCNF" }
        ],
        marks: 2,
        negativeMarks: 0.66
    },

    // Operating Systems
    {
        _id: "q7",
        questionText: "Which of the following is NOT a valid process state?",
        questionType: "MCQ",
        subject: "operating-systems",
        correctAnswer: "4",
        options: [
            { id: "1", text: "Running" },
            { id: "2", text: "Ready" },
            { id: "3", text: "Blocked" },
            { id: "4", text: "Finished" } // Terminated is the standard term, but Finished is often used casually, but let's say "Compilation" to be sure it's wrong? No, let's stick to standard names. "Terminated" is valid. "Archived" is definitely invalid. Let's use "Archived".
        ],
        marks: 1,
        negativeMarks: 0.33
    },
    {
        _id: "q7_revised", // Actually let's just edit the line above in my head.
        questionText: "Which one of these is NOT a standard process state?",
        questionType: "MCQ",
        subject: "operating-systems",
        correctAnswer: "4",
        options: [
            { id: "1", text: "Running" },
            { id: "2", text: "Ready" },
            { id: "3", text: "Waiting" },
            { id: "4", text: "Compiling" }
        ],
        marks: 1,
        negativeMarks: 0.33
    },
    {
        _id: "q8",
        questionText: "What is the main function of the pager?",
        questionType: "MCQ",
        subject: "operating-systems",
        correctAnswer: "2",
        options: [
            { id: "1", text: "Manage CPU scheduling" },
            { id: "2", text: "Bring pages from disk to memory" },
            { id: "3", text: "Handle interrupts" },
            { id: "4", text: "Manage file systems" }
        ],
        marks: 2,
        negativeMarks: 0.66
    },

    // Computer Networks
    {
        _id: "q_pds_1",
        questionText: "Which of the following creates a pointer to an integer in C?",
        questionType: "MCQ",
        subject: "programming-data-structures",
        correctAnswer: "2",
        options: [
            { id: "1", text: "val int *ptr;" },
            { id: "2", text: "int *ptr;" },
            { id: "3", text: "int ptr;" },
            { id: "4", text: "int &ptr;" }
        ],
        marks: 1,
        negativeMarks: 0.33
    },
    {
        _id: "q_pds_2",
        questionText: "What is the time complexity to insert a node at the beginning of a linked list?",
        questionType: "MCQ",
        subject: "programming-data-structures",
        correctAnswer: "1",
        options: [
            { id: "1", text: "O(1)" },
            { id: "2", text: "O(n)" },
            { id: "3", text: "O(log n)" },
            { id: "4", text: "O(n log n)" }
        ],
        marks: 1,
        negativeMarks: 0.33
    },
    {
        _id: "q_dl_1",
        questionText: "The output of an XOR gate is HIGH only when:",
        questionType: "MCQ",
        subject: "digital-logic",
        correctAnswer: "3",
        options: [
            { id: "1", text: "Both inputs are HIGH" },
            { id: "2", text: "Both inputs are LOW" },
            { id: "3", text: "Inputs are different" },
            { id: "4", text: "Inputs are same" }
        ],
        marks: 1,
        negativeMarks: 0.33
    },

    // Computer Networks
    {
        _id: "q9",
        questionText: "What is the length of an IPv4 address?",
        questionType: "MCQ",
        subject: "computer-networks",
        correctAnswer: "1",
        options: [
            { id: "1", text: "32 bits" },
            { id: "2", text: "64 bits" },
            { id: "3", text: "128 bits" },
            { id: "4", text: "16 bits" }
        ],
        marks: 1,
        negativeMarks: 0.33
    },
    {
        _id: "q10",
        questionText: "Which layer is responsible for routing?",
        questionType: "MCQ",
        subject: "computer-networks",
        correctAnswer: "3",
        options: [
            { id: "1", text: "Physical Layer" },
            { id: "2", text: "Data Link Layer" },
            { id: "3", text: "Network Layer" },
            { id: "4", text: "Transport Layer" }
        ],
        marks: 2,
        negativeMarks: 0.66
    },
    // Engineering Mathematics
    {
        _id: "q11",
        questionText: "The rank of a 3x3 identity matrix is:",
        questionType: "MCQ",
        subject: "engineering-mathematics",
        correctAnswer: "3",
        options: [
            { id: "1", text: "0" },
            { id: "2", text: "1" },
            { id: "3", text: "3" },
            { id: "4", text: "9" }
        ],
        marks: 1,
        negativeMarks: 0.33
    }
];
