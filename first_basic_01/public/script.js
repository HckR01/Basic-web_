document.getElementById('userForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const age = parseInt(document.getElementById('age').value, 10);
  const details = document.getElementById('details').value;

  const messageEl = document.getElementById('message');

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, dob, age, details })
    });

    if (response.ok) {
      messageEl.style.color = 'green';
      messageEl.textContent = 'User data saved successfully!';
      this.reset();
    } else {
      const errorText = await response.text();
      messageEl.style.color = 'red';
      messageEl.textContent = 'Error: ' + errorText;
    }
  } catch (error) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Error submitting data.';
    console.error(error);
  }
});
