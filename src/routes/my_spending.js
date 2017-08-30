import m from "mithril"
import { data_tables } from "../plugins"
import prop from "mithril/stream"
import { fetch, post } from "../components/requestToolBox"

var Data = {
    groups: [],
    fetch: function() {
        fetch("my_spending", `query{
                  Organisation{
                      message_instances{
                          id,
                          total_messages_bill,
                          admin,
                          messages_count,
                          date
                        }
                  }
                }`).then(res => {
            Data.message_instances = res.data.Organisation.message_instances
        })
        $('#data-table-basic').DataTable();
    }
}

var my_spending = {
    oninit(vnode) {
        vnode.state.show = false
        vnode.state.name = prop("")
        vnode.state.number = prop("")
        vnode.state.groups = prop([])

        vnode.state.submit = (e) => {
            e.preventDefault()
            post("my_spending", `mutation contactCreate($name:String!,$contact:String!,$groups:[String!]){
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
            vnode.state.show === true ? m(".card", [
                m(".card-header",
                    m("h2", [
                        "Enter new contact",
                        m("small",
                            "You can create a new contact here and hit submit, the new contact will be added and you will be able to send messages to him, please select groups you want him to join directly after you add him."
                        )
                    ])
                ),
                m(".card-body.card-padding",
                    m("form", {
                        onsubmit: vnode.state.submit
                    }, [
                        m(".form-group.fg-line", [
                            m("label[for='exampleInputEmail1']",
                                "Full Names"
                            ),
                            m("input.form-control.input-sm[id='exampleInputEmail1'][placeholder='John Mwangi'][type='text']", {
                                onchange: m.withAttr("value", (value) => vnode.state.name = value),
                                value: vnode.state.name
                            })
                        ]),
                        m(".form-group.fg-line", [
                            m("label[for='exampleInputPassword1']",
                                "Phone number"
                            ),
                            m("input.form-control.input-sm[id='exampleInputPassword1'][placeholder='0711 657 108'][type='text']", {
                                onchange: m.withAttr("value", (value) => vnode.state.number = value),
                                value: vnode.state.number
                            })
                        ]),
                        m(".form-group.fg-line", [
                            m("p.f-500.c-black.m-b-15",
                                "Add to this groups automatically"
                            ),
                            m("select.chosen[data-placeholder='Click here to reveal your groups....'][multiple='']", {
                                id: "chosen",
                                oncreate() {
                                    $(".chosen")[0] && $(".chosen").chosen({
                                        width: "100%",
                                        allow_single_deselect: !0
                                    })
                                },
                                onchange() {
                                    vnode.state.groups = $("#chosen").chosen().val()
                                }
                            }, [
                                Data.groups.map(group => {
                                    return m(`option[value='${group.id}']`, {
                                            selected: group.selected
                                        },
                                        group.name
                                    )
                                })
                            ])
                        ]),
                        m(".form-group.fg-line", [
                            m("button.btn.btn-primary.btn-sm.m-t-10[type='submit']",
                                "Submit"
                            ),
                            m("button.btn.btn-grey.btn-sm.m-t-10.pull-right[type='button']", {
                                    onclick() {
                                        vnode.state.show = false
                                    }
                                },
                                "Cancel"
                            )
                        ]),
                    ])
                )
            ]) : (!Data.message_instances ? m(".text-center.p-20.m-t-25", m(".preloader.pl-xxl", m(".preloader.pls-red",
                m("svg.pl-circular[viewBox='25 25 50 50']",
                    m("circle.plc-path[cx='50'][cy='50'][r='20']")
                )
            ))) : m(".card", [
                m(".card-header",
                    m("h2", [
                        "Your spendings",
                        m("small",
                            `All the message instances you have done appear here, together with the total cost after those messages were complete. To look at the costs incured per message and which administrator sent them please use this list`
                        )
                    ])
                ),

                m(".table-responsive",
                    m("table.table.table-striped[id='data-table-basic']", [
                        m("thead",
                            m("tr", [
                                m("th",
                                    "Date"
                                ),
                                m("th",
                                    "By"
                                ),
                                m("th",
                                    "bill"
                                ),
                                m("th",
                                    "Message Count"
                                )
                            ])
                        ),
                        m("tbody", [Data.message_instances.map(instance => {
                            return m("tr", [
                                m("td",
                                    instance.date
                                ),
                                m("td",
                                    instance.admin
                                ),
                                m("td",
                                    instance.total_messages_bill
                                ),
                                m("td",
                                    instance.messages_count
                                )
                            ])
                        })])
                    ])
                ),
                m("button.btn.btn-float.btn-info.m-btn.waves-effect.waves-circle.waves-float", {
                        onclick() {
                            vnode.state.show = true
                            vnode.state.name = ""
                            vnode.state.number = ""
                        }
                    },
                    m("i.zmdi.zmdi-plus")
                )
            ]))
        ]
    }
}


export { my_spending }
