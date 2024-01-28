import React, {useState, useEffect} from "react";
import Button from "./Button";

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.start();

console.log(process.env.REACT_APP_API_KEY )


function getGPTContext(modifier) {
  return `You will play as “Gary”. ${modifier} You do not need to introduce his response, simply answer as he would. Gary’s answers are short and concise with a maximum of 2 sentences. The following pieces of texts are points your debate opponent are making.`
}

let chosenVoice = undefined

speechSynthesis.onvoiceschanged = () => {
    chosenVoice = speechSynthesis.getVoices().find(voice => voice.name === "Google US English");
};

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = chosenVoice
  speechSynthesis.speak(utterance);
}

// Body Component
function Body() {
  const cardStyle = {
    width: "40rem",
    height: "15rem",
    backgroundColor: "#e7e5e53b",
    borderColor: "rgb(90, 8, 8)",
    borderWidth: "7px",
    borderRadius: "60px",
    color: "white",
  };

  const buttonStyle = {
    borderColor: "rgb(90, 8, 8)",
    borderWidth: "5px",
    borderRadius: "60px",
    color: "white",
  };

  const goodFaithButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#E48F45",
  };

  const badFaithButtonStyle = {
    ...buttonStyle,
    backgroundColor: "rgb(107, 50, 24)",
  };

  const [isOpponentTurn, setOpponentTurn] = useState(false);
  const [speakerTranscript, setSpeakerTranscript] = useState('');
  const [recordButtonText, setRecordButtonText] = useState('Record');
  const [speechToTextTextboxText, setSpeechToTextTextboxText] = useState('');
  const [responseText, setResponseText] = useState('Responses appear here...');
  const GaryModifiers = {
    BadFaith: "His goal is to “win” every argument rhetorically using any means necessary, he does not mind bending the facts.",
    GoodFaith: "His goal is to try his best to win the argument, using facts if they are available, but will admit if he is dead-wrong",
};

  const [currentModifier, setCurrentModifier] = useState(GaryModifiers.BadFaith)


  useEffect(() => {
    recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        const speakerTranscriptValue = speakerTranscript + transcript
        setSpeakerTranscript(speakerTranscriptValue);
        console.log(transcript);
        if (isOpponentTurn) {
          setSpeechToTextTextboxText(speakerTranscriptValue)
          if (saidTriggerStart(speakerTranscriptValue)) getRebuttal();
        } else if(saidTriggerEnd(speakerTranscriptValue)) {
            startListening();
        }

    };
    // Add other initialization code here, if necessary
});


function saidTriggerStart(input) {
  const triggers = ["let me think", "let me cook"]
  return saidTrigger(input, triggers)
}

function strEndsWith(str, suffix) {
  return str.match(suffix+"$")==suffix;
}

function saidTrigger(input, triggers) {
  console.log(input)
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


  const toggleRecording = () => {
    if(isOpponentTurn) {
      getRebuttal()
    } else {
      startListening()
    }
  };

  function startListening() {
    setRecordButtonText('Stop Listening');
    resetSpeakerTranscript()
    setSpeechToTextTextboxText("")
    setOpponentTurn(true)
}

function resetSpeakerTranscript() {
  console.log("reset")
  setSpeakerTranscript("");
}

  function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

  function getRebuttal() {
    if(isEmpty(speakerTranscript)) return
    setRecordButtonText('Listen');
    sendToChatGPT(speakerTranscript);
    setSpeakerTranscript()
    setOpponentTurn(false)
}


function sendToChatGPT(text) {
  const data = {
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      messages: [
          {
            "role": "system",
            "content": getGPTContext(currentModifier)
          },
          {
              "role": "user",
              "content": text,
          }
      ]
  };
  console.log("Bearer "  + process.env.REACT_APP_API_KEY)
  fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer vFkmRGZmMLkBnoyvnXKhT3BlbkFJlreEsJvIoCEmVpbsXHiw"
          // Replace API_KEY with your actual API key
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      setResponseText(data.choices[0].message.content.trim())
      speak(responseText);  // Call the speak function to read the response
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

  return (
    <div className="p-5 mb-4 rounded-3">
      <div className="container-fluid p-5">
        <div className="top container m-2">
          <div className="card" style={cardStyle}>
            <div className="card-body">
              <div className="p-3">
                <Button
                  className="btn-danger"
                  style={buttonStyle}
                  id="recordButton"
                  data-mdb-ripple-init
                  onClick={toggleRecording}
                >
                  {recordButtonText}
                </Button>
              </div>
              <div className="container m-2" style={{ borderColor: "black" }}></div>
              <p id="speechToText" style={{ textAlign: "center", fontSize: "1.3rem" }}>
                  {speechToTextTextboxText}
                                </p>
            </div>
          </div>
        </div>

        <div className="bottom container m-2 pt-5">
          <div className="card" style={cardStyle}>
            <div className="card-body">
              <div className="container">
                <div className="d-flex gap-3 p-3">
                  <Button
                    className="btn-success"
                    style={goodFaithButtonStyle}
                    id="goodFaith"
                    data-mdb-ripple-init
                    onClick={() => setCurrentModifier(GaryModifiers.GoodFaith)}
                  >
                    Good Faith
                  </Button>
                  <Button
                    className="btn-dark"
                    style={badFaithButtonStyle}
                    id="badFaith"
                    data-mdb-ripple-init
                    onClick={() => setCurrentModifier(GaryModifiers.BadFaith)}
                  >
                    Bad Faith
                  </Button>
                </div>
              </div>
              <div className="container m-3">
                <p id="chatGptResponse" style={{ textAlign: "center", fontSize: "1.3rem" }}>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
