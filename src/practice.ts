import {SAVE_KEY,readCharacter} from './character';
const query=new URLSearchParams(location.search);
let savedStyle='water';try{savedStyle=readCharacter(localStorage.getItem(SAVE_KEY))?.style??'water';}catch{}
const style=query.get('style')??savedStyle;
if(style==='flame')import('./flame-lab');
else if(style==='thunder')import('./thunder-lab');
else if(style==='wind')import('./wind-lab');
else import('./water-lab');
