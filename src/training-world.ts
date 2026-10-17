import {TRIAL_AREAS,forestWalkable,paintForest,paintForestForeground} from './forest.ts';
export const REGION_STRIDE=1320;
export const TRAINING_WIDTH=REGION_STRIDE*3+1000;
export const regionOffset=(stage:number)=>Math.min(3,Math.max(0,stage))*REGION_STRIDE;
export const regionEntry=(stage:number)=>({x:regionOffset(stage)+140,y:350});
export const trainingSpawn=(stage:number)=>({x:regionOffset(stage)+TRIAL_AREAS[Math.min(stage,3)].spawn.x,y:TRIAL_AREAS[Math.min(stage,3)].spawn.y});
export const trainingDemon=(stage:number)=>({x:regionOffset(stage)+TRIAL_AREAS[Math.min(stage,3)].demon.x,y:TRIAL_AREAS[Math.min(stage,3)].demon.y});
export function trainingWalkable(x:number,y:number,unlockedStage:number){
 if(x<50||x>regionOffset(unlockedStage)+940||y<90||y>520)return false;
 for(let stage=0;stage<=unlockedStage;stage++)if(forestWalkable(x-regionOffset(stage),y,stage))return true;
 for(let stage=0;stage<unlockedStage;stage++)if(x>=regionOffset(stage)+800&&x<=regionOffset(stage+1)+245&&y>=255&&y<=445)return true;
 return false;
}
export function moveTraining(point:{x:number;y:number},dx:number,dy:number,unlockedStage:number){
 const steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/4));
 for(let i=0;i<steps;i++){if(trainingWalkable(point.x+dx/steps,point.y,unlockedStage))point.x+=dx/steps;if(trainingWalkable(point.x,point.y+dy/steps,unlockedStage))point.y+=dy/steps;}
}
/** Separate textures keep each upload below the minimum WebGL texture-size limit. */
export function createTrainingScenery(add:(key:string,paint:(ctx:CanvasRenderingContext2D)=>void,x:number,width:number,depth:number)=>void){
 for(let stage=0;stage<4;stage++){
  add('training-ground-'+stage,ctx=>paintForest(ctx,stage),regionOffset(stage),1000,0);
  add('training-foreground-'+stage,paintForestForeground,regionOffset(stage),1000,5);
 }
 for(let stage=0;stage<3;stage++)add('training-link-'+stage,ctx=>{
  // These trails are travel space, not narrow combat arenas.
  for(let y=0;y<620;y+=8)for(let x=200;x<520;x+=8){ctx.fillStyle=['#10282a','#18302c','#142c29'][(x*11+y*7)%3];ctx.fillRect(x,y,8,8);}
  for(const x of [220,295,380,475])for(const y of [175,555]){ctx.fillStyle='#3d352e';ctx.fillRect(x,y-36,10,48);for(let k=0;k<5;k++){ctx.fillStyle=['#14362e','#214638','#2c5140'][k%3];ctx.fillRect(x-25+(k%2)*12,y-68+(k%3)*8,48,22);}}
  ctx.fillStyle='#142b29';ctx.fillRect(0,240,765,230);
  for(let y=295;y<485;y+=4)for(let x=0;x<765;x+=4){const n=(x*17+y*23)%37;ctx.fillStyle=['#4b493b','#514d3d','#55503c'][n%3];ctx.fillRect(x,y,4,4);}
  ctx.fillStyle='#36513b';for(let x=0;x<765;x+=13){ctx.fillRect(x,285+(x%7),3,8);ctx.fillRect(x,486+(x%11),3,8);}
  for(const x of [110,560]){ctx.fillStyle='#564738';ctx.fillRect(x,282,5,28);ctx.fillStyle='#ebca88';ctx.fillRect(x-3,274,11,10);}
 },regionOffset(stage)+800,765,.01);
}
