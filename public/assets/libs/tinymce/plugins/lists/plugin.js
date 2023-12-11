!function(){"use strict";var e,t=tinymce.util.Tools.resolve("tinymce.PluginManager");let hasProto=(e,t,i)=>{var n;return!!i(e,t.prototype)||(null===(n=e.constructor)||void 0===n?void 0:n.name)===t.name},typeOf=e=>{let t=typeof e;return null===e?"null":"object"===t&&Array.isArray(e)?"array":"object"===t&&hasProto(e,String,(e,t)=>t.isPrototypeOf(e))?"string":t},isType$1=e=>t=>typeOf(t)===e,isSimpleType=e=>t=>typeof t===e,i=isType$1("string"),n=isType$1("object"),s=isType$1("array"),o=isSimpleType("boolean"),isNullable=e=>null==e,isNonNullable=e=>!isNullable(e),r=isSimpleType("function"),l=isSimpleType("number"),noop=()=>{},tripleEquals=(e,t)=>e===t,not=e=>t=>!e(t),never=()=>!1;let Optional=class Optional{constructor(e,t){this.tag=e,this.value=t}static some(e){return new Optional(!0,e)}static none(){return Optional.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?Optional.some(e(this.value)):Optional.none()}bind(e){return this.tag?e(this.value):Optional.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:Optional.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw Error(null!=e?e:"Called getOrDie on None")}static from(e){return isNonNullable(e)?Optional.some(e):Optional.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}};Optional.singletonNone=new Optional(!1);let a=Array.prototype.slice,d=Array.prototype.indexOf,m=Array.prototype.push,rawIndexOf=(e,t)=>d.call(e,t),contains$1=(e,t)=>rawIndexOf(e,t)>-1,exists=(e,t)=>{for(let i=0,n=e.length;i<n;i++){let n=e[i];if(t(n,i))return!0}return!1},map=(e,t)=>{let i=e.length,n=Array(i);for(let s=0;s<i;s++){let i=e[s];n[s]=t(i,s)}return n},each$1=(e,t)=>{for(let i=0,n=e.length;i<n;i++){let n=e[i];t(n,i)}},filter$1=(e,t)=>{let i=[];for(let n=0,s=e.length;n<s;n++){let s=e[n];t(s,n)&&i.push(s)}return i},groupBy=(e,t)=>{if(0===e.length)return[];{let i=t(e[0]),n=[],s=[];for(let o=0,r=e.length;o<r;o++){let r=e[o],l=t(r);l!==i&&(n.push(s),s=[]),i=l,s.push(r)}return 0!==s.length&&n.push(s),n}},foldl=(e,t,i)=>(each$1(e,(e,n)=>{i=t(i,e,n)}),i),findUntil=(e,t,i)=>{for(let n=0,s=e.length;n<s;n++){let s=e[n];if(t(s,n))return Optional.some(s);if(i(s,n))break}return Optional.none()},find=(e,t)=>findUntil(e,t,never),flatten=e=>{let t=[];for(let i=0,n=e.length;i<n;++i){if(!s(e[i]))throw Error("Arr.flatten item "+i+" was not an array, input: "+e);m.apply(t,e[i])}return t},bind=(e,t)=>flatten(map(e,t)),reverse=e=>{let t=a.call(e,0);return t.reverse(),t},get$1=(e,t)=>t>=0&&t<e.length?Optional.some(e[t]):Optional.none(),head=e=>get$1(e,0),last=e=>get$1(e,e.length-1),unique=(e,t)=>{let i=[],n=r(t)?e=>exists(i,i=>t(i,e)):e=>contains$1(i,e);for(let t=0,s=e.length;t<s;t++){let s=e[t];n(s)||i.push(s)}return i},is$2=(e,t,i=tripleEquals)=>e.exists(e=>i(e,t)),equals=(e,t,i=tripleEquals)=>lift2(e,t,i).getOr(e.isNone()&&t.isNone()),lift2=(e,t,i)=>e.isSome()&&t.isSome()?Optional.some(i(e.getOrDie(),t.getOrDie())):Optional.none(),fromDom$1=e=>{if(null==e)throw Error("Node cannot be null or undefined");return{dom:e}},p={fromHtml:(e,t)=>{let i=(t||document).createElement("div");if(i.innerHTML=e,!i.hasChildNodes()||i.childNodes.length>1){let t="HTML does not have a single root node";throw console.error(t,e),Error(t)}return fromDom$1(i.childNodes[0])},fromTag:(e,t)=>{let i=(t||document).createElement(e);return fromDom$1(i)},fromText:(e,t)=>{let i=(t||document).createTextNode(e);return fromDom$1(i)},fromDom:fromDom$1,fromPoint:(e,t,i)=>Optional.from(e.dom.elementFromPoint(t,i)).map(fromDom$1)},eq=(e,t)=>e.dom===t.dom,contains=(e,t)=>{let i=e.dom,n=t.dom;return i!==n&&i.contains(n)},is=(e,t)=>{let i=e.dom;if(1!==i.nodeType)return!1;if(void 0!==i.matches)return i.matches(t);if(void 0!==i.msMatchesSelector)return i.msMatchesSelector(t);if(void 0!==i.webkitMatchesSelector)return i.webkitMatchesSelector(t);if(void 0!==i.mozMatchesSelector)return i.mozMatchesSelector(t);throw Error("Browser lacks native selectors")};var ClosestOrAncestor=(e,t,i,n,s)=>e(i,n)?Optional.some(i):r(s)&&s(i)?Optional.none():t(i,n,s);"undefined"!=typeof window?window:Function("return this;")();let name=e=>{let t=e.dom.nodeName;return t.toLowerCase()},type=e=>e.dom.nodeType,isComment=e=>8===type(e)||"#comment"===name(e),isElement$1=e=>1===type(e),isTag=e=>t=>isElement$1(t)&&name(t)===e,parent=e=>Optional.from(e.dom.parentNode).map(p.fromDom),parentElement=e=>Optional.from(e.dom.parentElement).map(p.fromDom),nextSibling=e=>Optional.from(e.dom.nextSibling).map(p.fromDom),children=e=>map(e.dom.childNodes,p.fromDom),child=(e,t)=>{let i=e.dom.childNodes;return Optional.from(i[t]).map(p.fromDom)},firstChild=e=>child(e,0),lastChild=e=>child(e,e.dom.childNodes.length-1),ancestor$2=(e,t,i)=>{let n=e.dom,s=r(i)?i:never;for(;n.parentNode;){n=n.parentNode;let e=p.fromDom(n);if(t(e))return Optional.some(e);if(s(e))break}return Optional.none()},closest=(e,t,i)=>ClosestOrAncestor((e,t)=>t(e),ancestor$2,e,t,i),before$1=(e,t)=>{let i=parent(e);i.each(i=>{i.dom.insertBefore(t.dom,e.dom)})},after=(e,t)=>{let i=nextSibling(e);i.fold(()=>{let i=parent(e);i.each(e=>{append$1(e,t)})},e=>{before$1(e,t)})},prepend=(e,t)=>{let i=firstChild(e);i.fold(()=>{append$1(e,t)},i=>{e.dom.insertBefore(t.dom,i.dom)})},append$1=(e,t)=>{e.dom.appendChild(t.dom)},before=(e,t)=>{each$1(t,t=>{before$1(e,t)})},append=(e,t)=>{each$1(t,t=>{append$1(e,t)})},empty=e=>{e.dom.textContent="",each$1(children(e),e=>{remove(e)})},remove=e=>{let t=e.dom;null!==t.parentNode&&t.parentNode.removeChild(t)};var c=tinymce.util.Tools.resolve("tinymce.dom.RangeUtils"),u=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),g=tinymce.util.Tools.resolve("tinymce.util.VK");let fromDom=e=>map(e,p.fromDom),h=Object.keys,each=(e,t)=>{let i=h(e);for(let n=0,s=i.length;n<s;n++){let s=i[n],o=e[s];t(o,s)}},objAcc=e=>(t,i)=>{e[i]=t},internalFilter=(e,t,i,n)=>{each(e,(e,s)=>{(t(e,s)?i:n)(e,s)})},filter=(e,t)=>{let i={};return internalFilter(e,t,objAcc(i),noop),i},rawSet=(e,t,n)=>{if(i(n)||o(n)||l(n))e.setAttribute(t,n+"");else throw console.error("Invalid call to Attribute.set. Key ",t,":: Value ",n,":: Element ",e),Error("Attribute value was not simple")},setAll=(e,t)=>{let i=e.dom;each(t,(e,t)=>{rawSet(i,t,e)})},clone$1=e=>foldl(e.dom.attributes,(e,t)=>(e[t.name]=t.value,e),{}),clone=(e,t)=>p.fromDom(e.dom.cloneNode(t)),deep=e=>clone(e,!0),shallowAs=(e,t)=>{let i=p.fromTag(t),n=clone$1(e);return setAll(i,n),i},mutate=(e,t)=>{let i=shallowAs(e,t);after(e,i);let n=children(e);return append(i,n),remove(e),i};var f=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),L=tinymce.util.Tools.resolve("tinymce.util.Tools");let matchNodeName=e=>t=>isNonNullable(t)&&t.nodeName.toLowerCase()===e,matchNodeNames=e=>t=>isNonNullable(t)&&e.test(t.nodeName),isTextNode$1=e=>isNonNullable(e)&&3===e.nodeType,isElement=e=>isNonNullable(e)&&1===e.nodeType,y=matchNodeNames(/^(OL|UL|DL)$/),S=matchNodeNames(/^(OL|UL)$/),N=matchNodeName("ol"),C=matchNodeNames(/^(LI|DT|DD)$/),b=matchNodeNames(/^(DT|DD)$/),E=matchNodeNames(/^(TH|TD)$/),v=matchNodeName("br"),isFirstChild=e=>{var t;return(null===(t=e.parentNode)||void 0===t?void 0:t.firstChild)===e},isTextBlock=(e,t)=>isNonNullable(t)&&t.nodeName in e.schema.getTextBlockElements(),isBlock=(e,t)=>isNonNullable(e)&&e.nodeName in t,isVoid=(e,t)=>isNonNullable(t)&&t.nodeName in e.schema.getVoidElements(),isBogusBr=(e,t)=>!!v(t)&&e.isBlock(t.nextSibling)&&!v(t.previousSibling),isEmpty$2=(e,t,i)=>{let n=e.isEmpty(t);return(!i||!(e.select("span[data-mce-type=bookmark]",t).length>0))&&n},isChildOfBody=(e,t)=>e.isChildOf(t,e.getRoot()),option=e=>t=>t.options.get(e),register$3=e=>{let t=e.options.register;t("lists_indent_on_tab",{processor:"boolean",default:!0})},k=option("lists_indent_on_tab"),T=option("forced_root_block"),$=option("forced_root_block_attrs"),createTextBlock=(e,t)=>{let i,n;let s=e.dom,o=e.schema.getBlockElements(),r=s.createFragment(),l=T(e),a=$(e),d=!1;for(n=s.create(l,a),isBlock(t.firstChild,o)||r.appendChild(n);i=t.firstChild;){let e=i.nodeName;d||"SPAN"===e&&"bookmark"===i.getAttribute("data-mce-type")||(d=!0),isBlock(i,o)?(r.appendChild(i),n=null):(n||(n=s.create(l,a),r.appendChild(n)),n.appendChild(i))}return!d&&n&&n.appendChild(s.create("br",{"data-mce-bogus":"1"})),r},O=f.DOM,splitList=(e,t,i)=>{let n=O.select('span[data-mce-type="bookmark"]',t),s=createTextBlock(e,i),o=O.createRng();o.setStartAfter(i),o.setEndAfter(t);let r=o.extractContents();for(let t=r.firstChild;t;t=t.firstChild)if("LI"===t.nodeName&&e.dom.isEmpty(t)){O.remove(t);break}e.dom.isEmpty(r)||O.insertAfter(r,t),O.insertAfter(s,t);let l=i.parentElement;l&&isEmpty$2(e.dom,l)&&(e=>{let t=e.parentNode;t&&L.each(n,e=>{t.insertBefore(e,i.parentNode)}),O.remove(e)})(l),O.remove(i),isEmpty$2(e.dom,t)&&O.remove(t)},D=isTag("dd"),B=isTag("dt"),outdentDlItem=(e,t)=>{D(t)?mutate(t,"dt"):B(t)&&parentElement(t).each(i=>splitList(e,i.dom,t.dom))},indentDlItem=e=>{B(e)&&mutate(e,"dd")},dlIndentation=(e,t,i)=>{"Indent"===t?each$1(i,indentDlItem):each$1(i,t=>outdentDlItem(e,t))},getNormalizedPoint=(e,t)=>{if(isTextNode$1(e))return{container:e,offset:t};let i=c.getNode(e,t);return isTextNode$1(i)?{container:i,offset:t>=e.childNodes.length?i.data.length:0}:i.previousSibling&&isTextNode$1(i.previousSibling)?{container:i.previousSibling,offset:i.previousSibling.data.length}:i.nextSibling&&isTextNode$1(i.nextSibling)?{container:i.nextSibling,offset:0}:{container:e,offset:t}},normalizeRange=e=>{let t=e.cloneRange(),i=getNormalizedPoint(e.startContainer,e.startOffset);t.setStart(i.container,i.offset);let n=getNormalizedPoint(e.endContainer,e.endOffset);return t.setEnd(n.container,n.offset),t},I=["OL","UL","DL"],A=I.join(","),getParentList=(e,t)=>{let i=t||e.selection.getStart(!0);return e.dom.getParent(i,A,getClosestListHost(e,i))},isParentListSelected=(e,t)=>isNonNullable(e)&&1===t.length&&t[0]===e,findSubLists=e=>filter$1(e.querySelectorAll(A),y),getSelectedSubLists=e=>{let t=getParentList(e),i=e.selection.getSelectedBlocks();return isParentListSelected(t,i)?findSubLists(t):filter$1(i,e=>y(e)&&t!==e)},findParentListItemsNodes=(e,t)=>{let i=L.map(t,t=>{let i=e.dom.getParent(t,"li,dd,dt",getClosestListHost(e,t));return i||t});return unique(i)},getSelectedListItems=e=>{let t=e.selection.getSelectedBlocks();return filter$1(findParentListItemsNodes(e,t),C)},getSelectedDlItems=e=>filter$1(getSelectedListItems(e),b),getClosestEditingHost=(e,t)=>{let i=e.dom.getParents(t,"TD,TH");return i.length>0?i[0]:e.getBody()},isListHost=(e,t)=>!y(t)&&!C(t)&&exists(I,i=>e.isValidChild(t.nodeName,i)),getClosestListHost=(e,t)=>{let i=e.dom.getParents(t,e.dom.isBlock),n=find(i,t=>isListHost(e.schema,t));return n.getOr(e.getBody())},isListInsideAnLiWithFirstAndLastNotListElement=e=>parent(e).exists(e=>C(e.dom)&&firstChild(e).exists(e=>!y(e.dom))&&lastChild(e).exists(e=>!y(e.dom))),findLastParentListNode=(e,t)=>{let i=e.dom.getParents(t,"ol,ul",getClosestListHost(e,t));return last(i)},getSelectedLists=e=>{let t=findLastParentListNode(e,e.selection.getStart()),i=filter$1(e.selection.getSelectedBlocks(),S);return t.toArray().concat(i)},getParentLists=e=>{let t=e.selection.getStart();return e.dom.getParents(t,"ol,ul",getClosestListHost(e,t))},getSelectedListRoots=e=>{let t=getSelectedLists(e),i=getParentLists(e);return find(i,e=>isListInsideAnLiWithFirstAndLastNotListElement(p.fromDom(e))).fold(()=>getUniqueListRoots(e,t),e=>[e])},getUniqueListRoots=(e,t)=>{let i=map(t,t=>findLastParentListNode(e,t).getOr(t));return unique(i)},isCustomList=e=>/\btox\-/.test(e.className),inList=(e,t)=>findUntil(e,y,E).exists(e=>e.nodeName===t&&!isCustomList(e)),isWithinNonEditable=(e,t)=>null!==t&&!e.dom.isEditable(t),selectionIsWithinNonEditableList=e=>{let t=getParentList(e);return isWithinNonEditable(e,t)},isWithinNonEditableList=(e,t)=>{let i=e.dom.getParent(t,"ol,ul,dl");return isWithinNonEditable(e,i)},setNodeChangeHandler=(e,t)=>{let i=e.selection.getNode();return t({parents:e.dom.getParents(i),element:i}),e.on("NodeChange",t),()=>e.off("NodeChange",t)},fromElements=(e,t)=>{let i=(t||document).createDocumentFragment();return each$1(e,e=>{i.appendChild(e.dom)}),p.fromDom(i)},fireListEvent=(e,t,i)=>e.dispatch("ListMutation",{action:t,element:i}),x=(e=/^\s+|\s+$/g,t=>t.replace(e,"")),isNotEmpty=e=>e.length>0,isEmpty$1=e=>!isNotEmpty(e),isSupported=e=>void 0!==e.style&&r(e.style.getPropertyValue),internalSet=(e,t,n)=>{if(!i(n))throw console.error("Invalid call to CSS.set. Property ",t,":: Value ",n,":: Element ",e),Error("CSS value must be a string: "+n);isSupported(e)&&e.style.setProperty(t,n)},set=(e,t,i)=>{let n=e.dom;internalSet(n,t,i)},isList=e=>is(e,"OL,UL"),hasFirstChildList=e=>firstChild(e).exists(isList),hasLastChildList=e=>lastChild(e).exists(isList),isEntryList=e=>"listAttributes"in e,isEntryNoList=e=>"isInPreviousLi"in e,isEntryComment=e=>"isComment"in e,isIndented=e=>e.depth>0,isSelected=e=>e.isSelected,cloneItemContent=e=>{let t=children(e),i=hasLastChildList(e)?t.slice(0,-1):t;return map(i,deep)},createEntry=(e,t,i)=>parent(e).filter(isElement$1).map(n=>({depth:t,dirty:!1,isSelected:i,content:cloneItemContent(e),itemAttributes:clone$1(e),listAttributes:clone$1(n),listType:name(n),isInPreviousLi:!1})),joinSegment=(e,t)=>{append$1(e.item,t.list)},joinSegments=e=>{for(let t=1;t<e.length;t++)joinSegment(e[t-1],e[t])},appendSegments=(e,t)=>{lift2(last(e),head(t),joinSegment)},createSegment=(e,t)=>{let i={list:p.fromTag(t,e),item:p.fromTag("li",e)};return append$1(i.list,i.item),i},createSegments=(e,t,i)=>{let n=[];for(let s=0;s<i;s++)n.push(createSegment(e,t.listType));return n},populateSegments=(e,t)=>{for(let t=0;t<e.length-1;t++)set(e[t].item,"list-style-type","none");last(e).each(e=>{setAll(e.list,t.listAttributes),setAll(e.item,t.itemAttributes),append(e.item,t.content)})},normalizeSegment=(e,t)=>{name(e.list)!==t.listType&&(e.list=mutate(e.list,t.listType)),setAll(e.list,t.listAttributes)},createItem=(e,t,i)=>{let n=p.fromTag("li",e);return setAll(n,t),append(n,i),n},appendItem=(e,t)=>{append$1(e.list,t),e.item=t},createInPreviousLiItem=(e,t,i,n)=>{let s=p.fromTag(n,e);return setAll(s,t),append(s,i),s},writeShallow=(e,t,i)=>{let n=t.slice(0,i.depth);return last(n).each(t=>{if(isEntryList(i)){let n=createItem(e,i.itemAttributes,i.content);appendItem(t,n),normalizeSegment(t,i)}else if(isEntryNoList(i)){if(i.isInPreviousLi){let n=createInPreviousLiItem(e,i.attributes,i.content,i.type);append$1(t.item,n)}}else{let e=p.fromHtml(`<!--${i.content}-->`);append$1(t.list,e)}}),n},writeDeep=(e,t,i)=>{let n=createSegments(e,i,i.depth-t.length);return joinSegments(n),populateSegments(n,i),appendSegments(t,n),t.concat(n)},composeList=(e,t)=>{let i=Optional.none(),n=foldl(t,(t,n,s)=>isEntryList(n)?n.depth>t.length?writeDeep(e,t,n):writeShallow(e,t,n):0===s&&isEntryComment(n)?(i=Optional.some(n),t):writeShallow(e,t,n),[]);return i.each(e=>{let t=p.fromHtml(`<!--${e.content}-->`);head(n).each(e=>{prepend(e.list,t)})}),head(n).map(e=>e.list)},indentEntry=(e,t)=>{switch(e){case"Indent":t.depth++;break;case"Outdent":t.depth--;break;case"Flatten":t.depth=0}t.dirty=!0},cloneListProperties=(e,t)=>{isEntryList(e)&&isEntryList(t)&&(e.listType=t.listType,e.listAttributes={...t.listAttributes})},cleanListProperties=e=>{e.listAttributes=filter(e.listAttributes,(e,t)=>"start"!==t)},closestSiblingEntry=(e,t)=>{let i=e[t].depth,matches=e=>e.depth===i&&!e.dirty,until=e=>e.depth<i;return findUntil(reverse(e.slice(0,t)),matches,until).orThunk(()=>findUntil(e.slice(t+1),matches,until))},normalizeEntries=e=>(each$1(e,(t,i)=>{closestSiblingEntry(e,i).fold(()=>{t.dirty&&isEntryList(t)&&cleanListProperties(t)},e=>cloneListProperties(t,e))}),e),Cell=e=>{let t=e;return{get:()=>t,set:e=>{t=e}}},entryToEntryNoList=(e,t,i)=>isEntryList(e)?{depth:e.depth,dirty:e.dirty,content:e.content,isSelected:e.isSelected,type:t,attributes:e.itemAttributes,isInPreviousLi:i}:e,parseSingleItem=(e,t,i,n)=>{var s;if(isComment(n))return[{depth:e+1,content:null!==(s=n.dom.nodeValue)&&void 0!==s?s:"",dirty:!1,isSelected:!1,isComment:!0}];t.each(e=>{eq(e.start,n)&&i.set(!0)});let o=createEntry(n,e,i.get());t.each(e=>{eq(e.end,n)&&i.set(!1)});let r=lastChild(n).filter(isList).map(n=>parseList(e,t,i,n)).getOr([]);return o.toArray().concat(r)},parseItem=(e,t,i,n)=>firstChild(n).filter(isList).fold(()=>parseSingleItem(e,t,i,n),s=>{let o=foldl(children(n),(n,s,o)=>{if(0===o)return n;{let o=parseSingleItem(e,t,i,s).map(e=>entryToEntryNoList(e,s.dom.nodeName.toLowerCase(),!0));return n.concat(o)}},[]);return parseList(e,t,i,s).concat(o)}),parseList=(e,t,i,n)=>bind(children(n),n=>{let s=isList(n)?parseList:parseItem;return s(e+1,t,i,n)}),parseLists=(e,t)=>{let i=Cell(!1);return map(e,e=>({sourceList:e,entries:parseList(0,t,i,e)}))},outdentedComposer=(e,t)=>{let i=normalizeEntries(t);return map(i,t=>{let i=isEntryComment(t)?fromElements([p.fromHtml(`<!--${t.content}-->`)]):fromElements(t.content);return p.fromDom(createTextBlock(e,i.dom))})},indentedComposer=(e,t)=>{let i=normalizeEntries(t);return composeList(e.contentDocument,i).toArray()},composeEntries=(e,t)=>bind(groupBy(t,isIndented),t=>{let i=head(t).exists(isIndented);return i?indentedComposer(e,t):outdentedComposer(e,t)}),indentSelectedEntries=(e,t)=>{each$1(filter$1(e,isSelected),e=>indentEntry(t,e))},getItemSelection=e=>{let t=map(getSelectedListItems(e),p.fromDom);return lift2(find(t,not(hasFirstChildList)),find(reverse(t),not(hasFirstChildList)),(e,t)=>({start:e,end:t}))},listIndentation=(e,t,i)=>{let n=parseLists(t,getItemSelection(e));each$1(n,t=>{indentSelectedEntries(t.entries,i);let n=composeEntries(e,t.entries);each$1(n,t=>{fireListEvent(e,"Indent"===i?"IndentList":"OutdentList",t.dom)}),before(t.sourceList,n),remove(t.sourceList)})},selectionIndentation=(e,t)=>{let i=fromDom(getSelectedListRoots(e)),n=fromDom(getSelectedDlItems(e)),s=!1;if(i.length||n.length){let o=e.selection.getBookmark();listIndentation(e,i,t),dlIndentation(e,t,n),e.selection.moveToBookmark(o),e.selection.setRng(normalizeRange(e.selection.getRng())),e.nodeChanged(),s=!0}return s},handleIndentation=(e,t)=>!selectionIsWithinNonEditableList(e)&&selectionIndentation(e,t),indentListSelection=e=>handleIndentation(e,"Indent"),outdentListSelection=e=>handleIndentation(e,"Outdent"),flattenListSelection=e=>handleIndentation(e,"Flatten"),isZwsp=e=>"\uFEFF"===e,ancestor$1=(e,t,i)=>ancestor$2(e,t,i).isSome(),ancestor=(e,t)=>ancestor$1(e,function(e,...t){return(...i)=>{let n=t.concat(i);return e.apply(null,n)}}(eq,t));var P=tinymce.util.Tools.resolve("tinymce.dom.BookmarkManager");let w=f.DOM,createBookmark=e=>{let t={},setupEndPoint=i=>{let n=e[i?"startContainer":"endContainer"],s=e[i?"startOffset":"endOffset"];if(isElement(n)){let e=w.create("span",{"data-mce-type":"bookmark"});n.hasChildNodes()?(s=Math.min(s,n.childNodes.length-1),i?n.insertBefore(e,n.childNodes[s]):w.insertAfter(e,n.childNodes[s])):n.appendChild(e),n=e,s=0}t[i?"startContainer":"endContainer"]=n,t[i?"startOffset":"endOffset"]=s};return setupEndPoint(!0),e.collapsed||setupEndPoint(),t},resolveBookmark=e=>{let restoreEndPoint=t=>{let i=e[t?"startContainer":"endContainer"],n=e[t?"startOffset":"endOffset"];if(i){if(isElement(i)&&i.parentNode){let e=i;n=(e=>{var t;let i=null===(t=e.parentNode)||void 0===t?void 0:t.firstChild,n=0;for(;i;){if(i===e)return n;(!isElement(i)||"bookmark"!==i.getAttribute("data-mce-type"))&&n++,i=i.nextSibling}return -1})(i),i=i.parentNode,w.remove(e),!i.hasChildNodes()&&w.isBlock(i)&&i.appendChild(w.create("br"))}e[t?"startContainer":"endContainer"]=i,e[t?"startOffset":"endOffset"]=n}};restoreEndPoint(!0),restoreEndPoint();let t=w.createRng();return t.setStart(e.startContainer,e.startOffset),e.endContainer&&t.setEnd(e.endContainer,e.endOffset),normalizeRange(t)},listToggleActionFromListName=e=>{switch(e){case"UL":return"ToggleUlList";case"OL":return"ToggleOlList";case"DL":return"ToggleDLList"}},updateListStyle=(e,t,i)=>{let n=i["list-style-type"]?i["list-style-type"]:null;e.setStyle(t,"list-style-type",n)},setAttribs=(e,t)=>{L.each(t,(t,i)=>{e.setAttribute(i,t)})},updateListAttrs=(e,t,i)=>{setAttribs(t,i["list-attributes"]),L.each(e.select("li",t),e=>{setAttribs(e,i["list-item-attributes"])})},updateListWithDetails=(e,t,i)=>{updateListStyle(e,t,i),updateListAttrs(e,t,i)},removeStyles=(e,t,i)=>{L.each(i,i=>e.setStyle(t,i,""))},isInline=(e,t)=>isNonNullable(t)&&!isBlock(t,e.schema.getBlockElements()),getEndPointNode=(e,t,i,n)=>{let s=t[i?"startContainer":"endContainer"],o=t[i?"startOffset":"endOffset"];isElement(s)&&(s=s.childNodes[Math.min(o,s.childNodes.length-1)]||s),!i&&v(s.nextSibling)&&(s=s.nextSibling);let findBlockAncestor=t=>{for(;!e.dom.isBlock(t)&&t.parentNode&&n!==t;)t=t.parentNode;return t},findBetterContainer=(t,i)=>{var n;let s;let o=new u(t,findBlockAncestor(t)),r=i?"next":"prev";for(;s=o[r]();)if(!(isVoid(e,s)||isZwsp(s.textContent)||(null===(n=s.textContent)||void 0===n?void 0:n.length)===0))return Optional.some(s);return Optional.none()};if(i&&isTextNode$1(s)){if(isZwsp(s.textContent))s=findBetterContainer(s,!1).getOr(s);else for(null!==s.parentNode&&isInline(e,s.parentNode)&&(s=s.parentNode);null!==s.previousSibling&&(isInline(e,s.previousSibling)||isTextNode$1(s.previousSibling));)s=s.previousSibling}if(!i&&isTextNode$1(s)){if(isZwsp(s.textContent))s=findBetterContainer(s,!0).getOr(s);else for(null!==s.parentNode&&isInline(e,s.parentNode)&&(s=s.parentNode);null!==s.nextSibling&&(isInline(e,s.nextSibling)||isTextNode$1(s.nextSibling));)s=s.nextSibling}for(;s.parentNode!==n;){let t=s.parentNode;if(isTextBlock(e,s)||/^(TD|TH)$/.test(t.nodeName))break;s=t}return s},getSelectedTextBlocks=(e,t,i)=>{let n;let s=[],o=e.dom,r=getEndPointNode(e,t,!0,i),l=getEndPointNode(e,t,!1,i),a=[];for(let e=r;e&&(a.push(e),e!==l);e=e.nextSibling);return L.each(a,t=>{var r;if(isTextBlock(e,t)){s.push(t),n=null;return}if(o.isBlock(t)||v(t)){v(t)&&o.remove(t),n=null;return}let l=t.nextSibling;if(P.isBookmarkNode(t)&&(y(l)||isTextBlock(e,l)||!l&&t.parentNode===i)){n=null;return}n||(n=o.create("p"),null===(r=t.parentNode)||void 0===r||r.insertBefore(n,t),s.push(n)),n.appendChild(t)}),s},hasCompatibleStyle=(e,t,i)=>{let n=e.getStyle(t,"list-style-type"),s=i?i["list-style-type"]:"";return n===(s=null===s?"":s)},getRootSearchStart=(e,t)=>{let i=e.selection.getStart(!0),n=getEndPointNode(e,t,!0,e.getBody());return ancestor(p.fromDom(n),p.fromDom(t.commonAncestorContainer))?t.commonAncestorContainer:i},applyList=(e,t,i)=>{let n=e.selection.getRng(),s="LI",o=getClosestListHost(e,getRootSearchStart(e,n)),r=e.dom;if("false"===r.getContentEditable(e.selection.getNode()))return;"DL"===(t=t.toUpperCase())&&(s="DT");let l=createBookmark(n),a=filter$1(getSelectedTextBlocks(e,n,o),e.dom.isEditable);L.each(a,n=>{let o;let l=n.previousSibling,a=n.parentNode;C(a)||(l&&y(l)&&l.nodeName===t&&hasCompatibleStyle(r,l,i)?(o=l,n=r.rename(n,s),l.appendChild(n)):(o=r.create(t),a.insertBefore(o,n),o.appendChild(n),n=r.rename(n,s)),removeStyles(r,n,["margin","margin-right","margin-bottom","margin-left","margin-top","padding","padding-right","padding-bottom","padding-left","padding-top"]),updateListWithDetails(r,o,i),mergeWithAdjacentLists(e.dom,o))}),e.selection.setRng(resolveBookmark(l))},isValidLists=(e,t)=>y(e)&&e.nodeName===(null==t?void 0:t.nodeName),hasSameListStyle=(e,t,i)=>{let n=e.getStyle(t,"list-style-type",!0),s=e.getStyle(i,"list-style-type",!0);return n===s},hasSameClasses=(e,t)=>e.className===t.className,shouldMerge=(e,t,i)=>isValidLists(t,i)&&hasSameListStyle(e,t,i)&&hasSameClasses(t,i),mergeWithAdjacentLists=(e,t)=>{let i;let n=t.nextSibling;if(shouldMerge(e,t,n)){let s=n;for(;i=s.firstChild;)t.appendChild(i);e.remove(s)}if(n=t.previousSibling,shouldMerge(e,t,n)){let s=n;for(;i=s.lastChild;)t.insertBefore(i,t.firstChild);e.remove(s)}},updateList$1=(e,t,i,n)=>{if(t.nodeName!==i){let s=e.dom.rename(t,i);updateListWithDetails(e.dom,s,n),fireListEvent(e,listToggleActionFromListName(i),s)}else updateListWithDetails(e.dom,t,n),fireListEvent(e,listToggleActionFromListName(i),t)},updateCustomList=(e,t,i,n)=>{if(t.classList.forEach((e,i,n)=>{e.startsWith("tox-")&&(n.remove(e),0===n.length&&t.removeAttribute("class"))}),t.nodeName!==i){let s=e.dom.rename(t,i);updateListWithDetails(e.dom,s,n),fireListEvent(e,listToggleActionFromListName(i),s)}else updateListWithDetails(e.dom,t,n),fireListEvent(e,listToggleActionFromListName(i),t)},toggleMultipleLists=(e,t,i,n,s)=>{let o=y(t);if(!o||t.nodeName!==n||hasListStyleDetail(s)||isCustomList(t)){applyList(e,n,s);let r=createBookmark(e.selection.getRng()),l=o?[t,...i]:i,a=o&&isCustomList(t)?updateCustomList:updateList$1;L.each(l,t=>{a(e,t,n,s)}),e.selection.setRng(resolveBookmark(r))}else flattenListSelection(e)},hasListStyleDetail=e=>"list-style-type"in e,toggleSingleList=(e,t,i,n)=>{if(t!==e.getBody()){if(t){if(t.nodeName!==i||hasListStyleDetail(n)||isCustomList(t)){let s=createBookmark(e.selection.getRng());isCustomList(t)&&t.classList.forEach((e,i,n)=>{e.startsWith("tox-")&&(n.remove(e),0===n.length&&t.removeAttribute("class"))}),updateListWithDetails(e.dom,t,n);let o=e.dom.rename(t,i);mergeWithAdjacentLists(e.dom,o),e.selection.setRng(resolveBookmark(s)),applyList(e,i,n),fireListEvent(e,listToggleActionFromListName(i),o)}else flattenListSelection(e)}else applyList(e,i,n),fireListEvent(e,listToggleActionFromListName(i),t)}},toggleList=(e,t,i)=>{let s=getParentList(e);if(isWithinNonEditableList(e,s))return;let o=getSelectedSubLists(e),r=n(i)?i:{};o.length>0?toggleMultipleLists(e,s,o,t,r):toggleSingleList(e,s,t,r)},M=f.DOM,normalizeList=(e,t)=>{let i=t.parentElement;if(i&&"LI"===i.nodeName&&i.firstChild===t){let n=i.previousSibling;n&&"LI"===n.nodeName?(n.appendChild(t),isEmpty$2(e,i)&&M.remove(i)):M.setStyle(i,"listStyleType","none")}if(y(i)){let e=i.previousSibling;e&&"LI"===e.nodeName&&e.appendChild(t)}},normalizeLists=(e,t)=>{let i=L.grep(e.select("ol,ul",t));L.each(i,t=>{normalizeList(e,t)})},findNextCaretContainer=(e,t,i,n)=>{let s=t.startContainer,o=t.startOffset;if(isTextNode$1(s)&&(i?o<s.data.length:o>0))return s;let r=e.schema.getNonEmptyElements();isElement(s)&&(s=c.getNode(s,o));let l=new u(s,n);i&&isBogusBr(e.dom,s)&&l.next();let a=i?l.next.bind(l):l.prev2.bind(l);for(;s=a();)if("LI"===s.nodeName&&!s.hasChildNodes()||r[s.nodeName]||isTextNode$1(s)&&s.data.length>0)return s;return null},hasOnlyOneBlockChild=(e,t)=>{let i=t.childNodes;return 1===i.length&&!y(i[0])&&e.isBlock(i[0])},unwrapSingleBlockChild=(e,t)=>{hasOnlyOneBlockChild(e,t)&&e.remove(t.firstChild,!0)},moveChildren=(e,t,i)=>{let n;let s=hasOnlyOneBlockChild(e,i)?i.firstChild:i;if(unwrapSingleBlockChild(e,t),!isEmpty$2(e,t,!0))for(;n=t.firstChild;)s.appendChild(n)},mergeLiElements=(e,t,i)=>{let n;let s=t.parentNode;if(!isChildOfBody(e,t)||!isChildOfBody(e,i))return;y(i.lastChild)&&(n=i.lastChild),s===i.lastChild&&v(s.previousSibling)&&e.remove(s.previousSibling);let o=i.lastChild;o&&v(o)&&t.hasChildNodes()&&e.remove(o),isEmpty$2(e,i,!0)&&empty(p.fromDom(i)),moveChildren(e,t,i),n&&i.appendChild(n);let r=contains(p.fromDom(i),p.fromDom(t)),l=r?e.getParents(t,y,i):[];e.remove(t),each$1(l,t=>{isEmpty$2(e,t)&&t!==e.getRoot()&&e.remove(t)})},mergeIntoEmptyLi=(e,t,i)=>{empty(p.fromDom(i)),mergeLiElements(e.dom,t,i),e.selection.setCursorLocation(i,0)},mergeForward=(e,t,i,n)=>{let s=e.dom;if(s.isEmpty(n))mergeIntoEmptyLi(e,i,n);else{let o=createBookmark(t);mergeLiElements(s,i,n),e.selection.setRng(resolveBookmark(o))}},mergeBackward=(e,t,i,n)=>{let s=createBookmark(t);mergeLiElements(e.dom,i,n);let o=resolveBookmark(s);e.selection.setRng(o)},backspaceDeleteFromListToListCaret=(e,t)=>{let i=e.dom,n=e.selection,s=n.getStart(),o=getClosestEditingHost(e,s),r=i.getParent(n.getStart(),"LI",o);if(r){let s=r.parentElement;if(s===e.getBody()&&isEmpty$2(i,s))return!0;let l=normalizeRange(n.getRng()),a=i.getParent(findNextCaretContainer(e,l,t,o),"LI",o);if(a&&a!==r)return e.undoManager.transact(()=>{t?mergeForward(e,l,a,r):isFirstChild(r)?outdentListSelection(e):mergeBackward(e,l,r,a)}),!0;if(!a&&!t&&0===l.startOffset&&0===l.endOffset)return e.undoManager.transact(()=>{flattenListSelection(e)}),!0}return!1},removeBlock=(e,t,i)=>{let n=e.getParent(t.parentNode,e.isBlock,i);e.remove(t),n&&e.isEmpty(n)&&e.remove(n)},backspaceDeleteIntoListCaret=(e,t)=>{let i=e.dom,n=e.selection.getStart(),s=getClosestEditingHost(e,n),o=i.getParent(n,i.isBlock,s);if(o&&i.isEmpty(o)){let n=normalizeRange(e.selection.getRng()),r=i.getParent(findNextCaretContainer(e,n,t,s),"LI",s);if(r){let findValidElement=e=>contains$1(["td","th","caption"],name(e)),findRoot=e=>e.dom===s,l=closest(p.fromDom(r),findValidElement,findRoot),a=closest(p.fromDom(n.startContainer),findValidElement,findRoot);return!!equals(l,a,eq)&&(e.undoManager.transact(()=>{let n=r.parentNode;removeBlock(i,o,s),mergeWithAdjacentLists(i,n),e.selection.select(r,!0),e.selection.collapse(t)}),!0)}}return!1},backspaceDeleteCaret=(e,t)=>backspaceDeleteFromListToListCaret(e,t)||backspaceDeleteIntoListCaret(e,t),hasListSelection=e=>{let t=e.selection.getStart(),i=getClosestEditingHost(e,t),n=e.dom.getParent(t,"LI,DT,DD",i);return n||getSelectedListItems(e).length>0},backspaceDeleteRange=e=>!!hasListSelection(e)&&(e.undoManager.transact(()=>{e.execCommand("Delete"),normalizeLists(e.dom,e.getBody())}),!0),backspaceDelete=(e,t)=>{let i=e.selection;return!isWithinNonEditableList(e,i.getNode())&&(i.isCollapsed()?backspaceDeleteCaret(e,t):backspaceDeleteRange(e))},setup$2=e=>{e.on("ExecCommand",t=>{let i=t.command.toLowerCase();("delete"===i||"forwarddelete"===i)&&hasListSelection(e)&&normalizeLists(e.dom,e.getBody())}),e.on("keydown",t=>{t.keyCode===g.BACKSPACE?backspaceDelete(e,!1)&&t.preventDefault():t.keyCode===g.DELETE&&backspaceDelete(e,!0)&&t.preventDefault()})},get=e=>({backspaceDelete:t=>{backspaceDelete(e,t)}}),updateList=(e,t)=>{let i=getParentList(e);null===i||isWithinNonEditableList(e,i)||e.undoManager.transact(()=>{n(t.styles)&&e.dom.setStyles(i,t.styles),n(t.attrs)&&each(t.attrs,(t,n)=>e.dom.setAttrib(i,n,t))})},parseAlphabeticBase26=e=>{let t=reverse(x(e).split("")),i=map(t,(e,t)=>{let i=e.toUpperCase().charCodeAt(0)-65+1;return Math.pow(26,t)*i});return foldl(i,(e,t)=>e+t,0)},composeAlphabeticBase26=e=>{if(--e<0)return"";{let t=e%26,i=Math.floor(e/26),n=composeAlphabeticBase26(i),s=String.fromCharCode(65+t);return n+s}},isUppercase=e=>/^[A-Z]+$/.test(e),isLowercase=e=>/^[a-z]+$/.test(e),isNumeric=e=>/^[0-9]+$/.test(e),deduceListType=e=>isNumeric(e)?2:isUppercase(e)?0:isLowercase(e)?1:isEmpty$1(e)?3:4,parseStartValue=e=>{switch(deduceListType(e)){case 2:return Optional.some({listStyleType:Optional.none(),start:e});case 0:return Optional.some({listStyleType:Optional.some("upper-alpha"),start:parseAlphabeticBase26(e).toString()});case 1:return Optional.some({listStyleType:Optional.some("lower-alpha"),start:parseAlphabeticBase26(e).toString()});case 3:return Optional.some({listStyleType:Optional.none(),start:""});case 4:return Optional.none()}},parseDetail=e=>{let t=parseInt(e.start,10);return is$2(e.listStyleType,"upper-alpha")?composeAlphabeticBase26(t):is$2(e.listStyleType,"lower-alpha")?composeAlphabeticBase26(t).toLowerCase():e.start},open=e=>{let t=getParentList(e);!N(t)||isWithinNonEditableList(e,t)||e.windowManager.open({title:"List Properties",body:{type:"panel",items:[{type:"input",name:"start",label:"Start list at number",inputMode:"numeric"}]},initialData:{start:parseDetail({start:e.dom.getAttrib(t,"start","1"),listStyleType:Optional.from(e.dom.getStyle(t,"list-style-type"))})},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:t=>{let i=t.getData();parseStartValue(i.start).each(t=>{e.execCommand("mceListUpdate",!1,{attrs:{start:"1"===t.start?"":t.start},styles:{"list-style-type":t.listStyleType.getOr("")}})}),t.close()}})},queryListCommandState=(e,t)=>()=>{let i=getParentList(e);return isNonNullable(i)&&i.nodeName===t},registerDialog=e=>{e.addCommand("mceListProps",()=>{open(e)})},register$2=e=>{e.on("BeforeExecCommand",t=>{let i=t.command.toLowerCase();"indent"===i?indentListSelection(e):"outdent"===i&&outdentListSelection(e)}),e.addCommand("InsertUnorderedList",(t,i)=>{toggleList(e,"UL",i)}),e.addCommand("InsertOrderedList",(t,i)=>{toggleList(e,"OL",i)}),e.addCommand("InsertDefinitionList",(t,i)=>{toggleList(e,"DL",i)}),e.addCommand("RemoveList",()=>{flattenListSelection(e)}),registerDialog(e),e.addCommand("mceListUpdate",(t,i)=>{n(i)&&updateList(e,i)}),e.addQueryStateHandler("InsertUnorderedList",queryListCommandState(e,"UL")),e.addQueryStateHandler("InsertOrderedList",queryListCommandState(e,"OL")),e.addQueryStateHandler("InsertDefinitionList",queryListCommandState(e,"DL"))};var R=tinymce.util.Tools.resolve("tinymce.html.Node");let isTextNode=e=>3===e.type,isEmpty=e=>0===e.length,wrapInvalidChildren=e=>{let insertListItem=(t,i)=>{let n=R.create("li");each$1(t,e=>n.append(e)),i?e.insert(n,i,!0):e.append(n)},t=foldl(e.children(),(e,t)=>isTextNode(t)?[...e,t]:isEmpty(e)||isTextNode(t)?e:(insertListItem(e,t),[]),[]);isEmpty(t)||insertListItem(t)},setup$1=e=>{e.on("PreInit",()=>{let{parser:t}=e;t.addNodeFilter("ul,ol",e=>each$1(e,wrapInvalidChildren))})},setupTabKey=e=>{e.on("keydown",t=>{t.keyCode!==g.TAB||g.metaKeyPressed(t)||e.undoManager.transact(()=>{(t.shiftKey?outdentListSelection(e):indentListSelection(e))&&t.preventDefault()})})},setup=e=>{k(e)&&setupTabKey(e),setup$2(e)},setupToggleButtonHandler=(e,t)=>i=>(i.setEnabled(e.selection.isEditable()),setNodeChangeHandler(e,n=>{i.setActive(inList(n.parents,t)),i.setEnabled(!isWithinNonEditableList(e,n.element)&&e.selection.isEditable())})),register$1=e=>{let exec=t=>()=>e.execCommand(t);e.hasPlugin("advlist")||(e.ui.registry.addToggleButton("numlist",{icon:"ordered-list",active:!1,tooltip:"Numbered list",onAction:exec("InsertOrderedList"),onSetup:setupToggleButtonHandler(e,"OL")}),e.ui.registry.addToggleButton("bullist",{icon:"unordered-list",active:!1,tooltip:"Bullet list",onAction:exec("InsertUnorderedList"),onSetup:setupToggleButtonHandler(e,"UL")}))},setupMenuButtonHandler=(e,t)=>i=>setNodeChangeHandler(e,n=>i.setEnabled(inList(n.parents,t)&&!isWithinNonEditableList(e,n.element))),register=e=>{let t={text:"List properties...",icon:"ordered-list",onAction:()=>e.execCommand("mceListProps"),onSetup:setupMenuButtonHandler(e,"OL")};e.ui.registry.addMenuItem("listprops",t),e.ui.registry.addContextMenu("lists",{update:t=>{let i=getParentList(e,t);return N(i)?["listprops"]:[]}})};t.add("lists",e=>(register$3(e),setup$1(e),e.hasPlugin("rtc",!0)?registerDialog(e):(setup(e),register$2(e)),register$1(e),register(e),get(e)))}();