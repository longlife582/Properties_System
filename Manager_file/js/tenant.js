const submitBtn = document.querySelector(".btn");
const message = document.querySelector(".message");
const managerid = localStorage.getItem("managerId");
const form = document.querySelector(".addStaffForm");

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
