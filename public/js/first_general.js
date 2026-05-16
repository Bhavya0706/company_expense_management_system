

function validateForm() {
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    message.innerHTML = "";
    message.className = "";
  
    let errors = [];
  
    // 1️⃣ Length check
    if (password.length < 8 || password.length > 12) {
      errors.push("Password must be between 8 to 12 characters.");
    }
  
    // 2️⃣ Must contain at least one capital letter
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
  
    // 3️⃣ Must contain at least one number
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
  
    // 4️⃣ Check 4-character similarity with email
    const emailStr = email.replace(/[^a-z0-9]/gi, ""); // remove special chars
    const passStr = password.toLowerCase();
  
    for (let i = 0; i <= emailStr.length - 4; i++) {
      const subEmail = emailStr.substring(i, i + 4);
      if (passStr.includes(subEmail)) {
        errors.push("Password is too similar to the email (shares part of it).");
        break;
      }
    }
  
    // 5️⃣ Show results
    if (errors.length > 0) {
      message.className = "error";
      message.innerHTML = errors.join("<br>");
    } else {
      message.className = "success";
      message.innerHTML = "✅ Password is valid!";
    }
  }
  