$(document).ready(function() {
    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    // validate
    loginForm.on("submit", function(event) {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
            .then(function() {
                window.location.replace("/members");
            })
            .fail(function() {
                M.toast({
                    html:
                        "Hmm, having some issues logging you in. Have you signed up before? If not, please go to the signin page. Otherwise, check to make sure you entered your username and password correctly.",
                    displayLength: 7000
                });
            });
    }
});
