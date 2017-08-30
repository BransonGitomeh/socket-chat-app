import m from "mithril"
import { side_link, side_drop } from "./side_link"
import prop from "mithril/stream"
import { fetch } from "./requestToolBox"

var Data = {
    left_side_nav: {
        Admin: {
            name: prop("loading"),
            email: prop("loading"),
        },
        fetch: function() {
            fetch("left_side_nav", `query test{
                  Admin{
                    email
                  }
                }`).then(res => Data.left_side_nav.Admin = res.data.Admin)
        }
    }
}

function scrollBar(selector, theme, mousewheelaxis) {
    $(selector).mCustomScrollbar({
        theme: theme,
        scrollInertia: 100,
        axis: "yx",
        mouseWheel: { enable: !0, axis: mousewheelaxis, preventDefault: !0 }
    })
}

var left_side_nav = {
    oncreate: Data.left_side_nav.fetch,
    oninit(vnode) {
        vnode.state.active = false
    },
    view(vnode) {
        return m("aside.sidebar.c-overflow[id='sidebar']", [
            m(".s-profile", [
                m("a[data-ma-action='profile-menu-toggle'].toggled.active", {
                    href: m.route.get(),
                    oncreate: m.route.link,
                    onclick() {
                        vnode.state.active === true ? vnode.state.active = false : vnode.state.active = true
                    }
                }, [
                    m(".sp-pic",
                        m("img[alt=''][src='img/demo/profile-pics/1.jpg']")
                    ),
                    m(".sp-info", [m("i.zmdi.zmdi-caret-" + (vnode.state.active === true ? "down" : "up"))], Data.left_side_nav.Admin.email)
                ]),
                m("ul.main-menu", {
                    style: {
                        display: vnode.state.active === true ? "block" : ""
                    }
                }, [
                    m(side_link, {
                        icon: "zmdi.zmdi-account",
                        href: "/logout",
                        text: "View Profile"
                    }),
                    m(side_link, {
                        icon: "zmdi.zmdi-input-antenna",
                        href: "/logout",
                        text: "Privacy Settings"
                    }),
                    m(side_link, {
                        icon: "zmdi.zmdi-settings",
                        href: "/logout",
                        text: "Settings"
                    }),
                    m(side_link, {
                        icon: "zmdi.zmdi-time-restore",
                        href: "/logout",
                        text: "Logout"
                    })
                ])
            ]),
            m("ul.main-menu", [
                m(side_link, {
                    icon: "zmdi.zmdi-view-dashboard",
                    href: "/dashboard",
                    text: "Dashboard"
                }),
                m(side_link, {
                    icon: "zmdi.zmdi-accounts-list-alt",
                    href: "/contacts",
                    text: "Contacts"
                }),
                m(side_link, {
                    icon: "zmdi.zmdi-accounts",
                    href: "/groups",
                    text: "Groups"
                }),
                m(side_link, {
                    icon: "zmdi.zmdi-comment-more",
                    href: "/message/send",
                    text: "Send Message"
                }),
                m(side_drop, {
                    icon: "zmdi.zmdi-settings",
                    href: "/configurations",
                    text: "Configurations",
                    drops: [{
                        href: "/configurations/sender_id",
                        text: "Sender ID's"
                    }, {
                        href: "/configurations/org",
                        text: "About your company"
                    }]
                }),
                m(side_drop, {
                    icon: "zmdi.zmdi-home",
                    href: "/financials",
                    text: "Financials",
                    drops: [{
                        href: "/financials/wallet",
                        text: "My wallet"
                    }, {
                        href: "/financials/spending",
                        text: "My Spending"
                    }, {
                        href: "/financials/discounts",
                        text: "Discounts"
                    }]
                }),
                m(side_drop, {
                    icon: "zmdi.zmdi-device-hub",
                    href: "/technical",
                    text: "Technical",
                    drops: [{
                        href: "/sandbox/api",
                        text: "Integration Api"
                    }, {
                        href: "/financials/spending",
                        text: "Web hooks"
                    }, {
                        href: "/financials/discounts",
                        text: "Open ticket for Support"
                    }]
                })
            ])
        ])
    }
}

export default left_side_nav
