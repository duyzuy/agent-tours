!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),t=tinymce.util.Tools.resolve("tinymce.dom.RangeUtils"),o=tinymce.util.Tools.resolve("tinymce.util.Tools");let a=e=>{let t=e.options.register;t("allow_html_in_named_anchor",{processor:"boolean",default:!1})},n=e=>e.options.get("allow_html_in_named_anchor"),r="a:not([href])",l=e=>!e,i=e=>{let t=e.getAttribute("id")||e.getAttribute("name");return t||""},d=e=>"a"===e.nodeName.toLowerCase(),s=e=>d(e)&&!e.getAttribute("href")&&""!==i(e),c=e=>s(e)&&!e.firstChild,m=e=>{let a=e.dom;t(a).walk(e.selection.getRng(),e=>{o.each(e,e=>{c(e)&&a.remove(e,!1)})})},u=e=>/^[A-Za-z][A-Za-z0-9\-:._]*$/.test(e),h=e=>e.dom.getParent(e.selection.getStart(),r),g=e=>{let t=h(e);return t?i(t):""},p=(e,t)=>{e.undoManager.transact(()=>{n(e)||e.selection.collapse(!0),e.selection.isCollapsed()?e.insertContent(e.dom.createHTML("a",{id:t})):(m(e),e.formatter.remove("namedAnchor",void 0,void 0,!0),e.formatter.apply("namedAnchor",{value:t}),e.addVisual())})},b=(e,t,o)=>{o.removeAttribute("name"),o.id=t,e.addVisual(),e.undoManager.add()},f=(e,t)=>{let o=h(e);o?b(e,t,o):p(e,t),e.focus()},y=(e,t)=>u(t)?(f(e,t),!0):(e.windowManager.alert("ID should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores."),!1),v=e=>{let t=g(e);e.windowManager.open({title:"Anchor",size:"normal",body:{type:"panel",items:[{name:"id",type:"input",label:"ID",placeholder:"example"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:{id:t},onSubmit:t=>{y(e,t.getData().id)&&t.close()}})},A=e=>{e.addCommand("mceAnchor",()=>{v(e)})},C=e=>l(e.attr("href"))&&!l(e.attr("id")||e.attr("name")),w=e=>C(e)&&!e.firstChild,_=e=>t=>{for(let o=0;o<t.length;o++){let a=t[o];w(a)&&a.attr("contenteditable",e)}},M=e=>{e.on("PreInit",()=>{e.parser.addNodeFilter("a",_("false")),e.serializer.addNodeFilter("a",_(null))})},T=e=>{e.formatter.register("namedAnchor",{inline:"a",selector:r,remove:"all",split:!0,deep:!0,attributes:{id:"%value"},onmatch:(e,t,o)=>s(e)})},k=e=>t=>{let o=()=>{t.setEnabled(e.selection.isEditable())};return e.on("NodeChange",o),o(),()=>{e.off("NodeChange",o)}},x=e=>{let t=()=>e.execCommand("mceAnchor");e.ui.registry.addToggleButton("anchor",{icon:"bookmark",tooltip:"Anchor",onAction:t,onSetup:t=>{let o=e.selection.selectorChangedWithUnbind("a:not([href])",t.setActive).unbind,a=k(e)(t);return()=>{o(),a()}}}),e.ui.registry.addMenuItem("anchor",{icon:"bookmark",text:"Anchor...",onAction:t,onSetup:k(e)})};e.add("anchor",e=>{a(e),M(e),A(e),x(e),e.on("PreInit",()=>{T(e)})})}();