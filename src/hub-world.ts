export type Point={x:number;y:number};
export const HUB_SIZE={width:1600,height:1080};
export const HUB_SPAWN={x:800,y:560};
export const ROOM_SPAWN={x:500,y:450};
export const HUB_SPOTS=[
 {id:'room',name:'Your room',hint:'Rest and save',x:300,y:432},
 {id:'crow',name:'Kasugai crow',hint:'Mission board',x:810,y:442},
 {id:'training',name:'Training grounds',hint:'Practice your techniques',x:1250,y:505},
 {id:'smith',name:'Swordsmith route',hint:'Materials and equipment',x:1300,y:825},
 {id:'mentor',name:'Hashira estates',hint:'Meet your assigned mentor',x:350,y:825},
] as const;
export const ROOM_SPOTS=[
 {id:'save',name:'Your journal',hint:'Save your progress',x:690,y:315},
 {id:'loadout',name:'Equipment rack',hint:'Review your starting forms',x:315,y:295},
 {id:'exit',name:'Courtyard',hint:'Return outside',x:500,y:525},
] as const;
export type HubSpot=typeof HUB_SPOTS[number]|typeof ROOM_SPOTS[number];
// Bounds represent feet positions; roofs never block open paths below their eaves.
const BUILDINGS=[{x:140,y:225,w:320,h:160},{x:560,y:110,w:470,h:190},{x:1110,y:230,w:320,h:155}];
export function hubWalkable(x:number,y:number,room=false){
 if(room)return x>=220&&x<=780&&y>=265&&y<=545&&!(x>385&&x<545&&y<425)&&!(x>590&&x<760&&y<285)&&!(x>245&&x<375&&y<275);
 return x>=85&&x<=1515&&y>=320&&y<=990&&!BUILDINGS.some(b=>x>b.x-14&&x<b.x+b.w+14&&y>b.y-12&&y<b.y+b.h+12)&&!(((x-1050)/125)**2+((y-720)/85)**2<1);
}
export function moveHub(p:Point,dx:number,dy:number,room=false){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/5));for(let i=0;i<steps;i++){if(hubWalkable(p.x+dx/steps,p.y,room))p.x+=dx/steps;if(hubWalkable(p.x,p.y+dy/steps,room))p.y+=dy/steps;}}
export function nearestHubSpot(p:Point,room=false):HubSpot|undefined{return (room?ROOM_SPOTS:HUB_SPOTS).find(s=>Math.hypot(p.x-s.x,p.y-s.y)<76);}
