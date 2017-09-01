export default (m, message_history) => ({
  view: () => m(".m-body", [
    m("header.mb-header", [
      m(".mbh-user.clearfix", [
        m("img[alt=''][src='img/demo/profile-pics/2.jpg']"),
        m(".p-t-5",
          "Ann Watkinson"
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
        'data-simplebar': true,
        style: {
          'padding-left': "20px",
          height: '88%',
        }
      }, [
        m(".mblm-item.mblm-item-left", [
          m("div", "test"),
          m("small",
            "5:47 PM"
          )
        ]),
        m(".mblm-item.mblm-item-right", {
          style: {
            'padding-right': '20px'
          }
        }, [
          m("div", "test"),
          m("small",
            "5:49 PM"
          )
        ]),
        m(".mblm-item.mblm-item-right", {
          style: {
            'padding-right': '20px'
          }
        }, [
          m("div", "test"),
          m("small",
            "5:55 PM"
          )
        ]),
        m(".mblm-item.mblm-item-left", [
          m("div", "test"),
          m("small",
            "6:10 PM"
          )
        ]),
        m(".mblm-item.mblm-item-left", [
          m("div",
            m(".mblmi-img",
              m("img[alt=''][src='http://img1.picturescafe.com/pc/016/009.jpg']")
            )
          ),
          m("small",
            "6:10 PM"
          )
        ]),
        m(".mblm-item.mblm-item-left", [
          m("div", "test"),
          m("small",
            "6:11 PM"
          )
        ]),
        m(".mblm-item.mblm-item-right", {
          style: {
            'padding-right': '20px'
          }
        }, [
          m("div", "test"),
          m("small",
            "6:15 PM"
          )
        ])
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
