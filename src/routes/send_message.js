import m from "mithril"
import {
  data_tables
} from "../plugins"
import prop from "mithril/stream"
import {
  fetch,
  post
} from "../components/requestToolBox"
import {
  construct_message
} from "../components/construct_message"
// import swal from 'sweetalert2'

var Data = {
  groups: null,
  contacts: null,
  fetch: function () {
    fetch("contacts", `query {
              Organisation {
                Contacts {
                  id
                  firstName,
                  middleName,
                  lastName,
                  phoneNumber,
                  ContactGroups {
                    id
                    name
                  }
                }
                ContactGroups {
                  id
                  name
                  Contacts {
                    id
                    firstName
                    phoneNumber
                    ContactGroups {
                      id
                      name
                    }
                  }
                }
              }
            }`)
      .then(res => {
        Data.contacts = res.data.Organisation.Contacts
        Data.groups = res.data.Organisation.ContactGroups

        Data.contacts.forEach(contact => contact ? contact.groups = contact.ContactGroups : "")

        Data.groups.map(group => group.selected = false)
        Data.groups.map(group => {
          group.contacts = group.Contacts
          group.Contacts.map(contact => contact ? contact.groups = contact.ContactGroups : "")
        })
      }, err => {
        console.log("faild")
      })
    $('#data-table-basic')
      .DataTable();
  }
}

