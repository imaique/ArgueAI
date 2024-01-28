import React, {useState} from "react";
import Button from "./Button";

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
  const [isRecording, setIsRecording] = useState(false);
  const [speakerTranscript, setSpeakerTranscript] = useState('');
  const [recordButtonText, setRecordButtonText] = useState('');
  const [speechToTextTextboxText, setSpeechToTextTextboxText] = useState('');
  
  "Responses appear here..."

  const GaryModifiers = {
    BadFaith: "His goal is to “win” every argument rhetorically using any means necessary, he does not mind bending the facts.",
    GoodFaith: "His goal is to try his best to win the argument, using facts if they are available, but will admit if he is dead-wrong",
};

  const [currentModifier, setCurrentModifier] = useState(GaryModifiers.BadFaith)

  const toggleRecording = () => {
    if(isOpponentTurn) {
      getRebuttal
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
  setSpeakerTranscriptTextboxText("");
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
                >
                  Record
                </Button>
              </div>
              <div className="container m-2" style={{ borderColor: "black" }}></div>
              <p id="speechToText" style={{ textAlign: "center", fontSize: "1.3rem" }}>
                Transcribed text appears here...
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
