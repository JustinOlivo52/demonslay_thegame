/** First two Wind forms, adapted for top-down combat rather than frame-exact choreography. */
export const WIND_FORMS={
 surface:{name:'Dust Whirlwind Cutter',windup:.18,active:.38,recovery:.28,stamina:34,cooldown:2.1,damage:40,reach:100,halfArc:Math.PI,advance:150},
 wheel:{name:'Claws-Purifying Wind',windup:.22,active:.24,recovery:.34,stamina:44,cooldown:2.8,damage:48,reach:125,halfArc:1.05,advance:0},
} as const;
