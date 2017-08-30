import m from "mithril"
import settings from "../settings"

var post = function (name, query, variables) {
  return m.request({
    url: settings.url,
    method: "POST",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    data: {
      query,
      variables: JSON.stringify(variables),
    }
  })
}

var fetch = function (name, query, variables) {
  return m.request({
    url: settings.url,
    method: "POST",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    data: {
      query,
      variables: JSON.stringify(variables),
    }
  })
}


export {
  fetch,
  post
}
