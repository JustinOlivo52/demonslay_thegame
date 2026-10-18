import {readRun,profileKey} from './tutorial.ts';
import type {Character} from './character.ts';
export const HUB_KEY='nightfall.headquarters.v1';
export const HUB_VISITS=['room','crow','training','smith','mentor'] as const;
export type HubVisit=typeof HUB_VISITS[number];
export type HubSave={version:1;profileKey:string;location:'courtyard'|'room';visited:HubVisit[];welcomed:boolean;savedAt:number};
export function canEnterHub(profile:Character|null,runRaw:string|null){return !!profile&&readRun(runRaw,profileKey(profile)).crow;}
export function newHub(key:string):HubSave{return {version:1,profileKey:key,location:'courtyard',visited:[],welcomed:false,savedAt:0};}
export function readHub(raw:string|null,key:string):HubSave{
 try{const d=JSON.parse(raw||'null');if(d?.version===1&&d.profileKey===key&&['courtyard','room'].includes(d.location)&&typeof d.welcomed==='boolean'&&Number.isSafeInteger(d.savedAt)&&d.savedAt>=0&&Array.isArray(d.visited)&&d.visited.length<=HUB_VISITS.length&&new Set(d.visited).size===d.visited.length&&d.visited.every((id:unknown)=>HUB_VISITS.includes(id as HubVisit)))return {version:1,profileKey:key,location:d.location,visited:[...d.visited],welcomed:d.welcomed,savedAt:d.savedAt};}catch{}
 return newHub(key);
}
export function visitHub(save:HubSave,id:HubVisit):HubSave{return {...save,visited:save.visited.includes(id)?[...save.visited]:[...save.visited,id]};}
export function hubSnapshot(save:HubSave,location:HubSave['location'],now:number):HubSave{return {...save,location,visited:[...save.visited],savedAt:now};}
