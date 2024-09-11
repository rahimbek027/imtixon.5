function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => displayStudentInfo(student));
}


document.getElementById('showFormButton').addEventListener('click', function() {
    document.getElementById('studentForm').style.display = 'block';
});


document.getElementById('hideFormButton').addEventListener('click', function() {
    document.getElementById('studentForm').style.display = 'none';
});


document.getElementById('newStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;
    const passport = document.getElementById('studentPassport').value;
    const date = document.getElementById('studentDate').value;
    const imageFile = document.getElementById('studentImage').files[0];

    if (name && email && phone && passport && date && imageFile) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const student = {
                name: name,
                email: email,
                phone: phone,
                passport: passport,
                date: date,
                image: event.target.result
            };
            saveStudentToLocalStorage(student);
            displayStudentInfo(student);
            document.getElementById('newStudentForm').reset();
            document.getElementById('studentForm').style.display = 'none';
        };
        
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please fill in all fields.');
    }
});

// Save 
function saveStudentToLocalStorage(student) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

function displayStudentInfo(student) {
    const studentDisplay = document.getElementById('studentDisplay');
    
    const studentDiv = document.createElement('div');
    studentDiv.className = 'student-info-display';
    
    studentDiv.innerHTML = `
       <div>
        <img src="${student.image}" alt="Student Image">
        <div> ${student.name}</div>
        <div> ${student.email}</div>
        <div>${student.phone}</div>
        <div> ${student.passport}</div>
        <div> ${student.date}</div>
        <button class="more-button" onclick="showMoreDetails('${student.name}', '${student.email}', '${student.phone}', '${student.passport}', '${student.date}', '${student.image}')">More</button>
        <button class="update-button" onclick="updateStudent(this)">Update</button>
        <button class="delete-button" onclick="deleteStudent(this)">Delete</button>
    </div>
    `;
    
    studentDisplay.appendChild(studentDiv);
}

// more 
function showMoreDetails(name, email, phone, passport, date, image) {
    const query = new URLSearchParams({
        name: encodeURIComponent(name),
        email: encodeURIComponent(email),
        phone: encodeURIComponent(phone),
        passport: encodeURIComponent(passport),
        date: encodeURIComponent(date),
        image: encodeURIComponent(image)
    }).toString();

    window.location.href = `details.html?${query}`;
}

// Update
function updateStudent(button) {
    const studentDiv = button.closest('.student-info-display');
    
   
    if (!studentDiv) {
        alert('Student information not found.');
        return;
    }

  
    const infoDivs = studentDiv.querySelectorAll('div');
    if (infoDivs.length < 5) {
        alert('Student information is incomplete.');
        return;
    }

    const image = studentDiv.querySelector('img').src;
    const name = infoDivs[0].textContent.trim();
    const email = infoDivs[1].textContent.trim();
    const phone = infoDivs[2].textContent.trim();
    const passport = infoDivs[3].textContent.trim();
    const date = infoDivs[4].textContent.trim();

    
    document.getElementById('editStudentName').value = name;
    document.getElementById('editStudentEmail').value = email;
    document.getElementById('editStudentPhone').value = phone;
    document.getElementById('editStudentPassport').value = passport;
    document.getElementById('editStudentDate').value = date;
    
   
    document.getElementById('updateIndex').value = Array.from(document.querySelectorAll('.student-info-display')).indexOf(studentDiv);
    
  
    document.getElementById('editStudentImage').value = ''; 

    
    document.getElementById('updateForm').style.display = 'block';
}




document.getElementById('hideUpdateFormButton').addEventListener('click', function() {
    document.getElementById('updateForm').style.display = 'none';
});


document.getElementById('editStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const index = document.getElementById('updateIndex').value;
    const name = document.getElementById('editStudentName').value;
    const email = document.getElementById('editStudentEmail').value;
    const phone = document.getElementById('editStudentPhone').value;
    const passport = document.getElementById('editStudentPassport').value;
    const date = document.getElementById('editStudentDate').value;
    const imageFile = document.getElementById('editStudentImage').files[0];
    
    if (index !== undefined) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students[index];

        if (name && email && phone && passport && date) {
            const image = imageFile ? URL.createObjectURL(imageFile) : student.image;
            const reader = new FileReader();

            if (imageFile) {
                reader.onload = function(event) {
                    student.image = event.target.result;
                    studentDiv.querySelector('img').src = student.image;
                };
                reader.readAsDataURL(imageFile);
            } else {
                studentDiv.querySelector('img').src = student.image;
            }

            student.name = name;
            student.email = email;
            student.phone = phone;
            student.passport = passport;
            student.date = date;

            localStorage.setItem('students', JSON.stringify(students));

            const studentDiv = document.querySelectorAll('.student-info-display')[index];
            studentDiv.querySelector('div').innerHTML = `
                <div> ${name}</div>
                <div> ${email}</div>
                <div> ${phone}</div>
                <div> ${passport}</div>
                <div> ${date}</div>
            `;

            document.getElementById('updateForm').style.display = 'none';
        } else {
            alert('Please fill in all fields.');
        }
    } else {
        alert('Student not found.');
    }
});

// Delete
function deleteStudent(button) {
    if (confirm('Malumotlarni ochirishingizga ishonchingiz komilmi ?')) {
        const studentDiv = button.closest('.student-info-display');
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const index = Array.from(document.querySelectorAll('.student-info-display')).indexOf(studentDiv);
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        document.getElementById('studentDisplay').removeChild(studentDiv);
    }
}

// Search 
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const students = document.querySelectorAll('.student-info-display');
    
    students.forEach(student => {
        const name = student.querySelector('div').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            student.style.display = 'flex';
        } else {
            student.style.display = 'none';
        }
    });
});


window.onload = loadStudents;

document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault(); 

    
    localStorage.clear();
    
    
    sessionStorage.clear();

    

   
    window.location.href = 'index.html';
});



