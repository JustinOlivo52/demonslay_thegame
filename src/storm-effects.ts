import type Phaser from 'phaser';
import type {Point,TechniqueVisual} from './technique-types';
import {THUNDER_KIT,thunderKit,type ThunderTechnique} from './thunder-kit.ts';
import {WIND_KIT,windKit,type WindTechnique} from './wind-kit.ts';
type Graphics=Phaser.GameObjects.Graphics;
/** Pixel-edged, sword-driven traces. No screen flashes or autonomous damage sources. */
function brush(g:Graphics,fade:number,colors:readonly number[]){return (points:Point[],width=6,alpha=1)=>{if(points.length<2)return;for(let layer=0;layer<3;layer++){g.lineStyle(width+(2-layer)*3,colors[layer],fade*alpha*(layer===0?.3:layer===1?.85:1));g.beginPath();for(const [i,v] of points.entries())i?g.lineTo(Math.round(v.x),Math.round(v.y)):g.moveTo(Math.round(v.x),Math.round(v.y));g.strokePath();}};}
const transform=(p:Point,a:number,f:number,s=0):Point=>({x:p.x+Math.cos(a)*f-Math.sin(a)*s,y:p.y+Math.sin(a)*f+Math.cos(a)*s});
export function paintThunderTechnique(g:Graphics,light:Graphics,cast:TechniqueVisual<ThunderTechnique>,p:Point,clock:number){
 const f=THUNDER_KIT[cast.id],phase=thunderKit.phase(cast.id,cast.elapsed),q=thunderKit.progress(cast.id,cast.elapsed),fade=phase==='recovery'?Math.max(0,1-(cast.elapsed-f.windup-f.active)/f.recovery):1;
 const line=brush(g,fade,[0x97742e,0x8fd7ed,0xfff1a6]),at=(x:number,y=0)=>transform(p,cast.angle,x,y);
 const bolt=(start:Point,end:Point,width=3,alpha=1)=>line(Array.from({length:13},(_,i)=>{const t=i/12,side=i===0||i===12?0:Math.sin(i*13.7+Math.floor(clock*16))*(i%2?7:3);return {x:start.x+(end.x-start.x)*t-Math.sin(cast.angle)*side,y:start.y+(end.y-start.y)*t+Math.cos(cast.angle)*side};}),width,alpha);
 const arc=(radius:number,start:number,sweep:number,width=5,alpha=1)=>line(Array.from({length:29},(_,i)=>{const a=cast.angle+start+sweep*i/28;return {x:p.x+Math.cos(a)*radius,y:p.y+Math.sin(a)*radius};}),width,alpha);
 if(phase==='done')return;
 if(phase==='windup'){const charge=cast.elapsed/f.windup;for(let i=0;i<3;i++){const b=at(-12-i*7,(i%2?1:-1)*(8+charge*8));light.lineStyle(1,0xefce78,.25+charge*.3);light.lineBetween(b.x,b.y,b.x+5,b.y-8);}return;}
 switch(cast.id){
 case 'flash':line(cast.path,7);arc(70,-1,2*Math.min(1,q*3+.15),6);for(const s of [-1,1])bolt(at(-70,s*13),at(30,s*4),2,.65);break;
 case 'rice':{const beat=Math.min(4,Math.floor(q*5)),local=q*5-beat;for(let i=Math.max(0,beat-1);i<=beat;i++){const sign=i%2?-1:1;arc(62+i*7,-sign*1.25,sign*2.5*(i===beat?Math.min(1,local*1.6+.12):1),4,i===beat?1:.35);}break;}
 case 'swarm':{const spin=q*Math.PI*2;arc(90,spin-1.2,2.2,5);arc(114,spin+Math.PI-.8,1.6,3,.6);for(let i=0;i<4;i++){const a=spin+i*Math.PI/2,tail={x:p.x+Math.cos(a)*65,y:p.y+Math.sin(a)*65};bolt(tail,{x:p.x+Math.cos(a+.45)*108,y:p.y+Math.sin(a+.45)*108},2,.6);}line(cast.path,3,.5);break;}
 case 'distant':line(cast.path,6);for(let i=0;i<3;i++){arc(72+i*17,-1+i*.12,2*Math.min(1,q*3+.1),4,1-i*.15);bolt(at(35,i*12-12),at(118,i*17-17),2,.7);}break;
 case 'heat':{const pts=Array.from({length:33},(_,i)=>{const t=i/32*Math.min(1,q*1.8+.1),v=at(50+Math.sin(t*Math.PI)*28);return {x:v.x,y:v.y+45-t*115};});line(pts,7);const tip=pts[pts.length-1];bolt(at(35,12),tip,3,.65);break;}
 case 'rumble':{const beat=Math.min(5,Math.floor(q*6));for(let i=Math.max(0,beat-2);i<=beat;i++){const sign=i%2?-1:1;arc(78+i%3*20,-sign*1.2,sign*2.4,4,(i===beat?1:.35));bolt(at(22,-40+i*14),at(130,-35+i*12),2,i===beat?.8:.25);}line(cast.path,3,.4);break;}
 case 'god':{line(cast.path,11);const body=Array.from({length:42},(_,i)=>{const t=i/41;return at(-130+t*225,Math.sin(t*Math.PI*3-q*2)*17*(1-t*.45));});line(body,10);const head=body[body.length-1];bolt(head,at(116,-20),4);line([at(88,-8),at(96,-24),at(101,-12),at(113,-6),at(96,5),at(83,2)],3);const eye=at(101,-5);g.fillStyle(0xffffff,fade);g.fillRect(eye.x,eye.y,3,3);arc(84,-.8,1.6,7);break;}
 }
}
export function paintWindTechnique(g:Graphics,light:Graphics,cast:TechniqueVisual<WindTechnique>,p:Point,clock:number){
 const f=WIND_KIT[cast.id],phase=windKit.phase(cast.id,cast.elapsed),q=windKit.progress(cast.id,cast.elapsed),fade=phase==='recovery'?Math.max(0,1-(cast.elapsed-f.windup-f.active)/f.recovery):1;
 const line=brush(g,fade,cast.id==='mist'?[0x203d37,0x679f83,0xc7e4ce]:[0x366455,0x82c8a6,0xe0f2cc]),at=(x:number,y=0)=>transform(p,cast.angle,x,y);
 const arc=(center:Point,r:number,start:number,length:number,width=5,alpha=1)=>line(Array.from({length:33},(_,i)=>{const a=cast.angle+start+length*i/32;return {x:center.x+Math.cos(a)*r,y:center.y+Math.sin(a)*r};}),width,alpha);
 const vertical=(side:number,up:boolean,scale=1)=>{const center=at(52,side);line(Array.from({length:29},(_,i)=>{const t=i/28*Math.min(1,q*2+.15);return {x:center.x+Math.cos(cast.angle)*Math.sin(t*Math.PI)*28*scale,y:center.y+(up?1:-1)*(40-t*95)*scale};}),6);};
 if(phase==='done')return;if(phase==='windup'){light.lineStyle(1,0xadd0a9,.25);light.strokeEllipse(p.x,p.y+15,25+cast.elapsed/f.windup*20,10);return;}
 switch(cast.id){
 case 'dust':line(cast.path,7,.6);for(let i=0;i<2;i++)arc(p,64+i*23,q*7+i*Math.PI,Math.PI*1.5,6-i);break;
 case 'claws':for(let i=0;i<4;i++){const side=-33+i*22;line(Array.from({length:25},(_,j)=>{const t=j/24*Math.min(1,q*2.4+.08);return at(25+t*88,side+Math.sin(t*Math.PI)*18);}),4);}break;
 case 'tree':for(let i=0;i<3;i++)arc(p,58+i*16,-q*9+i*2.1,Math.PI*1.4,4,1-i*.17);break;
 case 'rising':for(let i=0;i<3;i++)vertical(-24+i*24,true,.8+i*.1);break;
 case 'cold':for(let i=0;i<3;i++)arc(at(35),56+i*28,-1.5+i*.2,Math.min(1,q*2+.12)*2.8,5,.95-i*.15);break;
 case 'mist':vertical(0,true,1.25);arc(p,70,-2+q*3,2.1,6);break;
 case 'gusts':for(let i=0;i<2;i++)arc(at(32),76+i*25,-q*8+i*Math.PI,Math.PI*1.5,6-i);line(cast.path,3,.5);break;
 case 'gale':for(let i=0;i<3;i++)arc(at(30+i*12),50+i*20,-1.5+q*5,Math.PI*1.6,5,.9-i*.15);line(cast.path,3,.5);break;
 case 'typhoon':for(let i=0;i<3;i++){const r=35+i*28;arc(cast.impact,r,-q*9+i*1.1,Math.PI*1.7,6-i);light.lineStyle(1,0xbeddb3,.18*fade);light.strokeEllipse(cast.impact.x,cast.impact.y-i*10,r*2,r*.55);}break;
 }
 // Deterministic leaf/dust flecks follow the local gust, with no damage trails.
 const center=cast.id==='typhoon'?cast.impact:p;for(let i=0;i<10;i++){const a=i*2.4+q*5,r=38+i*6;g.fillStyle(i%2?0x9fbd83:0xc6d7b1,.55*fade);g.fillRect(Math.round(center.x+Math.cos(a)*r),Math.round(center.y+Math.sin(a)*r*.6-((clock*12+i*3)%18)),3,2);}
}
