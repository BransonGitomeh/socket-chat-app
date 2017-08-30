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
  groups: [],
  fetch: function () {
    fetch("contacts", `query {
                Organisations{
                  id,
                  questionnaires{
                    id,
                    name,
                    singleTexts{
                      id,
                      title,
                      explanation
                    },
                    multiTexts{
                      id,
                      title,
                      explanation,
                      Options{
                        value
                      }
                    },
                    singleChoices{
                      id,
                      title,
                      explanation,
                      choiceOptions{
                        value
                      }
                    },
                    multiChoices{
                      id,
                      title,
                      explanation,
                      choiceOptions{
                        value
                      }
                    },
                  }
                }
              }`)
      .then(res => {
        console.log(res)
        res.data.Organisation = res.data.Organisations.pop()
        Data.Organisation = res.data.Organisation
        Data.questionnaires = res.data.Organisation.questionnaires
      }, err => {
        console.log("faild")
      })
    $('#data-table-basic')
      .DataTable();
  },
  create: function (data, cb) {
    post("contacts", `mutation x($org:String!,$name:String!,){
  QuestionnaireMutations{
    Create(org:$org,name:$name){
      id
    }
  }
}`, data)
      .then(res => {
        cb(res.data.QuestionnaireMutations.Create)
      })
  },
  update: function (data, cb) {
    data.ContactGroups = data.groups
    post("contacts", `mutation x(
                $id:String!
              ){
                questionnaireMutations{
                  Create(
                    id:$id,
                    name:$name
                  ){
                    id
                  }
                }
              }`, data)
      .then(res => {
        console.log(res)
        cb(res.data.questionnaireMutations.Update)
      })
  },
  delete: function (data, cb) {
    post("contacts", `mutation x($id:String!){
                        questionnaireMutations{
                          Delete(id:$id){
                            id
                          }
                        }
                      }`, data)
      .then(res => {
        cb(res.data.questionnaireMutations.Delete)
      })
  }
}

const createForm = {
  oninit(vnode) {
    const form = vnode.attrs.data
    // console.log(form, Data.Organisation.id)
    form.org = Data.Organisation.id
    vnode.state = {
      org: form.org,
      name: form.name,
      sending: false,
      submit(e) {
        e.preventDefault()
        vnode.state.sending = true
        m.redraw()
        if ($("#chosen")
          .chosen()
          .val()) {
          vnode.state.groups = $("#chosen")
            .chosen()
            .val()
        }

        vnode.attrs.submit(vnode.state)
      },
    }
  },
  view(vnode) {
    return m(".card", [
      m(".card-header",
        m("h2", [
          "Create Questionnaire",
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
            m("input.form-control.input-sm[id='exampleInputEmail1'][placeholder='Data collection'][type='text']", {
              onchange: m.withAttr("value", (value) => vnode.state.name = value),
              value: vnode.state.name
            })
          ]),
          m(".form-group.fg-line", [(!vnode.state.sending ? m("button.btn.btn-primary.btn-sm.m-t-10[type='submit']",
              "Submit"
            ) : m(".preloader.pls-red",
              m("svg.pl-circular[viewBox='25 25 50 50']",
                m("circle.plc-path[cx='50'][cy='50'][r='20']")
              )
            )),
            m("button.btn.btn-grey.btn-sm.m-t-10.pull-right[type='button']", {
                onclick() {
                  vnode.attrs.cancel()
                  m.redraw()
                }
              },
              "Cancel"
            )
          ])
        ])
      )
    ])
  }
}

const editForm = {
  oninit(vnode) {
    const form = vnode.attrs.data
    console.log(vnode.attrs)
    vnode.state = {
      id: form.id,
      name: form.name,
      sending: false,
      submit(e) {
        e.preventDefault()
        vnode.state.sending = true
        m.redraw()
        if ($("#chosen")
          .chosen()
          .val()) {
          vnode.state.groups = $("#chosen")
            .chosen()
            .val()
        } else {
          vnode.state.groups = []
        }

        vnode.attrs.submit(vnode.state)
      },
    }
  },
  view(vnode) {
    return m(".card", [
      m(".card-header",
        m("h2", [
          "Edit questionnaire",
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
            m("input.form-control.input-sm[id='exampleInputEmail1'][placeholder='Name'][type='text']", {
              onchange: m.withAttr("value", (value) => vnode.state.name = value),
              value: vnode.state.name
            })
          ]),
          m(".form-group.fg-line", [(!vnode.state.sending ? m("button.btn.btn-primary.btn-sm.m-t-10[type='submit']",
              "Submit"
            ) : m(".preloader.pls-red",
              m("svg.pl-circular[viewBox='25 25 50 50']",
                m("circle.plc-path[cx='50'][cy='50'][r='20']")
              )
            )),
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

var contacts = {
  oninit(vnode) {
    vnode.state.show = false
    vnode.state.formData = {
      org: Data.Organisation ? Data.Organisation.id : "",
      name: ""
    }
    vnode.state.submit = (formData) => {
      if (vnode.state.edit != true) {
        formData.ContactGroups = formData.groups
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
          delete Data.contacts
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
      }) : (!Data.questionnaires ? m(".text-center.p-20.m-t-25", m(".preloader.pl-xxl", m(".preloader.pls-red",
        m("svg.pl-circular[viewBox='25 25 50 50']",
          m("circle.plc-path[cx='50'][cy='50'][r='20']")
        )
      ))) : m(".card", [
        m(".card-header",
          m("h2", [
            "Contact List",
            m("small",
              "All your contacts are here in this table, you can filter and use the edit button on the far left."
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
                ),
                m("th",
                  ""
                )
              ])
            ),
            m("tbody", [Data.questionnaires.map(q => {
              return m("tr", [
                m("td",
                  q.name
                ),
                m("td",
                  m("a.btn.btn-primary.btn-xs", {
                    href: "/manage/" + q.id,
                    oncreate: m.route.link
                  }, 'view content')
                ),
                m("td",
                  m(".btn-group.pull-right", [
                    m("button.btn.btn-primary.btn-xs", {
                        onclick() {
                          vnode.state.show = true
                          vnode.state.edit = true

                          vnode.state.formData = {
                            org: Data.Organisation.id,
                            name: q.name,
                          }
                          m.redraw()
                        }
                      },
                      "edit"
                    ),
                    m("button.btn.btn-warning.btn-xs", {
                        onclick() {
                          const q = confirm("Are you sure you want to delete this contact?")
                          if (q == true) {
                            vnode.state.formData = {
                              id: contact.id,
                            }

                            Data.delete(vnode.state.formData, function (data) {
                              delete Data.contacts
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
              vnode.state.name = ""
              vnode.state.number = ""
              vnode.state.groups = []
            }
          },
          m("i.zmdi.zmdi-plus")
        )
      ]))
    ]
  }
}


export {
  contacts
}
