import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function Settings(props) {
    const argumentStyles = ['Humorous','Sarcastic','Aggressive','Factual']
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
      };
    
      const settingsStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '50px',
        cursor: 'pointer',
    };

    const removeStyle = {
        display: 'inline-block',
        marginLeft: '10px',
        padding: '2px 4px',
        background: "#a93c2b",
        color: '#ff0',
        cursor: 'pointer'
    }

    const handleCheckboxChange = (e) => {
        props.onArgumentStyleChange(e.target.name);
      };
    
      const popupStyle = {
        color: 'black',
        position: 'absolute',
        top: '40px',
        right: '10px',
        zIndex: '1',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        display: showSettings ? 'block' : 'none' // Show or hide based on state
      };
    return(<>
    <FontAwesomeIcon icon={faCog} style={{...settingsStyle, color: props.isBadFaith ? "#a93c2b" : ''}} onClick={toggleSettings} />

    <div style={popupStyle}>
    {/* Settings content goes here */}
    <h2 style={{fontWeight: "bold"}}>Settings</h2>
    <div>
        <h3>Argument Styles</h3>
        <div>
            {argumentStyles.map((style) => (
                <div>
                <input onChange={handleCheckboxChange} type="checkbox" id={style} name={style} value={style}/>
                <label for={style} style={{paddingLeft: "10px"}}>{style}</label>
                </div>
            ))}
        </div>
    </div>
    <div>
        <h3>Start Triggers</h3>
        <input type="text" name="startTriggers" id="newStartTrigger"/>
        <input type="button" value="Add Trigger" onClick={() => props.addStartTrigger(document.getElementById('newStartTrigger').value)}></input>
        <ul id="start-triggers">
            {props.startTriggers.map((trigger) => (
                <li>"{trigger}"
                    <span style={removeStyle} onClick={() => props.removeStartTrigger(trigger)}>remove</span>
                </li>
            ))}
        </ul>
    </div>
    <div>
        <h3>End Triggers</h3>
        <input type="text" name="endTriggers" id="newEndTrigger"/>
        <input type="button" value="Add Trigger" onClick={() => props.addEndTrigger(document.getElementById('newEndTrigger').value)}></input>
        <ul id="end-triggers">
            {props.endTriggers.map((trigger) => (
                <li>"{trigger}"
                    <span style={removeStyle} onClick={() => props.removeEndTrigger(trigger)}>remove</span>
                </li>
            ))}
        </ul>
    </div>
    </div>
</>)
}
export default Settings