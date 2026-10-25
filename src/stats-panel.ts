import {attributes,nextLevelXP,STAT_RULES,type Progression,type Stat} from './progression';
import './stats.css';
export class StatsPanel{
 private dialog:HTMLDialogElement;private message:HTMLElement;
 constructor(private options:{read:()=>Progression;spend:(stat:Stat)=>boolean;modal:(open:boolean)=>void}){
 this.dialog=document.createElement('dialog');this.dialog.id='stats-panel';this.dialog.setAttribute('aria-labelledby','stats-title');this.dialog.innerHTML='<p class=stats-kicker>YOUR SLAYER · CHARACTER GROWTH</p><h2 id=stats-title>Make your training count.</h2><p id=stats-summary></p><div id=stats-rows></div><p id=stats-message role=status></p><p class=stats-note>Stat points improve your character. Breathing-form upgrades spend separate skill points in Form catalog. Breath capacity is reserved for training. Allocations are permanent in this build.</p><button id=stats-close>Return to the game</button>';
 document.body.append(this.dialog);this.message=this.dialog.querySelector('#stats-message')!;this.dialog.querySelector('#stats-close')!.addEventListener('click',()=>this.dialog.close());this.dialog.addEventListener('close',()=>options.modal(false));
 window.addEventListener('keydown',e=>{if(this.dialog.open&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();this.dialog.close();}},true);
 }
 show(){this.message.textContent='';this.render();this.options.modal(true);this.dialog.showModal();}
 private render(){const p=this.options.read(),a=attributes(p);this.dialog.querySelector('#stats-summary')!.textContent=`Level ${p.level} / 50 · ${p.level===50?'Level cap':`${p.xp} / ${nextLevelXP(p.level)} XP`} · ${p.points} stat points available`;
 const rows=this.dialog.querySelector('#stats-rows')!;rows.replaceChildren();for(const stat of Object.keys(STAT_RULES) as Stat[]){const row=document.createElement('div'),copy=document.createElement('p'),button=document.createElement('button');const value=stat==='vitality'?`${a.health} max HP`:stat==='endurance'?`${a.stamina} max stamina`:stat==='strength'?`${Math.round((a.sword-1)*100)}% sword bonus`:`${Math.round((a.form-1)*100)}% form bonus`;copy.textContent=`${STAT_RULES[stat].name} · ${p.stats[stat]} / 50\n${value} · ${STAT_RULES[stat].effect} per point`;button.textContent=`Increase ${STAT_RULES[stat].name}`;button.disabled=p.points===0||p.stats[stat]===50;button.dataset.stat=stat;button.addEventListener('click',()=>{if(this.options.spend(stat)){this.render();this.message.textContent=`${STAT_RULES[stat].name} increased and saved.`;this.dialog.querySelector<HTMLButtonElement>(`[data-stat=${stat}]`)?.focus();}else this.message.textContent='Could not save this upgrade. Your points were not spent.';});row.append(copy,button);rows.append(row);}
 }
}
