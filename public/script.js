function goToStep2() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

function goToStep1() {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step1").style.display = "block";
}

const usernameInput = document.getElementById("username");
const step1Button = document.getElementById("step1-button");

step1Button.disabled = true;

usernameInput.addEventListener("input", () => {
  step1Button.disabled = usernameInput.value.trim() === "";
});
