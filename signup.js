document.addEventListener("DOMContentLoaded", function() {
    let elRegisterForm = document.querySelector(".register-form");

    if (elRegisterForm) {
        elRegisterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const username = e.target.username.value.trim();
            const password = e.target.password.value.trim();
            
         
            if (username === "" || password === "") {
                alert("Username va password maydonlari to‘ldirilishi kerak.");
                return; 
            }

            const newData = {
                newUsername: username,
                newPassword: password
            };

            localStorage.setItem("isRegistered", JSON.stringify(newData));
            window.location.href = "index.html"; 
        });
    } else {
        console.error("Formani topib bo‘lmadi: .register-form");
    }
});

