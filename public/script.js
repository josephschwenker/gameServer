function collapseSidebar() {
  document.getElementById("sidebar").classList.remove("open")
}
document.getElementById("sidebar_backButton").addEventListener("click", collapseSidebar)

function openSidebar() {
  document.getElementById("sidebar").classList.add("open")
}
document.getElementById("actionButton_openSidebar").addEventListener("click", openSidebar)

function dismissNotification(e) {
  // find the notification
  let notification
  for (n of e.path) {
    // console.log(n)
    if ( n.classList.contains("notification") ) {
      notification = n
      break
    }
  }
  // hide the notification
  notification.classList.remove("open")
  // delete the notification
  let transitionTime = 500
  let timeout = setTimeout(
    () => n.remove(),
    transitionTime
  )
}
let dismissButtons = document.getElementsByClassName("notificiation_openButton")
for (e of dismissButtons) {
  e.addEventListener("click", dismissNotification)
}