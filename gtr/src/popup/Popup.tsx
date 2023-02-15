import { useState } from 'react'
import './Popup.css'

function App() {
  const [toggle, setToggle] = useState(true);

  function send_message_to_active_tab(msg: string) {
    (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      let tabId = tab.id || 0;
      const response = await chrome.tabs.sendMessage(tabId, {message: msg});
      // do something with response here, not outside the function
      console.log('popup: the next message is what I recvd from content...')
      console.log(response);
    })();
  }

  return (
    <main>
      <h3>Popup Page!</h3>

      <h6>v 0.0.1</h6>
      {toggle && <button onClick={e => {setToggle(false); send_message_to_active_tab('show')}}>Show</button>}
      {!toggle && <button onClick={e => {setToggle(true);send_message_to_active_tab('hide')}}>Hide</button>}
    </main>
  )
}

export default App
