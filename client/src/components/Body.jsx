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

  const leaderboardStyle = {
    width: "30rem",
    height: "40rem",
    backgroundColor: "rgba(90, 8, 8, 0.5)",
    borderColor: "#E68f45",
    borderWidth: "7px",
    borderRadius: "60px",
    color: "white",
  }

  const rankingStyle = {    
    fontSize: "24px",


  }
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
  
  //"Responses appear here..."

  const GaryModifiers = {
    BadFaith: "His goal is to “win” every argument rhetorically using any means necessary, he does not mind bending the facts.",
    GoodFaith: "His goal is to try his best to win the argument, using facts if they are available, but will admit if he is dead-wrong",
};

  const [currentModifier, setCurrentModifier] = useState(GaryModifiers.BadFaith)

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
    //sendToChatGPT(speakerTranscript);
    setSpeakerTranscript()
    setOpponentTurn(false)
}

  return (
    <div className="p-5 mb-4 rounded-3">
      <div className="container-fluid p-5">
        <div class = "row">
        <div class = "col-9">
          <div className="top container m-2">
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <div className="p-3">
                  <button
                    type="button"
                    className="btn btn-danger btn-rounded"
                    id="recordButton"
                    style={buttonStyle}
                    data-mdb-ripple-init
                  >
                    Record
                  </button>
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
                    <button
                      type="button"
                      className="btn btn-success btn-rounded"
                      style={goodFaithButtonStyle}
                      data-mdb-ripple-init
                      id="goodFaith"
                    >
                      Good Faith
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark btn-rounded"
                      data-mdb-ripple-init
                      id="badFaith"
                      style={badFaithButtonStyle}
                    >
                      Bad Faith
                    </button>
                  </div>
                </div>

                <div className="container m-3">
                  <p id="chatGptResponse" style={{ textAlign: "center", fontSize: "1.3rem" }}>
                    Responses appear here...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-3">
          <div class = "card" style = {leaderboardStyle}>
            <div class = "card-body">
              <h1 class = "text-center">Leaderboards</h1>
              <div class="container" style = {rankingStyle}>
                <div class = "row p-2" id = "n1">
                  <div class = "col-2">
                    1
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
                <div class = "row p-2" id = "n2">
                  <div class = "col-2">
                    2
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
                <div class = "row p-2" id = "n3">
                  <div class = "col-2">
                    3
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
                <div class = "row p-2" id = "n4">
                  <div class = "col-2">
                    4
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
                <div class = "row p-2" id = "n5">
                  <div class = "col-2">
                    5
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
                <div class = "row p-2" id = "n6">
                  <div class = "col-2">
                    6
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
                <div class = "row p-2" id = "n7">
                  <div class = "col-2">
                    7
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
                <div class = "row p-2" id = "n8">
                  <div class = "col-2">
                    8
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
                <div class = "row p-2" id = "n9">
                  <div class = "col-2">
                    9
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
                <div class = "row p-2" id = "n10">
                  <div class = "col-2">
                    10
                  </div>
                  <div class = "col-7">
                    Mark
                  </div>
                  <div class = "col-3">
                    4000
                  </div>
                </div>
              

              
              </div>


            </div>
          </div>
        </div>  
      </div>      
      </div>
    </div>
  );
}

export default Body;
