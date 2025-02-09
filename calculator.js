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

// Speak the result
function speakResult(result) {
    let speech = new SpeechSynthesisUtterance(result);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

// Start Voice Recognition (for voice control)
function startVoiceRecognition() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event) {
        let command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
    };
}

// Handle voice command and append it to display
function handleVoiceCommand(command) {
    // Add common mathematical terms to voice command
    if (command.includes('plus')) {
        appendToDisplay('+');
    } else if (command.includes('minus')) {
        appendToDisplay('-');
    } else if (command.includes('times') || command.includes('multiply')) {
        appendToDisplay('*');
    } else if (command.includes('divide')) {
        appendToDisplay('/');
    } else if (command.includes('clear')) {
        clearDisplay();
    } else if (command.includes('equals') || command.includes('calculate')) {
        calculateResult();
    } else if (command.includes('backspace')) {
        deleteLastCharacter();
    } else {
        // If the command doesn't match any, just append it to the display
        appendToDisplay(command);
    }
}