import type {TechniquePhase} from './technique-types';
/** Atlas pose numbers: groups of four variants, two pose groups per image row. */
export const POSE={ready:0,slash:1,high:2,down:3,tuck:4,inverted:5,landing:6,turn:7,thrust:8,still:9,rise:10,charge:11} as const;
export type Pose=typeof POSE[keyof typeof POSE];
export const CHOREOGRAPHY_ATLAS={width:1448,height:1086,cell:181,columns:8,rows:6,poses:12,variants:4};
type Choreography={windup:readonly Pose[];active:readonly Pose[];recovery:readonly Pose[];intent:string};
const {ready:R,slash:S,high:H,down:D,tuck:T,inverted:I,landing:L,turn:B,thrust:P,still:Q,rise:U,charge:C}=POSE;
export const CHOREOGRAPHY:Record<string,Choreography>={
 'thunder:flash':{windup:[Q,D,D],active:[C,C,S,S],recovery:[S,D,R,Q],intent:'Low draw stance, straight burst, horizontal finish'},
 'thunder:rice':{windup:[R,H],active:[S,B,S,B,S,B,S,B,S,B],recovery:[S,R,Q],intent:'Five connected alternating arched cuts'},
 'thunder:swarm':{windup:[R,C],active:[C,S,B,R,C,S,B,R,C,S,B,R],recovery:[S,R,Q],intent:'Circling steps and surrounding slashes'},
 'thunder:distant':{windup:[R,D],active:[C,S,B,S,B,S],recovery:[S,R,Q],intent:'Forward rush and clustered fast cuts'},
 'thunder:heat':{windup:[D,D],active:[D,R,U,U],recovery:[U,H,R,Q],intent:'Planted low guard into a rising cut'},
 'thunder:rumble':{windup:[R,H],active:[S,B,S,B,S,B,S,B,S,B,S,B],recovery:[S,R,Q],intent:'Six consecutive advancing sword cuts'},
 'thunder:god':{windup:[Q,D,D],active:[C,C,S,S],recovery:[S,D,R,Q],intent:'Low explosive rush into one decisive cut'},
 'wind:dust':{windup:[R,C],active:[C,S,B,S,B,S],recovery:[S,R,Q],intent:'Charging horizontal whirlwind cut'},
 'wind:claws':{windup:[R,H],active:[H,S,S],recovery:[S,R,Q],intent:'Four claw traces from one committed swing'},
 'wind:tree':{windup:[R,H],active:[S,B,H,S,B,H,S,B,H],recovery:[S,R,Q],intent:'Surrounding defensive sword sweeps'},
 'wind:rising':{windup:[D,D],active:[D,U,R,D,U,R,D,U],recovery:[U,H,R,Q],intent:'Three climbing upward slashes'},
 'wind:cold':{windup:[R,H,H],active:[H,S,B,H,S,B,H,D],recovery:[D,R,Q],intent:'Elevated expanding circular cuts'},
 'wind:mist':{windup:[D,R],active:[B,R,U,U],recovery:[U,H,R,Q],intent:'Twisting body uppercut'},
 'wind:gusts':{windup:[R,H],active:[T,T,I,I,S,L,D],recovery:[L,R,Q],intent:'Leap, inverted sweep and landing'},
 'wind:gale':{windup:[R,H],active:[U,U,S,B,L],recovery:[L,R,Q],intent:'Advancing aerial circular cut'},
 'wind:typhoon':{windup:[R,T],active:[T,T,I,I,I,D,L],recovery:[L,R,Q],intent:'Backward flip with downward circular cuts'},
 'water:surface':{windup:[R,R],active:[R,S,S],recovery:[S,R,Q],intent:'One horizontal cut'},
 'water:wheel':{windup:[R,R],active:[T,T,I,I,L,D],recovery:[D,R,Q],intent:'Forward leap, tuck, invert, land; vertical circular cut'},
 'water:dance':{windup:[R,R],active:[C,S,B,R,C,S,B,H,C,S],recovery:[S,R,Q],intent:'Winding body turns and flowing cuts'},
 'water:tide':{windup:[R,H],active:[H,S,B,S,H,S,B,S],recovery:[S,R,Q],intent:'Consecutive connected slashes'},
 'water:rain':{windup:[Q,Q],active:[Q,S,S],recovery:[S,Q,Q],intent:'Measured gentle cut toward a yielding target'},
 'water:whirlpool':{windup:[R,H],active:[S,B,R,H,S,B,R,H,S,B,R,H],recovery:[S,R,Q],intent:'Repeated torso pivots and twisting cuts'},
 'water:ripple':{windup:[R,R],active:[R,P,P],recovery:[P,R,Q],intent:'Straight point-first extension'},
 'water:basin':{windup:[R,H,H],active:[H,H,D,D],recovery:[D,R,Q],intent:'Lifted high guard into a descending two-handed cut'},
 'water:turbulent':{windup:[R,C],active:[C,R,C,R,C,R,C,R],recovery:[R,Q],intent:'Light zigzag stepping, not a damaging combo'},
 'water:flux':{windup:[R,H],active:[S,B,R,H,S,B,R,H,S,B,R,H],recovery:[S,R,Q],intent:'Three continuous turning cycles build momentum'},
 'water:calm':{windup:[Q,Q],active:[Q,Q],recovery:[Q,Q],intent:'Still feet, quiet posture; rapid blade response only on contact'},
 'flame:fire':{windup:[R,H],active:[C,C,S,S],recovery:[S,R,Q],intent:'Burst forward into one horizontal cut'},
 'flame:sun':{windup:[D,D],active:[D,R,U,U],recovery:[U,H,R,Q],intent:'Tail guard into rising vertical arc'},
 'flame:universe':{windup:[R,H,H],active:[H,H,D,D],recovery:[D,R,Q],intent:'High guard into descending vertical arc'},
 'flame:undulation':{windup:[R,H],active:[S,B,H,S,B,H,S,B,H],recovery:[S,R,Q],intent:'Circular sword sweeps in a frontal defense'},
 'flame:tiger':{windup:[R,H,H],active:[C,H,S,B,H,S,B,S],recovery:[S,R,Q],intent:'Advance, high guard, then an enveloping series of cuts'},
 'flame:rengoku':{windup:[R,H,H],active:[C,C,S,S],recovery:[S,D,R,Q],intent:'High preparation, explosive rush and one committed slash'},
};
export function choreographyCell(pose:Pose,variant:number){if(!Number.isInteger(pose)||pose<0||pose>=12||!Number.isInteger(variant)||variant<0||variant>3)throw Error('Invalid choreography cell');return {x:(pose%2*4+variant)*181,y:Math.floor(pose/2)*181,w:181,h:181};}
export function sampleChoreography(style:string,id:string,phase:TechniquePhase,phaseProgress:number){const key=style+':'+id,spec=CHOREOGRAPHY[key];if(!spec)throw Error('Missing choreography: '+key);const q=Math.max(0,Math.min(1,phaseProgress)),sequence=phase==='done'?spec.recovery:spec[phase],pose=sequence[Math.min(sequence.length-1,Math.floor(q*sequence.length))];let lift=0;if(phase==='active'){
 if(key==='wind:gusts'||key==='wind:gale'||key==='wind:typhoon')lift=Math.sin(q*Math.PI)*28;
 else if(key==='wind:cold')lift=Math.sin(q*Math.PI)*12;
 else if(key==='water:wheel')lift=Math.sin(q*Math.PI)*25;
 else if(key==='water:basin'||key==='flame:universe')lift=q<.55?Math.sin(q/.55*Math.PI)*18:0;
 else if(key==='water:turbulent')lift=Math.max(0,Math.sin(q*Math.PI*8))*5;
 else if(key==='flame:sun')lift=Math.sin(q*Math.PI)*7;
 }
 return {pose,lift,airborne:pose===T||pose===I||pose===L,step:sequence.length,intent:spec.intent};
}
