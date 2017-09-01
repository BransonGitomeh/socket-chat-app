import m from "mithril"
import prop from "mithril/stream"
import {
  fetch,
  post
} from "../components/requestToolBox"

// submodules
import sidebar from './dashboard/sidebar'
import chatbody from './dashboard/chatbody'

var dashboard = {
  onmatch(attrs) {
    console.log("matched!")
  },
  render: () => {
    return m(".app", m({
      view() {
        return m(".containerx.container-alt",
          m(".messages.card", {
            style: {
              height: '100vh',
              'margin-bottom': '0px'
            }
          }, [
            // sidebar here
            m(sidebar(m, {
              contacts: [{
                id: '123456',
                full_name: "first_name",
                last_message: {
                  time: "108",
                  content: "awesomnes"
                },
                pic: "cool url here"
              }],
              selectContact: (contact_id) => {
                // show last message and start getting last message history

              }
            })),
            m(chatbody(m))
          ])
        )
      }
    }))
  }
}

export {
  dashboard
}
