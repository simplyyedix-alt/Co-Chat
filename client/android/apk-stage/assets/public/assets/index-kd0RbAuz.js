(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function R0(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ov={exports:{}},bc={},av={exports:{}},pe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ll=Symbol.for("react.element"),C0=Symbol.for("react.portal"),k0=Symbol.for("react.fragment"),P0=Symbol.for("react.strict_mode"),N0=Symbol.for("react.profiler"),x0=Symbol.for("react.provider"),b0=Symbol.for("react.context"),D0=Symbol.for("react.forward_ref"),O0=Symbol.for("react.suspense"),L0=Symbol.for("react.memo"),V0=Symbol.for("react.lazy"),_g=Symbol.iterator;function M0(t){return t===null||typeof t!="object"?null:(t=_g&&t[_g]||t["@@iterator"],typeof t=="function"?t:null)}var lv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},uv=Object.assign,cv={};function fo(t,e,n){this.props=t,this.context=e,this.refs=cv,this.updater=n||lv}fo.prototype.isReactComponent={};fo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};fo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function dv(){}dv.prototype=fo.prototype;function Ff(t,e,n){this.props=t,this.context=e,this.refs=cv,this.updater=n||lv}var Bf=Ff.prototype=new dv;Bf.constructor=Ff;uv(Bf,fo.prototype);Bf.isPureReactComponent=!0;var vg=Array.isArray,hv=Object.prototype.hasOwnProperty,$f={current:null},fv={key:!0,ref:!0,__self:!0,__source:!0};function pv(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)hv.call(e,r)&&!fv.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:ll,type:t,key:i,ref:o,props:s,_owner:$f.current}}function j0(t,e){return{$$typeof:ll,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function zf(t){return typeof t=="object"&&t!==null&&t.$$typeof===ll}function U0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var wg=/\/+/g;function Vd(t,e){return typeof t=="object"&&t!==null&&t.key!=null?U0(""+t.key):e.toString(36)}function Tu(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ll:case C0:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+Vd(o,0):r,vg(s)?(n="",t!=null&&(n=t.replace(wg,"$&/")+"/"),Tu(s,e,n,"",function(c){return c})):s!=null&&(zf(s)&&(s=j0(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(wg,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",vg(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+Vd(i,l);o+=Tu(i,e,n,u,s)}else if(u=M0(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+Vd(i,l++),o+=Tu(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Zl(t,e,n){if(t==null)return t;var r=[],s=0;return Tu(t,r,"","",function(i){return e.call(n,i,s++)}),r}function F0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Ft={current:null},Su={transition:null},B0={ReactCurrentDispatcher:Ft,ReactCurrentBatchConfig:Su,ReactCurrentOwner:$f};function mv(){throw Error("act(...) is not supported in production builds of React.")}pe.Children={map:Zl,forEach:function(t,e,n){Zl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Zl(t,function(){e++}),e},toArray:function(t){return Zl(t,function(e){return e})||[]},only:function(t){if(!zf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};pe.Component=fo;pe.Fragment=k0;pe.Profiler=N0;pe.PureComponent=Ff;pe.StrictMode=P0;pe.Suspense=O0;pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=B0;pe.act=mv;pe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=uv({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=$f.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)hv.call(e,u)&&!fv.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:ll,type:t.type,key:s,ref:i,props:r,_owner:o}};pe.createContext=function(t){return t={$$typeof:b0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:x0,_context:t},t.Consumer=t};pe.createElement=pv;pe.createFactory=function(t){var e=pv.bind(null,t);return e.type=t,e};pe.createRef=function(){return{current:null}};pe.forwardRef=function(t){return{$$typeof:D0,render:t}};pe.isValidElement=zf;pe.lazy=function(t){return{$$typeof:V0,_payload:{_status:-1,_result:t},_init:F0}};pe.memo=function(t,e){return{$$typeof:L0,type:t,compare:e===void 0?null:e}};pe.startTransition=function(t){var e=Su.transition;Su.transition={};try{t()}finally{Su.transition=e}};pe.unstable_act=mv;pe.useCallback=function(t,e){return Ft.current.useCallback(t,e)};pe.useContext=function(t){return Ft.current.useContext(t)};pe.useDebugValue=function(){};pe.useDeferredValue=function(t){return Ft.current.useDeferredValue(t)};pe.useEffect=function(t,e){return Ft.current.useEffect(t,e)};pe.useId=function(){return Ft.current.useId()};pe.useImperativeHandle=function(t,e,n){return Ft.current.useImperativeHandle(t,e,n)};pe.useInsertionEffect=function(t,e){return Ft.current.useInsertionEffect(t,e)};pe.useLayoutEffect=function(t,e){return Ft.current.useLayoutEffect(t,e)};pe.useMemo=function(t,e){return Ft.current.useMemo(t,e)};pe.useReducer=function(t,e,n){return Ft.current.useReducer(t,e,n)};pe.useRef=function(t){return Ft.current.useRef(t)};pe.useState=function(t){return Ft.current.useState(t)};pe.useSyncExternalStore=function(t,e,n){return Ft.current.useSyncExternalStore(t,e,n)};pe.useTransition=function(){return Ft.current.useTransition()};pe.version="18.3.1";av.exports=pe;var V=av.exports;const $0=R0(V);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z0=V,q0=Symbol.for("react.element"),W0=Symbol.for("react.fragment"),H0=Object.prototype.hasOwnProperty,G0=z0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,K0={key:!0,ref:!0,__self:!0,__source:!0};function gv(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)H0.call(e,r)&&!K0.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:q0,type:t,key:i,ref:o,props:s,_owner:G0.current}}bc.Fragment=W0;bc.jsx=gv;bc.jsxs=gv;ov.exports=bc;var m=ov.exports,Th={},yv={exports:{}},on={},_v={exports:{}},vv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,J){var H=U.length;U.push(J);e:for(;0<H;){var X=H-1>>>1,re=U[X];if(0<s(re,J))U[X]=J,U[H]=re,H=X;else break e}}function n(U){return U.length===0?null:U[0]}function r(U){if(U.length===0)return null;var J=U[0],H=U.pop();if(H!==J){U[0]=H;e:for(var X=0,re=U.length,oe=re>>>1;X<oe;){var ee=2*(X+1)-1,de=U[ee],he=ee+1,Ye=U[he];if(0>s(de,H))he<re&&0>s(Ye,de)?(U[X]=Ye,U[he]=H,X=he):(U[X]=de,U[ee]=H,X=ee);else if(he<re&&0>s(Ye,H))U[X]=Ye,U[he]=H,X=he;else break e}}return J}function s(U,J){var H=U.sortIndex-J.sortIndex;return H!==0?H:U.id-J.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],c=[],f=1,p=null,g=3,C=!1,N=!1,b=!1,k=typeof setTimeout=="function"?setTimeout:null,A=typeof clearTimeout=="function"?clearTimeout:null,y=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function E(U){for(var J=n(c);J!==null;){if(J.callback===null)r(c);else if(J.startTime<=U)r(c),J.sortIndex=J.expirationTime,e(u,J);else break;J=n(c)}}function D(U){if(b=!1,E(U),!N)if(n(u)!==null)N=!0,le(B);else{var J=n(c);J!==null&&Te(D,J.startTime-U)}}function B(U,J){N=!1,b&&(b=!1,A(_),_=-1),C=!0;var H=g;try{for(E(J),p=n(u);p!==null&&(!(p.expirationTime>J)||U&&!T());){var X=p.callback;if(typeof X=="function"){p.callback=null,g=p.priorityLevel;var re=X(p.expirationTime<=J);J=t.unstable_now(),typeof re=="function"?p.callback=re:p===n(u)&&r(u),E(J)}else r(u);p=n(u)}if(p!==null)var oe=!0;else{var ee=n(c);ee!==null&&Te(D,ee.startTime-J),oe=!1}return oe}finally{p=null,g=H,C=!1}}var $=!1,w=null,_=-1,I=5,P=-1;function T(){return!(t.unstable_now()-P<I)}function x(){if(w!==null){var U=t.unstable_now();P=U;var J=!0;try{J=w(!0,U)}finally{J?R():($=!1,w=null)}}else $=!1}var R;if(typeof y=="function")R=function(){y(x)};else if(typeof MessageChannel<"u"){var ye=new MessageChannel,fe=ye.port2;ye.port1.onmessage=x,R=function(){fe.postMessage(null)}}else R=function(){k(x,0)};function le(U){w=U,$||($=!0,R())}function Te(U,J){_=k(function(){U(t.unstable_now())},J)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){N||C||(N=!0,le(B))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(U){switch(g){case 1:case 2:case 3:var J=3;break;default:J=g}var H=g;g=J;try{return U()}finally{g=H}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,J){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var H=g;g=U;try{return J()}finally{g=H}},t.unstable_scheduleCallback=function(U,J,H){var X=t.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?X+H:X):H=X,U){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=H+re,U={id:f++,callback:J,priorityLevel:U,startTime:H,expirationTime:re,sortIndex:-1},H>X?(U.sortIndex=H,e(c,U),n(u)===null&&U===n(c)&&(b?(A(_),_=-1):b=!0,Te(D,H-X))):(U.sortIndex=re,e(u,U),N||C||(N=!0,le(B))),U},t.unstable_shouldYield=T,t.unstable_wrapCallback=function(U){var J=g;return function(){var H=g;g=J;try{return U.apply(this,arguments)}finally{g=H}}}})(vv);_v.exports=vv;var Q0=_v.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Y0=V,rn=Q0;function W(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var wv=new Set,ba={};function Ks(t,e){Ki(t,e),Ki(t+"Capture",e)}function Ki(t,e){for(ba[t]=e,t=0;t<e.length;t++)wv.add(e[t])}var cr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Sh=Object.prototype.hasOwnProperty,X0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Eg={},Ig={};function J0(t){return Sh.call(Ig,t)?!0:Sh.call(Eg,t)?!1:X0.test(t)?Ig[t]=!0:(Eg[t]=!0,!1)}function Z0(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function eS(t,e,n,r){if(e===null||typeof e>"u"||Z0(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Bt(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var It={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){It[t]=new Bt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];It[e]=new Bt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){It[t]=new Bt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){It[t]=new Bt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){It[t]=new Bt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){It[t]=new Bt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){It[t]=new Bt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){It[t]=new Bt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){It[t]=new Bt(t,5,!1,t.toLowerCase(),null,!1,!1)});var qf=/[\-:]([a-z])/g;function Wf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(qf,Wf);It[e]=new Bt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(qf,Wf);It[e]=new Bt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(qf,Wf);It[e]=new Bt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){It[t]=new Bt(t,1,!1,t.toLowerCase(),null,!1,!1)});It.xlinkHref=new Bt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){It[t]=new Bt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Hf(t,e,n,r){var s=It.hasOwnProperty(e)?It[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(eS(e,n,s,r)&&(n=null),r||s===null?J0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var wr=Y0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,eu=Symbol.for("react.element"),Si=Symbol.for("react.portal"),Ai=Symbol.for("react.fragment"),Gf=Symbol.for("react.strict_mode"),Ah=Symbol.for("react.profiler"),Ev=Symbol.for("react.provider"),Iv=Symbol.for("react.context"),Kf=Symbol.for("react.forward_ref"),Rh=Symbol.for("react.suspense"),Ch=Symbol.for("react.suspense_list"),Qf=Symbol.for("react.memo"),Or=Symbol.for("react.lazy"),Tv=Symbol.for("react.offscreen"),Tg=Symbol.iterator;function Qo(t){return t===null||typeof t!="object"?null:(t=Tg&&t[Tg]||t["@@iterator"],typeof t=="function"?t:null)}var Ue=Object.assign,Md;function ia(t){if(Md===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Md=e&&e[1]||""}return`
`+Md+t}var jd=!1;function Ud(t,e){if(!t||jd)return"";jd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var s=c.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{jd=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ia(t):""}function tS(t){switch(t.tag){case 5:return ia(t.type);case 16:return ia("Lazy");case 13:return ia("Suspense");case 19:return ia("SuspenseList");case 0:case 2:case 15:return t=Ud(t.type,!1),t;case 11:return t=Ud(t.type.render,!1),t;case 1:return t=Ud(t.type,!0),t;default:return""}}function kh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ai:return"Fragment";case Si:return"Portal";case Ah:return"Profiler";case Gf:return"StrictMode";case Rh:return"Suspense";case Ch:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Iv:return(t.displayName||"Context")+".Consumer";case Ev:return(t._context.displayName||"Context")+".Provider";case Kf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Qf:return e=t.displayName||null,e!==null?e:kh(t.type)||"Memo";case Or:e=t._payload,t=t._init;try{return kh(t(e))}catch{}}return null}function nS(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return kh(e);case 8:return e===Gf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function ss(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Sv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function rS(t){var e=Sv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function tu(t){t._valueTracker||(t._valueTracker=rS(t))}function Av(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Sv(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Hu(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ph(t,e){var n=e.checked;return Ue({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Sg(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=ss(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Rv(t,e){e=e.checked,e!=null&&Hf(t,"checked",e,!1)}function Nh(t,e){Rv(t,e);var n=ss(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?xh(t,e.type,n):e.hasOwnProperty("defaultValue")&&xh(t,e.type,ss(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Ag(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function xh(t,e,n){(e!=="number"||Hu(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var oa=Array.isArray;function Mi(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+ss(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function bh(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(W(91));return Ue({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Rg(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(W(92));if(oa(n)){if(1<n.length)throw Error(W(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:ss(n)}}function Cv(t,e){var n=ss(e.value),r=ss(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Cg(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function kv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Dh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?kv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var nu,Pv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(nu=nu||document.createElement("div"),nu.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=nu.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Da(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ma={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},sS=["Webkit","ms","Moz","O"];Object.keys(ma).forEach(function(t){sS.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ma[e]=ma[t]})});function Nv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ma.hasOwnProperty(t)&&ma[t]?(""+e).trim():e+"px"}function xv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=Nv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var iS=Ue({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Oh(t,e){if(e){if(iS[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(W(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(W(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(W(61))}if(e.style!=null&&typeof e.style!="object")throw Error(W(62))}}function Lh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Vh=null;function Yf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Mh=null,ji=null,Ui=null;function kg(t){if(t=dl(t)){if(typeof Mh!="function")throw Error(W(280));var e=t.stateNode;e&&(e=Mc(e),Mh(t.stateNode,t.type,e))}}function bv(t){ji?Ui?Ui.push(t):Ui=[t]:ji=t}function Dv(){if(ji){var t=ji,e=Ui;if(Ui=ji=null,kg(t),e)for(t=0;t<e.length;t++)kg(e[t])}}function Ov(t,e){return t(e)}function Lv(){}var Fd=!1;function Vv(t,e,n){if(Fd)return t(e,n);Fd=!0;try{return Ov(t,e,n)}finally{Fd=!1,(ji!==null||Ui!==null)&&(Lv(),Dv())}}function Oa(t,e){var n=t.stateNode;if(n===null)return null;var r=Mc(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(W(231,e,typeof n));return n}var jh=!1;if(cr)try{var Yo={};Object.defineProperty(Yo,"passive",{get:function(){jh=!0}}),window.addEventListener("test",Yo,Yo),window.removeEventListener("test",Yo,Yo)}catch{jh=!1}function oS(t,e,n,r,s,i,o,l,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var ga=!1,Gu=null,Ku=!1,Uh=null,aS={onError:function(t){ga=!0,Gu=t}};function lS(t,e,n,r,s,i,o,l,u){ga=!1,Gu=null,oS.apply(aS,arguments)}function uS(t,e,n,r,s,i,o,l,u){if(lS.apply(this,arguments),ga){if(ga){var c=Gu;ga=!1,Gu=null}else throw Error(W(198));Ku||(Ku=!0,Uh=c)}}function Qs(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Mv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Pg(t){if(Qs(t)!==t)throw Error(W(188))}function cS(t){var e=t.alternate;if(!e){if(e=Qs(t),e===null)throw Error(W(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Pg(s),t;if(i===r)return Pg(s),e;i=i.sibling}throw Error(W(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(W(189))}}if(n.alternate!==r)throw Error(W(190))}if(n.tag!==3)throw Error(W(188));return n.stateNode.current===n?t:e}function jv(t){return t=cS(t),t!==null?Uv(t):null}function Uv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Uv(t);if(e!==null)return e;t=t.sibling}return null}var Fv=rn.unstable_scheduleCallback,Ng=rn.unstable_cancelCallback,dS=rn.unstable_shouldYield,hS=rn.unstable_requestPaint,Ke=rn.unstable_now,fS=rn.unstable_getCurrentPriorityLevel,Xf=rn.unstable_ImmediatePriority,Bv=rn.unstable_UserBlockingPriority,Qu=rn.unstable_NormalPriority,pS=rn.unstable_LowPriority,$v=rn.unstable_IdlePriority,Dc=null,$n=null;function mS(t){if($n&&typeof $n.onCommitFiberRoot=="function")try{$n.onCommitFiberRoot(Dc,t,void 0,(t.current.flags&128)===128)}catch{}}var An=Math.clz32?Math.clz32:_S,gS=Math.log,yS=Math.LN2;function _S(t){return t>>>=0,t===0?32:31-(gS(t)/yS|0)|0}var ru=64,su=4194304;function aa(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Yu(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=aa(l):(i&=o,i!==0&&(r=aa(i)))}else o=n&~s,o!==0?r=aa(o):i!==0&&(r=aa(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-An(e),s=1<<n,r|=t[n],e&=~s;return r}function vS(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wS(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-An(i),l=1<<o,u=s[o];u===-1?(!(l&n)||l&r)&&(s[o]=vS(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function Fh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function zv(){var t=ru;return ru<<=1,!(ru&4194240)&&(ru=64),t}function Bd(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ul(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-An(e),t[e]=n}function ES(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-An(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Jf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-An(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var ke=0;function qv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Wv,Zf,Hv,Gv,Kv,Bh=!1,iu=[],Gr=null,Kr=null,Qr=null,La=new Map,Va=new Map,Vr=[],IS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function xg(t,e){switch(t){case"focusin":case"focusout":Gr=null;break;case"dragenter":case"dragleave":Kr=null;break;case"mouseover":case"mouseout":Qr=null;break;case"pointerover":case"pointerout":La.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Va.delete(e.pointerId)}}function Xo(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=dl(e),e!==null&&Zf(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function TS(t,e,n,r,s){switch(e){case"focusin":return Gr=Xo(Gr,t,e,n,r,s),!0;case"dragenter":return Kr=Xo(Kr,t,e,n,r,s),!0;case"mouseover":return Qr=Xo(Qr,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return La.set(i,Xo(La.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Va.set(i,Xo(Va.get(i)||null,t,e,n,r,s)),!0}return!1}function Qv(t){var e=Cs(t.target);if(e!==null){var n=Qs(e);if(n!==null){if(e=n.tag,e===13){if(e=Mv(n),e!==null){t.blockedOn=e,Kv(t.priority,function(){Hv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Au(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=$h(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Vh=r,n.target.dispatchEvent(r),Vh=null}else return e=dl(n),e!==null&&Zf(e),t.blockedOn=n,!1;e.shift()}return!0}function bg(t,e,n){Au(t)&&n.delete(e)}function SS(){Bh=!1,Gr!==null&&Au(Gr)&&(Gr=null),Kr!==null&&Au(Kr)&&(Kr=null),Qr!==null&&Au(Qr)&&(Qr=null),La.forEach(bg),Va.forEach(bg)}function Jo(t,e){t.blockedOn===e&&(t.blockedOn=null,Bh||(Bh=!0,rn.unstable_scheduleCallback(rn.unstable_NormalPriority,SS)))}function Ma(t){function e(s){return Jo(s,t)}if(0<iu.length){Jo(iu[0],t);for(var n=1;n<iu.length;n++){var r=iu[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Gr!==null&&Jo(Gr,t),Kr!==null&&Jo(Kr,t),Qr!==null&&Jo(Qr,t),La.forEach(e),Va.forEach(e),n=0;n<Vr.length;n++)r=Vr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Vr.length&&(n=Vr[0],n.blockedOn===null);)Qv(n),n.blockedOn===null&&Vr.shift()}var Fi=wr.ReactCurrentBatchConfig,Xu=!0;function AS(t,e,n,r){var s=ke,i=Fi.transition;Fi.transition=null;try{ke=1,ep(t,e,n,r)}finally{ke=s,Fi.transition=i}}function RS(t,e,n,r){var s=ke,i=Fi.transition;Fi.transition=null;try{ke=4,ep(t,e,n,r)}finally{ke=s,Fi.transition=i}}function ep(t,e,n,r){if(Xu){var s=$h(t,e,n,r);if(s===null)Xd(t,e,r,Ju,n),xg(t,r);else if(TS(s,t,e,n,r))r.stopPropagation();else if(xg(t,r),e&4&&-1<IS.indexOf(t)){for(;s!==null;){var i=dl(s);if(i!==null&&Wv(i),i=$h(t,e,n,r),i===null&&Xd(t,e,r,Ju,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Xd(t,e,r,null,n)}}var Ju=null;function $h(t,e,n,r){if(Ju=null,t=Yf(r),t=Cs(t),t!==null)if(e=Qs(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Mv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ju=t,null}function Yv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(fS()){case Xf:return 1;case Bv:return 4;case Qu:case pS:return 16;case $v:return 536870912;default:return 16}default:return 16}}var zr=null,tp=null,Ru=null;function Xv(){if(Ru)return Ru;var t,e=tp,n=e.length,r,s="value"in zr?zr.value:zr.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return Ru=s.slice(t,1<r?1-r:void 0)}function Cu(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ou(){return!0}function Dg(){return!1}function an(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ou:Dg,this.isPropagationStopped=Dg,this}return Ue(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ou)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ou)},persist:function(){},isPersistent:ou}),e}var po={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},np=an(po),cl=Ue({},po,{view:0,detail:0}),CS=an(cl),$d,zd,Zo,Oc=Ue({},cl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:rp,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Zo&&(Zo&&t.type==="mousemove"?($d=t.screenX-Zo.screenX,zd=t.screenY-Zo.screenY):zd=$d=0,Zo=t),$d)},movementY:function(t){return"movementY"in t?t.movementY:zd}}),Og=an(Oc),kS=Ue({},Oc,{dataTransfer:0}),PS=an(kS),NS=Ue({},cl,{relatedTarget:0}),qd=an(NS),xS=Ue({},po,{animationName:0,elapsedTime:0,pseudoElement:0}),bS=an(xS),DS=Ue({},po,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),OS=an(DS),LS=Ue({},po,{data:0}),Lg=an(LS),VS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},MS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function US(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=jS[t])?!!e[t]:!1}function rp(){return US}var FS=Ue({},cl,{key:function(t){if(t.key){var e=VS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Cu(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?MS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:rp,charCode:function(t){return t.type==="keypress"?Cu(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Cu(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),BS=an(FS),$S=Ue({},Oc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Vg=an($S),zS=Ue({},cl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:rp}),qS=an(zS),WS=Ue({},po,{propertyName:0,elapsedTime:0,pseudoElement:0}),HS=an(WS),GS=Ue({},Oc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),KS=an(GS),QS=[9,13,27,32],sp=cr&&"CompositionEvent"in window,ya=null;cr&&"documentMode"in document&&(ya=document.documentMode);var YS=cr&&"TextEvent"in window&&!ya,Jv=cr&&(!sp||ya&&8<ya&&11>=ya),Mg=" ",jg=!1;function Zv(t,e){switch(t){case"keyup":return QS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ew(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ri=!1;function XS(t,e){switch(t){case"compositionend":return ew(e);case"keypress":return e.which!==32?null:(jg=!0,Mg);case"textInput":return t=e.data,t===Mg&&jg?null:t;default:return null}}function JS(t,e){if(Ri)return t==="compositionend"||!sp&&Zv(t,e)?(t=Xv(),Ru=tp=zr=null,Ri=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Jv&&e.locale!=="ko"?null:e.data;default:return null}}var ZS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ug(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!ZS[t.type]:e==="textarea"}function tw(t,e,n,r){bv(r),e=Zu(e,"onChange"),0<e.length&&(n=new np("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var _a=null,ja=null;function eA(t){hw(t,0)}function Lc(t){var e=Pi(t);if(Av(e))return t}function tA(t,e){if(t==="change")return e}var nw=!1;if(cr){var Wd;if(cr){var Hd="oninput"in document;if(!Hd){var Fg=document.createElement("div");Fg.setAttribute("oninput","return;"),Hd=typeof Fg.oninput=="function"}Wd=Hd}else Wd=!1;nw=Wd&&(!document.documentMode||9<document.documentMode)}function Bg(){_a&&(_a.detachEvent("onpropertychange",rw),ja=_a=null)}function rw(t){if(t.propertyName==="value"&&Lc(ja)){var e=[];tw(e,ja,t,Yf(t)),Vv(eA,e)}}function nA(t,e,n){t==="focusin"?(Bg(),_a=e,ja=n,_a.attachEvent("onpropertychange",rw)):t==="focusout"&&Bg()}function rA(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Lc(ja)}function sA(t,e){if(t==="click")return Lc(e)}function iA(t,e){if(t==="input"||t==="change")return Lc(e)}function oA(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Cn=typeof Object.is=="function"?Object.is:oA;function Ua(t,e){if(Cn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Sh.call(e,s)||!Cn(t[s],e[s]))return!1}return!0}function $g(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function zg(t,e){var n=$g(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=$g(n)}}function sw(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?sw(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function iw(){for(var t=window,e=Hu();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Hu(t.document)}return e}function ip(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function aA(t){var e=iw(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&sw(n.ownerDocument.documentElement,n)){if(r!==null&&ip(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=zg(n,i);var o=zg(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var lA=cr&&"documentMode"in document&&11>=document.documentMode,Ci=null,zh=null,va=null,qh=!1;function qg(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;qh||Ci==null||Ci!==Hu(r)||(r=Ci,"selectionStart"in r&&ip(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),va&&Ua(va,r)||(va=r,r=Zu(zh,"onSelect"),0<r.length&&(e=new np("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Ci)))}function au(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ki={animationend:au("Animation","AnimationEnd"),animationiteration:au("Animation","AnimationIteration"),animationstart:au("Animation","AnimationStart"),transitionend:au("Transition","TransitionEnd")},Gd={},ow={};cr&&(ow=document.createElement("div").style,"AnimationEvent"in window||(delete ki.animationend.animation,delete ki.animationiteration.animation,delete ki.animationstart.animation),"TransitionEvent"in window||delete ki.transitionend.transition);function Vc(t){if(Gd[t])return Gd[t];if(!ki[t])return t;var e=ki[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ow)return Gd[t]=e[n];return t}var aw=Vc("animationend"),lw=Vc("animationiteration"),uw=Vc("animationstart"),cw=Vc("transitionend"),dw=new Map,Wg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function cs(t,e){dw.set(t,e),Ks(e,[t])}for(var Kd=0;Kd<Wg.length;Kd++){var Qd=Wg[Kd],uA=Qd.toLowerCase(),cA=Qd[0].toUpperCase()+Qd.slice(1);cs(uA,"on"+cA)}cs(aw,"onAnimationEnd");cs(lw,"onAnimationIteration");cs(uw,"onAnimationStart");cs("dblclick","onDoubleClick");cs("focusin","onFocus");cs("focusout","onBlur");cs(cw,"onTransitionEnd");Ki("onMouseEnter",["mouseout","mouseover"]);Ki("onMouseLeave",["mouseout","mouseover"]);Ki("onPointerEnter",["pointerout","pointerover"]);Ki("onPointerLeave",["pointerout","pointerover"]);Ks("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ks("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ks("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ks("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ks("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ks("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var la="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),dA=new Set("cancel close invalid load scroll toggle".split(" ").concat(la));function Hg(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,uS(r,e,void 0,t),t.currentTarget=null}function hw(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;Hg(s,l,c),i=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,c=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;Hg(s,l,c),i=u}}}if(Ku)throw t=Uh,Ku=!1,Uh=null,t}function Oe(t,e){var n=e[Qh];n===void 0&&(n=e[Qh]=new Set);var r=t+"__bubble";n.has(r)||(fw(e,t,2,!1),n.add(r))}function Yd(t,e,n){var r=0;e&&(r|=4),fw(n,t,r,e)}var lu="_reactListening"+Math.random().toString(36).slice(2);function Fa(t){if(!t[lu]){t[lu]=!0,wv.forEach(function(n){n!=="selectionchange"&&(dA.has(n)||Yd(n,!1,t),Yd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[lu]||(e[lu]=!0,Yd("selectionchange",!1,e))}}function fw(t,e,n,r){switch(Yv(e)){case 1:var s=AS;break;case 4:s=RS;break;default:s=ep}n=s.bind(null,e,n,t),s=void 0,!jh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Xd(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Cs(l),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}l=l.parentNode}}r=r.return}Vv(function(){var c=i,f=Yf(n),p=[];e:{var g=dw.get(t);if(g!==void 0){var C=np,N=t;switch(t){case"keypress":if(Cu(n)===0)break e;case"keydown":case"keyup":C=BS;break;case"focusin":N="focus",C=qd;break;case"focusout":N="blur",C=qd;break;case"beforeblur":case"afterblur":C=qd;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=Og;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=PS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=qS;break;case aw:case lw:case uw:C=bS;break;case cw:C=HS;break;case"scroll":C=CS;break;case"wheel":C=KS;break;case"copy":case"cut":case"paste":C=OS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=Vg}var b=(e&4)!==0,k=!b&&t==="scroll",A=b?g!==null?g+"Capture":null:g;b=[];for(var y=c,E;y!==null;){E=y;var D=E.stateNode;if(E.tag===5&&D!==null&&(E=D,A!==null&&(D=Oa(y,A),D!=null&&b.push(Ba(y,D,E)))),k)break;y=y.return}0<b.length&&(g=new C(g,N,null,n,f),p.push({event:g,listeners:b}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",g&&n!==Vh&&(N=n.relatedTarget||n.fromElement)&&(Cs(N)||N[dr]))break e;if((C||g)&&(g=f.window===f?f:(g=f.ownerDocument)?g.defaultView||g.parentWindow:window,C?(N=n.relatedTarget||n.toElement,C=c,N=N?Cs(N):null,N!==null&&(k=Qs(N),N!==k||N.tag!==5&&N.tag!==6)&&(N=null)):(C=null,N=c),C!==N)){if(b=Og,D="onMouseLeave",A="onMouseEnter",y="mouse",(t==="pointerout"||t==="pointerover")&&(b=Vg,D="onPointerLeave",A="onPointerEnter",y="pointer"),k=C==null?g:Pi(C),E=N==null?g:Pi(N),g=new b(D,y+"leave",C,n,f),g.target=k,g.relatedTarget=E,D=null,Cs(f)===c&&(b=new b(A,y+"enter",N,n,f),b.target=E,b.relatedTarget=k,D=b),k=D,C&&N)t:{for(b=C,A=N,y=0,E=b;E;E=wi(E))y++;for(E=0,D=A;D;D=wi(D))E++;for(;0<y-E;)b=wi(b),y--;for(;0<E-y;)A=wi(A),E--;for(;y--;){if(b===A||A!==null&&b===A.alternate)break t;b=wi(b),A=wi(A)}b=null}else b=null;C!==null&&Gg(p,g,C,b,!1),N!==null&&k!==null&&Gg(p,k,N,b,!0)}}e:{if(g=c?Pi(c):window,C=g.nodeName&&g.nodeName.toLowerCase(),C==="select"||C==="input"&&g.type==="file")var B=tA;else if(Ug(g))if(nw)B=iA;else{B=rA;var $=nA}else(C=g.nodeName)&&C.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(B=sA);if(B&&(B=B(t,c))){tw(p,B,n,f);break e}$&&$(t,g,c),t==="focusout"&&($=g._wrapperState)&&$.controlled&&g.type==="number"&&xh(g,"number",g.value)}switch($=c?Pi(c):window,t){case"focusin":(Ug($)||$.contentEditable==="true")&&(Ci=$,zh=c,va=null);break;case"focusout":va=zh=Ci=null;break;case"mousedown":qh=!0;break;case"contextmenu":case"mouseup":case"dragend":qh=!1,qg(p,n,f);break;case"selectionchange":if(lA)break;case"keydown":case"keyup":qg(p,n,f)}var w;if(sp)e:{switch(t){case"compositionstart":var _="onCompositionStart";break e;case"compositionend":_="onCompositionEnd";break e;case"compositionupdate":_="onCompositionUpdate";break e}_=void 0}else Ri?Zv(t,n)&&(_="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(_="onCompositionStart");_&&(Jv&&n.locale!=="ko"&&(Ri||_!=="onCompositionStart"?_==="onCompositionEnd"&&Ri&&(w=Xv()):(zr=f,tp="value"in zr?zr.value:zr.textContent,Ri=!0)),$=Zu(c,_),0<$.length&&(_=new Lg(_,t,null,n,f),p.push({event:_,listeners:$}),w?_.data=w:(w=ew(n),w!==null&&(_.data=w)))),(w=YS?XS(t,n):JS(t,n))&&(c=Zu(c,"onBeforeInput"),0<c.length&&(f=new Lg("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:c}),f.data=w))}hw(p,e)})}function Ba(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Zu(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Oa(t,n),i!=null&&r.unshift(Ba(t,i,s)),i=Oa(t,e),i!=null&&r.push(Ba(t,i,s))),t=t.return}return r}function wi(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Gg(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,s?(u=Oa(n,i),u!=null&&o.unshift(Ba(n,u,l))):s||(u=Oa(n,i),u!=null&&o.push(Ba(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var hA=/\r\n?/g,fA=/\u0000|\uFFFD/g;function Kg(t){return(typeof t=="string"?t:""+t).replace(hA,`
`).replace(fA,"")}function uu(t,e,n){if(e=Kg(e),Kg(t)!==e&&n)throw Error(W(425))}function ec(){}var Wh=null,Hh=null;function Gh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Kh=typeof setTimeout=="function"?setTimeout:void 0,pA=typeof clearTimeout=="function"?clearTimeout:void 0,Qg=typeof Promise=="function"?Promise:void 0,mA=typeof queueMicrotask=="function"?queueMicrotask:typeof Qg<"u"?function(t){return Qg.resolve(null).then(t).catch(gA)}:Kh;function gA(t){setTimeout(function(){throw t})}function Jd(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),Ma(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Ma(e)}function Yr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Yg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var mo=Math.random().toString(36).slice(2),jn="__reactFiber$"+mo,$a="__reactProps$"+mo,dr="__reactContainer$"+mo,Qh="__reactEvents$"+mo,yA="__reactListeners$"+mo,_A="__reactHandles$"+mo;function Cs(t){var e=t[jn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[dr]||n[jn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Yg(t);t!==null;){if(n=t[jn])return n;t=Yg(t)}return e}t=n,n=t.parentNode}return null}function dl(t){return t=t[jn]||t[dr],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Pi(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(W(33))}function Mc(t){return t[$a]||null}var Yh=[],Ni=-1;function ds(t){return{current:t}}function Le(t){0>Ni||(t.current=Yh[Ni],Yh[Ni]=null,Ni--)}function be(t,e){Ni++,Yh[Ni]=t.current,t.current=e}var is={},Dt=ds(is),Ht=ds(!1),Vs=is;function Qi(t,e){var n=t.type.contextTypes;if(!n)return is;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function Gt(t){return t=t.childContextTypes,t!=null}function tc(){Le(Ht),Le(Dt)}function Xg(t,e,n){if(Dt.current!==is)throw Error(W(168));be(Dt,e),be(Ht,n)}function pw(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(W(108,nS(t)||"Unknown",s));return Ue({},n,r)}function nc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||is,Vs=Dt.current,be(Dt,t),be(Ht,Ht.current),!0}function Jg(t,e,n){var r=t.stateNode;if(!r)throw Error(W(169));n?(t=pw(t,e,Vs),r.__reactInternalMemoizedMergedChildContext=t,Le(Ht),Le(Dt),be(Dt,t)):Le(Ht),be(Ht,n)}var nr=null,jc=!1,Zd=!1;function mw(t){nr===null?nr=[t]:nr.push(t)}function vA(t){jc=!0,mw(t)}function hs(){if(!Zd&&nr!==null){Zd=!0;var t=0,e=ke;try{var n=nr;for(ke=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}nr=null,jc=!1}catch(s){throw nr!==null&&(nr=nr.slice(t+1)),Fv(Xf,hs),s}finally{ke=e,Zd=!1}}return null}var xi=[],bi=0,rc=null,sc=0,un=[],cn=0,Ms=null,rr=1,sr="";function Ss(t,e){xi[bi++]=sc,xi[bi++]=rc,rc=t,sc=e}function gw(t,e,n){un[cn++]=rr,un[cn++]=sr,un[cn++]=Ms,Ms=t;var r=rr;t=sr;var s=32-An(r)-1;r&=~(1<<s),n+=1;var i=32-An(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,rr=1<<32-An(e)+s|n<<s|r,sr=i+t}else rr=1<<i|n<<s|r,sr=t}function op(t){t.return!==null&&(Ss(t,1),gw(t,1,0))}function ap(t){for(;t===rc;)rc=xi[--bi],xi[bi]=null,sc=xi[--bi],xi[bi]=null;for(;t===Ms;)Ms=un[--cn],un[cn]=null,sr=un[--cn],un[cn]=null,rr=un[--cn],un[cn]=null}var tn=null,Jt=null,Ve=!1,Sn=null;function yw(t,e){var n=dn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Zg(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,tn=t,Jt=Yr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,tn=t,Jt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ms!==null?{id:rr,overflow:sr}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=dn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,tn=t,Jt=null,!0):!1;default:return!1}}function Xh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Jh(t){if(Ve){var e=Jt;if(e){var n=e;if(!Zg(t,e)){if(Xh(t))throw Error(W(418));e=Yr(n.nextSibling);var r=tn;e&&Zg(t,e)?yw(r,n):(t.flags=t.flags&-4097|2,Ve=!1,tn=t)}}else{if(Xh(t))throw Error(W(418));t.flags=t.flags&-4097|2,Ve=!1,tn=t}}}function ey(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;tn=t}function cu(t){if(t!==tn)return!1;if(!Ve)return ey(t),Ve=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Gh(t.type,t.memoizedProps)),e&&(e=Jt)){if(Xh(t))throw _w(),Error(W(418));for(;e;)yw(t,e),e=Yr(e.nextSibling)}if(ey(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(W(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Jt=Yr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Jt=null}}else Jt=tn?Yr(t.stateNode.nextSibling):null;return!0}function _w(){for(var t=Jt;t;)t=Yr(t.nextSibling)}function Yi(){Jt=tn=null,Ve=!1}function lp(t){Sn===null?Sn=[t]:Sn.push(t)}var wA=wr.ReactCurrentBatchConfig;function ea(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(W(309));var r=n.stateNode}if(!r)throw Error(W(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(W(284));if(!n._owner)throw Error(W(290,t))}return t}function du(t,e){throw t=Object.prototype.toString.call(e),Error(W(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function ty(t){var e=t._init;return e(t._payload)}function vw(t){function e(A,y){if(t){var E=A.deletions;E===null?(A.deletions=[y],A.flags|=16):E.push(y)}}function n(A,y){if(!t)return null;for(;y!==null;)e(A,y),y=y.sibling;return null}function r(A,y){for(A=new Map;y!==null;)y.key!==null?A.set(y.key,y):A.set(y.index,y),y=y.sibling;return A}function s(A,y){return A=es(A,y),A.index=0,A.sibling=null,A}function i(A,y,E){return A.index=E,t?(E=A.alternate,E!==null?(E=E.index,E<y?(A.flags|=2,y):E):(A.flags|=2,y)):(A.flags|=1048576,y)}function o(A){return t&&A.alternate===null&&(A.flags|=2),A}function l(A,y,E,D){return y===null||y.tag!==6?(y=oh(E,A.mode,D),y.return=A,y):(y=s(y,E),y.return=A,y)}function u(A,y,E,D){var B=E.type;return B===Ai?f(A,y,E.props.children,D,E.key):y!==null&&(y.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===Or&&ty(B)===y.type)?(D=s(y,E.props),D.ref=ea(A,y,E),D.return=A,D):(D=Ou(E.type,E.key,E.props,null,A.mode,D),D.ref=ea(A,y,E),D.return=A,D)}function c(A,y,E,D){return y===null||y.tag!==4||y.stateNode.containerInfo!==E.containerInfo||y.stateNode.implementation!==E.implementation?(y=ah(E,A.mode,D),y.return=A,y):(y=s(y,E.children||[]),y.return=A,y)}function f(A,y,E,D,B){return y===null||y.tag!==7?(y=bs(E,A.mode,D,B),y.return=A,y):(y=s(y,E),y.return=A,y)}function p(A,y,E){if(typeof y=="string"&&y!==""||typeof y=="number")return y=oh(""+y,A.mode,E),y.return=A,y;if(typeof y=="object"&&y!==null){switch(y.$$typeof){case eu:return E=Ou(y.type,y.key,y.props,null,A.mode,E),E.ref=ea(A,null,y),E.return=A,E;case Si:return y=ah(y,A.mode,E),y.return=A,y;case Or:var D=y._init;return p(A,D(y._payload),E)}if(oa(y)||Qo(y))return y=bs(y,A.mode,E,null),y.return=A,y;du(A,y)}return null}function g(A,y,E,D){var B=y!==null?y.key:null;if(typeof E=="string"&&E!==""||typeof E=="number")return B!==null?null:l(A,y,""+E,D);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case eu:return E.key===B?u(A,y,E,D):null;case Si:return E.key===B?c(A,y,E,D):null;case Or:return B=E._init,g(A,y,B(E._payload),D)}if(oa(E)||Qo(E))return B!==null?null:f(A,y,E,D,null);du(A,E)}return null}function C(A,y,E,D,B){if(typeof D=="string"&&D!==""||typeof D=="number")return A=A.get(E)||null,l(y,A,""+D,B);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case eu:return A=A.get(D.key===null?E:D.key)||null,u(y,A,D,B);case Si:return A=A.get(D.key===null?E:D.key)||null,c(y,A,D,B);case Or:var $=D._init;return C(A,y,E,$(D._payload),B)}if(oa(D)||Qo(D))return A=A.get(E)||null,f(y,A,D,B,null);du(y,D)}return null}function N(A,y,E,D){for(var B=null,$=null,w=y,_=y=0,I=null;w!==null&&_<E.length;_++){w.index>_?(I=w,w=null):I=w.sibling;var P=g(A,w,E[_],D);if(P===null){w===null&&(w=I);break}t&&w&&P.alternate===null&&e(A,w),y=i(P,y,_),$===null?B=P:$.sibling=P,$=P,w=I}if(_===E.length)return n(A,w),Ve&&Ss(A,_),B;if(w===null){for(;_<E.length;_++)w=p(A,E[_],D),w!==null&&(y=i(w,y,_),$===null?B=w:$.sibling=w,$=w);return Ve&&Ss(A,_),B}for(w=r(A,w);_<E.length;_++)I=C(w,A,_,E[_],D),I!==null&&(t&&I.alternate!==null&&w.delete(I.key===null?_:I.key),y=i(I,y,_),$===null?B=I:$.sibling=I,$=I);return t&&w.forEach(function(T){return e(A,T)}),Ve&&Ss(A,_),B}function b(A,y,E,D){var B=Qo(E);if(typeof B!="function")throw Error(W(150));if(E=B.call(E),E==null)throw Error(W(151));for(var $=B=null,w=y,_=y=0,I=null,P=E.next();w!==null&&!P.done;_++,P=E.next()){w.index>_?(I=w,w=null):I=w.sibling;var T=g(A,w,P.value,D);if(T===null){w===null&&(w=I);break}t&&w&&T.alternate===null&&e(A,w),y=i(T,y,_),$===null?B=T:$.sibling=T,$=T,w=I}if(P.done)return n(A,w),Ve&&Ss(A,_),B;if(w===null){for(;!P.done;_++,P=E.next())P=p(A,P.value,D),P!==null&&(y=i(P,y,_),$===null?B=P:$.sibling=P,$=P);return Ve&&Ss(A,_),B}for(w=r(A,w);!P.done;_++,P=E.next())P=C(w,A,_,P.value,D),P!==null&&(t&&P.alternate!==null&&w.delete(P.key===null?_:P.key),y=i(P,y,_),$===null?B=P:$.sibling=P,$=P);return t&&w.forEach(function(x){return e(A,x)}),Ve&&Ss(A,_),B}function k(A,y,E,D){if(typeof E=="object"&&E!==null&&E.type===Ai&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case eu:e:{for(var B=E.key,$=y;$!==null;){if($.key===B){if(B=E.type,B===Ai){if($.tag===7){n(A,$.sibling),y=s($,E.props.children),y.return=A,A=y;break e}}else if($.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===Or&&ty(B)===$.type){n(A,$.sibling),y=s($,E.props),y.ref=ea(A,$,E),y.return=A,A=y;break e}n(A,$);break}else e(A,$);$=$.sibling}E.type===Ai?(y=bs(E.props.children,A.mode,D,E.key),y.return=A,A=y):(D=Ou(E.type,E.key,E.props,null,A.mode,D),D.ref=ea(A,y,E),D.return=A,A=D)}return o(A);case Si:e:{for($=E.key;y!==null;){if(y.key===$)if(y.tag===4&&y.stateNode.containerInfo===E.containerInfo&&y.stateNode.implementation===E.implementation){n(A,y.sibling),y=s(y,E.children||[]),y.return=A,A=y;break e}else{n(A,y);break}else e(A,y);y=y.sibling}y=ah(E,A.mode,D),y.return=A,A=y}return o(A);case Or:return $=E._init,k(A,y,$(E._payload),D)}if(oa(E))return N(A,y,E,D);if(Qo(E))return b(A,y,E,D);du(A,E)}return typeof E=="string"&&E!==""||typeof E=="number"?(E=""+E,y!==null&&y.tag===6?(n(A,y.sibling),y=s(y,E),y.return=A,A=y):(n(A,y),y=oh(E,A.mode,D),y.return=A,A=y),o(A)):n(A,y)}return k}var Xi=vw(!0),ww=vw(!1),ic=ds(null),oc=null,Di=null,up=null;function cp(){up=Di=oc=null}function dp(t){var e=ic.current;Le(ic),t._currentValue=e}function Zh(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Bi(t,e){oc=t,up=Di=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Wt=!0),t.firstContext=null)}function pn(t){var e=t._currentValue;if(up!==t)if(t={context:t,memoizedValue:e,next:null},Di===null){if(oc===null)throw Error(W(308));Di=t,oc.dependencies={lanes:0,firstContext:t}}else Di=Di.next=t;return e}var ks=null;function hp(t){ks===null?ks=[t]:ks.push(t)}function Ew(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,hp(e)):(n.next=s.next,s.next=n),e.interleaved=n,hr(t,r)}function hr(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Lr=!1;function fp(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Iw(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function ur(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Xr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ve&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,hr(t,n)}return s=r.interleaved,s===null?(e.next=e,hp(r)):(e.next=s.next,s.next=e),r.interleaved=e,hr(t,n)}function ku(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Jf(t,n)}}function ny(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function ac(t,e,n,r){var s=t.updateQueue;Lr=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,c=u.next;u.next=null,o===null?i=c:o.next=c,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=u))}if(i!==null){var p=s.baseState;o=0,f=c=u=null,l=i;do{var g=l.lane,C=l.eventTime;if((r&g)===g){f!==null&&(f=f.next={eventTime:C,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var N=t,b=l;switch(g=e,C=n,b.tag){case 1:if(N=b.payload,typeof N=="function"){p=N.call(C,p,g);break e}p=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=b.payload,g=typeof N=="function"?N.call(C,p,g):N,g==null)break e;p=Ue({},p,g);break e;case 2:Lr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,g=s.effects,g===null?s.effects=[l]:g.push(l))}else C={eventTime:C,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=C,u=p):f=f.next=C,o|=g;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;g=l,l=g.next,g.next=null,s.lastBaseUpdate=g,s.shared.pending=null}}while(!0);if(f===null&&(u=p),s.baseState=u,s.firstBaseUpdate=c,s.lastBaseUpdate=f,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);Us|=o,t.lanes=o,t.memoizedState=p}}function ry(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(W(191,s));s.call(r)}}}var hl={},zn=ds(hl),za=ds(hl),qa=ds(hl);function Ps(t){if(t===hl)throw Error(W(174));return t}function pp(t,e){switch(be(qa,e),be(za,t),be(zn,hl),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Dh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Dh(e,t)}Le(zn),be(zn,e)}function Ji(){Le(zn),Le(za),Le(qa)}function Tw(t){Ps(qa.current);var e=Ps(zn.current),n=Dh(e,t.type);e!==n&&(be(za,t),be(zn,n))}function mp(t){za.current===t&&(Le(zn),Le(za))}var Me=ds(0);function lc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var eh=[];function gp(){for(var t=0;t<eh.length;t++)eh[t]._workInProgressVersionPrimary=null;eh.length=0}var Pu=wr.ReactCurrentDispatcher,th=wr.ReactCurrentBatchConfig,js=0,je=null,rt=null,dt=null,uc=!1,wa=!1,Wa=0,EA=0;function Ct(){throw Error(W(321))}function yp(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Cn(t[n],e[n]))return!1;return!0}function _p(t,e,n,r,s,i){if(js=i,je=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Pu.current=t===null||t.memoizedState===null?AA:RA,t=n(r,s),wa){i=0;do{if(wa=!1,Wa=0,25<=i)throw Error(W(301));i+=1,dt=rt=null,e.updateQueue=null,Pu.current=CA,t=n(r,s)}while(wa)}if(Pu.current=cc,e=rt!==null&&rt.next!==null,js=0,dt=rt=je=null,uc=!1,e)throw Error(W(300));return t}function vp(){var t=Wa!==0;return Wa=0,t}function Vn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dt===null?je.memoizedState=dt=t:dt=dt.next=t,dt}function mn(){if(rt===null){var t=je.alternate;t=t!==null?t.memoizedState:null}else t=rt.next;var e=dt===null?je.memoizedState:dt.next;if(e!==null)dt=e,rt=t;else{if(t===null)throw Error(W(310));rt=t,t={memoizedState:rt.memoizedState,baseState:rt.baseState,baseQueue:rt.baseQueue,queue:rt.queue,next:null},dt===null?je.memoizedState=dt=t:dt=dt.next=t}return dt}function Ha(t,e){return typeof e=="function"?e(t):e}function nh(t){var e=mn(),n=e.queue;if(n===null)throw Error(W(311));n.lastRenderedReducer=t;var r=rt,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,u=null,c=i;do{var f=c.lane;if((js&f)===f)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var p={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=p,o=r):u=u.next=p,je.lanes|=f,Us|=f}c=c.next}while(c!==null&&c!==i);u===null?o=r:u.next=l,Cn(r,e.memoizedState)||(Wt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,je.lanes|=i,Us|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function rh(t){var e=mn(),n=e.queue;if(n===null)throw Error(W(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);Cn(i,e.memoizedState)||(Wt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function Sw(){}function Aw(t,e){var n=je,r=mn(),s=e(),i=!Cn(r.memoizedState,s);if(i&&(r.memoizedState=s,Wt=!0),r=r.queue,wp(kw.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||dt!==null&&dt.memoizedState.tag&1){if(n.flags|=2048,Ga(9,Cw.bind(null,n,r,s,e),void 0,null),ft===null)throw Error(W(349));js&30||Rw(n,e,s)}return s}function Rw(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=je.updateQueue,e===null?(e={lastEffect:null,stores:null},je.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Cw(t,e,n,r){e.value=n,e.getSnapshot=r,Pw(e)&&Nw(t)}function kw(t,e,n){return n(function(){Pw(e)&&Nw(t)})}function Pw(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Cn(t,n)}catch{return!0}}function Nw(t){var e=hr(t,1);e!==null&&Rn(e,t,1,-1)}function sy(t){var e=Vn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:t},e.queue=t,t=t.dispatch=SA.bind(null,je,t),[e.memoizedState,t]}function Ga(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=je.updateQueue,e===null?(e={lastEffect:null,stores:null},je.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function xw(){return mn().memoizedState}function Nu(t,e,n,r){var s=Vn();je.flags|=t,s.memoizedState=Ga(1|e,n,void 0,r===void 0?null:r)}function Uc(t,e,n,r){var s=mn();r=r===void 0?null:r;var i=void 0;if(rt!==null){var o=rt.memoizedState;if(i=o.destroy,r!==null&&yp(r,o.deps)){s.memoizedState=Ga(e,n,i,r);return}}je.flags|=t,s.memoizedState=Ga(1|e,n,i,r)}function iy(t,e){return Nu(8390656,8,t,e)}function wp(t,e){return Uc(2048,8,t,e)}function bw(t,e){return Uc(4,2,t,e)}function Dw(t,e){return Uc(4,4,t,e)}function Ow(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Lw(t,e,n){return n=n!=null?n.concat([t]):null,Uc(4,4,Ow.bind(null,e,t),n)}function Ep(){}function Vw(t,e){var n=mn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&yp(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Mw(t,e){var n=mn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&yp(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function jw(t,e,n){return js&21?(Cn(n,e)||(n=zv(),je.lanes|=n,Us|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Wt=!0),t.memoizedState=n)}function IA(t,e){var n=ke;ke=n!==0&&4>n?n:4,t(!0);var r=th.transition;th.transition={};try{t(!1),e()}finally{ke=n,th.transition=r}}function Uw(){return mn().memoizedState}function TA(t,e,n){var r=Zr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Fw(t))Bw(e,n);else if(n=Ew(t,e,n,r),n!==null){var s=jt();Rn(n,t,r,s),$w(n,e,r)}}function SA(t,e,n){var r=Zr(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Fw(t))Bw(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,Cn(l,o)){var u=e.interleaved;u===null?(s.next=s,hp(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=Ew(t,e,s,r),n!==null&&(s=jt(),Rn(n,t,r,s),$w(n,e,r))}}function Fw(t){var e=t.alternate;return t===je||e!==null&&e===je}function Bw(t,e){wa=uc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function $w(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Jf(t,n)}}var cc={readContext:pn,useCallback:Ct,useContext:Ct,useEffect:Ct,useImperativeHandle:Ct,useInsertionEffect:Ct,useLayoutEffect:Ct,useMemo:Ct,useReducer:Ct,useRef:Ct,useState:Ct,useDebugValue:Ct,useDeferredValue:Ct,useTransition:Ct,useMutableSource:Ct,useSyncExternalStore:Ct,useId:Ct,unstable_isNewReconciler:!1},AA={readContext:pn,useCallback:function(t,e){return Vn().memoizedState=[t,e===void 0?null:e],t},useContext:pn,useEffect:iy,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Nu(4194308,4,Ow.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Nu(4194308,4,t,e)},useInsertionEffect:function(t,e){return Nu(4,2,t,e)},useMemo:function(t,e){var n=Vn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Vn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=TA.bind(null,je,t),[r.memoizedState,t]},useRef:function(t){var e=Vn();return t={current:t},e.memoizedState=t},useState:sy,useDebugValue:Ep,useDeferredValue:function(t){return Vn().memoizedState=t},useTransition:function(){var t=sy(!1),e=t[0];return t=IA.bind(null,t[1]),Vn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=je,s=Vn();if(Ve){if(n===void 0)throw Error(W(407));n=n()}else{if(n=e(),ft===null)throw Error(W(349));js&30||Rw(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,iy(kw.bind(null,r,i,t),[t]),r.flags|=2048,Ga(9,Cw.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=Vn(),e=ft.identifierPrefix;if(Ve){var n=sr,r=rr;n=(r&~(1<<32-An(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Wa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=EA++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},RA={readContext:pn,useCallback:Vw,useContext:pn,useEffect:wp,useImperativeHandle:Lw,useInsertionEffect:bw,useLayoutEffect:Dw,useMemo:Mw,useReducer:nh,useRef:xw,useState:function(){return nh(Ha)},useDebugValue:Ep,useDeferredValue:function(t){var e=mn();return jw(e,rt.memoizedState,t)},useTransition:function(){var t=nh(Ha)[0],e=mn().memoizedState;return[t,e]},useMutableSource:Sw,useSyncExternalStore:Aw,useId:Uw,unstable_isNewReconciler:!1},CA={readContext:pn,useCallback:Vw,useContext:pn,useEffect:wp,useImperativeHandle:Lw,useInsertionEffect:bw,useLayoutEffect:Dw,useMemo:Mw,useReducer:rh,useRef:xw,useState:function(){return rh(Ha)},useDebugValue:Ep,useDeferredValue:function(t){var e=mn();return rt===null?e.memoizedState=t:jw(e,rt.memoizedState,t)},useTransition:function(){var t=rh(Ha)[0],e=mn().memoizedState;return[t,e]},useMutableSource:Sw,useSyncExternalStore:Aw,useId:Uw,unstable_isNewReconciler:!1};function In(t,e){if(t&&t.defaultProps){e=Ue({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function ef(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ue({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Fc={isMounted:function(t){return(t=t._reactInternals)?Qs(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=jt(),s=Zr(t),i=ur(r,s);i.payload=e,n!=null&&(i.callback=n),e=Xr(t,i,s),e!==null&&(Rn(e,t,s,r),ku(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=jt(),s=Zr(t),i=ur(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=Xr(t,i,s),e!==null&&(Rn(e,t,s,r),ku(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=jt(),r=Zr(t),s=ur(n,r);s.tag=2,e!=null&&(s.callback=e),e=Xr(t,s,r),e!==null&&(Rn(e,t,r,n),ku(e,t,r))}};function oy(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!Ua(n,r)||!Ua(s,i):!0}function zw(t,e,n){var r=!1,s=is,i=e.contextType;return typeof i=="object"&&i!==null?i=pn(i):(s=Gt(e)?Vs:Dt.current,r=e.contextTypes,i=(r=r!=null)?Qi(t,s):is),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Fc,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function ay(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Fc.enqueueReplaceState(e,e.state,null)}function tf(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},fp(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=pn(i):(i=Gt(e)?Vs:Dt.current,s.context=Qi(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(ef(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Fc.enqueueReplaceState(s,s.state,null),ac(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Zi(t,e){try{var n="",r=e;do n+=tS(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function sh(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function nf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var kA=typeof WeakMap=="function"?WeakMap:Map;function qw(t,e,n){n=ur(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){hc||(hc=!0,ff=r),nf(t,e)},n}function Ww(t,e,n){n=ur(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){nf(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){nf(t,e),typeof r!="function"&&(Jr===null?Jr=new Set([this]):Jr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function ly(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new kA;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=$A.bind(null,t,e,n),e.then(t,t))}function uy(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function cy(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=ur(-1,1),e.tag=2,Xr(n,e,1))),n.lanes|=1),t)}var PA=wr.ReactCurrentOwner,Wt=!1;function Vt(t,e,n,r){e.child=t===null?ww(e,null,n,r):Xi(e,t.child,n,r)}function dy(t,e,n,r,s){n=n.render;var i=e.ref;return Bi(e,s),r=_p(t,e,n,r,i,s),n=vp(),t!==null&&!Wt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,fr(t,e,s)):(Ve&&n&&op(e),e.flags|=1,Vt(t,e,r,s),e.child)}function hy(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!Pp(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,Hw(t,e,i,r,s)):(t=Ou(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Ua,n(o,r)&&t.ref===e.ref)return fr(t,e,s)}return e.flags|=1,t=es(i,r),t.ref=e.ref,t.return=e,e.child=t}function Hw(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(Ua(i,r)&&t.ref===e.ref)if(Wt=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(Wt=!0);else return e.lanes=t.lanes,fr(t,e,s)}return rf(t,e,n,r,s)}function Gw(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},be(Li,Xt),Xt|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,be(Li,Xt),Xt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,be(Li,Xt),Xt|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,be(Li,Xt),Xt|=r;return Vt(t,e,s,n),e.child}function Kw(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function rf(t,e,n,r,s){var i=Gt(n)?Vs:Dt.current;return i=Qi(e,i),Bi(e,s),n=_p(t,e,n,r,i,s),r=vp(),t!==null&&!Wt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,fr(t,e,s)):(Ve&&r&&op(e),e.flags|=1,Vt(t,e,n,s),e.child)}function fy(t,e,n,r,s){if(Gt(n)){var i=!0;nc(e)}else i=!1;if(Bi(e,s),e.stateNode===null)xu(t,e),zw(e,n,r),tf(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=pn(c):(c=Gt(n)?Vs:Dt.current,c=Qi(e,c));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==c)&&ay(e,o,r,c),Lr=!1;var g=e.memoizedState;o.state=g,ac(e,r,o,s),u=e.memoizedState,l!==r||g!==u||Ht.current||Lr?(typeof f=="function"&&(ef(e,n,f,r),u=e.memoizedState),(l=Lr||oy(e,n,l,r,g,u,c))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Iw(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:In(e.type,l),o.props=c,p=e.pendingProps,g=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=pn(u):(u=Gt(n)?Vs:Dt.current,u=Qi(e,u));var C=n.getDerivedStateFromProps;(f=typeof C=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==p||g!==u)&&ay(e,o,r,u),Lr=!1,g=e.memoizedState,o.state=g,ac(e,r,o,s);var N=e.memoizedState;l!==p||g!==N||Ht.current||Lr?(typeof C=="function"&&(ef(e,n,C,r),N=e.memoizedState),(c=Lr||oy(e,n,c,r,g,N,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,N,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,N,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=N),o.props=r,o.state=N,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return sf(t,e,n,r,i,s)}function sf(t,e,n,r,s,i){Kw(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&Jg(e,n,!1),fr(t,e,i);r=e.stateNode,PA.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Xi(e,t.child,null,i),e.child=Xi(e,null,l,i)):Vt(t,e,l,i),e.memoizedState=r.state,s&&Jg(e,n,!0),e.child}function Qw(t){var e=t.stateNode;e.pendingContext?Xg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Xg(t,e.context,!1),pp(t,e.containerInfo)}function py(t,e,n,r,s){return Yi(),lp(s),e.flags|=256,Vt(t,e,n,r),e.child}var of={dehydrated:null,treeContext:null,retryLane:0};function af(t){return{baseLanes:t,cachePool:null,transitions:null}}function Yw(t,e,n){var r=e.pendingProps,s=Me.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),be(Me,s&1),t===null)return Jh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=zc(o,r,0,null),t=bs(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=af(n),e.memoizedState=of,t):Ip(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return NA(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=es(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=es(l,i):(i=bs(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?af(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=of,r}return i=t.child,t=i.sibling,r=es(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Ip(t,e){return e=zc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function hu(t,e,n,r){return r!==null&&lp(r),Xi(e,t.child,null,n),t=Ip(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function NA(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=sh(Error(W(422))),hu(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=zc({mode:"visible",children:r.children},s,0,null),i=bs(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&Xi(e,t.child,null,o),e.child.memoizedState=af(o),e.memoizedState=of,i);if(!(e.mode&1))return hu(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(W(419)),r=sh(i,r,void 0),hu(t,e,o,r)}if(l=(o&t.childLanes)!==0,Wt||l){if(r=ft,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,hr(t,s),Rn(r,t,s,-1))}return kp(),r=sh(Error(W(421))),hu(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=zA.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,Jt=Yr(s.nextSibling),tn=e,Ve=!0,Sn=null,t!==null&&(un[cn++]=rr,un[cn++]=sr,un[cn++]=Ms,rr=t.id,sr=t.overflow,Ms=e),e=Ip(e,r.children),e.flags|=4096,e)}function my(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Zh(t.return,e,n)}function ih(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Xw(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(Vt(t,e,r.children,n),r=Me.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&my(t,n,e);else if(t.tag===19)my(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(be(Me,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&lc(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),ih(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&lc(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}ih(e,!0,n,null,i);break;case"together":ih(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function xu(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function fr(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Us|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(W(153));if(e.child!==null){for(t=e.child,n=es(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=es(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function xA(t,e,n){switch(e.tag){case 3:Qw(e),Yi();break;case 5:Tw(e);break;case 1:Gt(e.type)&&nc(e);break;case 4:pp(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;be(ic,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(be(Me,Me.current&1),e.flags|=128,null):n&e.child.childLanes?Yw(t,e,n):(be(Me,Me.current&1),t=fr(t,e,n),t!==null?t.sibling:null);be(Me,Me.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Xw(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),be(Me,Me.current),r)break;return null;case 22:case 23:return e.lanes=0,Gw(t,e,n)}return fr(t,e,n)}var Jw,lf,Zw,eE;Jw=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};lf=function(){};Zw=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,Ps(zn.current);var i=null;switch(n){case"input":s=Ph(t,s),r=Ph(t,r),i=[];break;case"select":s=Ue({},s,{value:void 0}),r=Ue({},r,{value:void 0}),i=[];break;case"textarea":s=bh(t,s),r=bh(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=ec)}Oh(n,r);var o;n=null;for(c in s)if(!r.hasOwnProperty(c)&&s.hasOwnProperty(c)&&s[c]!=null)if(c==="style"){var l=s[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ba.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var u=r[c];if(l=s!=null?s[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ba.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&Oe("scroll",t),i||l===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(e.updateQueue=c)&&(e.flags|=4)}};eE=function(t,e,n,r){n!==r&&(e.flags|=4)};function ta(t,e){if(!Ve)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function kt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function bA(t,e,n){var r=e.pendingProps;switch(ap(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return kt(e),null;case 1:return Gt(e.type)&&tc(),kt(e),null;case 3:return r=e.stateNode,Ji(),Le(Ht),Le(Dt),gp(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(cu(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Sn!==null&&(gf(Sn),Sn=null))),lf(t,e),kt(e),null;case 5:mp(e);var s=Ps(qa.current);if(n=e.type,t!==null&&e.stateNode!=null)Zw(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(W(166));return kt(e),null}if(t=Ps(zn.current),cu(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[jn]=e,r[$a]=i,t=(e.mode&1)!==0,n){case"dialog":Oe("cancel",r),Oe("close",r);break;case"iframe":case"object":case"embed":Oe("load",r);break;case"video":case"audio":for(s=0;s<la.length;s++)Oe(la[s],r);break;case"source":Oe("error",r);break;case"img":case"image":case"link":Oe("error",r),Oe("load",r);break;case"details":Oe("toggle",r);break;case"input":Sg(r,i),Oe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Oe("invalid",r);break;case"textarea":Rg(r,i),Oe("invalid",r)}Oh(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&uu(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&uu(r.textContent,l,t),s=["children",""+l]):ba.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&Oe("scroll",r)}switch(n){case"input":tu(r),Ag(r,i,!0);break;case"textarea":tu(r),Cg(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=ec)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=kv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[jn]=e,t[$a]=r,Jw(t,e,!1,!1),e.stateNode=t;e:{switch(o=Lh(n,r),n){case"dialog":Oe("cancel",t),Oe("close",t),s=r;break;case"iframe":case"object":case"embed":Oe("load",t),s=r;break;case"video":case"audio":for(s=0;s<la.length;s++)Oe(la[s],t);s=r;break;case"source":Oe("error",t),s=r;break;case"img":case"image":case"link":Oe("error",t),Oe("load",t),s=r;break;case"details":Oe("toggle",t),s=r;break;case"input":Sg(t,r),s=Ph(t,r),Oe("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=Ue({},r,{value:void 0}),Oe("invalid",t);break;case"textarea":Rg(t,r),s=bh(t,r),Oe("invalid",t);break;default:s=r}Oh(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?xv(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Pv(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Da(t,u):typeof u=="number"&&Da(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(ba.hasOwnProperty(i)?u!=null&&i==="onScroll"&&Oe("scroll",t):u!=null&&Hf(t,i,u,o))}switch(n){case"input":tu(t),Ag(t,r,!1);break;case"textarea":tu(t),Cg(t);break;case"option":r.value!=null&&t.setAttribute("value",""+ss(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?Mi(t,!!r.multiple,i,!1):r.defaultValue!=null&&Mi(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=ec)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return kt(e),null;case 6:if(t&&e.stateNode!=null)eE(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(W(166));if(n=Ps(qa.current),Ps(zn.current),cu(e)){if(r=e.stateNode,n=e.memoizedProps,r[jn]=e,(i=r.nodeValue!==n)&&(t=tn,t!==null))switch(t.tag){case 3:uu(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&uu(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[jn]=e,e.stateNode=r}return kt(e),null;case 13:if(Le(Me),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ve&&Jt!==null&&e.mode&1&&!(e.flags&128))_w(),Yi(),e.flags|=98560,i=!1;else if(i=cu(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(W(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(W(317));i[jn]=e}else Yi(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;kt(e),i=!1}else Sn!==null&&(gf(Sn),Sn=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Me.current&1?st===0&&(st=3):kp())),e.updateQueue!==null&&(e.flags|=4),kt(e),null);case 4:return Ji(),lf(t,e),t===null&&Fa(e.stateNode.containerInfo),kt(e),null;case 10:return dp(e.type._context),kt(e),null;case 17:return Gt(e.type)&&tc(),kt(e),null;case 19:if(Le(Me),i=e.memoizedState,i===null)return kt(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)ta(i,!1);else{if(st!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=lc(t),o!==null){for(e.flags|=128,ta(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return be(Me,Me.current&1|2),e.child}t=t.sibling}i.tail!==null&&Ke()>eo&&(e.flags|=128,r=!0,ta(i,!1),e.lanes=4194304)}else{if(!r)if(t=lc(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ta(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!Ve)return kt(e),null}else 2*Ke()-i.renderingStartTime>eo&&n!==1073741824&&(e.flags|=128,r=!0,ta(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Ke(),e.sibling=null,n=Me.current,be(Me,r?n&1|2:n&1),e):(kt(e),null);case 22:case 23:return Cp(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Xt&1073741824&&(kt(e),e.subtreeFlags&6&&(e.flags|=8192)):kt(e),null;case 24:return null;case 25:return null}throw Error(W(156,e.tag))}function DA(t,e){switch(ap(e),e.tag){case 1:return Gt(e.type)&&tc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ji(),Le(Ht),Le(Dt),gp(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return mp(e),null;case 13:if(Le(Me),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(W(340));Yi()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Le(Me),null;case 4:return Ji(),null;case 10:return dp(e.type._context),null;case 22:case 23:return Cp(),null;case 24:return null;default:return null}}var fu=!1,xt=!1,OA=typeof WeakSet=="function"?WeakSet:Set,Z=null;function Oi(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){$e(t,e,r)}else n.current=null}function uf(t,e,n){try{n()}catch(r){$e(t,e,r)}}var gy=!1;function LA(t,e){if(Wh=Xu,t=iw(),ip(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,c=0,f=0,p=t,g=null;t:for(;;){for(var C;p!==n||s!==0&&p.nodeType!==3||(l=o+s),p!==i||r!==0&&p.nodeType!==3||(u=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(C=p.firstChild)!==null;)g=p,p=C;for(;;){if(p===t)break t;if(g===n&&++c===s&&(l=o),g===i&&++f===r&&(u=o),(C=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=C}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Hh={focusedElem:t,selectionRange:n},Xu=!1,Z=e;Z!==null;)if(e=Z,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Z=t;else for(;Z!==null;){e=Z;try{var N=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(N!==null){var b=N.memoizedProps,k=N.memoizedState,A=e.stateNode,y=A.getSnapshotBeforeUpdate(e.elementType===e.type?b:In(e.type,b),k);A.__reactInternalSnapshotBeforeUpdate=y}break;case 3:var E=e.stateNode.containerInfo;E.nodeType===1?E.textContent="":E.nodeType===9&&E.documentElement&&E.removeChild(E.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(W(163))}}catch(D){$e(e,e.return,D)}if(t=e.sibling,t!==null){t.return=e.return,Z=t;break}Z=e.return}return N=gy,gy=!1,N}function Ea(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&uf(e,n,i)}s=s.next}while(s!==r)}}function Bc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function cf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function tE(t){var e=t.alternate;e!==null&&(t.alternate=null,tE(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[jn],delete e[$a],delete e[Qh],delete e[yA],delete e[_A])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function nE(t){return t.tag===5||t.tag===3||t.tag===4}function yy(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||nE(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function df(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ec));else if(r!==4&&(t=t.child,t!==null))for(df(t,e,n),t=t.sibling;t!==null;)df(t,e,n),t=t.sibling}function hf(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(hf(t,e,n),t=t.sibling;t!==null;)hf(t,e,n),t=t.sibling}var mt=null,Tn=!1;function br(t,e,n){for(n=n.child;n!==null;)rE(t,e,n),n=n.sibling}function rE(t,e,n){if($n&&typeof $n.onCommitFiberUnmount=="function")try{$n.onCommitFiberUnmount(Dc,n)}catch{}switch(n.tag){case 5:xt||Oi(n,e);case 6:var r=mt,s=Tn;mt=null,br(t,e,n),mt=r,Tn=s,mt!==null&&(Tn?(t=mt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):mt.removeChild(n.stateNode));break;case 18:mt!==null&&(Tn?(t=mt,n=n.stateNode,t.nodeType===8?Jd(t.parentNode,n):t.nodeType===1&&Jd(t,n),Ma(t)):Jd(mt,n.stateNode));break;case 4:r=mt,s=Tn,mt=n.stateNode.containerInfo,Tn=!0,br(t,e,n),mt=r,Tn=s;break;case 0:case 11:case 14:case 15:if(!xt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&uf(n,e,o),s=s.next}while(s!==r)}br(t,e,n);break;case 1:if(!xt&&(Oi(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){$e(n,e,l)}br(t,e,n);break;case 21:br(t,e,n);break;case 22:n.mode&1?(xt=(r=xt)||n.memoizedState!==null,br(t,e,n),xt=r):br(t,e,n);break;default:br(t,e,n)}}function _y(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new OA),e.forEach(function(r){var s=qA.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function En(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:mt=l.stateNode,Tn=!1;break e;case 3:mt=l.stateNode.containerInfo,Tn=!0;break e;case 4:mt=l.stateNode.containerInfo,Tn=!0;break e}l=l.return}if(mt===null)throw Error(W(160));rE(i,o,s),mt=null,Tn=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(c){$e(s,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)sE(e,t),e=e.sibling}function sE(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(En(e,t),Ln(t),r&4){try{Ea(3,t,t.return),Bc(3,t)}catch(b){$e(t,t.return,b)}try{Ea(5,t,t.return)}catch(b){$e(t,t.return,b)}}break;case 1:En(e,t),Ln(t),r&512&&n!==null&&Oi(n,n.return);break;case 5:if(En(e,t),Ln(t),r&512&&n!==null&&Oi(n,n.return),t.flags&32){var s=t.stateNode;try{Da(s,"")}catch(b){$e(t,t.return,b)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Rv(s,i),Lh(l,o);var c=Lh(l,i);for(o=0;o<u.length;o+=2){var f=u[o],p=u[o+1];f==="style"?xv(s,p):f==="dangerouslySetInnerHTML"?Pv(s,p):f==="children"?Da(s,p):Hf(s,f,p,c)}switch(l){case"input":Nh(s,i);break;case"textarea":Cv(s,i);break;case"select":var g=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var C=i.value;C!=null?Mi(s,!!i.multiple,C,!1):g!==!!i.multiple&&(i.defaultValue!=null?Mi(s,!!i.multiple,i.defaultValue,!0):Mi(s,!!i.multiple,i.multiple?[]:"",!1))}s[$a]=i}catch(b){$e(t,t.return,b)}}break;case 6:if(En(e,t),Ln(t),r&4){if(t.stateNode===null)throw Error(W(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(b){$e(t,t.return,b)}}break;case 3:if(En(e,t),Ln(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ma(e.containerInfo)}catch(b){$e(t,t.return,b)}break;case 4:En(e,t),Ln(t);break;case 13:En(e,t),Ln(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Ap=Ke())),r&4&&_y(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(xt=(c=xt)||f,En(e,t),xt=c):En(e,t),Ln(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(Z=t,f=t.child;f!==null;){for(p=Z=f;Z!==null;){switch(g=Z,C=g.child,g.tag){case 0:case 11:case 14:case 15:Ea(4,g,g.return);break;case 1:Oi(g,g.return);var N=g.stateNode;if(typeof N.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,N.props=e.memoizedProps,N.state=e.memoizedState,N.componentWillUnmount()}catch(b){$e(r,n,b)}}break;case 5:Oi(g,g.return);break;case 22:if(g.memoizedState!==null){wy(p);continue}}C!==null?(C.return=g,Z=C):wy(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{s=p.stateNode,c?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=p.stateNode,u=p.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Nv("display",o))}catch(b){$e(t,t.return,b)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(b){$e(t,t.return,b)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:En(e,t),Ln(t),r&4&&_y(t);break;case 21:break;default:En(e,t),Ln(t)}}function Ln(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(nE(n)){var r=n;break e}n=n.return}throw Error(W(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Da(s,""),r.flags&=-33);var i=yy(t);hf(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=yy(t);df(t,l,o);break;default:throw Error(W(161))}}catch(u){$e(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function VA(t,e,n){Z=t,iE(t)}function iE(t,e,n){for(var r=(t.mode&1)!==0;Z!==null;){var s=Z,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||fu;if(!o){var l=s.alternate,u=l!==null&&l.memoizedState!==null||xt;l=fu;var c=xt;if(fu=o,(xt=u)&&!c)for(Z=s;Z!==null;)o=Z,u=o.child,o.tag===22&&o.memoizedState!==null?Ey(s):u!==null?(u.return=o,Z=u):Ey(s);for(;i!==null;)Z=i,iE(i),i=i.sibling;Z=s,fu=l,xt=c}vy(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,Z=i):vy(t)}}function vy(t){for(;Z!==null;){var e=Z;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:xt||Bc(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!xt)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:In(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&ry(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}ry(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Ma(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(W(163))}xt||e.flags&512&&cf(e)}catch(g){$e(e,e.return,g)}}if(e===t){Z=null;break}if(n=e.sibling,n!==null){n.return=e.return,Z=n;break}Z=e.return}}function wy(t){for(;Z!==null;){var e=Z;if(e===t){Z=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Z=n;break}Z=e.return}}function Ey(t){for(;Z!==null;){var e=Z;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Bc(4,e)}catch(u){$e(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){$e(e,s,u)}}var i=e.return;try{cf(e)}catch(u){$e(e,i,u)}break;case 5:var o=e.return;try{cf(e)}catch(u){$e(e,o,u)}}}catch(u){$e(e,e.return,u)}if(e===t){Z=null;break}var l=e.sibling;if(l!==null){l.return=e.return,Z=l;break}Z=e.return}}var MA=Math.ceil,dc=wr.ReactCurrentDispatcher,Tp=wr.ReactCurrentOwner,hn=wr.ReactCurrentBatchConfig,ve=0,ft=null,et=null,vt=0,Xt=0,Li=ds(0),st=0,Ka=null,Us=0,$c=0,Sp=0,Ia=null,qt=null,Ap=0,eo=1/0,tr=null,hc=!1,ff=null,Jr=null,pu=!1,qr=null,fc=0,Ta=0,pf=null,bu=-1,Du=0;function jt(){return ve&6?Ke():bu!==-1?bu:bu=Ke()}function Zr(t){return t.mode&1?ve&2&&vt!==0?vt&-vt:wA.transition!==null?(Du===0&&(Du=zv()),Du):(t=ke,t!==0||(t=window.event,t=t===void 0?16:Yv(t.type)),t):1}function Rn(t,e,n,r){if(50<Ta)throw Ta=0,pf=null,Error(W(185));ul(t,n,r),(!(ve&2)||t!==ft)&&(t===ft&&(!(ve&2)&&($c|=n),st===4&&Mr(t,vt)),Kt(t,r),n===1&&ve===0&&!(e.mode&1)&&(eo=Ke()+500,jc&&hs()))}function Kt(t,e){var n=t.callbackNode;wS(t,e);var r=Yu(t,t===ft?vt:0);if(r===0)n!==null&&Ng(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Ng(n),e===1)t.tag===0?vA(Iy.bind(null,t)):mw(Iy.bind(null,t)),mA(function(){!(ve&6)&&hs()}),n=null;else{switch(qv(r)){case 1:n=Xf;break;case 4:n=Bv;break;case 16:n=Qu;break;case 536870912:n=$v;break;default:n=Qu}n=fE(n,oE.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function oE(t,e){if(bu=-1,Du=0,ve&6)throw Error(W(327));var n=t.callbackNode;if($i()&&t.callbackNode!==n)return null;var r=Yu(t,t===ft?vt:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=pc(t,r);else{e=r;var s=ve;ve|=2;var i=lE();(ft!==t||vt!==e)&&(tr=null,eo=Ke()+500,xs(t,e));do try{FA();break}catch(l){aE(t,l)}while(!0);cp(),dc.current=i,ve=s,et!==null?e=0:(ft=null,vt=0,e=st)}if(e!==0){if(e===2&&(s=Fh(t),s!==0&&(r=s,e=mf(t,s))),e===1)throw n=Ka,xs(t,0),Mr(t,r),Kt(t,Ke()),n;if(e===6)Mr(t,r);else{if(s=t.current.alternate,!(r&30)&&!jA(s)&&(e=pc(t,r),e===2&&(i=Fh(t),i!==0&&(r=i,e=mf(t,i))),e===1))throw n=Ka,xs(t,0),Mr(t,r),Kt(t,Ke()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(W(345));case 2:As(t,qt,tr);break;case 3:if(Mr(t,r),(r&130023424)===r&&(e=Ap+500-Ke(),10<e)){if(Yu(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){jt(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Kh(As.bind(null,t,qt,tr),e);break}As(t,qt,tr);break;case 4:if(Mr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-An(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=Ke()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*MA(r/1960))-r,10<r){t.timeoutHandle=Kh(As.bind(null,t,qt,tr),r);break}As(t,qt,tr);break;case 5:As(t,qt,tr);break;default:throw Error(W(329))}}}return Kt(t,Ke()),t.callbackNode===n?oE.bind(null,t):null}function mf(t,e){var n=Ia;return t.current.memoizedState.isDehydrated&&(xs(t,e).flags|=256),t=pc(t,e),t!==2&&(e=qt,qt=n,e!==null&&gf(e)),t}function gf(t){qt===null?qt=t:qt.push.apply(qt,t)}function jA(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Cn(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Mr(t,e){for(e&=~Sp,e&=~$c,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-An(e),r=1<<n;t[n]=-1,e&=~r}}function Iy(t){if(ve&6)throw Error(W(327));$i();var e=Yu(t,0);if(!(e&1))return Kt(t,Ke()),null;var n=pc(t,e);if(t.tag!==0&&n===2){var r=Fh(t);r!==0&&(e=r,n=mf(t,r))}if(n===1)throw n=Ka,xs(t,0),Mr(t,e),Kt(t,Ke()),n;if(n===6)throw Error(W(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,As(t,qt,tr),Kt(t,Ke()),null}function Rp(t,e){var n=ve;ve|=1;try{return t(e)}finally{ve=n,ve===0&&(eo=Ke()+500,jc&&hs())}}function Fs(t){qr!==null&&qr.tag===0&&!(ve&6)&&$i();var e=ve;ve|=1;var n=hn.transition,r=ke;try{if(hn.transition=null,ke=1,t)return t()}finally{ke=r,hn.transition=n,ve=e,!(ve&6)&&hs()}}function Cp(){Xt=Li.current,Le(Li)}function xs(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,pA(n)),et!==null)for(n=et.return;n!==null;){var r=n;switch(ap(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&tc();break;case 3:Ji(),Le(Ht),Le(Dt),gp();break;case 5:mp(r);break;case 4:Ji();break;case 13:Le(Me);break;case 19:Le(Me);break;case 10:dp(r.type._context);break;case 22:case 23:Cp()}n=n.return}if(ft=t,et=t=es(t.current,null),vt=Xt=e,st=0,Ka=null,Sp=$c=Us=0,qt=Ia=null,ks!==null){for(e=0;e<ks.length;e++)if(n=ks[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}ks=null}return t}function aE(t,e){do{var n=et;try{if(cp(),Pu.current=cc,uc){for(var r=je.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}uc=!1}if(js=0,dt=rt=je=null,wa=!1,Wa=0,Tp.current=null,n===null||n.return===null){st=1,Ka=e,et=null;break}e:{var i=t,o=n.return,l=n,u=e;if(e=vt,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,f=l,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var g=f.alternate;g?(f.updateQueue=g.updateQueue,f.memoizedState=g.memoizedState,f.lanes=g.lanes):(f.updateQueue=null,f.memoizedState=null)}var C=uy(o);if(C!==null){C.flags&=-257,cy(C,o,l,i,e),C.mode&1&&ly(i,c,e),e=C,u=c;var N=e.updateQueue;if(N===null){var b=new Set;b.add(u),e.updateQueue=b}else N.add(u);break e}else{if(!(e&1)){ly(i,c,e),kp();break e}u=Error(W(426))}}else if(Ve&&l.mode&1){var k=uy(o);if(k!==null){!(k.flags&65536)&&(k.flags|=256),cy(k,o,l,i,e),lp(Zi(u,l));break e}}i=u=Zi(u,l),st!==4&&(st=2),Ia===null?Ia=[i]:Ia.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var A=qw(i,u,e);ny(i,A);break e;case 1:l=u;var y=i.type,E=i.stateNode;if(!(i.flags&128)&&(typeof y.getDerivedStateFromError=="function"||E!==null&&typeof E.componentDidCatch=="function"&&(Jr===null||!Jr.has(E)))){i.flags|=65536,e&=-e,i.lanes|=e;var D=Ww(i,l,e);ny(i,D);break e}}i=i.return}while(i!==null)}cE(n)}catch(B){e=B,et===n&&n!==null&&(et=n=n.return);continue}break}while(!0)}function lE(){var t=dc.current;return dc.current=cc,t===null?cc:t}function kp(){(st===0||st===3||st===2)&&(st=4),ft===null||!(Us&268435455)&&!($c&268435455)||Mr(ft,vt)}function pc(t,e){var n=ve;ve|=2;var r=lE();(ft!==t||vt!==e)&&(tr=null,xs(t,e));do try{UA();break}catch(s){aE(t,s)}while(!0);if(cp(),ve=n,dc.current=r,et!==null)throw Error(W(261));return ft=null,vt=0,st}function UA(){for(;et!==null;)uE(et)}function FA(){for(;et!==null&&!dS();)uE(et)}function uE(t){var e=hE(t.alternate,t,Xt);t.memoizedProps=t.pendingProps,e===null?cE(t):et=e,Tp.current=null}function cE(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=DA(n,e),n!==null){n.flags&=32767,et=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{st=6,et=null;return}}else if(n=bA(n,e,Xt),n!==null){et=n;return}if(e=e.sibling,e!==null){et=e;return}et=e=t}while(e!==null);st===0&&(st=5)}function As(t,e,n){var r=ke,s=hn.transition;try{hn.transition=null,ke=1,BA(t,e,n,r)}finally{hn.transition=s,ke=r}return null}function BA(t,e,n,r){do $i();while(qr!==null);if(ve&6)throw Error(W(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(W(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(ES(t,i),t===ft&&(et=ft=null,vt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||pu||(pu=!0,fE(Qu,function(){return $i(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=hn.transition,hn.transition=null;var o=ke;ke=1;var l=ve;ve|=4,Tp.current=null,LA(t,n),sE(n,t),aA(Hh),Xu=!!Wh,Hh=Wh=null,t.current=n,VA(n),hS(),ve=l,ke=o,hn.transition=i}else t.current=n;if(pu&&(pu=!1,qr=t,fc=s),i=t.pendingLanes,i===0&&(Jr=null),mS(n.stateNode),Kt(t,Ke()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(hc)throw hc=!1,t=ff,ff=null,t;return fc&1&&t.tag!==0&&$i(),i=t.pendingLanes,i&1?t===pf?Ta++:(Ta=0,pf=t):Ta=0,hs(),null}function $i(){if(qr!==null){var t=qv(fc),e=hn.transition,n=ke;try{if(hn.transition=null,ke=16>t?16:t,qr===null)var r=!1;else{if(t=qr,qr=null,fc=0,ve&6)throw Error(W(331));var s=ve;for(ve|=4,Z=t.current;Z!==null;){var i=Z,o=i.child;if(Z.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(Z=c;Z!==null;){var f=Z;switch(f.tag){case 0:case 11:case 15:Ea(8,f,i)}var p=f.child;if(p!==null)p.return=f,Z=p;else for(;Z!==null;){f=Z;var g=f.sibling,C=f.return;if(tE(f),f===c){Z=null;break}if(g!==null){g.return=C,Z=g;break}Z=C}}}var N=i.alternate;if(N!==null){var b=N.child;if(b!==null){N.child=null;do{var k=b.sibling;b.sibling=null,b=k}while(b!==null)}}Z=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,Z=o;else e:for(;Z!==null;){if(i=Z,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Ea(9,i,i.return)}var A=i.sibling;if(A!==null){A.return=i.return,Z=A;break e}Z=i.return}}var y=t.current;for(Z=y;Z!==null;){o=Z;var E=o.child;if(o.subtreeFlags&2064&&E!==null)E.return=o,Z=E;else e:for(o=y;Z!==null;){if(l=Z,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Bc(9,l)}}catch(B){$e(l,l.return,B)}if(l===o){Z=null;break e}var D=l.sibling;if(D!==null){D.return=l.return,Z=D;break e}Z=l.return}}if(ve=s,hs(),$n&&typeof $n.onPostCommitFiberRoot=="function")try{$n.onPostCommitFiberRoot(Dc,t)}catch{}r=!0}return r}finally{ke=n,hn.transition=e}}return!1}function Ty(t,e,n){e=Zi(n,e),e=qw(t,e,1),t=Xr(t,e,1),e=jt(),t!==null&&(ul(t,1,e),Kt(t,e))}function $e(t,e,n){if(t.tag===3)Ty(t,t,n);else for(;e!==null;){if(e.tag===3){Ty(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Jr===null||!Jr.has(r))){t=Zi(n,t),t=Ww(e,t,1),e=Xr(e,t,1),t=jt(),e!==null&&(ul(e,1,t),Kt(e,t));break}}e=e.return}}function $A(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=jt(),t.pingedLanes|=t.suspendedLanes&n,ft===t&&(vt&n)===n&&(st===4||st===3&&(vt&130023424)===vt&&500>Ke()-Ap?xs(t,0):Sp|=n),Kt(t,e)}function dE(t,e){e===0&&(t.mode&1?(e=su,su<<=1,!(su&130023424)&&(su=4194304)):e=1);var n=jt();t=hr(t,e),t!==null&&(ul(t,e,n),Kt(t,n))}function zA(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),dE(t,n)}function qA(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(W(314))}r!==null&&r.delete(e),dE(t,n)}var hE;hE=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Ht.current)Wt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Wt=!1,xA(t,e,n);Wt=!!(t.flags&131072)}else Wt=!1,Ve&&e.flags&1048576&&gw(e,sc,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;xu(t,e),t=e.pendingProps;var s=Qi(e,Dt.current);Bi(e,n),s=_p(null,e,r,t,s,n);var i=vp();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Gt(r)?(i=!0,nc(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,fp(e),s.updater=Fc,e.stateNode=s,s._reactInternals=e,tf(e,r,t,n),e=sf(null,e,r,!0,i,n)):(e.tag=0,Ve&&i&&op(e),Vt(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(xu(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=HA(r),t=In(r,t),s){case 0:e=rf(null,e,r,t,n);break e;case 1:e=fy(null,e,r,t,n);break e;case 11:e=dy(null,e,r,t,n);break e;case 14:e=hy(null,e,r,In(r.type,t),n);break e}throw Error(W(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:In(r,s),rf(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:In(r,s),fy(t,e,r,s,n);case 3:e:{if(Qw(e),t===null)throw Error(W(387));r=e.pendingProps,i=e.memoizedState,s=i.element,Iw(t,e),ac(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Zi(Error(W(423)),e),e=py(t,e,r,n,s);break e}else if(r!==s){s=Zi(Error(W(424)),e),e=py(t,e,r,n,s);break e}else for(Jt=Yr(e.stateNode.containerInfo.firstChild),tn=e,Ve=!0,Sn=null,n=ww(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Yi(),r===s){e=fr(t,e,n);break e}Vt(t,e,r,n)}e=e.child}return e;case 5:return Tw(e),t===null&&Jh(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Gh(r,s)?o=null:i!==null&&Gh(r,i)&&(e.flags|=32),Kw(t,e),Vt(t,e,o,n),e.child;case 6:return t===null&&Jh(e),null;case 13:return Yw(t,e,n);case 4:return pp(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Xi(e,null,r,n):Vt(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:In(r,s),dy(t,e,r,s,n);case 7:return Vt(t,e,e.pendingProps,n),e.child;case 8:return Vt(t,e,e.pendingProps.children,n),e.child;case 12:return Vt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,be(ic,r._currentValue),r._currentValue=o,i!==null)if(Cn(i.value,o)){if(i.children===s.children&&!Ht.current){e=fr(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=ur(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?u.next=u:(u.next=f.next,f.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Zh(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(W(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Zh(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Vt(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,Bi(e,n),s=pn(s),r=r(s),e.flags|=1,Vt(t,e,r,n),e.child;case 14:return r=e.type,s=In(r,e.pendingProps),s=In(r.type,s),hy(t,e,r,s,n);case 15:return Hw(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:In(r,s),xu(t,e),e.tag=1,Gt(r)?(t=!0,nc(e)):t=!1,Bi(e,n),zw(e,r,s),tf(e,r,s,n),sf(null,e,r,!0,t,n);case 19:return Xw(t,e,n);case 22:return Gw(t,e,n)}throw Error(W(156,e.tag))};function fE(t,e){return Fv(t,e)}function WA(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function dn(t,e,n,r){return new WA(t,e,n,r)}function Pp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function HA(t){if(typeof t=="function")return Pp(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Kf)return 11;if(t===Qf)return 14}return 2}function es(t,e){var n=t.alternate;return n===null?(n=dn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ou(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")Pp(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Ai:return bs(n.children,s,i,e);case Gf:o=8,s|=8;break;case Ah:return t=dn(12,n,e,s|2),t.elementType=Ah,t.lanes=i,t;case Rh:return t=dn(13,n,e,s),t.elementType=Rh,t.lanes=i,t;case Ch:return t=dn(19,n,e,s),t.elementType=Ch,t.lanes=i,t;case Tv:return zc(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ev:o=10;break e;case Iv:o=9;break e;case Kf:o=11;break e;case Qf:o=14;break e;case Or:o=16,r=null;break e}throw Error(W(130,t==null?t:typeof t,""))}return e=dn(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function bs(t,e,n,r){return t=dn(7,t,r,e),t.lanes=n,t}function zc(t,e,n,r){return t=dn(22,t,r,e),t.elementType=Tv,t.lanes=n,t.stateNode={isHidden:!1},t}function oh(t,e,n){return t=dn(6,t,null,e),t.lanes=n,t}function ah(t,e,n){return e=dn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function GA(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Bd(0),this.expirationTimes=Bd(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bd(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Np(t,e,n,r,s,i,o,l,u){return t=new GA(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=dn(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},fp(i),t}function KA(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Si,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function pE(t){if(!t)return is;t=t._reactInternals;e:{if(Qs(t)!==t||t.tag!==1)throw Error(W(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Gt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(W(171))}if(t.tag===1){var n=t.type;if(Gt(n))return pw(t,n,e)}return e}function mE(t,e,n,r,s,i,o,l,u){return t=Np(n,r,!0,t,s,i,o,l,u),t.context=pE(null),n=t.current,r=jt(),s=Zr(n),i=ur(r,s),i.callback=e??null,Xr(n,i,s),t.current.lanes=s,ul(t,s,r),Kt(t,r),t}function qc(t,e,n,r){var s=e.current,i=jt(),o=Zr(s);return n=pE(n),e.context===null?e.context=n:e.pendingContext=n,e=ur(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Xr(s,e,o),t!==null&&(Rn(t,s,o,i),ku(t,s,o)),o}function mc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Sy(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function xp(t,e){Sy(t,e),(t=t.alternate)&&Sy(t,e)}function QA(){return null}var gE=typeof reportError=="function"?reportError:function(t){console.error(t)};function bp(t){this._internalRoot=t}Wc.prototype.render=bp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(W(409));qc(t,e,null,null)};Wc.prototype.unmount=bp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Fs(function(){qc(null,t,null,null)}),e[dr]=null}};function Wc(t){this._internalRoot=t}Wc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Gv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Vr.length&&e!==0&&e<Vr[n].priority;n++);Vr.splice(n,0,t),n===0&&Qv(t)}};function Dp(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Hc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Ay(){}function YA(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var c=mc(o);i.call(c)}}var o=mE(e,r,t,0,null,!1,!1,"",Ay);return t._reactRootContainer=o,t[dr]=o.current,Fa(t.nodeType===8?t.parentNode:t),Fs(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var c=mc(u);l.call(c)}}var u=Np(t,0,!1,null,null,!1,!1,"",Ay);return t._reactRootContainer=u,t[dr]=u.current,Fa(t.nodeType===8?t.parentNode:t),Fs(function(){qc(e,u,n,r)}),u}function Gc(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var u=mc(o);l.call(u)}}qc(e,o,t,s)}else o=YA(n,e,t,s,r);return mc(o)}Wv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=aa(e.pendingLanes);n!==0&&(Jf(e,n|1),Kt(e,Ke()),!(ve&6)&&(eo=Ke()+500,hs()))}break;case 13:Fs(function(){var r=hr(t,1);if(r!==null){var s=jt();Rn(r,t,1,s)}}),xp(t,1)}};Zf=function(t){if(t.tag===13){var e=hr(t,134217728);if(e!==null){var n=jt();Rn(e,t,134217728,n)}xp(t,134217728)}};Hv=function(t){if(t.tag===13){var e=Zr(t),n=hr(t,e);if(n!==null){var r=jt();Rn(n,t,e,r)}xp(t,e)}};Gv=function(){return ke};Kv=function(t,e){var n=ke;try{return ke=t,e()}finally{ke=n}};Mh=function(t,e,n){switch(e){case"input":if(Nh(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=Mc(r);if(!s)throw Error(W(90));Av(r),Nh(r,s)}}}break;case"textarea":Cv(t,n);break;case"select":e=n.value,e!=null&&Mi(t,!!n.multiple,e,!1)}};Ov=Rp;Lv=Fs;var XA={usingClientEntryPoint:!1,Events:[dl,Pi,Mc,bv,Dv,Rp]},na={findFiberByHostInstance:Cs,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},JA={bundleType:na.bundleType,version:na.version,rendererPackageName:na.rendererPackageName,rendererConfig:na.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:wr.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=jv(t),t===null?null:t.stateNode},findFiberByHostInstance:na.findFiberByHostInstance||QA,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var mu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!mu.isDisabled&&mu.supportsFiber)try{Dc=mu.inject(JA),$n=mu}catch{}}on.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=XA;on.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Dp(e))throw Error(W(200));return KA(t,e,null,n)};on.createRoot=function(t,e){if(!Dp(t))throw Error(W(299));var n=!1,r="",s=gE;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=Np(t,1,!1,null,null,n,!1,r,s),t[dr]=e.current,Fa(t.nodeType===8?t.parentNode:t),new bp(e)};on.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(W(188)):(t=Object.keys(t).join(","),Error(W(268,t)));return t=jv(e),t=t===null?null:t.stateNode,t};on.flushSync=function(t){return Fs(t)};on.hydrate=function(t,e,n){if(!Hc(e))throw Error(W(200));return Gc(null,t,e,!0,n)};on.hydrateRoot=function(t,e,n){if(!Dp(t))throw Error(W(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=gE;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=mE(e,null,t,1,n??null,s,!1,i,o),t[dr]=e.current,Fa(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new Wc(e)};on.render=function(t,e,n){if(!Hc(e))throw Error(W(200));return Gc(null,t,e,!1,n)};on.unmountComponentAtNode=function(t){if(!Hc(t))throw Error(W(40));return t._reactRootContainer?(Fs(function(){Gc(null,null,t,!1,function(){t._reactRootContainer=null,t[dr]=null})}),!0):!1};on.unstable_batchedUpdates=Rp;on.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Hc(n))throw Error(W(200));if(t==null||t._reactInternals===void 0)throw Error(W(38));return Gc(t,e,n,!1,r)};on.version="18.3.1-next-f1338f8080-20240426";function yE(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yE)}catch(t){console.error(t)}}yE(),yv.exports=on;var ZA=yv.exports,Ry=ZA;Th.createRoot=Ry.createRoot,Th.hydrateRoot=Ry.hydrateRoot;var Cy={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},eR=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},vE={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,u=s+2<t.length,c=u?t[s+2]:0,f=i>>2,p=(i&3)<<4|l>>4;let g=(l&15)<<2|c>>6,C=c&63;u||(C=64,o||(g=64)),r.push(n[f],n[p],n[g],n[C])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(_E(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):eR(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||c==null||p==null)throw new tR;const g=i<<2|l>>4;if(r.push(g),c!==64){const C=l<<4&240|c>>2;if(r.push(C),p!==64){const N=c<<6&192|p;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class tR extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nR=function(t){const e=_E(t);return vE.encodeByteArray(e,!0)},gc=function(t){return nR(t).replace(/\./g,"")},wE=function(t){try{return vE.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rR(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sR=()=>rR().__FIREBASE_DEFAULTS__,iR=()=>{if(typeof process>"u"||typeof Cy>"u")return;const t=Cy.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},oR=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&wE(t[1]);return e&&JSON.parse(e)},Kc=()=>{try{return sR()||iR()||oR()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},EE=t=>{var e,n;return(n=(e=Kc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},IE=t=>{const e=EE(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},TE=()=>{var t;return(t=Kc())===null||t===void 0?void 0:t.config},SE=t=>{var e;return(e=Kc())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[gc(JSON.stringify(n)),gc(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ot(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lR(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ot())}function uR(){var t;const e=(t=Kc())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function cR(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function dR(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function hR(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function fR(){const t=Ot();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function pR(){return!uR()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function mR(){try{return typeof indexedDB=="object"}catch{return!1}}function gR(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yR="FirebaseError";class Xn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=yR,Object.setPrototypeOf(this,Xn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fl.prototype.create)}}class fl{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?_R(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Xn(s,l,r)}}function _R(t,e){return t.replace(vR,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const vR=/\{\$([^}]+)}/g;function wR(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function to(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(ky(i)&&ky(o)){if(!to(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function ky(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function go(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ua(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ca(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function ER(t,e){const n=new IR(t,e);return n.subscribe.bind(n)}class IR{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");TR(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=lh),s.error===void 0&&(s.error=lh),s.complete===void 0&&(s.complete=lh);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function TR(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function lh(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(t){return t&&t._delegate?t._delegate:t}class os{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SR{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new aR;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(RR(e))try{this.getOrInitializeService({instanceIdentifier:Rs})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Rs){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Rs){return this.instances.has(e)}getOptions(e=Rs){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:AR(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Rs){return this.component?this.component.multipleInstances?e:Rs:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function AR(t){return t===Rs?void 0:t}function RR(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CR{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new SR(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ge||(ge={}));const kR={debug:ge.DEBUG,verbose:ge.VERBOSE,info:ge.INFO,warn:ge.WARN,error:ge.ERROR,silent:ge.SILENT},PR=ge.INFO,NR={[ge.DEBUG]:"log",[ge.VERBOSE]:"log",[ge.INFO]:"info",[ge.WARN]:"warn",[ge.ERROR]:"error"},xR=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=NR[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Op{constructor(e){this.name=e,this._logLevel=PR,this._logHandler=xR,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ge))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?kR[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ge.DEBUG,...e),this._logHandler(this,ge.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ge.VERBOSE,...e),this._logHandler(this,ge.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ge.INFO,...e),this._logHandler(this,ge.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ge.WARN,...e),this._logHandler(this,ge.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ge.ERROR,...e),this._logHandler(this,ge.ERROR,...e)}}const bR=(t,e)=>e.some(n=>t instanceof n);let Py,Ny;function DR(){return Py||(Py=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function OR(){return Ny||(Ny=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const RE=new WeakMap,yf=new WeakMap,CE=new WeakMap,uh=new WeakMap,Lp=new WeakMap;function LR(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(ts(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&RE.set(n,t)}).catch(()=>{}),Lp.set(e,t),e}function VR(t){if(yf.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});yf.set(t,e)}let _f={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return yf.get(t);if(e==="objectStoreNames")return t.objectStoreNames||CE.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ts(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function MR(t){_f=t(_f)}function jR(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ch(this),e,...n);return CE.set(r,e.sort?e.sort():[e]),ts(r)}:OR().includes(t)?function(...e){return t.apply(ch(this),e),ts(RE.get(this))}:function(...e){return ts(t.apply(ch(this),e))}}function UR(t){return typeof t=="function"?jR(t):(t instanceof IDBTransaction&&VR(t),bR(t,DR())?new Proxy(t,_f):t)}function ts(t){if(t instanceof IDBRequest)return LR(t);if(uh.has(t))return uh.get(t);const e=UR(t);return e!==t&&(uh.set(t,e),Lp.set(e,t)),e}const ch=t=>Lp.get(t);function FR(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=ts(o);return r&&o.addEventListener("upgradeneeded",u=>{r(ts(o.result),u.oldVersion,u.newVersion,ts(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const BR=["get","getKey","getAll","getAllKeys","count"],$R=["put","add","delete","clear"],dh=new Map;function xy(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(dh.get(e))return dh.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=$R.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||BR.includes(n)))return;const i=async function(o,...l){const u=this.transaction(o,s?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),s&&u.done]))[0]};return dh.set(e,i),i}MR(t=>({...t,get:(e,n,r)=>xy(e,n)||t.get(e,n,r),has:(e,n)=>!!xy(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zR{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(qR(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function qR(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const vf="@firebase/app",by="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=new Op("@firebase/app"),WR="@firebase/app-compat",HR="@firebase/analytics-compat",GR="@firebase/analytics",KR="@firebase/app-check-compat",QR="@firebase/app-check",YR="@firebase/auth",XR="@firebase/auth-compat",JR="@firebase/database",ZR="@firebase/data-connect",eC="@firebase/database-compat",tC="@firebase/functions",nC="@firebase/functions-compat",rC="@firebase/installations",sC="@firebase/installations-compat",iC="@firebase/messaging",oC="@firebase/messaging-compat",aC="@firebase/performance",lC="@firebase/performance-compat",uC="@firebase/remote-config",cC="@firebase/remote-config-compat",dC="@firebase/storage",hC="@firebase/storage-compat",fC="@firebase/firestore",pC="@firebase/vertexai-preview",mC="@firebase/firestore-compat",gC="firebase",yC="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wf="[DEFAULT]",_C={[vf]:"fire-core",[WR]:"fire-core-compat",[GR]:"fire-analytics",[HR]:"fire-analytics-compat",[QR]:"fire-app-check",[KR]:"fire-app-check-compat",[YR]:"fire-auth",[XR]:"fire-auth-compat",[JR]:"fire-rtdb",[ZR]:"fire-data-connect",[eC]:"fire-rtdb-compat",[tC]:"fire-fn",[nC]:"fire-fn-compat",[rC]:"fire-iid",[sC]:"fire-iid-compat",[iC]:"fire-fcm",[oC]:"fire-fcm-compat",[aC]:"fire-perf",[lC]:"fire-perf-compat",[uC]:"fire-rc",[cC]:"fire-rc-compat",[dC]:"fire-gcs",[hC]:"fire-gcs-compat",[fC]:"fire-fst",[mC]:"fire-fst-compat",[pC]:"fire-vertex","fire-js":"fire-js",[gC]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa=new Map,vC=new Map,Ef=new Map;function Dy(t,e){try{t.container.addComponent(e)}catch(n){pr.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Bs(t){const e=t.name;if(Ef.has(e))return pr.debug(`There were multiple attempts to register component ${e}.`),!1;Ef.set(e,t);for(const n of Qa.values())Dy(n,t);for(const n of vC.values())Dy(n,t);return!0}function Qc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function _t(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wC={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ns=new fl("app","Firebase",wC);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EC{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new os("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ns.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys=yC;function kE(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:wf,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw ns.create("bad-app-name",{appName:String(s)});if(n||(n=TE()),!n)throw ns.create("no-options");const i=Qa.get(s);if(i){if(to(n,i.options)&&to(r,i.config))return i;throw ns.create("duplicate-app",{appName:s})}const o=new CR(s);for(const u of Ef.values())o.addComponent(u);const l=new EC(n,r,o);return Qa.set(s,l),l}function Yc(t=wf){const e=Qa.get(t);if(!e&&t===wf&&TE())return kE();if(!e)throw ns.create("no-app",{appName:t});return e}function IC(){return Array.from(Qa.values())}function qn(t,e,n){var r;let s=(r=_C[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),pr.warn(l.join(" "));return}Bs(new os(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TC="firebase-heartbeat-database",SC=1,Ya="firebase-heartbeat-store";let hh=null;function PE(){return hh||(hh=FR(TC,SC,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ya)}catch(n){console.warn(n)}}}}).catch(t=>{throw ns.create("idb-open",{originalErrorMessage:t.message})})),hh}async function AC(t){try{const n=(await PE()).transaction(Ya),r=await n.objectStore(Ya).get(NE(t));return await n.done,r}catch(e){if(e instanceof Xn)pr.warn(e.message);else{const n=ns.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});pr.warn(n.message)}}}async function Oy(t,e){try{const r=(await PE()).transaction(Ya,"readwrite");await r.objectStore(Ya).put(e,NE(t)),await r.done}catch(n){if(n instanceof Xn)pr.warn(n.message);else{const r=ns.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});pr.warn(r.message)}}}function NE(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RC=1024,CC=30*24*60*60*1e3;class kC{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new NC(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ly();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=CC}),this._storage.overwrite(this._heartbeatsCache))}catch(r){pr.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ly(),{heartbeatsToSend:r,unsentEntries:s}=PC(this._heartbeatsCache.heartbeats),i=gc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return pr.warn(n),""}}}function Ly(){return new Date().toISOString().substring(0,10)}function PC(t,e=RC){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Vy(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Vy(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class NC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return mR()?gR().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await AC(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Oy(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Oy(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Vy(t){return gc(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xC(t){Bs(new os("platform-logger",e=>new zR(e),"PRIVATE")),Bs(new os("heartbeat",e=>new kC(e),"PRIVATE")),qn(vf,by,t),qn(vf,by,"esm2017"),qn("fire-js","")}xC("");function Vp(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function xE(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const bC=xE,bE=new fl("auth","Firebase",xE());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yc=new Op("@firebase/auth");function DC(t,...e){yc.logLevel<=ge.WARN&&yc.warn(`Auth (${Ys}): ${t}`,...e)}function Lu(t,...e){yc.logLevel<=ge.ERROR&&yc.error(`Auth (${Ys}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(t,...e){throw jp(t,...e)}function Qt(t,...e){return jp(t,...e)}function Mp(t,e,n){const r=Object.assign(Object.assign({},bC()),{[e]:n});return new fl("auth","Firebase",r).create(e,{appName:t.name})}function Ut(t){return Mp(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Xc(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&gn(t,"argument-error"),Mp(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function jp(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return bE.create(t,...e)}function Y(t,e,...n){if(!t)throw jp(e,...n)}function ir(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Lu(e),new Error(e)}function mr(t,e){t||ir(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xa(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Up(){return My()==="http:"||My()==="https:"}function My(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OC(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Up()||dR()||"connection"in navigator)?navigator.onLine:!0}function LC(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e,n){this.shortDelay=e,this.longDelay=n,mr(n>e,"Short delay should be less than long delay!"),this.isMobile=lR()||hR()}get(){return OC()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fp(t,e){mr(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DE{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ir("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ir("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ir("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VC={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MC=new pl(3e4,6e4);function ot(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function at(t,e,n,r,s={}){return OE(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=go(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:u},i);return cR()||(c.referrerPolicy="no-referrer"),DE.fetch()(LE(t,t.config.apiHost,n,l),c)})}async function OE(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},VC),e);try{const s=new UC(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw da(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw da(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw da(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw da(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Mp(t,f,c);gn(t,f)}}catch(s){if(s instanceof Xn)throw s;gn(t,"network-request-failed",{message:String(s)})}}async function Er(t,e,n,r,s={}){const i=await at(t,e,n,r,s);return"mfaPendingCredential"in i&&gn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function LE(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Fp(t.config,s):`${t.config.apiScheme}://${s}`}function jC(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class UC{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Qt(this.auth,"network-request-failed")),MC.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function da(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Qt(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jy(t){return t!==void 0&&t.getResponse!==void 0}function Uy(t){return t!==void 0&&t.enterprise!==void 0}class FC{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return jC(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BC(t){return(await at(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function $C(t,e){return at(t,"GET","/v2/recaptchaConfig",ot(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zC(t,e){return at(t,"POST","/v1/accounts:delete",e)}async function qC(t,e){return at(t,"POST","/v1/accounts:update",e)}async function VE(t,e){return at(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function WC(t,e=!1){const n=ce(t),r=await n.getIdToken(e),s=Jc(r);Y(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Sa(fh(s.auth_time)),issuedAtTime:Sa(fh(s.iat)),expirationTime:Sa(fh(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function fh(t){return Number(t)*1e3}function Jc(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Lu("JWT malformed, contained fewer than 3 sections"),null;try{const s=wE(n);return s?JSON.parse(s):(Lu("Failed to decode base64 JWT payload"),null)}catch(s){return Lu("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Fy(t){const e=Jc(t);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $s(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Xn&&HC(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function HC({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GC{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Sa(this.lastLoginAt),this.creationTime=Sa(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ja(t){var e;const n=t.auth,r=await t.getIdToken(),s=await $s(t,VE(n,{idToken:r}));Y(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?ME(i.providerUserInfo):[],l=QC(t.providerData,o),u=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),f=u?c:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new If(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(t,p)}async function KC(t){const e=ce(t);await Ja(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function QC(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function ME(t){return t.map(e=>{var{providerId:n}=e,r=Vp(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YC(t,e){const n=await OE(t,{},async()=>{const r=go({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=LE(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",DE.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function XC(t,e){return at(t,"POST","/v2/accounts:revokeToken",ot(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Fy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const n=Fy(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await YC(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new zi;return r&&(Y(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(Y(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(Y(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new zi,this.toJSON())}_performRefresh(){return ir("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dr(t,e){Y(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class or{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Vp(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new GC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new If(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await $s(this,this.stsTokenManager.getToken(this.auth,e));return Y(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return WC(this,e)}reload(){return KC(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new or(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ja(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(_t(this.auth.app))return Promise.reject(Ut(this.auth));const e=await this.getIdToken();return await $s(this,zC(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,u,c,f;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(s=n.email)!==null&&s!==void 0?s:void 0,C=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,N=(o=n.photoURL)!==null&&o!==void 0?o:void 0,b=(l=n.tenantId)!==null&&l!==void 0?l:void 0,k=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,A=(c=n.createdAt)!==null&&c!==void 0?c:void 0,y=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:E,emailVerified:D,isAnonymous:B,providerData:$,stsTokenManager:w}=n;Y(E&&w,e,"internal-error");const _=zi.fromJSON(this.name,w);Y(typeof E=="string",e,"internal-error"),Dr(p,e.name),Dr(g,e.name),Y(typeof D=="boolean",e,"internal-error"),Y(typeof B=="boolean",e,"internal-error"),Dr(C,e.name),Dr(N,e.name),Dr(b,e.name),Dr(k,e.name),Dr(A,e.name),Dr(y,e.name);const I=new or({uid:E,auth:e,email:g,emailVerified:D,displayName:p,isAnonymous:B,photoURL:N,phoneNumber:C,tenantId:b,stsTokenManager:_,createdAt:A,lastLoginAt:y});return $&&Array.isArray($)&&(I.providerData=$.map(P=>Object.assign({},P))),k&&(I._redirectEventId=k),I}static async _fromIdTokenResponse(e,n,r=!1){const s=new zi;s.updateFromServerResponse(n);const i=new or({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ja(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];Y(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?ME(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new zi;l.updateFromIdToken(r);const u=new or({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new If(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const By=new Map;function ar(t){mr(t instanceof Function,"Expected a class definition");let e=By.get(t);return e?(mr(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,By.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jE{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}jE.type="NONE";const $y=jE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(t,e,n){return`firebase:${t}:${e}:${n}`}class qi{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Vu(this.userKey,s.apiKey,i),this.fullPersistenceKey=Vu("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?or._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new qi(ar($y),e,r);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=s[0]||ar($y);const o=Vu(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const f=await c._get(o);if(f){const p=or._fromJSON(e,f);c!==i&&(l=p),i=c;break}}catch{}const u=s.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new qi(i,e,r):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new qi(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if($E(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(UE(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(qE(e))return"Blackberry";if(WE(e))return"Webos";if(FE(e))return"Safari";if((e.includes("chrome/")||BE(e))&&!e.includes("edge/"))return"Chrome";if(zE(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function UE(t=Ot()){return/firefox\//i.test(t)}function FE(t=Ot()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function BE(t=Ot()){return/crios\//i.test(t)}function $E(t=Ot()){return/iemobile/i.test(t)}function zE(t=Ot()){return/android/i.test(t)}function qE(t=Ot()){return/blackberry/i.test(t)}function WE(t=Ot()){return/webos/i.test(t)}function Bp(t=Ot()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function JC(t=Ot()){var e;return Bp(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ZC(){return fR()&&document.documentMode===10}function HE(t=Ot()){return Bp(t)||zE(t)||WE(t)||qE(t)||/windows phone/i.test(t)||$E(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GE(t,e=[]){let n;switch(t){case"Browser":n=zy(Ot());break;case"Worker":n=`${zy(Ot())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ys}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const u=e(i);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tk(t,e={}){return at(t,"GET","/v2/passwordPolicy",ot(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nk=6;class rk{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:nk,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new qy(this),this.idTokenSubscription=new qy(this),this.beforeStateQueue=new ek(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bE,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ar(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await qi.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await VE(this,{idToken:e}),r=await or._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(_t(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ja(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=LC()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(_t(this.app))return Promise.reject(Ut(this));const n=e?ce(e):null;return n&&Y(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return _t(this.app)?Promise.reject(Ut(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return _t(this.app)?Promise.reject(Ut(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ar(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await tk(this),n=new rk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new fl("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await XC(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ar(e)||this._popupRedirectResolver;Y(n,this,"argument-error"),this.redirectPersistenceManager=await qi.create(this,[ar(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=GE(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&DC(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function St(t){return ce(t)}class qy{constructor(e){this.auth=e,this.observer=null,this.addObserver=ER(n=>this.observer=n)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ml={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ik(t){ml=t}function $p(t){return ml.loadJS(t)}function ok(){return ml.recaptchaV2Script}function ak(){return ml.recaptchaEnterpriseScript}function lk(){return ml.gapiScript}function KE(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const uk="recaptcha-enterprise",ck="NO_RECAPTCHA";class dk{constructor(e){this.type=uk,this.auth=St(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{$C(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new FC(u);return i.tenantId==null?i._agentRecaptchaConfig=c:i._tenantRecaptchaConfigs[i.tenantId]=c,o(c.siteKey)}}).catch(u=>{l(u)})})}function s(i,o,l){const u=window.grecaptcha;Uy(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(c=>{o(c)}).catch(()=>{o(ck)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&Uy(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=ak();u.length!==0&&(u+=l),$p(u).then(()=>{s(l,i,o)}).catch(c=>{o(c)})}}).catch(l=>{o(l)})})}}async function Wy(t,e,n,r=!1){const s=new dk(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Za(t,e,n,r){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Wy(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Wy(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hk(t,e){const n=Qc(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(to(i,e??{}))return s;gn(s,"already-initialized")}return n.initialize({options:e})}function fk(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(ar);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function pk(t,e,n){const r=St(t);Y(r._canInitEmulator,r,"emulator-config-failed"),Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=QE(e),{host:o,port:l}=mk(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),gk()}function QE(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function mk(t){const e=QE(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Hy(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Hy(o)}}}function Hy(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function gk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ir("not implemented")}_getIdTokenResponse(e){return ir("not implemented")}_linkToIdToken(e,n){return ir("not implemented")}_getReauthenticationResolver(e){return ir("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yk(t,e){return at(t,"POST","/v1/accounts:resetPassword",ot(t,e))}async function _k(t,e){return at(t,"POST","/v1/accounts:update",e)}async function vk(t,e){return at(t,"POST","/v1/accounts:signUp",e)}async function wk(t,e){return at(t,"POST","/v1/accounts:update",ot(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ek(t,e){return Er(t,"POST","/v1/accounts:signInWithPassword",ot(t,e))}async function ed(t,e){return at(t,"POST","/v1/accounts:sendOobCode",ot(t,e))}async function Ik(t,e){return ed(t,e)}async function Tk(t,e){return ed(t,e)}async function Sk(t,e){return ed(t,e)}async function Ak(t,e){return ed(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rk(t,e){return Er(t,"POST","/v1/accounts:signInWithEmailLink",ot(t,e))}async function Ck(t,e){return Er(t,"POST","/v1/accounts:signInWithEmailLink",ot(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el extends Zc{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new el(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new el(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(e,n,"signInWithPassword",Ek);case"emailLink":return Rk(e,{email:this._email,oobCode:this._password});default:gn(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(e,r,"signUpPassword",vk);case"emailLink":return Ck(e,{idToken:n,email:this._email,oobCode:this._password});default:gn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wi(t,e){return Er(t,"POST","/v1/accounts:signInWithIdp",ot(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kk="http://localhost";class gr extends Zc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new gr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):gn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Vp(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new gr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Wi(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Wi(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Wi(e,n)}buildRequest(){const e={requestUri:kk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=go(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pk(t,e){return at(t,"POST","/v1/accounts:sendVerificationCode",ot(t,e))}async function Nk(t,e){return Er(t,"POST","/v1/accounts:signInWithPhoneNumber",ot(t,e))}async function xk(t,e){const n=await Er(t,"POST","/v1/accounts:signInWithPhoneNumber",ot(t,e));if(n.temporaryProof)throw da(t,"account-exists-with-different-credential",n);return n}const bk={USER_NOT_FOUND:"user-not-found"};async function Dk(t,e){const n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Er(t,"POST","/v1/accounts:signInWithPhoneNumber",ot(t,n),bk)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa extends Zc{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new Aa({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new Aa({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return Nk(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return xk(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Dk(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:r,verificationCode:s}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:r,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!n&&!s&&!i?null:new Aa({verificationId:n,verificationCode:r,phoneNumber:s,temporaryProof:i})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ok(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Lk(t){const e=ua(ca(t)).link,n=e?ua(ca(e)).deep_link_id:null,r=ua(ca(t)).deep_link_id;return(r?ua(ca(r)).link:null)||r||n||e||t}class td{constructor(e){var n,r,s,i,o,l;const u=ua(ca(e)),c=(n=u.apiKey)!==null&&n!==void 0?n:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,p=Ok((s=u.mode)!==null&&s!==void 0?s:null);Y(c&&f&&p,"argument-error"),this.apiKey=c,this.operation=p,this.code=f,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=Lk(e);try{return new td(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(){this.providerId=Xs.PROVIDER_ID}static credential(e,n){return el._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=td.parseLink(n);return Y(r,"argument-error"),el._fromEmailAndCode(e,r.code,r.tenantId)}}Xs.PROVIDER_ID="password";Xs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Xs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o extends yo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Mu extends _o{static credentialFromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;return Y("providerId"in n&&"signInMethod"in n,"argument-error"),gr._fromParams(n)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return Y(e.idToken||e.accessToken,"argument-error"),gr._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Mu.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Mu.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r,oauthTokenSecret:s,pendingToken:i,nonce:o,providerId:l}=e;if(!r&&!s&&!n&&!i||!l)return null;try{return new Mu(l)._credential({idToken:n,accessToken:r,nonce:o,pendingToken:i})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr extends _o{constructor(){super("facebook.com")}static credential(e){return gr._fromParams({providerId:jr.PROVIDER_ID,signInMethod:jr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return jr.credentialFromTaggedObject(e)}static credentialFromError(e){return jr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return jr.credential(e.oauthAccessToken)}catch{return null}}}jr.FACEBOOK_SIGN_IN_METHOD="facebook.com";jr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un extends _o{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return gr._fromParams({providerId:Un.PROVIDER_ID,signInMethod:Un.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Un.credentialFromTaggedObject(e)}static credentialFromError(e){return Un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Un.credential(n,r)}catch{return null}}}Un.GOOGLE_SIGN_IN_METHOD="google.com";Un.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur extends _o{constructor(){super("github.com")}static credential(e){return gr._fromParams({providerId:Ur.PROVIDER_ID,signInMethod:Ur.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ur.credentialFromTaggedObject(e)}static credentialFromError(e){return Ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ur.credential(e.oauthAccessToken)}catch{return null}}}Ur.GITHUB_SIGN_IN_METHOD="github.com";Ur.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr extends _o{constructor(){super("twitter.com")}static credential(e,n){return gr._fromParams({providerId:Fr.PROVIDER_ID,signInMethod:Fr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Fr.credentialFromTaggedObject(e)}static credentialFromError(e){return Fr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Fr.credential(n,r)}catch{return null}}}Fr.TWITTER_SIGN_IN_METHOD="twitter.com";Fr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YE(t,e){return Er(t,"POST","/v1/accounts:signUp",ot(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await or._fromIdTokenResponse(e,r,s),o=Gy(r);return new Kn({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Gy(r);return new Kn({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Gy(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UO(t){var e;if(_t(t.app))return Promise.reject(Ut(t));const n=St(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new Kn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await YE(n,{returnSecureToken:!0}),s=await Kn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c extends Xn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,_c.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new _c(e,n,r,s)}}function XE(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?_c._fromErrorAndOperation(t,i,e,r):i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JE(t){return new Set(t.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FO(t,e){const n=ce(t);await nd(!0,n,e);const{providerUserInfo:r}=await qC(n.auth,{idToken:await n.getIdToken(),deleteProvider:[e]}),s=JE(r||[]);return n.providerData=n.providerData.filter(i=>s.has(i.providerId)),s.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function ZE(t,e,n=!1){const r=await $s(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Kn._forOperation(t,"link",r)}async function nd(t,e,n){await Ja(e);const r=JE(e.providerData),s=t===!1?"provider-already-linked":"no-such-provider";Y(r.has(n)===t,e.auth,s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vk(t,e,n=!1){const{auth:r}=t;if(_t(r.app))return Promise.reject(Ut(r));const s="reauthenticate";try{const i=await $s(t,XE(r,s,e,t),n);Y(i.idToken,r,"internal-error");const o=Jc(i.idToken);Y(o,r,"internal-error");const{sub:l}=o;return Y(t.uid===l,r,"user-mismatch"),Kn._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&gn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eI(t,e,n=!1){if(_t(t.app))return Promise.reject(Ut(t));const r="signIn",s=await XE(t,r,e),i=await Kn._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function rd(t,e){return eI(St(t),e)}async function Mk(t,e){const n=ce(t);return await nd(!1,n,e.providerId),ZE(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jk(t,e){return Er(t,"POST","/v1/accounts:signInWithCustomToken",ot(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BO(t,e){if(_t(t.app))return Promise.reject(Ut(t));const n=St(t),r=await jk(n,{token:e,returnSecureToken:!0}),s=await Kn._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sd(t,e,n){var r;Y(((r=n.url)===null||r===void 0?void 0:r.length)>0,t,"invalid-continue-uri"),Y(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(Y(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(Y(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zp(t){const e=St(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function $O(t,e,n){const r=St(t),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};n&&sd(r,s,n),await Za(r,s,"getOobCode",Tk)}async function zO(t,e,n){await yk(ce(t),{oobCode:e,newPassword:n}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&zp(t),r})}async function qO(t,e){await wk(ce(t),{oobCode:e})}async function Uk(t,e,n){if(_t(t.app))return Promise.reject(Ut(t));const r=St(t),o=await Za(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",YE).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&zp(t),u}),l=await Kn._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function Fk(t,e,n){return _t(t.app)?Promise.reject(Ut(t)):rd(ce(t),Xs.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&zp(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WO(t,e,n){const r=St(t),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(o,l){Y(l.handleCodeInApp,r,"argument-error"),l&&sd(r,o,l)}i(s,n),await Za(r,s,"getOobCode",Sk)}function HO(t,e){const n=td.parseLink(e);return(n==null?void 0:n.operation)==="EMAIL_SIGNIN"}async function GO(t,e,n){if(_t(t.app))return Promise.reject(Ut(t));const r=ce(t),s=Xs.credentialWithLink(e,n||Xa());return Y(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),rd(r,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bk(t,e){return at(t,"POST","/v1/accounts:createAuthUri",ot(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KO(t,e){const n=Up()?Xa():"http://localhost",r={identifier:e,continueUri:n},{signinMethods:s}=await Bk(ce(t),r);return s||[]}async function QO(t,e){const n=ce(t),s={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&sd(n.auth,s,e);const{email:i}=await Ik(n.auth,s);i!==t.email&&await t.reload()}async function YO(t,e,n){const r=ce(t),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await t.getIdToken(),newEmail:e};n&&sd(r.auth,i,n);const{email:o}=await Ak(r.auth,i);o!==t.email&&await t.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $k(t,e){return at(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tI(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=ce(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await $s(r,$k(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function XO(t,e){const n=ce(t);return _t(n.auth.app)?Promise.reject(Ut(n.auth)):nI(n,e,null)}function JO(t,e){return nI(ce(t),null,e)}async function nI(t,e,n){const{auth:r}=t,i={idToken:await t.getIdToken(),returnSecureToken:!0};e&&(i.email=e),n&&(i.password=n);const o=await $s(t,_k(r,i));await t._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zk(t){var e,n;if(!t)return null;const{providerId:r}=t,s=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},i=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(t!=null&&t.idToken)){const o=(n=(e=Jc(t.idToken))===null||e===void 0?void 0:e.firebase)===null||n===void 0?void 0:n.sign_in_provider;if(o){const l=o!=="anonymous"&&o!=="custom"?o:null;return new Hi(i,l)}}if(!r)return null;switch(r){case"facebook.com":return new qk(i,s);case"github.com":return new Wk(i,s);case"google.com":return new Hk(i,s);case"twitter.com":return new Gk(i,s,t.screenName||null);case"custom":case"anonymous":return new Hi(i,null);default:return new Hi(i,r,s)}}class Hi{constructor(e,n,r={}){this.isNewUser=e,this.providerId=n,this.profile=r}}class rI extends Hi{constructor(e,n,r,s){super(e,n,r),this.username=s}}class qk extends Hi{constructor(e,n){super(e,"facebook.com",n)}}class Wk extends rI{constructor(e,n){super(e,"github.com",n,typeof(n==null?void 0:n.login)=="string"?n==null?void 0:n.login:null)}}class Hk extends Hi{constructor(e,n){super(e,"google.com",n)}}class Gk extends rI{constructor(e,n,r){super(e,"twitter.com",n,r)}}function ZO(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:zk(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eL(t,e){return ce(t).setPersistence(e)}function Kk(t,e,n,r){return ce(t).onIdTokenChanged(e,n,r)}function Qk(t,e,n){return ce(t).beforeAuthStateChanged(e,n)}function Yk(t,e,n,r){return ce(t).onAuthStateChanged(e,n,r)}function Xk(t){return ce(t).signOut()}function tL(t,e){return St(t).revokeAccessToken(e)}async function nL(t){return ce(t).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jk(t,e){return at(t,"POST","/v2/accounts/mfaEnrollment:start",ot(t,e))}const vc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(vc,"1"),this.storage.removeItem(vc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zk=1e3,eP=10;class iI extends sI{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=HE(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);ZC()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,eP):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Zk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}iI.type="LOCAL";const tP=iI;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI extends sI{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}oI.type="SESSION";const aI=oI;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nP(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new id(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async c=>c(n.origin,i)),u=await nP(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}id.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function od(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rP{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const c=od("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===c)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(){return window}function sP(t){Ze().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qp(){return typeof Ze().WorkerGlobalScope<"u"&&typeof Ze().importScripts=="function"}async function iP(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function oP(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function aP(){return qp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI="firebaseLocalStorageDb",lP=1,wc="firebaseLocalStorage",uI="fbase_key";class gl{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ad(t,e){return t.transaction([wc],e?"readwrite":"readonly").objectStore(wc)}function uP(){const t=indexedDB.deleteDatabase(lI);return new gl(t).toPromise()}function Tf(){const t=indexedDB.open(lI,lP);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(wc,{keyPath:uI})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(wc)?e(r):(r.close(),await uP(),e(await Tf()))})})}async function Ky(t,e,n){const r=ad(t,!0).put({[uI]:e,value:n});return new gl(r).toPromise()}async function cP(t,e){const n=ad(t,!1).get(e),r=await new gl(n).toPromise();return r===void 0?null:r.value}function Qy(t,e){const n=ad(t,!0).delete(e);return new gl(n).toPromise()}const dP=800,hP=3;class cI{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Tf(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>hP)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return qp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=id._getInstance(aP()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await iP(),!this.activeServiceWorker)return;this.sender=new rP(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||oP()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Tf();return await Ky(e,vc,"1"),await Qy(e,vc),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ky(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>cP(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Qy(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ad(s,!1).getAll();return new gl(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),dP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}cI.type="LOCAL";const fP=cI;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pP(t,e){return at(t,"POST","/v2/accounts/mfaSignIn:start",ot(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mP=500,gP=6e4,gu=1e12;class yP{constructor(e){this.auth=e,this.counter=gu,this._widgets=new Map}render(e,n){const r=this.counter;return this._widgets.set(r,new _P(e,this.auth.name,n||{})),this.counter++,r}reset(e){var n;const r=e||gu;(n=this._widgets.get(r))===null||n===void 0||n.delete(),this._widgets.delete(r)}getResponse(e){var n;const r=e||gu;return((n=this._widgets.get(r))===null||n===void 0?void 0:n.getResponse())||""}async execute(e){var n;const r=e||gu;return(n=this._widgets.get(r))===null||n===void 0||n.execute(),""}}class _P{constructor(e,n,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;Y(s,"argument-error",{appName:n}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=vP(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},gP)},mP))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function vP(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<t;r++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph=KE("rcb"),wP=new pl(3e4,6e4);class EP{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=Ze().grecaptcha)===null||e===void 0)&&e.render)}load(e,n=""){return Y(IP(n),e,"argument-error"),this.shouldResolveImmediately(n)&&jy(Ze().grecaptcha)?Promise.resolve(Ze().grecaptcha):new Promise((r,s)=>{const i=Ze().setTimeout(()=>{s(Qt(e,"network-request-failed"))},wP.get());Ze()[ph]=()=>{Ze().clearTimeout(i),delete Ze()[ph];const l=Ze().grecaptcha;if(!l||!jy(l)){s(Qt(e,"internal-error"));return}const u=l.render;l.render=(c,f)=>{const p=u(c,f);return this.counter++,p},this.hostLanguage=n,r(l)};const o=`${ok()}?${go({onload:ph,render:"explicit",hl:n})}`;$p(o).catch(()=>{clearTimeout(i),s(Qt(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!(!((n=Ze().grecaptcha)===null||n===void 0)&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function IP(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class TP{async load(e){return new yP(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI="recaptcha",SP={theme:"light",type:"image"};class rL{constructor(e,n,r=Object.assign({},SP)){this.parameters=r,this.type=dI,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=St(e),this.isInvisible=this.parameters.size==="invisible",Y(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof n=="string"?document.getElementById(n):n;Y(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new TP:new EP,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),r=n.getResponse(e);return r||new Promise(s=>{const i=o=>{o&&(this.tokenChangeListeners.delete(i),s(o))};this.tokenChangeListeners.add(i),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){Y(!this.parameters.sitekey,this.auth,"argument-error"),Y(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),Y(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(r=>r(n)),typeof e=="function")e(n);else if(typeof e=="string"){const r=Ze()[e];typeof r=="function"&&r(n)}}}assertNotDestroyed(){Y(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){Y(Up()&&!qp(),this.auth,"internal-error"),await AP(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await BC(this.auth);Y(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return Y(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function AP(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=Aa._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function sL(t,e,n){if(_t(t.app))return Promise.reject(Ut(t));const r=St(t),s=await fI(r,e,ce(n));return new hI(s,i=>rd(r,i))}async function iL(t,e,n){const r=ce(t);await nd(!1,r,"phone");const s=await fI(r.auth,e,ce(n));return new hI(s,i=>Mk(r,i))}async function fI(t,e,n){var r;const s=await n.verify();try{Y(typeof s=="string",t,"argument-error"),Y(n.type===dI,t,"argument-error");let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const o=i.session;if("phoneNumber"in i)return Y(o.type==="enroll",t,"internal-error"),(await Jk(t,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,recaptchaToken:s}})).phoneSessionInfo.sessionInfo;{Y(o.type==="signin",t,"internal-error");const l=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;return Y(l,t,"missing-multi-factor-info"),(await pP(t,{mfaPendingCredential:o.credential,mfaEnrollmentId:l,phoneSignInInfo:{recaptchaToken:s}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await Pk(t,{phoneNumber:i.phoneNumber,recaptchaToken:s});return o}}finally{n._reset()}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(t,e){return e?ar(e):(Y(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp extends Zc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Wi(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Wi(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Wi(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function RP(t){return eI(t.auth,new Wp(t),t.bypassAuthState)}function CP(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),Vk(n,new Wp(t),t.bypassAuthState)}async function kP(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),ZE(n,new Wp(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return RP;case"linkViaPopup":case"linkViaRedirect":return kP;case"reauthViaPopup":case"reauthViaRedirect":return CP;default:gn(this.auth,"internal-error")}}resolve(e){mr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){mr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PP=new pl(2e3,1e4);async function NP(t,e,n){if(_t(t.app))return Promise.reject(Qt(t,"operation-not-supported-in-this-environment"));const r=St(t);Xc(t,e,yo);const s=yl(r,n);return new Wr(r,"signInViaPopup",e,s).executeNotNull()}async function oL(t,e,n){const r=ce(t);Xc(r.auth,e,yo);const s=yl(r.auth,n);return new Wr(r.auth,"linkViaPopup",e,s,r).executeNotNull()}class Wr extends pI{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Wr.currentPopupAction&&Wr.currentPopupAction.cancel(),Wr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){mr(this.filter.length===1,"Popup operations only handle one event");const e=od();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Qt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Qt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Wr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Qt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,PP.get())};e()}}Wr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xP="pendingRedirect",ju=new Map;class bP extends pI{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=ju.get(this.auth._key());if(!e){try{const r=await DP(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}ju.set(this.auth._key(),e)}return this.bypassAuthState||ju.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function DP(t,e){const n=yI(e),r=gI(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}async function mI(t,e){return gI(t)._set(yI(e),"true")}function OP(t,e){ju.set(t._key(),e)}function gI(t){return ar(t._redirectPersistence)}function yI(t){return Vu(xP,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aL(t,e,n){return LP(t,e,n)}async function LP(t,e,n){if(_t(t.app))return Promise.reject(Ut(t));const r=St(t);Xc(t,e,yo),await r._initializationPromise;const s=yl(r,n);return await mI(s,r),s._openRedirect(r,e,"signInViaRedirect")}function lL(t,e,n){return VP(t,e,n)}async function VP(t,e,n){const r=ce(t);Xc(r.auth,e,yo),await r.auth._initializationPromise;const s=yl(r.auth,n);await nd(!1,r,e.providerId),await mI(s,r.auth);const i=await MP(r);return s._openRedirect(r.auth,e,"linkViaRedirect",i)}async function uL(t,e){return await St(t)._initializationPromise,_I(t,e,!1)}async function _I(t,e,n=!1){if(_t(t.app))return Promise.reject(Ut(t));const r=St(t),s=yl(r,e),o=await new bP(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function MP(t){const e=od(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jP=10*60*1e3;class UP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!FP(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!vI(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Qt(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=jP&&this.cachedEventUids.clear(),this.cachedEventUids.has(Yy(e))}saveEventToCache(e){this.cachedEventUids.add(Yy(e)),this.lastProcessedEventTime=Date.now()}}function Yy(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function vI({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function FP(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return vI(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BP(t,e={}){return at(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $P=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,zP=/^https?/;async function qP(t){if(t.config.emulator)return;const{authorizedDomains:e}=await BP(t);for(const n of e)try{if(WP(n))return}catch{}gn(t,"unauthorized-domain")}function WP(t){const e=Xa(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!zP.test(n))return!1;if($P.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HP=new pl(3e4,6e4);function Xy(){const t=Ze().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function GP(t){return new Promise((e,n)=>{var r,s,i;function o(){Xy(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Xy(),n(Qt(t,"network-request-failed"))},timeout:HP.get()})}if(!((s=(r=Ze().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Ze().gapi)===null||i===void 0)&&i.load)o();else{const l=KE("iframefcb");return Ze()[l]=()=>{gapi.load?o():n(Qt(t,"network-request-failed"))},$p(`${lk()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Uu=null,e})}let Uu=null;function KP(t){return Uu=Uu||GP(t),Uu}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QP=new pl(5e3,15e3),YP="__/auth/iframe",XP="emulator/auth/iframe",JP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ZP=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function eN(t){const e=t.config;Y(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Fp(e,XP):`https://${t.config.authDomain}/${YP}`,r={apiKey:e.apiKey,appName:t.name,v:Ys},s=ZP.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${go(r).slice(1)}`}async function tN(t){const e=await KP(t),n=Ze().gapi;return Y(n,t,"internal-error"),e.open({where:document.body,url:eN(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:JP,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Qt(t,"network-request-failed"),l=Ze().setTimeout(()=>{i(o)},QP.get());function u(){Ze().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nN={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},rN=500,sN=600,iN="_blank",oN="http://localhost";class Jy{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function aN(t,e,n,r=rN,s=sN){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},nN),{width:r.toString(),height:s.toString(),top:i,left:o}),c=Ot().toLowerCase();n&&(l=BE(c)?iN:n),UE(c)&&(e=e||oN,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[C,N])=>`${g}${C}=${N},`,"");if(JC(c)&&l!=="_self")return lN(e||"",l),new Jy(null);const p=window.open(e||"",l,f);Y(p,t,"popup-blocked");try{p.focus()}catch{}return new Jy(p)}function lN(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uN="__/auth/handler",cN="emulator/auth/handler",dN=encodeURIComponent("fac");async function Zy(t,e,n,r,s,i){Y(t.config.authDomain,t,"auth-domain-config-required"),Y(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ys,eventId:s};if(e instanceof yo){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",wR(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof _o){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),c=u?`#${dN}=${encodeURIComponent(u)}`:"";return`${hN(t)}?${go(l).slice(1)}${c}`}function hN({config:t}){return t.emulator?Fp(t,cN):`https://${t.authDomain}/${uN}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="webStorageSupport";class fN{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=aI,this._completeRedirectFn=_I,this._overrideRedirectResult=OP}async _openPopup(e,n,r,s){var i;mr((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Zy(e,n,r,Xa(),s);return aN(e,o,od())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await Zy(e,n,r,Xa(),s);return sP(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(mr(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await tN(e),r=new UP(e);return n.register("authEvent",s=>(Y(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(mh,{type:mh},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[mh];o!==void 0&&n(!!o),gn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=qP(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return HE()||FE()||Bp()}}const pN=fN;var e_="@firebase/auth",t_="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mN{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gN(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function yN(t){Bs(new os("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;Y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:GE(t)},c=new sk(r,s,i,u);return fk(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Bs(new os("auth-internal",e=>{const n=St(e.getProvider("auth").getImmediate());return(r=>new mN(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),qn(e_,t_,gN(t)),qn(e_,t_,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _N=5*60,vN=SE("authIdTokenMaxAge")||_N;let n_=null;const wN=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>vN)return;const s=n==null?void 0:n.token;n_!==s&&(n_=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function EN(t=Yc()){const e=Qc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=hk(t,{popupRedirectResolver:pN,persistence:[fP,tP,aI]}),r=SE("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=wN(i.toString());Qk(n,o,()=>o(n.currentUser)),Kk(n,l=>o(l))}}const s=EE("auth");return s&&pk(n,`http://${s}`),n}function IN(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}ik({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Qt("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",IN().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});yN("Browser");var TN="firebase",SN="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qn(TN,SN,"app");var r_=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ds,wI;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function I(){}I.prototype=_.prototype,w.D=_.prototype,w.prototype=new I,w.prototype.constructor=w,w.C=function(P,T,x){for(var R=Array(arguments.length-2),ye=2;ye<arguments.length;ye++)R[ye-2]=arguments[ye];return _.prototype[T].apply(P,R)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,I){I||(I=0);var P=Array(16);if(typeof _=="string")for(var T=0;16>T;++T)P[T]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(T=0;16>T;++T)P[T]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=w.g[0],I=w.g[1],T=w.g[2];var x=w.g[3],R=_+(x^I&(T^x))+P[0]+3614090360&4294967295;_=I+(R<<7&4294967295|R>>>25),R=x+(T^_&(I^T))+P[1]+3905402710&4294967295,x=_+(R<<12&4294967295|R>>>20),R=T+(I^x&(_^I))+P[2]+606105819&4294967295,T=x+(R<<17&4294967295|R>>>15),R=I+(_^T&(x^_))+P[3]+3250441966&4294967295,I=T+(R<<22&4294967295|R>>>10),R=_+(x^I&(T^x))+P[4]+4118548399&4294967295,_=I+(R<<7&4294967295|R>>>25),R=x+(T^_&(I^T))+P[5]+1200080426&4294967295,x=_+(R<<12&4294967295|R>>>20),R=T+(I^x&(_^I))+P[6]+2821735955&4294967295,T=x+(R<<17&4294967295|R>>>15),R=I+(_^T&(x^_))+P[7]+4249261313&4294967295,I=T+(R<<22&4294967295|R>>>10),R=_+(x^I&(T^x))+P[8]+1770035416&4294967295,_=I+(R<<7&4294967295|R>>>25),R=x+(T^_&(I^T))+P[9]+2336552879&4294967295,x=_+(R<<12&4294967295|R>>>20),R=T+(I^x&(_^I))+P[10]+4294925233&4294967295,T=x+(R<<17&4294967295|R>>>15),R=I+(_^T&(x^_))+P[11]+2304563134&4294967295,I=T+(R<<22&4294967295|R>>>10),R=_+(x^I&(T^x))+P[12]+1804603682&4294967295,_=I+(R<<7&4294967295|R>>>25),R=x+(T^_&(I^T))+P[13]+4254626195&4294967295,x=_+(R<<12&4294967295|R>>>20),R=T+(I^x&(_^I))+P[14]+2792965006&4294967295,T=x+(R<<17&4294967295|R>>>15),R=I+(_^T&(x^_))+P[15]+1236535329&4294967295,I=T+(R<<22&4294967295|R>>>10),R=_+(T^x&(I^T))+P[1]+4129170786&4294967295,_=I+(R<<5&4294967295|R>>>27),R=x+(I^T&(_^I))+P[6]+3225465664&4294967295,x=_+(R<<9&4294967295|R>>>23),R=T+(_^I&(x^_))+P[11]+643717713&4294967295,T=x+(R<<14&4294967295|R>>>18),R=I+(x^_&(T^x))+P[0]+3921069994&4294967295,I=T+(R<<20&4294967295|R>>>12),R=_+(T^x&(I^T))+P[5]+3593408605&4294967295,_=I+(R<<5&4294967295|R>>>27),R=x+(I^T&(_^I))+P[10]+38016083&4294967295,x=_+(R<<9&4294967295|R>>>23),R=T+(_^I&(x^_))+P[15]+3634488961&4294967295,T=x+(R<<14&4294967295|R>>>18),R=I+(x^_&(T^x))+P[4]+3889429448&4294967295,I=T+(R<<20&4294967295|R>>>12),R=_+(T^x&(I^T))+P[9]+568446438&4294967295,_=I+(R<<5&4294967295|R>>>27),R=x+(I^T&(_^I))+P[14]+3275163606&4294967295,x=_+(R<<9&4294967295|R>>>23),R=T+(_^I&(x^_))+P[3]+4107603335&4294967295,T=x+(R<<14&4294967295|R>>>18),R=I+(x^_&(T^x))+P[8]+1163531501&4294967295,I=T+(R<<20&4294967295|R>>>12),R=_+(T^x&(I^T))+P[13]+2850285829&4294967295,_=I+(R<<5&4294967295|R>>>27),R=x+(I^T&(_^I))+P[2]+4243563512&4294967295,x=_+(R<<9&4294967295|R>>>23),R=T+(_^I&(x^_))+P[7]+1735328473&4294967295,T=x+(R<<14&4294967295|R>>>18),R=I+(x^_&(T^x))+P[12]+2368359562&4294967295,I=T+(R<<20&4294967295|R>>>12),R=_+(I^T^x)+P[5]+4294588738&4294967295,_=I+(R<<4&4294967295|R>>>28),R=x+(_^I^T)+P[8]+2272392833&4294967295,x=_+(R<<11&4294967295|R>>>21),R=T+(x^_^I)+P[11]+1839030562&4294967295,T=x+(R<<16&4294967295|R>>>16),R=I+(T^x^_)+P[14]+4259657740&4294967295,I=T+(R<<23&4294967295|R>>>9),R=_+(I^T^x)+P[1]+2763975236&4294967295,_=I+(R<<4&4294967295|R>>>28),R=x+(_^I^T)+P[4]+1272893353&4294967295,x=_+(R<<11&4294967295|R>>>21),R=T+(x^_^I)+P[7]+4139469664&4294967295,T=x+(R<<16&4294967295|R>>>16),R=I+(T^x^_)+P[10]+3200236656&4294967295,I=T+(R<<23&4294967295|R>>>9),R=_+(I^T^x)+P[13]+681279174&4294967295,_=I+(R<<4&4294967295|R>>>28),R=x+(_^I^T)+P[0]+3936430074&4294967295,x=_+(R<<11&4294967295|R>>>21),R=T+(x^_^I)+P[3]+3572445317&4294967295,T=x+(R<<16&4294967295|R>>>16),R=I+(T^x^_)+P[6]+76029189&4294967295,I=T+(R<<23&4294967295|R>>>9),R=_+(I^T^x)+P[9]+3654602809&4294967295,_=I+(R<<4&4294967295|R>>>28),R=x+(_^I^T)+P[12]+3873151461&4294967295,x=_+(R<<11&4294967295|R>>>21),R=T+(x^_^I)+P[15]+530742520&4294967295,T=x+(R<<16&4294967295|R>>>16),R=I+(T^x^_)+P[2]+3299628645&4294967295,I=T+(R<<23&4294967295|R>>>9),R=_+(T^(I|~x))+P[0]+4096336452&4294967295,_=I+(R<<6&4294967295|R>>>26),R=x+(I^(_|~T))+P[7]+1126891415&4294967295,x=_+(R<<10&4294967295|R>>>22),R=T+(_^(x|~I))+P[14]+2878612391&4294967295,T=x+(R<<15&4294967295|R>>>17),R=I+(x^(T|~_))+P[5]+4237533241&4294967295,I=T+(R<<21&4294967295|R>>>11),R=_+(T^(I|~x))+P[12]+1700485571&4294967295,_=I+(R<<6&4294967295|R>>>26),R=x+(I^(_|~T))+P[3]+2399980690&4294967295,x=_+(R<<10&4294967295|R>>>22),R=T+(_^(x|~I))+P[10]+4293915773&4294967295,T=x+(R<<15&4294967295|R>>>17),R=I+(x^(T|~_))+P[1]+2240044497&4294967295,I=T+(R<<21&4294967295|R>>>11),R=_+(T^(I|~x))+P[8]+1873313359&4294967295,_=I+(R<<6&4294967295|R>>>26),R=x+(I^(_|~T))+P[15]+4264355552&4294967295,x=_+(R<<10&4294967295|R>>>22),R=T+(_^(x|~I))+P[6]+2734768916&4294967295,T=x+(R<<15&4294967295|R>>>17),R=I+(x^(T|~_))+P[13]+1309151649&4294967295,I=T+(R<<21&4294967295|R>>>11),R=_+(T^(I|~x))+P[4]+4149444226&4294967295,_=I+(R<<6&4294967295|R>>>26),R=x+(I^(_|~T))+P[11]+3174756917&4294967295,x=_+(R<<10&4294967295|R>>>22),R=T+(_^(x|~I))+P[2]+718787259&4294967295,T=x+(R<<15&4294967295|R>>>17),R=I+(x^(T|~_))+P[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(T+(R<<21&4294967295|R>>>11))&4294967295,w.g[2]=w.g[2]+T&4294967295,w.g[3]=w.g[3]+x&4294967295}r.prototype.u=function(w,_){_===void 0&&(_=w.length);for(var I=_-this.blockSize,P=this.B,T=this.h,x=0;x<_;){if(T==0)for(;x<=I;)s(this,w,x),x+=this.blockSize;if(typeof w=="string"){for(;x<_;)if(P[T++]=w.charCodeAt(x++),T==this.blockSize){s(this,P),T=0;break}}else for(;x<_;)if(P[T++]=w[x++],T==this.blockSize){s(this,P),T=0;break}}this.h=T,this.o+=_},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;var I=8*this.o;for(_=w.length-8;_<w.length;++_)w[_]=I&255,I/=256;for(this.u(w),w=Array(16),_=I=0;4>_;++_)for(var P=0;32>P;P+=8)w[I++]=this.g[_]>>>P&255;return w};function i(w,_){var I=l;return Object.prototype.hasOwnProperty.call(I,w)?I[w]:I[w]=_(w)}function o(w,_){this.h=_;for(var I=[],P=!0,T=w.length-1;0<=T;T--){var x=w[T]|0;P&&x==_||(I[T]=x,P=!1)}this.g=I}var l={};function u(w){return-128<=w&&128>w?i(w,function(_){return new o([_|0],0>_?-1:0)}):new o([w|0],0>w?-1:0)}function c(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return k(c(-w));for(var _=[],I=1,P=0;w>=I;P++)_[P]=w/I|0,I*=4294967296;return new o(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return k(f(w.substring(1),_));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=c(Math.pow(_,8)),P=p,T=0;T<w.length;T+=8){var x=Math.min(8,w.length-T),R=parseInt(w.substring(T,T+x),_);8>x?(x=c(Math.pow(_,x)),P=P.j(x).add(c(R))):(P=P.j(I),P=P.add(c(R)))}return P}var p=u(0),g=u(1),C=u(16777216);t=o.prototype,t.m=function(){if(b(this))return-k(this).m();for(var w=0,_=1,I=0;I<this.g.length;I++){var P=this.i(I);w+=(0<=P?P:4294967296+P)*_,_*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(N(this))return"0";if(b(this))return"-"+k(this).toString(w);for(var _=c(Math.pow(w,6)),I=this,P="";;){var T=D(I,_).g;I=A(I,T.j(_));var x=((0<I.g.length?I.g[0]:I.h)>>>0).toString(w);if(I=T,N(I))return x+P;for(;6>x.length;)x="0"+x;P=x+P}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function N(w){if(w.h!=0)return!1;for(var _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function b(w){return w.h==-1}t.l=function(w){return w=A(this,w),b(w)?-1:N(w)?0:1};function k(w){for(var _=w.g.length,I=[],P=0;P<_;P++)I[P]=~w.g[P];return new o(I,~w.h).add(g)}t.abs=function(){return b(this)?k(this):this},t.add=function(w){for(var _=Math.max(this.g.length,w.g.length),I=[],P=0,T=0;T<=_;T++){var x=P+(this.i(T)&65535)+(w.i(T)&65535),R=(x>>>16)+(this.i(T)>>>16)+(w.i(T)>>>16);P=R>>>16,x&=65535,R&=65535,I[T]=R<<16|x}return new o(I,I[I.length-1]&-2147483648?-1:0)};function A(w,_){return w.add(k(_))}t.j=function(w){if(N(this)||N(w))return p;if(b(this))return b(w)?k(this).j(k(w)):k(k(this).j(w));if(b(w))return k(this.j(k(w)));if(0>this.l(C)&&0>w.l(C))return c(this.m()*w.m());for(var _=this.g.length+w.g.length,I=[],P=0;P<2*_;P++)I[P]=0;for(P=0;P<this.g.length;P++)for(var T=0;T<w.g.length;T++){var x=this.i(P)>>>16,R=this.i(P)&65535,ye=w.i(T)>>>16,fe=w.i(T)&65535;I[2*P+2*T]+=R*fe,y(I,2*P+2*T),I[2*P+2*T+1]+=x*fe,y(I,2*P+2*T+1),I[2*P+2*T+1]+=R*ye,y(I,2*P+2*T+1),I[2*P+2*T+2]+=x*ye,y(I,2*P+2*T+2)}for(P=0;P<_;P++)I[P]=I[2*P+1]<<16|I[2*P];for(P=_;P<2*_;P++)I[P]=0;return new o(I,0)};function y(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function E(w,_){this.g=w,this.h=_}function D(w,_){if(N(_))throw Error("division by zero");if(N(w))return new E(p,p);if(b(w))return _=D(k(w),_),new E(k(_.g),k(_.h));if(b(_))return _=D(w,k(_)),new E(k(_.g),_.h);if(30<w.g.length){if(b(w)||b(_))throw Error("slowDivide_ only works with positive integers.");for(var I=g,P=_;0>=P.l(w);)I=B(I),P=B(P);var T=$(I,1),x=$(P,1);for(P=$(P,2),I=$(I,2);!N(P);){var R=x.add(P);0>=R.l(w)&&(T=T.add(I),x=R),P=$(P,1),I=$(I,1)}return _=A(w,T.j(_)),new E(T,_)}for(T=p;0<=w.l(_);){for(I=Math.max(1,Math.floor(w.m()/_.m())),P=Math.ceil(Math.log(I)/Math.LN2),P=48>=P?1:Math.pow(2,P-48),x=c(I),R=x.j(_);b(R)||0<R.l(w);)I-=P,x=c(I),R=x.j(_);N(x)&&(x=g),T=T.add(x),w=A(w,R)}return new E(T,w)}t.A=function(w){return D(this,w).h},t.and=function(w){for(var _=Math.max(this.g.length,w.g.length),I=[],P=0;P<_;P++)I[P]=this.i(P)&w.i(P);return new o(I,this.h&w.h)},t.or=function(w){for(var _=Math.max(this.g.length,w.g.length),I=[],P=0;P<_;P++)I[P]=this.i(P)|w.i(P);return new o(I,this.h|w.h)},t.xor=function(w){for(var _=Math.max(this.g.length,w.g.length),I=[],P=0;P<_;P++)I[P]=this.i(P)^w.i(P);return new o(I,this.h^w.h)};function B(w){for(var _=w.g.length+1,I=[],P=0;P<_;P++)I[P]=w.i(P)<<1|w.i(P-1)>>>31;return new o(I,w.h)}function $(w,_){var I=_>>5;_%=32;for(var P=w.g.length-I,T=[],x=0;x<P;x++)T[x]=0<_?w.i(x+I)>>>_|w.i(x+I+1)<<32-_:w.i(x+I);return new o(T,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,wI=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=f,Ds=o}).apply(typeof r_<"u"?r_:typeof self<"u"?self:typeof window<"u"?window:{});var yu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var EI,ha,II,Fu,Sf,TI,SI,AI;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,h){return a==Array.prototype||a==Object.prototype||(a[d]=h.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof yu=="object"&&yu];for(var d=0;d<a.length;++d){var h=a[d];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=n(this);function s(a,d){if(d)e:{var h=r;a=a.split(".");for(var v=0;v<a.length-1;v++){var L=a[v];if(!(L in h))break e;h=h[L]}a=a[a.length-1],v=h[a],d=d(v),d!=v&&d!=null&&e(h,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var h=0,v=!1,L={next:function(){if(!v&&h<a.length){var M=h++;return{value:d(M,a[M]),done:!1}}return v=!0,{done:!0,value:void 0}}};return L[Symbol.iterator]=function(){return L},L}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function c(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function f(a,d,h){return a.call.apply(a.bind,arguments)}function p(a,d,h){if(!a)throw Error();if(2<arguments.length){var v=Array.prototype.slice.call(arguments,2);return function(){var L=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(L,v),a.apply(d,L)}}return function(){return a.apply(d,arguments)}}function g(a,d,h){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function C(a,d){var h=Array.prototype.slice.call(arguments,1);return function(){var v=h.slice();return v.push.apply(v,arguments),a.apply(this,v)}}function N(a,d){function h(){}h.prototype=d.prototype,a.aa=d.prototype,a.prototype=new h,a.prototype.constructor=a,a.Qb=function(v,L,M){for(var G=Array(arguments.length-2),Ne=2;Ne<arguments.length;Ne++)G[Ne-2]=arguments[Ne];return d.prototype[L].apply(v,G)}}function b(a){const d=a.length;if(0<d){const h=Array(d);for(let v=0;v<d;v++)h[v]=a[v];return h}return[]}function k(a,d){for(let h=1;h<arguments.length;h++){const v=arguments[h];if(u(v)){const L=a.length||0,M=v.length||0;a.length=L+M;for(let G=0;G<M;G++)a[L+G]=v[G]}else a.push(v)}}class A{constructor(d,h){this.i=d,this.j=h,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function y(a){return/^[\s\xa0]*$/.test(a)}function E(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function D(a){return D[" "](a),a}D[" "]=function(){};var B=E().indexOf("Gecko")!=-1&&!(E().toLowerCase().indexOf("webkit")!=-1&&E().indexOf("Edge")==-1)&&!(E().indexOf("Trident")!=-1||E().indexOf("MSIE")!=-1)&&E().indexOf("Edge")==-1;function $(a,d,h){for(const v in a)d.call(h,a[v],v,a)}function w(a,d){for(const h in a)d.call(void 0,a[h],h,a)}function _(a){const d={};for(const h in a)d[h]=a[h];return d}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function P(a,d){let h,v;for(let L=1;L<arguments.length;L++){v=arguments[L];for(h in v)a[h]=v[h];for(let M=0;M<I.length;M++)h=I[M],Object.prototype.hasOwnProperty.call(v,h)&&(a[h]=v[h])}}function T(a){var d=1;a=a.split(":");const h=[];for(;0<d&&a.length;)h.push(a.shift()),d--;return a.length&&h.push(a.join(":")),h}function x(a){l.setTimeout(()=>{throw a},0)}function R(){var a=J;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class ye{constructor(){this.h=this.g=null}add(d,h){const v=fe.get();v.set(d,h),this.h?this.h.next=v:this.g=v,this.h=v}}var fe=new A(()=>new le,a=>a.reset());class le{constructor(){this.next=this.g=this.h=null}set(d,h){this.h=d,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Te,U=!1,J=new ye,H=()=>{const a=l.Promise.resolve(void 0);Te=()=>{a.then(X)}};var X=()=>{for(var a;a=R();){try{a.h.call(a.g)}catch(h){x(h)}var d=fe;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}U=!1};function re(){this.s=this.s,this.C=this.C}re.prototype.s=!1,re.prototype.ma=function(){this.s||(this.s=!0,this.N())},re.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var ee=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const h=()=>{};l.addEventListener("test",h,d),l.removeEventListener("test",h,d)}catch{}return a}();function de(a,d){if(oe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var h=this.type=a.type,v=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(B){e:{try{D(d.nodeName);var L=!0;break e}catch{}L=!1}L||(d=null)}}else h=="mouseover"?d=a.fromElement:h=="mouseout"&&(d=a.toElement);this.relatedTarget=d,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:he[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&de.aa.h.call(this)}}N(de,oe);var he={2:"touch",3:"pen",4:"mouse"};de.prototype.h=function(){de.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Ye="closure_listenable_"+(1e6*Math.random()|0),$t=0;function Sr(a,d,h,v,L){this.listener=a,this.proxy=null,this.src=d,this.type=h,this.capture=!!v,this.ha=L,this.key=++$t,this.da=this.fa=!1}function ko(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Po(a){this.src=a,this.g={},this.h=0}Po.prototype.add=function(a,d,h,v,L){var M=a.toString();a=this.g[M],a||(a=this.g[M]=[],this.h++);var G=No(a,d,v,L);return-1<G?(d=a[G],h||(d.fa=!1)):(d=new Sr(d,this.src,M,!!v,L),d.fa=h,a.push(d)),d};function ni(a,d){var h=d.type;if(h in a.g){var v=a.g[h],L=Array.prototype.indexOf.call(v,d,void 0),M;(M=0<=L)&&Array.prototype.splice.call(v,L,1),M&&(ko(d),a.g[h].length==0&&(delete a.g[h],a.h--))}}function No(a,d,h,v){for(var L=0;L<a.length;++L){var M=a[L];if(!M.da&&M.listener==d&&M.capture==!!h&&M.ha==v)return L}return-1}var kl="closure_lm_"+(1e6*Math.random()|0),Pl={};function Nn(a,d,h,v,L){if(Array.isArray(d)){for(var M=0;M<d.length;M++)Nn(a,d[M],h,v,L);return null}return h=xl(h),a&&a[Ye]?a.K(d,h,c(v)?!!v.capture:!1,L):ri(a,d,h,!1,v,L)}function ri(a,d,h,v,L,M){if(!d)throw Error("Invalid event type");var G=c(L)?!!L.capture:!!L,Ne=bo(a);if(Ne||(a[kl]=Ne=new Po(a)),h=Ne.add(d,h,v,G,M),h.proxy)return h;if(v=si(),h.proxy=v,v.src=a,v.listener=h,a.addEventListener)ee||(L=G),L===void 0&&(L=!1),a.addEventListener(d.toString(),v,L);else if(a.attachEvent)a.attachEvent(Nl(d.toString()),v);else if(a.addListener&&a.removeListener)a.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return h}function si(){function a(h){return d.call(a.src,a.listener,h)}const d=Pd;return a}function ps(a,d,h,v,L){if(Array.isArray(d))for(var M=0;M<d.length;M++)ps(a,d[M],h,v,L);else v=c(v)?!!v.capture:!!v,h=xl(h),a&&a[Ye]?(a=a.i,d=String(d).toString(),d in a.g&&(M=a.g[d],h=No(M,h,v,L),-1<h&&(ko(M[h]),Array.prototype.splice.call(M,h,1),M.length==0&&(delete a.g[d],a.h--)))):a&&(a=bo(a))&&(d=a.g[d.toString()],a=-1,d&&(a=No(d,h,v,L)),(h=-1<a?d[a]:null)&&xo(h))}function xo(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[Ye])ni(d.i,a);else{var h=a.type,v=a.proxy;d.removeEventListener?d.removeEventListener(h,v,a.capture):d.detachEvent?d.detachEvent(Nl(h),v):d.addListener&&d.removeListener&&d.removeListener(v),(h=bo(d))?(ni(h,a),h.h==0&&(h.src=null,d[kl]=null)):ko(a)}}}function Nl(a){return a in Pl?Pl[a]:Pl[a]="on"+a}function Pd(a,d){if(a.da)a=!0;else{d=new de(d,this);var h=a.listener,v=a.ha||a.src;a.fa&&xo(a),a=h.call(v,d)}return a}function bo(a){return a=a[kl],a instanceof Po?a:null}var Do="__closure_events_fn_"+(1e9*Math.random()>>>0);function xl(a){return typeof a=="function"?a:(a[Do]||(a[Do]=function(d){return a.handleEvent(d)}),a[Do])}function lt(){re.call(this),this.i=new Po(this),this.M=this,this.F=null}N(lt,re),lt.prototype[Ye]=!0,lt.prototype.removeEventListener=function(a,d,h,v){ps(this,a,d,h,v)};function ut(a,d){var h,v=a.F;if(v)for(h=[];v;v=v.F)h.push(v);if(a=a.M,v=d.type||d,typeof d=="string")d=new oe(d,a);else if(d instanceof oe)d.target=d.target||a;else{var L=d;d=new oe(v,a),P(d,L)}if(L=!0,h)for(var M=h.length-1;0<=M;M--){var G=d.g=h[M];L=ms(G,v,!0,d)&&L}if(G=d.g=a,L=ms(G,v,!0,d)&&L,L=ms(G,v,!1,d)&&L,h)for(M=0;M<h.length;M++)G=d.g=h[M],L=ms(G,v,!1,d)&&L}lt.prototype.N=function(){if(lt.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var h=a.g[d],v=0;v<h.length;v++)ko(h[v]);delete a.g[d],a.h--}}this.F=null},lt.prototype.K=function(a,d,h,v){return this.i.add(String(a),d,!1,h,v)},lt.prototype.L=function(a,d,h,v){return this.i.add(String(a),d,!0,h,v)};function ms(a,d,h,v){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var L=!0,M=0;M<d.length;++M){var G=d[M];if(G&&!G.da&&G.capture==h){var Ne=G.listener,pt=G.ha||G.src;G.fa&&ni(a.i,G),L=Ne.call(pt,v)!==!1&&L}}return L&&!v.defaultPrevented}function bl(a,d,h){if(typeof a=="function")h&&(a=g(a,h));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(a,d||0)}function ii(a){a.g=bl(()=>{a.g=null,a.i&&(a.i=!1,ii(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class Dl extends re{constructor(d,h){super(),this.m=d,this.l=h,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:ii(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function xn(a){re.call(this),this.h=a,this.g={}}N(xn,re);var bn=[];function oi(a){$(a.g,function(d,h){this.g.hasOwnProperty(h)&&xo(d)},a),a.g={}}xn.prototype.N=function(){xn.aa.N.call(this),oi(this)},xn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var gs=l.JSON.stringify,Ol=l.JSON.parse,Oo=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function ys(){}ys.prototype.h=null;function ai(a){return a.h||(a.h=a.i())}function Ar(){}var Rr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function li(){oe.call(this,"d")}N(li,oe);function ui(){oe.call(this,"c")}N(ui,oe);var yn={},Lo=null;function zt(){return Lo=Lo||new lt}yn.La="serverreachability";function Jn(a){oe.call(this,yn.La,a)}N(Jn,oe);function _s(a){const d=zt();ut(d,new Jn(d))}yn.STAT_EVENT="statevent";function Ll(a,d){oe.call(this,yn.STAT_EVENT,a),this.stat=d}N(Ll,oe);function Xe(a){const d=zt();ut(d,new Ll(d,a))}yn.Ma="timingevent";function vs(a,d){oe.call(this,yn.Ma,a),this.size=d}N(vs,oe);function _n(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},d)}function Cr(){this.g=!0}Cr.prototype.xa=function(){this.g=!1};function Vl(a,d,h,v,L,M){a.info(function(){if(a.g)if(M)for(var G="",Ne=M.split("&"),pt=0;pt<Ne.length;pt++){var Ee=Ne[pt].split("=");if(1<Ee.length){var At=Ee[0];Ee=Ee[1];var Rt=At.split("_");G=2<=Rt.length&&Rt[1]=="type"?G+(At+"="+Ee+"&"):G+(At+"=redacted&")}}else G=null;else G=M;return"XMLHTTP REQ ("+v+") [attempt "+L+"]: "+d+`
`+h+`
`+G})}function Ml(a,d,h,v,L,M,G){a.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+L+"]: "+d+`
`+h+`
`+M+" "+G})}function Zn(a,d,h,v){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+kr(a,h)+(v?" "+v:"")})}function jl(a,d){a.info(function(){return"TIMEOUT: "+d})}Cr.prototype.info=function(){};function kr(a,d){if(!a.g)return d;if(!d)return null;try{var h=JSON.parse(d);if(h){for(a=0;a<h.length;a++)if(Array.isArray(h[a])){var v=h[a];if(!(2>v.length)){var L=v[1];if(Array.isArray(L)&&!(1>L.length)){var M=L[0];if(M!="noop"&&M!="stop"&&M!="close")for(var G=1;G<L.length;G++)L[G]=""}}}}return gs(h)}catch{return d}}var vn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ci={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ws;function Pr(){}N(Pr,ys),Pr.prototype.g=function(){return new XMLHttpRequest},Pr.prototype.i=function(){return{}},ws=new Pr;function ln(a,d,h,v){this.j=a,this.i=d,this.l=h,this.R=v||1,this.U=new xn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Vo}function Vo(){this.i=null,this.g="",this.h=!1}var Mo={},di={};function jo(a,d,h){a.L=1,a.v=ql(Se(d)),a.m=h,a.P=!0,Dn(a,null)}function Dn(a,d){a.F=Date.now(),Es(a),a.A=Se(a.v);var h=a.A,v=a.R;Array.isArray(v)||(v=[String(v)]),Ym(h.i,"t",v),a.C=0,h=a.j.J,a.h=new Vo,a.g=pg(a.j,h?d:null,!a.m),0<a.O&&(a.M=new Dl(g(a.Y,a,a.g),a.O)),d=a.U,h=a.g,v=a.ca;var L="readystatechange";Array.isArray(L)||(L&&(bn[0]=L.toString()),L=bn);for(var M=0;M<L.length;M++){var G=Nn(h,L[M],v||d.handleEvent,!1,d.h||d);if(!G)break;d.g[G.key]=G}d=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),_s(),Vl(a.i,a.u,a.A,a.l,a.R,a.m)}ln.prototype.ca=function(a){a=a.target;const d=this.M;d&&er(a)==3?d.j():this.Y(a)},ln.prototype.Y=function(a){try{if(a==this.g)e:{const Rt=er(this.g);var d=this.g.Ba();const vi=this.g.Z();if(!(3>Rt)&&(Rt!=3||this.g&&(this.h.h||this.g.oa()||rg(this.g)))){this.J||Rt!=4||d==7||(d==8||0>=vi?_s(3):_s(2)),fi(this);var h=this.g.Z();this.X=h;t:if(Uo(this)){var v=rg(this.g);a="";var L=v.length,M=er(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){On(this),O(this);var G="";break t}this.h.i=new l.TextDecoder}for(d=0;d<L;d++)this.h.h=!0,a+=this.h.i.decode(v[d],{stream:!(M&&d==L-1)});v.length=0,this.h.g+=a,this.C=0,G=this.h.g}else G=this.g.oa();if(this.o=h==200,Ml(this.i,this.u,this.A,this.l,this.R,Rt,h),this.o){if(this.T&&!this.K){t:{if(this.g){var Ne,pt=this.g;if((Ne=pt.g?pt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(Ne)){var Ee=Ne;break t}}Ee=null}if(h=Ee)Zn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,pi(this,h);else{this.o=!1,this.s=3,Xe(12),On(this),O(this);break e}}if(this.P){h=!0;let wn;for(;!this.J&&this.C<G.length;)if(wn=Wm(this,G),wn==di){Rt==4&&(this.s=4,Xe(14),h=!1),Zn(this.i,this.l,null,"[Incomplete Response]");break}else if(wn==Mo){this.s=4,Xe(15),Zn(this.i,this.l,G,"[Invalid Chunk]"),h=!1;break}else Zn(this.i,this.l,wn,null),pi(this,wn);if(Uo(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Rt!=4||G.length!=0||this.h.h||(this.s=1,Xe(16),h=!1),this.o=this.o&&h,!h)Zn(this.i,this.l,G,"[Invalid Chunked Response]"),On(this),O(this);else if(0<G.length&&!this.W){this.W=!0;var At=this.j;At.g==this&&At.ba&&!At.M&&(At.j.info("Great, no buffering proxy detected. Bytes received: "+G.length),Od(At),At.M=!0,Xe(11))}}else Zn(this.i,this.l,G,null),pi(this,G);Rt==4&&On(this),this.o&&!this.J&&(Rt==4?cg(this.j,this):(this.o=!1,Es(this)))}else S0(this.g),h==400&&0<G.indexOf("Unknown SID")?(this.s=3,Xe(12)):(this.s=0,Xe(13)),On(this),O(this)}}}catch{}finally{}};function Uo(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Wm(a,d){var h=a.C,v=d.indexOf(`
`,h);return v==-1?di:(h=Number(d.substring(h,v)),isNaN(h)?Mo:(v+=1,v+h>d.length?di:(d=d.slice(v,v+h),a.C=v+h,d)))}ln.prototype.cancel=function(){this.J=!0,On(this)};function Es(a){a.S=Date.now()+a.I,hi(a,a.I)}function hi(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=_n(g(a.ba,a),d)}function fi(a){a.B&&(l.clearTimeout(a.B),a.B=null)}ln.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(jl(this.i,this.A),this.L!=2&&(_s(),Xe(17)),On(this),this.s=2,O(this)):hi(this,this.S-a)};function O(a){a.j.G==0||a.J||cg(a.j,a)}function On(a){fi(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,oi(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function pi(a,d){try{var h=a.j;if(h.G!=0&&(h.g==a||Fo(h.h,a))){if(!a.K&&Fo(h.h,a)&&h.G==3){try{var v=h.Da.g.parse(d)}catch{v=null}if(Array.isArray(v)&&v.length==3){var L=v;if(L[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<a.F)Yl(h),Kl(h);else break e;Dd(h),Xe(18)}}else h.za=L[1],0<h.za-h.T&&37500>L[2]&&h.F&&h.v==0&&!h.C&&(h.C=_n(g(h.Za,h),6e3));if(1>=Fl(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Ts(h,11)}else if((a.K||h.g==a)&&Yl(h),!y(d))for(L=h.Da.g.parse(d),d=0;d<L.length;d++){let Ee=L[d];if(h.T=Ee[0],Ee=Ee[1],h.G==2)if(Ee[0]=="c"){h.K=Ee[1],h.ia=Ee[2];const At=Ee[3];At!=null&&(h.la=At,h.j.info("VER="+h.la));const Rt=Ee[4];Rt!=null&&(h.Aa=Rt,h.j.info("SVER="+h.Aa));const vi=Ee[5];vi!=null&&typeof vi=="number"&&0<vi&&(v=1.5*vi,h.L=v,h.j.info("backChannelRequestTimeoutMs_="+v)),v=h;const wn=a.g;if(wn){const Jl=wn.g?wn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Jl){var M=v.h;M.g||Jl.indexOf("spdy")==-1&&Jl.indexOf("quic")==-1&&Jl.indexOf("h2")==-1||(M.j=M.l,M.g=new Set,M.h&&(mi(M,M.h),M.h=null))}if(v.D){const Ld=wn.g?wn.g.getResponseHeader("X-HTTP-Session-Id"):null;Ld&&(v.ya=Ld,De(v.I,v.D,Ld))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-a.F,h.j.info("Handshake RTT: "+h.R+"ms")),v=h;var G=a;if(v.qa=fg(v,v.J?v.ia:null,v.W),G.K){Bo(v.h,G);var Ne=G,pt=v.L;pt&&(Ne.I=pt),Ne.B&&(fi(Ne),Es(Ne)),v.g=G}else lg(v);0<h.i.length&&Ql(h)}else Ee[0]!="stop"&&Ee[0]!="close"||Ts(h,7);else h.G==3&&(Ee[0]=="stop"||Ee[0]=="close"?Ee[0]=="stop"?Ts(h,7):bd(h):Ee[0]!="noop"&&h.l&&h.l.ta(Ee),h.v=0)}}_s(4)}catch{}}var Nd=class{constructor(a,d){this.g=a,this.map=d}};function Ul(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Is(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Fl(a){return a.h?1:a.g?a.g.size:0}function Fo(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function mi(a,d){a.g?a.g.add(d):a.h=d}function Bo(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Ul.prototype.cancel=function(){if(this.i=gi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function gi(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const h of a.g.values())d=d.concat(h.D);return d}return b(a.i)}function Bl(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var d=[],h=a.length,v=0;v<h;v++)d.push(a[v]);return d}d=[],h=0;for(v in a)d[h++]=a[v];return d}function S(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var d=[];a=a.length;for(var h=0;h<a;h++)d.push(h);return d}d=[],h=0;for(const v in a)d[h++]=v;return d}}}function F(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var h=S(a),v=Bl(a),L=v.length,M=0;M<L;M++)d.call(void 0,v[M],h&&h[M],a)}var K=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Re(a,d){if(a){a=a.split("&");for(var h=0;h<a.length;h++){var v=a[h].indexOf("="),L=null;if(0<=v){var M=a[h].substring(0,v);L=a[h].substring(v+1)}else M=a[h];d(M,L?decodeURIComponent(L.replace(/\+/g," ")):"")}}}function Pe(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Pe){this.h=a.h,$l(this,a.j),this.o=a.o,this.g=a.g,zl(this,a.s),this.l=a.l;var d=a.i,h=new qo;h.i=d.i,d.g&&(h.g=new Map(d.g),h.h=d.h),Hm(this,h),this.m=a.m}else a&&(d=String(a).match(K))?(this.h=!1,$l(this,d[1]||"",!0),this.o=$o(d[2]||""),this.g=$o(d[3]||"",!0),zl(this,d[4]),this.l=$o(d[5]||"",!0),Hm(this,d[6]||"",!0),this.m=$o(d[7]||"")):(this.h=!1,this.i=new qo(null,this.h))}Pe.prototype.toString=function(){var a=[],d=this.j;d&&a.push(zo(d,Gm,!0),":");var h=this.g;return(h||d=="file")&&(a.push("//"),(d=this.o)&&a.push(zo(d,Gm,!0),"@"),a.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&a.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&a.push("/"),a.push(zo(h,h.charAt(0)=="/"?p0:f0,!0))),(h=this.i.toString())&&a.push("?",h),(h=this.m)&&a.push("#",zo(h,g0)),a.join("")};function Se(a){return new Pe(a)}function $l(a,d,h){a.j=h?$o(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function zl(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Hm(a,d,h){d instanceof qo?(a.i=d,y0(a.i,a.h)):(h||(d=zo(d,m0)),a.i=new qo(d,a.h))}function De(a,d,h){a.i.set(d,h)}function ql(a){return De(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function $o(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function zo(a,d,h){return typeof a=="string"?(a=encodeURI(a).replace(d,h0),h&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function h0(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Gm=/[#\/\?@]/g,f0=/[#\?:]/g,p0=/[#\?]/g,m0=/[#\?@]/g,g0=/#/g;function qo(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function Nr(a){a.g||(a.g=new Map,a.h=0,a.i&&Re(a.i,function(d,h){a.add(decodeURIComponent(d.replace(/\+/g," ")),h)}))}t=qo.prototype,t.add=function(a,d){Nr(this),this.i=null,a=yi(this,a);var h=this.g.get(a);return h||this.g.set(a,h=[]),h.push(d),this.h+=1,this};function Km(a,d){Nr(a),d=yi(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function Qm(a,d){return Nr(a),d=yi(a,d),a.g.has(d)}t.forEach=function(a,d){Nr(this),this.g.forEach(function(h,v){h.forEach(function(L){a.call(d,L,v,this)},this)},this)},t.na=function(){Nr(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),h=[];for(let v=0;v<d.length;v++){const L=a[v];for(let M=0;M<L.length;M++)h.push(d[v])}return h},t.V=function(a){Nr(this);let d=[];if(typeof a=="string")Qm(this,a)&&(d=d.concat(this.g.get(yi(this,a))));else{a=Array.from(this.g.values());for(let h=0;h<a.length;h++)d=d.concat(a[h])}return d},t.set=function(a,d){return Nr(this),this.i=null,a=yi(this,a),Qm(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},t.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function Ym(a,d,h){Km(a,d),0<h.length&&(a.i=null,a.g.set(yi(a,d),b(h)),a.h+=h.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var h=0;h<d.length;h++){var v=d[h];const M=encodeURIComponent(String(v)),G=this.V(v);for(v=0;v<G.length;v++){var L=M;G[v]!==""&&(L+="="+encodeURIComponent(String(G[v]))),a.push(L)}}return this.i=a.join("&")};function yi(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function y0(a,d){d&&!a.j&&(Nr(a),a.i=null,a.g.forEach(function(h,v){var L=v.toLowerCase();v!=L&&(Km(this,v),Ym(this,L,h))},a)),a.j=d}function _0(a,d){const h=new Cr;if(l.Image){const v=new Image;v.onload=C(xr,h,"TestLoadImage: loaded",!0,d,v),v.onerror=C(xr,h,"TestLoadImage: error",!1,d,v),v.onabort=C(xr,h,"TestLoadImage: abort",!1,d,v),v.ontimeout=C(xr,h,"TestLoadImage: timeout",!1,d,v),l.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=a}else d(!1)}function v0(a,d){const h=new Cr,v=new AbortController,L=setTimeout(()=>{v.abort(),xr(h,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:v.signal}).then(M=>{clearTimeout(L),M.ok?xr(h,"TestPingServer: ok",!0,d):xr(h,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(L),xr(h,"TestPingServer: error",!1,d)})}function xr(a,d,h,v,L){try{L&&(L.onload=null,L.onerror=null,L.onabort=null,L.ontimeout=null),v(h)}catch{}}function w0(){this.g=new Oo}function E0(a,d,h){const v=h||"";try{F(a,function(L,M){let G=L;c(L)&&(G=gs(L)),d.push(v+M+"="+encodeURIComponent(G))})}catch(L){throw d.push(v+"type="+encodeURIComponent("_badmap")),L}}function Wl(a){this.l=a.Ub||null,this.j=a.eb||!1}N(Wl,ys),Wl.prototype.g=function(){return new Hl(this.l,this.j)},Wl.prototype.i=function(a){return function(){return a}}({});function Hl(a,d){lt.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}N(Hl,lt),t=Hl.prototype,t.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,Ho(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Wo(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ho(this)),this.g&&(this.readyState=3,Ho(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Xm(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Xm(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?Wo(this):Ho(this),this.readyState==3&&Xm(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Wo(this))},t.Qa=function(a){this.g&&(this.response=a,Wo(this))},t.ga=function(){this.g&&Wo(this)};function Wo(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ho(a)}t.setRequestHeader=function(a,d){this.u.append(a,d)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var h=d.next();!h.done;)h=h.value,a.push(h[0]+": "+h[1]),h=d.next();return a.join(`\r
`)};function Ho(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Hl.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Jm(a){let d="";return $(a,function(h,v){d+=v,d+=":",d+=h,d+=`\r
`}),d}function xd(a,d,h){e:{for(v in h){var v=!1;break e}v=!0}v||(h=Jm(h),typeof a=="string"?h!=null&&encodeURIComponent(String(h)):De(a,d,h))}function Be(a){lt.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}N(Be,lt);var I0=/^https?$/i,T0=["POST","PUT"];t=Be.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,d,h,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ws.g(),this.v=this.o?ai(this.o):ai(ws),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(M){Zm(this,M);return}if(a=h||"",h=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var L in v)h.set(L,v[L]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const M of v.keys())h.set(M,v.get(M));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(h.keys()).find(M=>M.toLowerCase()=="content-type"),L=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(T0,d,void 0))||v||L||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[M,G]of h)this.g.setRequestHeader(M,G);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ng(this),this.u=!0,this.g.send(a),this.u=!1}catch(M){Zm(this,M)}};function Zm(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,eg(a),Gl(a)}function eg(a){a.A||(a.A=!0,ut(a,"complete"),ut(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,ut(this,"complete"),ut(this,"abort"),Gl(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Gl(this,!0)),Be.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?tg(this):this.bb())},t.bb=function(){tg(this)};function tg(a){if(a.h&&typeof o<"u"&&(!a.v[1]||er(a)!=4||a.Z()!=2)){if(a.u&&er(a)==4)bl(a.Ea,0,a);else if(ut(a,"readystatechange"),er(a)==4){a.h=!1;try{const G=a.Z();e:switch(G){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var h;if(!(h=d)){var v;if(v=G===0){var L=String(a.D).match(K)[1]||null;!L&&l.self&&l.self.location&&(L=l.self.location.protocol.slice(0,-1)),v=!I0.test(L?L.toLowerCase():"")}h=v}if(h)ut(a,"complete"),ut(a,"success");else{a.m=6;try{var M=2<er(a)?a.g.statusText:""}catch{M=""}a.l=M+" ["+a.Z()+"]",eg(a)}}finally{Gl(a)}}}}function Gl(a,d){if(a.g){ng(a);const h=a.g,v=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||ut(a,"ready");try{h.onreadystatechange=v}catch{}}}function ng(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function er(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<er(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),Ol(d)}};function rg(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function S0(a){const d={};a=(a.g&&2<=er(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<a.length;v++){if(y(a[v]))continue;var h=T(a[v]);const L=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const M=d[L]||[];d[L]=M,M.push(h)}w(d,function(v){return v.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Go(a,d,h){return h&&h.internalChannelParams&&h.internalChannelParams[a]||d}function sg(a){this.Aa=0,this.i=[],this.j=new Cr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Go("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Go("baseRetryDelayMs",5e3,a),this.cb=Go("retryDelaySeedMs",1e4,a),this.Wa=Go("forwardChannelMaxRetries",2,a),this.wa=Go("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Ul(a&&a.concurrentRequestLimit),this.Da=new w0,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=sg.prototype,t.la=8,t.G=1,t.connect=function(a,d,h,v){Xe(0),this.W=a,this.H=d||{},h&&v!==void 0&&(this.H.OSID=h,this.H.OAID=v),this.F=this.X,this.I=fg(this,null,this.W),Ql(this)};function bd(a){if(ig(a),a.G==3){var d=a.U++,h=Se(a.I);if(De(h,"SID",a.K),De(h,"RID",d),De(h,"TYPE","terminate"),Ko(a,h),d=new ln(a,a.j,d),d.L=2,d.v=ql(Se(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=d.v,h=!0),h||(d.g=pg(d.j,null),d.g.ea(d.v)),d.F=Date.now(),Es(d)}hg(a)}function Kl(a){a.g&&(Od(a),a.g.cancel(),a.g=null)}function ig(a){Kl(a),a.u&&(l.clearTimeout(a.u),a.u=null),Yl(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Ql(a){if(!Is(a.h)&&!a.s){a.s=!0;var d=a.Ga;Te||H(),U||(Te(),U=!0),J.add(d,a),a.B=0}}function A0(a,d){return Fl(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=_n(g(a.Ga,a,d),dg(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const L=new ln(this,this.j,a);let M=this.o;if(this.S&&(M?(M=_(M),P(M,this.S)):M=this.S),this.m!==null||this.O||(L.H=M,M=null),this.P)e:{for(var d=0,h=0;h<this.i.length;h++){t:{var v=this.i[h];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(d+=v,4096<d){d=h;break e}if(d===4096||h===this.i.length-1){d=h+1;break e}}d=1e3}else d=1e3;d=ag(this,L,d),h=Se(this.I),De(h,"RID",a),De(h,"CVER",22),this.D&&De(h,"X-HTTP-Session-Id",this.D),Ko(this,h),M&&(this.O?d="headers="+encodeURIComponent(String(Jm(M)))+"&"+d:this.m&&xd(h,this.m,M)),mi(this.h,L),this.Ua&&De(h,"TYPE","init"),this.P?(De(h,"$req",d),De(h,"SID","null"),L.T=!0,jo(L,h,null)):jo(L,h,d),this.G=2}}else this.G==3&&(a?og(this,a):this.i.length==0||Is(this.h)||og(this))};function og(a,d){var h;d?h=d.l:h=a.U++;const v=Se(a.I);De(v,"SID",a.K),De(v,"RID",h),De(v,"AID",a.T),Ko(a,v),a.m&&a.o&&xd(v,a.m,a.o),h=new ln(a,a.j,h,a.B+1),a.m===null&&(h.H=a.o),d&&(a.i=d.D.concat(a.i)),d=ag(a,h,1e3),h.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),mi(a.h,h),jo(h,v,d)}function Ko(a,d){a.H&&$(a.H,function(h,v){De(d,v,h)}),a.l&&F({},function(h,v){De(d,v,h)})}function ag(a,d,h){h=Math.min(a.i.length,h);var v=a.l?g(a.l.Na,a.l,a):null;e:{var L=a.i;let M=-1;for(;;){const G=["count="+h];M==-1?0<h?(M=L[0].g,G.push("ofs="+M)):M=0:G.push("ofs="+M);let Ne=!0;for(let pt=0;pt<h;pt++){let Ee=L[pt].g;const At=L[pt].map;if(Ee-=M,0>Ee)M=Math.max(0,L[pt].g-100),Ne=!1;else try{E0(At,G,"req"+Ee+"_")}catch{v&&v(At)}}if(Ne){v=G.join("&");break e}}}return a=a.i.splice(0,h),d.D=a,v}function lg(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;Te||H(),U||(Te(),U=!0),J.add(d,a),a.v=0}}function Dd(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=_n(g(a.Fa,a),dg(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,ug(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=_n(g(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Xe(10),Kl(this),ug(this))};function Od(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function ug(a){a.g=new ln(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=Se(a.qa);De(d,"RID","rpc"),De(d,"SID",a.K),De(d,"AID",a.T),De(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&De(d,"TO",a.ja),De(d,"TYPE","xmlhttp"),Ko(a,d),a.m&&a.o&&xd(d,a.m,a.o),a.L&&(a.g.I=a.L);var h=a.g;a=a.ia,h.L=1,h.v=ql(Se(d)),h.m=null,h.P=!0,Dn(h,a)}t.Za=function(){this.C!=null&&(this.C=null,Kl(this),Dd(this),Xe(19))};function Yl(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function cg(a,d){var h=null;if(a.g==d){Yl(a),Od(a),a.g=null;var v=2}else if(Fo(a.h,d))h=d.D,Bo(a.h,d),v=1;else return;if(a.G!=0){if(d.o)if(v==1){h=d.m?d.m.length:0,d=Date.now()-d.F;var L=a.B;v=zt(),ut(v,new vs(v,h)),Ql(a)}else lg(a);else if(L=d.s,L==3||L==0&&0<d.X||!(v==1&&A0(a,d)||v==2&&Dd(a)))switch(h&&0<h.length&&(d=a.h,d.i=d.i.concat(h)),L){case 1:Ts(a,5);break;case 4:Ts(a,10);break;case 3:Ts(a,6);break;default:Ts(a,2)}}}function dg(a,d){let h=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(h*=2),h*d}function Ts(a,d){if(a.j.info("Error code "+d),d==2){var h=g(a.fb,a),v=a.Xa;const L=!v;v=new Pe(v||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||$l(v,"https"),ql(v),L?_0(v.toString(),h):v0(v.toString(),h)}else Xe(2);a.G=0,a.l&&a.l.sa(d),hg(a),ig(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Xe(2)):(this.j.info("Failed to ping google.com"),Xe(1))};function hg(a){if(a.G=0,a.ka=[],a.l){const d=gi(a.h);(d.length!=0||a.i.length!=0)&&(k(a.ka,d),k(a.ka,a.i),a.h.i.length=0,b(a.i),a.i.length=0),a.l.ra()}}function fg(a,d,h){var v=h instanceof Pe?Se(h):new Pe(h);if(v.g!="")d&&(v.g=d+"."+v.g),zl(v,v.s);else{var L=l.location;v=L.protocol,d=d?d+"."+L.hostname:L.hostname,L=+L.port;var M=new Pe(null);v&&$l(M,v),d&&(M.g=d),L&&zl(M,L),h&&(M.l=h),v=M}return h=a.D,d=a.ya,h&&d&&De(v,h,d),De(v,"VER",a.la),Ko(a,v),v}function pg(a,d,h){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Be(new Wl({eb:h})):new Be(a.pa),d.Ha(a.J),d}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function mg(){}t=mg.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Xl(){}Xl.prototype.g=function(a,d){return new Yt(a,d)};function Yt(a,d){lt.call(this),this.g=new sg(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!y(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!y(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new _i(this)}N(Yt,lt),Yt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Yt.prototype.close=function(){bd(this.g)},Yt.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var h={};h.__data__=a,a=h}else this.u&&(h={},h.__data__=gs(a),a=h);d.i.push(new Nd(d.Ya++,a)),d.G==3&&Ql(d)},Yt.prototype.N=function(){this.g.l=null,delete this.j,bd(this.g),delete this.g,Yt.aa.N.call(this)};function gg(a){li.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const h in d){a=h;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}N(gg,li);function yg(){ui.call(this),this.status=1}N(yg,ui);function _i(a){this.g=a}N(_i,mg),_i.prototype.ua=function(){ut(this.g,"a")},_i.prototype.ta=function(a){ut(this.g,new gg(a))},_i.prototype.sa=function(a){ut(this.g,new yg)},_i.prototype.ra=function(){ut(this.g,"b")},Xl.prototype.createWebChannel=Xl.prototype.g,Yt.prototype.send=Yt.prototype.o,Yt.prototype.open=Yt.prototype.m,Yt.prototype.close=Yt.prototype.close,AI=function(){return new Xl},SI=function(){return zt()},TI=yn,Sf={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},vn.NO_ERROR=0,vn.TIMEOUT=8,vn.HTTP_ERROR=6,Fu=vn,ci.COMPLETE="complete",II=ci,Ar.EventType=Rr,Rr.OPEN="a",Rr.CLOSE="b",Rr.ERROR="c",Rr.MESSAGE="d",lt.prototype.listen=lt.prototype.K,ha=Ar,Be.prototype.listenOnce=Be.prototype.L,Be.prototype.getLastError=Be.prototype.Ka,Be.prototype.getLastErrorCode=Be.prototype.Ba,Be.prototype.getStatus=Be.prototype.Z,Be.prototype.getResponseJson=Be.prototype.Oa,Be.prototype.getResponseText=Be.prototype.oa,Be.prototype.send=Be.prototype.ea,Be.prototype.setWithCredentials=Be.prototype.Ha,EI=Be}).apply(typeof yu<"u"?yu:typeof self<"u"?self:typeof window<"u"?window:{});const s_="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Nt.UNAUTHENTICATED=new Nt(null),Nt.GOOGLE_CREDENTIALS=new Nt("google-credentials-uid"),Nt.FIRST_PARTY=new Nt("first-party-uid"),Nt.MOCK_USER=new Nt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vo="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zs=new Op("@firebase/firestore");function ra(){return zs.logLevel}function te(t,...e){if(zs.logLevel<=ge.DEBUG){const n=e.map(Hp);zs.debug(`Firestore (${vo}): ${t}`,...n)}}function yr(t,...e){if(zs.logLevel<=ge.ERROR){const n=e.map(Hp);zs.error(`Firestore (${vo}): ${t}`,...n)}}function no(t,...e){if(zs.logLevel<=ge.WARN){const n=e.map(Hp);zs.warn(`Firestore (${vo}): ${t}`,...n)}}function Hp(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(t="Unexpected state"){const e=`FIRESTORE (${vo}) INTERNAL ASSERTION FAILED: `+t;throw yr(e),new Error(e)}function we(t,e){t||se()}function ae(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Q extends Xn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class AN{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Nt.UNAUTHENTICATED))}shutdown(){}}class RN{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class CN{constructor(e){this.t=e,this.currentUser=Nt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){we(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new Wn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Wn,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{te("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(te("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Wn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(te("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(we(typeof r.accessToken=="string"),new RI(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return we(e===null||typeof e=="string"),new Nt(e)}}class kN{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=Nt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class PN{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new kN(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(Nt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class NN{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class xN{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){we(this.o===void 0);const r=i=>{i.error!=null&&te("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,te("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{te("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):te("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(we(typeof n.token=="string"),this.R=n.token,new NN(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bN(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=bN(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function Ie(t,e){return t<e?-1:t>e?1:0}function ro(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new Q(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new Q(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new Q(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Q(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Qe.fromMillis(Date.now())}static fromDate(e){return Qe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Qe(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Ie(this.nanoseconds,e.nanoseconds):Ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ie(e)}static min(){return new ie(new Qe(0,0))}static max(){return new ie(new Qe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e,n,r){n===void 0?n=0:n>e.length&&se(),r===void 0?r=e.length-n:r>e.length-n&&se(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return tl.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof tl?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class xe extends tl{construct(e,n,r){return new xe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new Q(j.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new xe(n)}static emptyPath(){return new xe([])}}const DN=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class yt extends tl{construct(e,n,r){return new yt(e,n,r)}static isValidIdentifier(e){return DN.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),yt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new yt(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new Q(j.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new Q(j.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new Q(j.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new Q(j.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new yt(n)}static emptyPath(){return new yt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e){this.path=e}static fromPath(e){return new ne(xe.fromString(e))}static fromName(e){return new ne(xe.fromString(e).popFirst(5))}static empty(){return new ne(xe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&xe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return xe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ne(new xe(e.slice()))}}function ON(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ie.fromTimestamp(r===1e9?new Qe(n+1,0):new Qe(n,r));return new as(s,ne.empty(),e)}function LN(t){return new as(t.readTime,t.key,-1)}class as{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new as(ie.min(),ne.empty(),-1)}static max(){return new as(ie.max(),ne.empty(),-1)}}function VN(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=ne.comparator(t.documentKey,e.documentKey),n!==0?n:Ie(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MN="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class jN{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _l(t){if(t.code!==j.FAILED_PRECONDITION||t.message!==MN)throw t;te("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&se(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new z((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof z?n:z.resolve(n)}catch(n){return z.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):z.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):z.reject(n)}static resolve(e){return new z((n,r)=>{n(e)})}static reject(e){return new z((n,r)=>{r(e)})}static waitFor(e){return new z((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},u=>r(u))}),o=!0,i===s&&n()})}static or(e){let n=z.resolve(!1);for(const r of e)n=n.next(s=>s?z.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new z((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let u=0;u<i;u++){const c=u;n(e[c]).next(f=>{o[c]=f,++l,l===i&&r(o)},f=>s(f))}})}static doWhile(e,n){return new z((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function UN(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function vl(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Gp.oe=-1;function wl(t){return t==null}function Ec(t){return t===0&&1/t==-1/0}function FN(t){return typeof t=="number"&&Number.isInteger(t)&&!Ec(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i_(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Js(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function kI(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,n){this.comparator=e,this.root=n||gt.EMPTY}insert(e,n){return new Fe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,gt.BLACK,null,null))}remove(e){return new Fe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,gt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new _u(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new _u(this.root,e,this.comparator,!1)}getReverseIterator(){return new _u(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new _u(this.root,e,this.comparator,!0)}}class _u{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class gt{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??gt.RED,this.left=s??gt.EMPTY,this.right=i??gt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new gt(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return gt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return gt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,gt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,gt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw se();const e=this.left.check();if(e!==this.right.check())throw se();return e+(this.isRed()?0:1)}}gt.EMPTY=null,gt.RED=!0,gt.BLACK=!1;gt.EMPTY=new class{constructor(){this.size=0}get key(){throw se()}get value(){throw se()}get color(){throw se()}get left(){throw se()}get right(){throw se()}copy(e,n,r,s,i){return this}insert(e,n,r){return new gt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.comparator=e,this.data=new Fe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new o_(this.data.getIterator())}getIteratorFrom(e){return new o_(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof wt)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new wt(this.comparator);return n.data=e,n}}class o_{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this.fields=e,e.sort(yt.comparator)}static empty(){return new Zt([])}unionWith(e){let n=new wt(yt.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Zt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ro(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new PI("Invalid base64 string: "+i):i}}(e);return new Tt(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new Tt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Tt.EMPTY_BYTE_STRING=new Tt("");const BN=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ls(t){if(we(!!t),typeof t=="string"){let e=0;const n=BN.exec(t);if(we(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ge(t.seconds),nanos:Ge(t.nanos)}}function Ge(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function qs(t){return typeof t=="string"?Tt.fromBase64String(t):Tt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Qp(t){const e=t.mapValue.fields.__previous_value__;return Kp(e)?Qp(e):e}function nl(t){const e=ls(t.mapValue.fields.__local_write_time__.timestampValue);return new Qe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $N{constructor(e,n,r,s,i,o,l,u,c){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c}}class rl{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new rl("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof rl&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu={mapValue:{}};function Ws(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Kp(t)?4:qN(t)?9007199254740991:zN(t)?10:11:se()}function Qn(t,e){if(t===e)return!0;const n=Ws(t);if(n!==Ws(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return nl(t).isEqual(nl(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=ls(s.timestampValue),l=ls(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return qs(s.bytesValue).isEqual(qs(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ge(s.geoPointValue.latitude)===Ge(i.geoPointValue.latitude)&&Ge(s.geoPointValue.longitude)===Ge(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ge(s.integerValue)===Ge(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ge(s.doubleValue),l=Ge(i.doubleValue);return o===l?Ec(o)===Ec(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return ro(t.arrayValue.values||[],e.arrayValue.values||[],Qn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(i_(o)!==i_(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!Qn(o[u],l[u])))return!1;return!0}(t,e);default:return se()}}function sl(t,e){return(t.values||[]).find(n=>Qn(n,e))!==void 0}function so(t,e){if(t===e)return 0;const n=Ws(t),r=Ws(e);if(n!==r)return Ie(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ie(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Ge(i.integerValue||i.doubleValue),u=Ge(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return a_(t.timestampValue,e.timestampValue);case 4:return a_(nl(t),nl(e));case 5:return Ie(t.stringValue,e.stringValue);case 6:return function(i,o){const l=qs(i),u=qs(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const f=Ie(l[c],u[c]);if(f!==0)return f}return Ie(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=Ie(Ge(i.latitude),Ge(o.latitude));return l!==0?l:Ie(Ge(i.longitude),Ge(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return l_(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,u,c,f;const p=i.fields||{},g=o.fields||{},C=(l=p.value)===null||l===void 0?void 0:l.arrayValue,N=(u=g.value)===null||u===void 0?void 0:u.arrayValue,b=Ie(((c=C==null?void 0:C.values)===null||c===void 0?void 0:c.length)||0,((f=N==null?void 0:N.values)===null||f===void 0?void 0:f.length)||0);return b!==0?b:l_(C,N)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===vu.mapValue&&o===vu.mapValue)return 0;if(i===vu.mapValue)return 1;if(o===vu.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),c=o.fields||{},f=Object.keys(c);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const g=Ie(u[p],f[p]);if(g!==0)return g;const C=so(l[u[p]],c[f[p]]);if(C!==0)return C}return Ie(u.length,f.length)}(t.mapValue,e.mapValue);default:throw se()}}function a_(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Ie(t,e);const n=ls(t),r=ls(e),s=Ie(n.seconds,r.seconds);return s!==0?s:Ie(n.nanos,r.nanos)}function l_(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=so(n[s],r[s]);if(i)return i}return Ie(n.length,r.length)}function io(t){return Af(t)}function Af(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=ls(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return qs(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return ne.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Af(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Af(n.fields[o])}`;return s+"}"}(t.mapValue):se()}function u_(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Rf(t){return!!t&&"integerValue"in t}function Yp(t){return!!t&&"arrayValue"in t}function c_(t){return!!t&&"nullValue"in t}function d_(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Bu(t){return!!t&&"mapValue"in t}function zN(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function Ra(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Js(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Ra(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ra(t.arrayValue.values[n]);return e}return Object.assign({},t)}function qN(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this.value=e}static empty(){return new Mt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Bu(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ra(n)}setAll(e){let n=yt.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=Ra(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());Bu(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Qn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];Bu(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Js(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Mt(Ra(this.value))}}function NI(t){const e=[];return Js(t.fields,(n,r)=>{const s=new yt([n]);if(Bu(r)){const i=NI(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Zt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new ht(e,0,ie.min(),ie.min(),ie.min(),Mt.empty(),0)}static newFoundDocument(e,n,r,s){return new ht(e,1,n,ie.min(),r,s,0)}static newNoDocument(e,n){return new ht(e,2,n,ie.min(),ie.min(),Mt.empty(),0)}static newUnknownDocument(e,n){return new ht(e,3,n,ie.min(),ie.min(),Mt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ie.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Mt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Mt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ie.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ht&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ht(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(e,n){this.position=e,this.inclusive=n}}function h_(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=ne.comparator(ne.fromName(o.referenceValue),n.key):r=so(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function f_(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Qn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e,n="asc"){this.field=e,this.dir=n}}function WN(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{}class tt extends xI{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new GN(e,n,r):n==="array-contains"?new YN(e,r):n==="in"?new XN(e,r):n==="not-in"?new JN(e,r):n==="array-contains-any"?new ZN(e,r):new tt(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new KN(e,r):new QN(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(so(n,this.value)):n!==null&&Ws(this.value)===Ws(n)&&this.matchesComparison(so(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return se()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class kn extends xI{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new kn(e,n)}matches(e){return bI(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function bI(t){return t.op==="and"}function DI(t){return HN(t)&&bI(t)}function HN(t){for(const e of t.filters)if(e instanceof kn)return!1;return!0}function Cf(t){if(t instanceof tt)return t.field.canonicalString()+t.op.toString()+io(t.value);if(DI(t))return t.filters.map(e=>Cf(e)).join(",");{const e=t.filters.map(n=>Cf(n)).join(",");return`${t.op}(${e})`}}function OI(t,e){return t instanceof tt?function(r,s){return s instanceof tt&&r.op===s.op&&r.field.isEqual(s.field)&&Qn(r.value,s.value)}(t,e):t instanceof kn?function(r,s){return s instanceof kn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&OI(o,s.filters[l]),!0):!1}(t,e):void se()}function LI(t){return t instanceof tt?function(n){return`${n.field.canonicalString()} ${n.op} ${io(n.value)}`}(t):t instanceof kn?function(n){return n.op.toString()+" {"+n.getFilters().map(LI).join(" ,")+"}"}(t):"Filter"}class GN extends tt{constructor(e,n,r){super(e,n,r),this.key=ne.fromName(r.referenceValue)}matches(e){const n=ne.comparator(e.key,this.key);return this.matchesComparison(n)}}class KN extends tt{constructor(e,n){super(e,"in",n),this.keys=VI("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class QN extends tt{constructor(e,n){super(e,"not-in",n),this.keys=VI("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function VI(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>ne.fromName(r.referenceValue))}class YN extends tt{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Yp(n)&&sl(n.arrayValue,this.value)}}class XN extends tt{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&sl(this.value.arrayValue,n)}}class JN extends tt{constructor(e,n){super(e,"not-in",n)}matches(e){if(sl(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!sl(this.value.arrayValue,n)}}class ZN extends tt{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Yp(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>sl(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e1{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function p_(t,e=null,n=[],r=[],s=null,i=null,o=null){return new e1(t,e,n,r,s,i,o)}function Xp(t){const e=ae(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Cf(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),wl(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>io(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>io(r)).join(",")),e.ue=n}return e.ue}function Jp(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!WN(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!OI(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!f_(t.startAt,e.startAt)&&f_(t.endAt,e.endAt)}function kf(t){return ne.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function t1(t,e,n,r,s,i,o,l){return new wo(t,e,n,r,s,i,o,l)}function ld(t){return new wo(t)}function m_(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function MI(t){return t.collectionGroup!==null}function Ca(t){const e=ae(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new wt(yt.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new il(i,r))}),n.has(yt.keyField().canonicalString())||e.ce.push(new il(yt.keyField(),r))}return e.ce}function Hn(t){const e=ae(t);return e.le||(e.le=n1(e,Ca(t))),e.le}function n1(t,e){if(t.limitType==="F")return p_(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new il(s.field,i)});const n=t.endAt?new Ic(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Ic(t.startAt.position,t.startAt.inclusive):null;return p_(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Pf(t,e){const n=t.filters.concat([e]);return new wo(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Tc(t,e,n){return new wo(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ud(t,e){return Jp(Hn(t),Hn(e))&&t.limitType===e.limitType}function jI(t){return`${Xp(Hn(t))}|lt:${t.limitType}`}function Ei(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>LI(s)).join(", ")}]`),wl(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>io(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>io(s)).join(",")),`Target(${r})`}(Hn(t))}; limitType=${t.limitType})`}function cd(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):ne.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of Ca(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,u){const c=h_(o,l,u);return o.inclusive?c<=0:c<0}(r.startAt,Ca(r),s)||r.endAt&&!function(o,l,u){const c=h_(o,l,u);return o.inclusive?c>=0:c>0}(r.endAt,Ca(r),s))}(t,e)}function r1(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function UI(t){return(e,n)=>{let r=!1;for(const s of Ca(t)){const i=s1(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function s1(t,e,n){const r=t.field.isKeyField()?ne.comparator(e.key,n.key):function(i,o,l){const u=o.data.field(i),c=l.data.field(i);return u!==null&&c!==null?so(u,c):se()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return se()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Js(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return kI(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i1=new Fe(ne.comparator);function _r(){return i1}const FI=new Fe(ne.comparator);function fa(...t){let e=FI;for(const n of t)e=e.insert(n.key,n);return e}function BI(t){let e=FI;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Ns(){return ka()}function $I(){return ka()}function ka(){return new Eo(t=>t.toString(),(t,e)=>t.isEqual(e))}const o1=new Fe(ne.comparator),a1=new wt(ne.comparator);function me(...t){let e=a1;for(const n of t)e=e.add(n);return e}const l1=new wt(Ie);function u1(){return l1}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zp(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ec(e)?"-0":e}}function zI(t){return{integerValue:""+t}}function qI(t,e){return FN(e)?zI(e):Zp(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(){this._=void 0}}function c1(t,e,n){return t instanceof ol?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Kp(i)&&(i=Qp(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof oo?HI(t,e):t instanceof ao?GI(t,e):function(s,i){const o=WI(s,i),l=g_(o)+g_(s.Pe);return Rf(o)&&Rf(s.Pe)?zI(l):Zp(s.serializer,l)}(t,e)}function d1(t,e,n){return t instanceof oo?HI(t,e):t instanceof ao?GI(t,e):n}function WI(t,e){return t instanceof al?function(r){return Rf(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class ol extends dd{}class oo extends dd{constructor(e){super(),this.elements=e}}function HI(t,e){const n=KI(e);for(const r of t.elements)n.some(s=>Qn(s,r))||n.push(r);return{arrayValue:{values:n}}}class ao extends dd{constructor(e){super(),this.elements=e}}function GI(t,e){let n=KI(e);for(const r of t.elements)n=n.filter(s=>!Qn(s,r));return{arrayValue:{values:n}}}class al extends dd{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function g_(t){return Ge(t.integerValue||t.doubleValue)}function KI(t){return Yp(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e,n){this.field=e,this.transform=n}}function h1(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof oo&&s instanceof oo||r instanceof ao&&s instanceof ao?ro(r.elements,s.elements,Qn):r instanceof al&&s instanceof al?Qn(r.Pe,s.Pe):r instanceof ol&&s instanceof ol}(t.transform,e.transform)}class f1{constructor(e,n){this.version=e,this.transformResults=n}}class nt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new nt}static exists(e){return new nt(void 0,e)}static updateTime(e){return new nt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function $u(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class fd{}function QI(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Il(t.key,nt.none()):new El(t.key,t.data,nt.none());{const n=t.data,r=Mt.empty();let s=new wt(yt.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new fs(t.key,r,new Zt(s.toArray()),nt.none())}}function p1(t,e,n){t instanceof El?function(s,i,o){const l=s.value.clone(),u=__(s.fieldTransforms,i,o.transformResults);l.setAll(u),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof fs?function(s,i,o){if(!$u(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=__(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(YI(s)),u.setAll(l),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Pa(t,e,n,r){return t instanceof El?function(i,o,l,u){if(!$u(i.precondition,o))return l;const c=i.value.clone(),f=v_(i.fieldTransforms,u,o);return c.setAll(f),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof fs?function(i,o,l,u){if(!$u(i.precondition,o))return l;const c=v_(i.fieldTransforms,u,o),f=o.data;return f.setAll(YI(i)),f.setAll(c),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,o,l){return $u(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function m1(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=WI(r.transform,s||null);i!=null&&(n===null&&(n=Mt.empty()),n.set(r.field,i))}return n||null}function y_(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ro(r,s,(i,o)=>h1(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class El extends fd{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class fs extends fd{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function YI(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function __(t,e,n){const r=new Map;we(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,d1(o,l,n[s]))}return r}function v_(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,c1(i,o,e))}return r}class Il extends fd{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class XI extends fd{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g1{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&p1(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Pa(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Pa(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=$I();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const u=QI(o,l);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(ie.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),me())}isEqual(e){return this.batchId===e.batchId&&ro(this.mutations,e.mutations,(n,r)=>y_(n,r))&&ro(this.baseMutations,e.baseMutations,(n,r)=>y_(n,r))}}class em{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){we(e.mutations.length===r.length);let s=function(){return o1}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new em(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y1{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _1{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je,_e;function JI(t){switch(t){default:return se();case j.CANCELLED:case j.UNKNOWN:case j.DEADLINE_EXCEEDED:case j.RESOURCE_EXHAUSTED:case j.INTERNAL:case j.UNAVAILABLE:case j.UNAUTHENTICATED:return!1;case j.INVALID_ARGUMENT:case j.NOT_FOUND:case j.ALREADY_EXISTS:case j.PERMISSION_DENIED:case j.FAILED_PRECONDITION:case j.ABORTED:case j.OUT_OF_RANGE:case j.UNIMPLEMENTED:case j.DATA_LOSS:return!0}}function ZI(t){if(t===void 0)return yr("GRPC error has no .code"),j.UNKNOWN;switch(t){case Je.OK:return j.OK;case Je.CANCELLED:return j.CANCELLED;case Je.UNKNOWN:return j.UNKNOWN;case Je.DEADLINE_EXCEEDED:return j.DEADLINE_EXCEEDED;case Je.RESOURCE_EXHAUSTED:return j.RESOURCE_EXHAUSTED;case Je.INTERNAL:return j.INTERNAL;case Je.UNAVAILABLE:return j.UNAVAILABLE;case Je.UNAUTHENTICATED:return j.UNAUTHENTICATED;case Je.INVALID_ARGUMENT:return j.INVALID_ARGUMENT;case Je.NOT_FOUND:return j.NOT_FOUND;case Je.ALREADY_EXISTS:return j.ALREADY_EXISTS;case Je.PERMISSION_DENIED:return j.PERMISSION_DENIED;case Je.FAILED_PRECONDITION:return j.FAILED_PRECONDITION;case Je.ABORTED:return j.ABORTED;case Je.OUT_OF_RANGE:return j.OUT_OF_RANGE;case Je.UNIMPLEMENTED:return j.UNIMPLEMENTED;case Je.DATA_LOSS:return j.DATA_LOSS;default:return se()}}(_e=Je||(Je={}))[_e.OK=0]="OK",_e[_e.CANCELLED=1]="CANCELLED",_e[_e.UNKNOWN=2]="UNKNOWN",_e[_e.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",_e[_e.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",_e[_e.NOT_FOUND=5]="NOT_FOUND",_e[_e.ALREADY_EXISTS=6]="ALREADY_EXISTS",_e[_e.PERMISSION_DENIED=7]="PERMISSION_DENIED",_e[_e.UNAUTHENTICATED=16]="UNAUTHENTICATED",_e[_e.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",_e[_e.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",_e[_e.ABORTED=10]="ABORTED",_e[_e.OUT_OF_RANGE=11]="OUT_OF_RANGE",_e[_e.UNIMPLEMENTED=12]="UNIMPLEMENTED",_e[_e.INTERNAL=13]="INTERNAL",_e[_e.UNAVAILABLE=14]="UNAVAILABLE",_e[_e.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v1(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w1=new Ds([4294967295,4294967295],0);function w_(t){const e=v1().encode(t),n=new wI;return n.update(e),new Uint8Array(n.digest())}function E_(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ds([n,r],0),new Ds([s,i],0)]}class tm{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new pa(`Invalid padding: ${n}`);if(r<0)throw new pa(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new pa(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new pa(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Ds.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Ds.fromNumber(r)));return s.compare(w1)===1&&(s=new Ds([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=w_(e),[r,s]=E_(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new tm(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=w_(e),[r,s]=E_(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class pa extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Tl.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new pd(ie.min(),s,new Fe(Ie),_r(),me())}}class Tl{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Tl(r,n,me(),me(),me())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class eT{constructor(e,n){this.targetId=e,this.me=n}}class tT{constructor(e,n,r=Tt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class I_{constructor(){this.fe=0,this.ge=S_(),this.pe=Tt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=me(),n=me(),r=me();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:se()}}),new Tl(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=S_()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,we(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class E1{constructor(e){this.Le=e,this.Be=new Map,this.ke=_r(),this.qe=T_(),this.Qe=new Fe(Ie)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:se()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(kf(i))if(r===0){const o=new ne(i.path);this.Ue(n,o,ht.newNoDocument(o,ie.min()))}else we(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),u=l?this.Xe(l,e,o):1;if(u!==0){this.je(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,c)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=qs(r).toUint8Array()}catch(u){if(u instanceof PI)return no("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new tm(o,s,i)}catch(u){return no(u instanceof pa?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&kf(l.target)){const u=new ne(l.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,ht.newNoDocument(u,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=me();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.Je(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new pd(e,n,this.Qe,this.ke,r);return this.ke=_r(),this.qe=T_(),this.Qe=new Fe(Ie),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new I_,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new wt(Ie),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||te("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new I_),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function T_(){return new Fe(ne.comparator)}function S_(){return new Fe(ne.comparator)}const I1={asc:"ASCENDING",desc:"DESCENDING"},T1={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},S1={and:"AND",or:"OR"};class A1{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Nf(t,e){return t.useProto3Json||wl(e)?e:{value:e}}function Sc(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function nT(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function R1(t,e){return Sc(t,e.toTimestamp())}function nn(t){return we(!!t),ie.fromTimestamp(function(n){const r=ls(n);return new Qe(r.seconds,r.nanos)}(t))}function nm(t,e){return xf(t,e).canonicalString()}function xf(t,e){const n=function(s){return new xe(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function rT(t){const e=xe.fromString(t);return we(uT(e)),e}function Ac(t,e){return nm(t.databaseId,e.path)}function Na(t,e){const n=rT(e);if(n.get(1)!==t.databaseId.projectId)throw new Q(j.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Q(j.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ne(iT(n))}function sT(t,e){return nm(t.databaseId,e)}function C1(t){const e=rT(t);return e.length===4?xe.emptyPath():iT(e)}function bf(t){return new xe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function iT(t){return we(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function A_(t,e,n){return{name:Ac(t,e),fields:n.value.mapValue.fields}}function k1(t,e){return"found"in e?function(r,s){we(!!s.found),s.found.name,s.found.updateTime;const i=Na(r,s.found.name),o=nn(s.found.updateTime),l=s.found.createTime?nn(s.found.createTime):ie.min(),u=new Mt({mapValue:{fields:s.found.fields}});return ht.newFoundDocument(i,o,l,u)}(t,e):"missing"in e?function(r,s){we(!!s.missing),we(!!s.readTime);const i=Na(r,s.missing),o=nn(s.readTime);return ht.newNoDocument(i,o)}(t,e):se()}function P1(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:se()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,f){return c.useProto3Json?(we(f===void 0||typeof f=="string"),Tt.fromBase64String(f||"")):(we(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Tt.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const f=c.code===void 0?j.UNKNOWN:ZI(c.code);return new Q(f,c.message||"")}(o);n=new tT(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Na(t,r.document.name),i=nn(r.document.updateTime),o=r.document.createTime?nn(r.document.createTime):ie.min(),l=new Mt({mapValue:{fields:r.document.fields}}),u=ht.newFoundDocument(s,i,o,l),c=r.targetIds||[],f=r.removedTargetIds||[];n=new zu(c,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Na(t,r.document),i=r.readTime?nn(r.readTime):ie.min(),o=ht.newNoDocument(s,i),l=r.removedTargetIds||[];n=new zu([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Na(t,r.document),i=r.removedTargetIds||[];n=new zu([],i,s,null)}else{if(!("filter"in e))return se();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new _1(s,i),l=r.targetId;n=new eT(l,o)}}return n}function oT(t,e){let n;if(e instanceof El)n={update:A_(t,e.key,e.value)};else if(e instanceof Il)n={delete:Ac(t,e.key)};else if(e instanceof fs)n={update:A_(t,e.key,e.data),updateMask:j1(e.fieldMask)};else{if(!(e instanceof XI))return se();n={verify:Ac(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof ol)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof oo)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof ao)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof al)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw se()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:R1(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:se()}(t,e.precondition)),n}function N1(t,e){return t&&t.length>0?(we(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?nn(s.updateTime):nn(i);return o.isEqual(ie.min())&&(o=nn(i)),new f1(o,s.transformResults||[])}(n,e))):[]}function x1(t,e){return{documents:[sT(t,e.path)]}}function b1(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=sT(t,s);const i=function(c){if(c.length!==0)return lT(kn.create(c,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(c){if(c.length!==0)return c.map(f=>function(g){return{field:Ii(g.field),direction:L1(g.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Nf(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{_t:n,parent:s}}function D1(t){let e=C1(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){we(r===1);const f=n.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];n.where&&(i=function(p){const g=aT(p);return g instanceof kn&&DI(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(g=>function(N){return new il(Ti(N.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(p){let g;return g=typeof p=="object"?p.value:p,wl(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(p){const g=!!p.before,C=p.values||[];return new Ic(C,g)}(n.startAt));let c=null;return n.endAt&&(c=function(p){const g=!p.before,C=p.values||[];return new Ic(C,g)}(n.endAt)),t1(e,s,o,i,l,"F",u,c)}function O1(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return se()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function aT(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Ti(n.unaryFilter.field);return tt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ti(n.unaryFilter.field);return tt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Ti(n.unaryFilter.field);return tt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ti(n.unaryFilter.field);return tt.create(o,"!=",{nullValue:"NULL_VALUE"});default:return se()}}(t):t.fieldFilter!==void 0?function(n){return tt.create(Ti(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return se()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return kn.create(n.compositeFilter.filters.map(r=>aT(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return se()}}(n.compositeFilter.op))}(t):se()}function L1(t){return I1[t]}function V1(t){return T1[t]}function M1(t){return S1[t]}function Ii(t){return{fieldPath:t.canonicalString()}}function Ti(t){return yt.fromServerFormat(t.fieldPath)}function lT(t){return t instanceof tt?function(n){if(n.op==="=="){if(d_(n.value))return{unaryFilter:{field:Ii(n.field),op:"IS_NAN"}};if(c_(n.value))return{unaryFilter:{field:Ii(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(d_(n.value))return{unaryFilter:{field:Ii(n.field),op:"IS_NOT_NAN"}};if(c_(n.value))return{unaryFilter:{field:Ii(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ii(n.field),op:V1(n.op),value:n.value}}}(t):t instanceof kn?function(n){const r=n.getFilters().map(s=>lT(s));return r.length===1?r[0]:{compositeFilter:{op:M1(n.op),filters:r}}}(t):se()}function j1(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function uT(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e,n,r,s,i=ie.min(),o=ie.min(),l=Tt.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Hr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Hr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Hr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Hr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U1{constructor(e){this.ct=e}}function F1(t){const e=D1({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Tc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B1{constructor(){this.un=new $1}addToCollectionParentIndex(e,n){return this.un.add(n),z.resolve()}getCollectionParents(e,n){return z.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return z.resolve()}deleteFieldIndex(e,n){return z.resolve()}deleteAllFieldIndexes(e){return z.resolve()}createTargetIndexes(e,n){return z.resolve()}getDocumentsMatchingTarget(e,n){return z.resolve(null)}getIndexType(e,n){return z.resolve(0)}getFieldIndexes(e,n){return z.resolve([])}getNextCollectionGroupToUpdate(e){return z.resolve(null)}getMinOffset(e,n){return z.resolve(as.min())}getMinOffsetFromCollectionGroup(e,n){return z.resolve(as.min())}updateCollectionGroup(e,n,r){return z.resolve()}updateIndexEntries(e,n){return z.resolve()}}class $1{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new wt(xe.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new wt(xe.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new lo(0)}static kn(){return new lo(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z1{constructor(){this.changes=new Eo(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ht.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?z.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q1{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W1{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&Pa(r.mutation,s,Zt.empty(),Qe.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,me()).next(()=>r))}getLocalViewOfDocuments(e,n,r=me()){const s=Ns();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=fa();return i.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Ns();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,me()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=_r();const o=ka(),l=function(){return ka()}();return n.forEach((u,c)=>{const f=r.get(c.key);s.has(c.key)&&(f===void 0||f.mutation instanceof fs)?i=i.insert(c.key,c):f!==void 0?(o.set(c.key,f.mutation.getFieldMask()),Pa(f.mutation,c,f.mutation.getFieldMask(),Qe.now())):o.set(c.key,Zt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((c,f)=>o.set(c,f)),n.forEach((c,f)=>{var p;return l.set(c,new q1(f,(p=o.get(c))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,n){const r=ka();let s=new Fe((o,l)=>o-l),i=me();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let f=r.get(u)||Zt.empty();f=l.applyToLocalView(c,f),r.set(u,f);const p=(s.get(l.batchId)||me()).add(u);s=s.insert(l.batchId,p)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,f=u.value,p=$I();f.forEach(g=>{if(!i.has(g)){const C=QI(n.get(g),r.get(g));C!==null&&p.set(g,C),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,p))}return z.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return ne.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):MI(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):z.resolve(Ns());let l=-1,u=i;return o.next(c=>z.forEach(c,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(f)?z.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,u,c,me())).next(f=>({batchId:l,changes:BI(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new ne(n)).next(r=>{let s=fa();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=fa();return this.indexManager.getCollectionParents(e,i).next(l=>z.forEach(l,u=>{const c=function(p,g){return new wo(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,r,s).next(f=>{f.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((u,c)=>{const f=c.getKey();o.get(f)===null&&(o=o.insert(f,ht.newInvalidDocument(f)))});let l=fa();return o.forEach((u,c)=>{const f=i.get(u);f!==void 0&&Pa(f.mutation,c,Zt.empty(),Qe.now()),cd(n,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H1{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return z.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:nn(s.createTime)}}(n)),z.resolve()}getNamedQuery(e,n){return z.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:F1(s.bundledQuery),readTime:nn(s.readTime)}}(n)),z.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G1{constructor(){this.overlays=new Fe(ne.comparator),this.Ir=new Map}getOverlay(e,n){return z.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Ns();return z.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),z.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),z.resolve()}getOverlaysForCollection(e,n,r){const s=Ns(),i=n.length+1,o=new ne(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return z.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Fe((c,f)=>c-f);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let f=i.get(c.largestBatchId);f===null&&(f=Ns(),i=i.insert(c.largestBatchId,f)),f.set(c.getKey(),c)}}const l=Ns(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,f)=>l.set(c,f)),!(l.size()>=s)););return z.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new y1(n,r));let i=this.Ir.get(n);i===void 0&&(i=me(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K1{constructor(){this.sessionToken=Tt.EMPTY_BYTE_STRING}getSessionToken(e){return z.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,z.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(){this.Tr=new wt(ct.Er),this.dr=new wt(ct.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new ct(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new ct(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new ne(new xe([])),r=new ct(n,e),s=new ct(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new ne(new xe([])),r=new ct(n,e),s=new ct(n,e+1);let i=me();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new ct(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class ct{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return ne.comparator(e.key,n.key)||Ie(e.wr,n.wr)}static Ar(e,n){return Ie(e.wr,n.wr)||ne.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q1{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new wt(ct.Er)}checkEmpty(e){return z.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new g1(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new ct(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return z.resolve(o)}lookupMutationBatch(e,n){return z.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return z.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return z.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return z.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new ct(n,0),s=new ct(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),z.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new wt(Ie);return n.forEach(s=>{const i=new ct(s,0),o=new ct(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),z.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;ne.isDocumentKey(i)||(i=i.child(""));const o=new ct(new ne(i),0);let l=new wt(Ie);return this.br.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===s&&(l=l.add(u.wr)),!0)},o),z.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){we(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return z.forEach(n.mutations,s=>{const i=new ct(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new ct(n,0),s=this.br.firstAfterOrEqual(r);return z.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,z.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y1{constructor(e){this.Mr=e,this.docs=function(){return new Fe(ne.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return z.resolve(r?r.document.mutableCopy():ht.newInvalidDocument(n))}getEntries(e,n){let r=_r();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ht.newInvalidDocument(s))}),z.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=_r();const o=n.path,l=new ne(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:f}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||VN(LN(f),r)<=0||(s.has(f.key)||cd(n,f))&&(i=i.insert(f.key,f.mutableCopy()))}return z.resolve(i)}getAllFromCollectionGroup(e,n,r,s){se()}Or(e,n){return z.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new X1(this)}getSize(e){return z.resolve(this.size)}}class X1 extends z1{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),z.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J1{constructor(e){this.persistence=e,this.Nr=new Eo(n=>Xp(n),Jp),this.lastRemoteSnapshotVersion=ie.min(),this.highestTargetId=0,this.Lr=0,this.Br=new rm,this.targetCount=0,this.kr=lo.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),z.resolve()}getLastRemoteSnapshotVersion(e){return z.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return z.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),z.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),z.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new lo(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,z.resolve()}updateTargetData(e,n){return this.Kn(n),z.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,z.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),z.waitFor(i).next(()=>s)}getTargetCount(e){return z.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return z.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),z.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),z.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),z.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return z.resolve(r)}containsKey(e,n){return z.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z1{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Gp(0),this.Kr=!1,this.Kr=!0,this.$r=new K1,this.referenceDelegate=e(this),this.Ur=new J1(this),this.indexManager=new B1,this.remoteDocumentCache=function(s){return new Y1(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new U1(n),this.Gr=new H1(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new G1,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new Q1(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){te("MemoryPersistence","Starting transaction:",e);const s=new ex(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return z.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class ex extends jN{constructor(e){super(),this.currentSequenceNumber=e}}class sm{constructor(e){this.persistence=e,this.Jr=new rm,this.Yr=null}static Zr(e){return new sm(e)}get Xr(){if(this.Yr)return this.Yr;throw se()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),z.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),z.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),z.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return z.forEach(this.Xr,r=>{const s=ne.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,ie.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return z.or([()=>z.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=me(),s=me();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new im(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tx{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nx{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return pR()?8:UN(Ot())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new tx;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(ra()<=ge.DEBUG&&te("QueryEngine","SDK will not create cache indexes for query:",Ei(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),z.resolve()):(ra()<=ge.DEBUG&&te("QueryEngine","Query:",Ei(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(ra()<=ge.DEBUG&&te("QueryEngine","The SDK decides to create cache indexes for query:",Ei(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Hn(n))):z.resolve())}Yi(e,n){if(m_(n))return z.resolve(null);let r=Hn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Tc(n,null,"F"),r=Hn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=me(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.ts(n,l);return this.ns(n,c,o,u.readTime)?this.Yi(e,Tc(n,null,"F")):this.rs(e,c,n,u)}))})))}Zi(e,n,r,s){return m_(n)||s.isEqual(ie.min())?z.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?z.resolve(null):(ra()<=ge.DEBUG&&te("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ei(n)),this.rs(e,o,n,ON(s,-1)).next(l=>l))})}ts(e,n){let r=new wt(UI(e));return n.forEach((s,i)=>{cd(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return ra()<=ge.DEBUG&&te("QueryEngine","Using full collection scan to execute query:",Ei(n)),this.Ji.getDocumentsMatchingQuery(e,n,as.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rx{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new Fe(Ie),this._s=new Eo(i=>Xp(i),Jp),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new W1(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function sx(t,e,n,r){return new rx(t,e,n,r)}async function cT(t,e){const n=ae(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let u=me();for(const c of s){o.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}for(const c of i){l.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(c=>({hs:c,removedBatchIds:o,addedBatchIds:l}))})})}function ix(t,e){const n=ae(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,c,f){const p=c.batch,g=p.keys();let C=z.resolve();return g.forEach(N=>{C=C.next(()=>f.getEntry(u,N)).next(b=>{const k=c.docVersions.get(N);we(k!==null),b.version.compareTo(k)<0&&(p.applyToRemoteDocument(b,c),b.isValidDocument()&&(b.setReadTime(c.commitVersion),f.addEntry(b)))})}),C.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=me();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function dT(t){const e=ae(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function ox(t,e){const n=ae(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((f,p)=>{const g=s.get(p);if(!g)return;l.push(n.Ur.removeMatchingKeys(i,f.removedDocuments,p).next(()=>n.Ur.addMatchingKeys(i,f.addedDocuments,p)));let C=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?C=C.withResumeToken(Tt.EMPTY_BYTE_STRING,ie.min()).withLastLimboFreeSnapshotVersion(ie.min()):f.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(f.resumeToken,r)),s=s.insert(p,C),function(b,k,A){return b.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-b.snapshotVersion.toMicroseconds()>=3e8?!0:A.addedDocuments.size+A.modifiedDocuments.size+A.removedDocuments.size>0}(g,C,f)&&l.push(n.Ur.updateTargetData(i,C))});let u=_r(),c=me();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,f))}),l.push(ax(i,o,e.documentUpdates).next(f=>{u=f.Ps,c=f.Is})),!r.isEqual(ie.min())){const f=n.Ur.getLastRemoteSnapshotVersion(i).next(p=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(f)}return z.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,c)).next(()=>u)}).then(i=>(n.os=s,i))}function ax(t,e,n){let r=me(),s=me();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=_r();return n.forEach((l,u)=>{const c=i.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(ie.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):te("LocalStore","Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Ps:o,Is:s}})}function lx(t,e){const n=ae(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function ux(t,e){const n=ae(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,z.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new Hr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Df(t,e,n){const r=ae(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!vl(o))throw o;te("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function R_(t,e,n){const r=ae(t);let s=ie.min(),i=me();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,f){const p=ae(u),g=p._s.get(f);return g!==void 0?z.resolve(p.os.get(g)):p.Ur.getTargetData(c,f)}(r,o,Hn(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:ie.min(),n?i:me())).next(l=>(cx(r,r1(e),l),{documents:l,Ts:i})))}function cx(t,e,n){let r=t.us.get(e)||ie.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class C_{constructor(){this.activeTargetIds=u1()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class dx{constructor(){this.so=new C_,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new C_,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hx{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){te("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){te("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wu=null;function gh(){return wu===null?wu=function(){return 268435456+Math.round(2147483648*Math.random())}():wu++,"0x"+wu.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fx={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class px{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt="WebChannelConnection";class mx extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=gh(),u=this.xo(n,r.toUriEncodedString());te("RestConnection",`Sending RPC '${n}' ${l}:`,u,s);const c={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(c,i,o),this.No(n,u,c,s).then(f=>(te("RestConnection",`Received RPC '${n}' ${l}: `,f),f),f=>{throw no("RestConnection",`RPC '${n}' ${l} failed with error: `,f,"url: ",u,"request:",s),f})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+vo}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=fx[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=gh();return new Promise((o,l)=>{const u=new EI;u.setWithCredentials(!0),u.listenOnce(II.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Fu.NO_ERROR:const f=u.getResponseJson();te(Pt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case Fu.TIMEOUT:te(Pt,`RPC '${e}' ${i} timed out`),l(new Q(j.DEADLINE_EXCEEDED,"Request time out"));break;case Fu.HTTP_ERROR:const p=u.getStatus();if(te(Pt,`RPC '${e}' ${i} failed with status:`,p,"response text:",u.getResponseText()),p>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const C=g==null?void 0:g.error;if(C&&C.status&&C.message){const N=function(k){const A=k.toLowerCase().replace(/_/g,"-");return Object.values(j).indexOf(A)>=0?A:j.UNKNOWN}(C.status);l(new Q(N,C.message))}else l(new Q(j.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new Q(j.UNAVAILABLE,"Connection failed."));break;default:se()}}finally{te(Pt,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(s);te(Pt,`RPC '${e}' ${i} sending request:`,s),u.send(n,"POST",c,r,15)})}Bo(e,n,r){const s=gh(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=AI(),l=SI(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=i.join("");te(Pt,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=o.createWebChannel(f,u);let g=!1,C=!1;const N=new px({Io:k=>{C?te(Pt,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(g||(te(Pt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),te(Pt,`RPC '${e}' stream ${s} sending:`,k),p.send(k))},To:()=>p.close()}),b=(k,A,y)=>{k.listen(A,E=>{try{y(E)}catch(D){setTimeout(()=>{throw D},0)}})};return b(p,ha.EventType.OPEN,()=>{C||(te(Pt,`RPC '${e}' stream ${s} transport opened.`),N.yo())}),b(p,ha.EventType.CLOSE,()=>{C||(C=!0,te(Pt,`RPC '${e}' stream ${s} transport closed`),N.So())}),b(p,ha.EventType.ERROR,k=>{C||(C=!0,no(Pt,`RPC '${e}' stream ${s} transport errored:`,k),N.So(new Q(j.UNAVAILABLE,"The operation could not be completed")))}),b(p,ha.EventType.MESSAGE,k=>{var A;if(!C){const y=k.data[0];we(!!y);const E=y,D=E.error||((A=E[0])===null||A===void 0?void 0:A.error);if(D){te(Pt,`RPC '${e}' stream ${s} received error:`,D);const B=D.status;let $=function(I){const P=Je[I];if(P!==void 0)return ZI(P)}(B),w=D.message;$===void 0&&($=j.INTERNAL,w="Unknown error status: "+B+" with message "+D.message),C=!0,N.So(new Q($,w)),p.close()}else te(Pt,`RPC '${e}' stream ${s} received:`,y),N.bo(y)}}),b(l,TI.STAT_EVENT,k=>{k.stat===Sf.PROXY?te(Pt,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===Sf.NOPROXY&&te(Pt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{N.wo()},0),N}}function yh(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function md(t){return new A1(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&te("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hT{constructor(e,n,r,s,i,o,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new om(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===j.RESOURCE_EXHAUSTED?(yr(n.toString()),yr("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===j.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new Q(j.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return te("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(te("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class gx extends hT{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=P1(this.serializer,e),r=function(i){if(!("targetChange"in i))return ie.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ie.min():o.readTime?nn(o.readTime):ie.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=bf(this.serializer),n.addTarget=function(i,o){let l;const u=o.target;if(l=kf(u)?{documents:x1(i,u)}:{query:b1(i,u)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=nT(i,o.resumeToken);const c=Nf(i,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(ie.min())>0){l.readTime=Sc(i,o.snapshotVersion.toTimestamp());const c=Nf(i,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const r=O1(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=bf(this.serializer),n.removeTarget=e,this.a_(n)}}class yx extends hT{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return we(!!e.streamToken),this.lastStreamToken=e.streamToken,we(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){we(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=N1(e.writeResults,e.commitTime),r=nn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=bf(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>oT(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _x extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new Q(j.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,xf(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new Q(j.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,xf(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new Q(j.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class vx{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(yr(n),this.D_=!1):te("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wx{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{Zs(this)&&(te("RemoteStore","Restarting streams for network reachability change."),await async function(u){const c=ae(u);c.L_.add(4),await Sl(c),c.q_.set("Unknown"),c.L_.delete(4),await gd(c)}(this))})}),this.q_=new vx(r,s)}}async function gd(t){if(Zs(t))for(const e of t.B_)await e(!0)}async function Sl(t){for(const e of t.B_)await e(!1)}function fT(t,e){const n=ae(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),cm(n)?um(n):Io(n).r_()&&lm(n,e))}function am(t,e){const n=ae(t),r=Io(n);n.N_.delete(e),r.r_()&&pT(n,e),n.N_.size===0&&(r.r_()?r.o_():Zs(n)&&n.q_.set("Unknown"))}function lm(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ie.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Io(t).A_(e)}function pT(t,e){t.Q_.xe(e),Io(t).R_(e)}function um(t){t.Q_=new E1({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Io(t).start(),t.q_.v_()}function cm(t){return Zs(t)&&!Io(t).n_()&&t.N_.size>0}function Zs(t){return ae(t).L_.size===0}function mT(t){t.Q_=void 0}async function Ex(t){t.q_.set("Online")}async function Ix(t){t.N_.forEach((e,n)=>{lm(t,e)})}async function Tx(t,e){mT(t),cm(t)?(t.q_.M_(e),um(t)):t.q_.set("Unknown")}async function Sx(t,e,n){if(t.q_.set("Online"),e instanceof tT&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){te("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Rc(t,r)}else if(e instanceof zu?t.Q_.Ke(e):e instanceof eT?t.Q_.He(e):t.Q_.We(e),!n.isEqual(ie.min()))try{const r=await dT(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.N_.get(c);f&&i.N_.set(c,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const f=i.N_.get(u);if(!f)return;i.N_.set(u,f.withResumeToken(Tt.EMPTY_BYTE_STRING,f.snapshotVersion)),pT(i,u);const p=new Hr(f.target,u,c,f.sequenceNumber);lm(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){te("RemoteStore","Failed to raise snapshot:",r),await Rc(t,r)}}async function Rc(t,e,n){if(!vl(e))throw e;t.L_.add(1),await Sl(t),t.q_.set("Offline"),n||(n=()=>dT(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{te("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await gd(t)})}function gT(t,e){return e().catch(n=>Rc(t,n,e))}async function yd(t){const e=ae(t),n=us(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Ax(e);)try{const s=await lx(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,Rx(e,s)}catch(s){await Rc(e,s)}yT(e)&&_T(e)}function Ax(t){return Zs(t)&&t.O_.length<10}function Rx(t,e){t.O_.push(e);const n=us(t);n.r_()&&n.V_&&n.m_(e.mutations)}function yT(t){return Zs(t)&&!us(t).n_()&&t.O_.length>0}function _T(t){us(t).start()}async function Cx(t){us(t).p_()}async function kx(t){const e=us(t);for(const n of t.O_)e.m_(n.mutations)}async function Px(t,e,n){const r=t.O_.shift(),s=em.from(r,e,n);await gT(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await yd(t)}async function Nx(t,e){e&&us(t).V_&&await async function(r,s){if(function(o){return JI(o)&&o!==j.ABORTED}(s.code)){const i=r.O_.shift();us(r).s_(),await gT(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await yd(r)}}(t,e),yT(t)&&_T(t)}async function P_(t,e){const n=ae(t);n.asyncQueue.verifyOperationInProgress(),te("RemoteStore","RemoteStore received new credentials");const r=Zs(n);n.L_.add(3),await Sl(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await gd(n)}async function xx(t,e){const n=ae(t);e?(n.L_.delete(2),await gd(n)):e||(n.L_.add(2),await Sl(n),n.q_.set("Unknown"))}function Io(t){return t.K_||(t.K_=function(n,r,s){const i=ae(n);return i.w_(),new gx(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:Ex.bind(null,t),Ro:Ix.bind(null,t),mo:Tx.bind(null,t),d_:Sx.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),cm(t)?um(t):t.q_.set("Unknown")):(await t.K_.stop(),mT(t))})),t.K_}function us(t){return t.U_||(t.U_=function(n,r,s){const i=ae(n);return i.w_(),new yx(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Cx.bind(null,t),mo:Nx.bind(null,t),f_:kx.bind(null,t),g_:Px.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await yd(t)):(await t.U_.stop(),t.O_.length>0&&(te("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Wn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new dm(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Q(j.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function hm(t,e){if(yr("AsyncQueue",`${e}: ${t}`),vl(t))return new Q(j.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e){this.comparator=e?(n,r)=>e(n,r)||ne.comparator(n.key,r.key):(n,r)=>ne.comparator(n.key,r.key),this.keyedMap=fa(),this.sortedSet=new Fe(this.comparator)}static emptySet(e){return new Gi(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Gi)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Gi;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(){this.W_=new Fe(ne.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):se():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class uo{constructor(e,n,r,s,i,o,l,u,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new uo(e,n,Gi.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ud(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bx{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class Dx{constructor(){this.queries=x_(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=ae(n),i=s.queries;s.queries=x_(),i.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new Q(j.ABORTED,"Firestore shutting down"))}}function x_(){return new Eo(t=>jI(t),ud)}async function fm(t,e){const n=ae(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new bx,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=hm(o,`Initialization of query '${Ei(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&mm(n)}async function pm(t,e){const n=ae(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function Ox(t,e){const n=ae(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&mm(n)}function Lx(t,e,n){const r=ae(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function mm(t){t.Y_.forEach(e=>{e.next()})}var Of,b_;(b_=Of||(Of={})).ea="default",b_.Cache="cache";class gm{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new uo(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=uo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Of.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vT{constructor(e){this.key=e}}class wT{constructor(e){this.key=e}}class Vx{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=me(),this.mutatedKeys=me(),this.Aa=UI(e),this.Ra=new Gi(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new N_,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,c=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const g=s.get(f),C=cd(this.query,p)?p:null,N=!!g&&this.mutatedKeys.has(g.key),b=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let k=!1;g&&C?g.data.isEqual(C.data)?N!==b&&(r.track({type:3,doc:C}),k=!0):this.ga(g,C)||(r.track({type:2,doc:C}),k=!0,(u&&this.Aa(C,u)>0||c&&this.Aa(C,c)<0)&&(l=!0)):!g&&C?(r.track({type:0,doc:C}),k=!0):g&&!C&&(r.track({type:1,doc:g}),k=!0,(u||c)&&(l=!0)),k&&(C?(o=o.add(C),i=b?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,p)=>function(C,N){const b=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return se()}};return b(C)-b(N)}(f.type,p.type)||this.Aa(f.doc,p.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,c=u!==this.Ea;return this.Ea=u,o.length!==0||c?{snapshot:new uo(this.query,e.Ra,i,o,e.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new N_,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=me(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new wT(r))}),this.da.forEach(r=>{e.has(r)||n.push(new vT(r))}),n}ba(e){this.Ta=e.Ts,this.da=me();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return uo.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class Mx{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class jx{constructor(e){this.key=e,this.va=!1}}class Ux{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Eo(l=>jI(l),ud),this.Ma=new Map,this.xa=new Set,this.Oa=new Fe(ne.comparator),this.Na=new Map,this.La=new rm,this.Ba={},this.ka=new Map,this.qa=lo.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Fx(t,e,n=!0){const r=RT(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await ET(r,e,n,!0),s}async function Bx(t,e){const n=RT(t);await ET(n,e,!0,!1)}async function ET(t,e,n,r){const s=await ux(t.localStore,Hn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await $x(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&fT(t.remoteStore,s),l}async function $x(t,e,n,r,s){t.Ka=(p,g,C)=>async function(b,k,A,y){let E=k.view.ma(A);E.ns&&(E=await R_(b.localStore,k.query,!1).then(({documents:w})=>k.view.ma(w,E)));const D=y&&y.targetChanges.get(k.targetId),B=y&&y.targetMismatches.get(k.targetId)!=null,$=k.view.applyChanges(E,b.isPrimaryClient,D,B);return O_(b,k.targetId,$.wa),$.snapshot}(t,p,g,C);const i=await R_(t.localStore,e,!0),o=new Vx(e,i.Ts),l=o.ma(i.documents),u=Tl.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),c=o.applyChanges(l,t.isPrimaryClient,u);O_(t,n,c.wa);const f=new Mx(e,n,o);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),c.snapshot}async function zx(t,e,n){const r=ae(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!ud(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Df(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&am(r.remoteStore,s.targetId),Lf(r,s.targetId)}).catch(_l)):(Lf(r,s.targetId),await Df(r.localStore,s.targetId,!0))}async function qx(t,e){const n=ae(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),am(n.remoteStore,r.targetId))}async function Wx(t,e,n){const r=Jx(t);try{const s=await function(o,l){const u=ae(o),c=Qe.now(),f=l.reduce((C,N)=>C.add(N.key),me());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",C=>{let N=_r(),b=me();return u.cs.getEntries(C,f).next(k=>{N=k,N.forEach((A,y)=>{y.isValidDocument()||(b=b.add(A))})}).next(()=>u.localDocuments.getOverlayedDocuments(C,N)).next(k=>{p=k;const A=[];for(const y of l){const E=m1(y,p.get(y.key).overlayedDocument);E!=null&&A.push(new fs(y.key,E,NI(E.value.mapValue),nt.exists(!0)))}return u.mutationQueue.addMutationBatch(C,c,A,l)}).next(k=>{g=k;const A=k.applyToLocalDocumentSet(p,b);return u.documentOverlayCache.saveOverlays(C,k.batchId,A)})}).then(()=>({batchId:g.batchId,changes:BI(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,u){let c=o.Ba[o.currentUser.toKey()];c||(c=new Fe(Ie)),c=c.insert(l,u),o.Ba[o.currentUser.toKey()]=c}(r,s.batchId,n),await Al(r,s.changes),await yd(r.remoteStore)}catch(s){const i=hm(s,"Failed to persist write");n.reject(i)}}async function IT(t,e){const n=ae(t);try{const r=await ox(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(we(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?we(o.va):s.removedDocuments.size>0&&(we(o.va),o.va=!1))}),await Al(n,r,e)}catch(r){await _l(r)}}function D_(t,e,n){const r=ae(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const u=ae(o);u.onlineState=l;let c=!1;u.queries.forEach((f,p)=>{for(const g of p.j_)g.Z_(l)&&(c=!0)}),c&&mm(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Hx(t,e,n){const r=ae(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new Fe(ne.comparator);o=o.insert(i,ht.newNoDocument(i,ie.min()));const l=me().add(i),u=new pd(ie.min(),new Map,new Fe(Ie),o,l);await IT(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),ym(r)}else await Df(r.localStore,e,!1).then(()=>Lf(r,e,n)).catch(_l)}async function Gx(t,e){const n=ae(t),r=e.batch.batchId;try{const s=await ix(n.localStore,e);ST(n,r,null),TT(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Al(n,s)}catch(s){await _l(s)}}async function Kx(t,e,n){const r=ae(t);try{const s=await function(o,l){const u=ae(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let f;return u.mutationQueue.lookupMutationBatch(c,l).next(p=>(we(p!==null),f=p.keys(),u.mutationQueue.removeMutationBatch(c,p))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,f)).next(()=>u.localDocuments.getDocuments(c,f))})}(r.localStore,e);ST(r,e,n),TT(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Al(r,s)}catch(s){await _l(s)}}function TT(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function ST(t,e,n){const r=ae(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function Lf(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||AT(t,r)})}function AT(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(am(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),ym(t))}function O_(t,e,n){for(const r of n)r instanceof vT?(t.La.addReference(r.key,e),Qx(t,r)):r instanceof wT?(te("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||AT(t,r.key)):se()}function Qx(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(te("SyncEngine","New document in limbo: "+n),t.xa.add(r),ym(t))}function ym(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new ne(xe.fromString(e)),r=t.qa.next();t.Na.set(r,new jx(n)),t.Oa=t.Oa.insert(n,r),fT(t.remoteStore,new Hr(Hn(ld(n.path)),r,"TargetPurposeLimboResolution",Gp.oe))}}async function Al(t,e,n){const r=ae(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(c=>{var f;if((c||n)&&r.isPrimaryClient){const p=c?!c.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(c){s.push(c);const p=im.Wi(u.targetId,c);i.push(p)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(u,c){const f=ae(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>z.forEach(c,g=>z.forEach(g.$i,C=>f.persistence.referenceDelegate.addReference(p,g.targetId,C)).next(()=>z.forEach(g.Ui,C=>f.persistence.referenceDelegate.removeReference(p,g.targetId,C)))))}catch(p){if(!vl(p))throw p;te("LocalStore","Failed to update sequence numbers: "+p)}for(const p of c){const g=p.targetId;if(!p.fromCache){const C=f.os.get(g),N=C.snapshotVersion,b=C.withLastLimboFreeSnapshotVersion(N);f.os=f.os.insert(g,b)}}}(r.localStore,i))}async function Yx(t,e){const n=ae(t);if(!n.currentUser.isEqual(e)){te("SyncEngine","User change. New user:",e.toKey());const r=await cT(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(u=>{u.reject(new Q(j.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Al(n,r.hs)}}function Xx(t,e){const n=ae(t),r=n.Na.get(e);if(r&&r.va)return me().add(r.key);{let s=me();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function RT(t){const e=ae(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=IT.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Xx.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Hx.bind(null,e),e.Ca.d_=Ox.bind(null,e.eventManager),e.Ca.$a=Lx.bind(null,e.eventManager),e}function Jx(t){const e=ae(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Gx.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Kx.bind(null,e),e}class Cc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=md(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return sx(this.persistence,new nx,e.initialUser,this.serializer)}Ga(e){return new Z1(sm.Zr,this.serializer)}Wa(e){return new dx}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Cc.provider={build:()=>new Cc};class Vf{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>D_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Yx.bind(null,this.syncEngine),await xx(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Dx}()}createDatastore(e){const n=md(e.databaseInfo.databaseId),r=function(i){return new mx(i)}(e.databaseInfo);return function(i,o,l,u){return new _x(i,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new wx(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>D_(this.syncEngine,n,0),function(){return k_.D()?new k_:new hx}())}createSyncEngine(e,n){return function(s,i,o,l,u,c,f){const p=new Ux(s,i,o,l,u,c);return f&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=ae(s);te("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Sl(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Vf.provider={build:()=>new Vf};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):yr("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zx{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new Q(j.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const n=await async function(s,i){const o=ae(s),l={documents:i.map(p=>Ac(o.serializer,p))},u=await o.Lo("BatchGetDocuments",o.serializer.databaseId,xe.emptyPath(),l,i.length),c=new Map;u.forEach(p=>{const g=k1(o.serializer,p);c.set(g.key.toString(),g)});const f=[];return i.forEach(p=>{const g=c.get(p.toString());we(!!g),f.push(g)}),f}(this.datastore,e);return n.forEach(r=>this.recordVersion(r)),n}set(e,n){this.write(n.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,n){try{this.write(n.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Il(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(n=>{e.delete(n.key.toString())}),e.forEach((n,r)=>{const s=ne.fromPath(r);this.mutations.push(new XI(s,this.precondition(s)))}),await async function(r,s){const i=ae(r),o={writes:s.map(l=>oT(i.serializer,l))};await i.Mo("Commit",i.serializer.databaseId,xe.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let n;if(e.isFoundDocument())n=e.version;else{if(!e.isNoDocument())throw se();n=ie.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!n.isEqual(r))throw new Q(j.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),n)}precondition(e){const n=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&n?n.isEqual(ie.min())?nt.exists(!1):nt.updateTime(n):nt.none()}preconditionForUpdate(e){const n=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&n){if(n.isEqual(ie.min()))throw new Q(j.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return nt.updateTime(n)}return nt.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(e,n,r,s,i){this.asyncQueue=e,this.datastore=n,this.options=r,this.updateFunction=s,this.deferred=i,this._u=r.maxAttempts,this.t_=new om(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new Zx(this.datastore),n=this.cu(e);n&&n.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.lu(s)}))}).catch(r=>{this.lu(r)})})}cu(e){try{const n=this.updateFunction(e);return!wl(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const n=e.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!JI(n)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=Nt.UNAUTHENTICATED,this.clientId=CI.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{te("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(te("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Wn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=hm(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function _h(t,e){t.asyncQueue.verifyOperationInProgress(),te("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await cT(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function L_(t,e){t.asyncQueue.verifyOperationInProgress();const n=await nb(t);te("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>P_(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>P_(e.remoteStore,s)),t._onlineComponents=e}async function nb(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){te("FirestoreClient","Using user provided OfflineComponentProvider");try{await _h(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===j.FAILED_PRECONDITION||s.code===j.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;no("Error using user provided cache. Falling back to memory cache: "+n),await _h(t,new Cc)}}else te("FirestoreClient","Using default OfflineComponentProvider"),await _h(t,new Cc);return t._offlineComponents}async function vm(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(te("FirestoreClient","Using user provided OnlineComponentProvider"),await L_(t,t._uninitializedComponentsProvider._online)):(te("FirestoreClient","Using default OnlineComponentProvider"),await L_(t,new Vf))),t._onlineComponents}function rb(t){return vm(t).then(e=>e.syncEngine)}function sb(t){return vm(t).then(e=>e.datastore)}async function kc(t){const e=await vm(t),n=e.eventManager;return n.onListen=Fx.bind(null,e.syncEngine),n.onUnlisten=zx.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=Bx.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=qx.bind(null,e.syncEngine),n}function ib(t,e,n={}){const r=new Wn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,c){const f=new _m({next:g=>{f.Za(),o.enqueueAndForget(()=>pm(i,p));const C=g.docs.has(l);!C&&g.fromCache?c.reject(new Q(j.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&g.fromCache&&u&&u.source==="server"?c.reject(new Q(j.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(g)},error:g=>c.reject(g)}),p=new gm(ld(l.path),f,{includeMetadataChanges:!0,_a:!0});return fm(i,p)}(await kc(t),t.asyncQueue,e,n,r)),r.promise}function ob(t,e,n={}){const r=new Wn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,c){const f=new _m({next:g=>{f.Za(),o.enqueueAndForget(()=>pm(i,p)),g.fromCache&&u.source==="server"?c.reject(new Q(j.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(g)},error:g=>c.reject(g)}),p=new gm(l,f,{includeMetadataChanges:!0,_a:!0});return fm(i,p)}(await kc(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CT(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kT(t,e,n){if(!n)throw new Q(j.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function ab(t,e,n,r){if(e===!0&&r===!0)throw new Q(j.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function M_(t){if(!ne.isDocumentKey(t))throw new Q(j.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function j_(t){if(ne.isDocumentKey(t))throw new Q(j.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function _d(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":se()}function bt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Q(j.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=_d(t);throw new Q(j.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function lb(t,e){if(e<=0)throw new Q(j.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new Q(j.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new Q(j.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ab("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=CT((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new Q(j.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new Q(j.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new Q(j.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class vd{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new U_({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Q(j.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Q(j.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new U_(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new AN;switch(r.type){case"firstParty":return new PN(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new Q(j.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=V_.get(n);r&&(te("ComponentProvider","Removing Datastore"),V_.delete(n),r.terminate())}(this),Promise.resolve()}}function ub(t,e,n,r={}){var s;const i=(t=bt(t,vd))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&no("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=Nt.MOCK_USER;else{l=AE(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new Q(j.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Nt(c)}t._authCredentials=new RN(new RI(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ir(this.firestore,e,this._query)}}class Et{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new rs(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Et(this.firestore,e,this._key)}}class rs extends Ir{constructor(e,n,r){super(e,n,ld(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Et(this.firestore,null,new ne(e))}withConverter(e){return new rs(this.firestore,e,this._path)}}function sn(t,e,...n){if(t=ce(t),kT("collection","path",e),t instanceof vd){const r=xe.fromString(e,...n);return j_(r),new rs(t,null,r)}{if(!(t instanceof Et||t instanceof rs))throw new Q(j.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(xe.fromString(e,...n));return j_(r),new rs(t.firestore,null,r)}}function ue(t,e,...n){if(t=ce(t),arguments.length===1&&(e=CI.newId()),kT("doc","path",e),t instanceof vd){const r=xe.fromString(e,...n);return M_(r),new Et(t,null,new ne(r))}{if(!(t instanceof Et||t instanceof rs))throw new Q(j.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(xe.fromString(e,...n));return M_(r),new Et(t.firestore,t instanceof rs?t.converter:null,new ne(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new om(this,"async_queue_retry"),this.Vu=()=>{const r=yh();r&&te("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=yh();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=yh();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Wn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!vl(e))throw e;te("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw yr("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=dm.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&se()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function B_(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class Pn extends vd{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new F_,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new F_(e),this._firestoreClient=void 0,await e}}}function cb(t,e){const n=typeof t=="object"?t:Yc(),r=typeof t=="string"?t:"(default)",s=Qc(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=IE("firestore");i&&ub(s,...i)}return s}function To(t){if(t._terminated)throw new Q(j.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||db(t),t._firestoreClient}function db(t){var e,n,r;const s=t._freezeSettings(),i=function(l,u,c,f){return new $N(l,u,c,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,CT(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new tb(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Hs(Tt.fromBase64String(e))}catch(n){throw new Q(j.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Hs(Tt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new Q(j.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new yt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new Q(j.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new Q(j.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Ie(this._lat,e._lat)||Ie(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hb=/^__.*__$/;class fb{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new fs(e,this.data,this.fieldMask,n,this.fieldTransforms):new El(e,this.data,n,this.fieldTransforms)}}class PT{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new fs(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function NT(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw se()}}class wd{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new wd(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Pc(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(NT(this.Cu)&&hb.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class pb{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||md(e)}Qu(e,n,r,s=!1){return new wd({Cu:e,methodName:n,qu:r,path:yt.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ao(t){const e=t._freezeSettings(),n=md(t._databaseId);return new pb(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Ed(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);km("Data must be an object, but it was:",o,r);const l=bT(r,o);let u,c;if(i.merge)u=new Zt(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=Mf(e,p,n);if(!o.contains(g))throw new Q(j.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);OT(f,g)||f.push(g)}u=new Zt(f),c=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,c=o.fieldTransforms;return new fb(new Mt(l),u,c)}class Id extends ei{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Id}}function xT(t,e,n){return new wd({Cu:3,qu:e.settings.qu,methodName:t._methodName,xu:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Im extends ei{_toFieldTransform(e){return new hd(e.path,new ol)}isEqual(e){return e instanceof Im}}class Tm extends ei{constructor(e,n){super(e),this.Ku=n}_toFieldTransform(e){const n=xT(this,e,!0),r=this.Ku.map(i=>ti(i,n)),s=new oo(r);return new hd(e.path,s)}isEqual(e){return e instanceof Tm&&to(this.Ku,e.Ku)}}class Sm extends ei{constructor(e,n){super(e),this.Ku=n}_toFieldTransform(e){const n=xT(this,e,!0),r=this.Ku.map(i=>ti(i,n)),s=new ao(r);return new hd(e.path,s)}isEqual(e){return e instanceof Sm&&to(this.Ku,e.Ku)}}class Am extends ei{constructor(e,n){super(e),this.$u=n}_toFieldTransform(e){const n=new al(e.serializer,qI(e.serializer,this.$u));return new hd(e.path,n)}isEqual(e){return e instanceof Am&&this.$u===e.$u}}function Rm(t,e,n,r){const s=t.Qu(1,e,n);km("Data must be an object, but it was:",s,r);const i=[],o=Mt.empty();Js(r,(u,c)=>{const f=Pm(e,u,n);c=ce(c);const p=s.Nu(f);if(c instanceof Id)i.push(f);else{const g=ti(c,p);g!=null&&(i.push(f),o.set(f,g))}});const l=new Zt(i);return new PT(o,l,s.fieldTransforms)}function Cm(t,e,n,r,s,i){const o=t.Qu(1,e,n),l=[Mf(e,r,n)],u=[s];if(i.length%2!=0)throw new Q(j.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(Mf(e,i[g])),u.push(i[g+1]);const c=[],f=Mt.empty();for(let g=l.length-1;g>=0;--g)if(!OT(c,l[g])){const C=l[g];let N=u[g];N=ce(N);const b=o.Nu(C);if(N instanceof Id)c.push(C);else{const k=ti(N,b);k!=null&&(c.push(C),f.set(C,k))}}const p=new Zt(c);return new PT(f,p,o.fieldTransforms)}function mb(t,e,n,r=!1){return ti(n,t.Qu(r?4:3,e))}function ti(t,e){if(DT(t=ce(t)))return km("Unsupported field value:",e,t),bT(t,e);if(t instanceof ei)return function(r,s){if(!NT(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let u=ti(l,s.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=ce(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return qI(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Qe.fromDate(r);return{timestampValue:Sc(s.serializer,i)}}if(r instanceof Qe){const i=new Qe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Sc(s.serializer,i)}}if(r instanceof wm)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Hs)return{bytesValue:nT(s.serializer,r._byteString)};if(r instanceof Et){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:nm(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Em)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return Zp(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${_d(r)}`)}(t,e)}function bT(t,e){const n={};return kI(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Js(t,(r,s)=>{const i=ti(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function DT(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Qe||t instanceof wm||t instanceof Hs||t instanceof Et||t instanceof ei||t instanceof Em)}function km(t,e,n){if(!DT(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=_d(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Mf(t,e,n){if((e=ce(e))instanceof So)return e._internalPath;if(typeof e=="string")return Pm(t,e);throw Pc("Field path arguments must be of type string or ",t,!1,void 0,n)}const gb=new RegExp("[~\\*/\\[\\]]");function Pm(t,e,n){if(e.search(gb)>=0)throw Pc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new So(...e.split("."))._internalPath}catch{throw Pc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Pc(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new Q(j.INVALID_ARGUMENT,l+t+u)}function OT(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Et(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new yb(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Td("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class yb extends Nc{data(){return super.data()}}function Td(t,e){return typeof e=="string"?Pm(t,e):e instanceof So?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LT(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new Q(j.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Nm{}class xm extends Nm{}function Yn(t,e,...n){let r=[];e instanceof Nm&&r.push(e),r=r.concat(n),function(i){const o=i.filter(u=>u instanceof bm).length,l=i.filter(u=>u instanceof Sd).length;if(o>1||o>0&&l>0)throw new Q(j.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class Sd extends xm{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Sd(e,n,r)}_apply(e){const n=this._parse(e);return VT(e._query,n),new Ir(e.firestore,e.converter,Pf(e._query,n))}_parse(e){const n=Ao(e.firestore);return function(i,o,l,u,c,f,p){let g;if(c.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new Q(j.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){z_(p,f);const C=[];for(const N of p)C.push($_(u,i,N));g={arrayValue:{values:C}}}else g=$_(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||z_(p,f),g=mb(l,o,p,f==="in"||f==="not-in");return tt.create(c,f,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function vr(t,e,n){const r=e,s=Td("where",t);return Sd._create(s,r,n)}class bm extends Nm{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new bm(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:kn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const u of l)VT(o,u),o=Pf(o,u)}(e._query,n),new Ir(e.firestore,e.converter,Pf(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Dm extends xm{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Dm(e,n)}_apply(e){const n=function(s,i,o){if(s.startAt!==null)throw new Q(j.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new Q(j.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new il(i,o)}(e._query,this._field,this._direction);return new Ir(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new wo(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function _b(t,e="asc"){const n=e,r=Td("orderBy",t);return Dm._create(r,n)}class Om extends xm{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new Om(e,n,r)}_apply(e){return new Ir(e.firestore,e.converter,Tc(e._query,this._limit,this._limitType))}}function Ad(t){return lb("limit",t),Om._create("limit",t,"F")}function $_(t,e,n){if(typeof(n=ce(n))=="string"){if(n==="")throw new Q(j.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!MI(e)&&n.indexOf("/")!==-1)throw new Q(j.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(xe.fromString(n));if(!ne.isDocumentKey(r))throw new Q(j.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return u_(t,new ne(r))}if(n instanceof Et)return u_(t,n._key);throw new Q(j.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${_d(n)}.`)}function z_(t,e){if(!Array.isArray(t)||t.length===0)throw new Q(j.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function VT(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new Q(j.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Q(j.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class MT{convertValue(e,n="none"){switch(Ws(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(qs(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw se()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Js(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Ge(o.doubleValue));return new Em(i)}convertGeoPoint(e){return new wm(Ge(e.latitude),Ge(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Qp(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(nl(e));default:return null}}convertTimestamp(e){const n=ls(e);return new Qe(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=xe.fromString(e);we(uT(r));const s=new rl(r.get(1),r.get(3)),i=new ne(r.popFirst(5));return s.isEqual(n)||yr(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rd(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class vb extends MT{constructor(e){super(),this.firestore=e}convertBytes(e){return new Hs(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Et(this.firestore,null,n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Lm extends Nc{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new qu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Td("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class qu extends Lm{data(e={}){return super.data(e)}}class jT{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Vi(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new qu(this._firestore,this._userDataWriter,r.key,r,new Vi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new Q(j.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const u=new qu(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Vi(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new qu(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Vi(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,f=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:wb(l.type),doc:u,oldIndex:c,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function wb(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return se()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(t){t=bt(t,Et);const e=bt(t.firestore,Pn);return ib(To(e),t._key).then(n=>UT(e,t,n))}class Cd extends MT{constructor(e){super(),this.firestore=e}convertBytes(e){return new Hs(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Et(this.firestore,null,n)}}function Rl(t){t=bt(t,Ir);const e=bt(t.firestore,Pn),n=To(e),r=new Cd(e);return LT(t._query),ob(n,t._query).then(s=>new jT(e,r,t,s))}function Tr(t,e,n){t=bt(t,Et);const r=bt(t.firestore,Pn),s=Rd(t.converter,e,n);return Cl(r,[Ed(Ao(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,nt.none())])}function Ce(t,e,n,...r){t=bt(t,Et);const s=bt(t.firestore,Pn),i=Ao(s);let o;return o=typeof(e=ce(e))=="string"||e instanceof So?Cm(i,"updateDoc",t._key,e,n,r):Rm(i,"updateDoc",t._key,e),Cl(s,[o.toMutation(t._key,nt.exists(!0))])}function kd(t){return Cl(bt(t.firestore,Pn),[new Il(t._key,nt.none())])}function Eb(t,e){const n=bt(t.firestore,Pn),r=ue(t),s=Rd(t.converter,e);return Cl(n,[Ed(Ao(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,nt.exists(!1))]).then(()=>r)}function Gn(t,...e){var n,r,s;t=ce(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||B_(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(B_(e[o])){const p=e[o];e[o]=(n=p.next)===null||n===void 0?void 0:n.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let u,c,f;if(t instanceof Et)c=bt(t.firestore,Pn),f=ld(t._key.path),u={next:p=>{e[o]&&e[o](UT(c,t,p))},error:e[o+1],complete:e[o+2]};else{const p=bt(t,Ir);c=bt(p.firestore,Pn),f=p._query;const g=new Cd(c);u={next:C=>{e[o]&&e[o](new jT(c,g,p,C))},error:e[o+1],complete:e[o+2]},LT(t._query)}return function(g,C,N,b){const k=new _m(b),A=new gm(C,k,N);return g.asyncQueue.enqueueAndForget(async()=>fm(await kc(g),A)),()=>{k.Za(),g.asyncQueue.enqueueAndForget(async()=>pm(await kc(g),A))}}(To(c),f,l,u)}function Cl(t,e){return function(r,s){const i=new Wn;return r.asyncQueue.enqueueAndForget(async()=>Wx(await rb(r),s,i)),i.promise}(To(t),e)}function UT(t,e,n){const r=n.docs.get(e._key),s=new Cd(t);return new Lm(t,s,e._key,r,new Vi(n.hasPendingWrites,n.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ib={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tb{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=Ao(e)}set(e,n,r){this._verifyNotCommitted();const s=Br(e,this._firestore),i=Rd(s.converter,n,r),o=Ed(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,nt.none())),this}update(e,n,r,...s){this._verifyNotCommitted();const i=Br(e,this._firestore);let o;return o=typeof(n=ce(n))=="string"||n instanceof So?Cm(this._dataReader,"WriteBatch.update",i._key,n,r,s):Rm(this._dataReader,"WriteBatch.update",i._key,n),this._mutations.push(o.toMutation(i._key,nt.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=Br(e,this._firestore);return this._mutations=this._mutations.concat(new Il(n._key,nt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new Q(j.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Br(t,e){if((t=ce(t)).firestore!==e)throw new Q(j.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sb extends class{constructor(n,r){this._firestore=n,this._transaction=r,this._dataReader=Ao(n)}get(n){const r=Br(n,this._firestore),s=new vb(this._firestore);return this._transaction.lookup([r._key]).then(i=>{if(!i||i.length!==1)return se();const o=i[0];if(o.isFoundDocument())return new Nc(this._firestore,s,o.key,o,r.converter);if(o.isNoDocument())return new Nc(this._firestore,s,r._key,null,r.converter);throw se()})}set(n,r,s){const i=Br(n,this._firestore),o=Rd(i.converter,r,s),l=Ed(this._dataReader,"Transaction.set",i._key,o,i.converter!==null,s);return this._transaction.set(i._key,l),this}update(n,r,s,...i){const o=Br(n,this._firestore);let l;return l=typeof(r=ce(r))=="string"||r instanceof So?Cm(this._dataReader,"Transaction.update",o._key,r,s,i):Rm(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,l),this}delete(n){const r=Br(n,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,n){super(e,n),this._firestore=e}get(e){const n=Br(e,this._firestore),r=new Cd(this._firestore);return super.get(e).then(s=>new Lm(this._firestore,r,n._key,s._document,new Vi(!1,!1),n.converter))}}function FT(t,e,n){t=bt(t,Pn);const r=Object.assign(Object.assign({},Ib),n);return function(i){if(i.maxAttempts<1)throw new Q(j.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(i,o,l){const u=new Wn;return i.asyncQueue.enqueueAndForget(async()=>{const c=await sb(i);new eb(i.asyncQueue,c,l,o,u).au()}),u.promise}(To(t),s=>e(new Sb(t,s)),r)}function Ae(){return new Im("serverTimestamp")}function lr(...t){return new Tm("arrayUnion",t)}function Ab(...t){return new Sm("arrayRemove",t)}function Rb(t){return new Am("increment",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vm(t){return To(t=bt(t,Pn)),new Tb(t,e=>Cl(t,e))}(function(e,n=!0){(function(s){vo=s})(Ys),Bs(new os("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new Pn(new CN(r.getProvider("auth-internal")),new xN(r.getProvider("app-check-internal")),function(c,f){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new Q(j.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new rl(c.options.projectId,f)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),qn(s_,"4.7.3",e),qn(s_,"4.7.3","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BT="firebasestorage.googleapis.com",$T="storageBucket",Cb=2*60*1e3,kb=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We extends Xn{constructor(e,n,r=0){super(vh(e),`Firebase Storage: ${n} (${vh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,We.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return vh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var qe;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(qe||(qe={}));function vh(t){return"storage/"+t}function Mm(){const t="An unknown error occurred, please check the error payload for server response.";return new We(qe.UNKNOWN,t)}function Pb(t){return new We(qe.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function Nb(t){return new We(qe.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function xb(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new We(qe.UNAUTHENTICATED,t)}function bb(){return new We(qe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Db(t){return new We(qe.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function Ob(){return new We(qe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Lb(){return new We(qe.CANCELED,"User canceled the upload/download.")}function Vb(t){return new We(qe.INVALID_URL,"Invalid URL '"+t+"'.")}function Mb(t){return new We(qe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function jb(){return new We(qe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+$T+"' property when initializing the app?")}function Ub(){return new We(qe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Fb(){return new We(qe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Bb(t){return new We(qe.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function jf(t){return new We(qe.INVALID_ARGUMENT,t)}function zT(){return new We(qe.APP_DELETED,"The Firebase app was deleted.")}function $b(t){return new We(qe.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function xa(t,e){return new We(qe.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function sa(t){throw new We(qe.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=en.makeFromUrl(e,n)}catch{return new en(e,"")}if(r.path==="")return r;throw Mb(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(D){D.path.charAt(D.path.length-1)==="/"&&(D.path_=D.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function c(D){D.path_=decodeURIComponent(D.path)}const f="v[A-Za-z0-9_]+",p=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",C=new RegExp(`^https?://${p}/${f}/b/${s}/o${g}`,"i"),N={bucket:1,path:3},b=n===BT?"(?:storage.googleapis.com|storage.cloud.google.com)":n,k="([^?#]*)",A=new RegExp(`^https?://${b}/${s}/${k}`,"i"),E=[{regex:l,indices:u,postModify:i},{regex:C,indices:N,postModify:c},{regex:A,indices:{bucket:1,path:2},postModify:c}];for(let D=0;D<E.length;D++){const B=E[D],$=B.regex.exec(e);if($){const w=$[B.indices.bucket];let _=$[B.indices.path];_||(_=""),r=new en(w,_),B.postModify(r);break}}if(r==null)throw Vb(e);return r}}class zb{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qb(t,e,n){let r=1,s=null,i=null,o=!1,l=0;function u(){return l===2}let c=!1;function f(...k){c||(c=!0,e.apply(null,k))}function p(k){s=setTimeout(()=>{s=null,t(C,u())},k)}function g(){i&&clearTimeout(i)}function C(k,...A){if(c){g();return}if(k){g(),f.call(null,k,...A);return}if(u()||o){g(),f.call(null,k,...A);return}r<64&&(r*=2);let E;l===1?(l=2,E=0):E=(r+Math.random())*1e3,p(E)}let N=!1;function b(k){N||(N=!0,g(),!c&&(s!==null?(k||(l=2),clearTimeout(s),p(0)):k||(l=1)))}return p(0),i=setTimeout(()=>{o=!0,b(!0)},n),b}function Wb(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hb(t){return t!==void 0}function Gb(t){return typeof t=="object"&&!Array.isArray(t)}function jm(t){return typeof t=="string"||t instanceof String}function q_(t){return Um()&&t instanceof Blob}function Um(){return typeof Blob<"u"}function W_(t,e,n,r){if(r<e)throw jf(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw jf(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fm(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function qT(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var Os;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Os||(Os={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kb(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qb{constructor(e,n,r,s,i,o,l,u,c,f,p,g=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=f,this.connectionFactory_=p,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,N)=>{this.resolve_=C,this.reject_=N,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Eu(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=l=>{const u=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const l=i.getErrorCode()===Os.NO_ERROR,u=i.getStatus();if(!l||Kb(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===Os.ABORT;r(!1,new Eu(!1,null,f));return}const c=this.successCodes_.indexOf(u)!==-1;r(!0,new Eu(c,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());Hb(u)?i(u):i()}catch(u){o(u)}else if(l!==null){const u=Mm();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(s.canceled){const u=this.appDelete_?zT():Lb();o(u)}else{const u=Ob();o(u)}};this.canceled_?n(!1,new Eu(!1,null,!0)):this.backoffId_=qb(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Wb(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Eu{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function Yb(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function Xb(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Jb(t,e){e&&(t["X-Firebase-GMPID"]=e)}function Zb(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function eD(t,e,n,r,s,i,o=!0){const l=qT(t.urlParams),u=t.url+l,c=Object.assign({},t.headers);return Jb(c,e),Yb(c,n),Xb(c,i),Zb(c,r),new Qb(u,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tD(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function nD(...t){const e=tD();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(Um())return new Blob(t);throw new We(qe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function rD(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sD(t){if(typeof atob>"u")throw Bb("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class wh{constructor(e,n){this.data=e,this.contentType=n||null}}function iD(t,e){switch(t){case Fn.RAW:return new wh(WT(e));case Fn.BASE64:case Fn.BASE64URL:return new wh(HT(t,e));case Fn.DATA_URL:return new wh(aD(e),lD(e))}throw Mm()}function WT(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=t.charCodeAt(++n);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function oD(t){let e;try{e=decodeURIComponent(t)}catch{throw xa(Fn.DATA_URL,"Malformed data URL.")}return WT(e)}function HT(t,e){switch(t){case Fn.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw xa(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Fn.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw xa(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=sD(e)}catch(s){throw s.message.includes("polyfill")?s:xa(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class GT{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw xa(Fn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=uD(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function aD(t){const e=new GT(t);return e.base64?HT(Fn.BASE64,e.rest):oD(e.rest)}function lD(t){return new GT(t).contentType}function uD(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(e,n){let r=0,s="";q_(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if(q_(this.data_)){const r=this.data_,s=rD(r,e,n);return s===null?null:new $r(s)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new $r(r,!0)}}static getBlob(...e){if(Um()){const n=e.map(r=>r instanceof $r?r.data_:r);return new $r(nD.apply(null,n))}else{const n=e.map(o=>jm(o)?iD(Fn.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return n.forEach(o=>{for(let l=0;l<o.length;l++)s[i++]=o[l]}),new $r(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KT(t){let e;try{e=JSON.parse(t)}catch{return null}return Gb(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cD(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function dD(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function QT(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hD(t,e){return e}class Lt{constructor(e,n,r,s){this.server=e,this.local=n||e,this.writable=!!r,this.xform=s||hD}}let Iu=null;function fD(t){return!jm(t)||t.length<2?t:QT(t)}function YT(){if(Iu)return Iu;const t=[];t.push(new Lt("bucket")),t.push(new Lt("generation")),t.push(new Lt("metageneration")),t.push(new Lt("name","fullPath",!0));function e(i,o){return fD(o)}const n=new Lt("name");n.xform=e,t.push(n);function r(i,o){return o!==void 0?Number(o):o}const s=new Lt("size");return s.xform=r,t.push(s),t.push(new Lt("timeCreated")),t.push(new Lt("updated")),t.push(new Lt("md5Hash",null,!0)),t.push(new Lt("cacheControl",null,!0)),t.push(new Lt("contentDisposition",null,!0)),t.push(new Lt("contentEncoding",null,!0)),t.push(new Lt("contentLanguage",null,!0)),t.push(new Lt("contentType",null,!0)),t.push(new Lt("metadata","customMetadata",!0)),Iu=t,Iu}function pD(t,e){function n(){const r=t.bucket,s=t.fullPath,i=new en(r,s);return e._makeStorageReference(i)}Object.defineProperty(t,"ref",{get:n})}function mD(t,e,n){const r={};r.type="file";const s=n.length;for(let i=0;i<s;i++){const o=n[i];r[o.local]=o.xform(r,e[o.server])}return pD(r,t),r}function XT(t,e,n){const r=KT(e);return r===null?null:mD(t,r,n)}function gD(t,e,n,r){const s=KT(e);if(s===null||!jm(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(c=>{const f=t.bucket,p=t.fullPath,g="/b/"+o(f)+"/o/"+o(p),C=Fm(g,n,r),N=qT({alt:"media",token:c});return C+N})[0]}function yD(t,e){const n={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(n[i.server]=t[i.local])}return JSON.stringify(n)}class JT{constructor(e,n,r,s){this.url=e,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZT(t){if(!t)throw Mm()}function _D(t,e){function n(r,s){const i=XT(t,s,e);return ZT(i!==null),i}return n}function vD(t,e){function n(r,s){const i=XT(t,s,e);return ZT(i!==null),gD(i,s,t.host,t._protocol)}return n}function e0(t){function e(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=bb():s=xb():n.getStatus()===402?s=Nb(t.bucket):n.getStatus()===403?s=Db(t.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return e}function wD(t){const e=e0(t);function n(r,s){let i=e(r,s);return r.getStatus()===404&&(i=Pb(t.path)),i.serverResponse=s.serverResponse,i}return n}function ED(t,e,n){const r=e.fullServerUrl(),s=Fm(r,t.host,t._protocol),i="GET",o=t.maxOperationRetryTime,l=new JT(s,i,vD(t,n),o);return l.errorHandler=wD(e),l}function ID(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function TD(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=ID(null,e)),r}function SD(t,e,n,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function l(){let E="";for(let D=0;D<2;D++)E=E+Math.random().toString().slice(2);return E}const u=l();o["Content-Type"]="multipart/related; boundary="+u;const c=TD(e,r,s),f=yD(c,n),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+c.contentType+`\r
\r
`,g=`\r
--`+u+"--",C=$r.getBlob(p,r,g);if(C===null)throw Ub();const N={name:c.fullPath},b=Fm(i,t.host,t._protocol),k="POST",A=t.maxUploadRetryTime,y=new JT(b,k,_D(t,n),A);return y.urlParams=N,y.headers=o,y.body=C.uploadData(),y.errorHandler=e0(e),y}class AD{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Os.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Os.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Os.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,s){if(this.sent_)throw sa("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw sa("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw sa("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw sa("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw sa("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class RD extends AD{initXhr(){this.xhr_.responseType="text"}}function t0(){return new RD}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(e,n){this._service=e,n instanceof en?this._location=n:this._location=en.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Gs(e,n)}get root(){const e=new en(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return QT(this._location.path)}get storage(){return this._service}get parent(){const e=cD(this._location.path);if(e===null)return null;const n=new en(this._location.bucket,e);return new Gs(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw $b(e)}}function CD(t,e,n){t._throwIfRoot("uploadBytes");const r=SD(t.storage,t._location,YT(),new $r(e,!0),n);return t.storage.makeRequestWithTokens(r,t0).then(s=>({metadata:s,ref:t}))}function kD(t){t._throwIfRoot("getDownloadURL");const e=ED(t.storage,t._location,YT());return t.storage.makeRequestWithTokens(e,t0).then(n=>{if(n===null)throw Fb();return n})}function PD(t,e){const n=dD(t._location.path,e),r=new en(t._location.bucket,n);return new Gs(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ND(t){return/^[A-Za-z]+:\/\//.test(t)}function xD(t,e){return new Gs(t,e)}function n0(t,e){if(t instanceof Bm){const n=t;if(n._bucket==null)throw jb();const r=new Gs(n,n._bucket);return e!=null?n0(r,e):r}else return e!==void 0?PD(t,e):t}function bD(t,e){if(e&&ND(e)){if(t instanceof Bm)return xD(t,e);throw jf("To use ref(service, url), the first argument must be a Storage instance.")}else return n0(t,e)}function H_(t,e){const n=e==null?void 0:e[$T];return n==null?null:en.makeFromBucketSpec(n,t)}function DD(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:AE(s,t.app.options.projectId))}class Bm{constructor(e,n,r,s,i){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=BT,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Cb,this._maxUploadRetryTime=kb,this._requests=new Set,s!=null?this._bucket=en.makeFromBucketSpec(s,this._host):this._bucket=H_(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=en.makeFromBucketSpec(this._url,e):this._bucket=H_(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){W_("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){W_("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Gs(this,e)}_makeRequest(e,n,r,s,i=!0){if(this._deleted)return new zb(zT());{const o=eD(e,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const G_="@firebase/storage",K_="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r0="storage";function OD(t,e,n){return t=ce(t),CD(t,e,n)}function LD(t){return t=ce(t),kD(t)}function VD(t,e){return t=ce(t),bD(t,e)}function MD(t=Yc(),e){t=ce(t);const r=Qc(t,r0).getImmediate({identifier:e}),s=IE("storage");return s&&jD(r,...s),r}function jD(t,e,n,r={}){DD(t,e,n,r)}function UD(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new Bm(n,r,s,e,Ys)}function FD(){Bs(new os(r0,UD,"PUBLIC").setMultipleInstances(!0)),qn(G_,K_,""),qn(G_,K_,"esm2017")}FD();const s0={apiKey:"AIzaSyAXMyuXjnS3l8oCDbt_pfkORmlmJE094lY",authDomain:"co-chatt.firebaseapp.com",projectId:"co-chatt",appId:"1:883596884512:web:eed71eaecfdf27a9b91a45"},$m=Object.values(s0).every(Boolean),co=$m?IC().length?Yc():kE(s0):null,ze=co?EN(co):null,q=co?cb(co):null,Q_=co?MD(co):null,BD=new Un;async function $D(t,e){if(!q||!t||!e||t===e)return;const n=Vm(q);n.set(ue(q,"blocks",`${t}_${e}`),{blockerId:t,blockedId:e,createdAt:Ae()}),n.delete(ue(q,"friendships",[t,e].sort().join("_"))),n.delete(ue(q,"friendRequests",`${t}_${e}`)),n.delete(ue(q,"friendRequests",`${e}_${t}`)),await n.commit()}async function Ro(t,e){if(!q||!t||!e)return!1;const[n,r]=await Promise.all([it(ue(q,"blocks",`${t}_${e}`)),it(ue(q,"blocks",`${e}_${t}`))]);return n.exists()||r.exists()}async function zm(t){return q?(await Rl(Yn(sn(q,"blocks"),vr("blockerId","==",t)))).docs.map(n=>({id:n.id,blockerId:t,blockedId:String(n.data().blockedId||""),createdAt:fn(n.data().createdAt)})):[]}const zD=t=>t.split(/\s+/).map(e=>e[0]).join("").slice(0,2).toUpperCase()||"U",fn=t=>t instanceof Qe?t:null,Ls=t=>t.trim().toLowerCase().replace(/[^a-z0-9_]/g,"").slice(0,24);async function Uf(t,e,n){if(!q)return Ls(e||n);const r=Ls(e)||Ls(n)||`user${t.slice(0,8).toLowerCase()}`,s=ue(q,"usernames",r);return await FT(q,async i=>{const o=await i.get(s);if(o.exists()&&o.data().uid!==t)throw new Error("That username is already taken.");i.set(s,{uid:t,createdAt:o.exists()?o.data().createdAt:Ae()},{merge:!0})}),r}async function qD(t,e){var i;if(!q)return!1;const n=ue(q,"users",t),r=await it(n),s=e.displayName||((i=e.email)==null?void 0:i.split("@")[0])||"Co-Chat member";if(r.exists())await Ce(n,{displayName:s,email:e.email||r.data().email||"",photoURL:e.photoURL||r.data().photoURL||""});else{let o=Ls(s)||`user${t.slice(0,8).toLowerCase()}`;try{o=await Uf(t,o,`user${t.slice(0,8).toLowerCase()}`)}catch{o=await Uf(t,`user${t.slice(0,8).toLowerCase()}`,`user${t.slice(0,8).toLowerCase()}`)}return await Tr(n,{displayName:s,email:e.email||"",username:o,photoURL:e.photoURL||"",bio:"",notificationsEnabled:!0,discoverable:!0,profileComplete:!1,createdAt:Ae()}),!0}return!Ls(String(r.data().username||""))}async function Mn(t){var r;if(!q)return null;const e=(r=ze==null?void 0:ze.currentUser)==null?void 0:r.uid;if(e&&e!==t&&await Ro(e,t))return null;const n=await it(ue(q,"users",t));return n.exists()?a0(t,n.data()):null}function WD(t,e){if(!q)return;const n=Yn(sn(q,"conversations"),vr("memberIds","array-contains",t));return Gn(n,r=>{Promise.all(r.docs.map(async s=>{var N,b;const i=s.data(),o=Array.isArray(i.memberIds)?i.memberIds.map(String):[],l=o.find(k=>k!==t),u=l?await Mn(l):null,c=String(i.type||"")==="group"?String(i.name||"Group chat"):(u==null?void 0:u.displayName)||String(i.name||"Conversation"),f=((N=u==null?void 0:u.lastSeen)==null?void 0:N.toMillis())||0,p=fn(i.lastMessageAt),g=i.readAt&&typeof i.readAt=="object"?i.readAt:{},C=l?fn(g[l]):null;return{id:s.id,name:c,memberIds:o,type:i.type==="group"?"group":"direct",adminId:i.adminId?String(i.adminId):void 0,lastMessage:String(i.lastMessage||""),lastSenderId:i.lastSenderId?String(i.lastSenderId):void 0,lastMessageAt:p,lastMessageSeen:!!(p&&C&&C.toMillis()>=p.toMillis()),createdAt:fn(i.createdAt),hiddenFor:Array.isArray(i.hiddenFor)?i.hiddenFor.map(String):[],avatar:zD(c),photoURL:i.type==="group"?"":(u==null?void 0:u.photoURL)||"",active:(u==null?void 0:u.activeStatus)!==!1&&Date.now()-f<9e4,lastSeen:(u==null?void 0:u.lastSeen)||null,unreadCount:Number(((b=i.unreadCounts)==null?void 0:b[t])||0)}})).then(s=>e(s.filter(i=>{var o;return!((o=i.hiddenFor)!=null&&o.includes(t))}).sort((i,o)=>{var l,u,c,f;return(((l=o.lastMessageAt)==null?void 0:l.toMillis())||((u=o.createdAt)==null?void 0:u.toMillis())||0)-(((c=i.lastMessageAt)==null?void 0:c.toMillis())||((f=i.createdAt)==null?void 0:f.toMillis())||0)})))})}function HD(t,e,n){if(!q)return;let r=null,s=[],i=!0;const o=()=>{const c=s.filter(f=>{var p;return!((p=f.hiddenFor)!=null&&p.includes(e))});return r?c.filter(f=>!!f.createdAt&&f.createdAt.toMillis()>r.toMillis()):c};it(ue(q,"conversations",t)).then(c=>{var f,p;r=fn((p=(f=c.data())==null?void 0:f.hiddenAt)==null?void 0:p[e]),i&&n(o())}).catch(()=>{});const l=Yn(sn(q,"conversations",t,"messages")),u=Gn(l,c=>{s=c.docs.map(f=>{const p=f.data();return{id:f.id,text:String(p.text||""),senderId:String(p.senderId||""),createdAt:fn(p.createdAt),attachment:p.attachment?{name:String(p.attachment.name||"file"),url:String(p.attachment.url||""),type:String(p.attachment.type||""),size:Number(p.attachment.size||0)}:null,replyTo:p.replyTo?{id:String(p.replyTo.id||""),text:String(p.replyTo.text||""),senderId:String(p.replyTo.senderId||"")}:null,seenBy:Array.isArray(p.seenBy)?p.seenBy.map(String):[],hiddenFor:Array.isArray(p.hiddenFor)?p.hiddenFor.map(String):[]}}).sort((f,p)=>{var g,C;return(((g=f.createdAt)==null?void 0:g.toMillis())||0)-(((C=p.createdAt)==null?void 0:C.toMillis())||0)}),i&&n(o())});return()=>{i=!1,u()}}async function Y_(t,e,n,r,s){if(!q)return;const i=ue(q,"conversations",t),o=await it(i);if(!o.exists())throw new Error("This conversation no longer exists.");const l=o.data();if(!(l.memberIds||[]).includes(e))throw new Error("You are not a member of this conversation.");if(l.type==="direct"){const g=(l.memberIds||[]).find(C=>C!==e);if(g&&await Ro(e,g))throw new Error("You cannot message this user.")}let u=null;if(r){if(!Q_)throw new Error("Storage is not configured");if(r.size>10*1024*1024)throw new Error("Files must be smaller than 10 MB");const g=VD(Q_,`conversation-media/${t}/${e}/${Date.now()}-${r.name.replace(/[^a-zA-Z0-9._-]/g,"_")}`);await OD(g,r),u={name:r.name,url:await LD(g),type:r.type,size:r.size}}const c={text:n,senderId:e,createdAt:Ae()};u&&(c.attachment=u),s&&(c.replyTo={id:s.id,text:s.text,senderId:s.senderId}),await Eb(sn(i,"messages"),{...c,seenBy:[e]});const f=(l.memberIds||[]).filter(g=>g!==e),p=Object.fromEntries(f.map(g=>[`unreadCounts.${g}`,Rb(1)]));await Ce(i,{lastMessage:u?`📎 ${u.name}`:n,lastSenderId:e,lastMessageAt:Ae(),hiddenFor:[],...p})}async function GD(t,e){if(!q)return;await kd(ue(q,"conversations",t,"messages",e));const n=await Rl(Yn(sn(q,"conversations",t,"messages"),_b("createdAt","desc"),Ad(1))),r=ue(q,"conversations",t);if(n.empty)await Ce(r,{lastMessage:"",lastSenderId:null,lastMessageAt:null});else{const s=n.docs[0].data();await Ce(r,{lastMessage:String(s.text||(s.attachment?`📎 ${s.attachment.name||"Attachment"}`:"")),lastSenderId:String(s.senderId||""),lastMessageAt:s.createdAt||null})}}async function KD(t,e,n){q&&await Ce(ue(q,"conversations",t,"messages",e),{hiddenFor:lr(n)})}async function QD(t,e){if(!q)return;const n=ue(q,"conversations",t),r=await it(n);if(!r.exists()||!(r.data().memberIds||[]).includes(e))throw new Error("You cannot delete this conversation.");await Ce(n,{hiddenFor:lr(e),[`hiddenAt.${e}`]:Ae()})}async function YD(t,e){if(!q)return;const n=ue(q,"conversations",t),s=(await Rl(sn(n,"messages"))).docs.filter(i=>!(i.data().seenBy||[]).includes(e));for(let i=0;i<s.length;i+=450){const o=Vm(q);s.slice(i,i+450).forEach(l=>o.update(l.ref,{seenBy:lr(e)})),await o.commit()}await Ce(n,{[`unreadCounts.${e}`]:0,[`readAt.${e}`]:Ae()})}async function X_(t,e){q&&await Ce(ue(q,"users",t),{activeStatus:e,lastSeen:Ae()})}async function i0(t,e){if(!q||!t.trim())return[];const n=t.trim().toLowerCase(),r=await Rl(Yn(sn(q,"users"),vr("username",">=",n),vr("username","<=",`${n}`),Ad(12))),s=await zm(e),i=new Set(s.map(o=>o.blockedId));return r.docs.filter(o=>o.id!==e&&!i.has(o.id)&&o.data().discoverable!==!1).map(o=>a0(o.id,o.data()))}async function Co(t,e){if(!q||!t||!e)return"none";const n=await it(ue(q,"friendships",[t,e].sort().join("_")));if(n.exists()&&n.data().status==="accepted")return"friends";const r=await it(ue(q,"friendRequests",`${t}_${e}`));if(r.exists()&&r.data().status==="pending")return"requested";const s=await it(ue(q,"friendRequests",`${e}_${t}`));return s.exists()&&s.data().status==="pending"?"incoming":"none"}async function Wu(t){if(!q)return[];const n=(await Rl(Yn(sn(q,"friendships"),vr("memberIds","array-contains",t)))).docs.filter(s=>s.data().status==="accepted").flatMap(s=>(s.data().memberIds||[]).map(String)).filter(s=>s!==t);return(await Promise.all([...new Set(n)].map(s=>Mn(s)))).filter(s=>!!s)}async function XD(t,e){if(!q||t===e)return;if(await Ro(t,e))throw new Error("You cannot send a request to this user.");const n=await Co(t,e);if(n==="friends")throw new Error("You are already friends.");if(n==="requested")throw new Error("Friend request already sent.");if(n==="incoming")throw new Error("This user already sent you a request. Open your requests to accept it.");await Tr(ue(q,"friendRequests",`${t}_${e}`),{fromUid:t,toUid:e,status:"pending",createdAt:Ae()})}async function JD(t,e){q&&await kd(ue(q,"friendRequests",`${t}_${e}`))}async function J_(t,e,n){if(!q)return;if(await Ro(t,e))throw new Error("This request is no longer available.");const r=ue(q,"friendRequests",`${t}_${e}`);if(n){const s=Vm(q);s.update(r,{status:"accepted",respondedAt:Ae()}),s.set(ue(q,"friendships",[t,e].sort().join("_")),{memberIds:[t,e],status:"accepted",createdAt:Ae()});const i=ue(q,"conversations",[t,e].sort().join("_"));(await it(i)).exists()||s.set(i,{type:"direct",memberIds:[t,e],createdBy:e,lastMessage:"",lastMessageAt:null,createdAt:Ae()}),await s.commit()}else await Ce(r,{status:"declined",respondedAt:Ae()})}function o0(t,e){if(!q)return;let n=[],r=[];const s=()=>e([...n,...r]),i=Gn(Yn(sn(q,"friendRequests"),vr("toUid","==",t)),l=>{n=l.docs.filter(u=>u.data().status==="pending").map(u=>({id:u.id,fromUid:String(u.data().fromUid),toUid:String(u.data().toUid),status:"pending",createdAt:fn(u.data().createdAt)})),s()}),o=Gn(Yn(sn(q,"friendRequests"),vr("fromUid","==",t)),l=>{r=l.docs.filter(u=>u.data().status==="pending").map(u=>({id:u.id,fromUid:String(u.data().fromUid),toUid:String(u.data().toUid),status:"pending",createdAt:fn(u.data().createdAt)})),s()});return()=>{i(),o()}}function a0(t,e){return{uid:t,displayName:String(e.displayName||"Co-Chat member"),email:String(e.email||""),username:String(e.username||""),photoURL:String(e.photoURL||""),bio:String(e.bio||""),notificationsEnabled:e.notificationsEnabled!==!1,discoverable:e.discoverable!==!1,activeStatus:e.activeStatus!==!1,theme:e.theme==="light"?"light":e.theme==="dark"?"dark":void 0,lastSeen:fn(e.lastSeen),profileComplete:e.profileComplete===!0}}async function ZD(t,e){!q||!t||await Tr(ue(q,"users",t),{theme:e,updatedAt:Ae()},{merge:!0})}async function eO(t,e){if(!q)return"";if(!t||!e.uid||t===e.uid)throw new Error("Choose another user to start a conversation.");if(await Ro(t,e.uid))throw new Error("You cannot message this user.");if(await Co(t,e.uid)!=="friends")throw new Error("You can message this person after they accept your friend request.");const r=[t,e.uid].sort().join("_"),s=ue(q,"conversations",r),i=await it(s);if(!i.exists())await Tr(s,{type:"direct",name:e.displayName||e.username,memberIds:[t,e.uid],createdBy:t,lastMessage:"",lastMessageAt:Ae(),createdAt:Ae()});else{const o=i.data();(Array.isArray(o.hiddenFor)?o.hiddenFor.map(String):[]).includes(t)&&((o.hiddenAt&&typeof o.hiddenAt=="object"?o.hiddenAt:{})[t]||await Ce(s,{[`hiddenAt.${t}`]:Ae()}))}return r}async function tO(t,e,n){if(!q)return"";const r=[...new Set([t,...n.map(i=>i.uid)])];if(r.length<3)throw new Error("Choose at least two friends for a group.");for(const i of n)if(await Co(t,i.uid)!=="friends")throw new Error("Groups can only include your accepted friends.");const s=ue(sn(q,"conversations"));return await Tr(s,{type:"group",name:e.trim()||"New group",memberIds:r,adminId:t,lastMessage:"",lastMessageAt:Ae(),createdBy:t,createdAt:Ae()}),s.id}async function nO(t,e,n){if(!q)return;const r=ue(q,"conversations",t),s=await it(r);if(!s.exists()||s.data().adminId!==e)throw new Error("Only the group admin can edit this group.");await Ce(r,{name:n.trim().slice(0,80)||"Group chat"})}async function rO(t,e,n){if(!q)return;const r=ue(q,"conversations",t),s=await it(r),i=s.data();if(!s.exists()||(i==null?void 0:i.adminId)!==e)throw new Error("Only the group admin can remove members.");await Ce(r,{memberIds:(i.memberIds||[]).filter(o=>o!==n)})}async function sO(t,e){if(!q)return;const n=ue(q,"conversations",t),r=await it(n),s=r.data();if(!r.exists()||(s==null?void 0:s.type)!=="group"||!Array.isArray(s.memberIds)||!s.memberIds.includes(e))throw new Error("You are not a member of this group.");const i=s.memberIds.filter(o=>o!==e);if(s.adminId===e&&i.length>0)throw new Error("The admin can leave only after all other members have left.");s.adminId===e?await kd(n):await Ce(n,{memberIds:i})}async function iO(t,e,n){if(!q||!n.length)return;const r=ue(q,"conversations",t),s=await it(r),i=s.data();if(!s.exists()||(i==null?void 0:i.type)!=="group"||!Array.isArray(i.memberIds)||!i.memberIds.includes(e))throw new Error("Only group members can add members.");const o=Array.isArray(i.memberIds)?i.memberIds.map(String):[],l=[...new Set(n.map(u=>u.uid))].filter(u=>!o.includes(u)&&u!==e);for(const u of n)if(l.includes(u.uid)&&await Co(e,u.uid)!=="friends")throw new Error("You can only add accepted friends.");l.length&&await Ce(r,{memberIds:[...o,...l]})}function oO(t){if(!q)return;const e=Yn(sn(q,"stories"),vr("expiresAt",">",Qe.now()),Ad(50));return Gn(e,n=>t(n.docs.map(r=>{const s=r.data();return{id:r.id,uid:String(s.uid||""),displayName:String(s.displayName||"Co-Chat member"),text:String(s.text||""),createdAt:fn(s.createdAt),expiresAt:fn(s.expiresAt)}}).sort((r,s)=>{var i,o;return(((i=r.expiresAt)==null?void 0:i.toMillis())||0)-(((o=s.expiresAt)==null?void 0:o.toMillis())||0)})))}async function l0(t,e){var o,l,u;if(!q)throw new Error("Profile service is unavailable. Check your connection and try again.");const n=ue(q,"users",t),r=await it(n),s=r.exists()?Ls(String(r.data().username||"")):"",i=Ls(e.username);if(i.length<3)throw new Error("Username must be at least 3 characters.");if(await Uf(t,i,t),await Tr(n,{displayName:e.displayName.trim(),email:r.exists()?String(r.data().email||""):((o=ze==null?void 0:ze.currentUser)==null?void 0:o.email)||"",username:i,photoURL:r.exists()?String(r.data().photoURL||((l=ze==null?void 0:ze.currentUser)==null?void 0:l.photoURL)||""):((u=ze==null?void 0:ze.currentUser)==null?void 0:u.photoURL)||"",bio:String(e.bio||"").trim().slice(0,280),notificationsEnabled:e.notificationsEnabled,discoverable:e.discoverable,activeStatus:e.activeStatus!==!1,profileComplete:!0,updatedAt:Ae()},{merge:!0}),s&&s!==i){const c=ue(q,"usernames",s),f=await it(c);f.exists()&&f.data().uid===t&&await kd(c)}}function aO(t,e){if(q)return Gn(Yn(sn(q,"calls"),vr("memberIds","array-contains",t),Ad(50)),n=>e(n.docs.map(r=>{const s=r.data(),i=s.type==="video"?"video":"audio";return{id:r.id,type:i,status:String(s.status||"completed"),memberIds:Array.isArray(s.memberIds)?s.memberIds.map(String):[],callerId:String(s.callerId||""),calleeId:String(s.calleeId||""),groupId:s.groupId?String(s.groupId):void 0,groupName:s.groupName?String(s.groupName):void 0,joinedIds:Array.isArray(s.joinedIds)?s.joinedIds.map(String):[],leftIds:Array.isArray(s.leftIds)?s.leftIds.map(String):[],createdAt:fn(s.createdAt)}}).sort((r,s)=>{var i,o;return(((i=s.createdAt)==null?void 0:i.toMillis())||0)-(((o=r.createdAt)==null?void 0:o.toMillis())||0)})))}async function lO(t,e,n,r){if(!q)return;const s=[...new Set(t)].sort();if(r){if(s.length<3)throw new Error("A group call needs at least three members.");if(!n||!s.includes(n))throw new Error("Only a group member can start this call.");const c=`group_${r.id}_${Date.now()}_${n}`,f=ue(q,"calls",c);return await Tr(f,{type:e,callerId:n,memberIds:s,groupId:r.id,groupName:r.name,joinedIds:[n],status:"ringing",createdAt:Ae()}),c}if(s.length!==2)throw new Error("Calls are available between two people only.");const i=n&&s.includes(n)?n:s[0],o=s.find(c=>c!==i)||s[1];if(await Ro(i,o))throw new Error("You cannot call this user.");if(await Co(i,o)!=="friends")throw new Error("You can call this person after becoming friends.");const l=s.slice().sort().join("_"),u=ue(q,"calls",l);return await FT(q,async c=>{const f=await c.get(u);if(f.exists()&&["ringing","connected"].includes(String(f.data().status||"")))throw new Error("This conversation already has an active call.");c.set(u,{memberIds:s,callerId:i,calleeId:o,type:e,status:"ringing",createdAt:Ae(),callerCandidates:[],calleeCandidates:[]})}),l}async function uO(t){q&&await Ce(ue(q,"calls",t),{status:"declined",endedAt:Ae()})}function cO(t){return t.split(/\s+/).filter(Boolean).map(e=>e[0]).join("").slice(0,2).toUpperCase()||"U"}function He({name:t="Co-Chat member",profile:e,photoURL:n,active:r=!1,className:s="avatar",label:i="Online"}){const o=(e==null?void 0:e.displayName)||t,l=(e==null?void 0:e.photoURL)||n,[u,c]=V.useState(!1);return V.useEffect(()=>c(!1),[l]),m.jsxs("span",{className:`${s}${r?" is-active":""}`,children:[l&&!u?m.jsx("img",{src:l,alt:`${o} profile`,referrerPolicy:"no-referrer",onError:()=>c(!0)}):cO(o),r&&m.jsx("i",{className:"active-dot","aria-label":i})]})}function Z_({uid:t,otherUid:e,otherName:n,otherPhotoURL:r,role:s,onClose:i}){const[o,l]=V.useState("Connecting…"),[u,c]=V.useState(!1),[f,p]=V.useState(""),[g,C]=V.useState(0),N=V.useRef(null),b=V.useRef(null),k=V.useRef(null),A=V.useRef(null);V.useEffect(()=>{if(!q||!t||!e){p("Voice calling is unavailable.");return}let E=!1,D,B,$;const w=new Set,_=[];let I=!1;return(async()=>{try{const T=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});if(E)return;b.current=T;const x=void 0,R=void 0,ye=void 0,fe=[{urls:"stun:stun.l.google.com:19302"}],le=new RTCPeerConnection({iceServers:fe});N.current=le,T.getTracks().forEach(de=>le.addTrack(de,T)),le.ontrack=de=>{A.current&&(A.current.srcObject=de.streams[0],A.current.play().catch(()=>{}))},le.onconnectionstatechange=()=>{le.connectionState==="connected"?($&&(window.clearTimeout($),$=void 0),l("Connected")):(le.connectionState==="disconnected"||le.connectionState==="failed")&&(l("Reconnecting…"),le.connectionState==="failed"&&"restartIce"in le&&le.restartIce())};let Te=[t,e].sort();const U=Te.join("_");k.current=U;const J=q;if(!J)throw new Error("Firestore is unavailable.");const H=ue(J,"calls",U),X=await it(H);X.exists()&&Array.isArray(X.data().memberIds)&&X.data().memberIds.length===2&&(Te=X.data().memberIds.map(String));const oe=X.exists()&&["ringing","connected"].includes(String(X.data().status||""))&&X.data().status==="ringing"&&X.data().calleeId===t,ee=s?s==="caller":!oe;if(ee){await Tr(H,{type:"audio",callerId:t,calleeId:e,memberIds:Te,status:"ringing",createdAt:Ae(),callerCandidates:[],calleeCandidates:[]}),B=window.setTimeout(()=>{!E&&q&&(Ce(H,{status:"missed",endedAt:Ae()}).catch(()=>{}),i())},45e3),le.onicecandidate=he=>{he.candidate&&Ce(H,{callerCandidates:lr(he.candidate.toJSON())}).catch(()=>{})};const de=await le.createOffer();await le.setLocalDescription(de),await Ce(H,{offer:{type:de.type,sdp:de.sdp}}),l("Calling…")}else le.onicecandidate=de=>{de.candidate&&Ce(H,{calleeCandidates:lr(de.candidate.toJSON())}).catch(()=>{})},l("Waiting for caller…");D=Gn(H,async de=>{const he=de.data();if(!he||E)return;if(he.status==="connected"&&B&&(window.clearTimeout(B),B=void 0),he.status==="ended"||he.status==="declined"||he.status==="missed"){l("Call ended"),i();return}if(!ee&&he.offer&&!le.currentRemoteDescription){await le.setRemoteDescription(he.offer),I=!0;for(const Sr of _.splice(0))await le.addIceCandidate(Sr).catch(()=>{});const $t=await le.createAnswer();await le.setLocalDescription($t),await Ce(H,{answer:{type:$t.type,sdp:$t.sdp},status:"connected"}),l("Connecting…")}if(ee&&he.answer&&!le.currentRemoteDescription){await le.setRemoteDescription(he.answer),I=!0;for(const $t of _.splice(0))await le.addIceCandidate($t).catch(()=>{})}const Ye=(ee?he.calleeCandidates:he.callerCandidates)||[];for(const $t of Ye){const Sr=JSON.stringify($t);w.has(Sr)||(w.add(Sr),I?await le.addIceCandidate($t).catch(()=>{}):_.push($t))}}),ee||(B=window.setTimeout(()=>{E||(l("Call timed out"),i())},45e3))}catch(T){const x=T instanceof DOMException?T.name:"";p(x==="NotAllowedError"?"Microphone permission was denied. Enable it in Android Settings.":x==="NotReadableError"?"Android granted permission, but no microphone input is available. Close other apps using the microphone and try again.":T instanceof Error?T.message:"Microphone permission or call setup failed.")}})(),()=>{var T,x;E=!0,B&&window.clearTimeout(B),$&&window.clearTimeout($),D==null||D(),(T=b.current)==null||T.getTracks().forEach(R=>R.stop()),(x=N.current)==null||x.close()}},[t,e,s]),V.useEffect(()=>{if(o!=="Connected")return;const E=window.setInterval(()=>C(D=>D+1),1e3);return()=>window.clearInterval(E)},[o]);const y=async()=>{var E,D;q&&k.current&&await Ce(ue(q,"calls",k.current),{status:"ended",endedAt:Ae()}).catch(()=>{}),(E=b.current)==null||E.getTracks().forEach(B=>B.stop()),(D=N.current)==null||D.close(),i()};return m.jsx("div",{className:"call-backdrop",children:m.jsxs("section",{className:"call-card",children:[m.jsx(He,{name:n,photoURL:r,className:"avatar large"}),m.jsx("p",{className:"eyebrow",children:"VOICE CALL"}),m.jsx("h2",{children:n}),m.jsx("p",{children:f||o}),o==="Connected"&&m.jsxs("strong",{className:"call-duration",children:[String(Math.floor(g/60)).padStart(2,"0"),":",String(g%60).padStart(2,"0")]}),m.jsx("audio",{ref:A,autoPlay:!0}),m.jsxs("div",{className:"call-actions",children:[m.jsx("button",{className:"secondary",onClick:()=>{var E;(E=b.current)==null||E.getAudioTracks().forEach(D=>{D.enabled=u}),c(D=>!D)},children:u?"Unmute":"Mute"}),m.jsx("button",{className:"danger",onClick:y,children:"End call"})]})]})})}const dO=60*60;function hO({uid:t,callId:e,groupName:n,memberIds:r,callerId:s,host:i,onClose:o}){const[l,u]=V.useState("Joining…"),[c,f]=V.useState(!1),[p,g]=V.useState(0),[C,N]=V.useState([t]),[b,k]=V.useState({}),A=V.useRef(null),y=V.useRef({}),E=V.useRef({}),D=V.useRef(Date.now()),B=V.useRef(void 0),$=V.useRef(!1),[w,_]=V.useState(""),I=V.useMemo(()=>C.filter(T=>T!==t),[C,t]);V.useEffect(()=>{let T;return(async()=>{if(!q){_("Voice calling is unavailable.");return}try{const R=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});if($.current)return;A.current=R;const ye=ue(q,"calls",e);await Ce(ye,{joinedIds:lr(t)}),T=Gn(ye,fe=>{var J,H;const le=fe.data();if(!le)return;if(le.status==="ended"){u("Call ended"),o();return}const Te=(H=(J=le.createdAt)==null?void 0:J.toMillis)==null?void 0:H.call(J);if(Te){D.current=Te;const X=Math.max(0,Te+dO*1e3-Date.now());if(X===0){Ce(ye,{status:"ended",endedAt:Ae()}).catch(()=>{}),u("One-hour limit reached"),o();return}B.current&&window.clearTimeout(B.current),B.current=window.setTimeout(()=>{Ce(ye,{status:"ended",endedAt:Ae()}).catch(()=>{}),u("One-hour limit reached"),o()},X)}const U=Array.isArray(le.joinedIds)?le.joinedIds.map(String):[];N(U.includes(t)?U:[...U,t]),u(U.length>1?"Connected":"Waiting for others…")})}catch(R){const ye=R instanceof DOMException?R.name:"";_(ye==="NotAllowedError"?"Microphone permission was denied. Enable it in Android Settings.":ye==="NotReadableError"?"Android granted permission, but no microphone input is available. Close other apps using the microphone and try again.":R instanceof Error?R.message:"Microphone permission is required.")}})(),()=>{var R;$.current=!0,T==null||T(),B.current&&window.clearTimeout(B.current),(R=A.current)==null||R.getTracks().forEach(ye=>ye.stop()),Object.values(y.current).forEach(ye=>ye.peer.close())}},[e,t,o]),V.useEffect(()=>{const T=[...new Set([...r,...C])];Promise.all(T.map(async x=>[x,await Mn(x)])).then(x=>k(R=>({...R,...Object.fromEntries(x.filter(ye=>!!ye[1]))})))},[r,C,t]),V.useEffect(()=>{if(!q||!A.current)return;const T=[{urls:"stun:stun.l.google.com:19302"}],x=[],R=async fe=>{var X;if(!q||$.current||y.current[fe]||t>fe)return;const le=[t,fe].sort().join("_"),Te=ue(q,"calls",e,"peers",le),U={peer:new RTCPeerConnection({iceServers:T}),remoteReady:!1,pending:[],seen:new Set};y.current[fe]=U,(X=A.current)==null||X.getTracks().forEach(re=>U.peer.addTrack(re,A.current)),U.peer.ontrack=re=>{const oe=E.current[fe];oe&&!oe.srcObject&&(oe.srcObject=re.streams[0],oe.play().catch(()=>{}))},U.peer.onicecandidate=re=>{re.candidate&&Ce(Te,{offerCandidates:lr(re.candidate.toJSON())}).catch(()=>{})};const J=await U.peer.createOffer();await U.peer.setLocalDescription(J),await Tr(Te,{offer:{type:J.type,sdp:J.sdp},offerCandidates:[],answerCandidates:[],updatedAt:Ae()},{merge:!0});const H=Gn(Te,async re=>{const oe=re.data();if(!(!oe||$.current)){if(oe.answer&&!U.peer.currentRemoteDescription){await U.peer.setRemoteDescription(oe.answer),U.remoteReady=!0;for(const ee of U.pending.splice(0))await U.peer.addIceCandidate(ee).catch(()=>{})}for(const ee of oe.answerCandidates||[]){const de=JSON.stringify(ee);U.seen.has(de)||(U.seen.add(de),U.remoteReady?await U.peer.addIceCandidate(ee).catch(()=>{}):U.pending.push(ee))}}});x.push(H)};I.forEach(fe=>{t<fe&&R(fe)});const ye=I.filter(fe=>t>fe).map(fe=>{var J;const le=[t,fe].sort().join("_"),Te=ue(q,"calls",e,"peers",le),U={peer:new RTCPeerConnection({iceServers:T}),remoteReady:!1,pending:[],seen:new Set};return y.current[fe]=U,(J=A.current)==null||J.getTracks().forEach(H=>U.peer.addTrack(H,A.current)),U.peer.ontrack=H=>{const X=E.current[fe];X&&!X.srcObject&&(X.srcObject=H.streams[0],X.play().catch(()=>{}))},U.peer.onicecandidate=H=>{H.candidate&&Ce(Te,{answerCandidates:lr(H.candidate.toJSON())}).catch(()=>{})},Gn(Te,async H=>{const X=H.data();if(!X||$.current||!X.offer||U.peer.currentRemoteDescription)return;await U.peer.setRemoteDescription(X.offer),U.remoteReady=!0;const re=await U.peer.createAnswer();await U.peer.setLocalDescription(re),await Ce(Te,{answer:{type:re.type,sdp:re.sdp}});for(const oe of X.offerCandidates||[])await U.peer.addIceCandidate(oe).catch(()=>{})})});return()=>{x.forEach(fe=>fe()),ye.forEach(fe=>fe())}},[e,t,I.join("|")]),V.useEffect(()=>{if(l!=="Connected")return;const T=window.setInterval(()=>g(Math.max(0,Math.floor((Date.now()-D.current)/1e3))),1e3);return()=>window.clearInterval(T)},[l]);const P=async T=>{if(q){const x=ue(q,"calls",e);T?await Ce(x,{status:"ended",endedAt:Ae()}).catch(()=>{}):await Ce(x,{joinedIds:Ab(t),leftIds:lr(t)}).catch(()=>{})}o()};return m.jsxs("div",{className:"group-call-page",children:[m.jsxs("header",{children:[m.jsx("div",{className:"avatar large",children:n.slice(0,2).toUpperCase()}),m.jsxs("div",{children:[m.jsx("p",{className:"eyebrow",children:"GROUP VOICE CALL"}),m.jsx("h1",{children:n}),m.jsxs("strong",{children:[C.length," member",C.length===1?"":"s"," joined"]})]})]}),m.jsx("p",{className:"group-call-status",children:w||l}),l==="Connected"&&m.jsxs("strong",{className:"call-duration",children:[String(Math.floor(p/60)).padStart(2,"0"),":",String(p%60).padStart(2,"0")]}),m.jsx("div",{className:"group-call-members",children:C.map(T=>{var x;return m.jsxs("div",{className:"group-call-member",children:[m.jsx(He,{profile:b[T],name:T===t?"You":"Member"}),m.jsx("span",{children:T===t?"You":((x=b[T])==null?void 0:x.displayName)||"Member"}),T===s&&m.jsx("small",{children:"Host"}),m.jsx("audio",{ref:R=>{E.current[T]=R},autoPlay:!0})]},T)})}),m.jsxs("div",{className:"call-actions",children:[m.jsx("button",{className:"secondary",onClick:()=>{var T;(T=A.current)==null||T.getAudioTracks().forEach(x=>{x.enabled=c}),f(x=>!x)},children:c?"Unmute":"Mute"}),m.jsx("button",{className:"danger",onClick:()=>P(i),children:i?"End call":"Leave call"})]})]})}/*! Capacitor: https://capacitorjs.com/ - MIT License */const fO=t=>{const e=new Map;e.set("web",{name:"web"});const n=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},r=(i,o)=>{n.platforms.set(i,o)},s=i=>{n.platforms.has(i)&&(n.currentPlatform=n.platforms.get(i))};return n.addPlatform=r,n.setPlatform=s,n},pO=t=>t.CapacitorPlatforms=fO(t),u0=pO(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});u0.addPlatform;u0.setPlatform;var ho;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(ho||(ho={}));class Eh extends Error{constructor(e,n,r){super(e),this.message=e,this.code=n,this.data=r}}const mO=t=>{var e,n;return t!=null&&t.androidBridge?"android":!((n=(e=t==null?void 0:t.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},gO=t=>{var e,n,r,s,i;const o=t.CapacitorCustomPlatform||null,l=t.Capacitor||{},u=l.Plugins=l.Plugins||{},c=t.CapacitorPlatforms,f=()=>o!==null?o.name:mO(t),p=((e=c==null?void 0:c.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||f,g=()=>p()!=="web",C=((n=c==null?void 0:c.currentPlatform)===null||n===void 0?void 0:n.isNativePlatform)||g,N=w=>{const _=D.get(w);return!!(_!=null&&_.platforms.has(p())||A(w))},b=((r=c==null?void 0:c.currentPlatform)===null||r===void 0?void 0:r.isPluginAvailable)||N,k=w=>{var _;return(_=l.PluginHeaders)===null||_===void 0?void 0:_.find(I=>I.name===w)},A=((s=c==null?void 0:c.currentPlatform)===null||s===void 0?void 0:s.getPluginHeader)||k,y=w=>t.console.error(w),E=(w,_,I)=>Promise.reject(`${I} does not have an implementation of "${_}".`),D=new Map,B=(w,_={})=>{const I=D.get(w);if(I)return console.warn(`Capacitor plugin "${w}" already registered. Cannot register plugins twice.`),I.proxy;const P=p(),T=A(w);let x;const R=async()=>(!x&&P in _?x=typeof _[P]=="function"?x=await _[P]():x=_[P]:o!==null&&!x&&"web"in _&&(x=typeof _.web=="function"?x=await _.web():x=_.web),x),ye=(H,X)=>{var re,oe;if(T){const ee=T==null?void 0:T.methods.find(de=>X===de.name);if(ee)return ee.rtype==="promise"?de=>l.nativePromise(w,X.toString(),de):(de,he)=>l.nativeCallback(w,X.toString(),de,he);if(H)return(re=H[X])===null||re===void 0?void 0:re.bind(H)}else{if(H)return(oe=H[X])===null||oe===void 0?void 0:oe.bind(H);throw new Eh(`"${w}" plugin is not implemented on ${P}`,ho.Unimplemented)}},fe=H=>{let X;const re=(...oe)=>{const ee=R().then(de=>{const he=ye(de,H);if(he){const Ye=he(...oe);return X=Ye==null?void 0:Ye.remove,Ye}else throw new Eh(`"${w}.${H}()" is not implemented on ${P}`,ho.Unimplemented)});return H==="addListener"&&(ee.remove=async()=>X()),ee};return re.toString=()=>`${H.toString()}() { [capacitor code] }`,Object.defineProperty(re,"name",{value:H,writable:!1,configurable:!1}),re},le=fe("addListener"),Te=fe("removeListener"),U=(H,X)=>{const re=le({eventName:H},X),oe=async()=>{const de=await re;Te({eventName:H,callbackId:de},X)},ee=new Promise(de=>re.then(()=>de({remove:oe})));return ee.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await oe()},ee},J=new Proxy({},{get(H,X){switch(X){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return T?U:le;case"removeListener":return Te;default:return fe(X)}}});return u[w]=J,D.set(w,{name:w,proxy:J,platforms:new Set([...Object.keys(_),...T?[P]:[]])}),J},$=((i=c==null?void 0:c.currentPlatform)===null||i===void 0?void 0:i.registerPlugin)||B;return l.convertFileSrc||(l.convertFileSrc=w=>w),l.getPlatform=p,l.handleError=y,l.isNativePlatform=C,l.isPluginAvailable=b,l.pluginMethodNoop=E,l.registerPlugin=$,l.Exception=Eh,l.DEBUG=!!l.DEBUG,l.isLoggingEnabled=!!l.isLoggingEnabled,l.platform=l.getPlatform(),l.isNative=l.isNativePlatform(),l},yO=t=>t.Capacitor=gO(t),Bn=yO(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),qm=Bn.registerPlugin;Bn.Plugins;class c0{constructor(e){this.listeners={},this.retainedEventArguments={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,n){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(n);const i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i),r&&this.sendRetainedArgumentsForEvent(e);const o=async()=>this.removeListener(e,n);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,n,r){const s=this.listeners[e];if(!s){if(r){let i=this.retainedEventArguments[e];i||(i=[]),i.push(n),this.retainedEventArguments[e]=i}return}s.forEach(i=>i(n))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,n){this.windowListeners[n]={registered:!1,windowEventName:e,pluginEventName:n,handler:r=>{this.notifyListeners(n,r)}}}unimplemented(e="not implemented"){return new Bn.Exception(e,ho.Unimplemented)}unavailable(e="not available"){return new Bn.Exception(e,ho.Unavailable)}async removeListener(e,n){const r=this.listeners[e];if(!r)return;const s=r.indexOf(n);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const n=this.retainedEventArguments[e];n&&(delete this.retainedEventArguments[e],n.forEach(r=>{this.notifyListeners(e,r)}))}}const ev=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),tv=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class _O extends c0{async getCookies(){const e=document.cookie,n={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[s,i]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=tv(s).trim(),i=tv(i).trim(),n[s]=i}),n}async setCookie(e){try{const n=ev(e.key),r=ev(e.value),s=`; expires=${(e.expires||"").replace("expires=","")}`,i=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${n}=${r||""}${s}; path=${i}; ${o};`}catch(n){return Promise.reject(n)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const n of e)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}qm("CapacitorCookies",{web:()=>new _O});const vO=async t=>new Promise((e,n)=>{const r=new FileReader;r.onload=()=>{const s=r.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>n(s),r.readAsDataURL(t)}),wO=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(s=>s.toLocaleLowerCase()).reduce((s,i,o)=>(s[i]=t[e[o]],s),{})},EO=(t,e=!0)=>t?Object.entries(t).reduce((r,s)=>{const[i,o]=s;let l,u;return Array.isArray(o)?(u="",o.forEach(c=>{l=e?encodeURIComponent(c):c,u+=`${i}=${l}&`}),u.slice(0,-1)):(l=e?encodeURIComponent(o):o,u=`${i}=${l}`),`${r}&${u}`},"").substr(1):null,IO=(t,e={})=>{const n=Object.assign({method:t.method||"GET",headers:t.headers},e),s=wO(t.headers)["content-type"]||"";if(typeof t.data=="string")n.body=t.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[o,l]of Object.entries(t.data||{}))i.set(o,l);n.body=i.toString()}else if(s.includes("multipart/form-data")||t.data instanceof FormData){const i=new FormData;if(t.data instanceof FormData)t.data.forEach((l,u)=>{i.append(u,l)});else for(const l of Object.keys(t.data))i.append(l,t.data[l]);n.body=i;const o=new Headers(n.headers);o.delete("content-type"),n.headers=o}else(s.includes("application/json")||typeof t.data=="object")&&(n.body=JSON.stringify(t.data));return n};class TO extends c0{async request(e){const n=IO(e,e.webFetchExtra),r=EO(e.params,e.shouldEncodeUrlParams),s=r?`${e.url}?${r}`:e.url,i=await fetch(s,n),o=i.headers.get("content-type")||"";let{responseType:l="text"}=i.ok?e:{};o.includes("application/json")&&(l="json");let u,c;switch(l){case"arraybuffer":case"blob":c=await i.blob(),u=await vO(c);break;case"json":u=await i.json();break;case"document":case"text":default:u=await i.text()}const f={};return i.headers.forEach((p,g)=>{f[g]=p}),{data:u,headers:f,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}qm("CapacitorHttp",{web:()=>new TO});const SO="modulepreload",AO=function(t,e){return new URL(t,e).href},nv={},RO=function(e,n,r){let s=Promise.resolve();if(n&&n.length>0){const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),u=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=Promise.allSettled(n.map(c=>{if(c=AO(c,r),c in nv)return;nv[c]=!0;const f=c.endsWith(".css"),p=f?'[rel="stylesheet"]':"";if(!!r)for(let N=o.length-1;N>=0;N--){const b=o[N];if(b.href===c&&(!f||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${p}`))return;const C=document.createElement("link");if(C.rel=f?"stylesheet":SO,f||(C.as="script"),C.crossOrigin="",C.href=c,u&&C.setAttribute("nonce",u),document.head.appendChild(C),f)return new Promise((N,b)=>{C.addEventListener("load",N),C.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})};var rv;(function(t){t.IndexedDbLocal="INDEXED_DB_LOCAL",t.InMemory="IN_MEMORY",t.BrowserLocal="BROWSER_LOCAL",t.BrowserSession="BROWSER_SESSION"})(rv||(rv={}));var sv;(function(t){t.APPLE="apple.com",t.FACEBOOK="facebook.com",t.GAME_CENTER="gc.apple.com",t.GITHUB="github.com",t.GOOGLE="google.com",t.MICROSOFT="microsoft.com",t.PLAY_GAMES="playgames.google.com",t.TWITTER="twitter.com",t.YAHOO="yahoo.com",t.PASSWORD="password",t.PHONE="phone"})(sv||(sv={}));const d0=qm("FirebaseAuthentication",{web:()=>RO(()=>import("./web-DVxln-cg.js"),[],import.meta.url).then(t=>new t.FirebaseAuthenticationWeb)}),CO=[{id:"preview-maya",name:"Maya Patel",avatar:"MP",memberIds:[],lastMessage:"That sounds perfect — see you there!"},{id:"preview-design",name:"Design Crew",avatar:"DC",memberIds:[],lastMessage:"Leo: I added the final screens."},{id:"preview-jordan",name:"Jordan Kim",avatar:"JK",memberIds:[],lastMessage:"Thanks for sharing that!"}],kO={"preview-maya":[{id:"1",senderId:"them",text:"Are we still on for coffee this afternoon?"},{id:"2",senderId:"me",text:"Absolutely! I’ll be there at 4."},{id:"3",senderId:"them",text:"That sounds perfect — see you there!"}],"preview-design":[{id:"4",senderId:"them",text:"I added the final screens. What do you think?"}],"preview-jordan":[{id:"5",senderId:"them",text:"Thanks for sharing that!"}]},xc=t=>t.split(/\s+/).map(e=>e[0]).join("").slice(0,2).toUpperCase()||"U",PO=t=>t!=null&&t.toDate?t.toDate().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",NO=(t,e)=>{var l;if(t)return"Active now";const n=((l=e==null?void 0:e.toMillis)==null?void 0:l.call(e))||0;if(!n)return"Offline";const r=Math.max(1,Math.floor((Date.now()-n)/6e4));if(r<60)return`${r} minute${r===1?"":"s"} ago`;const s=Math.floor(r/60);if(s<24)return`${s} hour${s===1?"":"s"} ago`;const i=Math.floor(s/24);if(i<7)return`${i} day${i===1?"":"s"} ago`;const o=Math.floor(i/7);return`${o} week${o===1?"":"s"} ago`},Ih=t=>{var o;const e=((o=t==null?void 0:t.toMillis)==null?void 0:o.call(t))||0;if(!e)return"just now";const n=Math.floor((Date.now()-e)/6e4);if(n<1)return"just now";if(n<60)return`${n} minute${n===1?"":"s"} ago`;const r=Math.floor(n/60);if(r<24)return`${r} hour${r===1?"":"s"} ago`;const s=Math.floor(r/24);if(s<7)return`${s} day${s===1?"":"s"} ago`;const i=Math.floor(s/7);return`${i} week${i===1?"":"s"} ago`};function xO({onPreview:t}){const[e,n]=V.useState("signin"),[r,s]=V.useState(""),i=async l=>{if(l.preventDefault(),!ze)return;s("");const u=new FormData(l.currentTarget);try{if(e==="signup"){const c=await Uk(ze,String(u.get("email")),String(u.get("password")));await tI(c.user,{displayName:String(u.get("name"))})}else await Fk(ze,String(u.get("email")),String(u.get("password")))}catch(c){s(c instanceof Error?c.message.replace("Firebase: ","").replace(/ \(auth\/[^)]+\)\.?$/,""):"Unable to sign in.")}},o=async()=>{if(ze){s("");try{if(Bn.isNativePlatform()&&Bn.getPlatform()==="android"){const c=(await d0.signInWithGoogle()).credential;if(!(c!=null&&c.idToken))throw new Error("Google sign-in did not return an ID token.");await rd(ze,Un.credential(c.idToken,c.accessToken))}else await NP(ze,BD)}catch(l){s(l instanceof Error?l.message.replace("Firebase: ",""):"Google sign-in failed.")}}};return m.jsx("main",{className:"auth",children:m.jsxs("section",{className:"auth-card",children:[m.jsx("div",{className:"brand-mark",children:"C"}),m.jsx("h1",{children:"Co Chat"}),m.jsx("p",{children:"Chat bright. Feel right."}),$m?m.jsxs(m.Fragment,{children:[m.jsxs("div",{className:"auth-tabs",children:[m.jsx("button",{className:e==="signin"?"active":"",onClick:()=>n("signin"),children:"Sign in"}),m.jsx("button",{className:e==="signup"?"active":"",onClick:()=>n("signup"),children:"Create account"})]}),m.jsxs("form",{onSubmit:i,children:[e==="signup"&&m.jsxs("label",{children:["Display name",m.jsx("input",{name:"name",required:!0,placeholder:"Your name"})]}),m.jsxs("label",{children:["Email",m.jsx("input",{name:"email",type:"email",required:!0,placeholder:"you@example.com"})]}),m.jsxs("label",{children:["Password",m.jsx("input",{name:"password",type:"password",minLength:6,required:!0,placeholder:"At least 6 characters"})]}),r&&m.jsx("p",{className:"error-text",children:r}),m.jsx("button",{className:"primary",children:e==="signin"?"Sign in":"Create account"})]}),m.jsx("button",{className:"google-button",onClick:o,children:"Continue with Google"}),m.jsx("small",{children:"Your account syncs securely across devices."})]}):m.jsx(m.Fragment,{children:m.jsxs("div",{className:"hero-card",children:[m.jsx("h2",{children:"Preview mode"}),m.jsx("p",{children:"Firebase is not configured in this build. Explore the full interface locally, then add your project keys to enable accounts."}),m.jsx("button",{className:"secondary",onClick:t,children:"Continue preview"})]})})]})})}function bO({page:t,setPage:e}){return m.jsx("nav",{className:"bottom-nav",children:[["chats","💬","Chats"],["communities","👥","Communities"],["discover","⌕","Discover"],["settings","⚙","Settings"]].map(([n,r,s])=>m.jsxs("button",{type:"button",className:t===n?"active":"",onClick:()=>e(n),children:[m.jsx("span",{children:r}),s]},n))})}function DO({user:t,onComplete:e}){const[n,r]=V.useState(""),[s,i]=V.useState(t.displayName||""),[o,l]=V.useState(""),[u,c]=V.useState(!1),f=async p=>{p.preventDefault(),c(!0),l("");try{await l0(t.uid,{displayName:s,username:n,bio:"",notificationsEnabled:!0,discoverable:!0}),e(n.trim().toLowerCase(),s.trim())}catch(g){l(g instanceof Error?g.message:"Could not save your profile.")}finally{c(!1)}};return m.jsx("main",{className:"auth",children:m.jsxs("section",{className:"auth-card",children:[m.jsx("div",{className:"brand-mark",children:"C"}),m.jsx("h1",{children:"Set up your profile"}),m.jsx("p",{children:"Choose a unique username so people can find you on Co-Chat."}),m.jsxs("form",{onSubmit:f,children:[m.jsxs("label",{children:["Display name",m.jsx("input",{value:s,onChange:p=>i(p.target.value),placeholder:"Your name",required:!0})]}),m.jsxs("label",{children:["Username",m.jsx("input",{value:n,onChange:p=>r(p.target.value.replace(/[^a-zA-Z0-9_]/g,"").toLowerCase()),placeholder:"your_username",minLength:3,maxLength:24,pattern:"[a-z0-9_]+",required:!0})]}),o&&m.jsx("p",{className:"error-text",children:o}),m.jsx("button",{type:"submit",className:"primary",disabled:u,children:u?"Saving…":"Continue"})]})]})})}function OO(){var Bl;const[t,e]=V.useState(null),[n,r]=V.useState(!1),[s,i]=V.useState($m),[o,l]=V.useState(!1),[u,c]=V.useState("caller"),[f,p]=V.useState(null),[g,C]=V.useState("chats"),[N,b]=V.useState(CO),[k,A]=V.useState(null),[y,E]=V.useState([]),[D,B]=V.useState(""),[$,w]=V.useState(null),[_,I]=V.useState(""),[P,T]=V.useState(""),[x,R]=V.useState(!1),[ye,fe]=V.useState(!1),[le,Te]=V.useState(!1),[U,J]=V.useState({}),[H,X]=V.useState(null),[re,oe]=V.useState([]),[ee,de]=V.useState(null),[he,Ye]=V.useState(null),[$t,Sr]=V.useState([]),[ko,Po]=V.useState(null),[ni,No]=V.useState([]),[kl,Pl]=V.useState(""),[Nn,ri]=V.useState(""),[si,ps]=V.useState(""),[xo,Nl]=V.useState(""),[Pd,bo]=V.useState(!0),[Do,xl]=V.useState(!0),[lt,ut]=V.useState(!1),[ms,bl]=V.useState(!1),[ii,Dl]=V.useState([]),[xn,bn]=V.useState(!1),[oi,gs]=V.useState([]),[Ol,Oo]=V.useState([]),[ys,ai]=V.useState([]),[Ar,Rr]=V.useState(""),[li,ui]=V.useState(!1),[yn,Lo]=V.useState(""),[zt,Jn]=V.useState(null),[_s,Ll]=V.useState(!1),[Xe,vs]=V.useState(null),[_n,Cr]=V.useState(()=>localStorage.getItem("cochat-theme")!=="light"),[Vl,Ml]=V.useState(!1),[Zn,jl]=V.useState(null),[kr,vn]=V.useState(null),[ci,ws]=V.useState(null),Pr=V.useRef({}),ln=V.useRef(!1),[Vo,Mo]=V.useState("Incoming caller"),[di,jo]=V.useState(),[Dn,Uo]=V.useState(!0),[Wm,Es]=V.useState([]),[hi,fi]=V.useState(()=>Date.now()),O=n?{uid:"preview",displayName:"Preview user",email:"preview@cochat.local"}:t;V.useEffect(()=>{if(!ze){i(!1);return}let S=!1;const F=()=>{S||(S=!0,i(!1))},K=Yk(ze,Pe=>{e(Pe),F()},()=>{T("Could not connect to authentication. Please try again."),F()}),Re=window.setTimeout(F,1e4);return()=>{window.clearTimeout(Re),K()}},[]),V.useEffect(()=>{document.documentElement.classList.toggle("dark",_n),localStorage.setItem("cochat-theme",_n?"dark":"light"),Vl&&Zn===(O==null?void 0:O.uid)&&O&&O.uid!=="preview"&&ZD(O.uid,_n?"dark":"light").catch(()=>{})},[_n,Vl,Zn,O==null?void 0:O.uid]),V.useEffect(()=>{if(!O||O.uid==="preview")return;const S=O.uid;Ml(!1),jl(null);const F=Bn.isNativePlatform()&&Bn.getPlatform()==="android";qD(S,{displayName:O.displayName||"",email:O.email||"",photoURL:O.photoURL||""}).then(K=>Mn(S).then(Re=>({profile:Re,profileCreatedOrNeedsSetup:K}))).then(({profile:K,profileCreatedOrNeedsSetup:Re})=>{ri((K==null?void 0:K.displayName)||O.displayName||""),ps((K==null?void 0:K.username)||""),Nl((K==null?void 0:K.bio)||""),K!=null&&K.theme&&Cr(K.theme==="dark"),Ml(!0),jl(S),Te(F?Re:!localStorage.getItem(`cochat-username-${S}`)),bo((K==null?void 0:K.notificationsEnabled)!==!1),xl((K==null?void 0:K.discoverable)!==!1),Uo((K==null?void 0:K.activeStatus)!==!1),zm(S).then(Pe=>Es(Pe.map(Se=>Se.blockedId))).catch(()=>{})}).catch(()=>T("Could not load your profile."))},[O==null?void 0:O.uid]),V.useEffect(()=>{if(!O||O.uid==="preview")return;const S=O.uid;return WD(S,F=>b(F))},[O==null?void 0:O.uid]),V.useEffect(()=>{if(!(!O||O.uid==="preview"))return o0(O.uid,S=>{const F=S.filter(K=>K.toUid===O.uid&&K.status==="pending").map(K=>K.id);Dl(F)})},[O==null?void 0:O.uid]),V.useEffect(()=>{const S=window.setInterval(()=>fi(Date.now()),3e4);return()=>window.clearInterval(S)},[]),V.useEffect(()=>{if(!k||k.id.startsWith("preview-")||!O||O.uid==="preview"){E(k?JSON.parse(localStorage.getItem(`cochat-preview-${k.id}`)||"null")||kO[k.id]||[]:[]);return}return HD(k.id,O.uid,E)},[k==null?void 0:k.id,O==null?void 0:O.uid]),V.useEffect(()=>{if(!O||!y.length)return;const S=[...new Set(y.map(F=>F.senderId).filter(F=>F!=="me"&&F!=="them"&&F!==O.uid))];Promise.all(S.map(async F=>{const K=await Mn(F);return[F,(K==null?void 0:K.displayName)||(K==null?void 0:K.username)||F]})).then(F=>J(K=>Object.fromEntries([...Object.entries(K),...F])))},[y,O==null?void 0:O.uid]),V.useEffect(()=>{if(!O||O.uid==="preview")return oO(oe)},[O==null?void 0:O.uid]),V.useEffect(()=>{if(!O||O.uid==="preview")return;const S=O.uid;return aO(S,No)},[O==null?void 0:O.uid]),V.useEffect(()=>{const S=ni.find(F=>{var K;return F.status==="ringing"&&F.memberIds.includes((O==null?void 0:O.uid)||"")&&F.callerId!==(O==null?void 0:O.uid)&&(F.groupId?!((K=F.leftIds)!=null&&K.includes((O==null?void 0:O.uid)||""))&&!$t.includes(F.id)&&(he==null?void 0:he.id)!==F.id&&(!F.createdAt||Date.now()-F.createdAt.toMillis()<36e5):F.calleeId===(O==null?void 0:O.uid))});de(S||null)},[ni,O==null?void 0:O.uid,$t,he==null?void 0:he.id]),V.useEffect(()=>{ee!=null&&ee.callerId&&(ee.groupId||Mn(ee.callerId).then(S=>{Mo((S==null?void 0:S.displayName)||"Incoming caller"),jo((S==null?void 0:S.photoURL)||void 0)}).catch(()=>Mo("Incoming caller")))},[ee==null?void 0:ee.callerId]),V.useEffect(()=>{const S=window.requestAnimationFrame(()=>{const F=document.querySelector(".messages");F&&(F.scrollTop=F.scrollHeight,window.setTimeout(()=>{F.scrollTop=F.scrollHeight},50))});return()=>window.cancelAnimationFrame(S)},[y,k==null?void 0:k.id]),V.useEffect(()=>{if(!O||O.uid==="preview")return;X_(O.uid,Dn).catch(()=>{});const S=window.setInterval(()=>X_(O.uid,Dn).catch(()=>{}),3e4);return()=>window.clearInterval(S)},[O==null?void 0:O.uid,Dn]),V.useEffect(()=>{if(!zt&&!Xe)return;const S=F=>{F.target.closest(".message-menu,.forward-panel")||(Jn(null),vs(null))};return document.addEventListener("click",S),()=>document.removeEventListener("click",S)},[zt,Xe]),V.useEffect(()=>{!O||!k||k.type!=="group"||(Lo(k.name),Promise.all(k.memberIds.map(S=>Mn(S))).then(S=>gs(S.filter(F=>!!F))))},[xn,k==null?void 0:k.id,k==null?void 0:k.type]),V.useEffect(()=>{!O||!xn||!k||k.type!=="group"||Wu(O.uid).then(Oo).catch(()=>Oo([]))},[xn,k==null?void 0:k.id,k==null?void 0:k.type,O==null?void 0:O.uid]),V.useEffect(()=>{if(!O||O.uid==="preview")return;Wu(O.uid).then(ai).catch(()=>ai([]));const S=window.setInterval(()=>{fi(Date.now()),Wu(O.uid).then(ai).catch(()=>{})},3e4);return()=>window.clearInterval(S)},[O==null?void 0:O.uid]),V.useEffect(()=>{bn(!1),ui(!1),Rr("")},[k==null?void 0:k.id]),V.useEffect(()=>{if(!kr)return;const S=F=>{F.target.closest(".conversation-menu,.chat-row")||vn(null)};return document.addEventListener("click",S),()=>document.removeEventListener("click",S)},[kr]),V.useEffect(()=>{const S=F=>{if(!F.target.closest(".chat-profile-menu .danger-text")||!k||!O||O.uid==="preview"||k.memberIds.length!==2)return;const Re=k.memberIds.find(Pe=>Pe!==O.uid);Re&&(F.preventDefault(),$D(O.uid,Re).then(()=>{Es(Pe=>Pe.includes(Re)?Pe:[...Pe,Re]),bn(!1),A(null),T("User blocked. You can unblock them from Profile settings.")}).catch(()=>T("Could not block this user.")))};return document.addEventListener("click",S,!0),()=>document.removeEventListener("click",S,!0)},[k,O==null?void 0:O.uid]),V.useEffect(()=>{const S=F=>{var Pe;const K=F.target;if(((Pe=K.textContent)==null?void 0:Pe.trim())!=="View profile"||!K.closest(".chat-profile-menu")||!k||!O||k.memberIds.length!==2)return;const Re=k.memberIds.find(Se=>Se!==O.uid);Re&&(F.preventDefault(),Mn(Re).then(Se=>T(Se?`${Se.displayName} · @${Se.username||"user"}${Se.bio?` — ${Se.bio}`:""}`:"Profile unavailable.")).catch(()=>T("Profile unavailable.")))};return document.addEventListener("click",S,!0),()=>document.removeEventListener("click",S,!0)},[k,O==null?void 0:O.uid]),V.useEffect(()=>{!k||!O||O.uid==="preview"||k.id.startsWith("preview-")||YD(k.id,O.uid).catch(()=>{})},[k==null?void 0:k.id,O==null?void 0:O.uid,y.length]);const On=V.useMemo(()=>N.filter(S=>`${S.name} ${S.lastMessage||""}`.toLowerCase().includes(_.toLowerCase())),[N,_]),pi=V.useMemo(()=>(O==null?void 0:O.uid)==="preview"?N.filter(S=>S.type!=="group"&&S.active).slice(0,8):ys.filter(S=>{var F;return S.activeStatus!==!1&&hi-(((F=S.lastSeen)==null?void 0:F.toMillis())||0)<9e4}).map(S=>({id:S.uid,name:S.displayName,memberIds:[(O==null?void 0:O.uid)||"",S.uid],avatar:xc(S.displayName),photoURL:S.photoURL||"",lastMessage:"",type:"direct",active:!0,lastSeen:S.lastSeen})).slice(0,8),[N,ys,O==null?void 0:O.uid,hi]),Nd=V.useCallback(()=>Ye(null),[]);if(s)return m.jsx("main",{className:"auth",children:m.jsxs("section",{className:"auth-card",children:[m.jsx("div",{className:"brand-mark",children:"C"}),m.jsx("h1",{children:"Co Chat"}),m.jsx("p",{children:"Connecting your account…"})]})});if(!O)return m.jsx(xO,{onPreview:()=>r(!0)});if(le&&!n)return m.jsx(DO,{user:O,onComplete:(S,F)=>{localStorage.setItem(`cochat-username-${O.uid}`,S),ps(S),ri(F),Te(!1)}});const Ul=async S=>{if(S.preventDefault(),!D.trim()&&!$||!k)return;const F=D.trim(),K=$;if(F.length>2e3){T("Messages must be 2,000 characters or fewer.");return}B(""),w(null);const Re=H;if(X(null),k.id.startsWith("preview-")){E(Pe=>{const Se=[...Pe,{id:String(Date.now()),senderId:"me",text:F||(K==null?void 0:K.name)||"",replyTo:Re?{id:Re.id,text:Re.text,senderId:Re.senderId}:null,attachment:K?{name:K.name,url:URL.createObjectURL(K),type:K.type,size:K.size}:null}];return localStorage.setItem(`cochat-preview-${k.id}`,JSON.stringify(Se)),Se});return}try{await Y_(k.id,O.uid,F,K||void 0,Re)}catch(Pe){T(Pe instanceof Error?Pe.message:"Message could not be sent. Check your connection.")}},Is=async S=>{try{const F=await eO(O.uid,S);if(!F)throw new Error("Firebase is not configured.");R(!1),I(""),C("chats"),A({id:F,name:S.displayName,avatar:xc(S.displayName),memberIds:[O.uid,S.uid],lastMessage:""})}catch(F){T(F instanceof Error?F.message.replace("Firebase: ",""):"Could not create that conversation.")}},Fl=async()=>{try{!n&&Bn.isNativePlatform()&&Bn.getPlatform()==="android"&&await d0.signOut().catch(()=>{}),ze&&!n&&await Xk(ze),r(!1),e(null),A(null),C("chats")}catch{T("Could not sign out. Please try again.")}},Fo=async S=>{if(S.preventDefault(),!n)try{await l0(O.uid,{displayName:Nn,username:si,bio:xo,notificationsEnabled:Pd,discoverable:Do,activeStatus:Dn}),await tI(O,{displayName:Nn}),localStorage.setItem(`cochat-username-${O.uid}`,si.trim().toLowerCase()),ri(Nn.trim()),ps(si.trim().toLowerCase()),ut(!0),T(""),setTimeout(()=>ut(!1),2e3)}catch(F){T(F instanceof Error?F.message:"Profile could not be saved.")}},mi=async()=>{ee&&(ee.groupId?(Sr(S=>S.includes(ee.id)?S:[...S,ee.id]),de(null)):(await uO(ee.id).catch(()=>{}),de(null)))},Bo=async()=>{if(!ee||!O)return;if(ee.groupId){Ye({id:ee.id,name:ee.groupName||"Group voice call",memberIds:ee.memberIds,callerId:ee.callerId||"",host:!1}),de(null);return}const S=ee.callerId?await Mn(ee.callerId):null;p({id:ee.id,name:(S==null?void 0:S.displayName)||"Incoming caller",photoURL:(S==null?void 0:S.photoURL)||void 0,memberIds:ee.memberIds}),de(null),c("callee"),l(!0)},gi=(k==null?void 0:k.type)==="group"?Math.min(k.memberIds.length,oi.filter(S=>{var F;return S.activeStatus!==!1&&!!S.lastSeen&&hi-(((F=S.lastSeen)==null?void 0:F.toMillis())||0)<9e4}).length):0;return he?m.jsx("main",{className:"app",children:m.jsx(hO,{uid:O.uid,callId:he.id,groupName:he.name,memberIds:he.memberIds,callerId:he.callerId,host:he.host,onClose:Nd})}):k?m.jsxs("main",{className:"app chat-screen",children:[m.jsxs("header",{className:"chat-header",children:[m.jsx("button",{className:"icon",onClick:()=>A(null),children:"←"}),m.jsx("button",{className:`avatar profile-avatar ${k.type==="group"&&gi>0?"group-avatar-active":""}`,type:"button",title:k.type==="group"?"Open group settings":void 0,onClick:k.type==="group"?()=>bn(!0):void 0,children:m.jsx(He,{name:k.name,photoURL:k.photoURL})}),m.jsxs("div",{children:[m.jsx("strong",{children:k.name}),m.jsx("small",{children:k.type==="group"?gi>0&&m.jsxs("span",{className:"group-active-summary",children:[m.jsx("span",{className:"presence-dot"}),gi," Active now"]}):k.id.startsWith("preview-")?"Preview conversation":m.jsx("span",{className:k.active?"active-presence":"",children:NO(k.active,k.lastSeen)})})]}),m.jsx("button",{className:"icon",title:"Start audio call",onClick:async()=>{if(k.type==="group")try{const S=await lO(k.memberIds,"audio",O.uid,{id:k.id,name:k.name});S&&Ye({id:S,name:k.name,memberIds:k.memberIds,callerId:O.uid,host:!0})}catch(S){T(S instanceof Error?S.message:"Could not start the group call.")}else c("caller"),p({id:k.id,name:k.name,photoURL:k.photoURL||void 0,memberIds:k.memberIds}),l(!0)},children:m.jsxs("svg",{className:"call-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[m.jsx("path",{d:"M6.6 3.8 9.2 3c.7-.2 1.4.2 1.7.8l1.2 2.8c.2.5.1 1.1-.3 1.5L10.3 9.6a13.7 13.7 0 0 0 4.1 4.1l1.5-1.5c.4-.4 1-.5 1.5-.3l2.8 1.2c.6.3 1 1 .8 1.7l-.8 2.6c-.2.7-.9 1.1-1.6 1.1C11.1 18.5 5.5 12.9 5.5 5.4c0-.7.4-1.4 1.1-1.6Z"}),m.jsx("path",{d:"M14.7 4.1a6.2 6.2 0 0 1 5.2 5.2M14.7 1.2a9.1 9.1 0 0 1 8.1 8.1"})]})})]}),xn&&k.type==="group"&&m.jsxs("div",{className:"person-profile chat-profile-menu",children:[m.jsx("button",{className:"icon close-profile",type:"button",onClick:()=>bn(!1),children:"×"}),m.jsx(He,{name:k.name,photoURL:k.photoURL,className:"avatar large"}),m.jsx("h3",{children:k.name}),m.jsx("small",{children:k.type==="group"?`${k.memberIds.length} members · Admin: ${((Bl=oi.find(S=>S.uid===k.adminId))==null?void 0:Bl.displayName)||"Group creator"}`:"Conversation profile"}),k.type==="group"&&m.jsxs(m.Fragment,{children:[m.jsx("div",{className:"group-member-list",children:oi.map(S=>m.jsxs("div",{className:"person-result",children:[m.jsx(He,{profile:S}),m.jsxs("span",{className:"chat-copy",children:[m.jsxs("strong",{children:[S.displayName,S.uid===k.adminId?" · Admin":""]}),m.jsxs("span",{children:["@",S.username]})]}),k.adminId===O.uid&&S.uid!==O.uid&&m.jsx("button",{className:"secondary compact",type:"button",onClick:async()=>{await rO(k.id,O.uid,S.uid).catch(()=>{}),gs(F=>F.filter(K=>K.uid!==S.uid))},children:"Remove"})]},S.uid))}),m.jsxs("div",{className:"profile-actions group-add-members",children:[m.jsx("button",{className:"secondary",type:"button",onClick:()=>ui(S=>!S),children:li?"Close friend list":"Add friends"}),li&&m.jsxs("div",{className:"group-friend-picker",children:[m.jsx("small",{children:"Select accepted friends to add"}),m.jsx("input",{className:"search",value:Ar,onChange:S=>Rr(S.target.value),placeholder:"Search your friends"}),m.jsxs("div",{className:"group-friend-results",children:[Ol.filter(S=>!k.memberIds.includes(S.uid)&&(!Ar.trim()||`${S.displayName} ${S.username}`.toLowerCase().includes(Ar.trim().toLowerCase()))).map(S=>m.jsxs("button",{className:"person-result",type:"button",onClick:async()=>{try{await iO(k.id,O.uid,[S]),gs(F=>[...F,S]),A(F=>F&&{...F,memberIds:[...F.memberIds,S.uid]}),Oo(F=>F.filter(K=>K.uid!==S.uid))}catch(F){T(F instanceof Error?F.message:"Could not add this friend.")}},children:[m.jsx(He,{profile:S}),m.jsxs("span",{className:"chat-copy",children:[m.jsx("strong",{children:S.displayName}),m.jsxs("span",{children:["@",S.username]})]}),m.jsx("span",{children:"＋"})]},S.uid)),!Ol.some(S=>!k.memberIds.includes(S.uid)&&(!Ar.trim()||`${S.displayName} ${S.username}`.toLowerCase().includes(Ar.trim().toLowerCase())))&&m.jsx("small",{children:"No matching accepted friends."})]})]})]}),k.adminId===O.uid&&m.jsxs("div",{className:"profile-actions",children:[m.jsx("input",{value:yn,onChange:S=>Lo(S.target.value),maxLength:80,placeholder:"Group name"}),m.jsx("button",{className:"secondary",type:"button",onClick:async()=>{await nO(k.id,O.uid,yn).catch(()=>{}),A(S=>S&&{...S,name:yn.trim()||S.name}),bn(!1)},children:"Save group name"})]})]}),m.jsxs("div",{className:"profile-actions",children:[k.type!=="group"&&m.jsx("button",{className:"secondary",type:"button",onClick:()=>bn(!1),children:"View profile"}),k.type==="group"?m.jsx("button",{className:"secondary",type:"button",onClick:async()=>{try{await sO(k.id,O.uid),bn(!1),A(null),T("You left the group.")}catch(S){T(S instanceof Error?S.message:"Could not leave the group.")}},children:"Leave group"}):null]})]}),o&&f&&m.jsx(Z_,{uid:O.uid,otherUid:f.memberIds.find(S=>S!==O.uid)||"",otherName:f.name,otherPhotoURL:f.photoURL,role:u,onClose:()=>{l(!1),p(null)}}),m.jsx("section",{className:"messages",children:y.map(S=>{var Re,Pe;const F=S.senderId===O.uid||S.senderId==="me",K=F?Nn||"You":U[S.senderId]||"Loading…";return m.jsxs("div",{className:`bubble ${F?"me":""}`,children:[S.replyTo&&m.jsxs("div",{className:"reply-quote",children:["↪ ",S.replyTo.text||"Attachment"]}),S.attachment&&(S.attachment.type.startsWith("image/")?m.jsx("img",{className:"message-image",src:S.attachment.url,alt:S.attachment.name}):m.jsxs("a",{className:"attachment",href:S.attachment.url,target:"_blank",rel:"noreferrer",children:["📎 ",S.attachment.name]})),k.memberIds.length>2&&m.jsx("strong",{className:"message-sender",children:K}),S.text&&m.jsx("span",{children:S.text}),m.jsxs("small",{children:[PO(S.createdAt)||"now",F&&m.jsx("span",{className:`read-receipt ${(Re=S.seenBy)!=null&&Re.some(Se=>k.memberIds.includes(Se)&&Se!==O.uid)?"seen":""}`,title:(Pe=S.seenBy)!=null&&Pe.some(Se=>k.memberIds.includes(Se)&&Se!==O.uid)?"Seen":"Delivered",children:S.createdAt?" · ✓✓":" · ✓"}),m.jsx("button",{className:"reply-button",type:"button",onClick:()=>X(S),children:"Reply"}),m.jsx("button",{className:"reply-button",type:"button",title:"Message options",onClick:Se=>{Se.stopPropagation(),Jn(S)},children:"⋯"})]})]},S.id)})}),zt&&m.jsxs("div",{className:"message-menu",children:[m.jsx("button",{type:"button",onClick:()=>{var S;(S=navigator.clipboard)==null||S.writeText(zt.text||""),Jn(null)},children:"Copy text"}),m.jsx("button",{type:"button",onClick:()=>{vs(zt),Jn(null)},children:"Forward"}),zt.senderId===O.uid||zt.senderId==="me"?m.jsx("button",{type:"button",onClick:()=>{GD(k.id,zt.id).catch(()=>T("Could not unsend this message.")),Jn(null)},children:"Unsend"}):m.jsx("button",{type:"button",onClick:()=>{KD(k.id,zt.id,O.uid).catch(()=>T("Could not delete this message.")),Jn(null)},children:"Delete for me"})]}),Xe&&m.jsxs("div",{className:"forward-panel",children:[m.jsxs("div",{className:"section-title",children:["FORWARD TO A FRIEND"," ",m.jsx("button",{className:"icon",type:"button",onClick:()=>vs(null),children:"×"})]}),N.filter(S=>S.id!==k.id&&S.memberIds.length>1).map(S=>m.jsxs("button",{className:"person-result",type:"button",onClick:()=>{Y_(S.id,O.uid,Xe.text).then(()=>vs(null)).catch(()=>T("Could not forward this message."))},children:[m.jsx(He,{name:S.name,photoURL:S.photoURL}),m.jsxs("span",{className:"chat-copy",children:[m.jsx("strong",{children:S.name}),m.jsx("span",{children:"Send message"})]})]},S.id))]}),H&&m.jsxs("div",{className:"reply-compose",children:["Replying to: “",H.text||"attachment","”",m.jsx("button",{type:"button",className:"icon",onClick:()=>X(null),children:"×"})]}),m.jsxs("form",{className:"composer",onSubmit:Ul,children:[_s&&m.jsx("div",{className:"emoji-picker",role:"listbox",children:["😀","😂","😍","😊","👍","❤️","🎉","🔥","🙏","😎","👏","✨"].map(S=>m.jsx("button",{type:"button",onClick:()=>B(F=>F+S),children:S},S))}),m.jsx("button",{className:"emoji-button",type:"button",title:"Add emoji",onClick:()=>Ll(S=>!S),children:"☺"}),m.jsxs("label",{className:"attach-button",title:"Attach a file",children:["📎",m.jsx("input",{type:"file",onChange:S=>{var F;return w(((F=S.target.files)==null?void 0:F[0])||null)}})]}),m.jsx("input",{value:D,onChange:S=>B(S.target.value),placeholder:$?$.name:"Write a message"}),m.jsx("button",{className:"primary",children:"Send"})]}),ee&&m.jsx(iv,{name:ee.groupId?ee.groupName||"Group voice call":Vo,photoURL:ee.groupId?void 0:di,group:!!ee.groupId,onDecline:mi,onAccept:Bo})]}):m.jsxs("main",{className:"app",children:[m.jsxs("header",{className:"topbar",children:[g==="settings"?m.jsxs("div",{className:"settings-topbar-title",children:[m.jsx("button",{className:"icon",type:"button",title:"Back",onClick:()=>C("chats"),children:"←"}),m.jsx("strong",{children:"Settings and Profile"})]}):m.jsxs("div",{children:[m.jsxs("div",{className:"brand-line",children:[m.jsx("span",{className:"mini-mark",children:"C"}),m.jsx("strong",{children:"Co‑Chat"})]}),m.jsx("div",{className:"eyebrow",children:"WELCOME BACK"})]}),m.jsxs("div",{className:"topbar-actions",children:[(g==="chats"||g==="communities")&&m.jsx("button",{className:"icon",type:"button",title:"Friend requests",onClick:()=>{const S=!ms;if(S&&O.uid!=="preview"&&ii.length){const F=`cochat-seen-friend-requests-${O.uid}`;let K=[];try{K=JSON.parse(localStorage.getItem(F)||"[]")}catch{K=[]}const Re=[...new Set([...K,...ii])];localStorage.setItem(F,JSON.stringify(Re)),Dl([])}bl(S)},children:m.jsxs("span",{className:"bell-wrap",children:["🔔",ii.length>0&&m.jsx("span",{className:"notification-dot"})]})}),m.jsx("button",{className:"avatar profile-button",onClick:()=>C("settings"),children:m.jsx(He,{name:O.displayName||O.email||"U",photoURL:O.photoURL||void 0})})]})]}),(g==="chats"||g==="communities")&&ms&&m.jsx("div",{className:"notification-panel",children:m.jsx(LO,{uid:O.uid,onMessage:Is})}),ee&&m.jsx(iv,{name:ee.groupId?ee.groupName||"Group voice call":Vo,photoURL:ee.groupId?void 0:di,group:!!ee.groupId,onDecline:mi,onAccept:Bo}),o&&f&&m.jsx(Z_,{uid:O.uid,otherUid:f.memberIds.find(S=>S!==O.uid)||"",otherName:f.name,otherPhotoURL:f.photoURL,role:u,onClose:()=>{l(!1),p(null)}}),m.jsxs("section",{className:"content",children:[P&&m.jsxs("div",{className:"notice",children:[P,m.jsx("button",{className:"icon",onClick:()=>T(""),children:"×"})]}),(g==="chats"||g==="communities")&&m.jsxs(m.Fragment,{children:[m.jsx("input",{className:"search",value:_,onChange:S=>I(S.target.value),placeholder:"Search people and messages"}),g==="chats"&&m.jsxs("section",{className:"online-section","aria-label":"Users online",children:[m.jsx("div",{className:"section-title",children:"USERS ONLINE"}),m.jsxs("div",{className:"online-tray",children:[pi.map(S=>{const F=(O==null?void 0:O.uid)==="preview"?null:ys.find(Re=>S.memberIds.includes(Re.uid)||Re.uid===S.id),K=(F==null?void 0:F.displayName)||S.name;return m.jsxs("button",{type:"button",className:"online-person",onClick:()=>F?void Is(F):A(S),children:[m.jsx(He,{name:K,profile:F,active:!0}),m.jsx("span",{children:K.split(" ")[0]})]},S.id)}),!pi.length&&m.jsx("small",{children:"No friends are online right now."})]})]}),g==="communities"&&m.jsx("div",{className:"chat-tools",children:m.jsx("button",{className:"secondary compact",type:"button",onClick:()=>fe(!0),children:"＋ New group"})}),m.jsx("div",{className:"section-title",children:g==="communities"?"COMMUNITY CHATS":"RECENT CONVERSATIONS"}),m.jsxs("div",{className:"list",children:[On.filter(S=>g==="communities"?S.type==="group":S.type!=="group").map(S=>m.jsxs("button",{className:"chat-row",onClick:()=>{if(ln.current){ln.current=!1;return}A(S)},onContextMenu:F=>{F.preventDefault(),vn(S)},onPointerDown:()=>{Pr.current[S.id]=window.setTimeout(()=>{ln.current=!0,vn(S)},550)},onPointerUp:()=>window.clearTimeout(Pr.current[S.id]),onPointerLeave:()=>window.clearTimeout(Pr.current[S.id]),children:[m.jsx(He,{name:S.name,photoURL:S.photoURL,active:!!S.active}),m.jsxs("span",{className:"chat-copy",children:[m.jsx("strong",{children:S.name}),m.jsx("span",{className:S.unreadCount?"unread-preview":"",children:S.lastSenderId===O.uid?S.lastMessageSeen?`Seen ${Ih(S.lastMessageAt)}`:`Sent ${Ih(S.lastMessageAt)}`:S.unreadCount?`${S.unreadCount>4?"4+":S.unreadCount} new message${S.unreadCount===1?"":"s"}`:S.lastMessage?`Received ${Ih(S.lastMessageAt)}`:"Start a conversation"})]})]},S.id)),!On.filter(S=>g==="communities"?S.type==="group":S.type!=="group").length&&m.jsx("div",{className:"empty-state",children:"No conversations found."})]}),kr&&m.jsxs("div",{className:"conversation-menu",role:"dialog","aria-label":"Conversation actions",children:[m.jsx("button",{className:"icon close-profile",type:"button",onClick:()=>vn(null),children:"×"}),m.jsx("strong",{children:kr.name}),m.jsx("button",{className:"secondary",type:"button",onClick:()=>{A(kr),vn(null)},children:"Open chat"}),m.jsx("button",{className:"danger",type:"button",onClick:async()=>{ws(kr),vn(null)},children:"Delete conversation"})]}),ci&&m.jsx("div",{className:"modal-backdrop",children:m.jsxs("section",{className:"modal",role:"dialog","aria-modal":"true",children:[m.jsx("h2",{children:"Delete conversation?"}),m.jsx("p",{children:"This removes the conversation and its messages for everyone."}),m.jsxs("div",{className:"group-step-actions",children:[m.jsx("button",{className:"secondary",type:"button",onClick:()=>ws(null),children:"Cancel"}),m.jsx("button",{className:"danger",type:"button",onClick:async()=>{try{await QD(ci.id,O.uid),A(S=>(S==null?void 0:S.id)===ci.id?null:S),ws(null)}catch(S){T(S instanceof Error?S.message:"Could not delete conversation.")}},children:"Delete"})]})]})}),x&&m.jsx(jO,{uid:O.uid,onSelect:Is,onClose:()=>R(!1)}),ye&&m.jsx(MO,{uid:O.uid,onCreated:S=>{fe(!1),A(S)},onClose:()=>fe(!1)})]}),(g==="search"||g==="discover")&&m.jsx(VO,{uid:O.uid,onSelect:Is}),g==="status"&&m.jsxs("div",{className:"hero-card coming-soon",children:[m.jsx("span",{children:"◉"}),m.jsx("h2",{children:"Stories are coming soon"}),m.jsx("p",{children:"We’re focusing today’s release on fast, reliable conversations. Stories will follow in a future release."})]}),(g==="profile"||g==="settings")&&m.jsxs(m.Fragment,{children:[m.jsxs("form",{className:"profile-card",onSubmit:Fo,children:[m.jsx(He,{name:Nn||O.email||"U",photoURL:O.photoURL||void 0,className:"avatar large"}),m.jsx("h2",{children:Nn||"Co Chat member"}),m.jsx("p",{children:O.email}),m.jsxs("label",{className:"field-label",children:["Display name",m.jsx("input",{value:Nn,onChange:S=>ri(S.target.value),required:!0})]}),m.jsxs("label",{className:"field-label",children:["Username",m.jsx("input",{value:si,onChange:S=>ps(S.target.value.replace(/[^a-zA-Z0-9_]/g,"").toLowerCase()),minLength:3,maxLength:24,pattern:"[a-z0-9_]+",required:!0}),m.jsx("small",{children:"Unique, 3–24 characters: letters, numbers, and underscores."})]}),m.jsx("button",{type:"submit",className:"primary",disabled:n,children:lt?"Saved ✓":"Save profile"})]}),m.jsxs("div",{className:"settings",children:[m.jsxs("button",{type:"button",onClick:()=>Cr(S=>!S),children:[m.jsx("span",{className:"settings-row-icon",children:"◐"}),"Appearance ",m.jsxs("span",{className:"settings-value",children:[_n?"Dark":"Light"," ",m.jsx("span",{className:"chevron",children:"›"})]})]}),m.jsxs("button",{type:"button",onClick:()=>Uo(S=>!S),children:[m.jsx("span",{className:`settings-row-icon ${Dn?"online":""}`,children:"●"}),"Active Status ",m.jsx("span",{className:`settings-toggle ${Dn?"on":""}`,"aria-label":Dn?"Active status on":"Active status off",children:m.jsx("span",{})})]}),m.jsxs("button",{type:"button",onClick:Fl,children:["↪ Log out ",m.jsx("span",{children:"›"})]})]})]})]}),m.jsx(bO,{page:g,setPage:C})]})}function iv({name:t,photoURL:e,group:n,onAccept:r,onDecline:s}){return m.jsx("div",{className:"call-backdrop",children:m.jsxs("section",{className:"call-card",children:[m.jsx(He,{name:t,photoURL:e,className:"avatar large"}),m.jsx("p",{className:"eyebrow",children:n?"INCOMING GROUP VOICE CALL":"INCOMING VOICE CALL"}),m.jsx("h2",{children:t}),m.jsx("p",{children:n?"Join the conference call":"Wants to talk with you"}),m.jsxs("div",{className:"call-actions",children:[m.jsx("button",{className:"secondary",onClick:s,children:"Decline"}),m.jsx("button",{className:"primary",onClick:r,children:"Accept"})]})]})})}function LO({uid:t,onMessage:e}){const[n,r]=V.useState([]),[s,i]=V.useState({}),[o,l]=V.useState(null),[u,c]=V.useState([]),[f,p]=V.useState(!1);V.useEffect(()=>o0(t,r),[t]),V.useEffect(()=>{zm(t).then(N=>c(N.map(b=>b.blockedId))).catch(()=>{})},[t]),V.useEffect(()=>{const N=[...new Set(n.flatMap(b=>[b.fromUid,b.toUid]).filter(b=>b!==t))];Promise.all(N.map(async b=>[b,await Mn(b)])).then(b=>i(k=>({...k,...Object.fromEntries(b.filter(A=>!!A[1]))})))},[n,t]);const g=n.filter(N=>N.toUid===t&&!u.includes(N.fromUid)),C=n.filter(N=>N.status==="accepted"&&!u.includes(N.fromUid===t?N.toUid:N.fromUid));return m.jsxs("div",{className:"friend-zone",children:[m.jsx("div",{className:"section-title",children:"FRIEND ZONE"}),g.length>0&&m.jsxs("div",{className:"friend-section",children:[m.jsx("strong",{children:"Friend requests"}),g.map(N=>{const b=s[N.fromUid];return m.jsxs("div",{className:"person-result",children:[m.jsx("button",{className:"avatar profile-avatar",type:"button",onClick:()=>b&&(l(b),p(!1)),children:m.jsx(He,{profile:b})}),m.jsxs("span",{className:"chat-copy",children:[m.jsx("strong",{children:(b==null?void 0:b.displayName)||"Someone"}),m.jsxs("span",{children:["@",(b==null?void 0:b.username)||"user"]})]}),m.jsx("button",{className:"secondary compact",type:"button",onClick:()=>J_(N.fromUid,t,!0),children:"Accept"}),m.jsx("button",{className:"icon",type:"button",onClick:()=>J_(N.fromUid,t,!1),children:"×"})]},N.id)})]}),C.length>0&&m.jsxs("div",{className:"friend-section",children:[m.jsx("strong",{children:"Your friends"}),C.map(N=>{const b=s[N.fromUid===t?N.toUid:N.fromUid];return m.jsxs("div",{className:"person-result",children:[m.jsx("button",{className:"avatar profile-avatar",type:"button",onClick:()=>{b&&(l(b),p(!1))},children:m.jsx(He,{profile:b})}),m.jsxs("span",{className:"chat-copy",children:[m.jsx("strong",{children:(b==null?void 0:b.displayName)||"Friend"}),m.jsxs("span",{children:["@",(b==null?void 0:b.username)||"user"]})]}),b&&m.jsx("button",{className:"secondary compact",type:"button",onClick:()=>e(b),children:"Message"})]},N.id)})]}),!g.length&&!C.length&&m.jsx("div",{className:"empty-state",children:"Your friend zone is empty. Search for someone to connect."}),o&&m.jsxs("div",{className:"person-profile",children:[m.jsx("button",{className:"icon close-profile",type:"button",onClick:()=>l(null),children:"×"}),m.jsx(He,{profile:o,className:"avatar large"}),m.jsx("h3",{children:o.displayName}),m.jsxs("p",{children:["@",o.username]}),f&&m.jsx("small",{children:"Friend on Co-Chat · Public profile"}),m.jsxs("div",{className:"profile-actions",children:[m.jsx("button",{className:"primary",type:"button",onClick:()=>{l(null),e(o)},children:"Message"}),m.jsx("button",{className:"secondary",type:"button",onClick:()=>p(!0),children:"View profile"})]})]})]})}function VO({uid:t,onSelect:e}){const[n,r]=V.useState(""),[s,i]=V.useState(()=>{try{const y=JSON.parse(localStorage.getItem(`cochat-search-history-${t}`)||"[]");return Array.isArray(y)?y.filter(E=>E&&typeof E=="object"&&E.uid):[]}catch{return[]}}),[o,l]=V.useState([]),[u,c]=V.useState({}),[f,p]=V.useState(""),[g,C]=V.useState(null),[N,b]=V.useState(!1);V.useEffect(()=>{const y=setTimeout(()=>{n.trim()?i0(n,t).then(l).catch(()=>l([])):l([])},250);return()=>clearTimeout(y)},[n,t]),V.useEffect(()=>{Promise.all(o.map(async y=>[y.uid,await Co(t,y.uid)])).then(y=>c(Object.fromEntries(y)))},[o,t]);const k=y=>{const E=[{uid:y.uid,displayName:y.displayName,username:y.username},...s.filter(D=>D.uid!==y.uid)].slice(0,8);i(E),localStorage.setItem(`cochat-search-history-${t}`,JSON.stringify(E)),b(!1)},A=async y=>{p("");const E=u[y.uid]||"none";try{if(E==="friends")k(y),e(y);else{if(E==="incoming")throw new Error("This person has already sent you a request. Open the bell in Chats to review it.");E==="none"&&(await XD(t,y.uid),c(D=>({...D,[y.uid]:"requested"})))}}catch(D){p(D instanceof Error?D.message:"Could not update this connection.")}};return m.jsxs("section",{className:"search-panel",children:[m.jsx("p",{className:"eyebrow",children:"FIND PEOPLE"}),m.jsx("h2",{children:"Search Co‑Chat"}),m.jsx("input",{autoFocus:!0,value:n,onChange:y=>r(y.target.value),placeholder:"Search by username"}),f&&m.jsxs("div",{className:"notice",children:[f,m.jsx("button",{className:"icon",type:"button",onClick:()=>p(""),children:"×"})]}),s.length>0&&m.jsxs("div",{className:"search-history",children:[m.jsxs("div",{className:"section-title",children:["RECENT PROFILES"," ",m.jsx("button",{className:"icon",type:"button",onClick:()=>{i([]),localStorage.removeItem(`cochat-search-history-${t}`)},children:"Clear"})]}),s.map(y=>m.jsxs("button",{className:"person-result history-profile",type:"button",onClick:()=>{r(y.username),k(y)},children:[m.jsx(He,{profile:y}),m.jsxs("span",{className:"chat-copy",children:[m.jsx("strong",{children:y.displayName}),m.jsxs("span",{children:["@",y.username]})]})]},y.uid))]}),m.jsxs("div",{className:"list",children:[o.map(y=>{const E=u[y.uid]||"loading";return m.jsxs("div",{className:"person-result",onClick:()=>k(y),children:[m.jsx("button",{className:"avatar profile-avatar",type:"button",onClick:D=>{D.stopPropagation(),C(y)},children:m.jsx(He,{profile:y})}),m.jsxs("span",{className:"chat-copy",children:[m.jsx("strong",{children:y.displayName}),m.jsxs("span",{children:["@",y.username]})]}),m.jsx("button",{className:"secondary compact",type:"button",disabled:E==="loading",onClick:D=>{D.stopPropagation(),E==="requested"?JD(t,y.uid).then(()=>c(B=>({...B,[y.uid]:"none"}))).catch(()=>p("Could not cancel this request.")):E==="friends"||E==="none"?A(y):C(y)},children:E==="friends"?"Message":E==="requested"?"Requested":E==="incoming"?"Pending request":"Add friend"})]},y.uid)}),n&&!o.length&&m.jsx("div",{className:"empty-state",children:"No matching people yet."})]}),g&&m.jsxs("div",{className:"person-profile",children:[m.jsx("button",{className:"icon close-profile",type:"button",onClick:()=>C(null),children:"×"}),m.jsx(He,{profile:g,className:"avatar large"}),m.jsx("h3",{children:g.displayName}),m.jsxs("p",{children:["@",g.username]}),m.jsx("small",{children:u[g.uid]==="friends"?"Friend on Co-Chat":"Co-Chat profile"}),u[g.uid]==="friends"&&m.jsx("button",{className:"primary",type:"button",onClick:()=>{C(null),e(g)},children:"Message"}),N&&m.jsxs("div",{className:"public-profile-details",children:[m.jsxs("small",{children:["Username: @",g.username]}),g.activeStatus===!1&&m.jsx("small",{children:"Active status hidden"})]})]})]})}function MO({uid:t,onCreated:e,onClose:n}){const[r,s]=V.useState(""),[i,o]=V.useState(""),[l,u]=V.useState([]),[c,f]=V.useState([]),[p,g]=V.useState([]),[C,N]=V.useState(1),[b,k]=V.useState("");V.useEffect(()=>{Wu(t).then(f).catch(()=>f([]))},[t]),V.useEffect(()=>{const y=i.trim().toLowerCase();u(c.filter(E=>!p.some(D=>D.uid===E.uid)&&(!y||E.username.toLowerCase().includes(y)||E.displayName.toLowerCase().includes(y))))},[i,c,p]);const A=async()=>{if(p.length<2){k("Choose at least two friends first.");return}try{const y=await tO(t,r,p);e({id:y,name:r.trim()||"New group",avatar:xc(r||"Group"),memberIds:[t,...p.map(E=>E.uid)],type:"group",adminId:t,lastMessage:""})}catch(y){k(y instanceof Error?y.message:"Could not create group.")}};return m.jsx("div",{className:"modal-backdrop",children:m.jsxs("section",{className:"modal group-creator",children:[m.jsxs("header",{children:[m.jsxs("div",{children:[m.jsxs("p",{className:"eyebrow",children:["STEP ",C," OF 2"]}),m.jsx("h2",{children:C===1?"Choose friends":"Name your group"})]}),m.jsx("button",{className:"icon",type:"button",onClick:n,children:"×"})]}),C===1?m.jsxs(m.Fragment,{children:[m.jsx("p",{className:"modal-hint",children:"Add at least two accepted friends. You’ll be the group admin."}),m.jsx("input",{autoFocus:!0,value:i,onChange:y=>o(y.target.value),placeholder:"Search accepted friends by username"}),p.length>0&&m.jsx("div",{className:"selected-members",children:p.map(y=>m.jsxs("button",{className:"secondary compact",type:"button",onClick:()=>g(E=>E.filter(D=>D.uid!==y.uid)),children:[y.displayName," ×"]},y.uid))}),m.jsx("div",{className:"list",children:l.map(y=>m.jsxs("button",{className:"person-result",type:"button",onClick:()=>{g(E=>[...E,y]),o("")},children:[m.jsx(He,{profile:y}),m.jsxs("span",{className:"chat-copy",children:[m.jsx("strong",{children:y.displayName}),m.jsxs("span",{children:["@",y.username]})]}),m.jsx("span",{children:"＋"})]},y.uid))}),m.jsxs("button",{className:"primary",type:"button",disabled:p.length<2,onClick:()=>{k(""),N(2)},children:["Continue with ",p.length," friend",p.length===1?"":"s"]})]}):m.jsxs(m.Fragment,{children:[m.jsxs("div",{className:"group-preview",children:[m.jsx("div",{className:"avatar large",children:xc(r||"Group")}),m.jsxs("strong",{children:[p.length+1," members"]}),m.jsx("small",{children:p.map(y=>y.displayName).join(", ")})]}),m.jsxs("label",{className:"field-label",children:["Group name",m.jsx("input",{autoFocus:!0,value:r,onChange:y=>s(y.target.value),maxLength:80,placeholder:"e.g. Weekend crew"})]}),b&&m.jsx("p",{className:"error-text",children:b}),m.jsxs("div",{className:"group-step-actions",children:[m.jsx("button",{className:"secondary",type:"button",onClick:()=>N(1),children:"Back"}),m.jsx("button",{className:"primary",type:"button",onClick:()=>void A(),children:"Create group"})]})]})]})})}function jO({uid:t,onSelect:e,onClose:n}){const[r,s]=V.useState(""),[i,o]=V.useState([]),[l,u]=V.useState(null);return V.useEffect(()=>{const c=setTimeout(()=>{r.trim()?i0(r,t).then(o).catch(()=>o([])):o([])},250);return()=>clearTimeout(c)},[r,t]),m.jsx("div",{className:"modal-backdrop",children:m.jsxs("section",{className:"modal",children:[m.jsxs("header",{children:[m.jsxs("div",{children:[m.jsx("p",{className:"eyebrow",children:"FIND PEOPLE"}),m.jsx("h2",{children:"New conversation"})]}),m.jsx("button",{className:"icon",onClick:n,children:"×"})]}),m.jsx("input",{autoFocus:!0,value:r,onChange:c=>s(c.target.value),placeholder:"Search by username"}),m.jsxs("div",{className:"list",children:[i.map(c=>m.jsxs("div",{className:"person-result",children:[m.jsx(He,{profile:c}),m.jsxs("span",{className:"chat-copy",children:[m.jsx("strong",{children:c.displayName}),m.jsxs("span",{children:["@",c.username]})]}),m.jsx("button",{className:"secondary compact",onClick:()=>e(c),children:"Message"}),m.jsx("button",{className:"icon",title:"View profile",onClick:()=>u(c),children:"⋯"})]},c.uid)),r&&!i.length&&m.jsx("div",{className:"empty-state",children:"No matching people yet."})]}),l&&m.jsxs("div",{className:"person-profile",children:[m.jsx("button",{className:"icon close-profile",onClick:()=>u(null),children:"×"}),m.jsx(He,{profile:l,className:"avatar large"}),m.jsx("h3",{children:l.displayName}),m.jsxs("p",{children:["@",l.username]}),m.jsxs("button",{className:"primary",onClick:()=>e(l),children:["Message ",l.displayName.split(" ")[0]]})]})]})})}Th.createRoot(document.getElementById("root")).render(m.jsx($0.StrictMode,{children:m.jsx(OO,{})}));export{pk as A,YO as B,aL as C,NP as D,Xs as E,jr as F,Ur as G,lL as H,oL as I,Mk as J,gr as K,ZO as L,$y as M,fP as N,Mu as O,sv as P,aI as Q,rL as R,tP as S,Fr as T,c0 as W,qO as a,zO as b,Uk as c,nL as d,uL as e,KO as f,EN as g,Un as h,HO as i,tL as j,$O as k,iL as l,WO as m,rv as n,eL as o,UO as p,BO as q,KC as r,QO as s,Fk as t,GO as u,sL as v,FO as w,XO as x,JO as y,tI as z};
