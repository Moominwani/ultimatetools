// Initialize display
let display = document.getElementById('display');

// Append characters to display
function appendToDisplay(value) {
    display.value += value;
}

// Calculate the result
function calculateResult() {
    try {
        let result = eval(display.value); // Simple eval to calculate expressions
        display.value = result;
        speakResult(result);  // Speak the result after calculation
    } catch (e) {
        display.value = "Error";
    }
}

// Clear the display
function clearDisplay() {
    display.value = '';
}

// Delete the last character (Backspace)
function deleteLastCharacter() {
    display.value = display.value.slice(0, -1);
}

// Speak the result in Indian number format
function speakResult(result) {
    let formattedResult = formatIndianNumber(result);
    let speech = new SpeechSynthesisUtterance(formattedResult);
    speech.lang = 'en-IN';  // Indian English accent
    window.speechSynthesis.speak(speech);
}

// Format number in Indian numbering system (e.g., 2,34,878 for 2 lakh 34 thousand)
function formatIndianNumber(num) {
    num = parseInt(num);
    if (isNaN(num)) return "Error";

    let numStr = num.toString();
    let lastThree = numStr.slice(-3);
    let otherNumbers = numStr.slice(0, -3);

    if (otherNumbers !== '') {
        otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    }

    return otherNumbers !== '' ? otherNumbers + ',' + lastThree : lastThree;
}

// Start Voice Recognition (continuous mode)
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-IN'; // Indian English
recognition.continuous = true; // Keep it running
recognition.interimResults = false;

recognition.onresult = function(event) {
    let command = event.results[event.results.length - 1][0].transcript.toLowerCase();
    processVoiceCommand(command);
};

function startVoiceRecognition() {
    recognition.start();
}

// Stop Voice Recognition
function stopVoiceRecognition() {
    recognition.stop();
}

// Process voice command with full sentence parsing
function processVoiceCommand(command) {
    let convertedCommand = command
        .replace(/plus/g, '+')
        .replace(/minus/g, '-')
        .replace(/into|multiply/g, '*')
        .replace(/divide/g, '/')
        .replace(/equals|calculate/g, '=');

    if (convertedCommand.includes('=')) {
        display.value = convertedCommand.replace('=', '');
        calculateResult();
    } else if (convertedCommand.includes('clear')) {
        clearDisplay();
    } else if (convertedCommand.includes('backspace')) {
        deleteLastCharacter();
    } else {
        appendToDisplay(convertedCommand);
    }
}