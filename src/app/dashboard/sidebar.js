export default (m, contacts) => ({
  view() {
    return m(".m-sidebar", [
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
    ])
  }
})
