import m from "mithril"
import { data_tables } from "../plugins"
import prop from "mithril/stream"
import { fetch, post } from "../components/requestToolBox"

var Data = {
    groups: [],
    fetch: function() {
        fetch("sender_ids", `query{
                  Organisation{
                    ActiveSenderId {
                      id,
                      name
                    }
                    SenderIds{
                        id,
                      name
                    }
                  }
                }`).then(res => {
            Data.sender_ids = res.data.Organisation.SenderIds
            Data.ActiveSenderId = res.data.Organisation.ActiveSenderId
        })
        $('#data-table-basic').DataTable();
    }
}

var sender_ids = {
    oninit(vnode) {
        vnode.state.show = false
        vnode.state.name = prop("")
        vnode.state.number = prop("")
        vnode.state.groups = prop([])

        vnode.state.submit = (e) => {
            e.preventDefault()
            post("sender_ids", `mutation contactCreate($name:String!,$contact:String!,$groups:[String!]){
              create{
                contact(name:$name, contact:$contact,groups:$groups){
                    id
                  }
              }
            }`, {
                name: vnode.state.name,
            }).then(res => {
                m.redraw()
            })
        }
    },
    oncreate: Data.fetch,
    onremove() {
        var table = $('#data-table-basic').DataTable();
        table.destroy();
    },
    onbeforeupdate() {
        return new Promise((resolve, reject) => {
            var table = $('#data-table-basic').DataTable();
            table.destroy();
            resolve()
        })
    },
    onupdate() {
        $('#data-table-basic').DataTable();
    },
    view(vnode) {
        return [
            m(".block-header", [
                m("h2",
                    "Report"
                ),

                m("ul.actions", [
                    m("li",
                        m("a[href='']",
                            m("i.zmdi.zmdi-trending-up")
                        )
                    ),
                    m("li",
                        m("a[href='']",
                            m("i.zmdi.zmdi-check-all")
                        )
                    ),
                    m("li.dropdown", [
                        m("a[data-toggle='dropdown'][href='']",
                            m("i.zmdi.zmdi-more-vert")
                        ),
                        m("ul.dropdown-menu.dropdown-menu-right", [
                            m("li",
                                m("a[href='']",
                                    "Refresh"
                                )
                            ),
                            m("li",
                                m("a[href='']",
                                    "Manage Widgets"
                                )
                            ),
                            m("li",
                                m("a[href='']",
                                    "Widgets Settings"
                                )
                            )
                        ])
                    ])
                ])
            ]),
            !Data.sender_ids ? m(".text-center.p-20.m-t-25", m(".preloader.pl-xxl", m(".preloader.pls-red",
                m("svg.pl-circular[viewBox='25 25 50 50']",
                    m("circle.plc-path[cx='50'][cy='50'][r='20']")
                )
            ))) : m(".card", [
                m(".card-header",
                    m("h2", [
                        "Your Sender Id's",
                        m("small",
                            `Sender Ids are the alphanumeric ids the message arrives with to the contacts phones, 
                            here you can manage your id's ob buy new ones if you are interested in a new one.\n
                            The Id that has been set as active is the one that is used to send all messages unless stated otherwise before sending`
                        )
                    ])
                ),

                m(".table-responsive",
                    m("table.table.table-striped[id='data-table-basic']", [
                        m("thead",
                            m("tr", [
                                m("th",
                                    "Name"
                                ),
                                m("th",
                                    ""
                                )
                            ])
                        ),
                        m("tbody", [Data.sender_ids.map(contact => {
                            return m("tr", [
                                m("td",
                                    contact.name
                                ),
                                m("td",
                                    Data.ActiveSenderId.id !== contact.id 
                                    ? m(".btn-group.pull-right", [
                                        m("button.btn.btn-warning.btn-xs",
                                            "Activate"
                                        )
                                    ]) 
                                    : m(".btn-group.pull-right", [
                                        m("button.btn.btn-success.btn-xs",
                                            "Active"
                                        )
                                    ]) 
                                )
                            ])
                        })])
                    ])
                )
            ])
        ]
    }
}


export { sender_ids }
