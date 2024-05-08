const submitBtn = document.querySelector(".btn");
const message = document.querySelector(".message");
const managerid = localStorage.getItem("managerId");
const form = document.querySelector(".addStaffForm");
const tableBody = document.querySelector(".table-body");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const Fname = document.querySelector("#fName").value;
  const sex = document.querySelector("#sex").value;
  const email = document.querySelector("#email").value;
  const DoB = document.querySelector("#dob").value;
  const phone = document.querySelector("#phoneNo").value;
  const address = document.querySelector("#address").value;
  const rent = document.querySelector("#rent").value;
  const lease_start = document.querySelector("#Lease-start").value;
  const lease_end = document.querySelector("#Lease-End").value;
  const nationality = document.querySelector("#nationality").value;
  const SOo = document.querySelector("#originState").value;
  const Lga = document.querySelector("#lga").value;

  if (
    !Fname ||
    !sex ||
    !email ||
    !DoB ||
    !phone ||
    !address ||
    !rent ||
    !lease_start ||
    !lease_end ||
    !nationality ||
    !SOo ||
    !Lga
  ) {
    message.textContent = "Please fill all field";
    setTimeout(() => {
      message.textContent = "";
    }, 5000);
    return;
  }

  let TenantData = {
    fullname: Fname,
    sex: sex,
    email_address: email,
    phone_Number: phone,
    DOB: DoB,
    Address: address,
    lease_start: lease_start,
    lease_end: lease_end,
    nationality: nationality,
    SOR: SOo,
    LGA: Lga,
    rent: rent,
    managerId: managerid,
  };

  try {
    const response = await fetch("http://localhost:5000/tenant", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(TenantData),
    });
    if (!response.ok) {
      const jsondata = await response.json();
      throw new Error(jsondata.error);
    }
    const message = await response.json();
    alert(message);
    form.reset();
  } catch (error) {
    message.textContent = error.message;
  }
});

// const managerID = localStorage.getItem("managerId");

// Function to fetch data from the backend/API
async function fetchData() {
  try {
    const response = await fetch(`http://localhost:5000/tenants/${managerid}`); // Replace with your backend endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    searchData = data;
    // Parse response body as JSON
    // Log the parsed data
    return data; // Return the parsed data
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array if there's an error
  }
}

fetchData();

// Function to generate HTML structure for a single data item
function createRow(dataItem) {
  const tr = document.createElement("tr");
  tr.classList.add("tr");

  const td1 = document.createElement("td");
  td1.classList.add("people");
  td1.addEventListener("click", () => {
    displayTeanantDetails(dataItem);
  });

  const img = document.createElement("img");
  img.src = "../images/user.avif";
  img.alt = "";
  const div = document.createElement("div");
  div.classList.add("people-de");

  const h5Name = document.createElement("h5");
  h5Name.textContent = dataItem.fullname;
  // Assuming 'name' is a property in your data item
  const pContact = document.createElement("p");
  pContact.classList.add("Contact");
  pContact.textContent = dataItem.phone_Number;
  // Assuming 'contact' is a property in your data item

  const td2 = document.createElement("td");
  const h5Address = document.createElement("h5");
  h5Address.textContent = dataItem.Address;
  td2.appendChild(h5Address);
  // Assuming 'address' is a property in your data item

  const td3 = document.createElement("td");
  const h5StartDate = document.createElement("h5");
  h5StartDate.textContent = dataItem.lease_start;
  td3.appendChild(h5StartDate);
  // Assuming 'startDate' is a property in your data item

  const td4 = document.createElement("td");
  const h5EndDate = document.createElement("h5");
  h5EndDate.textContent = dataItem.lease_end;
  td4.appendChild(h5EndDate);
  // Assuming 'endDate' is a property in your data item

  const td5 = document.createElement("td");
  const h5Rent = document.createElement("h5");
  h5Rent.textContent = `$${dataItem.rent}`;
  td5.appendChild(h5Rent);

  // Assuming 'rent' is a property in your data item

  const td6 = document.createElement("td");
  const h5Status = document.createElement("h5");
  h5Status.classList.add("active-click");
  h5Status.textContent = "active";
  td6.appendChild(h5Status);

  // Assuming 'status' is a property in your data item

  // Append elements to their respective parents
  div.appendChild(h5Name);
  div.appendChild(pContact);
  td1.appendChild(img);
  td1.appendChild(div);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);

  return tr;
}

