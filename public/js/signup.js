$(document).ready(function() {
    const signUpForm = $("form.signup");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    signUpForm.on("submit", function(event) {
        event.preventDefault();
        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        signUpUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function signUpUser(email, password) {
        $.post("/api/signup", {
            email: email,
            password: password
        })
            .then(function() {
                window.location.replace("/members");
            })
            .fail(function() {
                M.toast({
                    html:
                        "Hmm, having some issues signing you up. Have you signed up before? If so, please go to the login page. Otherwise, check to make sure you entered a username and password correctly.",
                    displayLength: 7000
                });
            });
    }
});
