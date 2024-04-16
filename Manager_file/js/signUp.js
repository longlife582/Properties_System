document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".authForm");
  const submitButton = document.querySelector(".submit-button");

  submitButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const FullName = document.getElementById("fName").value;
    const Email = document.getElementById("email").value;
    const PhoneNumber = document.getElementById("contact").value;
    const password = document.querySelector("#password").value;
    const confPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementsByClassName("message")[0];

    if (!FullName || !Email || !PhoneNumber || !confPassword) {
      message.textContent = "Please fill all fields.";
      return;
    }

    if (password !== confPassword) {
      message.textContent = "Passwords do not match";
      return;
    }

    let formData = {
      FullName: FullName,
      email: Email,
      contact: PhoneNumber,
      password: confPassword,
    };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const jsondata = await response.json();
        throw new Error(jsondata.error);
      }
      const message = await response.json(); // Read the message from the response
      alert(message);
      form.reset(); // Alert the message
    } catch (error) {
      message.textContent = error.message;
    }
  });
});
