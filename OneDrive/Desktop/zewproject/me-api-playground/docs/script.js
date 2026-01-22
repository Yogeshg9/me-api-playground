const API = "http://localhost:5000";


  //  REGISTER USER

async function register() {
  try {
    const regName = document.getElementById("regName");
    const regEmail = document.getElementById("regEmail");
    const regPassword = document.getElementById("regPassword");

    const res = await fetch(API + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: regName.value,
        email: regEmail.value,
        password: regPassword.value
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful! Now login.");
      regName.value = "";
      regEmail.value = "";
      regPassword.value = "";
    } else {
      alert(data.error);
    }
  } catch (err) {
    alert("Server error");
  }
}


  //  LOGIN USER

async function login() {
  try {
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    const res = await fetch(API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value
      })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      alert("✅ Login successful");
      window.location.href = "profile.html";
    } else {
      alert((data.error || "Login failed"));
    }
  } catch (err) {
    alert("Server error");
  }
}


  //  LOAD PROFILE (profile.html)

async function loadProfile() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch(API + "/profile", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById("name").value = data.name || "";
      document.getElementById("email").value = data.email || "";
      document.getElementById("education").value = data.education || "";
      document.getElementById("skills").value = (data.skills || []).join(", ");
    } else {
      alert(data.error);
    }
  } catch (err) {
    alert("Server error");
  }
}


  //  SAVE / UPDATE PROFILE

async function saveProfile() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const educationInput = document.getElementById("education");
  const skillsInput = document.getElementById("skills");
  const output = document.getElementById("output");

  try {
    const res = await fetch(API + "/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        education: educationInput.value,
        skills: skillsInput.value.split(",").map(s => s.trim())
      })
    });

    const data = await res.json();

    if (res.ok) {
      output.textContent = "Profile saved successfully";
    } else {
      output.textContent = data.error;
    }
  } catch (err) {
    output.textContent = "Server error";
  }
}

  //  LOGOUT

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
