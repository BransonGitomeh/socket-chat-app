import m from "mithril"
import header from "./components/header"
import left_side_nav from "./components/left_side_nav"
import right_side_nav from "./components/right_side_nav"
import content from "./components/content"
import {
  dashboard
} from "./app/dashboard"
import {
  auth
} from "./app/auth"

var layout = {
  view(vnode) {
    return m(".app", [
      // header here
      // m(header),
      m("section[id='main']", {
        style: {
          'padding-bottom': '0px',
          'padding-top': '0px'
        }
      }, [
        // left_sidebar_here
        // m(left_side_nav),
        // right_sidebar_here
        // m(right_side_nav),
        // m("section[id='content']", )
        m(content, vnode.attrs)
      ])
    ])
  }
}



m.route(document.body, "/", {
  "/": {
    view() {
      return m(layout, {
        component: dashboard
      })
    }
  }
})
