import settings from "../settings"
import m from "mithril"

function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

var sandbox = {
    view(vnode) {
        var data = {
            'token': window.localStorage.getItem("token")
        };
        var querystring = encodeQueryData(data);
        return m(".embed-responsive embed-responsive-16by9", [
            // m(".card", [
            //     m(".card-header",
            //         m("h2", [
            //             "Graphql schema",
            //             m("small",
            //                 "You can run your graphql here for full tests, hit refresh if in development."
            //             )
            //         ])
            //     ),
            //     m(".card-body.card-padding.embed-responsive embed-responsive-16by9",
            //         m("iframe[id='graphrame'][allowtransparency='true'][frameborder='0'][name='targetframe'][scrolling='no'][src='" + settings.url + "#/" + querystring + "']", {
            //             height: "500px"
            //         })
            //     )
            // ]),
            // m(".embed-responsive embed-responsive-16by9",
            m("iframe[id='graphrame'][allowtransparency='true'][frameborder='0'][name='targetframe'][scrolling='no'][src='" + settings.url + "#/?" + querystring + "']", {
                // height: "500px"
            }),
            // ),
            m("button.btn.btn-float.btn-info.m-btn.waves-effect.waves-circle.waves-float", {
                    onclick() {
                        vnode.state.show = true
                    }
                },
                m("i.zmdi.zmdi-refresh-alt")
            ),
        ])
    }
}

var sandboxFab = m(".fixed-action-btn", {
    class: "tooltipped",
    "data-position": "left",
    "data-delay": "50",
    "data-tooltip": "Reload the sandbox's schema",
    oncreate() {
        $('.tooltipped').tooltip({ delay: 50 });
    },
    style: {
        "bottom": "19px",
        "right": "19px"
    }
}, [
    m("button.btn-floating.btn-large", {
            onclick() {
                m.route.set(m.route.get())
            }
        },
        m("i.mdi-navigation-refresh")
    )
])

export { sandbox, sandboxFab }
