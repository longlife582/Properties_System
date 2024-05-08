const submitBtn = document.querySelector(".staffbtn");
const message = document.querySelector(".message");
const managerid = localStorage.getItem("managerId");
const form = document.querySelector(".addStaffForm");

const btn122 = document.getElementsByClassName("btn2")[0];
const popup1 = document.getElementsByClassName("popup")[0];
const btn444 = document.getElementsByClassName("btn3")[0];

btn122.addEventListener("click", () => {
  popup1.classList.add("popup-active");
});

btn444.addEventListener("click", () => {
  popup1.classList.remove("popup-active");

  fetchDataAndDisplay();
});

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const fName = document.querySelector("#fName").value;
  const lName = document.querySelector("#lName").value;
  const sex = document.querySelector("#sex").value;
  const email = document.querySelector("#email").value;
  const phoneNo = document.querySelector("#phoneNo").value;
  const dob = document.querySelector("#dob").value;
  const address = document.querySelector("#address").value;
  const position = document.querySelector("#position").value;
  const nationality = document.querySelector("#nationality").value;
  const originState = document.querySelector("#originState").value;
  const lga = document.querySelector("#lga").value;
  const education = document.querySelector("#education").value;

  if (
    !fName ||
    !lName ||
    !sex ||
    !email ||
    !phoneNo ||
    !dob ||
    !address ||
    !position ||
    !nationality ||
    !originState ||
    !lga ||
    !education
  ) {
    message.textContent = "Please fill in all fields.";
    setTimeout(() => {
      message.textContent = "";
    }, 5000);
    return;
  }

  let staffData = {
    name: `${fName} ${lName}`,
    email: email,
    sex: sex,
    phoneNumber: phoneNo,
    DoB: dob,
    address: address,
    position: position,
    nationality: nationality,
    SOR: originState,
    LGA: lga,
    Education: education,
    managerId: managerid,
  };

  try {
    const response = await fetch("http://localhost:5000/staff", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(staffData),
    });
    if (!response.ok) {
      const jsondata = await response.json();
      throw new Error(jsondata.error);
    }
    const responseData = await response.json();
    alert(responseData);
    form.reset();
  } catch (error) {
    message.textContent = error.message;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndDisplay();
});

let currentStaffMemberId;
let currentData;

async function fetchDataAndDisplay() {
  try {
    const response = await fetch(`http://localhost:5000/staff/${managerid}`);
    const data = await response.json();

    currentData = data;

    document.querySelector(".error").textContent = data.message;

    // console.log(data);
    const staffBody = document.getElementById("staffBody");

    // Clear existing content
    staffBody.innerHTML = "";

    // Iterate over each staff member and create table rows
    data.forEach((staffMember) => {
      currentStaffMemberId = staffMember._id;
      const tr = document.createElement("tr");
      tr.classList.add("tr");

      const td1 = document.createElement("td");
      td1.classList.add("people");

      const img = document.createElement("img");
      img.src = "../images/user.avif";
      img.alt = "";
      td1.appendChild(img);

      const div = document.createElement("div");
      div.classList.add("people-de");

      const h5 = document.createElement("h5");
      h5.textContent = staffMember.name; // Assuming name is a property of staffMember
      div.appendChild(h5);
      td1.appendChild(div);

      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.classList.add("role");
      const roleH5 = document.createElement("h5");
      roleH5.textContent = staffMember.position; // Assuming role is a property of staffMember
      td2.appendChild(roleH5);
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      const propertiesH5 = document.createElement("h5");
      propertiesH5.textContent = staffMember.sex; // Assuming properties is a property of staffMember
      td3.appendChild(propertiesH5);
      tr.appendChild(td3);

      const td4 = document.createElement("td");
      const emailH5 = document.createElement("h5");
      emailH5.textContent = staffMember.email; // Assuming email is a property of staffMember
      td4.appendChild(emailH5);
      tr.appendChild(td4);

      const td5 = document.createElement("td");
      td5.classList.add("edit");
      const editLink = document.createElement("a");
      editLink.href = "#";
      editLink.textContent = "edit";
      editLink.addEventListener("click", () => {
        displayStaffDetails(staffMember);
      });
      td5.appendChild(editLink);
      tr.appendChild(td5);

      staffBody.appendChild(tr);
    });
  } catch (error) {
    const errorp = document.querySelector(".error");
    errorp.textContent = "server down";
  }
}

