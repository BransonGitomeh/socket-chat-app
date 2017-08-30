import m from "mithril"
import {
  data_tables
} from "../plugins"
import prop from "mithril/stream"
import {
  fetch,
  post
} from "../components/requestToolBox"

var Data = {
  fetch: function () {
    fetch("contacts", `query {
              Organisation {
                id
                Contacts {
                  id,
                  nickName
                  firstName
                  middleName
                  lastName
                  phoneNumber,
                  ContactGroups{
                    id,
                    name
                  }
                },
                ContactGroups{
                  id,
                  name,
                  Contacts {
                      id,
                      nickName
                      firstName
                      middleName
                      lastName
                      phoneNumber
                    },
                }
              }
            }`)
      .then(res => {
        Data.contacts = res.data.Organisation.Contacts
        Data.groups = res.data.Organisation.ContactGroups

        Data.contacts.forEach(contact => contact ? contact.groups = contact.ContactGroups : [])

        Data.groups.map(group => group.selected = false)
        Data.groups.map(group => {
          group.contacts = group.Contacts
          group.contact_count = group.Contacts.length
        })

      }, err => {
        console.log("faild")
      })
    $('#data-table-basic')
      .DataTable();
  },
  create: function (data, cb) {
    post("contacts", `mutation x($name: String!,$Contacts: [String]!) {
                  ContactGroupMutations {
                    Create(name: $name,Contacts: $Contacts) {
                      id
                    }
                  }
                }`, data)
      .then(res => {
        cb(res.data.ContactGroupMutations.Create)
      })
  },
  update: function (data, cb) {
    post("contacts", `mutation x($id: String!,$name: String!,$Contacts: [String]!) {
                  ContactGroupMutations {
                    Update(id: $id,name: $name,Contacts: $Contacts) {
                      id
                    }
                  }
                }`, data)
      .then(res => {
        console.log(res)
        cb(res.data.ContactGroupMutations.Update)
      })
  },
  delete: function (data, cb) {
    post("contacts", `mutation x($id:String!){
                        ContactGroupMutations{
                          Delete(id:$id){
                            id
                          }
                        }
                      }`, data)
      .then(res => {
        cb(res.data.ContactGroupMutations.Delete)
      })
  }
}

const createForm = {
  oninit(vnode) {
    const form = vnode.attrs.data
    console.log(vnode.attrs)
    vnode.state = {
      id: form.id,
      name: form.name,
      contacts: form.contacts,
      submit(e) {
        e.preventDefault()
        vnode.attrs.submit(vnode.state)
      },
    }
  },
  view(vnode) {
    return m(".card", [
      m(".card-header",
        m("h2", [
          "Create group",
          m("small",
            "You can create a edit contact here and hit submit, the contact will be changed and you will be able to send messages to him, please change groups you want him to join directly after you edit him."
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
            m("input.form-control.input-sm[id='exampleInputEmail1'][placeholder='ie...2018 champions'][type='text']", {
              onchange: m.withAttr("value", (value) => vnode.state.name = value),
              value: vnode.state.name
            })
          ]),

          m(".form-group.fg-line", [
            m("p.f-500.c-black.m-b-15",
              "Add this contacts automatically"
            ),
            m("select.chosen[data-placeholder='Click here to reveal your contacts....'][multiple='']", {
              id: "chosen",
              oncreate() {
                $(".chosen")[0] && $(".chosen")
                  .chosen({
                    width: "100%",
                    allow_single_deselect: !0
                  })
              },
              onchange() {
                vnode.state.contacts = $("#chosen")
                  .chosen()
                  .val()
              }
            }, [
              Data.contacts.map(contact => {
                if (contact) {
                  return m(`option[value='${contact.id}']`, {
                      selected: contact.selected
                    },
                    contact.firstName
                  )
                }
              })
            ])
          ]),
          m(".form-group.fg-line", [
            m("button.btn.btn-primary.btn-sm.m-t-10[type='submit']",
              "Submit"
            ),
            m("button.btn.btn-grey.btn-sm.m-t-10.pull-right[type='button']", {
                onclick() {
                  vnode.attrs.cancel()
                  m.redraw()
                }
              },
              "Cancel"
            )
          ]),
        ])
      )
    ])
  }
}


