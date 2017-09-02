import m from "mithril"
import prop from "mithril/stream"
import {
  fetch,
  post
} from "../components/requestToolBox"

// submodules
import chat from './dashboard/index'
import login from './dashboard/login'

const socket = io("/");

var app = {
  oninit({
    attrs
  }) {
    console.log("initializing")
    // login, register, forgotPass Logic
    attrs.login = true
    attrs.register = false
    attrs.forgotPass = false

    attrs.switcher = ({
      key,
      value
    }) => attrs[key] = value

    // socket connection, auth, ask for contacts
    console.log("matched!")
    m.socket = io("/");
    var user_details = new PouchDB('user_details');
    var remoteCouch = false;

    let token = localStorage.getItem('token')
    attrs.token = token
    console.log(token)

    if (token) {
      m.socket.on('auth', () => {
        m.socket.emit('auth', {
          token
        })
      })

      m.socket.on('user_details', (data) => {
        console.log("recieved details", data)
        data._id = new Date()
        user_details.put(data, function callback(err, result) {
          if (!err) {
            console.log('Successfully saved user_details!', data);
            m.socket.emit('get_contacts', {
              id: data.id,
              token
            })
            m.socket.on('get_contacts', (data) => {
              console.log('get_contacts', data)
              attrs.contacts = data
              console.log(data)
              attrs.selectedContact = attrs.contacts[0]
              m.redraw()
            })
          } else {
            console.log(err)
          }
        });
      })
    } else {
      console.log("no token, not asking for data")
    }

    attrs.contacts = []
    // attrs.selectedContact = attrs.contacts[0]
    attrs.selectContact = (contact) => {
      // show last message and start getting last message history
      console.log("new contact selected", contact)
      console.log(this)
      attrs.selectedContact = contact
    }

    attrs.selectedComponent = chat

    if (attrs.token) {
      attrs.sendMessage = ({
        message
      }) => {
        console.log('setting')
        attrs.sending = true
        m.redraw()
        // show message on ui with indicator that it has not yet left the guys laptop
        m.socket.emit('send_message', {
          message: message,
          selectedContact: attrs.selectedContact
        })
        m.socket.on('send_message', ({
            token,
            status
          }) => {
            // set state to show message was sent,
          }),
          m.socket.on('arrived', ({
            token,
            status
          }) => {
            // set state to show message arrived on phone, double tick,
          }),
          m.socket.on('read', ({
            token,
            status
          }) => {
            // set state to show message was read,
          })
      }

      console.log(attrs)

      attrs.selectedComponent = chat(m, attrs)
    } else {
      attrs.selectedComponent = login(m, attrs)
    }
  },
  view: ({
    attrs
  }) => {
    return m(".app", m(attrs.selectedComponent))
  }
}

export {
  app
}
