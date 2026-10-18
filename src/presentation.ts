import {paintCrow} from './crow-art';
import {INTRO_PANELS,CEREMONY_PANELS} from './trial-content';
import type {Character} from './character';
import './ceremony.css';
type Options={parent:HTMLElement;profile:Character|null;portrait:HTMLImageElement;onModal:(open:boolean)=>void;onStart:(first:boolean)=>void;onCrow:()=>void;onReplay:()=>void};
export class TrialPresentation{
 private intro:HTMLElement;private ending:HTMLElement;private introStep=0;private first=true;private endingStep=0;
 constructor(private options:Options){
  this.intro=document.createElement('section');this.intro.id='trial-intro';this.intro.className='trial-overlay';this.intro.hidden=true;this.intro.setAttribute('role','dialog');this.intro.setAttribute('aria-modal','true');this.intro.setAttribute('aria-labelledby','intro-title');
  this.intro.innerHTML='<div class=story-card><p class=kicker>FINAL SELECTION · BEFORE YOUR FIRST STEP</p><p id=intro-count></p><h1 id=intro-title></h1><p id=intro-copy></p><div class=story-actions><button id=intro-back>Back</button><button id=intro-next>Continue</button></div></div>';
  this.ending=document.createElement('section');this.ending.id='selection-passed';this.ending.className='trial-overlay';this.ending.hidden=true;this.ending.setAttribute('role','dialog');this.ending.setAttribute('aria-modal','true');this.ending.setAttribute('aria-labelledby','ceremony-title');
  this.ending.innerHTML='<div class=story-card><p class=kicker>THE SEVENTH DAWN · THE SURVIVORS</p><canvas id=survivor-scene width=480 height=160 aria-label="Surviving recruits gather beneath the wisteria at dawn"></canvas><h1 id=ceremony-title></h1><p id=ceremony-copy></p><canvas id=crow-portrait width=80 height=64 aria-label="Your Kasugai crow arrives"></canvas><p id=passed-name></p><div class=story-actions><button id=ceremony-next>Continue</button><button id=replay-trial hidden>Replay tutorial</button><a id=ceremony-return href="?hub=1" hidden>Enter Corps headquarters</a></div><p id=ceremony-note hidden>Your crow will accompany you to Corps headquarters.</p></div>';
  options.parent.append(this.intro,this.ending);
  this.intro.querySelector('#intro-back')!.addEventListener('click',()=>{this.introStep=Math.max(0,this.introStep-1);this.renderIntro();});
  this.intro.querySelector('#intro-next')!.addEventListener('click',()=>{if(this.introStep<2){this.introStep++;this.renderIntro();}else{this.hide();options.onStart(this.first);}});
  this.ending.querySelector('#ceremony-next')!.addEventListener('click',()=>{if(this.endingStep<3){this.endingStep++;if(this.endingStep===3)options.onCrow();this.renderEnding();}});
  this.ending.querySelector('#replay-trial')!.addEventListener('click',()=>{this.hide();options.onReplay();});
  const ctx=this.ending.querySelector<HTMLCanvasElement>('#crow-portrait')!.getContext('2d')!;
  ctx.imageSmoothingEnabled=false;ctx.fillStyle='#7a6950';ctx.fillRect(5,58,70,4);ctx.fillStyle='#b3a078';ctx.fillRect(5,58,70,1);paintCrow(ctx,8,5,1);
 }
 hide(){this.intro.hidden=true;this.ending.hidden=true;this.options.onModal(false);}
 showIntro(first:boolean){this.first=first;this.introStep=0;this.ending.hidden=true;this.intro.hidden=false;this.options.onModal(true);this.renderIntro();}
 showEnding(completed=false){this.endingStep=completed?3:0;this.intro.hidden=true;this.ending.hidden=false;this.options.onModal(true);this.renderEnding();}
 get ceremonyStep(){return this.endingStep;}
 private renderIntro(){const panel=INTRO_PANELS[this.introStep];this.intro.querySelector('#intro-title')!.textContent=panel.title;this.intro.querySelector('#intro-copy')!.textContent=panel.text;this.intro.querySelector('#intro-count')!.textContent=`${this.introStep+1} / 3`;
  const back=this.intro.querySelector<HTMLButtonElement>('#intro-back')!;back.hidden=this.introStep===0;const next=this.intro.querySelector<HTMLButtonElement>('#intro-next')!;next.textContent=this.introStep===2?(this.first?'Begin the trial':'Return to the mountain'):'Continue';next.focus();}
 private renderEnding(){const panel=CEREMONY_PANELS[this.endingStep],final=this.endingStep===3;this.ending.dataset.step=String(this.endingStep);this.ending.querySelector('#ceremony-title')!.textContent=panel.title;this.ending.querySelector('#ceremony-copy')!.textContent=panel.text;
  this.ending.querySelector<HTMLElement>('#crow-portrait')!.hidden=!final;this.ending.querySelector('#passed-name')!.textContent=final?`${this.options.profile?.name||'Recruit'} · Kasugai crow received`:'';
  const next=this.ending.querySelector<HTMLButtonElement>('#ceremony-next')!;next.hidden=final;next.textContent=this.endingStep===2?'Receive your crow':'Continue';this.ending.querySelector<HTMLElement>('#replay-trial')!.hidden=!final;this.ending.querySelector<HTMLElement>('#ceremony-return')!.hidden=!final;this.ending.querySelector<HTMLElement>('#ceremony-note')!.hidden=!final;this.drawSurvivors();if(!final)next.focus();else this.ending.querySelector<HTMLElement>('#ceremony-return')!.focus();}
 private drawSurvivors(){const ctx=this.ending.querySelector<HTMLCanvasElement>('#survivor-scene')!.getContext('2d')!;ctx.imageSmoothingEnabled=false;const sky=ctx.createLinearGradient(0,0,0,160);sky.addColorStop(0,'#869aa5');sky.addColorStop(1,'#e7c493');ctx.fillStyle=sky;ctx.fillRect(0,0,480,160);ctx.fillStyle='#e7d4a0';ctx.fillRect(343,20,30,24);ctx.fillStyle='#5d7168';ctx.beginPath();ctx.moveTo(0,90);ctx.lineTo(90,30);ctx.lineTo(180,90);ctx.lineTo(290,43);ctx.lineTo(480,110);ctx.lineTo(480,160);ctx.lineTo(0,160);ctx.fill();ctx.fillStyle='#596352';ctx.fillRect(0,130,480,30);
  for(const x of [15,448]){ctx.fillStyle='#463d3e';ctx.fillRect(x,18,12,135);ctx.fillStyle='#364d43';ctx.fillRect(x-18,0,67,26);for(let i=0;i<14;i++){ctx.fillStyle=['#79639c','#a18bb6','#c6b3cf'][i%3];ctx.fillRect(x-14+i*4,18,4,20+(i%4)*8);}}
  const img=this.options.portrait,w=img.width/4;for(const [index,x] of [72,145,280,355].entries()){ctx.fillStyle='#303b36';ctx.fillRect(x+8,140,38,4);ctx.drawImage(img,index*w,0,w,img.height,x,68,60,76);}
  // The attendants welcome the survivors; these are small original pixel silhouettes.
  for(const x of [212,240]){ctx.fillStyle=x===212?'#d8d1d9':'#1e2230';ctx.fillRect(x,83,19,21);ctx.fillStyle='#e4c9b6';ctx.fillRect(x+4,88,11,14);ctx.fillStyle='#63536f';ctx.fillRect(x+6,93,2,2);ctx.fillRect(x+12,93,2,2);ctx.fillStyle='#ebe5d1';ctx.fillRect(x+2,102,16,39);ctx.fillStyle='#8e819e';ctx.fillRect(x,114,20,5);ctx.fillStyle='#3b303c';ctx.fillRect(x+4,140,13,3);ctx.fillStyle='#9484a0';ctx.fillRect(x+4,84,11,3);}
 }
}