const editForm = {
  oninit(vnode) {
    const form = vnode.attrs.data
    console.log("attrs", vnode.attrs)
    vnode.state = {
      id: form.id,
      name: form.name,
      Contacts: [],
      submit(e) {
        e.preventDefault()
        if ($("#chosen")
          .chosen()
          .val()) {
          vnode.state.contacts = $("#chosen")
            .chosen()
            .val()
        } else {
          vnode.state.contacts = []
        }

        vnode.attrs.submit(vnode.state)
      },
    }
  },
  view(vnode) {
    return m(".card", [
      m(".card-header",
        m("h2", [
          "Edit group",
          m("small",
            "You can create a edit group here and hit submit, the contact will be changed and you will be able to send messages to him, please change groups you want him to join directly after you edit him."
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
            m("input.form-control.input-sm[id='exampleInputEmail1'][placeholder='ie...2018 champions'][type='text']", {
              onchange: m.withAttr("value", (value) => vnode.state.name = value),
              value: vnode.state.name
            })
          ]),

          m(".form-group.fg-line", [
            m("p.f-500.c-black.m-b-15",
              "Add this contacts automatically"
            ),
            m("select.chosen[data-placeholder='Click here to reveal your contacts....'][multiple='']", {
              id: "chosen",
              oncreate() {
                $(".chosen")[0] && $(".chosen")
                  .chosen({
                    width: "100%",
                    allow_single_deselect: !0
                  })
              },
              onchange() {
                vnode.state.contacts = $("#chosen")
                  .chosen(Data.contacts.filter(contact => contact ? contact.selected === true : ""))
                  .val()
              }
            }, [
              Data.contacts.map(contact => {
                if (contact) {
                  if (contact.selected) {
                    vnode.state.Contacts.push(contact)
                  }
                  return m(`option[value='${contact.id}']`, {
                    selected: contact.selected
                  }, `${contact.firstName} ${contact.middleName} ${contact.lastName} - ${contact.phoneNumber}`)
                }

              })
            ])
          ]),
          m(".form-group.fg-line", [
            m("button.btn.btn-primary.btn-sm.m-t-10[type='submit']",
              "Submit"
            ),
            m("button.btn.btn-grey.btn-sm.m-t-10.pull-right[type='button']", {
                onclick() {
                  vnode.attrs.cancel()
                  m.redraw()
                }
              },
              "Cancel"
            )
          ]),
        ])
      )
    ])
  }
}

var groups = {
  oninit(vnode) {
    vnode.state.show = false
    vnode.state.formData = {
      id: "",
      name: "",
      contacts: []
    }
    vnode.state.submit = (formData) => {
      formData.Contacts = formData.contacts
      if (vnode.state.edit != true) {
        Data.create(formData, function (data) {
          vnode.state.show = false
          formData.id = data.id
          Data.contacts.push(formData)
          m.redraw()
        })
      } else {
        Data.update(formData, function (data) {
          vnode.state.show = false
          vnode.state.edit = false
          delete Data.groups
          m.redraw()
          Data.fetch()
        })
      }
    }
  },
  oncreate: Data.fetch,
  onremove() {
    var table = $('#data-table-basic')
      .DataTable();
    table.destroy();
  },
  onbeforeupdate() {
    return new Promise((resolve, reject) => {
      var table = $('#data-table-basic')
        .DataTable();
      table.destroy();
      resolve()
    })
  },
  onupdate() {
    $('#data-table-basic')
      .DataTable();
  },
  view(vnode) {
    let selectedForm = createForm
    if (vnode.state.edit == true) {
      selectedForm = editForm
    }

    return [
      vnode.state.show === true ? m(selectedForm, {
        submit: vnode.state.submit,
        cancel() {
          vnode.state.show = false
          vnode.state.edit = false
          m.redraw()
        },
        data: vnode.state.formData
      }) : (!Data.groups ? m(".text-center.p-20.m-t-25", m(".preloader.pl-xxl", m(".preloader.pls-red",
        m("svg.pl-circular[viewBox='25 25 50 50']",
          m("circle.plc-path[cx='50'][cy='50'][r='20']")
        )
      ))) : m(".card", [
        m(".card-header",
          m("h2", [
            "Group List",
            m("small",
              "All your groups are here in this table, you can filter and use the edit button on the far left."
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
                  "contacts"
                ),
                m("th",
                  ""
                )
              ])
            ),
            m("tbody", [Data.groups.map(group => {
              return m("tr", [
                m("td",
                  group.name
                ),
                m("td",
                  group.contact_count
                ),
                m("td",
                  m(".btn-group.pull-right", [
                    m("button.btn.btn-primary.btn-xs", {
                        onclick() {
                          vnode.state.show = true
                          vnode.state.edit = true

                          vnode.state.formData = {
                            id: group.id,
                            name: group.name,
                            contacts: group.contacts.map(contact => {
                              if (contact) {
                                return contact
                              }
                            })
                          }

                          Data.contacts.map(contact => {
                            if (contact) {
                              group.contacts.map(group_contact => {
                                // console.log(group.contacts, contact)
                                if (group_contact) {
                                  if (group_contact.id === contact.id) {
                                    contact.selected = true
                                  }
                                }
                              })
                            }
                          })
                          m.redraw()
                        }
                      },
                      "edit"
                    ),
                    m("button.btn.btn-warning.btn-xs", {
                        onclick() {
                          const q = confirm("Are you sure you want to delete this group?")
                          if (q == true) {
                            vnode.state.formData = {
                              id: group.id,
                            }

                            Data.delete(vnode.state.formData, function (data) {
                              delete Data.groups
                              Data.fetch()
                              m.redraw()
                            })
                          }
                        }
                      },
                      "delete"
                    )
                  ])
                )
              ])
            })])
          ])
        ),
        m("button.btn.btn-float.btn-info.m-btn.waves-effect.waves-circle.waves-float", {
            onclick() {
              vnode.state.show = true
              delete Data.groups
              Data.fetch()
            }
          },
          m("i.zmdi.zmdi-plus")
        )
      ]))
    ]
  }
}


export {
  groups
}
