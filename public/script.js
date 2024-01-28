let opponentTurn = false;
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

const recordButton = document.getElementById('recordButton');
const speechToText = document.getElementById('speechToText');
const chatGptResponse = document.getElementById('chatGptResponse');

const maxNumSentences = 2;
const maxNumTokens = 150;

let chosenVoice = undefined

speechSynthesis.onvoiceschanged = () => {
    chosenVoice = speechSynthesis.getVoices().find(voice => voice.name === "Google US English");
    console.log(chosenVoice)
};


recordButton.addEventListener('click', () => {
    if (opponentTurn) {
        getRebuttal()
    } else {
        startListening()
    }
    opponentTurn = !opponentTurn;
});

function startListening() {
    recognition.start();
    recordButton.textContent = 'Stop Listening';
    speechToText.value = '';
}

function getRebuttal() {
    recognition.stop();
    recordButton.textContent = 'Listen';
    sendToChatGPT(speechToText.value);
}

function saidTriggerStart(input) {
    const triggers = ["let me think", "let me cook"]
    return saidTrigger(input, triggers)
}

function saidTrigger(input, triggers) {
    input = input.toLowerCase();
    for (const trigger in triggers) {
        if(input.endsWith(trigger)) return true
    }
    return false
}

function saidTriggerEnd(input) {
    const triggers = ["go ahead"]
    return saidTrigger(input, triggers)
}

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    speechToText.value += transcript;
    if(saidTriggerWord)
    console.log(transcript)
};

const GaryModifiers = {
    BadFaith: "His goal is to “win” every argument rhetorically using any means necessary, he does not mind bending the facts.",
    GoodFaith: "His goal is to try his best to win the argument, using facts if they are available, but will admit if he is dead-wrong",
};

function getGPTContext(modifier) {
    return `You will play as “Gary”. ${modifier} You do not need to introduce his response, simply answer as he would. Gary’s answers are short and concise with a maximum of 2 sentences. The following pieces of texts are points your debate opponent are making.`
}

const fakeprompt = `Also, our administration, one of the things we’d like to work on, is providing representation for our
international students, so one of the things we plan to do is work with the Career connections center to
essentially create greater accessibility to international students so that they feel prepared for the real world, and
they are able to graduate, because at the end of the day, that’s what we are all here to do. So, I think what makes
Gator Party unique is the effort that we are putting into student interest.`



function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = chosenVoice
    speechSynthesis.speak(utterance);
}

function sendToChatGPT(text) {
    const data = {
        model: "gpt-3.5-turbo",
        max_tokens: 150,
        messages: [
            {
              "role": "system",
              "content": getGPTContext(GaryModifiers.BadFaith)
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
            "Authorization": "Bearer "  + API_KEY // Replace API_KEY with your actual API key
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        responseText = data.choices[0].message.content.trim();
        chatGptResponse.value =responseText
        speak(responseText);  // Call the speak function to read the response
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Add event listeners for 'good faith' and 'bad faith' buttons if needed
