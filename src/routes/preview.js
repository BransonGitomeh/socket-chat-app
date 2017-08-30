import m from "mithril"
import prop from "mithril/stream"
import {
  fetch,
  post
} from "../components/requestToolBox"

var Data = {
  Organisations: "",
  dashboards: {
    fetch: function () {
      fetch("dashboards", `query {
                  Organisations{
                    questionnaires{
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
        .then(res => Data.Organisation = res.data.Organisations.pop())
    }
  }
}

const preview = {
  oncreate: Data.dashboards.fetch,
  oninit(vnode) {
    vnode.state.openTodo = prop(false)
    vnode.state.todoList = []
    vnode.state.newTodo = prop("")
  },
  view(vnode) {
    return m(".card", [!Data.Organisation ? m(".text-center.p-20.m-t-25", m(".preloader.pl-xxl", m(".preloader.pls-red",
      m("svg.pl-circular[viewBox='25 25 50 50']",
        m("circle.plc-path[cx='50'][cy='50'][r='20']")
      )
    ))) : m(".q", [

      Data.Organisation.questionnaires.map(questionnaire => {
        return m(".question", [
          m(".card-header", m(".block-header", [
            m("h2",
              questionnaire.name
            ),
            m("a.btn.btn-default.btn-icon-text.waves-effect.center.pull-right", {
                href: "/manage",
                oncreate: m.route.link
              },
              m("i.zmdi.zmdi-refresh"),
              "manage",
            ),
          ]), ),
          m(".card-body.card-padding", [
            questionnaire.singleTexts.map(singleText => {
              return m(".form-group",
                m(".fg-line",
                  m(`input.form-control.input-sm[placeholder='${singleText.explanation}'][type='text']`)
                )
              )
            }),

            questionnaire.multiTexts.map(multiText => {
              return multiText.Options.map(option => {
                return m(".form-group",
                  m(".fg-line",
                    m(`input.form-control.input-sm[placeholder='${option.value}'][type='text']`)
                  )
                )
              })
            }),

            questionnaire.multiChoices.map(choice => {
              return choice.choiceOptions.map(option => {
                return m(".checkbox.m-b-15",
                  m("label", [
                    m("input[type='checkbox'][value='']"),
                    m("i.input-helper"),
                    " Option one is this and that-be sure to include why it's great"
                  ])
                )
              })
            }),

            questionnaire.singleChoices.map(choice => {
              return choice.choiceOptions.map(option => {
                return m(".radio.m-b-15",
                  m("label", [
                    m("input[name='sample'][type='radio'][value='']"),
                    m("i.input-helper"),
                    " Option one is this and that-be sure to include why it's great"
                  ])
                )
              })
            })
          ]),
          m(".card-footer", [
            m(".container", [
              m("button.btn.btn-xs.btn-primary.btn-icon-text.waves-effect.pull-right",
                "Next",
                m("i.zmdi.zmdi-arrow-forward"),
              ),

              m("button.btn.btn-xs.btn-danger.btn-icon-text.waves-effect",
                m("i.zmdi.zmdi-arrow-back"),
                "Back",
              )
            ]),
            m("br"),
            m(".progress",
              m(".progress-bar[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='60'][role='progressbar']", {
                  style: {
                    "width": "60%"
                  }
                },
                m("span.sr-only",
                  "60% Complete"
                )
              )
            )
          ])
        ])
      })
    ])])
  }
}

export {
  preview
}
