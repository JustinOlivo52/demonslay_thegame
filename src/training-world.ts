import {TRIAL_AREAS,forestWalkable,paintForest,paintForestForeground,canopy} from './forest.ts';
export const REGION_STRIDE=1320,BASE_Y=420,TRAINING_HEIGHT=1400;
export const TRAINING_WIDTH=REGION_STRIDE*3+1000;
export const regionOffset=(stage:number)=>Math.min(3,Math.max(0,stage))*REGION_STRIDE;
export const regionEntry=(stage:number)=>({x:regionOffset(stage)+140,y:350+BASE_Y});
export const trainingSpawn=(stage:number)=>({x:regionOffset(stage)+TRIAL_AREAS[Math.min(stage,3)].spawn.x,y:TRIAL_AREAS[Math.min(stage,3)].spawn.y+BASE_Y});
export const trainingDemon=(stage:number)=>({x:regionOffset(stage)+TRIAL_AREAS[Math.min(stage,3)].demon.x,y:TRIAL_AREAS[Math.min(stage,3)].demon.y+BASE_Y});
type Point={x:number;y:number};
export const EXPLORATION_LOOPS:readonly (readonly Point[])[]=[
 [{x:350,y:715},{x:350,y:450},{x:190,y:240},{x:490,y:240},{x:620,y:470},{x:670,y:770}],
 [{x:260,y:770},{x:280,y:500},{x:600,y:320},{x:800,y:520},{x:720,y:770}],
 [{x:250,y:770},{x:250,y:1060},{x:540,y:1180},{x:800,y:1030},{x:750,y:770}],
 [{x:280,y:770},{x:220,y:470},{x:520,y:320},{x:760,y:500},{x:720,y:770}],
];
export const LOWER_BAMBOO_LOOP=[{x:250,y:770},{x:250,y:1080},{x:620,y:1210},{x:830,y:990},{x:750,y:770}];
export const UPPER_QUARRY_LOOP=[{x:260,y:770},{x:300,y:470},{x:600,y:260},{x:820,y:480},{x:750,y:770}];
export const SUPPLIES=[{id:'foothill-cache',stage:0,x:200,y:260,name:'A weathered medicine satchel'},{id:'waystation-cache',stage:2,x:540,y:1180,name:'An abandoned healer’s chest'}] as const;
export const LANDMARKS=[{stage:1,x:620,y:1210,name:'The old campsite',text:'Cold ashes and a torn bedroll. Someone rested here before choosing a way back to the mountain.'},{stage:2,x:600,y:260,name:'The stone cairn',text:'Training marks are carved into the stone. There is more than one way through this mountain.'}] as const;
function nearSegment(x:number,y:number,a:Point,b:Point,r:number){const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a.x-t*dx,y-a.y-t*dy)<=r;}
function nearPath(x:number,y:number,path:readonly Point[],r=76){return path.slice(1).some((p,i)=>nearSegment(x,y,path[i],p,r));}
function branchWalkable(x:number,y:number,stage:number){return nearPath(x,y,EXPLORATION_LOOPS[stage])||(stage===1&&nearPath(x,y,LOWER_BAMBOO_LOOP))||(stage===2&&nearPath(x,y,UPPER_QUARRY_LOOP))||(stage===0&&((x-300)/185)**2+((y-240)/110)**2<=1)||(stage===2&&((x-540)/175)**2+((y-1180)/110)**2<=1)||(stage===3&&((x-500)/420)**2+((y-800)/295)**2<=1);}
export function trainingWalkable(x:number,y:number,unlockedStage:number){
 if(x<50||x>regionOffset(unlockedStage)+940||y<80||y>1340)return false;
 for(let stage=0;stage<=unlockedStage;stage++){const lx=x-regionOffset(stage);if(lx>=50&&lx<=940&&(forestWalkable(lx,y-BASE_Y,stage)||branchWalkable(lx,y,stage)))return true;}
 for(let stage=0;stage<unlockedStage;stage++)if(x>=regionOffset(stage)+800&&x<=regionOffset(stage+1)+245&&y>=255+BASE_Y&&y<=445+BASE_Y)return true;
 return false;
}
export function moveTraining(point:Point,dx:number,dy:number,unlockedStage:number){
 const steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/4));
 for(let i=0;i<steps;i++){if(trainingWalkable(point.x+dx/steps,point.y,unlockedStage))point.x+=dx/steps;if(trainingWalkable(point.x,point.y+dy/steps,unlockedStage))point.y+=dy/steps;}
}
export function createTrainingScenery(add:(key:string,paint:(ctx:CanvasRenderingContext2D)=>void,x:number,width:number,depth:number,y?:number,height?:number)=>void){
 for(let stage=0;stage<4;stage++){
  add('mountain-bg-'+stage,ctx=>{
   let seed=197+stage*991;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
   for(let y=0;y<TRAINING_HEIGHT;y+=8)for(let x=0;x<1320;x+=8){ctx.fillStyle=['#10282a','#18302c','#142c29'][Math.floor(random()*3)];ctx.fillRect(x,y,8,8);}
   for(let y=90;y<TRAINING_HEIGHT;y+=78)for(let x=45;x<1300;x+=78){const px=x+random()*18,py=y+random()*18;if(trainingWalkable(regionOffset(stage)+px,py,3)||trainingWalkable(regionOffset(stage)+px,py-40,3))continue;canopy(ctx,px,py+40,random);}
  },regionOffset(stage),1320,-.2,0,TRAINING_HEIGHT);
  add('training-ground-'+stage,ctx=>paintForest(ctx,stage),regionOffset(stage),1000,0,BASE_Y);
  add('training-foreground-'+stage,paintForestForeground,regionOffset(stage),1000,5,BASE_Y);
  add('branch-ground-'+stage,ctx=>{
   for(let y=80;y<1340;y+=4)for(let x=50;x<940;x+=4){if(!branchWalkable(x,y,stage))continue;const n=(Math.imul(x,374761393)^Math.imul(y,668265263))>>>0;ctx.fillStyle=['#4b493b','#514d3d','#55503c'][((n^(n>>>13))>>>0)%3];ctx.fillRect(x,y+40,4,4);}
   for(const item of [...SUPPLIES,...LANDMARKS].filter(p=>p.stage===stage)){
    ctx.fillStyle='#26352e';ctx.fillRect(item.x-35,item.y+26,70,24);ctx.fillStyle='#6c6851';ctx.fillRect(item.x-28,item.y+19,56,12);
   }
   if(stage===0){ctx.fillStyle='#5b5950';ctx.fillRect(290,241,22,38);ctx.fillStyle='#969482';ctx.fillRect(294,236,14,8);}
   if(stage===1){ctx.fillStyle='#312c28';ctx.fillRect(590,1230,60,8);ctx.fillStyle='#766657';ctx.fillRect(603,1217,34,6);ctx.fillStyle='#816e58';ctx.fillRect(645,1235,44,12);}
   if(stage===2){ctx.fillStyle='#5c6760';ctx.fillRect(582,280,38,20);ctx.fillRect(588,265,26,15);ctx.fillStyle='#92968a';ctx.fillRect(591,261,20,5);}
  },regionOffset(stage),1000,.005,0,TRAINING_HEIGHT);
 }
 for(let stage=0;stage<3;stage++)add('training-link-'+stage,ctx=>{
  ctx.fillStyle='#142b29';ctx.fillRect(0,240,765,230);
  for(let y=295;y<485;y+=4)for(let x=0;x<765;x+=4){ctx.fillStyle=['#4b493b','#514d3d','#55503c'][(x*17+y*23)%3];ctx.fillRect(x,y,4,4);}
  ctx.fillStyle='#36513b';for(let x=0;x<765;x+=13){ctx.fillRect(x,285+(x%7),3,8);ctx.fillRect(x,486+(x%11),3,8);}
  for(const x of [110,560]){ctx.fillStyle='#564738';ctx.fillRect(x,282,5,28);ctx.fillStyle='#ebca88';ctx.fillRect(x-3,274,11,10);}
 },regionOffset(stage)+800,765,.01,BASE_Y);
}
