import './fullscreen.css';
let changing=false,lastExit=-1000;
export function fullscreenEscape(event:KeyboardEvent){return event.code==='Escape'&&(!!document.fullscreenElement||performance.now()-lastExit<350);}
export function fullscreenTransition(){return changing;}
/** Native fullscreen always starts from the player's button click. Rejections remain visible. */
export function mountFullscreen(host:HTMLElement,focus:HTMLElement,onResize:()=>void=()=>{}){
 const button=document.createElement('button');button.type='button';button.className='fullscreen-toggle';button.dataset.fullscreenToggle='';button.textContent='Fullscreen';button.setAttribute('aria-pressed','false');
 const status=document.createElement('span');status.className='fullscreen-status';status.setAttribute('role','status');host.append(button,status);
 const supported=!!document.fullscreenEnabled&&typeof document.documentElement.requestFullscreen==='function';if(!supported){button.disabled=true;status.textContent='Fullscreen is unavailable in this browser or embedded preview.';}
 const sync=()=>{const active=!!document.fullscreenElement;document.documentElement.classList.toggle('game-fullscreen',active);button.textContent=active?'Exit fullscreen':'Fullscreen';button.setAttribute('aria-pressed',String(active));if(!active)lastExit=performance.now();requestAnimationFrame(()=>{onResize();focus.focus({preventScroll:true});});};
 document.addEventListener('fullscreenchange',sync);
 button.addEventListener('click',async()=>{if(changing)return;changing=true;button.disabled=true;status.textContent='';try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();sync();}catch{status.textContent='Fullscreen was blocked. Open the game in its own browser tab and try again.';}finally{changing=false;button.disabled=!supported;}});
 return button;
}
