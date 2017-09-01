import m from "mithril"
import prop from "mithril/stream"
import {
  fetch,
  post
} from "../components/requestToolBox"

// submodules
import chat from './dashboard/index'

var dashboard = {
  onmatch(attrs) {
    console.log("matched!")
    attrs.contacts = [{
      id: '123456',
      full_name: "first_name",
      last_message: {
        time: "18:17:28 PM",
        content: "this is the last message"
      },
      pic: "/img/demo/profile-pics/4.jpg",
      thread: [{
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '1234567',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '1234567',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '1234567',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '1234567',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }]
    }, {
      id: '1234567',
      full_name: "first_name",
      last_message: {
        time: "18:17:28 PM",
        content: "this is the last message"
      },
      pic: "/img/demo/profile-pics/4.jpg",
      thread: [{
        id: '1234567',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }]
    }]
    attrs.selectedContact = attrs.contacts[0]
    attrs.selectContact = (contact) => {
      // show last message and start getting last message history
      console.log("new contact selected", contact)
      console.log(this)
      attrs.selectedContact = contact
    }
  },
  render: ({
    attrs
  }) => {
    console.log("rendeing", attrs)
    return m(".app", m(chat(m, attrs)))
  }
}

export {
  dashboard
}
