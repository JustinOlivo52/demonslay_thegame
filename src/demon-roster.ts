/** Reusable visual archetypes, independent of level. No Blood Demon Arts at levels 1–5. */
export const DEMON_ARCHETYPES = [
 {id:'ash',name:'Goro, the Hollow Fist',column:0,silhouette:'Heavy charcoal fists and a white hair tuft'},
 {id:'thorn',name:'Ibara, the Briar Stalker',column:1,silhouette:'Branching horns and a ragged moss cloak'},
 {id:'lantern',name:'Akame, the Watcher',column:2,silhouette:'One large amber eye and a straw waist wrap'},
 {id:'veil',name:'Shigure, the Veiled',column:3,silhouette:'Long silver hair and a torn plum robe'},
 {id:'tusk',name:'Aoto, the Mountain Maw',column:4,silhouette:'Broad shoulders and short upward tusks'},
] as const;
export type DemonArchetypeId=typeof DEMON_ARCHETYPES[number]['id'];
export function rollDemonEncounter(level:number,seed:number,forcedId?:string){
 if(!Number.isInteger(level)||level<1||level>5)throw new Error('This roster supports demon levels 1–5.');
 if(!Number.isInteger(seed)||seed<0||seed>0xffffffff)throw new Error('Encounter seed must be an unsigned 32-bit integer.');
 const mixed=(Math.imul(seed,1664525)+1013904223)>>>0;
 const archetype=forcedId?DEMON_ARCHETYPES.find(a=>a.id===forcedId):DEMON_ARCHETYPES[Math.floor(mixed/4294967296*DEMON_ARCHETYPES.length)];
 if(!archetype)throw new Error('Unknown demon archetype.');
 return {version:1 as const,seed,level,archetype,maxHealth:125+(level-1)*20,damage:20+(level-1)*3,bloodDemonArt:null};
}
