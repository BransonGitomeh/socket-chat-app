function formatTime(time) {
    var now = new Date();
    var then = time;
    return moment.duration(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).humanize()
}

const socket = io("/");

const app = {
    oninit(vnode) {
        socket.on('newMessage', function (data) {
            console.log(data);
            data.time = new Date()
            vnode.state.messages.push(data)
            m.redraw()
        });
        vnode.state.messages = [{
            frm: "you",
            time: new Date(),
            message: "hey , get this conversation going!!!"
        }]
        vnode.state.newMessage = ""
         vnode.state.name = ""
    },
    view(vnode) {
        return m("app", [
            m("a", {
                href: `/`,
                oncreate: m.route.link,
                onupdate: m.route.link
            }, "back to list"),
            m("input", {
            	placeholder:"name",
                oninput: e => vnode.state.name = e.target.value,
                value: vnode.state.name
            }),
            m(".messageboard", [
                vnode.state.messages.map(mes => m("li", mes.frm + "---" + mes.message + "----" + formatTime(mes.time) + " ago"))
            ]),
            m("form", {
                onsubmit(e) {
                    e.preventDefault()
                    vnode.state.messages.push({
                        frm: "you",
                        time: new Date(),
                        message: vnode.state.newMessage
                    })
                    socket.emit('sendMessage', {
                    	frm:vnode.state.name,
                        target: m.route.param("socket_id"),
                        time: new Date(),
                        message: vnode.state.newMessage
                    });
                    vnode.state.newMessage = ""
                    m.redraw()
                }
            }, [
                m("input", {
                    oninput: e => vnode.state.newMessage = e.target.value,
                    value: vnode.state.newMessage
                }),
                m("button", "Send message")
            ])

        ])
    }
}

const list = {
    oninit(vnode) {
        vnode.state.sockets = []
        socket.emit('giveMeSockets')
        socket.on('giveYouSockets', function (sockets) {
            vnode.state.sockets = sockets
            m.redraw()
        })
        setInterval(() => {
            socket.emit('giveMeSockets')
            socket.on('giveYouSockets', function (sockets) {
                vnode.state.sockets = sockets
                m.redraw()
            })
        }, 3000)
    },
    view(vnode) {
        return m("app", [
            m("h3", "hey this guys are available to chat with"),
            vnode.state.sockets.map(socket => m(".item", [
                m("a", {
                    href: `/chat/${socket}`,
                    oncreate: m.route.link,
                    onupdate: m.route.link
                }, socket)
            ]))
        ])
    }
}

m.route(document.body, "/", {
    "/": list,
    "/chat/:socket_id": app
})
