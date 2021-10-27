const form = document.querySelector("#contactForm");

form.addEventListener("submit", validateContactForm);

const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
let firstNameHasError = false;

const lastName = document.querySelector("#lastName");
const lastNameError = document.querySelector("#lastNameError");
let lastNameHasError = false;

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const invalidEmailError = document.querySelector("#invalidEmailError");
let emailHasError = false;

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
let messageHasError = false;

const formMessage = document.querySelector("#formMessage");

function validateContactForm(e) {
    e.preventDefault();
    console.log("The form was submitted");

    //Validate first name
    const firstNameValue = firstName.value;
    if (checkInputLength(firstNameValue, 1) === true) {
        firstNameError.style.display = "none";
        firstNameHasError = false;
    } else {
        firstNameError.style.display = "block";
        firstNameHasError = true;
    }

    //Validate lastname
    const lastNameValue = lastName.value;
    if (checkInputLength(lastNameValue, 1) === true) {
        lastNameError.style.display = "none";
        lastNameHasError = false;
    } else {
        lastNameError.style.display = "block";
        lastNameHasError = true;
    }

    // Validate email
    const emailValue = email.value;
    if (checkInputLength(emailValue, 3) === true) {
        emailError.style.display = "none";
        emailHasError = false;
    } else {
        emailError.style.display = "block";
        emailHasError = true;
    }

    if (validateEmail(emailValue) === true) {
        invalidEmailError.style.display = "none";
    } else {
        invalidEmailError.style.display = "block";
    }

    //Validate message
    const messageValue = message.value;
    if (checkInputLength(messageValue, 10) === true) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
    }

    if (
        firstNameHasError === true ||
        lastNameHasError === true ||
        messageHasError === true ||
        emailHasError === true
    ) {
        formMessage.innerHTML = "Please check your details";
        formMessage.style.display = "block";
    } else {
        form.reset();
        formMessage.style.display = "block";
        formMessage.innerHTML = "Message sent";
    }
}

function checkInputLength(value, validationLength) {
    const trimmedValue = value.trim();

    if (trimmedValue.length > validationLength) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
}
