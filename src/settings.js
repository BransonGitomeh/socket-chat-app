import prop from "mithril/stream"

console.log()

var settings = {
  color: prop("cyan"),
  defaultColor: prop("cyan"),
  url: `${window.location.origin}/graphiql`
}

export default settings
