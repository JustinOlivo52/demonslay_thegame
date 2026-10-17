import {test} from 'node:test';
import assert from 'node:assert/strict';
import {phaseAt, advanceBetween, formHits, WATER_FORMS} from './water.ts';
test('no damage in windup, recovery or behind a surface slash',()=>{
 assert.equal(formHits('surface',0.1,0,0,0,50,0),false);
 assert.equal(formHits('surface',0.2,0,0,0,50,0),true);
 assert.equal(formHits('surface',0.2,0,0,0,-50,0),false);
 assert.equal(formHits('surface',0.2,0,0,0,96,0),false);
 assert.equal(formHits('surface',0.4,0,0,0,50,0),false);
});
test('wheel advancement is confined to active phase and independent of frame size',()=>{
 assert.equal(advanceBetween('wheel',0,0.2),0);
 let distance=0;for(let i=0;i<100;i++)distance+=advanceBetween('wheel',i/100,(i+1)/100);
 assert.ok(Math.abs(distance-WATER_FORMS.wheel.advance)<1e-9);
 assert.equal(advanceBetween('wheel',0.8,0.9),0);
 assert.equal(phaseAt('wheel',0.25),'active');
 assert.equal(phaseAt('wheel',0.7),'recovery');
 assert.equal(phaseAt('wheel',1),'done');
});