function displayStaffDetails(staffMember) {
  const det = document.querySelector(".showFulldeatails");
  const btn89 = document.querySelector(".btn5");
  det.classList.add("full-active");

  btn89.addEventListener("click", () => {
    det.classList.remove("full-active");
  });

  // Display staff details
  document.getElementById("nameElement").textContent = staffMember.name;
  document.getElementById("roleElement").textContent = staffMember.position;
  document.getElementById("sex-element").textContent = staffMember.sex;
  document.getElementById("emailElement").textContent = staffMember.email;
  document.getElementById("addresselement").textContent = staffMember.address;
  document.getElementById("SORElement").textContent = staffMember.SOR;
  document.getElementById("LGAelement").textContent = staffMember.LGA;
  document.getElementById("EducationElement").textContent =
    staffMember.Education;
  document.getElementById("nationalityElement").textContent =
    staffMember.nationality;
  document.getElementById("phoneNumber-element").textContent =
    staffMember.phoneNumber;

  const dob = new Date(staffMember.DoB);
  const age = calculateAge(dob);
  document.getElementById("Dob-element").textContent = `${age} years old`;
}

const deletebtn = document.querySelector(".delete-btn");

deletebtn.addEventListener("click", async () => {
  try {
    // Assuming staffMember is accessible in this scope
    const response = await fetch(
      `http://localhost:5000/staff/${currentStaffMemberId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    const det = document.querySelector(".showFulldeatails");
    if (!response.ok) {
      alert("Failed to delete staff.");
    } else {
      alert("staff delete");
      det.classList.remove("full-active");
      fetchDataAndDisplay();
    }
  } catch (error) {
    console.error("Error deleting staff:", error.message);
  }
});

function calculateAge(dob) {
  const today = new Date();
  const dobYear = dob.getFullYear();
  const dobMonth = dob.getMonth();
  const dobDay = dob.getDate();

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  let age = todayYear - dobYear;

  // Check if the birthday has occurred this year
  if (todayMonth < dobMonth || (todayMonth === dobMonth && todayDay < dobDay)) {
    age--;
  }

  return age;
}

const searchBar = document.querySelector(".searchInput");

searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();

  const filteredStaff = currentData.filter((staffMember) =>
    staffMember.name.toLowerCase().includes(searchTerm)
  );

  staffBody.innerHTML = "";

  filteredStaff.forEach((staffMember) => {
    currentStaffMemberId = staffMember._id;
    const tr = document.createElement("tr");
    tr.classList.add("tr");

    const td1 = document.createElement("td");
    td1.classList.add("people");

    const img = document.createElement("img");
    img.src = "../images/user.avif";
    img.alt = "";
    td1.appendChild(img);

    const div = document.createElement("div");
    div.classList.add("people-de");

    const h5 = document.createElement("h5");
    h5.textContent = staffMember.name;
    div.appendChild(h5);
    td1.appendChild(div);

    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.classList.add("role");
    const roleH5 = document.createElement("h5");
    roleH5.textContent = staffMember.position;
    td2.appendChild(roleH5);
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    const propertiesH5 = document.createElement("h5");
    propertiesH5.textContent = staffMember.sex;
    td3.appendChild(propertiesH5);
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    const emailH5 = document.createElement("h5");
    emailH5.textContent = staffMember.email;
    td4.appendChild(emailH5);
    tr.appendChild(td4);

    const td5 = document.createElement("td");
    td5.classList.add("edit");
    const editLink = document.createElement("a");
    editLink.href = "#";
    editLink.textContent = "edit";
    editLink.addEventListener("click", () => {
      displayStaffDetails(staffMember);
    });
    td5.appendChild(editLink);
    tr.appendChild(td5);

    staffBody.appendChild(tr);
  });
});
