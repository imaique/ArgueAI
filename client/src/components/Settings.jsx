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
    
      const popupStyle = {
        color: 'black',
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
    return(<>
    <FontAwesomeIcon icon={faCog} style={{...settingsStyle, color: props.isBadFaith ? "#a93c2b" : ''}} onClick={toggleSettings} />

    <div style={popupStyle}>
    {/* Settings content goes here */}
    <h2 style={{fontWeight: "bold"}}>Settings</h2>
    <h3>Argument Styles</h3>
    <div>
        {argumentStyles.map((style) => (
            <div>
              <input type="checkbox" id={style} name={style} value={style}/>
              <label for={style} style={{paddingLeft: "10px"}}>{style}</label>
            </div>
        ))}
    </div>
    {/* You can add form elements or other settings components here */}
    </div>
</>)
}
export default Settings