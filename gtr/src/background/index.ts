console.info('chrome-ext template-react-ts background script')
// add a listener for the toggle-app command specified in manifest.json
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'toggle-app') {
    ;(async () => {
      //send a message directly to the current active tab from background
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

      if (tab.id) {
        // that message will be to toggle map
        const response = await chrome.tabs.sendMessage(tab.id, { message: 'toggle-map' })
      }
      return true
    })()
  }
})
export {}
