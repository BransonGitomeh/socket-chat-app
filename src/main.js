import m from "mithril"
import header from "./components/header"
import left_side_nav from "./components/left_side_nav"
import right_side_nav from "./components/right_side_nav"
import content from "./components/content"
import {
  dashboard
} from "./app/dashboard"
import {
  auth
} from "./app/auth"

const socket = io("/");
var user_details = new PouchDB('user_details');
var remoteCouch = false;

const token = "abcd"
socket.on('auth', () => console.log("asking for auth"))
socket.emit('auth', {
  token
})
socket.on('user_details', (data) => {
  console.log("recieved details", data)
  data._id = new Date()
  user_details.put(data, function callback(err, result) {
    if (!err) {
      console.log('Successfully saved user_details!', data);

      socket.emit('get_contacts', {
        id: data.id,
        token
      })
      socket.on('get_contacts', (data) => {
        console.log(data)
      })
    } else {
      console.log(err)
    }
  });

})



console.log(socket)

var layout = {
  view(vnode) {
    return m(".app", [
      // header here
      // m(header),
      m("section[id='main']", {
        style: {
          'padding-bottom': '0px',
          'padding-top': '0px'
        }
      }, [
        // left_sidebar_here
        // m(left_side_nav),
        // right_sidebar_here
        // m(right_side_nav),
        // m("section[id='content']", )
        m(content, vnode.attrs)
      ])
    ])
  }
}



m.route(document.body, "/", {
  "/": dashboard
})
