//get the topic from the url 
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");

//here we update the page title
document.getElementById("subjectTitle").innerText =`SUBJECT:${subject}`
;

//subject data topic map to caontain the sub topics 
const topicMap ={
      "DSA": ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs", "Sorting Algorithms", "Searching Algorithms"],
      "DBMS": ["Normalization", "SQL", "Transactions", "Indexes", "Concurrency Control", "Database Design"],
      "OS": ["Processes", "Threads", "Memory Management", "File System", "Input/Output", "Scheduling"],
      "CN": ["Data Link Layer", "Physical Layer", "Network Layer", "Transport Layer", "Application Layer"],
      "DL": ["Backpropagation", "Convolutional Neural Networks", "Recurrent Neural Networks", "Generative Adversarial Networks", "Autoencoders", "Self-Attention Mechanisms"],
      "AI": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"],
      "ML": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"],
      "APTITUDE": ["Reasoning", "Arithmetic"],
      "REASONING": ["Reasoning", "Arithmetic"],
      "ENGLISH": ["Reasoning", "Arithmetic"],
      "C": ["Reasoning", "Arithmetic","functions", "Pointers", "Data Structures", "Algorithms"],
      "MATHS": ["Graphs", "probability","number theory", "Arithmetic"],
};

//Get the topic selected by the subject
const topics =topicMap[subject] || [];

const container =document.getElementById("topicsContainer");

topics.forEach((topic)=>{
    const div = document.createElement("div");
    div.className = "subject-card";
    div.innerHTML=`
            <h3>${topic}</h3>
            <button onclick="startTest('${topic}')">Start Exam</button>
    `;
    container.appendChild(div);
});


// Redirect to the exam page with the selected topic
function startTest(topic){
      window.location.href = `test.html?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`;
      // Here you can add any additional logic needed before starting the exam
}