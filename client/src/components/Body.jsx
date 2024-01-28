import React, {useState, useEffect} from "react";
import Button from "./Button";
import Leaderboard from "./LeaderBoard";
import Settings from "./Settings";
import { func } from "prop-types";


const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.start();

const argumentStyles = ['Humorous','Sarcastic','Aggressive','Factual']



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
  const cardStyle = {
    width: "100%",
    minHeight: "15rem",
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

  const [isOpponentTurn, setOpponentTurn] = useState(false);
  const [speakerTranscript, setSpeakerTranscript] = useState('');
  const [recordButtonText, setRecordButtonText] = useState('Record');
  const [speechToTextTextboxText, setSpeechToTextTextboxText] = useState(`...`);
  const [responseText, setResponseText] = useState(``);
  const [startTriggers, setStartTriggers] = useState(["let me think", "let me cook"])
  const [endTriggers, setEndTriggers] = useState(["go ahead"])

  const GaryModifiers = {
    BadFaith: "His goal is to “win” every argument rhetorically using any means necessary, he does not mind bending the facts.",
    GoodFaith: "His goal is to try his best to win the argument, using facts if they are available, but will admit if he is dead-wrong",
};
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [argumentStylesSelected, setArgumentStylesSelected] = useState({
    Humorous: false,
    Sarcastic: false,
    Aggressive: false,
    Factual: false
  });
  const handleArgumentStyleChange = (style) => {
    setArgumentStylesSelected(prevStyles => ({
      ...prevStyles,
      [style]: !prevStyles[style]
    }));
  };

  function getGPTContext(modifier) {
    let styles = []
    for(let [style, included] of Object.entries(argumentStylesSelected)) {
      if(included) styles.push(style)
    }
    let personality = ""
    if(styles.length > 0) {
      personality = "Gary's argumentative style is " + argumentStyles.join(',') + "."
    }
    const context = `You will play as “Gary”. 
    ${modifier} ${personality} You do not need to introduce his response, simply answer as he would. 
    Gary’s answers are short and concise with a maximum of 3 sentences. Keep in mind that
    Gary's answers will be played back in someone's earbud, so use clear, straightforward language
    so that most people will not get stuck on a complicated word.
    The following pieces of texts are points your debate opponent are making.`
    console.log(context)
    return context
  }

  useEffect(() => {
    recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        const speakerTranscriptValue = speakerTranscript + transcript
        console.log(transcript)

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
  return saidTrigger(input, startTriggers)
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
  return saidTrigger(input, endTriggers)
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
            "content": getGPTContext(props.isBadFaith)
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

function removeStartTrigger(removeTrigger) {
  setStartTriggers(prevStartTriggers => prevStartTriggers.filter(trigger => trigger != removeTrigger))
}

function removeEndTrigger(removeTrigger) {
  setEndTriggers(oldEndTriggers => oldEndTriggers.filter(trigger => trigger != removeTrigger))
}

function addStartTrigger(newTrigger) {
  setStartTriggers(prevStartTriggers => [...prevStartTriggers, newTrigger.toLowerCase().trim()])
}

function addEndTrigger(newTrigger) {
  setEndTriggers(oldEndTriggers => [...oldEndTriggers, newTrigger.toLowerCase().trim()])
}

  return (
    <div className="p-5 mb-4 rounded-3" >
      <Settings isBadFaith={props.isBadFaith}
        argumentStylesSelected={argumentStylesSelected} 
  onArgumentStyleChange={handleArgumentStyleChange}

  startTriggers={startTriggers}
  removeStartTrigger={removeStartTrigger}
  addStartTrigger={addStartTrigger} 
  
  endTriggers={endTriggers}
  removeEndTrigger={removeEndTrigger}
  addEndTrigger={addEndTrigger} 
  ></Settings>
      <div className="container p-5">
        <div class = "row">
        <div class = "col-5" style={{width: "100%"}}>
          <div className="top container m-2">
            <h3>Opposing Point Transcript</h3>
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
            <h3>Optimal Response</h3>
            <div className="card" style={cardStyle}>
              <div className="card-body">
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
