import m from "mithril"

function scrollSmoothToBottom(id) {
  var div = document.getElementById(id);
  $('#' + id)
    .animate({
      scrollTop: div.scrollHeight - div.clientHeight
    }, 500);
}

export default {
  oncreate: () => scrollSmoothToBottom('mbl-messagesx'),
  // oninit({
  //   attrs,
  //   state
  // }) {
  //   console.log(attrs)
  //   vnode.state.message = attrs.store.message
  //   vnode.state.sending = attrs.store.sending
  //   vnode.state.selectedContact = attrs.store.selectedContact.id
  // },
  view: ({
    attrs
  }) => m(".m-body", [
    m("header.mb-header", [
      m(".mbh-user.clearfix", [
        m(`img[alt=''][src=${attrs.store.selectedContact.pic}]`),
        m(".p-t-5",
          attrs.store.selectedContact.full_name
        )
      ]),
      m("ul.actions", [
        m("li",
          m("a[href='']",
            m("i.zmdi.zmdi-refresh-alt")
          )
        ),
        m("li",
          m("a[href='']",
            m("i.zmdi.zmdi-delete")
          )
        ),
        m("li.dropdown", [
          m("a[data-toggle='dropdown'][href='']",
            m("i.zmdi.zmdi-more-vert")
          ),
          m("ul.dropdown-menu.dropdown-menu-right", [
            m("li",
              m("a[href='']",
                "Contact Info"
              )
            ),
            m("li",
              m("a[href='']",
                "Mute"
              )
            ),
            m("li",
              m("a[href='']",
                "Clear Messages"
              )
            )
          ])
        ])
      ])
    ]),
    m(".mb-list", [
      m(".mbl-messagesx", {
        id: "mbl-messagesx",
        'data-simplebar': true,
        style: {
          'padding-top': "5px",
          'padding-left': "20px",
          height: '88%',
        }
      }, [!attrs.store.selectedContact ? null : attrs.store.selectedContact.thread.map(item => {
        if (item.id === attrs.store.selectedContact.id) {
          return m(".mblm-item.mblm-item-left", [
            m("div", "test"),
            m("small",
              "5:47 PM"
            )
          ])
        } else {
          return m(".mblm-item.mblm-item-right", {
            style: {
              'padding-right': '20px'
            }
          }, [
            m("div", "test"),
            m("small",
              "5:49 PM"
            )
          ])
        }
      })]),
      m(".mbl-compose", {
        style: {
          height: '100hv'
        }
      }, [
        m("textarea[placeholder='Type a message...']", {
          oninput: m.withAttr('value', v => attrs.store.switcher({
            key: "message",
            value: v
          })),
          value: attrs.store.message
        }),
        m("button", {
            onclick() {
              attrs.store.sendMessage({
                message: attrs.store.message
              })
            }
          },
          console.log("test", attrs.store.sending), attrs.store.sending == true ? m(".preloader.pl-xs",
            m("svg.pl-circular[viewBox='25 25 50 50']",
              m("circle.plc-path[cx='50'][cy='50'][r='20']")
            )
          ) : m("i.zmdi.zmdi-mail-send")
        )
      ])
    ])
  ])
}
