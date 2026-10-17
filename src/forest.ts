/** Authored modules: entrance, winding trail, fork, shrine pocket and combat clearing. */
export const FOREST_ROUTE=[{x:100,y:430},{x:235,y:400},{x:350,y:295},{x:485,y:285},{x:610,y:360},{x:790,y:330}] as const;
export const FOREST_BRANCH=[{x:350,y:295},{x:360,y:170}] as const;
export const FOREST_SHRINE={x:360,y:170};
export const FOREST_SPAWN={x:100,y:430};
export const FOREST_DEMON={x:825,y:330};
export const FOREST_CLUES=[
 {x:235,y:400,title:'The abandoned lantern',text:'The lantern is cold. A torn strap and footprints lead uphill, away from the wisteria.'},
 {x:610,y:360,title:'Cloth on the broken fence',text:'Freshly torn cloth hangs from the fence. A branch snaps in the clearing ahead. Something has noticed you.'},
] as const;
function segmentDistance(x:number,y:number,a:{x:number;y:number},b:{x:number;y:number}){const dx=b.x-a.x,dy=b.y-a.y;const t=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a.x-t*dx,y-a.y-t*dy);}
function nearRoute(x:number,y:number,route:readonly {x:number;y:number}[],radius:number){return route.slice(1).some((p,i)=>segmentDistance(x,y,route[i],p)<=radius);}
export function forestWalkable(x:number,y:number){return x>=50&&x<=955&&y>=90&&y<=520&&(nearRoute(x,y,FOREST_ROUTE,48)||nearRoute(x,y,FOREST_BRANCH,34)||Math.hypot(x-360,y-170)<47||((x-805)/130)**2+((y-330)/100)**2<=1);}
export function moveThroughForest(point:{x:number;y:number},dx:number,dy:number){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/5));for(let i=0;i<steps;i++){if(forestWalkable(point.x+dx/steps,point.y))point.x+=dx/steps;if(forestWalkable(point.x,point.y+dy/steps))point.y+=dy/steps;}}
function randomSource(){let n=197;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
function canopy(ctx:CanvasRenderingContext2D,x:number,y:number,r:()=>number){
 ctx.fillStyle='#071517';ctx.fillRect(x-6,y-35,14,45);ctx.fillStyle='#342e2b';ctx.fillRect(x-4,y-32,7,39);ctx.fillStyle='#574337';ctx.fillRect(x-3,y-27,2,29);
 for(let i=0;i<12;i++){const dx=Math.round((r()-.5)*60/4)*4,dy=Math.round((r()-.5)*32/4)*4;ctx.fillStyle=['#0a2225','#10302e','#173c34','#204b3e'][i%4];ctx.fillRect(x+dx-18,y-73+dy,36,24);ctx.fillRect(x+dx-22,y-69+dy,44,16);if(i%3===0){ctx.fillStyle='#315a45';ctx.fillRect(x+dx-12,y-72+dy,18,3);}}
}
function rock(ctx:CanvasRenderingContext2D,x:number,y:number){ctx.fillStyle='#101f25';ctx.fillRect(x-12,y+7,29,5);ctx.fillStyle='#3d4b4b';ctx.fillRect(x-11,y-2,23,13);ctx.fillRect(x-6,y-8,15,8);ctx.fillStyle='#6c7770';ctx.fillRect(x-5,y-7,12,3);ctx.fillStyle='#27463c';ctx.fillRect(x-11,y+6,13,4);}
export function paintForest(ctx:CanvasRenderingContext2D){const r=randomSource();ctx.fillStyle='#0d2026';ctx.fillRect(0,0,1000,620);
 for(let y=0;y<620;y+=8)for(let x=0;x<1000;x+=8){ctx.fillStyle=['#142c2b','#17332e','#11272a','#1a3730'][Math.floor(r()*4)];ctx.fillRect(x,y,8,8);}
 for(let y=90;y<570;y+=4)for(let x=50;x<955;x+=4){const py=y-40;if(!forestWalkable(x,py))continue;ctx.fillStyle=['#514d3d','#4b493b','#474737','#5d5540'][Math.floor(r()*4)];ctx.fillRect(x,y,4,4);if(r()<.045){ctx.fillStyle='#8b8060';ctx.fillRect(x,y,3,1);}}
 // Trail-edge grasses, stones and roots.
 for(let i=0;i<1900;i++){const x=Math.floor(r()*1000),y=Math.floor(r()*620);if(forestWalkable(x,y-40))continue;ctx.fillStyle=r()<.5?'#34533a':'#234532';ctx.fillRect(x,y,2,3+r()*4);}
 for(const [x,y] of [[156,486],[300,407],[466,359],[656,448],[718,290],[882,453],[317,251]])rock(ctx,x,y);
 // Wisteria-covered entry arch.
 ctx.fillStyle='#493e3d';ctx.fillRect(70,386,10,100);ctx.fillRect(165,360,10,100);ctx.fillRect(61,374,122,10);ctx.fillStyle='#77556f';ctx.fillRect(64,365,116,8);
 for(let i=0;i<32;i++){const x=65+i*3;ctx.fillStyle=['#79609c','#a58cba','#c2add3'][i%3];ctx.fillRect(x,367,4,15+(i%5)*6);}
 // Discarded lantern: the first clue, on the trail itself.
 ctx.fillStyle='#1d2425';ctx.fillRect(224,446,25,7);ctx.fillStyle='#6d5d49';ctx.fillRect(226,430,19,17);ctx.fillStyle='#deb879';ctx.fillRect(231,433,8,9);ctx.fillStyle='#2a3434';ctx.fillRect(223,426,24,5);ctx.fillRect(234,422,4,5);
 // Footprints lead around the fork toward the fence.
 for(let i=0;i<14;i++){const x=430+i*12,y=325+(i>5?(i-5)*7:0);ctx.fillStyle='#252f2b';ctx.fillRect(x,y+(i%2)*8,4,7);}
 // Broken fence, torn white cloth, snapped branch.
 ctx.fillStyle='#655440';ctx.fillRect(587,367,7,61);ctx.fillRect(637,372,7,53);ctx.fillRect(588,380,30,7);ctx.fillRect(621,394,25,7);ctx.fillStyle='#d1cec0';ctx.fillRect(601,383,16,7);ctx.fillRect(608,389,8,21);ctx.fillStyle='#8d7955';ctx.fillRect(623,416,28,4);
 // Optional shrine pocket; no reward or shortcut required for progression.
 ctx.fillStyle='#384944';ctx.fillRect(330,196,60,26);ctx.fillStyle='#6c7466';ctx.fillRect(335,186,50,15);ctx.fillStyle='#263b35';ctx.fillRect(340,170,40,22);ctx.fillStyle='#657263';ctx.fillRect(332,165,56,7);ctx.fillRect(339,158,42,7);ctx.fillStyle='#cfc6ac';ctx.fillRect(352,180,15,12);ctx.fillStyle='#8f7776';ctx.fillRect(358,170,3,25);
 for(let y=72;y<640;y+=58)for(let x=15;x<1000;x+=64){const px=x+r()*23,py=y+r()*17;if(!forestWalkable(px,py-40)&&!forestWalkable(px,py-5))canopy(ctx,px,py,r);}
 // Moonlit patches and diagonal light through the canopy.
 ctx.fillStyle='rgba(156,193,186,.055)';for(const [x,y] of [[310,330],[505,335],[795,370]]){ctx.beginPath();ctx.ellipse(x,y,85,34,-.3,0,Math.PI*2);ctx.fill();}
 ctx.fillStyle='rgba(170,203,207,.045)';for(const x of [250,570,815]){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+40,0);ctx.lineTo(x-50,500);ctx.lineTo(x-135,500);ctx.closePath();ctx.fill();}
}
export function paintForestForeground(ctx:CanvasRenderingContext2D){const r=randomSource();for(const [x,y] of [[20,180],[970,165],[40,610],[250,625],[515,635],[955,620]])canopy(ctx,x,y,r);}
