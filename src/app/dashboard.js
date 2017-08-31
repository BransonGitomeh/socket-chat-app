import m from "mithril"
import prop from "mithril/stream"
import {
  fetch,
  post
} from "../components/requestToolBox"

var dashboard = {
  view(vnode) {
    return m(".containerx.container-alt",
      m(".messages.card", {
        style: {
          height: '100vh',
          'margin-bottom': '0px'
        }
      }, [
        m(".m-sidebar", [
          m("header", [
            m("h2.hidden-xs",
              "Messages"
            ),
            m("ul.actions", [
              m("li",
                m("a[href='']",
                  m("i.zmdi.zmdi-comment-text")
                )
              ),
              m("li.dropdown.hidden-xs", [
                m("a[data-toggle='dropdown'][href='']",
                  m("i.zmdi.zmdi-more-vert")
                ),
                m("ul.dropdown-menu.dropdown-menu-right", [
                  m("li",
                    m("a[href='']",
                      "Profile & Status"
                    )
                  ),
                  m("li",
                    m("a[href='']",
                      "Help"
                    )
                  ),
                  m("li",
                    m("a[href='']",
                      "Settings"
                    )
                  )
                ])
              ])
            ])
          ]),
          m(".ms-search.hidden-xs",
            m(".fg-line", [
              m("i.zmdi.zmdi-search"),
              m("input.form-control[placeholder='Search...'][type='text']")
            ])
          ),
          m(".list-group.c-overflow", {
            'data-simplebar': true,
            style: {
              'overflow-x': 'hidden'
            }
          }, [

            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(item => m("a.list-group-item.media[href='']", [
              m(".pull-left",
                m("img.lgi-img[alt=''][src='img/demo/profile-pics/4.jpg']")
              ),
              m(".media-body", [
                m(".lgi-heading",
                  "Davil Parnell"
                ),
                m("small.lgi-text",
                  "Fierent fastidii recteque ad pro"
                ),
                m("small.ms-time",
                  "05:00 PM"
                )
              ])
            ]))
          ])
        ]),
        m(".m-body", [
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
      ])
    )
  }
}

export {
  dashboard
}
