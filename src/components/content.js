import m from "mithril"
import {
  plugins
} from "../plugins"

var content = {
  oncreate: plugins,
  oninit() {
    // if (!localStorage.getItem("token")) {
    //   m.route.set("/")
    // }
  },
  view(vnode) {
    console.log(vnode.attrs)
    return m(vnode.attrs.component)
  }
}

export default content
