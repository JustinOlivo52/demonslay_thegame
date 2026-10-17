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
export function forestWalkable(x:number,y:number,stage=0){if(stage>0)return areaWalkable(x,y,stage);return x>=50&&x<=955&&y>=90&&y<=520&&(nearRoute(x,y,FOREST_ROUTE,88)||nearRoute(x,y,FOREST_BRANCH,65)||Math.hypot(x-360,y-170)<70||((x-805)/195)**2+((y-330)/150)**2<=1);}
export function moveThroughForest(point:{x:number;y:number},dx:number,dy:number,stage=0){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/5));for(let i=0;i<steps;i++){if(forestWalkable(point.x+dx/steps,point.y,stage))point.x+=dx/steps;if(forestWalkable(point.x,point.y+dy/steps,stage))point.y+=dy/steps;}}
function randomSource(){let n=197;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
function canopy(ctx:CanvasRenderingContext2D,x:number,y:number,r:()=>number){
 ctx.fillStyle='#071517';ctx.fillRect(x-6,y-35,14,45);ctx.fillStyle='#342e2b';ctx.fillRect(x-4,y-32,7,39);ctx.fillStyle='#574337';ctx.fillRect(x-3,y-27,2,29);
 for(let i=0;i<12;i++){const dx=Math.round((r()-.5)*60/4)*4,dy=Math.round((r()-.5)*32/4)*4;ctx.fillStyle=['#0a2225','#10302e','#173c34','#204b3e'][i%4];ctx.fillRect(x+dx-18,y-73+dy,36,24);ctx.fillRect(x+dx-22,y-69+dy,44,16);if(i%3===0){ctx.fillStyle='#315a45';ctx.fillRect(x+dx-12,y-72+dy,18,3);}}
}
function rock(ctx:CanvasRenderingContext2D,x:number,y:number){ctx.fillStyle='#101f25';ctx.fillRect(x-12,y+7,29,5);ctx.fillStyle='#3d4b4b';ctx.fillRect(x-11,y-2,23,13);ctx.fillRect(x-6,y-8,15,8);ctx.fillStyle='#6c7770';ctx.fillRect(x-5,y-7,12,3);ctx.fillStyle='#27463c';ctx.fillRect(x-11,y+6,13,4);}
export function paintForest(ctx:CanvasRenderingContext2D,stage=0){if(stage>0){paintTrialArea(ctx,stage);return;}const r=randomSource();ctx.fillStyle='#0d2026';ctx.fillRect(0,0,1000,620);
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


export const TRIAL_AREAS=[
 {name:'Wisteria foothills',spawn:FOREST_SPAWN,demon:FOREST_DEMON},
 {name:'The bamboo basin',spawn:{x:240,y:345},demon:{x:715,y:300}},
 {name:'The ruined waystation',spawn:{x:220,y:350},demon:{x:740,y:335}},
 {name:'The ancient cedar grove',spawn:{x:270,y:380},demon:{x:705,y:300}},
] as const;
export function areaWalkable(x:number,y:number,stage:number){
 if(x<70||x>930||y<130||y>510)return false;
 if(stage===1)return ((x-500)/425)**2+((y-325)/195)**2<1 && !(((x-475)/80)**2+((y-170)/32)**2<1);
 if(stage===2)return x>100&&x<900&&y>150&&y<505 && !(x>440&&x<545&&y<225) && !(x>420&&x<530&&y>445);
 return ((x-500)/425)**2+((y-330)/190)**2<1;
}
function paintTrialArea(ctx:CanvasRenderingContext2D,stage:number){
 const r=randomSource();const bamboo=stage===1,ruins=stage===2;
 const soil=bamboo?['#354837','#3b4c3b','#42523f']:ruins?['#494b46','#4e514a','#55574e']:['#4e4237','#51493c','#5c5040'];
 ctx.fillStyle=bamboo?'#0c2926':ruins?'#142b31':'#152329';ctx.fillRect(0,0,1000,620);
 for(let y=0;y<620;y+=4)for(let x=0;x<1000;x+=4){
  if(forestWalkable(x,y-40,stage)){ctx.fillStyle=soil[Math.floor(r()*3)];ctx.fillRect(x,y,4,4);if(r()<.035){ctx.fillStyle='#7b8060';ctx.fillRect(x,y,2,1);}}
  else if(r()<.22){ctx.fillStyle=bamboo?'#2c5140':'#293e35';ctx.fillRect(x,y,2,3);}
 }
 if(bamboo){
  // A shallow moonlit pond at the northern edge, not in the combat center.
  ctx.fillStyle='#173e44';ctx.beginPath();ctx.ellipse(475,210,80,32,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#70968a';ctx.lineWidth=2;for(let i=0;i<5;i++){ctx.beginPath();ctx.ellipse(462+i*5,208+i*3,36+i*5,3+i*2,0,0,Math.PI*2);ctx.stroke();}
  for(let i=0;i<95;i++){const x=r()*1000,y=90+r()*530;if(forestWalkable(x,y-40,stage)||forestWalkable(x,y-15,stage))continue;
   const h=70+r()*90;ctx.fillStyle='#142c28';ctx.fillRect(x-4,y-h,11,h);ctx.fillStyle='#416646';ctx.fillRect(x,y-h,4,h);
   ctx.fillStyle='#87a070';for(let k=0;k<h;k+=18)ctx.fillRect(x-1,y-k,6,2);
   ctx.fillStyle='#294b37';ctx.fillRect(x-18,y-h+12,20,4);ctx.fillRect(x+3,y-h+24,22,4);
  }
 }else if(ruins){
  // Worn paving, roofless waystation and fallen beams along the arena edges.
  for(let y=220;y<480;y+=35)for(let x=180;x<850;x+=55){ctx.fillStyle=r()<.5?'#636660':'#5c615c';ctx.fillRect(x,y,48,27);ctx.fillStyle='#3f4840';ctx.fillRect(x+14,y+7,2,14);}
  ctx.fillStyle='#65665b';ctx.fillRect(425,165,135,100);ctx.fillRect(410,485,130,35);ctx.fillStyle='#343e37';ctx.fillRect(440,165,105,85);
  for(const x of [140,825]){ctx.fillStyle='#493e35';ctx.fillRect(x,195,15,300);ctx.fillRect(x-10,183,35,12);ctx.fillStyle='#8a7654';ctx.fillRect(x+3,205,3,140);}
  for(const [x,y] of [[140,180],[850,180],[150,510],[860,520]])rock(ctx,x,y);
  ctx.fillStyle='#8b6950';ctx.fillRect(130,210,115,10);ctx.fillRect(740,505,115,9);
 }else{
  // Massive old cedars frame a large, empty root clearing.
  for(const [x,y] of [[85,220],[920,230],[60,490],[940,490],[320,110],[680,100]]){
   ctx.fillStyle='#101e23';ctx.fillRect(x-25,y-100,55,140);ctx.fillStyle='#4b3c32';ctx.fillRect(x-17,y-110,36,140);ctx.fillStyle='#715440';ctx.fillRect(x-11,y-100,6,123);
   ctx.fillStyle='#3b342b';ctx.fillRect(x-45,y+22,90,8);ctx.fillRect(x-32,y+12,65,12);
   for(let i=0;i<4;i++)canopy(ctx,x+(r()-.5)*70,y-75+r()*20,r);
  }
  ctx.fillStyle='#344345';ctx.beginPath();ctx.ellipse(500,365,175,95,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#515448';for(let i=0;i<45;i++){const a=r()*Math.PI*2,d=r()*150;ctx.fillRect(500+Math.cos(a)*d,365+Math.sin(a)*d*.5,4,2);}
 }
 ctx.fillStyle='rgba(170,210,203,.045)';for(const x of [280,650]){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+50,0);ctx.lineTo(x-70,540);ctx.lineTo(x-190,540);ctx.closePath();ctx.fill();}
}
