console.info('chrome-ext template-react-ts content script')
const iframe = document.createElement('iframe')
iframe.id = 'map-app-xyz'
iframe.src = 'http://localhost:3001'
// setInterval was getting cleared (or stopped running for some other reason) when
// it was lower on the page. Something to look out for incase resizing stops working
setInterval(function () {
  // Why does this not get run all the time?
  console.log('checking...')
  const [hostMap] = Array.from(document.getElementsByTagName('iframe')).filter(
    (el) => el.id !== 'map-app-xyz' && area(el.getBoundingClientRect()) > 500,
  )
  if (!hostMap) {
    return
  }

  if (window.location.search !== previousSearch) {
    // Query parameters have changed
    previousSearch = window.location.search
    console.log(previousSearch)

    // update overlay map coords and zoom here
  }

  var checkRect = hostMap.getBoundingClientRect()
  if (checkRect.width !== previousMapWidth || checkRect.height !== previousMapHeight) {
    previousMapWidth = checkRect.width
    previousMapHeight = checkRect.height

    console.log('map size changed:')
    console.log(checkRect.height, checkRect.width)

    iframe.style.height = checkRect.height.toString() + 'px'
    iframe.style.width = checkRect.width.toString() + 'px'
    // update overlay map height & width here
  }

  if (checkRect.x !== previousMapX || checkRect.y !== previousMapY) {
    previousMapX = checkRect.x
    previousMapY = checkRect.y
    console.log('map position changed:')
    console.log(checkRect.x, checkRect.y)
    // update overlay map x, y position on page here
    const topOffset = checkRect.y.toString() + 'px'
    const leftOffset = checkRect.x.toString() + 'px'
    console.log(topOffset)
    console.log(leftOffset)

    iframe.style.top = topOffset
    iframe.style.left = leftOffset
  }
}, 1000)
// iframe.src = 'https://main.dy6d4zldr783d.amplifyapp.com/';
console.log('HEREEEEEEEEEEEE')
// setInterval(()=>console.log('interval says hi'), 500);
// iframe needs to be embedded on main window page (e.g. airbnb.com)
// as opposed to the chrome extension window bc the chrome extension window
// functions as a Chrome Browser window and thus doe not allow for transparent views
document.body.appendChild(iframe)
iframe.style.position = 'absolute'
iframe.style.top = '0px'
iframe.style.left = '0px'
// iframe.style.minHeight = '1000px';
// iframe.style.width = '100%';
iframe.style.display = 'none'
iframe.style.opacity = '70%'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('content: new msg received, showing message now...')
  console.log(request.message)
  if (request.message === 'toggle-map') {
    if (iframe.style.display === 'none') {
      iframe.style.display = 'block'
    } else {
      iframe.style.display = 'none'
    }
  }
  sendResponse({})
  return true
})

const area = (boundingRect: { height: number; width: number }) =>
  boundingRect.height * boundingRect.width

// I should be able to create custom events for both of these instead of
// polling via setInterval:

// listen for changes to url to get lat, lng, and zoom changes
var previousSearch = window.location.search

// listen for changes to boundingbox
var mapRect = hostMap.getBoundingClientRect()
var [previousMapWidth, previousMapHeight] = [mapRect.width, mapRect.height]
var [previousMapX, previousMapY] = [mapRect.x, mapRect.y]

// setInterval(function() {
//   // Why does this not get run all the time?
//   console.log('checking...');

//   if (window.location.search !== previousSearch) {
//     // Query parameters have changed
//     previousSearch = window.location.search;
//     console.log(previousSearch);

//     // update overlay map coords and zoom here
//   }

//   var checkRect = hostMap.getBoundingClientRect();
//   if (checkRect.width !== previousMapWidth || checkRect.height !== previousMapHeight) {
//     previousMapWidth = checkRect.width;
//     previousMapHeight = checkRect.height;

//     console.log("map size changed:")
//     console.log(checkRect.height, checkRect.width);

//     iframe.style.height = checkRect.height.toString() + "px";
//     iframe.style.width = checkRect.width.toString() + "px";
//     // update overlay map height & width here
//   }

//   if (checkRect.x !== previousMapX || checkRect.y !== previousMapY) {
//     previousMapX = checkRect.x;
//     previousMapY = checkRect.y;
//     console.log("map position changed:")
//     console.log(checkRect.x, checkRect.y);
//     // update overlay map x, y position on page here
//     const topOffset = checkRect.y.toString() + "px";
//     const leftOffset = checkRect.x.toString() + "px";
//     console.log(topOffset);
//     console.log(leftOffset);

//     iframe.style.top = topOffset;
//     iframe.style.left = leftOffset;
//   }

// }, 100);

// How can I have separate controls (or intercept the controls
// that fire on google maps?

// listen for changes to query params changing, then:

// use the average of the ne/sw lat lngs and the zoom (when the url query params change)
// to position mymap

// fix box size of my map to boxsize of airbnb map
/*
https://www.airbnb.com/s/New-York--NY/homes?
  place_id=ChIJOwg_06VPwokRYv534QaPC8g&
  refinement_paths%5B%5D=%2Fhomes&
  flexible_trip_dates%5B%5D=february&
  flexible_trip_dates%5B%5D=march&
  flexible_trip_dates%5B%5D=april&
  flexible_trip_dates%5B%5D=may&
  flexible_trip_dates%5B%5D=june&
  flexible_trip_dates%5B%5D=july&
  flexible_trip_dates%5B%5D=august&
  flexible_trip_dates%5B%5D=september&
  flexible_trip_dates%5B%5D=october&
  flexible_trip_dates%5B%5D=november&
  flexible_trip_dates%5B%5D=december&
  flexible_trip_dates%5B%5D=january&
  flexible_trip_lengths%5B%5D=one_week&
  date_picker_type=flexible_dates&
  adults=0&children=0&infants=0&
  pets=0&search_type=AUTOSUGGEST
*/
export {}
