import type Phaser from 'phaser';
import {MIST_KIT,mistPhase,mistProgress,mistConceals,type MistTechnique} from './mist-kit';
import type {TechniqueVisual,Point} from './technique-types';
export function paintMistTechnique(g:Phaser.GameObjects.Graphics,light:Phaser.GameObjects.Graphics,cast:TechniqueVisual<MistTechnique>,p:Point,clock:number){
 const f=MIST_KIT[cast.id],phase=mistPhase(cast.id,cast.elapsed),q=mistProgress(cast.id,cast.elapsed),fade=phase==='recovery'?Math.max(0,1-(cast.elapsed-f.windup-f.active)/f.recovery):1;
 if(phase==='done')return;
 const line=(points:Point[],alpha=1)=>{for(const [width,color,a]of [[8,0x668c95,.28],[4,0xb7d2d5,.7],[1,0xf1ffff,.95]]){g.lineStyle(width,color,a*alpha*fade);g.beginPath();points.forEach((v,i)=>i?g.lineTo(v.x,v.y):g.moveTo(v.x,v.y));g.strokePath();}};
 const at=(forward:number,side=0)=>({x:p.x+Math.cos(cast.angle)*forward-Math.sin(cast.angle)*side,y:p.y+Math.sin(cast.angle)*forward+Math.cos(cast.angle)*side});
 const arc=(radius:number,start:number,length:number)=>line(Array.from({length:25},(_,i)=>{const a=cast.angle+start+length*i/24;return {x:p.x+Math.cos(a)*radius,y:p.y+Math.sin(a)*radius};}));
 if(phase==='windup'){g.lineStyle(1,0xd9e9ec,.35);g.strokeEllipse(p.x,p.y+19,36,10);return;}
 // Low translucent wisps leave the torso, enemy tells and paths readable.
 for(let i=0;i<7;i++){const a=i*2.4+clock*.4,r=20+(i*13)%70;g.fillStyle(0xb0c9cf,.055*fade);g.fillEllipse(p.x+Math.cos(a)*r,p.y+20+Math.sin(a)*r*.25,38,9);}
 if(cast.path.length>1)line(cast.path.map(v=>({x:v.x,y:v.y+18})),.2);
 switch(cast.id){
 case 'haze':{const tip=at(20+100*Math.min(1,q*2));line([at(10),tip]);light.fillStyle(0xebffff,.7*fade);light.fillRect(tip.x-2,tip.y-2,4,4);break;}
 case 'layers':{const beat=Math.min(7,Math.floor(q*8)),t=q*8-beat,dir=beat%2?-1:1;arc(72,-dir*1.05,dir*2.1*Math.min(1,t*1.5));break;}
 case 'scatter':arc(87,q*Math.PI*2,Math.PI*1.7);break;
 case 'shift':arc(78,-1.2,2.4*Math.min(1,q*1.5));break;
 case 'sea':{const beat=Math.min(2,Math.floor(q*3)),t=q*3-beat,dir=beat%2?-1:1;arc(85,-dir*1.3,dir*2.6*t);break;}
 case 'lunar':{const t=(q*3)%1;for(let i=0;i<3;i++){const a=at(35+i*17,(i-1)*17);line([{x:a.x,y:a.y-55*(1-t)},{x:a.x+9,y:a.y+12}],.5+t*.5);}break;}
 case 'obscure':{if(mistConceals(cast.id,cast.elapsed))for(let i=1;i<=3;i++){const v=cast.path[Math.max(0,cast.path.length-1-i*5)];if(v){g.fillStyle(0xc4dadd,.12/i*fade);g.fillEllipse(v.x,v.y-9,15,39);g.fillCircle(v.x,v.y-32,6);}}arc(78,-1,2*Math.min(1,(q*3)%1*1.6));break;}
 }
}
