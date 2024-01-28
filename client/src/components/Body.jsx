import React, {useState, useEffect} from "react";
import Button from "./Button";
import Leaderboard from "./LeaderBoard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.start();



function getGPTContext(modifier) {
  return `You will play as “Gary”. ${modifier} You do not need to introduce his response, simply answer as he would. Gary’s answers are short and concise with a maximum of 2 sentences. The following pieces of texts are points your debate opponent are making.`
}

let chosenVoice = undefined

speechSynthesis.onvoiceschanged = () => {
    chosenVoice = speechSynthesis.getVoices().find(voice => voice.name === "Google US English");
};

function speak(text, volume) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = chosenVoice
  if(volume) utterance.volume = volume
  speechSynthesis.speak(utterance);
}

// Body Component
function Body(props) {
  console.log(props)
  const cardStyle = {
    width: "100%",
    height: "15rem",
    backgroundColor: "#e7e5e53b",
    borderColor: "rgb(90, 8, 8)",
    borderWidth: "7px",
    borderRadius: "20px",
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

  const sassyButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#A367B1",
  };

  const factulButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#607274",
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
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const [currentModifier, setCurrentModifier] = useState(props.isBadFaith)
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const settingsStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '50px',
    cursor: 'pointer'
  };

  const popupStyle = {
    position: 'absolute',
    top: '40px',
    right: '10px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    display: showSettings ? 'block' : 'none' // Show or hide based on state
  };


  useEffect(() => {
    recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        const speakerTranscriptValue = speakerTranscript + transcript

        let finalRebut = null
        if (isOpponentTurn) {
          finalRebut = saidTriggerStart(speakerTranscriptValue);
          if (finalRebut) getRebuttal();
          else {
            setSpeakerTranscript(speakerTranscriptValue)
            setSpeechToTextTextboxText(speakerTranscriptValue)
          }
        } else {
          finalRebut = saidTriggerEnd(speakerTranscriptValue)
          if(finalRebut) startListening()
          else setSpeakerTranscript(speakerTranscriptValue);
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
  input = input.toLowerCase();
  for (let trigger of triggers) {
      if(strEndsWith(input,trigger)) {
        return input.substring(0, input.length - trigger.length)
      }
  }
  return null
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
    speak("Listening...")
  
}

function resetSpeakerTranscript() {
  setSpeakerTranscript("");
}

  function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

  function getRebuttal() {
    if(isEmpty(speakerTranscript)) return
    setRecordButtonText('Listen');
    speak("Creating optimal response.", 0.5)
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
  fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.REACT_APP_API_KEY
          // Replace API_KEY with your actual API key
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      const newResponseText = data.choices[0].message.content.trim()
      setResponseText(newResponseText)
      speak(newResponseText);  // Call the speak function to read the response
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

  return (
    <div className="p-5 mb-4 rounded-3" >
            <FontAwesomeIcon icon={faCog} style={settingsStyle} onClick={toggleSettings} />

<div style={popupStyle}>
  {/* Settings content goes here */}
  <p>Settings</p>
  {/* You can add form elements or other settings components here */}
</div>

      <div className="container p-5">
        <div class = "row">
        <div class = "col-5" style={{width: "100%"}}>
          <div className="top container m-2">
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <div className="p-3">
                  <Button
                    type="button"
                    className="btn btn-danger btn-rounded"
                    id="recordButton"
                    style={buttonStyle}
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

                    <button
                      type="button"
                      className="btn btn-dark btn-rounded"
                      data-mdb-ripple-init
                      id="sassy"
                      style={sassyButtonStyle}
                    >
                      Sassy
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark btn-rounded"
                      data-mdb-ripple-init
                      id="factual"
                      style={factulButtonStyle}
                    >
                      Factual
                    </button>
                  </div>
                </div>

                <div className="container m-3">
                  <p id="chatGptResponse" style={{ textAlign: "center", fontSize: "1.3rem" }}>
                  {responseText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-2">

        </div>
        <div className="col-3">
    {showLeaderboard ? <Leaderboard></Leaderboard>:""}
    </div>
      </div>      
      </div>
    </div>
  );
}

export default Body;
