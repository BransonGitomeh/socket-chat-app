import prop from "mithril/stream"
import settings from "../settings"
import m from "mithril"

function notify(from, align, icon, type, animIn, animOut, title, message) {
    $.growl({
        icon: icon,
        title: title,
        message: message,
        url: ''
    }, {
        element: 'body',
        type: type,
        allow_dismiss: true,
        placement: {
            from: from,
            align: align
        },
        offset: {
            x: 20,
            y: 85
        },
        spacing: 10,
        z_index: 1031,
        delay: 2500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: animIn,
            exit: animOut
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
            '<button type="button" class="close" data-growl="dismiss">' +
            '<span aria-hidden="true">&times;</span>' +
            '<span class="sr-only">Close</span>' +
            '</button>' +
            '<span data-growl="icon"></span>' +
            '<span data-growl="title"></span>' +
            '<span data-growl="message"></span>' +
            '<a href="#" data-growl="url"></a>' +
            '</div>'
    });
};


var login = {
    onremove() {
        $("body").removeClass("cyan")
    },
    oninit(vnode) {
        if (localStorage.getItem("token")) {
            m.route.set("/dashboard")
        }
        vnode.state.username = prop("")
        vnode.state.password = prop("")
        vnode.state.remember = prop(true)
        vnode.state.submit = (e) => {
            e.preventDefault()
            m.request({
                    url: settings.url,
                    method: "POST",
                    data: {
                        query: `mutation x($email: String!, $password: String!) {
                            Login(email: $email, password: $password) {
                              token
                              Errors {
                                key
                                message
                              }
                            }
                          }`,
                        variables: JSON.stringify({
                            email: vnode.state.username,
                            password: vnode.state.password
                        })
                    },
                })
                .then((res) => {
                    function completeLogin(hash) {
                        localStorage.setItem("token", hash)
                        notify("top", "right", "fa fa-comments", "success", "animated fadeIn", "animated fadeOut", "Login succesfull!", "");

                        // Materialize.toast("Login was a success", 1000, "cyan")
                        setTimeout((e) => {
                            m.route.set("/dashboard")
                        }, 500)
                    }
                    res.data.Login.Errors ? res.data.Login.Errors.map(err => {
                        notify("top", "right", "fa fa-comments", "danger", "animated fadeIn", "animated fadeOut", err.message, "")
                    }) : completeLogin(res.data.Login.token)
                })
                // .catch((res) => console.log(JSON.stringify(res)))
        }
    },
    view(vnode) {
        return m(".login-content", [
            m(".lc-block.toggled[id='l-login']", [
                m("form.lcb-form", {
                    onsubmit: vnode.state.submit
                }, [
                    m(".input-group.m-b-20", [
                        m("span.input-group-addon",
                            m("i.zmdi.zmdi-account")
                        ),
                        m(".fg-line",
                            m("input.form-control[placeholder='Username'][type='text']", {
                                oninput: m.withAttr("value", (value) => vnode.state.username = value),
                                value: vnode.state.username
                            })
                        )
                    ]),
                    m(".input-group.m-b-20", [
                        m("span.input-group-addon",
                            m("i.zmdi.zmdi-male")
                        ),
                        m(".fg-line",
                            m("input.form-control[placeholder='Password'][type='password']", {
                                oninput: m.withAttr("value", (value) => vnode.state.password = value),
                                value: vnode.state.password
                            })
                        )
                    ]),
                    m(".checkbox",
                        m("label", [
                            m("input[type='checkbox'][value='']", {
                                oninput: m.withAttr("value", (value) => vnode.state.remember = value),
                                checked: vnode.state.remember
                            }),
                            m("i.input-helper")
                        ], "Keep me logged in")
                    ),
                    m("button.btn.btn-login.btn-success.btn-float[type='submit']",
                        m("i.zmdi.zmdi-arrow-forward")
                    )
                ]),
                m(".lcb-navigation", [
                    m("a[data-ma-action='login-switch'][data-ma-block='#l-register'][href='']", [
                        m("i.zmdi.zmdi-plus"),
                        m("span",
                            "Register"
                        )
                    ]),
                    m("a[data-ma-action='login-switch'][data-ma-block='#l-forget-password'][href='']", [
                        m("i",
                            "?"
                        ),
                        m("span",
                            "Forgot Password"
                        )
                    ])
                ])
            ]),
            m(".lc-block[id='l-register']", [
                m("form.lcb-form", {
                    onsubmit(e) {
                        e.preventDefault()
                        alert("prevented!")
                    }
                }, [
                    m(".input-group.m-b-20", [
                        m("span.input-group-addon",
                            m("i.zmdi.zmdi-account")
                        ),
                        m(".fg-line",
                            m("input.form-control[placeholder='Username'][type='text']")
                        )
                    ]),
                    m(".input-group.m-b-20", [
                        m("span.input-group-addon",
                            m("i.zmdi.zmdi-email")
                        ),
                        m(".fg-line",
                            m("input.form-control[placeholder='Email Address'][type='text']")
                        )
                    ]),
                    m(".input-group.m-b-20", [
                        m("span.input-group-addon",
                            m("i.zmdi.zmdi-male")
                        ),
                        m(".fg-line",
                            m("input.form-control[placeholder='Password'][type='password']")
                        )
                    ]),
                    m("a.btn.btn-login.btn-success.btn-float[href='']",
                        m("i.zmdi.zmdi-check")
                    )
                ]),
                m(".lcb-navigation", [
                    m("a[data-ma-action='login-switch'][data-ma-block='#l-login'][href='']", [
                        m("i.zmdi.zmdi-long-arrow-right"),
                        m("span",
                            "Sign in"
                        )
                    ]),
                    m("a[data-ma-action='login-switch'][data-ma-block='#l-forget-password'][href='']", [
                        m("i",
                            "?"
                        ),
                        m("span",
                            "Forgot Password"
                        )
                    ])
                ])
            ]),
            m(".lc-block[id='l-forget-password']", [
                m(".lcb-form", [
                    m("p.text-left",
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu risus. Curabitur commodo lorem fringilla enim feugiat commodo sed ac lacus."
                    ),
                    m(".input-group.m-b-20", [
                        m("span.input-group-addon",
                            m("i.zmdi.zmdi-email")
                        ),
                        m(".fg-line",
                            m("input.form-control[placeholder='Email Address'][type='text']")
                        )
                    ]),
                    m("a.btn.btn-login.btn-success.btn-float[href='']",
                        m("i.zmdi.zmdi-check")
                    )
                ]),
                m(".lcb-navigation", [
                    m("a[data-ma-action='login-switch'][data-ma-block='#l-login'][href='']", [
                        m("i.zmdi.zmdi-long-arrow-right"),
                        m("span",
                            "Sign in"
                        )
                    ]),
                    m("a[data-ma-action='login-switch'][data-ma-block='#l-register'][href='']", [
                        m("i.zmdi.zmdi-plus"),
                        m("span",
                            "Register"
                        )
                    ])
                ])
            ])
        ])
    }
}


var logout = {
    oninit() {
        localStorage.clear()
        m.route.set("/")
    },
    view() {
        return m("h1", "adios")
    }
}



export { login, logout }
