var dashboard = {
    view() {
        return m("[id='error-page']",
            m(".row",
                m(".col.s12",
                    m(".browser-window", [
                        m(".top-bar",
                            m(".circles", [
                                m(".circle[id='close-circle']"),
                                m(".circle[id='minimize-circle']"),
                                m(".circle[id='maximize-circle']")
                            ])
                        ),
                        m(".content",
                            m(".row", [
                                m(".col.s12[id='site-layout-example-top']",
                                    m("p.flat-text-logo.center.white-text.caption-uppercase",
                                        "Sorry but we couldn’t find this page :("
                                    )
                                ),
                                m(".col.s12.m12.l12[id='site-layout-example-right']", [
                                    m(".row.center",
                                        m("h1.text-long-shadow.col.s12",
                                            "404"
                                        )
                                    ),
                                    m(".row.center", [
                                        m("p.center.white-text.col.s12",
                                            "It seems that this page doesn’t exist."
                                        ),
                                        m("p.center.s12", [
                                            m("button.btn.waves-effect.waves-light[onclick='goBack()']",
                                                "Back"
                                            ),
                                            m("a.btn.waves-effect.waves-light[href='index.html']",
                                                "Homepage"
                                            )
                                        ]),
                                        m("p", )
                                    ])
                                ])
                            ])
                        )
                    ])
                )
            )
        )
    }
}

export default dashboard
