(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{107:function(e,r){},111:function(e,r,t){},112:function(e,r,t){"use strict";t.r(r);var n=t(8),o=t(2),i=t.n(o),a=t(61),s=t(35),l=t(37),c=t(65),u=t(3),d=t.n(u),g=t(4),f=t(5),v=t(7),p=t(10),A=t(11),h=t(63),C=t(62),y=new(t.n(C).a),k=function(e,r){y.addEventListener("message",(function t(n){var o=n.data;if(o&&o.type){var i=o.type,a=o.payload;e===i&&(r(a),window.removeEventListener("message",t))}}))},b=function(e,r){y.postMessage({type:e,payload:r})},D=t(9),O=t(26),L=t.n(O),I=t(14);t(74);var j=function(e){var r=e.disk,t=e.index,o=e.log,a=e.children,s=function(e){var r=i.a.useRef();return i.a.useEffect((function(){r.current=e}),[e]),r.current}(r),l=i.a.createRef();return i.a.useEffect((function(){var e=l.current;if(void 0!==t&&void 0!==o&&void 0!==s&&s!==r&&e){var n=function(e){for(var r=e.length-1;r>=0;r--)if("MAKE_MOVE"===e[r].action.type)return e[r]}(o);if(void 0!==n){var i=Object(D.getCoordsAtIndex)(t),a=Object(I.a)(i,2),c=a[0],u=a[1],d=Object(D.getCoordsAtIndex)(n.action.payload.args[0]),g=Object(I.a)(d,2),f=g[0],v=g[1],p=50*Math.max(Math.abs(c-f),Math.abs(u-v));e.style.animationDelay="".concat(p/1e3,"s"),e.style.animationDuration="0.5s"}}}),[l,r,s,t,o]),Object(n.jsx)("div",{ref:l,className:L()("DiskDisplay",{"DiskDisplay--black":r===D.Disk.BLACK,"DiskDisplay--white":r===D.Disk.WHITE}),children:a})},x=(t(75),function(e){var r=e.black,t=e.white,o=e.currentPlayer,i=e.winner;return Object(n.jsxs)("div",{className:L()("Scores",null!==i&&"Scores--game-over"),children:[Object(n.jsxs)("div",{className:L()("Scores-player",{"Scores-player--current-player":o===D.Disk.BLACK,"Scores-player--winner":i===D.Disk.BLACK}),children:[Object(n.jsx)("div",{className:"Scores-player-disk",children:Object(n.jsx)(j,{disk:D.Disk.BLACK})}),Object(n.jsx)("div",{className:"Scores-player-score",children:r})]}),Object(n.jsxs)("div",{className:L()("Scores-player",{"Scores-player--current-player":o===D.Disk.WHITE,"Scores-player--winner":i===D.Disk.WHITE}),children:[Object(n.jsx)("div",{className:"Scores-player-disk",children:Object(n.jsx)(j,{disk:D.Disk.WHITE})}),Object(n.jsx)("div",{className:"Scores-player-score",children:t})]})]})}),m=(t(76),function(e){var r=e.onClick;return Object(n.jsx)("button",{className:"MoveDisplay",type:"button",onClick:r})}),B=(t(77),function(e){var r=e.G,t=e.ctx,o=e.moves,i=e.playerID,a=e.log,l=null!=i&&t.currentPlayer===i,c=Object(s.getCurrentPlayer)(t),u=Object(D.getWinner)(r.board);return Object(n.jsxs)("div",{className:"OthelloBoard",children:[Object(n.jsx)(x,{black:Object(D.getScore)(r.board,D.Disk.BLACK),white:Object(D.getScore)(r.board,D.Disk.WHITE),currentPlayer:c,winner:t.gameover?u:null}),Object(n.jsx)("div",{className:"OthelloBoard-square",children:Object(n.jsx)("div",{className:"OthelloBoard-grid",children:Array.from(new Array(D.BOARD_TILES),(function(e,i){var s=Object(D.getDiskAtIndex)(r.board,i),u=l&&Object(D.isLegalMoveForIndex)(r.board,i,c);return Object(n.jsxs)("div",{className:"OthelloBoard-tile",children:[null!==s&&Object(n.jsx)(j,{disk:s,index:i,log:a,children:r.lastPlaced===i&&Object(n.jsx)("span",{children:t.turn-1})},"disk-".concat(i)),u&&Object(n.jsx)(m,{onClick:function(){return o.clickCell(i)}})]},"tile-".concat(i))}))})})]})}),E=(t(78),Object(c.a)({debug:!1,game:s.OthelloGame,board:B,multiplayer:Object(l.a)({bots:{1:function(e){var r=e.iterations,t=e.playoutDepth,n=e.minThinkTime,o=void 0===n?500:n,i=e.thinkDelay,a=void 0===i?0:i;return function(e){Object(p.a)(i,e);var n=Object(A.a)(i);function i(){var e;Object(f.a)(this,i);for(var s=arguments.length,l=new Array(s),c=0;c<s;c++)l[c]=arguments[c];return(e=n.call.apply(n,[this].concat(l))).setOpt("iterations",r),e.setOpt("playoutDepth",t),b("INITIALIZE_BOT",{iterations:r,playoutDepth:t,minThinkTime:o,thinkDelay:a}),e}return Object(v.a)(i,[{key:"play",value:function(){var e=Object(g.a)(d.a.mark((function e(){var r,t,n,o,i=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=new Promise((function(e){k("PLAY_RESULT",e)})),t=i.length,n=new Array(t),o=0;o<t;o++)n[o]=i[o];return b("PLAY",n),e.next=5,r;case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),i}(h.a)}({iterations:500,playoutDepth:59})}})})),M=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(E,{playerID:"0"})})},T=function(){return document.documentElement.style.setProperty("--vh",.01*window.innerHeight+"px")};window.addEventListener("resize",T),T();t(111);var w=document.getElementById("root");Object(a.render)(Object(n.jsx)(M,{}),w)},35:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.OthelloGame=r.getCurrentPlayer=r.diskToPlayer=r.playerToDisk=void 0;var n=t(9);r.playerToDisk=function(e){switch(e){case"0":return n.Disk.BLACK;case"1":return n.Disk.WHITE;default:throw new Error("Unexpected player ID: "+e)}};r.diskToPlayer=function(e){return String(e)};r.getCurrentPlayer=function(e){return r.playerToDisk(e.currentPlayer)},r.OthelloGame={setup:function(){var e=n.createBoard();return n.initializeBoard(e),{board:e,lastPlaced:null}},turn:{moveLimit:1,order:{first:function(e,r){return 0},next:function(e,t){var o=t.playOrderPos,i=(o+1)%t.numPlayers,a=t.playOrder[i],s=r.playerToDisk(a);return n.hasLegalMoves(e.board,s)?i:o}}},moves:{clickCell:function(e,t,o){var i=e.board,a=r.getCurrentPlayer(t);if(!n.isLegalMoveForIndex(i,o,a))return"INVALID_MOVE";var s=i.slice(0),l=n.playMoveAtIndex(s,o,a);return n.applyMoves(s,l),{board:s,lastPlaced:o}}},endIf:function(e,t){var o=e.board;if(n.isGameOver(o)){var i=n.getWinner(o);return null===i?{draw:!0}:{winner:r.diskToPlayer(i)}}},ai:{enumerate:function(e,t){var o=e.board,i=r.getCurrentPlayer(t);return n.getLegalMoveIndexesForPlayer(o,i).map((function(e){return{move:"clickCell",args:[e]}}))}}}},62:function(e,r,t){var n=t(73),o=[];e.exports=function(){var e=new Worker(t.p+"81c499fc988a691565d8.worker.js",{name:"[hash].worker.js"});return n(e,o),e}},74:function(e,r,t){},75:function(e,r,t){},76:function(e,r,t){},77:function(e,r,t){},78:function(e,r,t){},9:function(e,r,t){"use strict";var n,o=this&&this.__spreadArrays||function(){for(var e=0,r=0,t=arguments.length;r<t;r++)e+=arguments[r].length;var n=Array(e),o=0;for(r=0;r<t;r++)for(var i=arguments[r],a=0,s=i.length;a<s;a++,o++)n[o]=i[a];return n};Object.defineProperty(r,"__esModule",{value:!0}),r.getCardinalPositionFromIndex=r.getCardinalPositionFromCoords=r.getWinner=r.getScore=r.isGameOver=r.applyMoves=r.playMoveAtIndex=r.playMoveAtCoords=r.getLegalMoveCoordsForPlayer=r.hasLegalMoves=r.getLegalMoveIndexesForPlayer=r.isLegalMoveForIndex=r.isLegalMoveForCoords=r.getOpponent=r.getAllLines=r.getLine=r.getAllNeighboringCoords=r.getNeighboringCoords=r.isBoardFull=r.assertBoardLegal=r.isBoardLegal=r.toString=r.initializeBoard=r.hasDiskAtIndex=r.hasDiskAtCoords=r.setDiskAtIndex=r.setDiskAtCoords=r.getDiskAtIndex=r.getDiskAtCoords=r.getCoordsAtIndex=r.createBoard=r.FIRST_MOVE=r.Disk=r.BOARD_LENGTH=r.BOARD_TILES=r.BOARD_SIZE=void 0,r.BOARD_SIZE=8,r.BOARD_TILES=Math.pow(r.BOARD_SIZE,2),r.BOARD_LENGTH=2*r.BOARD_SIZE,function(e){e[e.BLACK=0]="BLACK",e[e.WHITE=1]="WHITE"}(n=r.Disk||(r.Disk={})),r.FIRST_MOVE=n.BLACK;r.createBoard=function(){return new Uint8Array(16)};r.getCoordsAtIndex=function(e){return[e%8,Math.floor(e/8)]};r.getDiskAtCoords=function(e,r,t){return e[t+0]&1<<r?n.BLACK:e[t+8]&1<<r?n.WHITE:null};r.getDiskAtIndex=function(e,t){return r.getDiskAtCoords.apply(void 0,o([e],r.getCoordsAtIndex(t)))};r.setDiskAtCoords=function(e,r,t,o){e[t+0]&=~(1<<r),e[t+8]&=~(1<<r),o===n.BLACK&&(e[t+0]|=1<<r),o===n.WHITE&&(e[t+8]|=1<<r)};r.setDiskAtIndex=function(e,t,n){return r.setDiskAtCoords.apply(void 0,o([e],r.getCoordsAtIndex(t),[n]))};r.hasDiskAtCoords=function(e,t,n){return null!==r.getDiskAtCoords(e,t,n)};r.hasDiskAtIndex=function(e,t){return null!==r.getDiskAtCoords.apply(void 0,o([e],r.getCoordsAtIndex(t)))};r.initializeBoard=function(e){e.fill(0),r.setDiskAtCoords(e,3,3,n.WHITE),r.setDiskAtCoords(e,4,3,n.BLACK),r.setDiskAtCoords(e,3,4,n.BLACK),r.setDiskAtCoords(e,4,4,n.WHITE)};r.toString=function(e,t){void 0===t&&(t=!1);for(var o=t?"\u25cb":"\u25cf",i=t?"\u25cf":"\u25cb",a="",s=0;s<8;s++){for(var l=0;l<8;l++){var c=r.getDiskAtCoords(e,l,s);c===n.BLACK?a+=o:c===n.WHITE?a+=i:a+="\xb7"}s<7&&(a+="\n")}return a};r.isBoardLegal=function(e){for(var r=0;r<8;r++)if(e[r]&e[r+8])return!1;return!0};r.assertBoardLegal=function(e){if(!r.isBoardLegal(e))throw new Error("Board is in an illegal state")};r.isBoardFull=function(e){for(var r=0;r<8;r++)if(e[r]^e[r+8]^255)return!1;return!0};r.getNeighboringCoords=function(e,r,t,n){return e+t<0||e+t>7||r+n<0||r+n>7?null:[e+t,r+n]};var i=function(e){return null!==e};r.getAllNeighboringCoords=function(e,t){return[r.getNeighboringCoords(e,t,-1,-1),r.getNeighboringCoords(e,t,0,-1),r.getNeighboringCoords(e,t,1,-1),r.getNeighboringCoords(e,t,-1,0),r.getNeighboringCoords(e,t,1,0),r.getNeighboringCoords(e,t,-1,1),r.getNeighboringCoords(e,t,0,1),r.getNeighboringCoords(e,t,1,1)].filter(i)};r.getLine=function(e,t,n,o){for(var i=[],a=e,s=t;;){var l=r.getNeighboringCoords(a,s,n,o);if(!l)break;i.push(l),a+=n,s+=o}return i};r.getAllLines=function(e,t){return[r.getLine(e,t,-1,-1),r.getLine(e,t,0,-1),r.getLine(e,t,1,-1),r.getLine(e,t,-1,0),r.getLine(e,t,1,0),r.getLine(e,t,-1,1),r.getLine(e,t,0,1),r.getLine(e,t,1,1)]};r.getOpponent=function(e){return e===n.BLACK?n.WHITE:n.BLACK};r.isLegalMoveForCoords=function(e,t,n,o){if(r.hasDiskAtCoords(e,t,n))return!1;var i=r.getAllLines(t,n),a=r.getOpponent(o);e:for(var s=0,l=i;s<l.length;s++){var c=l[s];if(!(c.length<2)&&r.getDiskAtCoords(e,c[0][0],c[0][1])===a)r:for(var u=1;u<c.length;u++)switch(r.getDiskAtCoords(e,c[u][0],c[u][1])){case o:return!0;case a:continue r;default:continue e}}return!1};r.isLegalMoveForIndex=function(e,t,n){return r.isLegalMoveForCoords.apply(void 0,o([e],r.getCoordsAtIndex(t),[n]))};r.getLegalMoveIndexesForPlayer=function(e,t){for(var n=[],o=0;o<r.BOARD_TILES;o++)r.isLegalMoveForIndex(e,o,t)&&n.push(o);return n};r.hasLegalMoves=function(e,t){for(var n=0;n<r.BOARD_TILES;n++)if(r.isLegalMoveForIndex(e,n,t))return!0;return!1};r.getLegalMoveCoordsForPlayer=function(e,t){for(var n=[],o=0;o<r.BOARD_SIZE;o++)for(var i=0;i<r.BOARD_SIZE;i++)r.isLegalMoveForIndex(e,i,t)&&n.push([i,o]);return n};r.playMoveAtCoords=function(e,t,n,o){var i=r.createBoard();if(!r.isLegalMoveForCoords(e,t,n,o))throw new Error("Move is illegal");r.setDiskAtCoords(i,t,n,o);var a=r.getAllLines(t,n),s=r.getOpponent(o);e:for(var l=0,c=a;l<c.length;l++){var u=c[l];if(!(u.length<2)&&r.getDiskAtCoords(e,u[0][0],u[0][1])===s)r:for(var d=1;d<u.length;d++)switch(r.getDiskAtCoords(e,u[d][0],u[d][1])){case o:for(var g=0;g<d;g++)r.setDiskAtCoords(i,u[g][0],u[g][1],o);continue e;case s:continue r;default:continue e}}return i};r.playMoveAtIndex=function(e,t,n){return r.playMoveAtCoords.apply(void 0,o([e],r.getCoordsAtIndex(t),[n]))};r.applyMoves=function(e,r){for(var t=0;t<8;t++)e[t+0]&=~r[t+8],e[t+8]&=~r[t+0],e[t+0]|=r[t+0],e[t+8]|=r[t+8]};r.isGameOver=function(e){if(r.isBoardFull(e))return!0;for(var t=0;t<r.BOARD_TILES;t++)if(r.isLegalMoveForIndex(e,t,n.BLACK)||r.isLegalMoveForIndex(e,t,n.WHITE))return!1;return!0};var a=function(e){for(var r=0;e>0;)1===(1&e)&&r++,e>>=1;return r};r.getScore=function(e,r){for(var t=r===n.BLACK?0:8,o=0,i=0;i<8;i++)o+=a(e[i+t]);return o};r.getWinner=function(e){var t=r.getScore(e,n.BLACK),o=r.getScore(e,n.WHITE);return t>o?n.BLACK:o>t?n.WHITE:null};r.getCardinalPositionFromCoords=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t=e[0],n=e[1];if(t<0||t>7||n<0||n>7)throw new Error("Position is out of bounds");return String.fromCharCode(97+t)+(n+1)};r.getCardinalPositionFromIndex=function(e){return r.getCardinalPositionFromCoords.apply(void 0,r.getCoordsAtIndex(e))}}},[[112,1,2]]]);
//# sourceMappingURL=main.a384d463.chunk.js.map