document.getElementById('startbtn').addEventListener('click', () => {
  document.getElementById('subjectsSection').scrollIntoView({
    behavior: 'smooth',
  });
});

//now hardcore subject (taht will fetch the backend  later)

const subjects = [
  'DSA',
  'DBMS',
  'OS',
  'CN',
  'DL',
  'AI',
  'ML',
  'APTITUDE',
  'REASONING',
  'ENGLISH',
  'C',
  'MATHS',
];

const subjectGrid = document.getElementById('subjectGrid');

subjects.forEach((subject) => {
  const card = document.createElement('div');
  card.className = 'subject-Card';
  card.innerText = subject;
  card.onclick = () => {
    window.location.href = `topics.html?subject=${encodeURIComponent(subject)}`;
  };

  subjectGrid.appendChild(card);
});
