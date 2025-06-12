const ul = document.querySelector(".tasklist");
const input = document.querySelector("#taskInput");
const addButton = document.getElementById("addTaskButton");

function addTask() {
      const taskText = input.value.trim();
      if (taskText === "") return;

      const li = document.createElement("li");
      li.textContent = taskText;

//delete btn function and add
       const delBtn = document.createElement("button");
       delBtn.textContent = "❌";
       delBtn.classList.add("delete-btn");
       delBtn.addEventListener("click", () => {
       li.remove();
  });

  li.appendChild(delBtn);
      ul.appendChild(li);
      input.value = ""; // Clear the input field after adding the task

}


addButton.addEventListener("click", addTask)