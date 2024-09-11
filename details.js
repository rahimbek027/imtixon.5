document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);

    const name = params.get('name');
    const email = params.get('email');
    const phone = params.get('phone');
    const passport = params.get('passport');
    const date = params.get('date');
    const image = params.get('image');

    if (name && email && phone && passport && date && image) {
        document.getElementById('studentDetails').innerHTML = `
           <div class="detailss">

    <div class="images">
        <img src="./images/images.png" alt="Student Image"></div>
        <div class="malumot">
        <div><strong>Name:</strong> ${name}</div>
        <div><strong>Email:</strong> ${email}</div>
        <div><strong>Phone:</strong> ${phone}</div>
        <div><strong>Passport Number:</strong> ${passport}</div>
        <div><strong>Registration Date:</strong> ${date}</div>
    </div>
    </div>
        `;
    } else {
        document.getElementById('studentDetails').innerHTML = '<p>No details available.</p>';
    }
});

document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault();

    
    localStorage.clear();
    
   
    sessionStorage.clear();

    

    window.location.href = 'index.html';
});

