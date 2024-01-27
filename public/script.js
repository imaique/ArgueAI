let isRecording = false;
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

const recordButton = document.getElementById('recordButton');
const speechToText = document.getElementById('speechToText');
const chatGptResponse = document.getElementById('chatGptResponse');

const maxNumSentences = 2;
const maxNumTokens = 150;


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

const fakeprompt = `Also, our administration, one of the things we’d like to work on, is providing representation for our
international students, so one of the things we plan to do is work with the Career connections center to
essentially create greater accessibility to international students so that they feel prepared for the real world, and
they are able to graduate, because at the end of the day, that’s what we are all here to do. So, I think what makes
Gator Party unique is the effort that we are putting into student interest.`

function sendToChatGPT(text) {
    const data = {
        model: "gpt-3.5-turbo",
        max_tokens: 150,
        messages: [
            {
              "role": "system",
              "content": "You will play as “Gary”. Gary’s goal is to “win” every argument rhetorically using any means necessary, he does not mind bending the facts. You do not need to introduce his response, simply answer as he would. Gary’s answers are short and concise with a maximum of 2 sentences. The following pieces of texts are points your debate opponent are making."
            },
            {
                "role": "user",
                "content": fakeprompt,
            }
        ]
    };

    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"  // Replace API_KEY with your actual API key
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        chatGptResponse.value = data.choices[0].message.content.trim();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Add event listeners for 'good faith' and 'bad faith' buttons if needed
