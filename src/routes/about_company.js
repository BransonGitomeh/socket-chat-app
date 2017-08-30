import m from "mithril"
import { data_tables } from "../plugins"
import prop from "mithril/stream"
import { fetch, post } from "../components/requestToolBox"

var Data = {
    groups: [],
    about:{details:{}},
    fetch: function() {
        fetch("about", `query{
                  Organisation{
                    id,
                    name,
                    details {
                      address
                      financeContacts
                      technicalContacts
                    }     
                  }
                }`).then(res => {
            Data.about = res.data.Organisation
            m.redraw()
        })
        $('#data-table-basic').DataTable();
    }
}

var about = {
    oncreate: Data.fetch,
    oninit(vnode) {
        vnode.state.show = true
        vnode.state.groups = prop([])
        vnode.state.details = {}
        vnode.state.submit = (e) => {
            e.preventDefault()
            post("about", `mutation x($id:String!,$name:String,$details:inputCustomerDetails){
                OrganisationMutations{
                  Update(id:$id,name:$name,details:$details){
                    id
                  }
                }
              }`, Data.about).then(res => {
                m.redraw()
                Data.fetch()
            })
        }
    },
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
            m(".card", [
                m(".card-header",
                    m("h2", [
                        "Your Organisations Details",
                        m("small",
                            "You can manage the information we have about your Organisation here, this is reflected on reports and various sections of the system"
                        )
                    ])
                ),
                m(".card-body.card-padding",
                    m("form", {
                        onsubmit: vnode.state.submit
                    }, [
                        m(".form-group.fg-line", [
                            m("label[for='exampleInputEmail1']",
                                "Name"
                            ),
                            m("input.form-control.input-sm[id='exampleInputEmail1'][placeholder='Test Organisation name'][type='text']", {
                                onchange: m.withAttr("value", (value) => Data.about.name = value),
                                value: Data.about.name
                            })
                        ]),
                        m(".form-group.fg-line", [
                            m("label[for='exampleInputPassword1']",
                                "Address"
                            ),
                            m("input.form-control.input-sm[id='exampleInputPassword1'][placeholder='Nairobi, oposite KICC'][type='text']", {
                                onchange: m.withAttr("value", (value) => Data.about.details.address = value),
                                value: Data.about.details.address
                            })
                        ]),
                        m(".form-group.fg-line", [
                            m("label[for='exampleInputPassword1']",
                                "Finance Contact Details"
                            ),
                            m("input.form-control.input-sm[id='exampleInputPassword1'][placeholder='0711 657 108'][type='text']", {
                                onchange: m.withAttr("value", (value) => Data.about.details.financeContacts = value),
                                value: Data.about.details.financeContacts
                            })
                        ]),
                        m(".form-group.fg-line", [
                            m("label[for='exampleInputPassword1']",
                                "Technical Contact Details"
                            ),
                            m("input.form-control.input-sm[id='exampleInputPassword1'][placeholder='0711 657 108'][type='text']", {
                                onchange: m.withAttr("value", (value) => Data.about.details.technicalContacts = value),
                                value: Data.about.details.technicalContacts
                            })
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
                        ])
                    ])
                )
            ])
        ]
    }
}


export { about }
