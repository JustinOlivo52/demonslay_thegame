import {thunderImage,windImage,recruitColumn} from './recruit-palette';
import {STARTERS,SAVE_KEY,createCharacter,makeBackstory,readCharacter,type Body,type StarterStyle} from './character';
import './creation.css';
import {RUN_KEY,readRun,profileKey} from './tutorial';

if(new URLSearchParams(location.search).has('hub')) {
 import('./hub');
} else if(new URLSearchParams(location.search).has('selection')) {
 import('./selection');
} else if(new URLSearchParams(location.search).has('sandbox')||new URLSearchParams(location.search).has('demo')||new URLSearchParams(location.search).has('finishTest')) {
 import('./sandbox');
} else {
 const app=document.querySelector<HTMLDivElement>('#app')!;
 let body:Body='male',style:StarterStyle='water',step=1,variant=0;
 let story=makeBackstory(style,variant),name='',saved=readStored(),dirtyStory=false;
 function readStored(){try{return readCharacter(localStorage.getItem(SAVE_KEY));}catch{return null;}}
 app.innerHTML=`<div class="creation-shell"><header class="creation-header"><a href="./" class="brand"><span>夜</span> NIGHTFALL<small>A DEMON SLAYER FAN GAME</small></a><a class="sandbox-link" href="?sandbox=1">Developer sandbox <span>↗</span></a></header>
 <main class="creation-main"><section class="character-stage" aria-label="Character preview"><div class="stage-top"><span>YOUR STORY BEGINS HERE</span><span>壱 / 01</span></div><div class="moon"></div><div class="mountain mountain-back"></div><div class="mountain mountain-front"></div><div class="tree tree-left"></div><div class="tree tree-right"></div><div class="torii"><i></i><b></b><span></span></div><div class="ground-shadow"></div><canvas id="recruit" width="120" height="150" aria-label="Male Water Breathing recruit preview"></canvas><div class="preview-caption"><span id="preview-style">WATER BREATHING</span><h2 id="preview-name">An unwritten name.</h2><p>Level 1 · Before Final Selection</p></div><div class="stage-bottom"><span>藤襲山</span> MOUNT FUJIKASANE <span>AT DUSK</span></div></section>
 <section class="creation-panel"><nav class="steps" aria-label="Character creation steps"><button data-step="1" aria-current="step"><span>01</span> Your slayer</button><button data-step="2"><span>02</span> Your origin</button><button data-step="3"><span>03</span> Your resolve</button></nav>
 <div id="step-1" class="step"><p class="kicker">BEFORE THE FIRST NIGHT</p><h1>Every blade<br>has a beginning.</h1><p class="lead">Choose who you’ll become. Your breathing style shapes your first techniques and the path ahead.</p><label class="field-label" for="name">YOUR NAME <span>2–24 characters</span></label><input id="name" maxlength="24" autocomplete="off" placeholder="Name your slayer" aria-describedby="error"><fieldset class="body-options"><legend>CHARACTER</legend><label><input name="body" value="male" type="radio" checked><span>Male recruit</span></label><label><input name="body" value="female" type="radio"><span>Female recruit</span></label></fieldset><fieldset class="style-options"><legend>CHOOSE YOUR BREATHING STYLE</legend><label class="style-card water"><input name="style" value="water" type="radio" checked><span class="style-icon">水</span><span><strong>Water</strong><small>Flow. Adapt. Endure.</small></span><span class="selection-mark">✓</span></label><label class="style-card flame"><input name="style" value="flame" type="radio"><span class="style-icon">炎</span><span><strong>Flame</strong><small>Resolve in every strike.</small></span><span class="selection-mark">✓</span></label><label class="style-card thunder"><input name="style" value="thunder" type="radio"><span class="style-icon">雷</span><span><strong>Thunder</strong><small>Stillness. Then lightning.</small></span><span class="selection-mark">✓</span></label><label class="style-card wind"><input name="style" value="wind" type="radio"><span class="style-icon">風</span><span><strong>Wind</strong><small>Become the storm.</small></span><span class="selection-mark">✓</span></label></fieldset><div class="starting-forms"><span>YOUR FIRST TWO FORMS</span><p id="forms"></p></div><p class="choice-note">Both recruits have equal combat capabilities. Outfit colors follow your chosen style.</p></div>
 <div id="step-2" class="step" hidden><p class="kicker">THE REASON YOU CARRY A SWORD</p><h1>A promise<br>worth keeping.</h1><p class="lead">Welcome to the world of Demon Slayers. Beyond the wisteria, the night holds dangers most people never see.</p><label class="field-label" for="story">YOUR BACKSTORY <span>Editable</span></label><textarea id="story" minlength="40" maxlength="1600" rows="12"></textarea><button id="regenerate" class="quiet-button">↻ Try another origin</button><p class="choice-note">This prototype uses local story templates. Live AI backstory generation will be connected later. Your story does not change your stats.</p></div>
 <div id="step-3" class="step" hidden><p class="kicker">BEFORE YOU CROSS THE WISTERIA</p><h1>Carry your<br>resolve forward.</h1><p class="lead">Your instructor has prepared you. Final Selection will put that training to the test.</p><dl class="summary"><div><dt>Name</dt><dd id="summary-name"></dd></div><div><dt>Character</dt><dd id="summary-body"></dd></div><div><dt>Breathing style</dt><dd id="summary-style"></dd></div><div><dt>Starting level</dt><dd>1 · Two forms granted</dd></div></dl><p class="checkpoint-note">CHECKPOINT 1<br><span>This build saves your recruit and prepares the Final Selection handoff. Your recruit is ready for the Final Selection tutorial.</span></p></div>
 <div id="complete" class="step" hidden><p class="kicker">YOUR RECRUIT IS READY</p><h1>The mountain<br>awaits.</h1><p class="lead" id="saved-message"></p><div class="checkpoint-note">FINAL SELECTION · TUTORIAL<br><span>Your character is saved in this browser. Survive the forest lessons and Hand Demon, then receive your crow. Progress saves between encounters.</span></div><a class="primary-button" href="?selection=1" style="text-decoration:none;margin-bottom:14px">Enter Final Selection <span>→</span></a><button id="edit" class="primary-button">Review your recruit <span>↶</span></button><a class="secondary-link" href="?sandbox=1">Visit the developer combat sandbox ↗</a></div>
 <p id="error" role="alert"></p><div class="navigation"><button id="back" class="quiet-button" hidden>← Back</button><button id="next" class="primary-button">Write your origin <span>→</span></button></div><div id="resume-banner" hidden><p>A recruit is already saved in this browser.</p><button id="resume" class="quiet-button">Review saved recruit</button></div></section></main><footer class="creation-footer"><span>PERSONAL FAN PROJECT · PIXEL ART DEVELOPMENT BUILD</span><span>Character creation / Checkpoint 01</span></footer></div>`;
 const $=<T extends HTMLElement=HTMLElement>(selector:string)=>document.querySelector<T>(selector)!;
 if(saved){let crow=false;try{crow=readRun(localStorage.getItem(RUN_KEY),profileKey(saved)).crow;}catch{}if(crow){const link=document.createElement('a');link.className='secondary-link';link.href='?hub=1';link.textContent='Continue to Corps headquarters →';$('#resume-banner').append(link);}}
 const canvas=$<HTMLCanvasElement>('#recruit'),ctx=canvas.getContext('2d')!;ctx.imageSmoothingEnabled=false;ctx.setTransform(0.25,0,0,0.25,0,0);
 let golden:HTMLCanvasElement|undefined,verdant:HTMLCanvasElement|undefined;const image=new Image();image.src='art/recruit-creation-sheet.png';
 image.onload=()=>{golden=thunderImage(image);verdant=windImage(image);drawRecruit();};
 image.onerror=()=>{$('#error').textContent='Character artwork could not load. Reload to retry.';};
 function drawRecruit(){
  if(!image.complete||!image.naturalWidth)return;
  ctx.clearRect(0,0,480,600);
  const index=recruitColumn(style,body);
  const cw=Math.floor(image.naturalWidth/4),ch=image.naturalHeight;
  const sw=cw,sh=ch;
  const scale=Math.min(410/sw,460/sh);
  ctx.drawImage(style==='wind'&&verdant?verdant:style==='thunder'&&golden?golden:image,index*cw,0,sw,sh,(480-sw*scale)/2,550-sh*scale,sw*scale,sh*scale);
  canvas.setAttribute('aria-label',`${body==='male'?'Male':'Female'} ${STARTERS[style].name} recruit preview`);
 }
 function update(){
  $('.creation-shell').dataset.style=style;
  $('#preview-style').textContent=STARTERS[style].name.toUpperCase();$('#preview-name').textContent=name.trim()||'An unwritten name.';
  $('#forms').textContent=`I · ${STARTERS[style].forms[0]}  /  II · ${STARTERS[style].forms[1]}`;
  $('#summary-name').textContent=name.trim();$('#summary-body').textContent=body==='male'?'Male recruit':'Female recruit';$('#summary-style').textContent=STARTERS[style].name;
  drawRecruit();
 }
 function show(next:number){
  step=next;for(let i=1;i<=3;i++)$(`#step-${i}`).hidden=i!==step;
  $('#complete').hidden=step!==4;$('.navigation').hidden=step===4;$('#back').hidden=step===1;
  $('#next').innerHTML=step===1?'Write your origin <span>→</span>':step===2?'Review your resolve <span>→</span>':'Save recruit <span>→</span>';
  document.querySelectorAll<HTMLButtonElement>('[data-step]').forEach(b=>{if(Number(b.dataset.step)===step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  $('#error').textContent='';update();const heading=document.querySelector<HTMLElement>('.step:not([hidden]) h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
 }
 $('#name').addEventListener('input',()=>{name=$<HTMLInputElement>('#name').value;$('#error').textContent='';update();});
 document.querySelectorAll<HTMLInputElement>('input[name=body]').forEach(input=>input.addEventListener('change',()=>{body=input.value as Body;update();}));
 document.querySelectorAll<HTMLInputElement>('input[name=style]').forEach(input=>input.addEventListener('change',()=>{style=input.value as StarterStyle;if(!dirtyStory){story=makeBackstory(style,variant);$<HTMLTextAreaElement>('#story').value=story;}update();}));
 $<HTMLTextAreaElement>('#story').value=story;
 $('#story').addEventListener('input',()=>{story=$<HTMLTextAreaElement>('#story').value;dirtyStory=true;});
 $('#regenerate').addEventListener('click',()=>{variant++;story=makeBackstory(style,variant);dirtyStory=false;$<HTMLTextAreaElement>('#story').value=story;});
 function advance(){try{const character=createCharacter(name,body,style,story);if(step<3){show(step+1);return;}localStorage.setItem(SAVE_KEY,JSON.stringify(character));saved=character;$('#saved-message').textContent=`${character.name}, your path begins with ${STARTERS[character.style].name}. Your first two forms are recorded. You are ready to attempt Final Selection.`;show(4);$('#resume-banner').hidden=true;}catch(error){$('#error').textContent=error instanceof Error&&error.name==='QuotaExceededError'?'Your browser could not save this recruit. Free storage space and try again.':error instanceof Error?error.message:'Unable to save. Check browser storage permissions.';}}
 $('#next').addEventListener('click',advance);$('#back').addEventListener('click',()=>show(Math.max(1,step-1)));$('#edit').addEventListener('click',()=>show(1));
 document.querySelectorAll<HTMLButtonElement>('[data-step]').forEach(b=>b.addEventListener('click',()=>{const target=Number(b.dataset.step);if(target<=step)show(target);else {try{createCharacter(name,body,style,story);show(target);}catch(error){$('#error').textContent=(error as Error).message;}}}));
 $('#resume-banner').hidden=!saved;$('#resume').addEventListener('click',()=>{if(!saved)return;name=saved.name;body=saved.body;style=saved.style;story=saved.backstory;dirtyStory=true;$<HTMLInputElement>('#name').value=name;$<HTMLTextAreaElement>('#story').value=story;$<HTMLInputElement>(`input[name=body][value=${body}]`).checked=true;$<HTMLInputElement>(`input[name=style][value=${style}]`).checked=true;show(3);});
 update();
}
