var footer = m("footer.page-footer",
    // m.trust(`<style>
    //     body {
    //         display: flex
    // ;
    //         min-height:100hv;
    //         flex-direction:column;
    //     }
    //     main {
    //         flex:1 0 auto;
    //     }
    // </style>`),
    m(".footer-copyright",
        m(".container", [
            m("span", [
                "Copyright © 2015 ",
                m("a.grey-text.text-lighten-4[href='http://themeforest.net/user/geekslabs/portfolio?ref=geekslabs'][target='_blank']",
                    "GeeksLabs"
                ),
                " All rights reserved."
            ]),
            m("span.right", [
                " Design and Developed by ",
                m("a.grey-text.text-lighten-4[href='http://geekslabs.com/']",
                    "GeeksLabs"
                )
            ])
        ])
    )
)

// var footer = m("footer.page-footer", [
//     m(".container",
//         m(".row", [
//             m(".col.l6.s12", [
//                 m("h5.white-text",
//                     "Footer Content"
//                 ),
//                 m("p.grey-text.text-lighten-4",
//                     "You can use rows and columns here to organize your footer content."
//                 )
//             ]),
//             m(".col.l4.offset-l2.s12", [
//                 m("h5.white-text",
//                     "Links"
//                 ),
//                 m("ul", [
//                     m("li",
//                         m("a.grey-text.text-lighten-3[href='#!']",
//                             "Link 1"
//                         )
//                     ),
//                     m("li",
//                         m("a.grey-text.text-lighten-3[href='#!']",
//                             "Link 2"
//                         )
//                     ),
//                     m("li",
//                         m("a.grey-text.text-lighten-3[href='#!']",
//                             "Link 3"
//                         )
//                     ),
//                     m("li",
//                         m("a.grey-text.text-lighten-3[href='#!']",
//                             "Link 4"
//                         )
//                     )
//                 ])
//             ])
//         ])
//     ),
//     m(".footer-copyright",
//         m(".container",
//             m("a.grey-text.text-lighten-4.right[href='#!']",
//                 "More Links"
//             )
//         )
//     )
// ])

export default footer
