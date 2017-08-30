import m from "mithril"

var side_link = {
    view(vnode) {
        return m("li" + (vnode.attrs.href == m.route.get() ? ".active" : ""),
            m("a", {
                oncreate: m.route.link,
                href: vnode.attrs.href
            }, [
                m("i." + vnode.attrs.icon),
                vnode.attrs.text,
                vnode.attrs.badge ? m("span.badge." + vnode.attrs.badgeColor,
                    vnode.attrs.badge
                ) : ""
            ])
        )
    }
}

var side_drop = {
    oninit(vnode) {
        vnode.state.active = false
        vnode.state.activate = () => {
            vnode.state.active === false ? vnode.state.active = true : vnode.state.active = false
        }
        vnode.attrs.drops.map(drop => {
            if (drop.href == m.route.get()) {
                vnode.state.active = true
            }
        })
    },
    view(vnode) {
        return m("li.sub-menu" + (vnode.state.active === true ? ".toggled.active" : ""), {
            onclick: vnode.state.activate
        }, [
            m("a[data-ma-action='submenu-toggle']", {
                oncreate: m.route.link,
                href: m.route.get(),
            }, [
                m("i." + vnode.attrs.icon),
                vnode.attrs.text
            ]),
            m("ul", {
                style: {
                    display: (vnode.state.active === true ? "block" : "")
                }
            }, [
                vnode.attrs.drops.map(drop => {
                    drop.activate = vnode.state.activate
                    return m(side_link, drop)
                })
            ])
        ])
    }
}

export { side_link, side_drop }
