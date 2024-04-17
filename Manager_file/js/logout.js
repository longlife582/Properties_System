const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", () => {
  // Clear the token from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("managerId");
  localStorage.removeItem("fullname");

  // Redirect back to the login page
  window.location.href = "../Html/sign.html";
});
