(()=>{"use strict";const t=t=>({data:t,prev:null,next:null,c1:null,c2:null,c3:null,c4:null,c5:null,c6:null,c7:null,c8:null,parent:null}),n=(()=>{const n=t([0,0]),l=()=>n,u=(()=>{const n=[];let l=0;for(let u=0;u<8;u+=1){let u=0;for(let e=0;e<8;e+=1){const e=[];e.push(l),e.push(u),n.push(t(e)),u+=1}l+=1}return n})(),e=()=>u,s=t=>{for(let n=0;n<e().length;n+=1){const l=e()[n];if(JSON.stringify(t)===JSON.stringify(l.data))return l}return null},r=(t,n=[])=>{const l=t;return n.unshift(l.data),null===l.parent?n:r(l.parent,n)},c=(t,n=[l()],u=[])=>{if(0===n.length)return r(s(t));const e=n.shift();if(JSON.stringify(e.data)===JSON.stringify(t))return r(s(t));u.push(e);const o=(t=>{const n=t[0],l=t[1],u=[];return n+2<=7&&(l+1<=7&&u.push([n+2,l+1]),l-1>=0&&u.push([n+2,l-1])),n+1<=7&&(l+2<=7&&u.push([n+1,l+2]),l-2>=0&&u.push([n+1,l-2])),n-1>=0&&(l+2<=7&&u.push([n-1,l+2]),l-2>=0&&u.push([n-1,l-2])),n-2>=0&&(l+1<=7&&u.push([n-2,l+1]),l-1>=0&&u.push([n-2,l-1])),u})(e.data);for(let t=0;t<o.length;t+=1){const l=s(o[t]);if(!u.includes(l)){for(let t=1;t<9;t+=1)null===e[`c${t}`]&&(e[`c${t}`]=l);null!==l&&(l.parent=e),n.push(l)}}return c(t,n,u)};return{getHead:l,retrieveNode:s,getNodeList:e,bfs:c}})();console.log(n.bfs([1,2]))})();