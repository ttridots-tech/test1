// Step 1: Get the buttons container and display input
const buttonsContainer = document.getElementById("buttons");
const display = document.getElementById("display");

// Step 2: Define all the calculator buttons
const buttons = [
    "C", "%", "<=", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "00", "0", ".", "=", ,
];

// Step 3: Loop through each button label and create button elements
buttons.forEach(text => {
    const button = document.createElement("button");   // creates a <button> element
    button.textContent = text;                         // sets the text (like 7, 8, +, etc.)
    button.className = "btn btn-outline-secondary btn-lg"; // Bootstrap styling
    button.addEventListener("click", () => handleButtonClick(text)); // handle clicks
    buttonsContainer.appendChild(button);  // add to the buttons container
    // Give all buttons consistent height
    button.style.height = "50px";
    button.style.fontSize = "1.2rem";
    button.style.fontWeight = "500";

    // Make special buttons stand out
    if (text === "C") {
        button.classList.replace("btn-outline-secondary", "btn-danger");
    }
    if (text === "=") {
        button.classList.replace("btn-outline-secondary", "btn-success");
    }


});

function handleButtonClick(value) {
  if (value === "C") {
    // Clear the display
    display.value = "0";
  } else if (value === "=") {
    // Calculate the result using eval()
    try {
      display.value = eval(display.value);
    } catch (error) {
      display.value = "Error";
    }
  } else if (value === "<=") {
    // Backspace: remove last character
    display.value = display.value.slice(0, -1);
    if (display.value === "") display.value = "0";
  } else {
    // Append numbers/operators
    if (display.value === "0") {
      display.value = value; // replace 0 with first number
    } else {
      display.value += value; // add new number/operator
    }
  }
}

buttons.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
});
