export type Point={x:number;y:number};
export type TechniquePhase='windup'|'active'|'recovery'|'done';
export type TechniqueDefinition={number:number;name:string;windup:number;active:number;recovery:number;stamina:number;cooldown:number;reach:number;halfArc:number;advance:number;hits:readonly number[];geometry:'fan'|'circle'|'impact'|'defense';note:string};
export type TechniqueVisual<Id extends string>={id:Id;elapsed:number;angle:number;origin:Point;impact:Point;path:Point[]};
