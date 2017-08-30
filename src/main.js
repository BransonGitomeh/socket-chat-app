import m from "mithril"
import header from "./components/header"
import left_side_nav from "./components/left_side_nav"
import right_side_nav from "./components/right_side_nav"
import content from "./components/content"
import {
  dashboard
} from "./routes/dashboard"
import {
  contacts
} from "./routes/contacts"
import {
  preview
} from "./routes/preview"




var layout = {
  view(vnode) {
    return m(".app", [
      // header here
      m(header),
      m("section[id='main']", {
        style: {
          'padding-bottom': '0px'
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
  "/manage": {
    view() {
      return m(layout, {
        component: contacts
      })
    }
  },
  "/manage/:q_id": {
    view() {
      return m(layout, {
        component: contacts
      })
    }
  },
  "/client": {
    view() {
      return m(layout, {
        component: dashboard
      })
    }
  },
  "/": {
    view() {
      return m(layout, {
        component: preview
      })
    }
  },
  "/sandbox/api": {
    view() {
      return m(layout, {
        component: sandbox
      })
    }
  },
  // '/manage': {
  //   view: () => m('.app', [
  //     m(".test", "test"),
  //     m("a", {
  //       href: "/",
  //       oncreate: m.route.link
  //     }, "home")
  //   ])
  // }
})


// m.route(document.body, "/", {
//   '/': {
//     view: () => m('.app', [
//       m(".test", "test"),
//       m("a", {
//         href: "/test",
//         oncreate: m.route.link
//       }, "test")
//     ])
//   },
//   '/test': {
//     view: () => m('.app', [
//       m(".test", "test"),
//       m("a", {
//         href: "/",
//         oncreate: m.route.link
//       }, "home")
//     ])
//   }
// })