var send = {
  oninit(vnode) {
    vnode.state.show = true
    vnode.state.contacts = []
    vnode.state.message = "Hi {{firstname}}, "
    vnode.state.firstname = "Branson"
    vnode.state.lastname = "Gitomeh"
    vnode.state.middlename = "Kuria"

    vnode.state.sendingSingle = false
    vnode.state.sendingMultiple = false

    vnode.state.submit = (e) => {
      e.preventDefault()
      post("send", `mutation contactCreate($name:String!,$contact:String!,$groups:[String!]){
              create{
                contact(name:$name, contact:$contact,groups:$groups){
                    id
                  }
              }
            }`, {
          name: vnode.state.name,
        })
        .then(res => {
          m.redraw()
        })
    }

    vnode.state.selectContact = (contact) => {
      vnode.state.selectedContact = contact
      m.redraw()
    }

    vnode.state.message = "Hi {{firstname}}, "
    vnode.state.firstname = "Branson"
    vnode.state.lastname = "Gitomeh"
    vnode.state.middlename = "Kuria"
    vnode.state.selectedContact = vnode.state.contacts[0] ? vnode.state.contacts[0] : {}

    vnode.state.contacts[0] ? "" : vnode.state.selectedContact = {}

    vnode.state.sendSingleMessage = ({
      contact,
      message,
    }) => {
      const newMessage = message.replace("{{firstname}}", contact.firstName)
        .replace("{{middlename}}", contact.middleName)
        .replace("{{lastname}}", contact.lastName)
        .replace("<br>", '\n')
      console.log(contact, newMessage)

      // alert(JSON.stringify({contact:{id:contact.id,phoneNumber:contact.phoneNumber},message:newMessage}))

      post("send", `mutation MessageInstanceMutations($message:recievedMessage!){
              MessageInstanceMutations {
                ToSingleContact(message:$message){
                    MessagesSentNumber
                }
              }
            }`, {
          message: {
            contact: {
              id: contact.id,
              phoneNumber: contact.phoneNumber
            },
            message: newMessage
          },
        })
        .then(res => {
          console.log("compleated", res)
          vnode.state.sendingSingle = false
          m.redraw()
          swal({
              type: "success",
              title: "Process complete",
              text: `Messages sent to the contact`,
              timer: 3000,
              showConfirmButton: false
            })
            .then(console.log);
        })
    }

    vnode.state.deployMessages = ({
      contacts,
      message
    }) => {
      const finalMessages = []
      contacts.map(contact => {


        if (contact && message) {
          const newMessage = message.replace("<br>", '\n')
            .replace("{{firstname}}", contact.firstName)
            .replace("{{middlename}}", contact.middleName)
            .replace("{{lastname}}", contact.lastName)
          finalMessages.push({
            contact: {
              id: contact.id,
              phoneNumber: contact.phoneNumber
            },
            message: newMessage
          })
        }
      })

      // alert(JSON.stringify(finalMessages))
      // send this messages to the server
      post("send", `mutation MessageInstanceMutations($messages:[recievedMessage]!){
              MessageInstanceMutations{
                ToMultipleContact(messages:$messages){
                    MessagesSentNumber
                  }
              }
            }`, {
          messages: finalMessages,
        })
        .then(res => {
          console.log("sendingMultiple", res)
          // m.redraw()
          vnode.state.sendingMultiple = false
          m.redraw()
          console.log("swalling")
          console.log(sweetAlert)
          // swal("Good job!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis", "success")
          swal({
              type: "success",
              title: "Process complete",
              text: `${res.data.MessageInstanceMutations.ToMultipleContact.MessagesSentNumber} Messages will be sent to the contacts`,
              timer: 3000,
              showConfirmButton: false
            })
            .then(console.log);
        })
    }
  },
  oncreate: Data.fetch,
  onremove() {
    var table = $('#data-table-basic')
      .DataTable();
    table.destroy();
  },
  onbeforeupdate() {
    return new Promise((resolve, reject) => {
      var table = $('#data-table-basic')
        .DataTable();
      table.destroy();
      resolve()
    })
  },
  onupdate() {
    $('#data-table-basic')
      .DataTable();
  },
  view(vnode) {
    return [
      m(".card", [
        m(".card-header",
          m("h2", [
            "Send messages",
            m("small",
              "Use this space to construct and send messages to your contact list, select a category you want and construct your message, good luck",
              m("br"),
              m("b", "Tips:"),
              m("br"),
              "Use the variables {{firstname}} {{middlename}} or {{lastname}} to reference the contacts names directly as you have saved them. the actual names used"
            )
          ])
        )
      ]),
      m("[role='tabpanel']", [
        m("ul.tab-nav[role='tablist']", [
          m("li.active",
            m("a[aria-controls='home11'][data-toggle='tab'][href='#home11'][role='tab']",
              "Selected Contacts"
            )
          ),
          m("li",
            m("a[aria-controls='profile11'][data-toggle='tab'][href='#profile11'][role='tab']",
              "Groups"
            )
          )
        ]),
        m(".tab-content", [
          m(".tab-pane.active[id='home11'][role='tabpanel']", [
            m(".card", [
              m(".card-header",
                m("h2", [
                  "Send to... "
                ]),
                m("a.btn.btn-info.btn-xs.pull-right", {
                  onclick() {
                    vnode.state.contacts = Data.contacts
                    Data.contacts.map(contact => contact ? contact.selected = true : "")
                    $(".chosen")
                      .val(Data.contacts.map(contact => contact ? contact.id : ""))
                      .trigger("chosen:updated");

                    m.redraw()
                  }
                }, "Select all contacts"),
              ),
              m(".card-body.card-padding",
                Data.contacts ?
                m("select.chosen[data-placeholder='Click here to reveal your contacts....'][multiple='']", {
                  id: "contacts",
                  oncreate() {
                    console.log("Inntializing contacts")
                    $(".chosen")
                      .chosen({
                        width: "100%",
                        allow_single_deselect: !0
                      })
                  },
                  onchange() {
                    vnode.state.contacts = []
                    Data.contacts.map(contact => {
                      if (contact) {
                        $("#contacts")
                          .chosen()
                          .val() ? $("#contacts")
                          .chosen()
                          .val()
                          .map(chosen => {
                            if (contact.id === chosen) {
                              vnode.state.contacts.push(contact)
                            }
                          }) : ""
                      }

                    })
                    m.redraw()
                  }
                }, [
                  Data.contacts.map(contact => {
                    if (contact) {
                      return m(`option[value='${contact.id}']`, {
                        selected: contact.selected
                      }, `${contact.firstName} [${contact.phoneNumber}]`)
                    }
                  })
                ]) :
                m(".preloader.pls-red",
                  m("svg.pl-circular[viewBox='25 25 50 50']",
                    m("circle.plc-path[cx='50'][cy='50'][r='20']")
                  )
                ))
            ]),
            construct_message.view(vnode)
          ]),
          m(".tab-pane[id='profile11'][role='tabpanel']",
            m(".card", [
              m(".card-header",
                m("h2", [
                  "Send to... ",
                  // m("small",
                  //     "Use this space to construct and send messages to your contact list, select a category you want and construct your message, good luck"
                  // )
                ])
              ),
              m(".card-body.card-padding", Data.contacts ? m("select.chosen[data-placeholder='Click here to reveal your contacts....'][multiple='']", {
                id: "groups",
                oncreate() {
                  console.log("Inntializing groups")
                  $(".chosen")
                    .chosen({
                      width: "100%",
                      allow_single_deselect: !0
                    })
                },
                onchange() {
                  vnode.state.contacts = []
                  Data.groups.map(group => {
                    $("#groups")
                      .chosen()
                      .val() ?
                      $("#groups")
                      .chosen()
                      .val()
                      .map(chosen => {
                        // vnode.state.contacts = []
                        if (group.id === chosen) {
                          Data.groups.map(group => {
                            group.Contacts.map(contact => {
                              var found = false
                              vnode.state.contacts.map(contactIn => {
                                console.log(contactIn, contact)
                                if (contact && contactIn) {
                                  if (contactIn.id === contact.id) {
                                    found = true
                                  }
                                }

                              })
                              if (found === false) {
                                vnode.state.contacts.push(contact)
                              }
                            })
                          })
                          console.log(vnode.state.contacts)
                        }
                      }) :
                      ""
                  })
                  m.redraw()
                }
              }, [
                Data.groups.map(group => {
                  return m(`option[value='${group.id}']`, {
                    selected: group.selected
                  }, `${group.name}`)
                })
              ]) : m(".preloader.pls-red",
                m("svg.pl-circular[viewBox='25 25 50 50']",
                  m("circle.plc-path[cx='50'][cy='50'][r='20']")
                )
              ))
            ]),
            construct_message.view(vnode)
          )
        ])
      ])
    ]
  }
}


export {
  send
}
