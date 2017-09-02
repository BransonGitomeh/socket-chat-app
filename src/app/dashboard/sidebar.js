export default (m, {
  contacts,
  selectContact,
  selectedContact
}) => ({
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

        contacts.map(contact => m("li.list-group-item.media", {
          class: selectedContact.id == contact.id ? 'active' : "",
          onclick: (e) => {
            e.preventDefault()
            selectContact(contact)
          }
        }, [
          m(".pull-left",
            m(`img.lgi-img[alt=''][src='${contact.pic}']`)
          ),
          m(".media-body", [
            m(".lgi-heading",
              contact.full_name
            ),
            m("small.lgi-text",
              contact.last_message.content
            ),
            m("small.ms-time",
              contact.last_message.time
            )
          ])
        ]))
      ])
    ])
  }
})
