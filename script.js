let isRecording = false;
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

const recordButton = document.getElementById('recordButton');
const speechToText = document.getElementById('speechToText');
const chatGptResponse = document.getElementById('chatGptResponse');

recordButton.addEventListener('click', () => {
    if (isRecording) {
        recognition.stop();
        recordButton.textContent = 'Record';
        sendToChatGPT(speechToText.value);
    } else {
        recognition.start();
        recordButton.textContent = 'Stop';
        speechToText.value = '';
    }
    isRecording = !isRecording;
});

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    speechToText.value += transcript;
    console.log(transcript)
};

function sendToChatGPT(text) {
    // Placeholder for ChatGPT API call
    // Use OpenAI's API here to send `text` and get a response
    // Update chatGptResponse.value with the response
}

// Add event listeners for 'good faith' and 'bad faith' buttons if needed
