import m from "mithril"

import {
  app
} from "./app"
import {
  login
} from "./app/dashboard/login"

m.route(document.body, "/", {
  "/": app
})
