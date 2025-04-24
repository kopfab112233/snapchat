document.addEventListener("DOMContentLoaded", function () {

  window.goToStep2 = function () {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
  };

  window.goToStep1 = function () {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
  };

  const usernameInput = document.getElementById("username");
  const step1Button = document.getElementById("step1-button");

  step1Button.disabled = true;

  usernameInput.addEventListener("input", function () {
    step1Button.disabled = usernameInput.value.trim() === "";
  });

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
