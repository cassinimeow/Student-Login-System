// --- Student CRUD UI ---
const apiUrl = 'http://localhost:3000';

const studentForm = document.getElementById('studentForm');
const studentsTable = document.getElementById('studentsTable').querySelector('tbody');
const messageDiv = document.getElementById('message');

function showMessage(msg, isError = false) {
  messageDiv.textContent = msg;
  messageDiv.style.color = isError ? 'red' : 'green';
  setTimeout(() => { messageDiv.textContent = ''; }, 2000);
}

function fetchStudents() {
  fetch(apiUrl + '/students')
    .then(res => res.json())
    .then(data => {
      studentsTable.innerHTML = '';
      data.forEach(stu => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${stu.id}</td>
          <td>${stu.student_number}</td>
          <td>${stu.full_name}</td>
          <td>${stu.email}</td>
          <td>
            <button onclick="editStudent(${stu.id}, '${stu.student_number}', '${stu.password}', '${stu.full_name}', '${stu.email}')">Edit</button>
            <button onclick="deleteStudent(${stu.id})">Delete</button>
          </td>
        `;
        studentsTable.appendChild(tr);
      });
    });
}

window.editStudent = function(id, student_number, password, full_name, email) {
  document.getElementById('studentId').value = id;
  document.getElementById('student_number').value = student_number;
  document.getElementById('password').value = password;
  document.getElementById('full_name').value = full_name;
  document.getElementById('email').value = email;
}

window.deleteStudent = function(id) {
  if (!confirm('Delete this student?')) return;
  fetch(apiUrl + '/students/' + id, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => {
      showMessage('Student deleted');
      fetchStudents();
    });
}

studentForm.onsubmit = function(e) {
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const student_number = document.getElementById('student_number').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('full_name').value;
  const email = document.getElementById('email').value;
  const payload = { student_number, password, full_name, email };
  if (id) {
    // Update
    fetch(apiUrl + '/students/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        showMessage('Student updated');
        studentForm.reset();
        fetchStudents();
      });
  } else {
    // Create
    fetch(apiUrl + '/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok && data && data.error) {
          showMessage(data.error, true);
        } else {
          showMessage('Student added');
          studentForm.reset();
          fetchStudents();
        }
      });
  }
}

fetchStudents();