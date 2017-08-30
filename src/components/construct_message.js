import m from "mithril"
import prop from "mithril/stream"

function scrollBar(selector, theme, mousewheelaxis) {
  // $(selector).mCustomScrollbar({
  //     theme: theme,
  //     scrollInertia: 100,
  //     axis: "yx",
  //     mouseWheel: { enable: !0, axis: mousewheelaxis, preventDefault: !0 }
  // })
}

var construct_message = {
  oncreate() {
    scrollBar(".c-overflow", "minimal-dark", "y")
  },
  view(vnode) {
    // console.log("contacts", vnode.state.contacts)

    return m(".messages.card", [
      vnode.state.selectedContact.id ? m(".m-body", [
        m("header.mb-header", [
          m(".mbh-user.clearfix", [
            m("img[alt=''][src='img/demo/profile-pics/2.jpg']"),
            m(".p-t-5",
              vnode.state.selectedContact.firstName
            )
          ]),
          // m("ul.actions", [
          //     m("li",
          //         m("a[href='']",
          //             m("i.zmdi.zmdi-refresh-alt")
          //         )
          //     ),
          //     m("li",
          //         m("a[href='']",
          //             m("i.zmdi.zmdi-delete")
          //         )
          //     ),
          //     m("li.dropdown", [
          //         m("a[data-toggle='dropdown'][href='']",
          //             m("i.zmdi.zmdi-more-vert")
          //         ),
          //         m("ul.dropdown-menu.dropdown-menu-right", [
          //             m("li",
          //                 m("a[href='']",
          //                     "Contact Info"
          //                 )
          //             ),
          //             m("li",
          //                 m("a[href='']",
          //                     "Mute"
          //                 )
          //             ),
          //             m("li",
          //                 m("a[href='']",
          //                     "Clear Messages"
          //                 )
          //             )
          //         ])
          //     ])
          // ])
        ]),
        m(".mb-list", [
          m(".mbl-messages.c-overflow", [
            m(".mblm-item.mblm-item-right", {
              style: {
                "text-align": "left"
              }
            }, [
              m("div", m.trust(vnode.state.message.replace(/\n/g, "<br>")
                .replace("{{firstname}}", vnode.state.selectedContact.firstName)
                .replace("{{middlename}}", vnode.state.selectedContact.middleName)
                .replace("{{lastname}}", vnode.state.selectedContact.lastName)
              )),
              m("small",
                "6:15 PM"
              )
            ])
          ]),
          m(".mbl-compose", [
            m("textarea[placeholder='Type a message...']", {
              oninput: m.withAttr("value", value => vnode.state.message = value),
              value: vnode.state.message
            }),
            m("button", {
                onclick() {
                  vnode.state.sendingSingle = true
                  m.redraw()
                  vnode.state.sendSingleMessage({
                    contact: vnode.state.selectedContact,
                    message: vnode.state.message
                  })
                }
              },
              vnode.state.sendingSingle ?
              m(".preloader.pls-red",
                m("svg.pl-circular[viewBox='25 25 50 50']",
                  m("circle.plc-path[cx='50'][cy='50'][r='15']")
                )
              ) : m("i.zmdi.zmdi-mail-send")
            )

          ])
        ])
      ]) : "",
      m(".m-sidebar", [
        m("header", [
          m("h2.hidden-xs", !vnode.state.sendingMultiple ? `${vnode.state.contacts.length} Recepients` : "",

            (vnode.state.sendingMultiple ?
              m(".preloader.pls-red",
                m("svg.pl-circular[viewBox='25 25 50 50']",
                  m("circle.plc-path[cx='50'][cy='50'][r='15']")
                )
              ) : (vnode.state.contacts.length > 1 ?
                m("a.btn.btn-info.btn-xs.pull-right", {
                  onclick() {
                    // swal('Hello world!')
                    vnode.state.sendingMultiple = true
                    m.redraw()
                    vnode.state.deployMessages({
                      contacts: vnode.state.contacts,
                      message: vnode.state.message
                    })
                  }
                }, "Deploy message") : "")),
          ),
          // m("a.btn.btn-info.btn-xs.pull-right", "Deploy message"),
          // m("ul.actions", [
          //     m("li",
          //         m("a.btn.btn-info[href='']", "Deploy message")
          //     ),
          // m("li.dropdown.hidden-xs", [
          //     m("a[data-toggle='dropdown'][href='']",
          //         m("i.zmdi.zmdi-more-vert")
          //     ),
          //     m("ul.dropdown-menu.dropdown-menu-right", [
          //         m("li",
          //             m("a[href='']",
          //                 "Profile & Status"
          //             )
          //         ),
          //         m("li",
          //             m("a[href='']",
          //                 "Help"
          //             )
          //         ),
          //         m("li",
          //             m("a[href='']",
          //                 "Settings"
          //             )
          //         )
          //     ])
          // ])
          // ])
        ]),
        m(".ms-search.hidden-xs",
          m(".fg-line", [
            m("i.zmdi.zmdi-search"),
            m("input.form-control[placeholder='Search...'][type='text']")
          ])
        ),
        m("div.list-group.c-overflow", [
          vnode.state.contacts.map(contact => {
            if (contact) {
              return m("a.list-group-item.media" + (vnode.state.selectedContact.id === contact.id ? ".active" : ""), {
                onclick() {
                  vnode.state.selectContact(contact)
                }
              }, [
                m(".pull-left",
                  m("img.lgi-img[alt=''][src='img/demo/profile-pics/2.jpg']")
                ),
                m(".media-body", [
                  m(".lgi-heading",
                    contact.firstName
                  ),
                  m("small.lgi-text",
                    contact.phoneNumber
                  ),
                  m("small.ms-time",
                    `${contact.groups ? contact.groups.length : "0"} groups`
                  )
                ])
              ])
            }
          })
        ])
      ])
    ])
  }
}

export {
  construct_message
}
