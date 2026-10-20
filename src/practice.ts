import {SAVE_KEY,readCharacter} from './character';
const query=new URLSearchParams(location.search);
let savedStyle='water';try{savedStyle=readCharacter(localStorage.getItem(SAVE_KEY))?.style??'water';}catch{}
const style=query.get('style')??savedStyle;
if(style==='flame')import('./flame-lab');
else if(style==='thunder'||style==='wind'){if(!query.has('style')){query.set('style',style);history.replaceState(null,'','?'+query.toString());}import('./sandbox');}
else import('./water-lab');
