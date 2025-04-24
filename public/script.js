document.addEventListener("DOMContentLoaded", function () {
  // Step Navigation
  window.goToStep2 = function () {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    validateStep2(); // prüfen ob Passwortfeld schon befüllt ist
  };

  window.goToStep1 = function () {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
  };

  // Inputs
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Buttons
  const step1Button = document.getElementById("step1-button");
  const step2Button = document.getElementById("step2-button");

  // Step 1 Button aktivieren
  function validateStep1() {
    step1Button.disabled = usernameInput.value.trim() === "";
  }

  // Step 2 Button aktivieren
  function validateStep2() {
    const usernameFilled = usernameInput.value.trim() !== "";
    const passwordFilled = passwordInput.value.trim() !== "";
    step2Button.disabled = !(usernameFilled && passwordFilled);
  }

  // Event Listener für Step 1
  if (usernameInput && step1Button) {
    validateStep1();
    usernameInput.addEventListener("input", () => {
      validateStep1();
      validateStep2();
    });
  }

  if (passwordInput && step2Button) {
    passwordInput.addEventListener("input", validateStep2);
  }

  // Sprachumschaltung
  const langSelect = document.getElementById("language");
  if (langSelect) {
    langSelect.addEventListener("change", function () {
      const lang = this.value;
      switch (lang) {
        case "de":
          window.location.href = "/index.html";
          break;
        case "en":
          window.location.href = "/en.html";
          break;
        case "fr":
          window.location.href = "/fr.html";
          break;
        case "es":
          window.location.href = "/es.html";
          break;
      }
    });
  }

  // Fehlversuche Passwort (max. 2)
  let attempts = 0;
  if (step2Button) {
    step2Button.addEventListener("click", function (e) {
      e.preventDefault();

      if (attempts < 2) {
        alert("Falsches Passwort. Bitte versuche es erneut.");
        passwordInput.value = "";
        passwordInput.focus();
        attempts++;
        validateStep2();
      } else {
        alert("Letzter Versuch fehlgeschlagen. Zugriff gesperrt.");
        passwordInput.value = "";
        passwordInput.disabled = true;
        step2Button.disabled = true;
      }
    });
  }
});

