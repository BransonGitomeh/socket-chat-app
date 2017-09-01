import sidebar from './sidebar'
import chatbody from './chatbody'

export default (m, store) => ({
  oninit(vnode) {
    console.info("oninit")

  },
  view(vnode) {
    return m(".containerx.container-alt",
      m(".messages.card", {
        style: {
          height: '100vh',
          'margin-bottom': '0px'
        }
      }, [
        // sidebar here
        m(sidebar(m, {
          contacts: store.contacts,
          selectedContact: store.selectedContact,
          selectContact: store.selectContact
        })),
        m(chatbody(m, {
          selectedContact: store.selectedContact,
        }))
      ])
    )
  }
})
