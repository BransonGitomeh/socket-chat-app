import m from "mithril"

var right_side_nav = {
    view() {
        return m("aside.sidebar[id='chat']", [
            m(".chat-search",
                m(".fg-line", [
                    m("input.form-control[placeholder='Search People'][type='text']"),
                    m("i.zmdi.zmdi-search")
                ])
            ),
            m(".lg-body.c-overflow",
                m(".list-group", [
                    m("a.list-group-item.media[href='']", [
                        m(".pull-left.p-relative", [
                            m("img.lgi-img[alt=''][src='img/demo/profile-pics/2.jpg']"),
                            m("i.chat-status-busy")
                        ]),
                        m(".media-body", [
                            m(".lgi-heading",
                                "Jonathan Morris"
                            ),
                            m("small.lgi-text",
                                "Available"
                            )
                        ])
                    ]),
                    m("a.list-group-item.media[href='']", [
                        m(".pull-left",
                            m("img.lgi-img[alt=''][src='img/demo/profile-pics/1.jpg']")
                        ),
                        m(".media-body", [
                            m(".lgi-heading",
                                "David Belle"
                            ),
                            m("small.lgi-text",
                                "Last seen 3 hours ago"
                            )
                        ])
                    ]),
                    m("a.list-group-item.media[href='']", [
                        m(".pull-left.p-relative", [
                            m("img.lgi-img[alt=''][src='img/demo/profile-pics/3.jpg']"),
                            m("i.chat-status-online")
                        ]),
                        m(".media-body", [
                            m(".lgi-heading",
                                "Fredric Mitchell Jr."
                            ),
                            m("small.lgi-text",
                                "Availble"
                            )
                        ])
                    ]),
                    m("a.list-group-item.media[href='']", [
                        m(".pull-left.p-relative", [
                            m("img.lgi-img[alt=''][src='img/demo/profile-pics/4.jpg']"),
                            m("i.chat-status-online")
                        ]),
                        m(".media-body", [
                            m(".lgi-heading",
                                "Glenn Jecobs"
                            ),
                            m("small.lgi-text",
                                "Availble"
                            )
                        ])
                    ]),
                    m("a.list-group-item.media[href='']", [
                        m(".pull-left",
                            m("img.lgi-img[alt=''][src='img/demo/profile-pics/5.jpg']")
                        ),
                        m(".media-body", [
                            m(".lgi-heading",
                                "Bill Phillips"
                            ),
                            m("small.lgi-text",
                                "Last seen 3 days ago"
                            )
                        ])
                    ]),
                    m("a.list-group-item.media[href='']", [
                        m(".pull-left",
                            m("img.lgi-img[alt=''][src='img/demo/profile-pics/6.jpg']")
                        ),
                        m(".media-body", [
                            m(".lgi-heading",
                                "Wendy Mitchell"
                            ),
                            m("small.lgi-text",
                                "Last seen 2 minutes ago"
                            )
                        ])
                    ])
                ])
            )
        ])
    }
}

export default right_side_nav
