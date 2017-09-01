function scrollSmoothToBottom(id) {
  var div = document.getElementById(id);
  $('#' + id)
    .animate({
      scrollTop: div.scrollHeight - div.clientHeight
    }, 500);
}

export default (m, {
  selectedContact
}) => ({
  oncreate: () => scrollSmoothToBottom('mbl-messagesx'),
  view: () => m(".m-body", [
    m("header.mb-header", [
      m(".mbh-user.clearfix", [
        m(`img[alt=''][src=${selectedContact.pic}]`),
        m(".p-t-5",
          selectedContact.full_name
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
      }, [
        selectedContact.thread.map(item => {
          if (item.id === selectedContact.id) {
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
        })
      ]),
      m(".mbl-compose", {
        style: {
          height: '100hv'
        }
      }, [
        m("textarea[placeholder='Type a message...']"),
        m("button",
          m("i.zmdi.zmdi-mail-send")
        )
      ])
    ])
  ])
})
