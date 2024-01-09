!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager");let n=e=>n=>typeof n===e,a=n("boolean"),o=n("number"),t=e=>n=>n.options.get(e),i=e=>{let n=e.options.register;n("nonbreaking_force_tab",{processor:e=>a(e)?{value:e?3:0,valid:!0}:o(e)?{value:e,valid:!0}:{valid:!1,message:"Must be a boolean or number."},default:!1}),n("nonbreaking_wrap",{processor:"boolean",default:!0})},r=t("nonbreaking_force_tab"),s=t("nonbreaking_wrap"),l=(e,n)=>{let a="";for(let o=0;o<n;o++)a+=e;return a},u=e=>!!e.plugins.visualchars&&e.plugins.visualchars.isEnabled(),b=(e,n)=>{let a=s(e),o=a||e.plugins.visualchars?`<span class="${u(e)?"mce-nbsp-wrap mce-nbsp":"mce-nbsp-wrap"}" contenteditable="false">${l("&nbsp;",n)}</span>`:l("&nbsp;",n);e.undoManager.transact(()=>e.insertContent(o))},c=e=>{e.addCommand("mceNonBreaking",()=>{b(e,1)})};var g=tinymce.util.Tools.resolve("tinymce.util.VK");let p=e=>{let n=r(e);n>0&&e.on("keydown",a=>{a.keyCode!==g.TAB||a.isDefaultPrevented()||a.shiftKey||(a.preventDefault(),a.stopImmediatePropagation(),b(e,n))})},d=e=>n=>{let a=()=>{n.setEnabled(e.selection.isEditable())};return e.on("NodeChange",a),a(),()=>{e.off("NodeChange",a)}},m=e=>{let n=()=>e.execCommand("mceNonBreaking");e.ui.registry.addButton("nonbreaking",{icon:"non-breaking",tooltip:"Nonbreaking space",onAction:n,onSetup:d(e)}),e.ui.registry.addMenuItem("nonbreaking",{icon:"non-breaking",text:"Nonbreaking space",onAction:n,onSetup:d(e)})};e.add("nonbreaking",e=>{i(e),c(e),m(e),p(e)})}();