import m from "mithril"
import { data_tables } from "../plugins"
import prop from "mithril/stream"
import { fetch, post } from "../components/requestToolBox"

var Data = {
    groups: [],
    fetch: function() {
        fetch("my_wallet", `query{
                  Organisation{
                     debits{
                      date,
                      channel,
                      contact,
                      ref_id,
                      ammount
                    }
                  }
                }`).then(res => {
            Data.debits = res.data.Organisation.debits
        })
        $('#data-table-basic').DataTable();
    }
}

var my_wallet = {
    oninit(vnode) {
        vnode.state.show = false
        vnode.state.name = prop("")
        vnode.state.number = prop("")
        vnode.state.groups = prop([])

        vnode.state.submit = (e) => {
            e.preventDefault()
            post("my_wallet", `mutation contactCreate($name:String!,$contact:String!,$groups:[String!]){
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
            ]) : (!Data.debits ? m(".text-center.p-20.m-t-25", m(".preloader.pl-xxl", m(".preloader.pls-red",
                m("svg.pl-circular[viewBox='25 25 50 50']",
                    m("circle.plc-path[cx='50'][cy='50'][r='20']")
                )
            ))) : m(".card", [
                m(".card-header",
                    m("h2", [
                        "Your wallets' deposits",
                        m("small",
                            `Every time you deposit money into your account, it appears here, please use this to do your own accounts and confirm, and raise any issues on support if you see anything that doesnt look normal.`
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
                                    "Contact"
                                ),
                                m("th",
                                    "Channel"
                                ),
                                m("th",
                                    "Ref ID"
                                ),
                                m("th",
                                    "Ammount"
                                )
                            ])
                        ),
                        m("tbody", [Data.debits.map(debit => {
                            return m("tr", [
                                m("td",
                                    debit.date
                                ),
                                m("td",
                                    debit.contact
                                ),
                                m("td",
                                    debit.channel
                                ),
                                m("td",
                                    debit.ref_id
                                ),
                                m("td",
                                    debit.ammount
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


export { my_wallet }
