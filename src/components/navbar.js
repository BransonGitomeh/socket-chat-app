import m from "mithril"

import prop from "mithril/stream"
import {
  fetch
} from "./requestToolBox"
import settings from "../settings"


var Data = {
  navData: {
    org_name: prop("loading"),
    fetch: function (argument) {
      fetch("org_info", `query test{
                  Organisation{
                    id,
                    name
                  }
                }`)
        .then(res => Data.navData.org_name = res.data.Organisation.name)
    }
  }
}

var navbar = {
  oninit: Data.navData.fetch,
  view: function (vnode) {
    return m(".navbar-fixed",
      m("nav.navbar-color",
        m(".nav-wrapper", [
          m("ul.left",
            m("li",
              m("h1.logo-wrapper", [
                m("a.brand-logo.darken-1.truncate",
                  Data.navData.org_name
                  // m("img[alt='materialize logo'][src='images/materialize-logo.png']")
                ),
                // "Materialize",
                m("span.logo-text",
                  vnode.state.org_name
                )
              ])
            )
          ),
          m(".header-search-wrapper.hide-on-med-and-down", [
            m("i.mdi-action-search"),
          ]),
          m(".header-search-wrapper.hide-on-med-and-down", [
            m("i.mdi-action-search"),
            m("input.header-search-input.z-depth-2[name='Search'][placeholder='Search for help and unswers...'][type='text']")
          ]),
          m("ul.right.hide-on-med-and-down", [
            m("li",
              m("a.waves-effect.waves-block.waves-light.toggle-fullscreen[href='javascript:void(0);']",
                m("i.mdi-action-settings-overscan")
              )
            ),
            m("li",
              m("a.waves-effect.waves-block.waves-light.notification-button[data-activates='notifications-dropdown'][href='javascript:void(0);']",
                m("i.mdi-social-notifications",
                  m("small.notification-badge",
                    "5"
                  )
                )
              )
            ),
            m("li",
              m("a.waves-effect.waves-block.waves-light.chat-collapse[data-activates='chat-out'][href='#']",
                m("i.mdi-communication-chat")
              )
            )
          ]),
          m("ul.dropdown-content[id='notifications-dropdown']", [
            m("li",
              m("h5", [
                "NOTIFICATIONS ",
                m("span.new.badge",
                  "0"
                )
              ])
            ),
            m("li.divider"),

            m("li", [
              m("a[href='#!']", [
                m("i.mdi-action-trending-up"),
                " No notifications yet"
              ]),
              m("time.media-meta[datetime='2015-06-12T20:50:48+08:00']",
                "just now"
              )
            ])
          ])
        ])
      )
    )
  }
}


export default navbar
