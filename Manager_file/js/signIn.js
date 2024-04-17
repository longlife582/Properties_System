const btn = document.querySelector(".btn");
const message = document.querySelector(".message");
const form = document.querySelector(".authForm");

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  if (!email || !password) {
    message.textContent = "Please fill the form";
    return; // Added return to stop execution if form is not filled
  }

  let user = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const jsonData = await response.json();
      throw new Error(jsonData.error); // Changed 'error' to 'Error'
    }

    const { managerId, token, name } = await response.json(); // Changed 'Fullname' to 'FullName'

    localStorage.setItem("managerId", managerId); // Changed 'userid' to 'managerId'
    localStorage.setItem("token", token);
    localStorage.setItem("fullname", name);

    window.location.href = "../Html/index.html";
  } catch (error) {
    message.textContent = error.message;
  }
});
