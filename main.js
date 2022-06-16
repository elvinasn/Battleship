(()=>{"use strict";var n={426:(n,e,t)=>{t.d(e,{Z:()=>c});var a=t(81),r=t.n(a),i=t(645),o=t.n(i)()(r());o.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);"]),o.push([n.id,'* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: "Roboto", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  align-items: center;\n  min-height: calc(100vh - 160px);\n  flex-direction: column;\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n.gameboards {\n  display: flex;\n  gap: 20px;\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 550px;\n  height: 550px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship,\n.placeship {\n  background: green;\n}\n.colliding {\n  background: rgb(187, 59, 59);\n}\n.hit::after {\n  position: absolute;\n  content: "";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n.para {\n  text-align: center;\n}\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n.gamemodes__wrapper > p,\n.para {\n  font-size: 2.5rem;\n  font-weight: 700;\n}\n\n.gamemodes__wrapper > button {\n  padding: 20px;\n  font-weight: 700;\n  font-size: 2rem;\n}\nbutton:hover:not(:disabled) {\n  opacity: 0.8;\n}\nbutton {\n  border: none;\n  color: #eee;\n  background-color: #383663;\n  cursor: pointer;\n  border: 1px solid #eee;\n  transition: 0.3s ease;\n  border-radius: 15px;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  background-color: gray;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\nform > label {\n  font-size: 2rem;\n  font-weight: 700;\n}\nform > input {\n  font-size: 2rem;\n}\nform > button {\n  padding: 10px 20px;\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.main-btn {\n  font-size: 1.25rem;\n  font-weight: 700;\n  padding: 10px 20px;\n  min-width: 200px;\n}\n\n.infoText__wrapper {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  justify-content: center;\n}\n\n.infoText__wrapper > p {\n  font-size: 1.25rem;\n  font-weight: 700;\n}\n\n.buttons__wrapper {\n  display: flex;\n  gap: 10px;\n}\n.toggle {\n  --width: 80px;\n  --height: calc(var(--width) / 3);\n\n  position: relative;\n  display: inline-block;\n  width: var(--width);\n  height: 30px;\n  color: white;\n  background-color: #383663;\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n}\n\n.toggle input {\n  display: none;\n}\n\n.toggle .labels {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  font-size: 16px;\n  transition: all 0.4s ease-in-out;\n  overflow: hidden;\n}\n\n.toggle .labels::after {\n  content: attr(data-off);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle .labels::before {\n  content: attr(data-on);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: calc(var(--width) * -1);\n  height: 100%;\n  width: 100%;\n  text-align: center;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle input:checked ~ .labels::after {\n  transform: translateX(var(--width));\n}\n\n.toggle input:checked ~ .labels::before {\n  transform: translateX(var(--width));\n}\n.modal__header {\n  color: #0c0a3e;\n  font-size: 2rem;\n  font-weight: 700;\n}\n@media all and (max-width: 1200px) {\n  .gameboards {\n    flex-direction: column;\n  }\n}\n@media all and (max-width: 800px) {\n  h1,\n  h2 {\n    font-size: 1.25rem;\n  }\n\n  header,\n  footer {\n    height: 50px;\n  }\n  main {\n    padding-top: 20px;\n    min-height: calc(100vh - 100px);\n  }\n}\n@media all and (max-width: 580px) {\n  .gamemodes__wrapper > p {\n    font-size: 2rem;\n  }\n  .gamemodes__wrapper > button,\n  .modal__header,\n  form > input,\n  .gamemodes__wrapper > button,\n  form > label,\n  .para {\n    font-size: 1.5rem;\n  }\n  .main-btn,\n  .infoText__wrapper > p {\n    font-size: 1rem;\n  }\n  .main-btn {\n    min-width: 150px;\n  }\n  .gameboard_container {\n    width: 90vw;\n    height: 90vw;\n  }\n}\n',""]);const c=o},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",a=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),a&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),a&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,a,r,i){"string"==typeof n&&(n=[[null,n,void 0]]);var o={};if(a)for(var c=0;c<this.length;c++){var d=this[c][0];null!=d&&(o[d]=!0)}for(var s=0;s<n.length;s++){var l=[].concat(n[s]);a&&o[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),e.push(l))}},e}},81:n=>{n.exports=function(n){return n[1]}},379:n=>{var e=[];function t(n){for(var t=-1,a=0;a<e.length;a++)if(e[a].identifier===n){t=a;break}return t}function a(n,a){for(var i={},o=[],c=0;c<n.length;c++){var d=n[c],s=a.base?d[0]+a.base:d[0],l=i[s]||0,u="".concat(s," ").concat(l);i[s]=l+1;var p=t(u),h={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==p)e[p].references++,e[p].updater(h);else{var f=r(h,a);a.byIndex=c,e.splice(c,0,{identifier:u,updater:f,references:1})}o.push(u)}return o}function r(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var i=a(n=n||[],r=r||{});return function(n){n=n||[];for(var o=0;o<i.length;o++){var c=t(i[o]);e[c].references--}for(var d=a(n,r),s=0;s<i.length;s++){var l=t(i[s]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}i=d}}},569:n=>{var e={};n.exports=function(n,t){var a=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var a="";t.supports&&(a+="@supports (".concat(t.supports,") {")),t.media&&(a+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(a+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),a+=t.css,r&&(a+="}"),t.media&&(a+="}"),t.supports&&(a+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(a,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(a){var r=e[a];if(void 0!==r)return r.exports;var i=e[a]={id:a,exports:{}};return n[a](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var a in e)t.o(e,a)&&!t.o(n,a)&&Object.defineProperty(n,a,{enumerable:!0,get:e[a]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0,(()=>{var n=t(379),e=t.n(n),a=t(795),r=t.n(a),i=t(569),o=t.n(i),c=t(565),d=t.n(c),s=t(216),l=t.n(s),u=t(589),p=t.n(u),h=t(426),f={};function m(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function g(n,e){for(var t=0;t<e.length;t++){var a=e[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(n,a.key,a)}}function v(n,e,t){return e&&g(n.prototype,e),t&&g(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}f.styleTagTransform=p(),f.setAttributes=d(),f.insert=o().bind(null,"head"),f.domAPI=r(),f.insertStyleElement=l(),e()(h.Z,f),h.Z&&h.Z.locals&&h.Z.locals;const b=function(){function n(){m(this,n),this.board=[],this.ships=[];for(var e=0;e<100;e++)this.board.push(!1)}return v(n,[{key:"placeShip",value:function(n,e,t,a){for(var r=n,i=0;i<a;i++)e.location.push(r),r+="x"===t.toLowerCase()?1:10;this.ships.push(e)}},{key:"receiveAttack",value:function(n){this.board[n]=!0,this.isShip(n)&&this.hitShip(n)}},{key:"isShip",value:function(n){return this.ships.some((function(e){return e.location.includes(n)}))}},{key:"hitShip",value:function(n){this.ships.find((function(e){return e.location.includes(n)})).hits.push(n)}},{key:"isAllSunk",value:function(){return this.ships.every((function(n){return n.isSunk()}))}},{key:"getShipsCoords",value:function(){for(var n=[],e=0;e<100;e++)this.isShip(e)&&n.push(e);return n}},{key:"checkIfCollided",value:function(n){var e=this;return n.some((function(n){return e.ships.some((function(e){return e.location.includes(n)}))}))}},{key:"checkIfMultipleLines",value:function(n,e){if("x"===e){var t=Math.floor(n[0]/10);return!(n.length===n.filter((function(n){return Math.floor(n/10)===t})).length)}if("y"===e){var a=n[0]%10;return!(n.length===n.filter((function(n){return n%10===a})).length&&!n.some((function(n){return n>100})))}}}]),n}(),x=function(){function n(e){m(this,n),this.name=e,this.gameBoard=new b}return v(n,[{key:"attack",value:function(n,e){n.gameBoard.receiveAttack(e)}}]),n}(),y=function(){function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];m(this,n),this.name=e,this.location=t,this.hits=[]}return v(n,[{key:"hit",value:function(n){this.hits.push(n)}},{key:"isSunk",value:function(){var n=this;return this.location.every((function(e){return n.hits.includes(e)}))}}]),n}();var w,E,L,C,k,M,_,A=(w=new x("Elvinas"),E=new x("AI"),C=function(n){n.gameBoard.ships=[];var e,t=["x","y"],a="x",r=[];L.forEach((function(i){for(;0===r.length||n.gameBoard.checkIfCollided(r)||n.gameBoard.checkIfMultipleLines(r,a);){r=[],a=t[Math.floor(Math.random()*t.length)];for(var o=e=Math.floor(100*Math.random());o<e+("y"===a?10*i.length:i.length);"y"===a?o+=10:o++)r.push(o)}n.gameBoard.placeShip(e,new y(i.name),a,i.length)}))},{init:function(){w.gameBoard=new b,E.gameBoard=new b,C(E)},player:w,computer:E,startingShips:L=[{name:"Carrier",length:5},{name:"Battleship",length:4},{name:"Cruiser",length:3},{name:"Submarine",length:3},{name:"Destroyer",length:2}],putRandomShips:C}),S=(k=0,M=function(n,e,t){return'<div class="gameboard_line">'.concat(n.map((function(n){return"".concat(_(e.includes(k),n,t))})).join(""),"</div>")},_=function(n,e,t){return k+=1,'<div class="gameboard_cell '.concat(n&&t?"ship":""," ").concat(e?"hit":""," ").concat(!t&&n&&e?"enemy-ship-hit":"",'" data-index="').concat(k-1,'"></div>')},{getGameboard:function(n,e,t,a){var r;k=0;for(var i=[],o=0,c=n.board.length;o<c;o+=10)i.push(n.board.slice(o,o+10));return r=n.getShipsCoords(),'<div class="wrapper"><h2>'.concat(e,'</h2><div class="gameboard_container" id="').concat(t,'">').concat(i.map((function(n){return M(n,r,a)})).join(""),"</div></div>")}}),T=function(n){var e=[],t=[];n.gameBoard.board.forEach((function(n,a){return n?t.push(a):e.push(a)}));var a=function(n,e){return n.filter((function(n){if(e.gameBoard.isShip(n))return!e.gameBoard.ships.find((function(e){return e.location.includes(n)})).isSunk()}))}(t,n),r=function(n){return n.filter((function(n,e,t){return t.includes(n+1)&&n%10!=9||t.includes(n-1)&&n%10!=0||t.includes(n+10)&&n+10<100||t.includes(n-10)&&n-10>0}))}(a);if(r.length>0){var i=function(n,e){var t=[];if("x"==(n[1]-n[0]==1?"x":"y")){n[0]%10!=0&&t.push(n[0]-1);var a=n.find((function(n,e,t){return!t.includes(n+1)}));Math.floor(n[0]/10)===Math.floor((a+1)/10)&&t.push(a+1)}else{var r=n[0]-10;r>0&&t.push(r);var i=n.find((function(n,e,t){return!t.includes(n+10)}));i+10<100&&t.push(i+10)}var o=t.filter((function(n){return e.includes(n)}));if(o.length>0)return o[Math.floor(Math.random()*o.length)]}(r,e);if(i)return i}if(t.length>0){var o=function(n,e){var t=n[0],a=[],r=n[0]-1;Math.floor(t/10)===Math.floor(r/10)&&a.push(r);var i=n[0]+1;Math.floor(t/10)===Math.floor(i/10)&&a.push(i);var o=t-10;o>0&&a.push(o);var c=t+10;if(c<100&&a.push(c),(a=a.filter((function(n){return e.includes(n)}))).length>0)return a[Math.floor(Math.random()*a.length)]}(a,e);if(o)return o}var c=function(n,e){var t=[];e.forEach((function(n){t.push(n+1),t.push(n-1),t.push(n+10),t.push(n-10)})),t=t.filter((function(n,e,t){return t.indexOf(n)===e}));var a=n.filter((function(n){return!t.includes(n)}));if(a.length>0)return a[Math.floor(Math.random()*a.length)]}(e,t);return c||e[Math.floor(Math.random()*e.length)]},B=function(){var n,e=new x("Elvinas"),t=new x("AI"),a=document.querySelector("main"),r=document.querySelector("#modal-container"),i=document.createElement("button");i.classList.add("main-btn"),i.textContent="GO TO MAIN SCREEN",i.addEventListener("click",(function(){o()}));var o=function(){A.init(e,t),d()},c=function e(){a.innerHTML="",a.appendChild(i);var t=document.createElement("div");t.classList.add("gameboards"),t.insertAdjacentHTML("afterbegin",S.getGameboard(A.player.gameBoard,"".concat(A.player.name," board"),"PLAYER1",!0)),t.insertAdjacentHTML("beforeEnd",S.getGameboard(A.computer.gameBoard,"".concat(A.computer.name," board"),"PLAYER2",!1)),a.appendChild(t),document.getElementById("PLAYER1"),(n=document.getElementById("PLAYER2")).classList.add("cursor-pointer"),n.addEventListener("click",(function(n){if(!n.target.classList.contains("hit")&&n.target.classList.contains("gameboard_cell")){if(A.computer.gameBoard.receiveAttack(Number(n.target.dataset.index)),e(),A.computer.gameBoard.isAllSunk())return void h();var t=T(A.player);A.player.gameBoard.receiveAttack(t),A.player.gameBoard.isAllSunk()&&h(),e()}}))},d=function(){a.innerHTML="";var n=document.createElement("div");n.classList.add("gamemodes__wrapper");var e=document.createElement("p");e.textContent="SELECT GAME MODE",n.appendChild(e);var t=document.createElement("button");t.textContent="PLAYER VS AI",t.classList.add("btn"),t.classList.add("btn-primary"),n.appendChild(t),t.addEventListener("click",(function(){l()}));var r=document.createElement("button");r.textContent="PLAYER VS PLAYER",r.disabled=!0,n.appendChild(r),a.appendChild(n)},s=function(){a.innerHTML="",a.appendChild(i);var n=document.createElement("button"),e=document.createElement("p");e.classList.add("para"),e.textContent="HOW DO YOU WANT TO PLACE SHIPS?",n.textContent="RANDOM",n.classList.add("main-btn"),n.addEventListener("click",(function(){u(A.player)}));var t=document.createElement("button");t.textContent="CUSTOM",t.classList.add("main-btn"),t.addEventListener("click",(function(){p(A.player,0)})),a.appendChild(e),a.appendChild(n),a.appendChild(t)},l=function(){a.innerHTML="",a.appendChild(i);var n=document.createElement("div");n.classList.add("form__wrapper");var e=document.createElement("form"),t=document.createElement("label");t.textContent="ENTER YOUR NAME:",t.setAttribute("for","name");var r=document.createElement("input");r.type="text",r.name="name",r.id="name";var o=document.createElement("button");o.textContent="START",""===r.value&&(o.disabled=!0),r.addEventListener("input",(function(){""!==r.value?o.disabled=!1:o.disabled=!0})),o.addEventListener("click",(function(){A.player.name=r.value,s()})),e.appendChild(t),e.appendChild(r),e.appendChild(o),n.appendChild(e),a.appendChild(n)},u=function n(e){a.innerHTML="",a.appendChild(i);var t=document.createElement("div");t.classList.add("buttons__wrapper");var r=document.createElement("button");r.textContent="START",r.classList.add("main-btn"),t.appendChild(r),r.addEventListener("click",(function(){c()}));var o=document.createElement("button");o.textContent="RANDOMIZE",o.classList.add("main-btn"),o.addEventListener("click",(function(){n(e)})),t.appendChild(o),a.appendChild(t),A.putRandomShips(e),A.startingShips,a.insertAdjacentHTML("beforeend",S.getGameboard(e.gameBoard,"".concat(e.name," board"),"PLAYER1",!0))},p=function n(e,t){a.innerHTML="",a.appendChild(i);var r=A.startingShips;a.insertAdjacentHTML("beforeend",S.getGameboard(e.gameBoard,"".concat(e.name," board"),"PLAYER1",!0));var o=document.querySelector(".gameboard_container");if(t>=A.startingShips.length){var d=document.createElement("button");d.classList.add("main-btn"),d.textContent="START",a.insertBefore(d,o.parentElement),d.addEventListener("click",(function(){c()})),o.classList.remove("cursor-pointer")}else{var s,l,u,p=[],h=r[t],f=document.createElement("p");f.textContent="Place your ".concat(h.name);var m=document.createElement("div");m.classList.add("infoText__wrapper"),m.appendChild(f);var g=document.createElement("label");g.classList.add("toggle");var v=document.createElement("input");v.setAttribute("type","checkbox");var b=document.createElement("span");b.classList.add("labels"),b.setAttribute("data-on","Y"),b.setAttribute("data-off","X"),g.appendChild(v),g.appendChild(b),m.appendChild(g),a.insertBefore(m,o.parentElement),o.classList.add("cursor-pointer"),o.addEventListener("mouseover",(function(n){p=[],u=v.checked?"y":"x";for(var t=Number(n.target.dataset.index);t<Number(n.target.dataset.index)+(v.checked?10*h.length:h.length);v.checked?t+=10:t++)p.push(t);l=!e.gameBoard.checkIfCollided(p)&&!e.gameBoard.checkIfMultipleLines(p,u),s=l?"placeship":"colliding",p.forEach((function(n){var e=document.querySelector("[data-index='".concat(n,"']"));null!==e&&e.classList.add(s)}))}));var x=document.querySelectorAll(".gameboard_cell");(x=Array.from(x)).forEach((function(n){return n.addEventListener("mouseleave",(function(n){p.forEach((function(n){var e=document.querySelector("[data-index='".concat(n,"']"));null!==e&&e.classList.remove(s)}))}))})),o.addEventListener("click",(function(a){l&&a.target.classList.contains("gameboard_cell")&&(e.gameBoard.placeShip(Number(a.target.dataset.index),new y(h.name),u,h.length),n(e,t+1))}))}},h=function(){r.classList.add("show-modal");var n=document.createElement("div");n.classList.add("modal");var a=document.createElement("p");a.classList.add("modal__header"),a.textContent="".concat(A.computer.gameBoard.isAllSunk()?A.player.name:A.computer.name," has won!"),n.appendChild(a);var i=document.createElement("button");i.textContent="PLAY AGAIN",i.classList.add("main-btn"),i.addEventListener("click",(function(){A.init(e,t),s(),r.classList.remove("show-modal"),r.innerHTML=""})),n.appendChild(i),r.appendChild(n)};return{init:o}}();B.init()})()})();