import React from "react";

function Toggle(props) {
  const { isToggled, setIsToggled } = props;

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="form-check form-switch pe-5">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        style={{ width: "40px", height: "24px" }}
        checked={isToggled}
        onChange={handleToggle}
      />
      <label
        className="form-check-label"
        htmlFor="flexSwitchCheckDefault"
        style={{ marginLeft: "10px" }}
      >
        {isToggled ? "Dark Mode ON" : "Dark Mode OFF"}
      </label>
    </div>
  );
}

export default Toggle;
