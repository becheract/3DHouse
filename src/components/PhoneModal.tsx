import React, { useEffect} from "react";


interface Modal {
  openPhoneModal: () => void;
  onClose:() => void;
  isOpen: boolean;
  textDescription : string;
}

function PhoneModal(props : Modal) {

  function appearChars(str: string, elem: HTMLElement, timeBetween: number) {
    let index = 0;
    function displayNextChar() {
      if (index < str.length) {
        elem.innerHTML += str.charAt(index);
        index++;
        setTimeout(displayNextChar, timeBetween);
      }
    }
    displayNextChar();
  }


  useEffect(() => {

    // console.log('inside dark modal')
    // console.log(currentObject.textDescription)
    const elem = document.getElementById("textDescription");
    if (elem) appearChars(props.textDescription, elem, 42);

    // Cleanup function to clear text content when the modal is closed
    return () => {
      if (elem) elem.innerHTML = "";
    };
  }, [props.isOpen]);



  return (
    <>
   
      <div style={overlayStyle}>
      <div style={modalStyle}>
        <p id="textDescription"></p>
      </div>

      <div style={controlsStyles}>
        <img src="./public/Controls/control.png" width={'500px'}/>
         
        <p>Press the X key to close this screen</p>
      </div>
     
    </div> 
    </>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  zIndex: 10,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "rgba(14,13,13, 0.8)",
  color: "#fff",
  padding: "20px",
  width: "80%",
  textAlign: "center",
  fontFamily: "Geo, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
};

const controlsStyles: React.CSSProperties = {
  backgroundColor: "rgba(14,13,13, 0.8)",
  color: "#fff",
  padding: "20px",
  width: "80%",
  textAlign: "center",
  fontFamily: "Geo, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
};

export default PhoneModal