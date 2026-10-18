export type Body = 'male' | 'female';
export type StarterStyle = 'water' | 'flame' | 'thunder';
export type Character = {version:1;name:string;body:Body;style:StarterStyle;backstory:string;level:1;ownedForms:[string,string];checkpoint:'selection-ready'};
export const SAVE_KEY = 'nightfall.character.v1';
export const STARTERS = {
 water:{name:'Water Breathing',mentor:'Giyu Tomioka',description:'Measured movement. Flowing attacks. A steady resolve.',forms:['Water Surface Slash','Water Wheel'],ids:['water-01','water-02']},
 flame:{name:'Flame Breathing',mentor:'Kyojuro Rengoku',description:'Decisive strikes. Unwavering spirit. A burning resolve.',forms:['Unknowing Fire','Rising Scorching Sun'],ids:['flame-01','flame-02']},
 thunder:{name:'Thunder Breathing',mentor:'Jigoro Kuwajima',description:'A former Hashira’s instruction. One decisive burst of speed.',forms:['Thunderclap and Flash','Rice Spirit'],ids:['thunder-01','thunder-02']},
} as const;
export function validateName(value:string):string {
 const name=value.trim().replace(/\s+/g,' ');
 if(name.length<2||name.length>24)throw new Error('Use a name between 2 and 24 characters.');
 if(/[<>\u0000-\u001f]/.test(name))throw new Error('Use letters, numbers, spaces, or ordinary punctuation.');
 return name;
}
const ORIGINS=[
 ['a mountain village','a traveler who stood between your neighbors and a demon','protect the people who cannot protect themselves'],
 ['a roadside inn','a missing relative whose trail ended after sunset','discover what happened and prevent another disappearance'],
 ['a charcoal-burning settlement','a stranger wearing the Corps uniform who brought you safely home','repay that kindness by guiding others through the dark'],
 ['a riverside town','a night when familiar streets became a place of fear','make sure another family can greet the morning together'],
];
/** Offline story fixtures for checkpoint testing, not a connected generative-AI service. */
export function makeBackstory(style:StarterStyle,variant:number):string {
 const [home,memory,purpose]=ORIGINS[((variant%ORIGINS.length)+ORIGINS.length)%ORIGINS.length];
 return `You grew up in ${home}. You still remember ${memory}. That memory became a promise: ${purpose}.\n\nMonths of training followed: steep mountain paths, a wooden practice sword, and the patient discipline of breathing. ${style==='water'?'Water taught you to adapt without surrendering your purpose.':style==='thunder'?'Thunder taught you to build speed from a grounded stance and commit in a single instant.':'Flame taught you to commit to a strike without losing control.'} Your instructor has judged you ready for Final Selection.\n\nAt the foot of Mount Fujikasane, wisteria stirs in the evening air. You are not a member of the Demon Slayer Corps yet. Tonight, you take the first step.`;
}
export function createCharacter(name:string,body:Body,style:StarterStyle,backstory:string):Character {
 const normalized=validateName(name);
 if(!['male','female'].includes(body)||!['water','flame','thunder'].includes(style))throw new Error('Choose a valid character and breathing style.');
 if(backstory.trim().length<40||backstory.length>1600)throw new Error('Keep your backstory between 40 and 1,600 characters.');
 return {version:1,name:normalized,body,style,backstory:backstory.trim(),level:1,ownedForms:[...STARTERS[style].ids],checkpoint:'selection-ready'};
}
export function readCharacter(raw:string|null):Character|null {
 try{
  if(!raw)return null;const data=JSON.parse(raw);
  if(data.version!==1||data.level!==1||data.checkpoint!=='selection-ready')return null;
  const character=createCharacter(data.name,data.body,data.style,data.backstory);
  if(JSON.stringify(data.ownedForms)!==JSON.stringify(character.ownedForms))return null;
  return character;
 }catch{return null;}
}
