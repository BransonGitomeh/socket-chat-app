export default (m) => {
  const loginComponent = {
    oninit(vnode) {
      vnode.state.email = ''
      vnode.state.password = ''
      vnode.state.rememberSession = false
    },
    view(vnode) {
      return m('form', {
        onsubmit(e) {
          e.preventDefault()
          m.socket.emit('login', vnode.state)
          m.socket.on('login', ({
            token,
            err
          }) => {
            if (!err) {
              localStorage.setItem('token', token)
              location.reload();
            }
          })
        }
      }, [
        m(".input-group.m-b-20", [
          m("span.input-group-addon",
            m("i.zmdi.zmdi-account")
          ),
          m(".fg-line",
            m("input.form-control[placeholder='Email'][type='email']", {
              onchange: m.withAttr('value', v => vnode.state.email = v),
              value: vnode.state.email
            })
          )
        ]),
        m(".input-group.m-b-20", [
          m("span.input-group-addon",
            m("i.zmdi.zmdi-male")
          ),
          m(".fg-line",
            m("input.form-control[placeholder='Password'][type='password']", {
              oninput: m.withAttr('value', v => vnode.state.password = v),
              value: vnode.state.password
            })
          )
        ]),
        m(".checkbox",
          m("label", [
            m("input[type='checkbox'][value='']", {
              onchange: m.withAttr('checked', v => vnode.state.rememberSession = v),
              value: vnode.state.rememberSession
            }),
            m("i.input-helper"),
            "Remember your session"
          ]),
        ),
        m("button.btn.btn-login.btn-success.btn-float[href=''][type='submit']",
          m("i.zmdi.zmdi-arrow-forward")
        )
      ])
    }
  }


  const registerComponent = {
    oninit(vnode) {
      vnode.state.names = ''
      vnode.state.email = ''
      vnode.state.password = ''
    },
    view(vnode) {
      return m("form", {
        onsubmit(e) {
          e.preventDefault()
          m.socket.emit('register', vnode.state)
          m.socket.on('register', ({
            token,
            err
          }) => {
            if (!err) {
              localStorage.setItem('token', token)
              location.reload();
            }
          })
        }
      }, [
        m(".input-group.m-b-20", [
          m("span.input-group-addon",
            m("i.zmdi.zmdi-account")
          ),
          m(".fg-line",
            m("input.form-control[placeholder='Username'][type='text']", {
              onchange: m.withAttr('value', v => vnode.state.names = v),
              value: vnode.state.names
            })
          )
        ]),
        m(".input-group.m-b-20", [
          m("span.input-group-addon",
            m("i.zmdi.zmdi-email")
          ),
          m(".fg-line",
            m("input.form-control[placeholder='Email Address'][type='text']", {
              onchange: m.withAttr('value', v => vnode.state.email = v),
              value: vnode.state.email
            })
          )
        ]),
        m(".input-group.m-b-20", [
          m("span.input-group-addon",
            m("i.zmdi.zmdi-male")
          ),
          m(".fg-line",
            m("input.form-control[placeholder='Password'][type='password']", {
              onchange: m.withAttr('value', v => vnode.state.password = v),
              value: vnode.state.password
            })
          )
        ]),
        m("button.btn.btn-login.btn-success.btn-float[href=''][type='submit']",
          m("i.zmdi.zmdi-check")
        )
      ])
    }
  }

  const forgotPassComponent = {
    oninit(vnode) {
      vnode.state.email = ''
    },
    view(vnode) {
      return m("form", {
        onsubmit(e) {
          e.preventDefault()
          m.socket.emit('register', vnode.state)
          m.socket.on('register', ({
            token,
            err
          }) => {
            if (!err) {
              localStorage.setItem('token', token)
              location.reload();
            }
          })
        }
      }, [
        m("p.text-left",
          "If you enter the right email, the password reset link should be on its way!!"
        ),
        m(".input-group.m-b-20", [
          m("span.input-group-addon",
            m("i.zmdi.zmdi-email")
          ),
          m(".fg-line",
            m("input.form-control[placeholder='Email Address'][type='email']", {
              onchange: m.withAttr('value', v => vnode.state.email = v),
              value: vnode.state.email
            })
          )
        ]),
        m("button.btn.btn-login.btn-success.btn-float[href=''][type='submit']",
          m("i.zmdi.zmdi-check")
        )
      ])
    }
  }



  return {
    oninit(vnode) {
      vnode.state.login = true
      vnode.state.selectedComponent = registerComponent
    },
    view: (vnode) => {
      if (vnode.state.login === true) {
        vnode.state.selectedComponent = loginComponent
      } else if (vnode.state.register === true) {
        vnode.state.selectedComponent = registerComponent
      } else if (vnode.state.forgotPass === true) {
        vnode.state.selectedComponent = forgotPassComponent
      }

      return m(".login-content", [
        m(".lc-block.toggled", [
          m(".lcb-form", m(vnode.state.selectedComponent)),
          m(".lcb-navigation", [(vnode.state.login === true ? m("a[href='javascript:void(0);'][data-ma-action='login-switch'][data-ma-block='#l-register']", {
              onclick() {
                vnode.state.register = true
                vnode.state.login = false
                vnode.state.forgotPass = false
                m.redraw()
              }
            }, [
              m("i.zmdi.zmdi-plus"),
              m("span",
                "Register"
              )
            ]) : m("a[href='javascript:void(0);'][data-ma-action='register-switch'][data-ma-block='#l-register']", {
              onclick() {
                console.log('login')
                vnode.state.register = false
                vnode.state.login = true
                vnode.state.forgotPass = false
                m.redraw()
              }
            }, [
              m("i.zmdi.zmdi-sign-in"),
              m("span",
                "Login"
              )
            ])),

            m("a[href='javascript:void(0);'][data-ma-action='login-switch'][data-ma-block='#l-forget-password']", {
              onclick() {
                console.log('forgotPass')
                vnode.state.register = false
                vnode.state.login = false
                vnode.state.forgotPass = true
                m.redraw()
              }
            }, [
              m("i",
                "?"
              ),
              m("span",
                "Forgot Password"
              )
            ])
          ])
        ])
      ])
    }
  }
}
