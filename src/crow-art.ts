/** Shared 64 × 56 Kasugai crow illustration, painted on an integer pixel grid. */
export function paintCrow(c:CanvasRenderingContext2D,x=0,y=0,scale=1){
 c.save();c.translate(x,y);c.scale(scale,scale);c.imageSmoothingEnabled=false;
 const shape=(color:string,points:number[][])=>{c.fillStyle=color;c.beginPath();points.forEach(([px,py],i)=>i?c.lineTo(px,py):c.moveTo(px,py));c.closePath();c.fill();};
 // Long, layered tail, hooked bill, and hunched shoulder make the silhouette read as a crow.
 shape('#111b28',[[39,33],[47,35],[61,48],[61,51],[54,51],[42,45],[34,41]]);
 shape('#29374a',[[44,37],[55,46],[59,48],[54,48],[43,42]]);
 shape('#1b2637',[[39,39],[49,45],[55,51],[49,50],[37,44]]);
 shape('#101a27',[[19,17],[25,16],[35,20],[43,27],[46,35],[42,43],[34,47],[25,46],[19,41],[16,32],[17,23]]);
 shape('#263345',[[21,19],[27,19],[36,24],[41,30],[40,38],[32,43],[24,41],[20,34]]);
 shape('#172334',[[30,24],[37,25],[45,32],[44,39],[38,44],[28,41],[24,34],[25,29]]);
 // Folded wing: separate stepped primaries and narrow blue-grey feather edges.
 shape('#34465a',[[29,24],[35,25],[42,31],[43,36],[38,38],[30,33],[26,29]]);
 shape('#1c2a3c',[[27,31],[33,32],[44,37],[42,40],[32,38],[27,35]]);
 shape('#44586b',[[28,28],[34,29],[40,33],[39,35],[32,32],[28,31]]);
 shape('#526775',[[29,27],[33,27],[38,30],[37,31],[32,29],[29,29]]);
 for(const [fx,fy] of [[28,34],[30,37],[33,40],[37,41]]){c.fillStyle='#3c4d60';c.fillRect(fx,fy,6,1);c.fillStyle='#101d2d';c.fillRect(fx+3,fy+1,5,2);}
 // Ruff and rounded skull; no human-like eyes or cartoon smile.
 shape('#111b28',[[13,9],[19,6],[25,7],[29,11],[29,17],[25,23],[24,29],[20,27],[17,29],[15,24],[12,20],[10,14]]);
 shape('#26374a',[[14,10],[19,8],[24,9],[26,12],[24,14],[16,14],[13,17],[12,14]]);
 c.fillStyle='#415567';c.fillRect(17,9,6,1);c.fillRect(14,11,3,1);
 shape('#0a1420',[[13,15],[9,15],[4,18],[2,21],[8,22],[14,21],[17,18]]);
 shape('#506071',[[5,18],[12,16],[15,16],[13,18],[7,19],[3,21]]);
 c.fillStyle='#101722';c.fillRect(3,21,10,1);c.fillRect(11,20,3,3);
 c.fillStyle='#8c9aa0';c.fillRect(17,15,4,3);c.fillStyle='#d9c58b';c.fillRect(18,15,2,2);c.fillStyle='#11171e';c.fillRect(19,16,1,1);
 c.fillStyle='#34485a';c.fillRect(18,23,2,4);c.fillRect(22,22,2,4);c.fillStyle='#536575';c.fillRect(18,23,1,2);
 // Scaled feet and a small messenger band, readable at world scale.
 for(const fx of [27,36]){c.fillStyle='#777b75';c.fillRect(fx,44,2,7);c.fillStyle='#343e44';c.fillRect(fx+1,47,2,5);c.fillRect(fx-3,51,9,2);c.fillRect(fx-4,52,2,2);c.fillRect(fx+5,52,2,2);c.fillStyle='#a3a28b';c.fillRect(fx,49,1,3);}
 c.fillStyle='#b68a4e';c.fillRect(35,46,4,3);c.fillStyle='#ead29b';c.fillRect(35,46,3,1);
 c.restore();
}
