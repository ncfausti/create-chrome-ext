import { useState } from 'react'
import './Popup.css'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext');

  function send_message_to_active_tab() {
    (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
      // do something with response here, not outside the function
      console.log(response);
    })();
  }

  return (
    <main>
      <h3>Popup Page!@!</h3>

      <h6>v 0.0.0</h6>
      <button onClick={e => send_message_to_active_tab()}>Click</button>

      <a href="https://www.npmjs.com/package/create-chrome-ext" target="_blank">
        Power by {crx}
      </a>
      {/* <iframe src="https://main.dy6d4zldr783d.amplifyapp.com/" /> */}
    </main>
  )
}

export default App
