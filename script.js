document.addEventListener("DOMContentLoaded", function() {
    const elLoginForm = document.querySelector(".login-form");
    const isRegistered = JSON.parse(localStorage.getItem("isRegistered"));

    elLoginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const data = {
            username: e.target.username.value.trim(),
            password: e.target.password.value.trim()
        };

        if (isRegistered) {
            if (data.username === isRegistered.newUsername && data.password === isRegistered.newPassword) {
                window.location.href = "admin.html"; 
            } else {
                alert("Login yoki parol xato !!!");
            }
        } else {
            if (data.username === "Rahimbek" && data.password === "123") {
                window.location.href = "admin.html"; 
            } else {
                alert("Login yoki parol xato !!!");
            }
        }
    });
});
