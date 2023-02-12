import { useState } from 'react'
import './Popup.css'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext');
  const [toggle, setToggle] = useState(true);
  function send_message_to_active_tab(msg) {
    (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      const response = await chrome.tabs.sendMessage(tab.id, {message: msg});
      // do something with response here, not outside the function
      console.log(response);
    })();
  }

  return (
    <main>
      <h3>Popup Page!@!</h3>

      <h6>v 0.0.0</h6>
      {toggle && <button onClick={e => {setToggle(false); send_message_to_active_tab('show')}}>Show</button>}
      {!toggle && <button onClick={e => {setToggle(true);send_message_to_active_tab('hide')}}>Hide</button>}
      {/* <iframe src="https://main.dy6d4zldr783d.amplifyapp.com/" /> */}
    </main>
  )
}

export default App
