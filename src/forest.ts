/** One authored, repeatable tutorial region. No live AI generation. */
export const FOREST_CLUES = [
 {x:240,y:340,title:'A broken wisteria cord',text:'You find a torn cord caught on a branch. Beyond this point, the wisteria no longer protects the path.'},
 {x:510,y:320,title:'Tracks in the mud',text:'Bare footprints cross the trail. The marks are fresh. Something is waiting in the clearing to the east.'},
] as const;
export function paintForest(ctx:CanvasRenderingContext2D){
 let seed=81;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 ctx.fillStyle='#0c1b24';ctx.fillRect(0,0,1000,620);
 for(let y=0;y<620;y+=16)for(let x=0;x<1000;x+=16){ctx.fillStyle=['#142c2b','#162e2d','#182f2d','#112826'][Math.floor(random()*4)];ctx.fillRect(x,y,16,16);if(random()>.6){ctx.fillStyle='#294038';ctx.fillRect(x+4,y+6,3,4);}}
 // Traversable west-east trail, bounded tree lines and a broad eastern clearing.
 for(let x=50;x<950;x+=12){const y=344+Math.sin(x/140)*17;ctx.fillStyle='#3c3930';ctx.fillRect(x,y-55,14,110);ctx.fillStyle='#4b4537';ctx.fillRect(x,y-35,14,70);}
 ctx.fillStyle='#3a3b30';ctx.beginPath();ctx.ellipse(790,345,145,120,0,0,Math.PI*2);ctx.fill();
 for(let i=0;i<800;i++){let x=50+random()*900,y=265+random()*170;ctx.fillStyle=random()>.5?'#68604a':'#242d28';ctx.fillRect(x,y,2+random()*3,2);}
 const tree=(x:number,y:number)=>{ctx.fillStyle='#091b1d';ctx.fillRect(x-3,y-4,18,38);ctx.fillStyle='#312c29';ctx.fillRect(x-2,y-3,7,36);for(let k=0;k<3;k++){ctx.fillStyle=['#102a29','#173832','#204039'][k];ctx.beginPath();ctx.moveTo(x,y-73+k*13);ctx.lineTo(x+36-k*3,y+5+k*7);ctx.lineTo(x-36+k*3,y+5+k*7);ctx.closePath();ctx.fill();ctx.fillStyle='#335247';ctx.fillRect(x-4,y-41+k*14,12,3);}};
 for(let y=75;y<265;y+=65)for(let x=25;x<1000;x+=65)tree(x+random()*20,y+random()*20);
 for(let y=465;y<650;y+=65)for(let x=25;x<1000;x+=65)tree(x+random()*20,y+random()*20);
 for(const x of [90,130,170]){ctx.fillStyle='#533e5d';ctx.fillRect(x,215,8,65);ctx.fillStyle='#af8bc9';for(let i=0;i<8;i++)ctx.fillRect(x-12+i*4,220+(i%3)*7,4,25-i%3*3);}
 ctx.fillStyle='#9d8f74';ctx.fillRect(60,310,8,67);ctx.fillRect(50,304,48,18);ctx.fillStyle='#272b29';ctx.fillRect(55,309,32,3);
 for(let i=0;i<12;i++){ctx.fillStyle='#b4bca9';ctx.fillRect(485+i*3,322+(i%2)*8,3,5);}
 ctx.fillStyle='#b4a7c5';ctx.fillRect(231,334,17,3);
}
