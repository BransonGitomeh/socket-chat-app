// import navbar from "./navbar"
import m from "mithril"
import prop from "mithril/stream"
import {
  fetch
} from "./requestToolBox"
import settings from "../settings"



var Data = {
  navData: {
    fetch: function (argument) {
      fetch("org_info", `query test{
                  Organisations{
                    name
                  }
                }`)
        .then(res => Data.navData = res.data.Organisations.pop())
    }
  }
}

var header = {
  oninit: Data.navData.fetch,
  view() {
    return m("header.clearfix[data-ma-theme='blue'][id='header']", [
      m("ul.h-inner", [
        m("li.hi-trigger.ma-trigger[data-ma-action='sidebar-open'][data-ma-target='#sidebar']", {
          onclick(e) {
            var $this = $(this)
            var target = $this.data("ma-target"),
              backdrop = '<div id="sidebar_close" data-ma-action="sidebar-close" class="ma-backdrop" />';
            $("body")
              .addClass("sidebar-toggled"), $("#header, #header-alt, #main")
              .append(backdrop), $this.addClass("toggled"), $(target)
              .addClass("toggled");

            $('#sidebar_close')
              .on('click', () => {
                $("body")
                  .removeClass("sidebar-toggled"), $(".ma-backdrop")
                  .remove(), $(".sidebar, .ma-trigger")
                  .removeClass("toggled");
              })
          }
        }, [
          m(".line-wrap", [
            m(".line.top"),
            m(".line.center"),
            m(".line.bottom")
          ])
        ]),
        m("li.hi-logo.hidden-xs",
          m("a",
            Data.navData.name
          )
        ),
        m("li.pull-right",
          m("ul.hi-menu", [
            m("li[data-ma-action='search-open']",
              m("a", {
                  onclick(e) {
                    console.log("opening search")
                    $("#header")
                      .addClass("search-toggled"), $("#top-search-wrap input")
                      .focus();
                  }
                },
                m("i.him-icon.zmdi.zmdi-search")
              ),
            ),

            m("li.dropdown", [
              m("a[data-toggle='dropdown'][href='']", [
                m("i.him-icon.zmdi.zmdi-notifications"),
                m("i.him-counts",
                  "0"
                )
              ]),
              m(".dropdown-menu.dropdown-menu-lg.pull-right",
                m(".list-group", [
                  m(".lg-header", ),
                  m(".lg-body", [
                    m("a.list-group-item.media[href='']", [
                      m(".pull-left",
                        m("img.lgi-img[alt=''][src='img/demo/profile-pics/1.jpg']")
                      ),
                      m(".media-body", [
                        m(".lgi-heading",
                          "Notification bot"
                        ),
                        m("small.lgi-text",
                          "No notifications yet today"
                        )
                      ])
                    ])
                  ]),
                  m("a.view-more[href='']",
                    "View All"
                  )
                ])
              )
            ]),
            // m("li.dropdown", [
            //     m("a[data-toggle='dropdown'][href='']", [
            //         m("i.him-icon.zmdi.zmdi-notifications"),
            //         m("i.him-counts",
            //             "9"
            //         )
            //     ]),
            //     m(".dropdown-menu.dropdown-menu-lg.pull-right",
            //         m(".list-group.him-notification", [
            //             m(".lg-header",
            //                 m("ul.actions",
            //                     m("li.dropdown",
            //                         m("a[data-ma-action='clear-notification'][href='']",
            //                             m("i.zmdi.zmdi-check-all")
            //                         )
            //                     )
            //                 )
            //             ),
            //             m(".lg-body", [
            //                 m("a.list-group-item.media[href='']", [
            //                     m(".pull-left",
            //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/1.jpg']")
            //                     ),
            //                     m(".media-body", [
            //                         m(".lgi-heading",
            //                             "David Belle"
            //                         ),
            //                         m("small.lgi-text",
            //                             "Cum sociis natoque penatibus et magnis dis parturient montes"
            //                         )
            //                     ])
            //                 ]),
            //                 m("a.list-group-item.media[href='']", [
            //                     m(".pull-left",
            //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/2.jpg']")
            //                     ),
            //                     m(".media-body", [
            //                         m(".lgi-heading",
            //                             "Jonathan Morris"
            //                         ),
            //                         m("small.lgi-text",
            //                             "Nunc quis diam diamurabitur at dolor elementum, dictum turpis vel"
            //                         )
            //                     ])
            //                 ]),
            //                 m("a.list-group-item.media[href='']", [
            //                     m(".pull-left",
            //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/3.jpg']")
            //                     ),
            //                     m(".media-body", [
            //                         m(".lgi-heading",
            //                             "Fredric Mitchell Jr."
            //                         ),
            //                         m("small.lgi-text",
            //                             "Phasellus a ante et est ornare accumsan at vel magnauis blandit turpis at augue ultricies"
            //                         )
            //                     ])
            //                 ]),
            //                 m("a.list-group-item.media[href='']", [
            //                     m(".pull-left",
            //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/4.jpg']")
            //                     ),
            //                     m(".media-body", [
            //                         m(".lgi-heading",
            //                             "Glenn Jecobs"
            //                         ),
            //                         m("small.lgi-text",
            //                             "Ut vitae lacus sem ellentesque maximus, nunc sit amet varius dignissim, dui est consectetur neque"
            //                         )
            //                     ])
            //                 ]),
            //                 m("a.list-group-item.media[href='']", [
            //                     m(".pull-left",
            //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/4.jpg']")
            //                     ),
            //                     m(".media-body", [
            //                         m(".lgi-heading",
            //                             "Bill Phillips"
            //                         ),
            //                         m("small.lgi-text",
            //                             "Proin laoreet commodo eros id faucibus. Donec ligula quam, imperdiet vel ante placerat"
            //                         )
            //                     ])
            //                 ])
            //             ]),
            //             m("a.view-more[href='']",
            //                 "View Previous"
            //             )
            //         ])
            //     )
            // ]),
            // m("li.dropdown.hidden-xs", [
            //     m("a[data-toggle='dropdown'][href='']", [
            //         m("i.him-icon.zmdi.zmdi-view-list-alt"),
            //         m("i.him-counts",
            //             "2"
            //         )
            //     ]),
            //     m(".dropdown-menu.pull-right.dropdown-menu-lg",
            //         m(".list-group", [
            //             m(".lg-header", ),
            //             m(".lg-body", [
            //                 m(".list-group-item", [
            //                     m(".lgi-heading.m-b-5",
            //                         "HTML5 Validation Report"
            //                     ),
            //                     m(".progress",
            //                         m(".progress-bar[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='95'][role='progressbar']", { style: { "width": "95%" } },
            //                             m("span.sr-only",
            //                                 "95% Complete (success)"
            //                             )
            //                         )
            //                     )
            //                 ]),
            //                 m(".list-group-item", [
            //                     m(".lgi-heading.m-b-5",
            //                         "Google Chrome Extension"
            //                     ),
            //                     m(".progress",
            //                         m(".progress-bar.progress-bar-success[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='80'][role='progressbar']", { style: { "width": "80%" } },
            //                             m("span.sr-only",
            //                                 "80% Complete (success)"
            //                             )
            //                         )
            //                     )
            //                 ]),
            //                 m(".list-group-item", [
            //                     m(".lgi-heading.m-b-5",
            //                         "Social Intranet Projects"
            //                     ),
            //                     m(".progress",
            //                         m(".progress-bar.progress-bar-info[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='20'][role='progressbar']", { style: { "width": "20%" } },
            //                             m("span.sr-only",
            //                                 "20% Complete"
            //                             )
            //                         )
            //                     )
            //                 ]),
            //                 m(".list-group-item", [
            //                     m(".lgi-heading.m-b-5",
            //                         "Bootstrap Admin Template"
            //                     ),
            //                     m(".progress",
            //                         m(".progress-bar.progress-bar-warning[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='60'][role='progressbar']", { style: { "width": "60%" } },
            //                             m("span.sr-only",
            //                                 "60% Complete (warning)"
            //                             )
            //                         )
            //                     )
            //                 ]),
            //                 m(".list-group-item", [
            //                     m(".lgi-heading.m-b-5",
            //                         "Youtube Client App"
            //                     ),
            //                     m(".progress",
            //                         m(".progress-bar.progress-bar-danger[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='80'][role='progressbar']", { style: { "width": "80%" } },
            //                             m("span.sr-only",
            //                                 "80% Complete (danger)"
            //                             )
            //                         )
            //                     )
            //                 ])
            //             ]),
            //             m("a.view-more[href='']",
            //                 "View All"
            //             )
            //         ])
            //     )
            // ]),
            // m("li.dropdown", [
            //     m("a[data-toggle='dropdown'][href='']",
            //         m("i.him-icon.zmdi.zmdi-more-vert")
            //     ),
            //     m("ul.dropdown-menu.dm-icon.pull-right", [
            //         m("li.skin-switch.hidden-xs", [
            //             m("span.ss-skin.bgm-lightblue[data-ma-action='change-skin'][data-ma-skin='lightblue']"),
            //             m("span.ss-skin.bgm-bluegray[data-ma-action='change-skin'][data-ma-skin='bluegray']"),
            //             m("span.ss-skin.bgm-cyan[data-ma-action='change-skin'][data-ma-skin='cyan']"),
            //             m("span.ss-skin.bgm-teal[data-ma-action='change-skin'][data-ma-skin='teal']"),
            //             m("span.ss-skin.bgm-orange[data-ma-action='change-skin'][data-ma-skin='orange']"),
            //             m("span.ss-skin.bgm-blue[data-ma-action='change-skin'][data-sma-kin='blue']")
            //         ]),
            //         m("li.divider.hidden-xs"),
            //         m("li.hidden-xs",
            //             m("a[data-ma-action='fullscreen'][href='']", [
            //                 m("i.zmdi.zmdi-fullscreen"),
            //                 " Toggle Fullscreen"
            //             ])
            //         ),
            //         m("li",
            //             m("a[data-ma-action='clear-localstorage'][href='']", [
            //                 m("i.zmdi.zmdi-delete"),
            //                 " Clear Local Storage"
            //             ])
            //         ),
            //         m("li",
            //             m("a[href='']", [
            //                 m("i.zmdi.zmdi-face"),
            //                 " Privacy Settings"
            //             ])
            //         ),
            //         m("li",
            //             m("a[href='']", [
            //                 m("i.zmdi.zmdi-settings"),
            //                 " Other Settings"
            //             ])
            //         )
            //     ])
            // ]),
            // m("li.hidden-xs.ma-trigger[data-ma-action='sidebar-open'][data-ma-target='#chat']",
            //     m("a[href='']",
            //         m("i.him-icon.zmdi.zmdi-comment-alt-text")
            //     )
            // )
          ])
        )
      ]),
      m(".h-search-wrap",
        m(".hsw-inner", [
          m("i.hsw-close.zmdi.zmdi-arrow-left[data-ma-action='search-close']", {
            onclick() {
              $("#header")
                .removeClass("search-toggled");
            }
          }),
          m("input[type='text']")
        ])
      )
    ])
  }
}

export default header
