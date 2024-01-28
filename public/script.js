const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

recognition.start();



const recordButton = document.getElementById('recordButton');
const speechToText = document.getElementById('speechToText');
const chatGptResponse = document.getElementById('chatGptResponse');
const goodFaithButton = document.getElementById('goodFaith');
const badFaithButton = document.getElementById('badFaith');

const maxNumSentences = 2;
const maxNumTokens = 150;

let chosenVoice = undefined

speechSynthesis.onvoiceschanged = () => {
    chosenVoice = speechSynthesis.getVoices().find(voice => voice.name === "Google US English");
};


function saidTriggerStart(input) {
    const triggers = ["let me think", "let me cook"]
    return saidTrigger(input, triggers)
}

function strEndsWith(str, suffix) {
    return str.match(suffix+"$")==suffix;
}

function saidTrigger(input, triggers) {
    input = input.toLowerCase();
    for (let trigger of triggers) {
        if(strEndsWith(input,trigger)) return true
    }
    return false
}

function saidTriggerEnd(input) {
    const triggers = ["go ahead"]
    return saidTrigger(input, triggers)
}

let speakerTranscript = ""

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    speakerTranscript += transcript
    console.log(transcript)
    console.log(speakerTranscript)
    if(opponentTurn) speechToText.textContent = speakerTranscript;
    if(saidTriggerEnd(speakerTranscript)) {
        startListening();
    } else if(saidTriggerStart(speakerTranscript)) {
        getRebuttal();
    }
};



function getGPTContext(modifier) {
    return `You will play as “Gary”. ${modifier} You do not need to introduce his response, simply answer as he would. Gary’s answers are short and concise with a maximum of 2 sentences. The following pieces of texts are points your debate opponent are making.`
}

const fakeArgument = `Also, our administration, one of the things we’d like to work on, is providing representation for our
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
                "content": speakerTranscript,
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
        responseText = data.choices[0].message.content.trim();
        chatGptResponse.textContent =responseText
        speak(responseText);  // Call the speak function to read the response
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Add event listeners for 'good faith' and 'bad faith' buttons if needed
