import {SAVE_KEY,readCharacter} from './character';
let profile=null;
try{profile=readCharacter(localStorage.getItem(SAVE_KEY));}catch{/* Explain missing save below. */}
if(profile){import('./sandbox');}
else {
 document.querySelector('#app')!.innerHTML='<main style="max-width:600px;margin:15vh auto;padding:30px;color:#e8e6dd;font-family:serif"><p>FINAL SELECTION</p><h1>Create your recruit first.</h1><p>This forest uses your saved character and breathing style.</p><a href="./">Return to character creation →</a></main>';
}