let searchData;
// Function to render data in the table
async function renderData() {
  tableBody.innerHTML = ""; // Clear previous content

  const data = await fetchData();

  data.forEach((dataItem) => {
    const row = createRow(dataItem);
    tableBody.appendChild(row);
  });
}

function displayTeanantDetails(dataItem) {
  const det = document.querySelector(".showFulldeatails");
  const btn89 = document.querySelector(".btn5");
  det.classList.add("full-active");

  btn89.addEventListener("click", () => {
    det.classList.remove("full-active");
  });

  // Display staff details
  document.getElementById("nameElement").textContent = dataItem.fullname;
  document.getElementById("roleElement").textContent = dataItem.lease_start;
  document.getElementById("sex-element").textContent = dataItem.sex;
  document.getElementById("emailElement").textContent = dataItem.email_address;
  document.getElementById("addresselement").textContent = dataItem.Address;
  document.getElementById("SORElement").textContent = dataItem.SOR;
  document.getElementById("LGAelement").textContent = dataItem.LGA;
  document.getElementById("EducationElement").textContent = `$${dataItem.rent}`;
  document.getElementById("nationalityElement").textContent =
    dataItem.nationality;
  document.getElementById("phoneNumber-element").textContent =
    dataItem.phone_Number;

  const dob = new Date(dataItem.DOB);
  const age = calculateAge(dob);
  document.getElementById("Dob-element").textContent = `${age} years old`;

  document.getElementById("lease_endElement").textContent = dataItem.lease_end;
}

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

  const filteredTenants = searchData.filter((tenant) => {
    return tenant.fullname.toLowerCase().includes(searchTerm);
  });

  tableBody.innerHTML = "";

  filteredTenants.forEach((dataItem) => {
    const tr = document.createElement("tr");
    tr.classList.add("tr");

    const td1 = document.createElement("td");
    td1.classList.add("people");
    td1.addEventListener("click", () => {
      displayTeanantDetails(dataItem);
    });

    const img = document.createElement("img");
    img.src = "../images/user.avif";
    img.alt = "";
    const div = document.createElement("div");
    div.classList.add("people-de");

    const h5Name = document.createElement("h5");
    h5Name.textContent = dataItem.fullname;
    // Assuming 'name' is a property in your data item
    const pContact = document.createElement("p");
    pContact.classList.add("Contact");
    pContact.textContent = dataItem.phone_Number;
    // Assuming 'contact' is a property in your data item

    const td2 = document.createElement("td");
    const h5Address = document.createElement("h5");
    h5Address.textContent = dataItem.Address;
    td2.appendChild(h5Address);
    // Assuming 'address' is a property in your data item

    const td3 = document.createElement("td");
    const h5StartDate = document.createElement("h5");
    h5StartDate.textContent = dataItem.lease_start;
    td3.appendChild(h5StartDate);
    // Assuming 'startDate' is a property in your data item

    const td4 = document.createElement("td");
    const h5EndDate = document.createElement("h5");
    h5EndDate.textContent = dataItem.lease_end;
    td4.appendChild(h5EndDate);
    // Assuming 'endDate' is a property in your data item

    const td5 = document.createElement("td");
    const h5Rent = document.createElement("h5");
    h5Rent.textContent = `$${dataItem.rent}`;
    td5.appendChild(h5Rent);

    // Assuming 'rent' is a property in your data item

    const td6 = document.createElement("td");
    const h5Status = document.createElement("h5");
    h5Status.classList.add("active-click");
    h5Status.textContent = "active";
    td6.appendChild(h5Status);

    // Assuming 'status' is a property in your data item

    // Append elements to their respective parents
    div.appendChild(h5Name);
    div.appendChild(pContact);
    td1.appendChild(img);
    td1.appendChild(div);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    tableBody.appendChild(tr);
  });
});

// Call renderData() to populate the table with data when the page loads
window.addEventListener("DOMContentLoaded", renderData);
