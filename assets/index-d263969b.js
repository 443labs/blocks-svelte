(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();function N(){}function Je(e){return e()}function Pe(){return Object.create(null)}function ee(e){e.forEach(Je)}function Ke(e){return typeof e=="function"}function te(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Ve(e){return Object.keys(e).length===0}function c(e,t){e.appendChild(t)}function L(e,t,o){e.insertBefore(t,o||null)}function A(e){e.parentNode&&e.parentNode.removeChild(e)}function ne(e,t){for(let o=0;o<e.length;o+=1)e[o]&&e[o].d(t)}function m(e){return document.createElement(e)}function j(e){return document.createTextNode(e)}function S(){return j(" ")}function ke(){return j("")}function z(e,t,o,n){return e.addEventListener(t,o,n),()=>e.removeEventListener(t,o,n)}function d(e,t,o){o==null?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)}function et(e){return Array.from(e.childNodes)}function Y(e,t){t=""+t,e.data!==t&&(e.data=t)}function V(e,t,o,n){o==null?e.style.removeProperty(t):e.style.setProperty(t,o,n?"important":"")}function Oe(e,t,o){for(let n=0;n<e.options.length;n+=1){const r=e.options[n];if(r.__value===t){r.selected=!0;return}}(!o||t!==void 0)&&(e.selectedIndex=-1)}function tt(e){const t=e.querySelector(":checked");return t&&t.__value}function be(e,t,o){e.classList[o?"add":"remove"](t)}function nt(e,t,{bubbles:o=!1,cancelable:n=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,o,n,t),r}let ae;function ce(e){ae=e}function Se(){if(!ae)throw new Error("Function called outside component initialization");return ae}function ot(e){Se().$$.on_mount.push(e)}function rt(e){Se().$$.on_destroy.push(e)}function lt(){const e=Se();return(t,o,{cancelable:n=!1}={})=>{const r=e.$$.callbacks[t];if(r){const i=nt(t,o,{cancelable:n});return r.slice().forEach(l=>{l.call(e,i)}),!i.defaultPrevented}return!0}}const $=[],Ae=[];let Q=[];const Le=[],it=Promise.resolve();let we=!1;function st(){we||(we=!0,it.then(Ze))}function pe(e){Q.push(e)}const ye=new Set;let X=0;function Ze(){if(X!==0)return;const e=ae;do{try{for(;X<$.length;){const t=$[X];X++,ce(t),ct(t.$$)}}catch(t){throw $.length=0,X=0,t}for(ce(null),$.length=0,X=0;Ae.length;)Ae.pop()();for(let t=0;t<Q.length;t+=1){const o=Q[t];ye.has(o)||(ye.add(o),o())}Q.length=0}while($.length);for(;Le.length;)Le.pop()();we=!1,ye.clear(),ce(e)}function ct(e){if(e.fragment!==null){e.update(),ee(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(pe)}}function ut(e){const t=[],o=[];Q.forEach(n=>e.indexOf(n)===-1?t.push(n):o.push(n)),o.forEach(n=>n()),Q=t}const me=new Set;let at;function J(e,t){e&&e.i&&(me.delete(e),e.i(t))}function ie(e,t,o,n){if(e&&e.o){if(me.has(e))return;me.add(e),at.c.push(()=>{me.delete(e),n&&(o&&e.d(1),n())}),e.o(t)}else n&&n()}function se(e){e&&e.c()}function K(e,t,o,n){const{fragment:r,after_update:i}=e.$$;r&&r.m(t,o),n||pe(()=>{const l=e.$$.on_mount.map(Je).filter(Ke);e.$$.on_destroy?e.$$.on_destroy.push(...l):ee(l),e.$$.on_mount=[]}),i.forEach(pe)}function Z(e,t){const o=e.$$;o.fragment!==null&&(ut(o.after_update),ee(o.on_destroy),o.fragment&&o.fragment.d(t),o.on_destroy=o.fragment=null,o.ctx=[])}function ft(e,t){e.$$.dirty[0]===-1&&($.push(e),st(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function oe(e,t,o,n,r,i,l,s=[-1]){const u=ae;ce(e);const a=e.$$={fragment:null,ctx:[],props:i,update:N,not_equal:r,bound:Pe(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(u?u.$$.context:[])),callbacks:Pe(),dirty:s,skip_bound:!1,root:t.target||u.$$.root};l&&l(a.root);let p=!1;if(a.ctx=o?o(e,t.props||{},(h,g,...f)=>{const y=f.length?f[0]:g;return a.ctx&&r(a.ctx[h],a.ctx[h]=y)&&(!a.skip_bound&&a.bound[h]&&a.bound[h](y),p&&ft(e,h)),g}):[],a.update(),p=!0,ee(a.before_update),a.fragment=n?n(a.ctx):!1,t.target){if(t.hydrate){const h=et(t.target);a.fragment&&a.fragment.l(h),h.forEach(A)}else a.fragment&&a.fragment.c();t.intro&&J(e.$$.fragment),K(e,t.target,t.anchor,t.customElement),Ze()}ce(u)}class re{$destroy(){Z(this,1),this.$destroy=N}$on(t,o){if(!Ke(o))return N;const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(o),()=>{const r=n.indexOf(o);r!==-1&&n.splice(r,1)}}$set(t){this.$$set&&!Ve(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Re={I:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],J:[[2,0,0],[2,2,2],[0,0,0]],L:[[0,0,3],[3,3,3],[0,0,0]],O:[[4,4],[4,4]],S:[[0,5,5],[5,5,0],[0,0,0]],T:[[0,6,0],[6,6,6],[0,0,0]],Z:[[7,7,0],[0,7,7],[0,0,0]]},dt={I:1,J:2,L:3,O:4,S:5,T:6,Z:7},ue={0:"transparent",1:"#00FFFF",2:"#0000FF",3:"#FF7F00",4:"#FFFF00",5:"#00FF00",6:"#800080",7:"#FF0000"};function xe(){const e=Object.keys(Re),t=e[Math.floor(Math.random()*e.length)],o=dt[t];return{shape:Re[t],position:{x:3,y:0},type:o}}function mt(e){const t=e.length,o=Array(t).fill(0).map(()=>Array(t).fill(0));for(let n=0;n<t;n++)for(let r=0;r<t;r++)o[r][t-1-n]=e[n][r];return o}function _e(e,t){const{shape:o,position:n}=t;for(let r=0;r<o.length;r++)for(let i=0;i<o[r].length;i++)if(o[r][i]!==0){const l=i+n.x,s=r+n.y;if(l<0||l>=e[0].length||s>=e.length||s>=0&&e[s][l]!==0)return!1}return!0}function ve(e,t){const{shape:o,position:n}=t;let r=n.y;for(;_e(e,{shape:o,position:{x:n.x,y:r+1},type:t.type});)r++;return{x:n.x,y:r}}var D=(e=>(e.LEFT="LEFT",e.RIGHT="RIGHT",e.DOWN="DOWN",e.ROTATE="ROTATE",e.HARD_DROP="HARD_DROP",e.PAUSE="PAUSE",e.RESUME="RESUME",e.RESTART="RESTART",e))(D||{});const Te=10,Ee=20,gt=100,ht=2;function pt(){return Array(Ee).fill(0).map(()=>Array(Te).fill(0))}function ge(){const e=xe(),t=xe(),o=pt();return{grid:o,currentTetromino:t,nextTetromino:e,score:0,level:1,prevLevel:1,lines:0,gameOver:!1,isPaused:!1,ghostPosition:ve(o,t)}}function _t(e,t){const o=e.map(l=>[...l]),{shape:n,position:r,type:i}=t;for(let l=0;l<n.length;l++)for(let s=0;s<n[l].length;s++)if(n[l][s]!==0){const u=l+r.y,a=s+r.x;u>=0&&u<Ee&&a>=0&&a<Te&&(o[u][a]=i)}return o}function vt(e){const t=[...e];let o=0;for(let n=Ee-1;n>=0;n--)t[n].every(r=>r!==0)&&(t.splice(n,1),t.unshift(Array(Te).fill(0)),o++,n++);return{newGrid:t,linesCleared:o}}function bt(e){return Math.floor(e/10)+1}function de(e){return Math.max(800-(e-1)*50,50)}function he(e,t){if(e.gameOver||e.isPaused||!e.currentTetromino)return e;const{currentTetromino:o,grid:n}=e,{x:r,y:i}=o.position;let l=r,s=i;switch(t){case"LEFT":l=r-1;break;case"RIGHT":l=r+1;break;case"DOWN":s=i+1;break}const a={...o,position:{x:l,y:s}};return _e(n,a)?{...e,currentTetromino:a,ghostPosition:ve(n,a)}:t==="DOWN"?Qe(e):e}function yt(e){if(e.gameOver||e.isPaused||!e.currentTetromino)return e;const{currentTetromino:t,grid:o}=e,n=mt(t.shape),r={...t,shape:n},i=[{x:0,y:0},{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:-1,y:-1},{x:1,y:-1},{x:0,y:1},{x:-1,y:1},{x:1,y:1}];for(const l of i){const s={...r,position:{x:t.position.x+l.x,y:t.position.y+l.y}};if(_e(o,s))return{...e,currentTetromino:s,ghostPosition:ve(o,s)}}return e}function wt(e){if(e.gameOver||e.isPaused||!e.currentTetromino||!e.ghostPosition)return e;const{currentTetromino:t,ghostPosition:o}=e,n=o.y-t.position.y,r=e.score+n*ht,i={...t,position:o};return Qe({...e,currentTetromino:i,score:r})}function Qe(e){if(!e.currentTetromino||!e.nextTetromino)return e;const{grid:t,currentTetromino:o,nextTetromino:n,score:r,lines:i}=e,l=_t(t,o),{newGrid:s,linesCleared:u}=vt(l),a=i+u,p=u*gt*e.level,h=r+p,g=bt(a),f=xe(),y=!_e(s,n);return{grid:s,currentTetromino:y?null:n,nextTetromino:y?null:f,score:h,lines:a,level:g,prevLevel:e.level,gameOver:y,isPaused:e.isPaused,ghostPosition:y?null:ve(s,n)}}function xt(e){return e.gameOver||e.isPaused?e:he(e,"DOWN")}function B(e,t){switch(t){case D.LEFT:return he(e,"LEFT");case D.RIGHT:return he(e,"RIGHT");case D.DOWN:return he(e,"DOWN");case D.ROTATE:return yt(e);case D.HARD_DROP:return wt(e);case D.PAUSE:return{...e,isPaused:!0};case D.RESUME:return{...e,isPaused:!1};case D.RESTART:return ge();default:return e}}function Ce(e,t,o){const n=e.slice();return n[10]=t[o],n[12]=o,n}function De(e,t,o){const n=e.slice();return n[13]=t[o],n[15]=o,n}function Ge(e,t,o){const n=e.slice();return n[16]=t[o],n}function Ie(e){let t,o=e[5](),n=[];for(let r=0;r<o.length;r+=1)n[r]=Ne(Ge(e,o,r));return{c(){for(let r=0;r<n.length;r+=1)n[r].c();t=ke()},m(r,i){for(let l=0;l<n.length;l+=1)n[l]&&n[l].m(r,i);L(r,t,i)},p(r,i){if(i&32){o=r[5]();let l;for(l=0;l<o.length;l+=1){const s=Ge(r,o,l);n[l]?n[l].p(s,i):(n[l]=Ne(s),n[l].c(),n[l].m(t.parentNode,t))}for(;l<n.length;l+=1)n[l].d(1);n.length=o.length}},d(r){ne(n,r),r&&A(t)}}}function Ne(e){let t;return{c(){t=m("div"),d(t,"class","absolute top-0 bottom-0 drop-guide svelte-1tt53x9"),V(t,"width","10%"),V(t,"left",e[16]*10+"%")},m(o,n){L(o,t,n)},p:N,d(o){o&&A(t)}}}function Fe(e){let t;return{c(){t=m("div"),d(t,"class","cell w-full h-full border border-gray-800 transition-colors duration-100 svelte-1tt53x9"),V(t,"background-color",e[3](e[13],e[12],e[15])),be(t,"active-tetromino",e[4](e[12],e[15])),be(t,"landing-flash",e[1])},m(o,n){L(o,t,n)},p(o,n){n&1&&V(t,"background-color",o[3](o[13],o[12],o[15])),n&2&&be(t,"landing-flash",o[1])},d(o){o&&A(t)}}}function He(e){let t,o=e[10],n=[];for(let r=0;r<o.length;r+=1)n[r]=Fe(De(e,o,r));return{c(){for(let r=0;r<n.length;r+=1)n[r].c();t=ke()},m(r,i){for(let l=0;l<n.length;l+=1)n[l]&&n[l].m(r,i);L(r,t,i)},p(r,i){if(i&27){o=r[10];let l;for(l=0;l<o.length;l+=1){const s=De(r,o,l);n[l]?n[l].p(s,i):(n[l]=Fe(s),n[l].c(),n[l].m(t.parentNode,t))}for(;l<n.length;l+=1)n[l].d(1);n.length=o.length}},d(r){ne(n,r),r&&A(t)}}}function Me(e){let t;return{c(){t=m("div"),d(t,"class","landing-effect svelte-1tt53x9")},m(o,n){L(o,t,n)},d(o){o&&A(t)}}}function Ue(e){let t,o,n,r=e[0].score===0?"Welcome!":"Game Over",i,l,s,u=e[0].score>0&&We(e);function a(g,f){return g[0].isPaused?St:kt}let p=a(e),h=p(e);return{c(){t=m("div"),o=m("div"),n=m("h2"),i=j(r),l=S(),u&&u.c(),s=S(),h.c(),d(n,"class","text-red-500 text-2xl font-bold mb-4"),d(o,"class","text-center p-4"),d(t,"class","absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-md")},m(g,f){L(g,t,f),c(t,o),c(o,n),c(n,i),c(o,l),u&&u.m(o,null),c(o,s),h.m(o,null)},p(g,f){f&1&&r!==(r=g[0].score===0?"Welcome!":"Game Over")&&Y(i,r),g[0].score>0?u?u.p(g,f):(u=We(g),u.c(),u.m(o,s)):u&&(u.d(1),u=null),p===(p=a(g))&&h?h.p(g,f):(h.d(1),h=p(g),h&&(h.c(),h.m(o,null)))},d(g){g&&A(t),u&&u.d(),h.d()}}}function We(e){let t,o,n=e[0].score+"",r;return{c(){t=m("p"),o=j("Score: "),r=j(n),d(t,"class","text-white mb-4")},m(i,l){L(i,t,l),c(t,o),c(t,r)},p(i,l){l&1&&n!==(n=i[0].score+"")&&Y(r,n)},d(i){i&&A(t)}}}function kt(e){let t,o=e[0].score===0?"Start Game":"Play Again",n,r,i;return{c(){t=m("button"),n=j(o),d(t,"class","bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none")},m(l,s){L(l,t,s),c(t,n),r||(i=z(t,"click",e[9]),r=!0)},p(l,s){s&1&&o!==(o=l[0].score===0?"Start Game":"Play Again")&&Y(n,o)},d(l){l&&A(t),r=!1,i()}}}function St(e){let t,o,n;return{c(){t=m("button"),t.textContent="Resume Game",d(t,"class","bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none")},m(r,i){L(r,t,i),o||(n=z(t,"click",e[6]),o=!0)},p:N,d(r){r&&A(t),o=!1,n()}}}function je(e){let t,o,n,r,i,l,s,u,a;return{c(){t=m("div"),o=m("div"),n=m("h2"),n.textContent="Game Paused",r=S(),i=m("p"),i.textContent="Press P to resume",l=S(),s=m("button"),s.textContent="Resume Game",d(n,"class","text-yellow-400 text-2xl font-bold mb-4"),d(i,"class","text-white mb-4"),d(s,"class","bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"),d(o,"class","text-center"),d(t,"class","absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-md")},m(p,h){L(p,t,h),c(t,o),c(o,n),c(o,r),c(o,i),c(o,l),c(o,s),u||(a=z(s,"click",e[6]),u=!0)},p:N,d(p){p&&A(t),u=!1,a()}}}function Tt(e){let t,o,n,r,i,l,s=e[0].currentTetromino&&!e[0].gameOver&&!e[0].isPaused&&Ie(e),u=e[0].grid,a=[];for(let f=0;f<u.length;f+=1)a[f]=He(Ce(e,u,f));let p=e[1]&&Me(),h=e[0].gameOver&&Ue(e),g=e[0].isPaused&&!e[0].gameOver&&je(e);return{c(){t=m("div"),s&&s.c(),o=S(),n=m("div");for(let f=0;f<a.length;f+=1)a[f].c();r=S(),p&&p.c(),i=S(),h&&h.c(),l=S(),g&&g.c(),d(n,"class","grid-container w-full aspect-[1/2] bg-gray-900 rounded-md overflow-hidden grid grid-cols-10 grid-rows-20 border-2 border-gray-700 relative svelte-1tt53x9"),d(t,"class","relative w-full max-w-md mx-auto")},m(f,y){L(f,t,y),s&&s.m(t,null),c(t,o),c(t,n);for(let _=0;_<a.length;_+=1)a[_]&&a[_].m(n,null);c(n,r),p&&p.m(n,null),c(t,i),h&&h.m(t,null),c(t,l),g&&g.m(t,null)},p(f,[y]){if(f[0].currentTetromino&&!f[0].gameOver&&!f[0].isPaused?s?s.p(f,y):(s=Ie(f),s.c(),s.m(t,o)):s&&(s.d(1),s=null),y&27){u=f[0].grid;let _;for(_=0;_<u.length;_+=1){const b=Ce(f,u,_);a[_]?a[_].p(b,y):(a[_]=He(b),a[_].c(),a[_].m(n,r))}for(;_<a.length;_+=1)a[_].d(1);a.length=u.length}f[1]?p||(p=Me(),p.c(),p.m(n,null)):p&&(p.d(1),p=null),f[0].gameOver?h?h.p(f,y):(h=Ue(f),h.c(),h.m(t,l)):h&&(h.d(1),h=null),f[0].isPaused&&!f[0].gameOver?g?g.p(f,y):(g=je(f),g.c(),g.m(t,null)):g&&(g.d(1),g=null)},i:N,o:N,d(f){f&&A(t),s&&s.d(),ne(a,f),p&&p.d(),h&&h.d(),g&&g.d()}}}function Et(e,t,o){const n=lt();let{gameState:r}=t,i=null,l=!1,s=!1;function u(f,y,_){if(r.currentTetromino){const{shape:b,position:x,type:O}=r.currentTetromino;for(let k=0;k<b.length;k++)for(let w=0;w<b[k].length;w++)if(b[k][w]!==0&&x.y+k===y&&x.x+w===_)return ue[O]}if(f===0&&r.ghostPosition&&r.currentTetromino){const{shape:b,type:x}=r.currentTetromino,O=r.ghostPosition.x,k=r.ghostPosition.y;for(let w=0;w<b.length;w++)for(let P=0;P<b[w].length;P++)if(b[w][P]!==0&&k+w===y&&O+P===_)return ue[x]+"40"}return ue[f]}function a(f,y){if(!r.currentTetromino)return!1;const{shape:_,position:b}=r.currentTetromino;for(let x=0;x<_.length;x++)for(let O=0;O<_[x].length;O++)if(_[x][O]!==0&&b.y+x===f&&b.x+O===y)return!0;return!1}function p(){if(!r.currentTetromino)return[];const{shape:f,position:y}=r.currentTetromino;let _=1/0,b=-1/0;for(let k=0;k<f.length;k++)for(let w=0;w<f[k].length;w++)f[k][w]!==0&&(_=Math.min(_,w),b=Math.max(b,w));const x=y.x+_,O=y.x+b+1;return[x,O]}function h(){n("resume")}const g=()=>n("restart");return e.$$set=f=>{"gameState"in f&&o(0,r=f.gameState)},e.$$.update=()=>{e.$$.dirty&129&&(r.currentTetromino&&i&&(r.ghostPosition&&r.ghostPosition.y===r.currentTetromino.position.y?o(8,l=!0):o(8,l=!1)),r.currentTetromino&&o(7,i={...r.currentTetromino.position})),e.$$.dirty&256&&l&&(o(1,s=!0),setTimeout(()=>{o(1,s=!1)},300),o(8,l=!1)),e.$$.dirty&1&&r.lines>0&&n("lineClear")},[r,s,n,u,a,p,h,i,l,g]}class Pt extends re{constructor(t){super(),oe(this,t,Et,Tt,te,{gameState:0})}}function Be(e,t,o){const n=e.slice();return n[1]=t[o],n[3]=o,n}function ze(e,t,o){const n=e.slice();return n[1]=t[o],n[5]=o,n}function Ot(e){let t;return{c(){t=m("div"),d(t,"class","w-full aspect-square bg-gray-800")},m(o,n){L(o,t,n)},p:N,d(o){o&&A(t)}}}function At(e){let t,o=new Array(4),n=[];for(let r=0;r<o.length;r+=1)n[r]=qe(Be(e,o,r));return{c(){t=m("div");for(let r=0;r<n.length;r+=1)n[r].c();d(t,"class","grid grid-cols-4 grid-rows-4 bg-gray-800 w-full aspect-square")},m(r,i){L(r,t,i);for(let l=0;l<n.length;l+=1)n[l]&&n[l].m(t,null)},p(r,i){if(i&1){o=new Array(4);let l;for(l=0;l<o.length;l+=1){const s=Be(r,o,l);n[l]?n[l].p(s,i):(n[l]=qe(s),n[l].c(),n[l].m(t,null))}for(;l<n.length;l+=1)n[l].d(1);n.length=o.length}},d(r){r&&A(t),ne(n,r)}}}function Ye(e){let t;return{c(){t=m("div"),d(t,"class","cell w-full h-full border border-gray-800 transition-colors duration-100"),V(t,"background-color",e[0].shape[e[3]]&&e[0].shape[e[3]][e[5]]!==0?ue[e[0].type]:"transparent")},m(o,n){L(o,t,n)},p(o,n){n&1&&V(t,"background-color",o[0].shape[o[3]]&&o[0].shape[o[3]][o[5]]!==0?ue[o[0].type]:"transparent")},d(o){o&&A(t)}}}function qe(e){let t,o=new Array(4),n=[];for(let r=0;r<o.length;r+=1)n[r]=Ye(ze(e,o,r));return{c(){for(let r=0;r<n.length;r+=1)n[r].c();t=ke()},m(r,i){for(let l=0;l<n.length;l+=1)n[l]&&n[l].m(r,i);L(r,t,i)},p(r,i){if(i&1){o=new Array(4);let l;for(l=0;l<o.length;l+=1){const s=ze(r,o,l);n[l]?n[l].p(s,i):(n[l]=Ye(s),n[l].c(),n[l].m(t.parentNode,t))}for(;l<n.length;l+=1)n[l].d(1);n.length=o.length}},d(r){ne(n,r),r&&A(t)}}}function Lt(e){let t,o,n,r;function i(u,a){return u[0]?At:Ot}let l=i(e),s=l(e);return{c(){t=m("div"),o=m("h3"),o.textContent="Next",n=S(),r=m("div"),s.c(),d(o,"class","text-white text-lg font-semibold mb-2 text-center"),d(r,"class","grid gap-0.5 w-full aspect-square justify-center items-center"),d(t,"class","next-piece w-full bg-gray-900 p-4 rounded-md border-2 border-gray-700 svelte-11fwc3f")},m(u,a){L(u,t,a),c(t,o),c(t,n),c(t,r),s.m(r,null)},p(u,[a]){l===(l=i(u))&&s?s.p(u,a):(s.d(1),s=l(u),s&&(s.c(),s.m(r,null)))},i:N,o:N,d(u){u&&A(t),s.d()}}}function Rt(e,t,o){let{nextTetromino:n}=t;return e.$$set=r=>{"nextTetromino"in r&&o(0,n=r.nextTetromino)},[n]}class Ct extends re{constructor(t){super(),oe(this,t,Rt,Lt,te,{nextTetromino:0})}}function Dt(e){let t,o,n,r,i,l,s,u,a,p,h,g,f,y,_,b,x,O,k,w,P,M,G,E,R;return{c(){t=m("div"),o=m("div"),n=m("div"),r=m("h3"),r.textContent="Score",i=S(),l=m("p"),s=j(e[0]),u=S(),a=m("div"),p=m("h3"),p.textContent="High Score",h=S(),g=m("p"),f=j(e[3]),y=S(),_=m("div"),b=m("h3"),b.textContent="Level",x=S(),O=m("p"),k=j(e[1]),w=S(),P=m("div"),M=m("h3"),M.textContent="Lines",G=S(),E=m("p"),R=j(e[2]),d(r,"class","text-white text-sm font-semibold"),d(l,"class","text-yellow-400 text-xl font-bold"),d(n,"class","stat svelte-57nfze"),d(p,"class","text-white text-sm font-semibold"),d(g,"class","text-red-400 text-xl font-bold"),d(a,"class","stat svelte-57nfze"),d(b,"class","text-white text-sm font-semibold"),d(O,"class","text-green-400 text-xl font-bold"),d(_,"class","stat svelte-57nfze"),d(M,"class","text-white text-sm font-semibold"),d(E,"class","text-blue-400 text-xl font-bold"),d(P,"class","stat svelte-57nfze"),d(o,"class","grid grid-cols-1 gap-3"),d(t,"class","scoreboard bg-gray-900 p-4 rounded-md border-2 border-gray-700 w-full svelte-57nfze")},m(I,U){L(I,t,U),c(t,o),c(o,n),c(n,r),c(n,i),c(n,l),c(l,s),c(o,u),c(o,a),c(a,p),c(a,h),c(a,g),c(g,f),c(o,y),c(o,_),c(_,b),c(_,x),c(_,O),c(O,k),c(o,w),c(o,P),c(P,M),c(P,G),c(P,E),c(E,R)},p(I,[U]){U&1&&Y(s,I[0]),U&8&&Y(f,I[3]),U&2&&Y(k,I[1]),U&4&&Y(R,I[2])},i:N,o:N,d(I){I&&A(t)}}}function Gt(e,t,o){let{score:n}=t,{level:r}=t,{lines:i}=t,{highScore:l=0}=t;return e.$$set=s=>{"score"in s&&o(0,n=s.score),"level"in s&&o(1,r=s.level),"lines"in s&&o(2,i=s.lines),"highScore"in s&&o(3,l=s.highScore)},[n,r,i,l]}class It extends re{constructor(t){super(),oe(this,t,Gt,Dt,te,{score:0,level:1,lines:2,highScore:3})}}function Nt(e){let t;return{c(){t=m("div"),t.innerHTML=`<h3 class="text-white text-lg font-semibold mb-3 text-center">Controls</h3> 
  
  <div class="grid grid-cols-2 gap-2 text-sm"><div class="text-gray-400">Left</div> 
    <div class="text-white font-medium">← / A</div> 
    
    <div class="text-gray-400">Right</div> 
    <div class="text-white font-medium">→ / D</div> 
    
    <div class="text-gray-400">Down</div> 
    <div class="text-white font-medium">↓ / S</div> 
    
    <div class="text-gray-400">Rotate</div> 
    <div class="text-white font-medium">↑ / W</div> 
    
    <div class="text-gray-400">Hard Drop</div> 
    <div class="text-white font-medium">Space</div> 
    
    <div class="text-gray-400">Pause</div> 
    <div class="text-white font-medium">P</div></div>`,d(t,"class","controls bg-gray-900 p-4 rounded-md border-2 border-gray-700 w-full svelte-1dl37er")},m(o,n){L(o,t,n)},p:N,i:N,o:N,d(o){o&&A(t)}}}class Ft extends re{constructor(t){super(),oe(this,t,null,Nt,te,{})}}function Ht(e,t,o){const n=e.slice();return n[33]=t[o],n[35]=o,n}function Xe(e){let t,o=e[0].isPaused?"Resume Game":"Pause Game",n,r,i;return{c(){t=m("button"),n=j(o),d(t,"class","bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none")},m(l,s){L(l,t,s),c(t,n),r||(i=z(t,"click",e[10]),r=!0)},p(l,s){s[0]&1&&o!==(o=l[0].isPaused?"Resume Game":"Pause Game")&&Y(n,o)},d(l){l&&A(t),r=!1,i()}}}function $e(e){let t,o,n,r,i,l,s,u,a,p,h,g,f,y,_,b,x,O,k,w,P,M=Array(10),G=[];for(let E=0;E<M.length;E+=1)G[E]=Mt(Ht(e,M,E));return{c(){t=m("div"),o=m("div"),n=m("h2"),n.textContent="Game Settings",r=S(),i=m("div"),l=m("label"),l.textContent="Starting Level (Higher = Faster)",s=S(),u=m("select");for(let E=0;E<G.length;E+=1)G[E].c();a=S(),p=m("div"),h=m("label"),g=m("input"),f=S(),y=m("span"),y.textContent="Enable Sound Effects",_=S(),b=m("div"),x=m("button"),x.textContent="Cancel",O=S(),k=m("button"),k.textContent="Save",d(n,"class","text-2xl font-bold text-white mb-4"),d(l,"for","level-select"),d(l,"class","block text-white text-sm font-medium mb-2"),d(u,"id","level-select"),d(u,"class","w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"),e[4]===void 0&&pe(()=>e[12].call(u)),d(i,"class","mb-4"),d(g,"type","checkbox"),d(g,"class","form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"),d(y,"class","text-white"),d(h,"class","flex items-center space-x-2"),d(p,"class","mb-4"),d(x,"class","bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"),d(k,"class","bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"),d(b,"class","flex justify-end space-x-3"),d(o,"class","bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"),d(t,"class","fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50")},m(E,R){L(E,t,R),c(t,o),c(o,n),c(o,r),c(o,i),c(i,l),c(i,s),c(i,u);for(let I=0;I<G.length;I+=1)G[I]&&G[I].m(u,null);Oe(u,e[4],!0),c(o,a),c(o,p),c(p,h),c(h,g),g.checked=e[2],c(h,f),c(h,y),c(o,_),c(o,b),c(b,x),c(b,O),c(b,k),w||(P=[z(u,"change",e[12]),z(g,"change",e[13]),z(x,"click",e[8]),z(k,"click",e[14])],w=!0)},p(E,R){R[0]&16&&Oe(u,E[4]),R[0]&4&&(g.checked=E[2])},d(E){E&&A(t),ne(G,E),w=!1,ee(P)}}}function Mt(e){let t,o=e[35]+1+"",n;return{c(){t=m("option"),n=j(o),t.__value=e[35]+1,t.value=t.__value},m(r,i){L(r,t,i),c(t,n)},p:N,d(r){r&&A(t)}}}function Ut(e){let t,o,n,r,i,l,s,u,a,p,h,g,f,y,_,b,x=e[2]?"🔊 Sound On":"🔇 Sound Off",O,k,w,P,M,G,E,R,I,U,q,le;l=new Ct({props:{nextTetromino:e[0].nextTetromino}}),u=new It({props:{score:e[0].score,level:e[0].level,lines:e[0].lines,highScore:e[1]}});let F=!e[0].gameOver&&Xe(e);P=new Ft({}),R=new Pt({props:{gameState:e[0]}}),R.$on("restart",e[7]),R.$on("resume",e[11]),R.$on("lineClear",Wt);let H=e[3]&&$e(e);return{c(){t=m("div"),o=m("div"),n=m("h1"),n.textContent="Blocks Game",r=S(),i=m("div"),se(l.$$.fragment),s=S(),se(u.$$.fragment),a=S(),p=m("div"),h=m("div"),g=m("div"),f=m("button"),f.textContent="Settings",y=S(),F&&F.c(),_=S(),b=m("button"),O=j(x),k=S(),w=m("div"),se(P.$$.fragment),M=S(),G=m("div"),E=m("div"),se(R.$$.fragment),I=S(),H&&H.c(),d(n,"class","text-3xl font-bold text-white mb-6"),d(i,"class","flex flex-col gap-6"),d(o,"class","w-64 bg-gray-800 p-4 flex flex-col border-r border-gray-700"),d(f,"class","bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none"),d(b,"class","bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none"),d(w,"class","mt-4 bg-gray-900 rounded-md"),d(g,"class","flex flex-col gap-3"),d(h,"class","absolute top-4 right-0 w-64 flex flex-col gap-4 pr-4"),d(E,"class","w-auto h-[90vh] aspect-[1/2]"),d(G,"class","flex justify-center items-center h-full max-h-screen pr-64"),d(p,"class","flex-1 p-4 relative"),d(t,"class","game-container min-h-screen flex svelte-13zb5m9")},m(T,W){L(T,t,W),c(t,o),c(o,n),c(o,r),c(o,i),K(l,i,null),c(i,s),K(u,i,null),c(t,a),c(t,p),c(p,h),c(h,g),c(g,f),c(g,y),F&&F.m(g,null),c(g,_),c(g,b),c(b,O),c(g,k),c(g,w),K(P,w,null),c(p,M),c(p,G),c(G,E),K(R,E,null),c(t,I),H&&H.m(t,null),U=!0,q||(le=[z(f,"click",e[8]),z(b,"click",e[9])],q=!0)},p(T,W){const fe={};W[0]&1&&(fe.nextTetromino=T[0].nextTetromino),l.$set(fe);const v={};W[0]&1&&(v.score=T[0].score),W[0]&1&&(v.level=T[0].level),W[0]&1&&(v.lines=T[0].lines),W[0]&2&&(v.highScore=T[1]),u.$set(v),T[0].gameOver?F&&(F.d(1),F=null):F?F.p(T,W):(F=Xe(T),F.c(),F.m(g,_)),(!U||W[0]&4)&&x!==(x=T[2]?"🔊 Sound On":"🔇 Sound Off")&&Y(O,x);const C={};W[0]&1&&(C.gameState=T[0]),R.$set(C),T[3]?H?H.p(T,W):(H=$e(T),H.c(),H.m(t,null)):H&&(H.d(1),H=null)},i(T){U||(J(l.$$.fragment,T),J(u.$$.fragment,T),J(P.$$.fragment,T),J(R.$$.fragment,T),U=!0)},o(T){ie(l.$$.fragment,T),ie(u.$$.fragment,T),ie(P.$$.fragment,T),ie(R.$$.fragment,T),U=!1},d(T){T&&A(t),Z(l),Z(u),F&&F.d(),Z(P),Z(R),H&&H.d(),q=!1,ee(le)}}}const Wt=()=>null;function jt(e,t,o){let n=ge(),r,i=de(n.level),l=0,s=!0,u,a=!1,p=1,h,g,f,y,_,b;function x(v){if(s)switch(console.log("Playing sound:",v),v){case"move":h.currentTime=0,h.play().catch(C=>console.error("Error playing move sound:",C));break;case"rotate":g.currentTime=0,g.play().catch(C=>console.error("Error playing rotate sound:",C));break;case"drop":f.currentTime=0,f.play().catch(C=>console.error("Error playing drop sound:",C));break;case"clear":y.currentTime=0,y.play().catch(C=>console.error("Error playing clear sound:",C));break;case"levelUp":_.currentTime=0,_.play().catch(C=>console.error("Error playing levelUp sound:",C));break;case"gameOver":b.currentTime=0,b.play().catch(C=>console.error("Error playing gameOver sound:",C));break}}function O(v=p){o(0,n=ge()),o(0,n.level=v,n),o(0,n.prevLevel=v,n),o(0,n.gameOver=!0,n),i=de(v)}function k(){w(),i=de(n.level),r=setInterval(()=>{const v=n.level;o(0,n=xt(n)),n.level!==v&&x("levelUp"),n.level!==n.prevLevel&&(i=de(n.level),k())},i)}function w(){r&&(clearInterval(r),r=void 0)}function P(v){switch(v.key){case"p":case"P":v.preventDefault(),n.isPaused&&!a?(o(0,n=B(n,D.RESUME)),k()):!a&&!n.gameOver&&(o(0,n=B(n,D.PAUSE)),w());break;case"ArrowLeft":case"a":case"A":case"ArrowRight":case"d":case"D":case"ArrowDown":case"s":case"S":case"ArrowUp":case"w":case"W":case" ":if(n.gameOver||n.isPaused)return;v.preventDefault(),v.key==="ArrowLeft"||v.key.toLowerCase()==="a"?(o(0,n=B(n,D.LEFT)),x("move")):v.key==="ArrowRight"||v.key.toLowerCase()==="d"?(o(0,n=B(n,D.RIGHT)),x("move")):v.key==="ArrowDown"||v.key.toLowerCase()==="s"?(o(0,n=B(n,D.DOWN)),x("move")):v.key==="ArrowUp"||v.key.toLowerCase()==="w"?(o(0,n=B(n,D.ROTATE)),x("rotate")):v.key===" "&&(o(0,n=B(n,D.HARD_DROP)),x("drop"));break;case"r":case"R":v.preventDefault(),M();break}}function M(){R(),o(0,n=ge()),o(0,n.level=p,n),o(0,n.prevLevel=p,n),o(0,n.gameOver=!1,n),k()}function G(){o(3,a=!a),a&&!n.isPaused&&!n.gameOver&&(o(0,n=B(n,D.PAUSE)),w())}function E(){o(2,s=!s),localStorage.setItem("blocksGameSoundEnabled",String(s)),console.log("Sound toggled:",s),s?q():le()}function R(){if(n.score>l){o(1,l=n.score);try{localStorage.setItem("highScore",l.toString())}catch(v){console.error("Could not save high score to localStorage:",v)}}}function I(){try{const v=localStorage.getItem("highScore");v&&o(1,l=parseInt(v,10));const C=localStorage.getItem("blocksGameSoundEnabled");C!==null&&o(2,s=C==="true")}catch(v){console.error("Could not load preferences from localStorage:",v)}}function U(){console.log("Setting up background music"),u=new Audio("/sounds/theme.wav"),u.loop=!0,u.volume=.4}function q(){console.log("Attempting to play background music",s),u&&s&&!n.gameOver&&u.play().catch(v=>console.error("Audio playback error:",v))}function le(){u&&u.pause()}ot(()=>{console.log("Component mounted");const v=localStorage.getItem("blocksGameSoundEnabled");v!==null&&(o(2,s=v==="true"),console.log("Loaded sound preference:",s)),I(),h=new Audio("/sounds/move.wav"),g=new Audio("/sounds/rotate.wav"),f=new Audio("/sounds/drop.wav"),y=new Audio("/sounds/clear.wav"),_=new Audio("/sounds/levelup.wav"),b=new Audio("/sounds/gameover.wav"),U();const C=()=>{s&&(console.log("User interaction - starting audio"),q()),window.removeEventListener("click",C),window.removeEventListener("keydown",C)};return window.addEventListener("click",C),window.addEventListener("keydown",C),window.addEventListener("keydown",P),O(p),()=>{window.removeEventListener("keydown",P),w()}}),rt(()=>{R(),w(),le(),window.removeEventListener("keydown",P)});const F=()=>{n.isPaused&&!a?(o(0,n=B(n,D.RESUME)),k()):a||(o(0,n=B(n,D.PAUSE)),w())},H=()=>{n.isPaused&&(o(0,n=B(n,D.RESUME)),k())};function T(){p=tt(this),o(4,p)}function W(){s=this.checked,o(2,s)}const fe=()=>{G(),n.gameOver&&M()};return e.$$.update=()=>{e.$$.dirty[0]&1&&n.gameOver&&x("gameOver")},[n,l,s,a,p,k,w,M,G,E,F,H,T,W,fe]}class Bt extends re{constructor(t){super(),oe(this,t,jt,Ut,te,{},null,[-1,-1])}}function zt(e){let t,o,n;return o=new Bt({}),{c(){t=m("main"),se(o.$$.fragment),d(t,"class","svelte-ipu353")},m(r,i){L(r,t,i),K(o,t,null),n=!0},p:N,i(r){n||(J(o.$$.fragment,r),n=!0)},o(r){ie(o.$$.fragment,r),n=!1},d(r){r&&A(t),Z(o)}}}class Yt extends re{constructor(t){super(),oe(this,t,null,zt,te,{})}}new Yt({target:document.getElementById("app")});
