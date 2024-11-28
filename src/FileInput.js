import React from "react"

function FileInput(props){
  let inputRef = React.useRef();
  function handleOnClickFileSelectButton(){
    inputRef.current.click()
  }
  function handleOnChangeFileInput(e){
    props.handleInputFilesList(e.target.files);
  }
  return(
    <div>
  <input id="file-input" ref={inputRef} type="file" accept="audio/*" multiple onChange={handleOnChangeFileInput}/>
  <button id="file-select-button" onClick={handleOnClickFileSelectButton}>Upload Files</button>
    </div>
  );
}

export default FileInput