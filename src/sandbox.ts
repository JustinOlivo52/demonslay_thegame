import Phaser from 'phaser';
import {TUTORIAL_STAGES,RUN_KEY,profileKey,readRun,advanceRun,newRun,heal} from './tutorial';
import SPRITE_REGIONS from './sprite-regions.json';
import DEMON_FEET_ANCHORS from './demon-roster-anchors.json';
import {DEMON_ARCHETYPES,rollDemonEncounter} from './demon-roster';
import {FOREST_CLUES,FOREST_SHRINE,FOREST_SPAWN,FOREST_DEMON,FOREST_ROUTE,forestWalkable,moveThroughForest,paintForestForeground,paintForest} from './forest';
import {SAVE_KEY,readCharacter,STARTERS} from './character';
import PIXEL_ANCHORS from './pixel-anchors.json';
import { FINISHER, canFinish } from './finisher';
import { RULES as R, inSwordArc } from './combat';
import { RIG } from './rig';
import { WATER_FORMS, phaseAt, activeProgress, advanceBetween, formHits, type WaterId } from './water';
import './style.css';
import './forest.css';

const IS_SELECTION=new URLSearchParams(location.search).has('selection');
const PROFILE=(()=>{try{return readCharacter(localStorage.getItem(SAVE_KEY));}catch{return null;}})();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header><a class="wordmark" href="./"><span class="kanji">夜</span> <span>NIGHTFALL</span></a><span class="build">PIXEL COMPARISON / EXPERIMENT</span></header>
<main><section class="intro"><div><p class="eyebrow">THE FIRST STEP TO HASHIRA</p><h1>A different kind of motion.</h1><p>Pixel sprite animation experiment · same arena and combat rules</p></div><div class="checkpoint"><span class="dot"></span> Combat playtest <small>Movement · timing · survival</small></div></section>
<div class="layout"><section class="game-panel"><div class="arena-heading"><span>01 — WISTERIA TRAINING GROUNDS</span><span>NIGHT / PRACTICE</span></div><div id="game" tabindex="0" aria-label="Combat arena. WASD to move, mouse to aim, click or J to attack, Space to dodge, Escape to pause."></div><div class="arena-footer"><span id="status" role="status">Enter the arena to begin.</span><span id="score">DEMONS DEFEATED 00</span></div></section>
<aside><section class="lab"><p class="eyebrow">WATER TECHNIQUE LAB</p><label for="form-select">Equipped form</label><select id="form-select"><option value="surface">1 · Water Surface Slash</option><option value="wheel">2 · Water Wheel</option></select><button id="cast" class="secondary">Use form · Q</button><button id="replay" class="secondary">Reset + demonstrate form</button><label><input type="checkbox" id="dummy" checked> Stationary target (no attacks)</label><label><input type="checkbox" id="hitboxes" checked> Show hitboxes</label><label><input type="checkbox" id="slow"> Slow motion · ¼ speed</label><p id="form-status" role="status"></p><details><summary>Tune selected form</summary><label>Damage <input id="tune-damage" type="number" min="1" max="125" step="1"></label><label>Reach <input id="tune-reach" type="number" min="30" max="160" step="1"></label><label>Stamina <input id="tune-stamina" type="number" min="0" max="100" step="1"></label><label>Cooldown (s) <input id="tune-cooldown" type="number" min="0.5" max="10" step="0.1"></label><p>Timing uses fixed windup / active / recovery phases for this first test. Changes apply to the next cast.</p></details><p>Blue outline = damage area during active frames. Surface Slash uses new sprite poses. Wheel remains a motion prototype; this sheet has no somersault frames.</p></section><p class="eyebrow">YOUR LOADOUT</p><h2>Slayer recruit</h2><p class="muted">Level 1 · Combat foundation</p><div class="resource"><div>Vitality <span id="hp">100 / 100</span></div><progress id="health" max="100" value="100"></progress></div><div class="resource"><div>Stamina <span id="sp">100 / 100</span></div><progress id="stamina" max="100" value="100"></progress></div><hr><p class="eyebrow">CONTROLS</p><dl><dt><kbd>W A S D</kbd></dt><dd>Move</dd><dt><kbd>MOUSE</kbd></dt><dd>Aim</dd><dt><kbd>CLICK</kbd> / <kbd>J</kbd></dt><dd>Sword attack</dd><dt><kbd>SPACE</kbd></dt><dd>Dodge · 28 stamina</dd><dt><kbd>F</kbd></dt><dd>Finish vulnerable demon</dd><dt><kbd>ESC</kbd></dt><dd>Pause</dd></dl><button id="start">Enter the arena <span>↗</span></button><button id="retry" class="secondary">Reset encounter</button><p class="tip">Read the demon’s pose to dodge melee attacks. At zero HP, approach and press F within four seconds to finish it before full regeneration.</p></aside></div>
<section class="notes"><div><p class="eyebrow">PLAYTEST 01</p><h3>Does the fight feel right?</h3></div><p>Try moving diagonally, dodging a strike, and attacking from different angles. Then tell us what feels responsive, confusing, or unfair.</p><span>Next checkpoint<br><strong>Breathing forms</strong></span></section></main><footer>Personal fan-game prototype · Original character art <span>Keyboard + mouse required</span></footer>`;

if(IS_SELECTION&&PROFILE){
 document.querySelector('.build')!.textContent='FINAL SELECTION / FIRST FOREST SLICE';
 document.querySelector('.arena-heading span:last-child')!.textContent='NIGHT / SELECTION';
 document.querySelector('.checkpoint')!.textContent='Explore · investigate · survive';
 document.querySelector('.notes>span')!.textContent='Next checkpoint: Corps headquarters';
 document.querySelector('.intro h1')!.textContent='Beyond the wisteria.';
 document.querySelector('.intro p:not(.eyebrow)')!.textContent='Mount Fujikasane · The first night of Final Selection';
 document.querySelector('.arena-heading span')!.textContent='01 — THE WISTERIA PATH';
 document.querySelector('.lab')!.setAttribute('hidden','');
 document.querySelector('aside h2')!.textContent=PROFILE.name;
 document.querySelector('.muted')!.textContent=`Level 1 · ${STARTERS[PROFILE.style].name}`;
 document.querySelector('#start')!.textContent='Enter the forest';
 document.querySelectorAll<HTMLOptionElement>('#form-select option').forEach((option,i)=>{option.textContent=`${i+1} · ${STARTERS[PROFILE.style].forms[i]}`;});
 const objectives=document.createElement('section');objectives.className='lab';
 objectives.innerHTML='<p class="eyebrow">FINAL SELECTION · TUTORIAL</p><h3 id="trial-objective">Follow the forest trail</h3><p id="trial-hint" role="status">WASD to move. Find the broken cord, then press E to inspect it.</p><p>Mouse / J: sword · Space: dodge<br>1 / 2: choose form · Q: use form<br>F: finish · Esc: pause</p><p id="trial-form"></p><a href="./">Return to your recruit ↗</a>';
 document.querySelector('aside')!.prepend(objectives);
 document.querySelector('.notes h3')!.textContent='Your first night in the forest.';
 document.querySelector('.notes p:not(.eyebrow)')!.textContent='Follow the trail, survive three lesser-demon lessons, face the Hand Demon, and receive your Kasugai crow at dawn.';
 document.querySelector('.tip')!.textContent='Ordinary attacks are signaled by the demon’s pose. Dodge, use your breathing forms, and press F when it is vulnerable.';
}

if(IS_SELECTION&&PROFILE){
 document.body.classList.add('forest-play');
 const nav=document.createElement('div');nav.className='forest-nav';nav.innerHTML='<a href="./">夜 &nbsp; NIGHTFALL</a><span>FINAL SELECTION · THE FIRST NIGHT</span><div id="forest-actions"></div>';document.querySelector('main')!.prepend(nav);
 for(const id of ['start','retry'])document.querySelector('#forest-actions')!.append(document.querySelector('#'+id)!);
 const hud=document.createElement('div');hud.className='forest-hud';hud.innerHTML='<div class="forest-vitals"><p id="forest-recruit"></p><div id="vital-bars"></div></div><div id="forest-objectives"></div><div class="forest-dock"><div id="forest-slots"></div><p id="forest-controls">WASD Move · Mouse Aim · J / Click Sword · Space Dodge · E Inspect · H Potion · F Finish · Esc Pause</p></div>';document.querySelector('.game-panel')!.append(hud);
 document.querySelector('#forest-recruit')!.textContent=`${PROFILE.name} · Level 1`;
 document.querySelectorAll('aside .resource').forEach(node=>document.querySelector('#vital-bars')!.append(node));
 document.querySelector('#forest-objectives')!.append(document.querySelector('#trial-objective')!,document.querySelector('#trial-hint')!);
 document.querySelector('#forest-slots')!.append(document.querySelector('#trial-form')!);
 document.querySelector('#trial-hint')!.textContent='Follow the winding trail. Look for signs left by other candidates.';
}

function initialEncounter(){
 let seed=Math.floor(Math.random()*0x100000000);
 if(IS_SELECTION&&PROFILE){
  const identity=JSON.stringify([PROFILE.name,PROFILE.body,PROFILE.style]);
  try{const old=JSON.parse(localStorage.getItem('nightfall.selection.encounter.v1')||'null');
   if(old?.identity===identity&&old.version===1&&Number.isInteger(old.seed)&&old.seed>=0&&old.seed<=0xffffffff)seed=old.seed;
   else localStorage.setItem('nightfall.selection.encounter.v1',JSON.stringify({version:1,identity,seed}));
  }catch{/* Offline generation still works if browser storage is unavailable. */}
 }
 return rollDemonEncounter(1,seed);
}
const W = 1000, H = 620;
const SERIF = 'Marcellus, Georgia, serif', SANS = '"DM Sans", sans-serif', KANJI = '"Noto Serif JP", "Hiragino Mincho ProN", serif';
const PLAYER_FEET = 40, DEMON_FEET = 46, ZOOM = 1.3, TAU = Math.PI * 2;
const MOONLIGHT = 0xe0dbec; // gentle cool tint so the illustrations sit inside the night scene
const SL = RIG.slayer, DM = RIG.demon, KT = RIG.katana;
const LANTERNS = [{x: 30, y: 325}, {x: 970, y: 325}];

type Mode = 'ready' | 'playing' | 'paused' | 'lost' | 'won';
type Particle = {x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: number; drag: number; gravity: number; glow: boolean};
type Petal = {x: number; y: number; vx: number; vy: number; rot: number; spin: number; color: number};
type Ghost = {x: number; y: number; facing: number; life: number; lean: number};
type Floater = {text: Phaser.GameObjects.Text; life: number};

// Deterministic random numbers so the painted scenery is identical on every load.
function seeded(seed: number) {
  return () => {seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296;};
}

function paintWisteria(ctx: CanvasRenderingContext2D, rand: () => number, top: number, hang: number) {
  for (let i = 0; i < 13; i++) {
    const cx = i * 82 + rand() * 20 - 10;
    for (let k = 0; k < 9; k++) {
      ctx.fillStyle = ['#132a20', '#1a3528', '#224230'][k % 3];
      ctx.beginPath(); ctx.arc(cx + rand() * 76 - 38, top + rand() * 24, 14 + rand() * 14, 0, Math.PI * 2); ctx.fill();
    }
    for (let k = 0; k < 6; k++) {
      ctx.fillStyle = 'rgba(120,170,120,0.18)';
      ctx.beginPath(); ctx.ellipse(cx + rand() * 70 - 35, top + rand() * 20, 6, 3, rand() * 3, 0, Math.PI * 2); ctx.fill();
    }
    for (let r = 0; r < 12; r++) {
      const x0 = cx + rand() * 80 - 40, y0 = top + 12 + rand() * 16, len = hang * (0.5 + rand() * 0.6), lean = (rand() - 0.5) * 0.25;
      ctx.fillStyle = 'rgba(10,6,20,0.35)';
      ctx.beginPath(); ctx.ellipse(x0 + 3, y0 + len * 0.5 + 4, 6, len * 0.5, lean, 0, Math.PI * 2); ctx.fill();
      for (let s = 0; s < len; s += 2.2) {
        const t = s / len, width = 7.5 * (1 - t * 0.85);
        for (let j = 0; j < 3; j++) {
          ctx.fillStyle = `rgba(${Math.round(132 + 95 * t)},${Math.round(96 + 112 * t)},${Math.round(196 + 52 * t)},${(0.9 - t * 0.2).toFixed(2)})`;
          ctx.beginPath(); ctx.arc(x0 + s * lean + (rand() - 0.5) * width * 2, y0 + s, 2.5 * (1 - t * 0.45), 0, Math.PI * 2); ctx.fill();
        }
      }
    }
  }
}

function paintLantern(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(x + 3, y + 22, 20, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#4a4a50'; ctx.fillRect(x - 13, y + 4, 26, 16);
  ctx.fillStyle = '#5d5d63'; ctx.fillRect(x - 6, y - 4, 12, 10);
  ctx.fillStyle = '#3c3c42'; ctx.fillRect(x - 11, y - 18, 22, 16);
  ctx.fillStyle = '#ffd38a'; ctx.fillRect(x - 5, y - 14, 10, 8);
  ctx.fillStyle = '#6a6a71'; ctx.beginPath(); ctx.moveTo(x - 18, y - 18); ctx.lineTo(x + 18, y - 18); ctx.lineTo(x + 8, y - 28); ctx.lineTo(x - 8, y - 28); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#7b7b83'; ctx.fillRect(x - 3, y - 33, 6, 6);
}

function paintGround(ctx: CanvasRenderingContext2D) {
  const rand = seeded(7);
  ctx.fillStyle = '#0d171c'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 1400; i++) {ctx.fillStyle = rand() < 0.5 ? 'rgba(60,96,80,0.35)' : 'rgba(22,44,38,0.6)'; ctx.fillRect(rand() * W, rand() * H, 2, 3);}
  const earth = ctx.createLinearGradient(0, 60, 0, 585);
  earth.addColorStop(0, '#2c2e36'); earth.addColorStop(1, '#22242b');
  ctx.fillStyle = earth; ctx.fillRect(52, 64, 896, 516);
  for (let i = 0; i < 1500; i++) {ctx.fillStyle = rand() < 0.5 ? 'rgba(210,210,235,0.035)' : 'rgba(0,0,0,0.12)'; ctx.fillRect(52 + rand() * 896, 64 + rand() * 516, 1 + rand() * 2, 1 + rand() * 2);}
  // Flagstone paths from each lantern to the training ring.
  for (const side of [-1, 1]) for (let i = 0; i < 6; i++) {
    const x = 500 + side * (205 + i * 46), y = 325 + (rand() - 0.5) * 10;
    ctx.fillStyle = '#3a3c44'; ctx.beginPath(); ctx.ellipse(x, y, 17 + rand() * 4, 12 + rand() * 3, rand(), 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.beginPath(); ctx.ellipse(x - 3, y - 3, 10, 6, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Raked sand training ring bound by a rope with paper streamers.
  ctx.save(); ctx.translate(500, 325);
  const sand = ctx.createRadialGradient(0, 0, 10, 0, 0, 180);
  sand.addColorStop(0, '#4a4b52'); sand.addColorStop(1, '#383940');
  ctx.fillStyle = sand; ctx.beginPath(); ctx.arc(0, 0, 178, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 2;
  for (let r = 16; r < 172; r += 9) {ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();}
  ctx.lineWidth = 7; ctx.strokeStyle = '#8c7650'; ctx.beginPath(); ctx.arc(0, 0, 181, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 2; ctx.strokeStyle = '#5a4930';
  for (let a = 0; a < Math.PI * 2; a += 0.055) {ctx.beginPath(); ctx.moveTo(Math.cos(a) * 177.5, Math.sin(a) * 177.5); ctx.lineTo(Math.cos(a + 0.035) * 184.5, Math.sin(a + 0.035) * 184.5); ctx.stroke();}
  for (let i = 0; i < 8; i++) {
    ctx.save(); ctx.rotate(Math.PI / 8 + i * Math.PI / 4); ctx.translate(184, 0); ctx.fillStyle = '#ece6d6';
    ctx.beginPath(); ctx.moveTo(0, -3); ctx.lineTo(9, -3); ctx.lineTo(6, 1); ctx.lineTo(13, 1); ctx.lineTo(10, 5); ctx.lineTo(17, 5); ctx.lineTo(4, 8); ctx.lineTo(6, 3); ctx.lineTo(0, 3); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  ctx.restore();
  // Fallen petals, thinned inside the raked ring.
  for (let i = 0; i < 110; i++) {
    const x = 52 + rand() * 896, y = 64 + rand() * 516;
    if (Math.hypot(x - 500, y - 325) < 176 && rand() < 0.75) continue;
    ctx.fillStyle = `rgba(${170 + Math.round(rand() * 50)},${128 + Math.round(rand() * 40)},${215 + Math.round(rand() * 35)},${(0.25 + rand() * 0.4).toFixed(2)})`;
    ctx.beginPath(); ctx.ellipse(x, y, 2.6, 1.5, rand() * Math.PI, 0, Math.PI * 2); ctx.fill();
  }
  // Wooden fence with posts.
  ctx.strokeStyle = '#3d2d24'; ctx.lineWidth = 8; ctx.strokeRect(48, 60, 904, 524);
  ctx.strokeStyle = 'rgba(255,215,170,0.08)'; ctx.lineWidth = 1; ctx.strokeRect(44, 56, 912, 532);
  ctx.fillStyle = '#271c17';
  for (let x = 48; x <= 952; x += 56.5) {ctx.fillRect(x - 5, 54, 10, 13); ctx.fillRect(x - 5, 578, 10, 13);}
  for (let y = 60; y <= 584; y += 58) {ctx.fillRect(42, y - 5, 13, 10); ctx.fillRect(946, y - 5, 13, 10);}
  for (const l of LANTERNS) paintLantern(ctx, l.x, l.y);
  paintWisteria(ctx, rand, -6, 50);
}

function paintForeground(ctx: CanvasRenderingContext2D) {
  paintWisteria(ctx, seeded(31), 596, 24);
}

function paintLight(ctx: CanvasRenderingContext2D) {
  const moon = ctx.createRadialGradient(880, 20, 0, 880, 20, 560);
  moon.addColorStop(0, 'rgba(185,200,255,0.13)'); moon.addColorStop(1, 'rgba(185,200,255,0)');
  ctx.fillStyle = moon; ctx.fillRect(0, 0, W, H);
  const vignette = ctx.createRadialGradient(500, 320, 230, 500, 320, 640);
  vignette.addColorStop(0, 'rgba(3,5,14,0)'); vignette.addColorStop(1, 'rgba(3,5,14,0.72)');
  ctx.fillStyle = vignette; ctx.fillRect(0, 0, W, H);
}

function paintHurt(ctx: CanvasRenderingContext2D) {
  const red = ctx.createRadialGradient(500, 310, 220, 500, 310, 600);
  red.addColorStop(0, 'rgba(190,20,45,0)'); red.addColorStop(1, 'rgba(190,20,45,0.85)');
  ctx.fillStyle = red; ctx.fillRect(0, 0, W, H);
}

class Arena extends Phaser.Scene {
  private under!: Phaser.GameObjects.Graphics;
  private over!: Phaser.GameObjects.Graphics;
  private glow!: Phaser.GameObjects.Graphics;
  private top!: Phaser.GameObjects.Graphics;
  private hurtImage!: Phaser.GameObjects.Image;
  private label!: Phaser.GameObjects.Text;
  private shade!: Phaser.GameObjects.Rectangle;
  private bigKanji!: Phaser.GameObjects.Text;
  private title!: Phaser.GameObjects.Text;
  private subtitle!: Phaser.GameObjects.Text;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private run=readRun((()=>{try{return localStorage.getItem(RUN_KEY);}catch{return null;}})(),PROFILE?profileKey(PROFILE):'sandbox');
  private get stage(){return TUTORIAL_STAGES[Math.min(this.run.stage,3)];}
  private get isBoss(){return IS_SELECTION&&this.run.stage===3;}
  private attackCount=0;private bossHeavy=false;private potionCount=2;private transitionSaved=false;
  private bossSprite!:Phaser.GameObjects.Sprite;private bossHead!:Phaser.GameObjects.Sprite;
  private encounter=initialEncounter();
  private encounterSeed=this.encounter.seed;
  private get enemyMaxHp(){return IS_SELECTION?this.stage.health:this.encounter.maxHealth;}
  private get enemyDamage(){return IS_SELECTION?(this.bossHeavy?this.stage.damage+5:this.stage.damage):this.encounter.damage;}
  private p = {x: 300, y: 340}; private e = {x: 700, y: 340};
  private hp = R.health; private stamina = R.stamina; private ehp = this.enemyMaxHp;
  private angle = 0; private swing = 0; private swordCooldown = 0;
  private dodge = 0; private dodgeCooldown = 0; private dodgeVector = new Phaser.Math.Vector2();
  private enemyState: 'chase' | 'windup' | 'recovery' | 'downed' | 'dead' = 'chase';
  private executionFlash = 0;
  private finishRemaining = 0;
  private enemyTimer = 0; private target = {x: 0, y: 0};
  private hurt = 0; private wins = 0; private mode: Mode = 'ready';
  // Presentation-only state; none of it feeds back into combat rules.
  private clock = 0; private walk = 0; private moving = false; private demonWalk = 0;
  private hitFlash = 0; private hurtFx = 0; private ehpShown = this.enemyMaxHp; private deathFade = 0; private endDelay = 0; private ghostTimer = 0; private overlayAlpha = 0;
  private particles: Particle[] = []; private petals: Petal[] = []; private ghosts: Ghost[] = []; private floaters: Floater[] = [];
  private player!: Phaser.GameObjects.Container; private body!: Phaser.GameObjects.Image; private legL!: Phaser.GameObjects.Image; private legR!: Phaser.GameObjects.Image;
  private fallen!: Phaser.GameObjects.Image; private katana!: Phaser.GameObjects.Image; private demonSprite!: Phaser.GameObjects.Image; private ghostPool: Phaser.GameObjects.Image[] = [];
  private strikeAnim = 0; private aim = new Phaser.Math.Vector2();
  private selectedForm: WaterId = 'surface';
  private trainingDummy = true; private showHitboxes = true; private slowMotion = false;
  private technique: {id: WaterId; elapsed: number; angle: number; hit: boolean; damage: number; reach: number} | null = null;
  private formCooldowns = {surface: 0, wheel: 0};
  private tuning = {surface: {damage: 35, reach: 95, stamina: 20, cooldown: 1.4}, wheel: {damage: 45, reach: 70, stamina: 32, cooldown: 2.5}};
  private labMessage = 'Q to cast · 1 / 2 to select a form';
  private pixelHead!: Phaser.GameObjects.Sprite;
  private finishTest = new URLSearchParams(location.search).has('finishTest');
  private pixelDemon!: Phaser.GameObjects.Sprite;
  private tourIndex = 0;
  private shrineRead = false;
  private interactLabel!: Phaser.GameObjects.Text;
  private trialClues = 0;
  private trialText = '';
  private trialCombat = false;
  private trialSaved = false;
  private profileActor!: Phaser.GameObjects.Sprite;
  private demoMode = new URLSearchParams(location.search).has('demo');
  private pixelActor!: Phaser.GameObjects.Sprite;
  private playerFlash = 0; private clawLife = 0; private clawAt = {x: 0, y: 0};
  constructor() {super('Arena');}
  preload() {
    this.load.image('hand-demon','art/hand-demon-sheet.png');
    this.load.image('profile-motion','art/recruit-motion-sheet.png');
    this.load.image('profile-idle','art/recruit-creation-sheet.png');
    this.load.image('pixel-demon', 'art/demon-roster-sheet.png');
    this.load.image('pixel-sheet', 'art/pixel-slayer-sheet.png');
    for (const key of ['slayer-body', 'slayer-leg-l', 'slayer-leg-r', 'slayer-full', 'demon', 'katana']) this.load.image(key, `art/${key}.png`);
  }
  create() {
    const sheet=this.textures.get('pixel-sheet');
    const source=sheet.getSourceImage() as HTMLImageElement;
    const cellW=Math.floor(source.width/4),cellH=Math.floor(source.height/4);
    for(let i=0;i<16;i++)sheet.add(i,0,(i%4)*cellW,Math.floor(i/4)*cellH,cellW,cellH);
    sheet.setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.pixelActor=this.add.sprite(0,0,'pixel-sheet',0).setOrigin(0.5,0.98).setDisplaySize(150,150);
    const demonSheet=this.textures.get('pixel-demon');
    const demonSource=demonSheet.getSourceImage() as HTMLImageElement;
    const dw=Math.floor(demonSource.width/5),dh=Math.floor(demonSource.height/4);
    for(const [i,r] of SPRITE_REGIONS['pixel-demon'].frames.entries())demonSheet.add(i,0,r.x,r.y,r.w,r.h);
    demonSheet.setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.pixelDemon=this.add.sprite(0,0,'pixel-demon',0).setOrigin(0.5,0.94).setDisplaySize(168,168);
    this.pixelHead=this.add.sprite(0,0,'pixel-demon',7).setOrigin(0.5,0.94).setDisplaySize(168,168).setVisible(false);
    for(const [key,rows] of [['profile-motion',4],['profile-idle',1]] as const){
      const tex=this.textures.get(key),img=tex.getSourceImage() as HTMLImageElement;
      const w=Math.floor(img.width/4),h=Math.floor(img.height/rows);
      if(key==='profile-motion'){for(const [i,r] of SPRITE_REGIONS['profile-motion'].frames.entries())tex.add(i,0,r.x,r.y,r.w,r.h);}
      else for(let i=0;i<4*rows;i++)tex.add(i,0,(i%4)*w,Math.floor(i/4)*h,w,h);
      tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
    this.profileActor=this.add.sprite(0,0,'profile-idle',0).setOrigin(0.5,0.96).setDisplaySize(150,150).setVisible(false);
    const boss=this.textures.get('hand-demon'),bossImage=boss.getSourceImage() as HTMLImageElement;
    const bw=Math.floor(bossImage.width/4);for(let i=0;i<4;i++)boss.add(i,0,i*bw,0,bw,bossImage.height);boss.setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.bossSprite=this.add.sprite(0,0,'hand-demon',0).setOrigin(0.5,0.94).setDisplaySize(235,235).setVisible(false);
    this.bossHead=this.add.sprite(0,0,'hand-demon',0).setOrigin(0.5,0.94).setDisplaySize(235,235).setVisible(false);
    const layer = (key: string, paint: (ctx: CanvasRenderingContext2D) => void, depth: number) => {
      const texture = this.textures.createCanvas(key, W, H)!;
      paint(texture.getContext()); texture.refresh();
      return this.add.image(0, 0, key).setOrigin(0).setDepth(depth);
    };
    layer('ground', IS_SELECTION?paintForest:paintGround, 0);
    this.under = this.add.graphics().setDepth(1);
    // Illustrated characters: the slayer is a small cutout rig (two legs under the body), the demon one sprite.
    const part = (p: {key: string; origin: readonly number[]; x: number; y: number}, scale: number) => this.add.image(p.x, p.y, p.key).setOrigin(p.origin[0], p.origin[1]).setScale(scale);
    for (let i = 0; i < 10; i++) this.ghostPool.push(part(SL.full, SL.scale).setVisible(false));
    this.legL = part(SL.legL, SL.scale); this.legR = part(SL.legR, SL.scale); this.body = part(SL.body, SL.scale);
    this.player = this.add.container(0, 0, [this.legL, this.legR, this.body]);
    this.fallen = part(SL.full, SL.scale).setVisible(false);
    this.katana = this.add.image(0, 0, KT.key).setOrigin(KT.origin[0], KT.origin[1]).setScale(KT.scale);
    this.demonSprite = part(DM.full, DM.scale);
    this.over = this.add.graphics().setDepth(3);
    this.glow = this.add.graphics().setDepth(4).setBlendMode(Phaser.BlendModes.ADD);
    layer('foreground', IS_SELECTION?paintForestForeground:paintForeground, 5);
    layer('light', paintLight, 6).setScrollFactor(0);
    this.hurtImage = layer('hurt', paintHurt, 7).setAlpha(0).setScrollFactor(0);
    this.interactLabel=this.add.text(0,0,'',{fontFamily:SANS,fontSize:'12px',color:'#f1e7c9',backgroundColor:'#102326',padding:{x:9,y:7}}).setOrigin(0.5,1).setDepth(9).setVisible(false);
    this.label = this.add.text(0, 0, '', {fontFamily: SANS, fontSize: '12px', fontStyle: '600', color: '#e9cbd4', stroke: '#0b0e18', strokeThickness: 4}).setOrigin(0.5).setDepth(8).setLetterSpacing(1.5);
    this.top = this.add.graphics().setDepth(9);
    this.shade = this.add.rectangle(W / 2, H / 2, W, H, 0x060912, 0.66).setDepth(10).setScrollFactor(0);
    this.bigKanji = this.add.text(W / 2, 300, '', {fontFamily: KANJI, fontSize: '260px', fontStyle: '700', color: '#b49be0'}).setOrigin(0.5).setDepth(10).setScrollFactor(0);
    this.title = this.add.text(W / 2, 290, '', {fontFamily: SERIF, fontSize: '42px', color: '#f1eadb'}).setOrigin(0.5).setDepth(10).setLetterSpacing(4).setScrollFactor(0);
    this.subtitle = this.add.text(W / 2, 344, '', {fontFamily: SANS, fontSize: '15px', color: '#c3b8d8'}).setOrigin(0.5).setDepth(10).setLetterSpacing(1).setScrollFactor(0);
    const rand = seeded(99);
    for (let i = 0; i < 22; i++) this.petals.push({x: rand() * W, y: rand() * H, vx: 14 + rand() * 18, vy: 22 + rand() * 20, rot: rand() * 6, spin: (rand() - 0.5) * 4, color: [0xc6a8ee, 0xa985dc, 0xe2d2f7][i % 3]});
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,SPACE,ESC,J,Q,F,E,H,ENTER,ONE,TWO') as typeof this.keys;
    this.input.keyboard!.addCapture(['SPACE','W','A','S','D']);
    const rosterPanel=document.createElement('details');
    rosterPanel.innerHTML='<summary>Demon encounter pool · levels 1–5</summary><label>Archetype <select id="demon-choice"><option value="random">Random appearance</option>'+DEMON_ARCHETYPES.map(a=>`<option value="${a.id}">${a.name}</option>`).join('')+'</select></label><label>Level <input id="demon-level" type="number" min="1" max="5" value="1" step="1"></label><button id="new-demon" class="secondary">Generate new encounter</button><p>Replay keeps this target. New encounter rolls a seed. No Blood Demon Arts at these levels.</p>';
    document.querySelector(IS_SELECTION?'.lab[hidden]':'.lab')!.append(rosterPanel);
    document.querySelector('#new-demon')!.addEventListener('click',()=>{const input=document.querySelector<HTMLInputElement>('#demon-level')!;const level=input.valueAsNumber;
      if(!Number.isInteger(level)||level<1||level>5){input.setCustomValidity('Choose an integer from 1 to 5.');input.reportValidity();return;}input.setCustomValidity('');
      const id=document.querySelector<HTMLSelectElement>('#demon-choice')!.value;
      this.encounter=rollDemonEncounter(level,Math.floor(Math.random()*0x100000000),id==='random'?undefined:id);this.reset();
    });
    const refreshTuning = () => { const values = this.tuning[this.selectedForm]; for (const key of ['damage','reach','stamina','cooldown'] as const) document.querySelector<HTMLInputElement>(`#tune-${key}`)!.value = String(values[key]); };
    document.querySelector<HTMLSelectElement>('#form-select')!.addEventListener('change', event => { this.selectedForm = (event.target as HTMLSelectElement).value as WaterId; refreshTuning(); });
    for (const key of ['damage','reach','stamina','cooldown'] as const) document.querySelector<HTMLInputElement>(`#tune-${key}`)!.addEventListener('change', event => { const input = event.target as HTMLInputElement; const value = input.valueAsNumber; if (Number.isFinite(value)) this.tuning[this.selectedForm][key] = Phaser.Math.Clamp(value, Number(input.min), Number(input.max)); refreshTuning(); });
    refreshTuning();
    document.querySelector('#dummy')!.addEventListener('change', event => {this.trainingDummy = (event.target as HTMLInputElement).checked; this.reset();});
    document.querySelector('#hitboxes')!.addEventListener('change', event => {this.showHitboxes = (event.target as HTMLInputElement).checked;});
    document.querySelector('#slow')!.addEventListener('change', event => {this.slowMotion = (event.target as HTMLInputElement).checked;});
    document.querySelector('#cast')!.addEventListener('click', () => {this.castForm(); document.querySelector<HTMLElement>('#game')!.focus();});
    document.querySelector('#replay')!.addEventListener('click', () => {this.reset(); this.angle=0; this.castForm();});
    this.input.on('pointerdown', () => {if(this.mode === 'playing') this.attack();});
    document.querySelector('#start')!.addEventListener('click', () => {if(this.mode === 'playing')this.mode='paused';else if(this.mode === 'paused')this.mode='playing';else this.reset();this.sync();});
    document.querySelector('#retry')!.addEventListener('click', () => this.reset());
    window.addEventListener('blur', () => {if(this.mode==='playing'){this.mode='paused';this.sync();}});
    this.cameras.main.setZoom(ZOOM).setBounds(0, 0, W, H).startFollow(this.player, false, 0.12, 0.12, 0, 40);
    if(this.demoMode){this.trainingDummy=false;document.querySelector<HTMLInputElement>('#dummy')!.checked=false;this.showHitboxes=false;document.querySelector<HTMLInputElement>('#hitboxes')!.checked=false;this.reset();}
    if(this.finishTest)(window as unknown as {finishLab: unknown}).finishLab={
      reset:()=>this.reset(),
      teleport:(x:number,y:number)=>{this.p={x,y};},
      hurt:()=>{this.hp=40;},
      next:()=>this.continueTrial(),
      down:()=>{this.ehp=0;this.downDemon();},
      near:()=>{this.p={x:this.e.x-50,y:this.e.y};},
      far:()=>{this.p={x:54,y:74};},
      finish:()=>this.finishDemon(),
      pause:()=>{this.mode='paused';},resume:()=>{this.mode='playing';},
      state:()=>({run:this.run,potions:this.potionCount,playerHealth:this.hp,position:{...this.p},shrine:this.shrineRead,encounter:this.encounter,clues:this.trialClues,combat:this.trialCombat,profile:PROFILE,enemy:this.enemyState,hp:this.ehp,timer:this.finishRemaining,mode:this.mode,wins:this.wins,execution:this.executionFlash,ash:this.deathFade})
    };
    if(IS_SELECTION){this.trainingDummy=false;this.showHitboxes=false;}
    if(IS_SELECTION){
      const actions=document.createElement('div');actions.className='trial-progress';actions.innerHTML='<button id="continue-trial" hidden>Continue trial →</button><span id="trial-supplies"></span>';document.querySelector('.forest-dock')!.prepend(actions);
      document.querySelector('#continue-trial')!.addEventListener('click',()=>this.continueTrial());
      const ending=document.createElement('section');ending.id='selection-passed';ending.hidden=true;ending.innerHTML='<p class="kicker">THE SEVENTH DAWN</p><h1>You survived<br>Final Selection.</h1><p>The nights blur into one another. At last, sunlight reaches the mountain. The surviving candidates are welcomed into the Demon Slayer Corps.</p><canvas id="crow-portrait" class="crow-mark" width="48" height="40" aria-label="Your black Kasugai crow"></canvas><h2>Your Kasugai crow arrives.</h2><p>“Your first assignment will come soon. Until then, rest and prepare!”</p><p id="passed-name"></p><p class="ending-note">Tutorial complete. Corps headquarters is the next checkpoint; its explorable hub is not built yet.</p><a href="./">Return to your recruit</a><button id="replay-trial">Replay tutorial</button>';
      document.querySelector('.game-panel')!.append(ending);
      const crow=document.querySelector<HTMLCanvasElement>('#crow-portrait')!.getContext('2d')!;
      crow.fillStyle='#696153';crow.fillRect(4,34,40,3);crow.fillStyle='#171e29';crow.fillRect(16,15,19,17);crow.fillRect(9,6,14,14);crow.fillRect(7,9,18,9);crow.fillRect(31,25,10,8);crow.fillRect(35,29,10,5);crow.fillStyle='#344351';crow.fillRect(18,17,12,4);crow.fillRect(21,22,11,3);crow.fillStyle='#0b141e';crow.fillRect(23,15,5,14);crow.fillStyle='#b0a174';crow.fillRect(3,13,7,3);crow.fillStyle='#e6d4a7';crow.fillRect(12,10,2,2);crow.fillStyle='#6f736d';crow.fillRect(20,30,2,5);crow.fillRect(28,30,2,5);
      document.querySelector('#replay-trial')!.addEventListener('click',()=>{this.run=newRun(PROFILE?profileKey(PROFILE):'');this.saveRun();this.reset();});
      this.potionCount=this.run.potions;if(this.run.passed)this.showPassed();
    }
    this.sync(); this.draw();
  }
  private reset() {
    if(IS_SELECTION&&this.run.passed){this.showPassed();return;}
    if(IS_SELECTION){const original=rollDemonEncounter(1,this.encounterSeed);this.encounter=rollDemonEncounter(Math.min(this.run.stage+1,5),this.encounterSeed,DEMON_ARCHETYPES[(original.archetype.column+this.run.stage)%5].id);}
    this.transitionSaved=false;this.attackCount=0;this.bossHeavy=false;
    if(IS_SELECTION){this.potionCount=this.run.potions;document.querySelector<HTMLElement>('#selection-passed')?.setAttribute('hidden','');}
    this.p=IS_SELECTION?{...FOREST_SPAWN}:{x:300,y:340};this.e=IS_SELECTION?{...FOREST_DEMON}:{x:this.trainingDummy?380:700,y:340};
    if(IS_SELECTION){this.tourIndex=0;this.shrineRead=false;this.trialClues=0;this.trialCombat=false;this.trialSaved=false;this.trialText='The wisteria ends here. Follow the trail and look for signs of other candidates.';}
    this.executionFlash=0;this.finishRemaining=0;this.technique=null;this.formCooldowns={surface:0,wheel:0};this.labMessage='Q to cast · 1 / 2 to select a form';this.hp=IS_SELECTION?this.run.health:R.health;this.stamina=R.stamina;this.ehp=this.enemyMaxHp;
    this.swing=0;this.swordCooldown=0;this.dodge=0;this.dodgeCooldown=0;this.hurt=0;this.enemyTimer=0;this.enemyState='chase';this.mode='playing';
    this.hitFlash=0;this.hurtFx=0;this.ehpShown=this.enemyMaxHp;this.deathFade=0;this.endDelay=0;this.clawLife=0;this.overlayAlpha=0;this.playerFlash=0;
    this.particles=[];this.ghosts=[];this.strikeAnim=0;this.demonSprite.setCrop();for(const f of this.floaters)f.text.destroy();this.floaters=[];
    if(IS_SELECTION&&this.run.stage>0){this.p={x:690,y:350};this.trialClues=2;this.trialCombat=true;this.trialText=(this.isBoss?'At a sheltered rest point, you recover at least 75 vitality and find a potion. ':'')+this.stage.lesson;}
    this.sync();
    document.querySelector<HTMLElement>('#game')!.focus();
  }
  private saveRun(){try{localStorage.setItem(RUN_KEY,JSON.stringify(this.run));}catch{this.trialText='Browser save unavailable. Keep this tab open to retain your progress.';}}
  private showPassed(){
    this.mode='won';this.enemyState='dead';this.deathFade=0;this.endDelay=0;this.trialCombat=false;
    const panel=document.querySelector<HTMLElement>('#selection-passed');if(panel){panel.hidden=false;document.querySelector('#passed-name')!.textContent=`${PROFILE?.name||'Recruit'} · ${PROFILE?STARTERS[PROFILE.style].name:''} · Kasugai crow received`;}
  }
  private continueTrial(){
    if(!IS_SELECTION||this.mode!=='won'||this.endDelay>0)return;
    if(!this.transitionSaved){this.run=advanceRun(this.run,this.hp,this.potionCount);this.transitionSaved=true;this.saveRun();}
    if(this.run.passed)this.showPassed();else this.reset();
  }
  private usePotion(){
    if(this.mode!=='playing')return;const result=heal(this.hp,this.potionCount);
    this.hp=result.health;this.potionCount=result.potions;
    this.trialText=result.used?'You drink a healing potion. +45 vitality.':this.potionCount===0?'No healing potions remain.':'Your vitality is already full.';
    if(result.used)this.floatText(this.p.x,this.p.y-75,'+45 HP','#bde9be','#143c23',18);
  }
  private attack() {
    if((IS_SELECTION&&!this.trialCombat)||this.mode !== 'playing' || this.enemyState==='downed' || this.technique || this.swordCooldown>0 || this.dodge>0)return;
    this.swordCooldown=R.swordCooldown;this.swing=0.15;
    if(inSwordArc(this.p.x,this.p.y,this.angle,this.e.x,this.e.y)) {
      this.ehp=Math.max(0,this.ehp-R.swordDamage);
      this.onSwordHit(R.swordDamage);
      if(this.ehp===0)this.downDemon();
    }
  }
  private inspectForest(){
    if(this.mode!=='playing')return;
    if(Math.hypot(this.p.x-FOREST_SHRINE.x,this.p.y-FOREST_SHRINE.y)<62){this.shrineRead=true;this.trialText='A small wayside shrine. Someone left a promise here: “Let us all see the dawn.” The side trail returns to the fork.';return;}
    const clue=FOREST_CLUES[this.trialClues];
    if(clue&&Math.hypot(this.p.x-clue.x,this.p.y-clue.y)<62){this.trialText=clue.text;this.trialClues++;if(this.trialClues===2)this.trialCombat=true;}
  }
  private movePlayer(dx:number,dy:number){
    if(IS_SELECTION)moveThroughForest(this.p,dx,dy);
    else{this.p.x=Phaser.Math.Clamp(this.p.x+dx,54,946);this.p.y=Phaser.Math.Clamp(this.p.y+dy,74,570);}
  }
  private downDemon() {
    this.technique=null;this.enemyState='downed';this.finishRemaining=FINISHER.window;this.strikeAnim=0;this.clawLife=0;
    this.labMessage='Demon vulnerable — get close and press F!';
  }
  private finishDemon() {
    if(!canFinish(this.enemyState==='downed',this.finishRemaining,Phaser.Math.Distance.Between(this.p.x,this.p.y,this.e.x,this.e.y)))return;
    this.executionFlash=0.65;this.finishRemaining=0;this.enemyState='dead';this.technique=null;this.swing=0.15;
    this.mode='won';this.wins++;
    this.floatText(this.e.x,this.e.y-85,'DECAPITATED','#d6faff','#183544',18);
    this.onDemonDefeated();this.endDelay+=0.65;
  }
  private castForm() {
    if(IS_SELECTION&&!this.trialCombat){this.trialText='Inspect the clues before engaging the demon.';return;}
    if(this.enemyState==='downed') {this.labMessage='Approach and press F to finish.';return;}
    if(this.mode !== 'playing') {this.labMessage='Start or resume the encounter first.';return;}
    if(this.technique || this.dodge>0 || this.swordCooldown>0) {this.labMessage='Finish the current action first.';return;}
    const id=this.selectedForm, tuning=this.tuning[id];
    if(this.formCooldowns[id]>0) {this.labMessage='This form is cooling down.';return;}
    if(this.stamina<tuning.stamina) {this.labMessage='Not enough stamina.';return;}
    this.stamina-=tuning.stamina;this.formCooldowns[id]=tuning.cooldown;
    this.technique={id,elapsed:0,angle:this.angle,hit:false,damage:tuning.damage,reach:tuning.reach};
    this.labMessage=`${IS_SELECTION&&PROFILE?STARTERS[PROFILE.style].forms[id==='surface'?0:1]:WATER_FORMS[id].name} · windup`;
  }
  private updateTechnique(dt:number) {
    const cast=this.technique;if(!cast)return;
    const old=cast.elapsed;cast.elapsed+=dt;
    const distance=IS_SELECTION&&PROFILE?.style==='flame' ? (cast.id==='surface'?90*Math.max(0,activeProgress(cast.id,cast.elapsed)-activeProgress(cast.id,old)):0) : advanceBetween(cast.id,old,cast.elapsed);
    // Substeps prevent a fast wheel from passing through a target without a hit.
    const steps=Math.max(1,Math.ceil(distance/8));
    for(let i=1;i<=steps;i++) {
      this.movePlayer(Math.cos(cast.angle)*distance/steps,Math.sin(cast.angle)*distance/steps);
      const sample=old+(cast.elapsed-old)*i/steps;
      const originalReach=WATER_FORMS[cast.id].reach;
      const dx=this.e.x-this.p.x,dy=this.e.y-this.p.y;
      // Scale target offsets so formHits uses the tunable reach, including in debug display.
      let hit=formHits(cast.id,sample,this.p.x,this.p.y,cast.angle,this.p.x+dx*originalReach/cast.reach,this.p.y+dy*originalReach/cast.reach);
      if(IS_SELECTION&&PROFILE?.style==='flame')hit=phaseAt(cast.id,sample)==='active'&&Math.hypot(dx,dy)<=cast.reach&&Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(dy,dx)-cast.angle))<=1.15;
      if(!cast.hit && this.enemyState!=='dead' && this.enemyState!=='downed' && hit) {
        cast.hit=true;this.ehp=Math.max(0,this.ehp-cast.damage);this.onSwordHit(cast.damage);
        if(this.ehp===0)this.downDemon();
      }
    }
    if(this.enemyState==='downed')return;
    const phase=phaseAt(cast.id,cast.elapsed);
    this.labMessage=`${WATER_FORMS[cast.id].name} · ${phase} · ${cast.hit ? 'HIT' : 'no hit yet'}`;
    if(phase==='done') {this.labMessage=`${WATER_FORMS[cast.id].name} · ${cast.hit ? 'hit confirmed' : 'missed'}`;this.technique=null;}
  }
  update(_time:number, delta:number) {
    const pointer=this.input.activePointer;this.cameras.main.getWorldPoint(pointer.x,pointer.y,this.aim);
    const dt=Math.min(delta/1000,0.04)*(this.slowMotion ? 0.25 : 1);
    if(Phaser.Input.Keyboard.JustDown(this.keys.ESC)) {if(this.mode==='playing')this.mode='paused';else if(this.mode==='paused')this.mode='playing';}
    if(IS_SELECTION&&Phaser.Input.Keyboard.JustDown(this.keys.ENTER))this.continueTrial();
    if(this.mode==='playing'){
      if(IS_SELECTION&&Phaser.Input.Keyboard.JustDown(this.keys.H))this.usePotion();
      if(IS_SELECTION&&Phaser.Input.Keyboard.JustDown(this.keys.E))this.inspectForest();
      if(this.enemyState==='downed') {
        this.finishRemaining=Math.max(0,this.finishRemaining-dt);
        if(this.finishRemaining===0){this.ehp=this.enemyMaxHp;this.ehpShown=this.enemyMaxHp;this.enemyState='chase';this.labMessage='Too late — the demon fully regenerated!';this.floatText(this.e.x,this.e.y-75,'REGENERATED','#ffb6bf','#3d1522',18);}
        else if(Phaser.Input.Keyboard.JustDown(this.keys.F))this.finishDemon();
      }
      if(!this.technique)this.angle=this.demoMode ? Phaser.Math.Angle.Between(this.p.x,this.p.y,this.e.x,this.e.y) : Phaser.Math.Angle.Between(this.p.x,this.p.y,this.aim.x,this.aim.y);
      for(const id of ['surface','wheel'] as const)this.formCooldowns[id]=Math.max(0,this.formCooldowns[id]-dt);
      for(const [key,id] of [['ONE','surface'],['TWO','wheel']] as const) if(Phaser.Input.Keyboard.JustDown(this.keys[key])) {this.selectedForm=id; document.querySelector<HTMLSelectElement>('#form-select')!.value=id;for(const prop of ['damage','reach','stamina','cooldown'] as const)document.querySelector<HTMLInputElement>(`#tune-${prop}`)!.value=String(this.tuning[id][prop]);}
      if(Phaser.Input.Keyboard.JustDown(this.keys.Q))this.castForm();
      this.swordCooldown=Math.max(0,this.swordCooldown-dt);this.swing=Math.max(0,this.swing-dt);this.hurt=Math.max(0,this.hurt-dt);this.dodgeCooldown=Math.max(0,this.dodgeCooldown-dt);
      let move=new Phaser.Math.Vector2(Number(this.keys.D.isDown)-Number(this.keys.A.isDown),Number(this.keys.S.isDown)-Number(this.keys.W.isDown)).normalize();
      if(this.demoMode&&(!IS_SELECTION||this.trialCombat)){
        const distance=Phaser.Math.Distance.Between(this.p.x,this.p.y,this.e.x,this.e.y);
        const away=this.enemyState==='windup';
        if(this.hp<=55&&this.potionCount>0)this.usePotion();
        move=new Phaser.Math.Vector2(this.e.x-this.p.x,this.e.y-this.p.y).normalize().scale(away?-1:distance>78?1:0);
        if(away&&this.enemyTimer<0.32&&this.dodge===0&&this.dodgeCooldown===0&&this.stamina>=R.dodgeCost&&!this.technique){this.dodge=R.dodgeDuration;this.dodgeCooldown=R.dodgeCooldown;this.stamina-=R.dodgeCost;this.dodgeVector=move.clone();this.onDodge();}
        if(this.enemyState==='downed'&&distance<=FINISHER.reach&&this.finishRemaining<FINISHER.window-0.9)this.finishDemon();
        if(this.enemyState==='recovery'&&distance<=90&&this.formCooldowns.surface===0&&!this.technique&&this.stamina>=20)this.castForm();
      }
      if(IS_SELECTION&&this.demoMode&&!this.trialCombat){
        const tour=[FOREST_ROUTE[1],FOREST_ROUTE[2],FOREST_SHRINE,FOREST_ROUTE[2],FOREST_ROUTE[3],FOREST_CLUES[1]];
        const next=tour[this.tourIndex];
        if(next){const delta=new Phaser.Math.Vector2(next.x-this.p.x,next.y-this.p.y);const near=delta.length()<=12;move=near?new Phaser.Math.Vector2():delta.normalize();if(near){this.inspectForest();this.tourIndex++;}}
      }
      this.moving=move.length()>0;
      if(Phaser.Input.Keyboard.JustDown(this.keys.SPACE)&&!this.technique&&this.dodgeCooldown===0&&this.stamina>=R.dodgeCost){this.dodge=R.dodgeDuration;this.dodgeCooldown=R.dodgeCooldown;this.stamina-=R.dodgeCost;this.dodgeVector=move.length()>0?move.clone():new Phaser.Math.Vector2(Math.cos(this.angle),Math.sin(this.angle));this.onDodge();}
      const velocity=this.technique?new Phaser.Math.Vector2():this.dodge>0?this.dodgeVector.clone().scale(R.dodgeSpeed):move.scale(R.speed);
      this.movePlayer(velocity.x*dt,velocity.y*dt);
      const invulnerable=this.dodge>0;
      this.dodge=Math.max(0,this.dodge-dt);if(!invulnerable&&!this.technique)this.stamina=Math.min(100,this.stamina+R.staminaRegen*dt);
      if(Phaser.Input.Keyboard.JustDown(this.keys.J))this.attack();
      this.updateTechnique(dt);
      if(this.mode==='playing'&&(!IS_SELECTION||this.trialCombat)&&!this.trainingDummy&&this.enemyState==='chase') {
        const distance=Phaser.Math.Distance.Between(this.p.x,this.p.y,this.e.x,this.e.y);
        if(distance<110){this.enemyState='windup';this.attackCount++;this.bossHeavy=this.isBoss&&this.attackCount%2===0;this.enemyTimer=this.isBoss?(this.bossHeavy?1.15:0.85):R.windup;this.target={...this.p};}
        else {const a=Phaser.Math.Angle.Between(this.e.x,this.e.y,this.p.x,this.p.y);if(IS_SELECTION)moveThroughForest(this.e,Math.cos(a)*100*dt,Math.sin(a)*100*dt);else{this.e.x+=Math.cos(a)*100*dt;this.e.y+=Math.sin(a)*100*dt;}}
      } else if(this.mode==='playing'&&(!IS_SELECTION||this.trialCombat)&&!this.trainingDummy&&this.enemyState==='windup') {
        this.enemyTimer-=dt;
        if(this.enemyTimer<=0){
          const inReach=Phaser.Math.Distance.Between(this.p.x,this.p.y,this.target.x,this.target.y)<(this.isBoss?(this.bossHeavy?130:110):R.enemyReach);
          if(inReach&&!invulnerable){this.hp=Math.max(0,this.hp-this.enemyDamage);this.hurt=0.25;this.cameras.main.shake(100,0.004);if(this.hp===0)this.mode='lost';}
          this.onDemonStrike(inReach, invulnerable);
          this.enemyState='recovery';this.enemyTimer=this.isBoss?(this.bossHeavy?1.5:1.2):R.recovery;
        }
      } else if(this.mode==='playing'&&(!IS_SELECTION||this.trialCombat)&&!this.trainingDummy&&this.enemyState==='recovery'){this.enemyTimer-=dt;if(this.enemyTimer<=0)this.enemyState='chase';}
    } else this.moving=false;
    if(this.mode==='won')this.technique=null;
    this.animate(this.mode==='paused'?0:dt);
    if(IS_SELECTION&&this.demoMode&&this.mode==='won'&&this.endDelay===0&&!this.run.passed)this.continueTrial();
    if(IS_SELECTION&&this.mode==='won'&&!this.trialSaved){
      try{localStorage.setItem('nightfall.selection.slice.v1',JSON.stringify({version:1,profile:PROFILE,firstEncounterCleared:true}));this.trialSaved=true;}
      catch{this.trialText='Encounter cleared. Browser storage is unavailable, so completion was not saved.';}
    }
    this.sync();this.draw();
  }

  // ---- Combat feedback hooks -------------------------------------------------
  private onSwordHit(damage: number) {
    this.hitFlash=0.14;
    this.cameras.main.shake(70,0.0025);
    for(let i=0;i<16;i++){const a=this.angle+(Math.random()-0.5)*1.6,s=140+Math.random()*260;this.burst(this.e.x,this.e.y-22,Math.cos(a)*s,Math.sin(a)*s,0.22+Math.random()*0.25,1.5+Math.random()*2.5,i%3===0?0xff5a6e:0xfff0d2,6,0,true);}
    for(let i=0;i<6;i++){const a=this.angle+(Math.random()-0.5)*1.2,s=80+Math.random()*120;this.burst(this.e.x,this.e.y-16,Math.cos(a)*s,Math.sin(a)*s,0.4+Math.random()*0.3,2.5,0x5c0c1e,4,260,false);}
    this.floatText(this.e.x+42+(Math.random()-0.5)*14,this.e.y-66,String(damage),'#fff2da','#4a0f1d',24);
  }
  private onDemonDefeated() {
    this.deathFade=1.1;this.endDelay=1.5;
    for(let i=0;i<40;i++){const ember=Math.random()<0.25;this.burst(this.e.x+(Math.random()-0.5)*44,this.e.y-58+Math.random()*86,(Math.random()-0.5)*50,-25-Math.random()*70,1+Math.random()*1.3,1.5+Math.random()*2.5,ember?0xff8a4a:[0x9a8d94,0xc4b8bd,0x6d5f66][i%3],0.6,-10,ember);}
  }
  private onDodge() {
    this.ghostTimer=0;
    for(let i=0;i<10;i++){const a=Math.atan2(-this.dodgeVector.y,-this.dodgeVector.x)+(Math.random()-0.5)*1.4,s=40+Math.random()*80;this.burst(this.p.x,this.p.y+29,Math.cos(a)*s,Math.sin(a)*s*0.5,0.35+Math.random()*0.2,3+Math.random()*3,0x8c8a92,5,0,false);}
  }
  private onDemonStrike(inReach:boolean, evaded:boolean) {
    this.clawLife=0.38;this.clawAt={...this.target};this.strikeAnim=0.3;
    if(inReach&&evaded)this.floatText(this.p.x,this.p.y-80,'EVADED','#bff3e6','#0d2a26',16);
    else if(inReach){
      this.hurtFx=1;this.playerFlash=0.25;this.floatText(this.p.x+32,this.p.y-70,String(-this.enemyDamage),'#ff9aa6','#3a0711',24);
      for(let i=0;i<12;i++){const a=Math.random()*Math.PI*2,s=60+Math.random()*160;this.burst(this.p.x,this.p.y-10,Math.cos(a)*s,Math.sin(a)*s,0.3+Math.random()*0.2,2+Math.random()*2,0xd8324a,5,200,false);}
      if(this.mode==='lost')this.endDelay=1.1;
    }
  }
  private burst(x:number,y:number,vx:number,vy:number,life:number,size:number,color:number,drag:number,gravity:number,glow:boolean) {
    this.particles.push({x,y,vx,vy,life,max:life,size,color,drag,gravity,glow});
  }
  private floatText(x:number,y:number,text:string,color:string,stroke:string,size:number) {
    const t=this.add.text(x,y,text,{fontFamily:SERIF,fontSize:`${size}px`,color,stroke,strokeThickness:5}).setOrigin(0.5).setDepth(8);
    this.floaters.push({text:t,life:0.8});
  }
  private animate(dt:number) {
    const wasExecuting=this.executionFlash>0;
    this.executionFlash=Math.max(0,this.executionFlash-dt);
    this.clock+=dt;
    if(this.moving)this.walk+=dt*13;
    if(this.enemyState==='chase'&&this.mode==='playing')this.demonWalk+=dt*9;
    this.hitFlash=Math.max(0,this.hitFlash-dt);this.hurtFx=Math.max(0,this.hurtFx-dt*1.8);if(!wasExecuting)this.deathFade=Math.max(0,this.deathFade-dt);this.endDelay=Math.max(0,this.endDelay-dt);this.clawLife=Math.max(0,this.clawLife-dt);this.playerFlash=Math.max(0,this.playerFlash-dt);this.strikeAnim=Math.max(0,this.strikeAnim-dt);
    if(this.mode==='won'||this.mode==='lost')this.swing=Math.max(0,this.swing-dt);
    this.ehpShown=this.ehpShown>this.ehp?Math.max(this.ehp,this.ehpShown-dt*70):this.ehp;
    if(this.dodge>0){this.ghostTimer-=dt;if(this.ghostTimer<=0){this.ghostTimer=0.03;const gf=Math.cos(this.angle)<0?-1:1;this.ghosts.push({x:this.p.x,y:this.p.y,facing:gf,life:0.24,lean:gf*0.22});}}
    if(this.enemyState==='dead'&&this.deathFade>0&&dt>0&&this.executionFlash===0){
      // Crumble from the head down: ash and embers lift off the dissolving edge.
      const top=this.e.y+DEMON_FEET-DM.height,y=top+(1-this.deathFade/1.1)*DM.height;
      for(let i=0;i<5;i++){const ember=Math.random()<0.3;this.burst(this.e.x+(Math.random()-0.5)*60,y+Math.random()*6,(Math.random()-0.5)*40,-30-Math.random()*60,0.8+Math.random()*0.9,1.4+Math.random()*2.2,ember?0xff8a4a:[0x9a8d94,0xc4b8bd,0x6d5f66][i%3],0.6,-10,ember);}
    }
    for(const g of this.ghosts)g.life-=dt;
    this.ghosts=this.ghosts.filter(g=>g.life>0);
    for(const q of this.particles){q.life-=dt;q.vx*=1-Math.min(1,q.drag*dt);q.vy=q.vy*(1-Math.min(1,q.drag*dt))+q.gravity*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;}
    this.particles=this.particles.filter(q=>q.life>0);
    for(const f of this.floaters){f.life-=dt;f.text.y-=dt*46;f.text.setAlpha(Math.min(1,f.life*2.5));if(f.life<=0)f.text.destroy();}
    this.floaters=this.floaters.filter(f=>f.life>0);
    for(const q of this.petals){q.x+=(q.vx+Math.sin(this.clock*1.7+q.rot)*12)*dt;q.y+=q.vy*dt;q.rot+=q.spin*dt;if(q.y>H+10||q.x>W+10){q.y=-10;q.x=Math.random()*W*1.1-80;}}
    const ended=(this.mode==='won'||this.mode==='lost')&&this.endDelay===0;
    const target=this.mode==='ready'||this.mode==='paused'||ended?1:0;
    this.overlayAlpha=dt===0?target:Phaser.Math.Clamp(this.overlayAlpha+(target-this.overlayAlpha)*Math.min(1,dt*6),0,1);
  }

  private sync() {
    if(IS_SELECTION&&PROFILE){
      const title=this.run.passed?'Final Selection passed':this.mode==='won'?(this.isBoss?'The Hand Demon falls':'Encounter cleared'):this.mode==='lost'?'Your trial is not over':this.trialClues===0?'Follow the forest trail':this.trialClues===1?'Follow the tracks uphill':this.enemyState==='downed'?'Finish the demon · F':'Face the demon';
      document.querySelector('#trial-objective')!.textContent=`${Math.min(this.run.stage+1,4)} / 4 · ${this.run.stage>0&&this.mode==='playing'&&this.enemyState!=='downed'?this.stage.title:title}`;
      const next=document.querySelector<HTMLButtonElement>('#continue-trial');if(next){next.hidden=this.mode!=='won'||this.endDelay>0||this.run.passed;next.textContent=this.isBoss?'Greet the dawn →':'Continue trial →';}
      const supplies=document.querySelector('#trial-supplies');if(supplies)supplies.textContent=`H · Potion ${this.potionCount}/2 · ${this.isBoss?'Boss encounter':this.stage.title}`;
      document.querySelector('#trial-hint')!.textContent=this.mode==='won'?'Press Continue or Enter when the ash settles. Progress saves between encounters.':this.mode==='lost'?'Retry to return to the trail entrance. Your character profile is safe.':this.enemyState==='downed'?`Get close and press F · ${this.finishRemaining.toFixed(1)}s until full recovery`:this.trialText;
      document.querySelector('#trial-form')!.textContent=`Equipped: ${STARTERS[PROFILE.style].forms[this.selectedForm==='surface'?0:1]}`;
    }

    document.querySelector('#form-status')!.textContent=`${this.labMessage} · cooldown ${this.formCooldowns[this.selectedForm].toFixed(1)}s`; 
    document.querySelector<HTMLProgressElement>('#health')!.value=this.hp;document.querySelector('#hp')!.textContent=`${this.hp} / 100`;
    document.querySelector<HTMLProgressElement>('#stamina')!.value=this.stamina;document.querySelector('#sp')!.textContent=`${Math.floor(this.stamina)} / 100`;
    const messages={ready:'Enter the arena to begin.',playing:'Read the attack pose. Dodge, strike, then approach and press F to finish.',paused:'Paused — resume when you’re ready.',lost:'You fell in training. Reset and try another approach.',won:'Encounter cleared. Reset to practice again.'};
    document.querySelector('#status')!.textContent=messages[this.mode];document.querySelector('#score')!.textContent=`DEMONS DEFEATED ${String(this.wins).padStart(2,'0')}`;
    document.querySelector('#start')!.textContent=this.mode==='playing'?'Pause encounter':this.mode==='paused'?'Resume':IS_SELECTION?'Enter forest':'Enter the arena ↗';
    const screens:Record<Mode,[string,string,string]>={ready:['夜','THE TRAINING GROUNDS','Enter the arena to begin'],paused:['休','PAUSED','Press Esc or Resume when you’re ready'],lost:['敗','FALLEN IN TRAINING','Reset the encounter to try again'],won:['滅','ENCOUNTER CLEARED','The demon crumbles to ash. Your first step forward.'],playing:['','','']};
    if(IS_SELECTION){screens.ready=['藤','FINAL SELECTION','Enter the forest. Investigate with E.'];screens.won=this.isBoss?['暁','THE HAND DEMON FALLS','Continue to greet the dawn and receive your crow.']:['一','ENCOUNTER CLEARED','Continue to the next lesson.'];screens.lost=['敗','RISE AND TRY AGAIN','Reset to return to the trail entrance.'];}
    const [kanji,title,sub]=screens[this.mode];
    if(this.mode!=='playing'){this.bigKanji.setText(kanji);this.title.setText(title);this.subtitle.setText(sub);}
    const a=this.overlayAlpha;
    this.shade.setAlpha(a*(this.mode==='paused'?0.5:0.66));this.bigKanji.setAlpha(a*0.16);this.title.setAlpha(a);this.subtitle.setAlpha(a);
  }

  // ---- Drawing ---------------------------------------------------------------
  private drawTechnique(o:Phaser.GameObjects.Graphics,l:Phaser.GameObjects.Graphics) {
    const cast=this.technique;if(!cast)return;
    const phase=phaseAt(cast.id,cast.elapsed), progress=activeProgress(cast.id,cast.elapsed);
    const x=this.p.x,y=this.p.y;
    if(phase==='windup') {l.lineStyle(2,0x92e7ff,0.65);l.strokeCircle(x,y,18+cast.elapsed*45);}
    if(phase==='active' && (IS_SELECTION||Boolean(cast.id==='wheel'))) {
      if(cast.id==='surface'||(IS_SELECTION&&PROFILE?.style==='flame')) {
        // Water ribbon stays within the authoritative attack sector.
        for(let i=0;i<4;i++){o.lineStyle(3+i, (IS_SELECTION&&PROFILE?.style==='flame'?[0xfff0b0,0xffc861,0xf38632,0xb74228]:[0xe8fbff,0x9de5ff,0x428ecd,0x225aa1])[i],0.85-i*0.13);o.beginPath();o.arc(x,y,cast.reach-8-i*7,cast.angle-1.15,cast.angle-1.15+2.3*progress);o.strokePath();}
      } else {
        // Elliptical ribbon suggests a vertical wheel; ground circle is the hit area.
        for(let i=0;i<3;i++){o.lineStyle(4-i, i===0?0xe8fbff:0x4caeea,0.85);o.strokeEllipse(x,y-26,cast.reach*1.3-i*10,cast.reach*1.8-i*10);}
      }
      for(let i=0;i<8;i++){const a=cast.angle-1.15+2.3*progress+i*0.09; l.fillStyle(IS_SELECTION&&PROFILE?.style==='flame'?0xffbe59:0xd7f8ff,0.8);l.fillCircle(x+Math.cos(a)*(cast.reach-8),y+Math.sin(a)*(cast.reach-8),2);}
    }
    if(this.showHitboxes) {
      o.lineStyle(2,phase==='active'?0x67ffe0:0xa5abb7,phase==='active'?0.9:0.3);
      if(cast.id==='wheel')o.strokeCircle(x,y,cast.reach);
      else {o.beginPath();o.moveTo(x,y);o.lineTo(x+Math.cos(cast.angle-1.15)*cast.reach,y+Math.sin(cast.angle-1.15)*cast.reach);o.arc(x,y,cast.reach,cast.angle-1.15,cast.angle+1.15);o.lineTo(x,y);o.strokePath();}
      o.lineStyle(2,0xffdf88,0.8);o.strokeCircle(this.e.x,this.e.y,5);
    }
  }
  private draw() {
    const u=this.under,o=this.over,l=this.glow,t=this.top,c=this.clock;
    u.clear();o.clear();l.clear();t.clear();
    if(this.executionFlash>0&&this.executionFlash<0.4){o.lineStyle(6,0xecfbff,Math.min(1,this.executionFlash/0.3));o.lineBetween(this.e.x-50,this.e.y-43,this.e.x+50,this.e.y-55);l.lineStyle(12,0x77d5ff,0.5*Math.min(1,this.executionFlash/0.3));l.lineBetween(this.e.x-50,this.e.y-43,this.e.x+50,this.e.y-55);}
    this.drawTechnique(o,l);
    for(const [i,lantern] of (IS_SELECTION?[]:LANTERNS).entries()){
      const f=0.85+0.1*Math.sin(c*9+i*2)+0.05*Math.sin(c*23+i);
      for(let k=0;k<6;k++){l.fillStyle(0xffa850,0.05*f);l.fillCircle(lantern.x,lantern.y-10,18+k*16*f);}
      l.fillStyle(0xffd38a,0.5*f);l.fillRect(lantern.x-5,lantern.y-14,10,8);
    }
    // Normal melee uses its animation as the tell. Area telegraphs are reserved for future Blood Demon Arts.
    if(this.clawLife>0)this.drawClaw(o,l);
    const facing=Math.cos(this.angle)<0?-1:1, demonFacing=this.p.x<this.e.x?-1:1;
    const pFeet=this.p.y+PLAYER_FEET, eFeet=this.e.y+DEMON_FEET, pDepth=2+pFeet/1000;
    const shadow=(x:number,y:number,w:number)=>{u.fillStyle(0x05070d,0.45);u.fillEllipse(x,y,w,w*0.36);};
    const demonShown=this.enemyState!=='dead'||this.deathFade>0;
    if(demonShown&&(!IS_SELECTION||this.trialCombat))shadow(this.e.x,eFeet,74);
    shadow(this.p.x,pFeet,50);
    if(this.mode==='playing'&&this.stamina<99.5){
      const low=this.stamina<R.dodgeCost;
      u.lineStyle(3,0x0b0e18,0.5);u.strokeCircle(this.p.x,pFeet,28);
      u.lineStyle(3,low?0xd2465a:0x8fd3c4,0.85);u.beginPath();u.arc(this.p.x,pFeet,28,-Math.PI/2,-Math.PI/2+TAU*this.stamina/100);u.strokePath();
    }
    const lost=this.mode==='lost'&&this.hp===0;
    this.ghostPool.forEach((img,i)=>{
      const gh=this.ghosts[i];
      if(!gh){img.setVisible(false);return;}
      img.setVisible(true).setPosition(gh.x,gh.y+PLAYER_FEET).setFlipX(gh.facing<0).setRotation(gh.lean).setTintFill(0x9fd8ff).setAlpha(gh.life/0.24*0.45).setDepth(pDepth-0.001);
    });
    // Demon: body motion carries the animation (lurching walk, rear-back wind-up, lunge, slump), then crumbles to ash.
    this.demonSprite.setVisible(demonShown);
    if(demonShown){
      const st=this.enemyState,dead=st==='dead';
      let rot=0,sx=1,sy=1,dy=0,shake=0,lunge=0;
      if(st==='chase'){const w=this.demonWalk;rot=Math.sin(w)*0.07;dy=-Math.abs(Math.sin(w))*3;sy=1+Math.sin(w*2)*0.015;}
      else if(st==='windup'){const p=1-this.enemyTimer/R.windup;rot=-0.16*p;sx=sy=1+0.06*p;shake=Math.sin(c*70)*1.5*p;}
      else{rot=0.08+Math.sin(c*3)*0.015;dy=3;sy=0.97;}
      if(this.strikeAnim>0&&!dead){const k=Math.sin(this.strikeAnim/0.3*Math.PI);rot=0.24*k;lunge=12*k;}
      const ex=this.e.x+shake+demonFacing*lunge,ey=eFeet+dy,r=demonFacing*rot;
      this.demonSprite.setPosition(ex,ey).setFlipX(demonFacing<0).setRotation(r).setScale(DM.scale*sx,DM.scale*sy).setDepth(2+eFeet/1000).setAlpha(1);
      if(dead){
        const prog=1-this.deathFade/1.1;
        this.demonSprite.setTint(0x9a8e96).setCrop(0,prog*DM.full.height,DM.full.width,DM.full.height*(1-prog));
      } else if(this.hitFlash>0)this.demonSprite.setTintFill(0xffffff);
      else if(st==='windup')this.demonSprite.setTint(MOONLIGHT);
      else if(st==='recovery')this.demonSprite.setTint(0xc4bccb);
      else this.demonSprite.setTint(MOONLIGHT);
      if(false&&!dead&&this.hitFlash===0){
        const glow=st==='recovery'?0.2:st==='windup'?0.9:0.6,cr=Math.cos(r),sr=Math.sin(r);
        for(const [lx,ly] of DM.eyes){
          const vx=demonFacing*lx*sx,vy=ly*sy,x=ex+vx*cr-vy*sr,y=ey+vx*sr+vy*cr;
          l.fillStyle(0xffc23a,glow);l.fillCircle(x,y,1.4);l.fillStyle(0xff7a2a,glow*0.4);l.fillCircle(x,y,4);
        }
        
      }
    }
    // Slayer rig: body bob, swinging legs, lean into dodges and swings; katana in the front hand.
    const swingT=this.swing>0?Math.sin((1-this.swing/0.15)*Math.PI):0;
    const bob=this.moving?-Math.abs(Math.sin(this.walk))*2.2:Math.sin(c*2.4)*0.6;
    const techniqueLean=this.technique ? (this.technique.id==='wheel' ? Math.sin(activeProgress('wheel',this.technique.elapsed)*TAU)*0.4 : Math.sin(activeProgress('surface',this.technique.elapsed)*Math.PI)*0.15) : 0;
    const lean=techniqueLean+(this.dodge>0?0.22:this.moving?0.04:0)+0.06*swingT;
    const px0=this.p.x+Math.cos(this.angle)*4*swingT,py0=pFeet+Math.sin(this.angle)*2*swingT;
    this.player.setVisible(!lost).setPosition(px0,py0).setScale(facing,1).setRotation(facing*lean).setDepth(pDepth);
    this.body.setY(SL.body.y+bob);
    const stride=this.moving?Math.sin(this.walk)*0.17:this.dodge>0?0.25:0;
    this.legL.setRotation(stride);this.legR.setRotation(-stride);
    for(const img of [this.body,this.legL,this.legR]){
      if(this.playerFlash>0)img.setTintFill(0xffffff);else if(this.dodge>0)img.setTint(0xc8ecff);else img.setTint(MOONLIGHT);
    }
    this.fallen.setVisible(lost);
    if(lost)this.fallen.setPosition(this.p.x+facing*44,pFeet).setFlipX(facing<0).setRotation(-facing*Math.PI/2).setDepth(pDepth);
    this.katana.setVisible(!lost);
    if(!lost){
      const cast=this.technique;
      const blade=cast ? cast.angle + (cast.id==='wheel' ? -Math.PI/2+TAU*activeProgress(cast.id,cast.elapsed) : -1.15+2.3*activeProgress(cast.id,cast.elapsed)) : this.swing>0?this.angle-1.15+2.3*(1-Math.pow(this.swing/0.15,2)):this.angle+0.5*facing;
      const dx=Math.cos(blade),dy=Math.sin(blade),cr=Math.cos(facing*lean),sr=Math.sin(facing*lean);
      const lx=facing*SL.hand[0],ly=SL.hand[1]+bob,hx=px0+lx*cr-ly*sr,hy=py0+lx*sr+ly*cr;
      const behind=dx*facing<-0.15;
      this.katana.setPosition(hx,hy).setRotation(blade-facing*KT.angle).setFlipY(facing<0).setDepth(pDepth+(behind?-0.0003:0.0003));
      if(this.swing>0){l.lineStyle(3,0x7cc8ff,0.5);l.lineBetween(hx+dx*14,hy+dy*14,hx+dx*KT.length,hy+dy*KT.length);}
    }
    if(this.swing>0){
      const a=this.swing/0.15;
      this.crescent(o,this.p.x,this.p.y,this.angle,80,18,0xe8f7ff,0.75*a);
      this.crescent(l,this.p.x,this.p.y,this.angle,82,10,0x5fb4ff,0.55*a);
      this.crescent(l,this.p.x,this.p.y,this.angle,70,6,0x9fe7ff,0.35*a);
    }
    for(const q of this.particles){const a=Math.min(1,q.life/q.max*1.6);(q.glow?l:o).fillStyle(q.color,a);(q.glow?l:o).fillCircle(q.x,q.y,q.size*(0.5+0.5*q.life/q.max));}
    for(const q of this.petals){o.save();o.translateCanvas(q.x,q.y);o.rotateCanvas(q.rot);o.fillStyle(q.color,0.75);o.fillEllipse(0,0,8,3.8);o.restore();}
    if(this.enemyState!=='dead'){
      const x=this.e.x,y=this.e.y+DEMON_FEET-(this.isBoss?195:DM.height)-12,w=80,seg=w/(this.enemyMaxHp/R.swordDamage);
      o.fillStyle(0x0a0d16,0.9);o.fillRect(x-w/2-2,y-2,w+4,9);
      o.fillStyle(0xf3d9c8,0.85);o.fillRect(x-w/2,y,w*this.ehpShown/this.enemyMaxHp,5);
      o.fillStyle(0xd2384f);o.fillRect(x-w/2,y,w*this.ehp/this.enemyMaxHp,5);
      o.fillStyle(0x0a0d16);for(let i=1;i<this.enemyMaxHp/R.swordDamage;i++)o.fillRect(x-w/2+seg*i-0.5,y,1,5);
      const warn=this.enemyState==='downed';
      this.label.setPosition(x,y-13).setText(warn?`F · FINISH ${this.finishRemaining.toFixed(1)}s`:this.isBoss?'HAND DEMON':`LV ${this.encounter.level} · ${this.encounter.archetype.name.toUpperCase()}`).setColor(warn?'#ff8f9c':'#e9cbd4').setScale(warn?1+0.08*Math.sin(c*20):1).setVisible(true);
    } else this.label.setVisible(false);
    const low=this.mode==='playing'&&this.hp<=40?0.18+0.1*Math.sin(c*6):0;
    this.hurtImage.setAlpha(Math.max(this.hurtFx*0.9,low));
    this.player.setRotation(0);
    this.body.setVisible(false);this.legL.setVisible(false);this.legR.setVisible(false);
    this.katana.setVisible(false);this.fallen.setVisible(false);
    this.ghostPool.forEach(img=>img.setVisible(false));
    this.demonSprite.setVisible(false);
    const demonRow=(this.enemyState==='downed'||this.enemyState==='dead'||this.enemyState==='recovery')?0:this.strikeAnim>0?3:this.enemyState==='windup'?0:1+Math.floor(this.clock*7)%2;
    const demonFrame=demonRow*5+this.encounter.archetype.column;
    this.pixelDemon.setFrame(demonFrame).setScale(168/SPRITE_REGIONS['pixel-demon'].cellHeight).setOrigin(SPRITE_REGIONS['pixel-demon'].frames[demonFrame].ox,1).setPosition(Math.round(this.e.x),Math.round(eFeet))
      .setFlipX((demonFacing>0)!==(demonRow===2)).setDepth(2+eFeet/1000).setVisible(demonShown)
      .setAlpha(this.enemyState==='dead'?this.deathFade/1.1:1);
    const df=this.pixelDemon.frame;
    const separated=this.enemyState==='dead'&&this.executionFlash<0.4;
    this.pixelDemon.setCrop();
    if(separated)this.pixelDemon.setCrop(0,df.realHeight*0.36,df.realWidth,df.realHeight*0.64);
    this.pixelHead.setVisible(separated&&demonShown).setFrame(demonFrame).setScale(168/SPRITE_REGIONS['pixel-demon'].cellHeight).setOrigin(SPRITE_REGIONS['pixel-demon'].frames[demonFrame].ox,1).setFlipX(demonFacing>0)
      .setPosition(Math.round(this.e.x+Math.max(0,0.4-this.executionFlash)*55),Math.round(eFeet-Math.max(0,0.4-this.executionFlash)*35))
      .setDepth(2+eFeet/1000+0.001).setAlpha(this.deathFade/1.1).setCrop(0,0,df.realWidth,df.realHeight*0.36);
    if(this.hitFlash>0)this.pixelDemon.setTintFill(0xffffff);else this.pixelDemon.clearTint();
    const cast=this.technique;
    let frame=this.moving ? 4+Math.floor(this.clock*10)%4 : Math.floor(this.clock*4)%4;
    if(this.swing>0)frame=8+Math.min(3,Math.floor((1-this.swing/0.15)*4));
    if(this.executionFlash>0)frame=8+Math.min(3,Math.floor((1-this.executionFlash/0.65)*4));
    if(cast) {
      const f=WATER_FORMS[cast.id];
      const stage=cast.elapsed<f.windup ? 0 : cast.elapsed<f.windup+f.active*0.4 ? 1 : cast.elapsed<f.windup+f.active ? 2 : 3;
      frame=12+stage;
    }
    this.pixelActor.setFrame(frame).setOrigin(0.5,PIXEL_ANCHORS.slayer[frame].foot).setPosition(Math.round(this.p.x),Math.round(pFeet))
      .setFlipX(facing<0).setDepth(pDepth+0.001).setVisible(!lost).setRotation(0);
    if(this.playerFlash>0)this.pixelActor.setTintFill(0xffffff);else this.pixelActor.clearTint();

    if(IS_SELECTION&&PROFILE){
      this.pixelActor.setVisible(false);this.pixelDemon.setVisible(this.trialCombat&&demonShown);this.label.setVisible(this.trialCombat&&this.enemyState!=='dead');
      const col=(PROFILE.style==='flame'?2:0)+(PROFILE.body==='female'?1:0);
      let key='profile-idle',pf=col;
      if(this.moving){key='profile-motion';pf=(Math.floor(this.walk*0.65)%2)*4+col;}
      if(cast){key='profile-motion';pf=(phaseAt(cast.id,cast.elapsed)==='windup'?2:3)*4+col;}
      else if(this.swing>0||this.executionFlash>0){key='profile-motion';pf=3*4+col;}
      this.profileActor.setTexture(key,pf);
      if(key==='profile-motion')this.profileActor.setScale(150/SPRITE_REGIONS['profile-motion'].cellHeight).setOrigin(SPRITE_REGIONS['profile-motion'].frames[pf].ox,1);
      else this.profileActor.setDisplaySize(150,150).setOrigin(0.5,0.96);
      this.profileActor.setPosition(Math.round(this.p.x),Math.round(pFeet)).setFlipX(facing<0).setDepth(pDepth+0.002).setVisible(!lost);
      if(this.playerFlash>0)this.profileActor.setTintFill(0xffffff);else this.profileActor.clearTint();
      this.interactLabel.setVisible(false);
      const clue=FOREST_CLUES[this.trialClues];
      if(this.mode==='playing'&&clue&&Math.hypot(this.p.x-clue.x,this.p.y-clue.y)<62)this.interactLabel.setPosition(clue.x,clue.y+15).setText('E · '+clue.title).setVisible(true);
      else if(this.mode==='playing'&&Math.hypot(this.p.x-FOREST_SHRINE.x,this.p.y-FOREST_SHRINE.y)<62)this.interactLabel.setPosition(FOREST_SHRINE.x,FOREST_SHRINE.y+10).setText('E · Read the shrine').setVisible(true);
      // Ground mist drifts beneath the actors without masking attack poses.
      for(let i=0;i<5;i++){u.fillStyle(0xa0c1c1,0.025);u.fillEllipse((this.clock*9+i*245)%1200-100,130+i*100,240,22);}
    }
    if(IS_SELECTION&&this.isBoss){
      this.pixelDemon.setVisible(false);this.pixelHead.setVisible(false);
      const bf=this.enemyState==='windup'?1:this.strikeAnim>0?2:this.enemyState==='recovery'||this.enemyState==='downed'?3:0;
      this.bossSprite.setFrame(bf).setPosition(this.e.x,eFeet).setFlipX(demonFacing>0).setVisible(demonShown).setDepth(2+eFeet/1000).setAlpha(this.enemyState==='dead'?this.deathFade/1.1:1).setCrop();
      const frame=this.bossSprite.frame,cut=frame.realHeight*.34;
      this.bossHead.setVisible(separated&&demonShown).setFrame(bf).setPosition(this.e.x+(0.4-this.executionFlash)*45,eFeet).setFlipX(demonFacing>0).setDepth(2+eFeet/1000+.001).setAlpha(this.deathFade/1.1).setCrop(0,0,frame.realWidth,cut);
      if(separated)this.bossSprite.setCrop(0,cut,frame.realWidth,frame.realHeight-cut);
      if(this.hitFlash>0)this.bossSprite.setTintFill(0xffffff);else this.bossSprite.clearTint();
    }else{this.bossSprite.setVisible(false);this.bossHead.setVisible(false);}
    const px=this.aim.x,py=this.aim.y;
    t.lineStyle(1.5,0xd9c8f5,0.85);t.strokeCircle(px,py,7);
    for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4;t.lineBetween(px+Math.cos(a)*10,py+Math.sin(a)*10,px+Math.cos(a)*15,py+Math.sin(a)*15);}
  }
  private drawTelegraph(g:Phaser.GameObjects.Graphics) {
    const {x,y}=this.target,r=R.enemyReach,p=1-this.enemyTimer/R.windup,pulse=0.5+0.5*Math.sin(this.clock*18);
    g.fillStyle(0xc8243c,0.1+0.14*p+0.05*pulse);g.fillCircle(x,y,r);
    g.lineStyle(2,0xff6b7c,0.95);g.strokeCircle(x,y,r);
    for(let i=0;i<24;i++){const a=i*Math.PI/12+this.clock*1.5;g.lineBetween(x+Math.cos(a)*(r+3),y+Math.sin(a)*(r+3),x+Math.cos(a)*(r+8),y+Math.sin(a)*(r+8));}
    g.lineStyle(3,0xffd0a8,0.95);g.strokeCircle(x,y,Math.max(3,r*(1-p)));
    g.lineStyle(4,0xffe2bd,0.9);g.beginPath();g.arc(x,y,r-7,-Math.PI/2,-Math.PI/2+Math.PI*2*p);g.strokePath();
    g.lineStyle(3,0xff8a9a,0.25+0.5*p);for(const o of [-12,0,12])g.lineBetween(x-16+o,y-18,x+10+o,y+18);
  }
  private drawClaw(o:Phaser.GameObjects.Graphics,l:Phaser.GameObjects.Graphics) {
    const {x,y}=this.clawAt,a=this.clawLife/0.38,grow=1-a;
    // No ground-circle telegraph for ordinary claw attacks.
    for(const off of [-22,0,22]){
      o.lineStyle(9*a,0x8a0f24,0.9*a);o.lineBetween(x-46+off,y-52,x+38+off,y+52);
      o.lineStyle(3*a,0xffe3e0,a);o.lineBetween(x-44+off,y-49,x+36+off,y+49);
    }
  }
  private crescent(g:Phaser.GameObjects.Graphics,x:number,y:number,angle:number,r:number,thick:number,color:number,alpha:number) {
    const outer:Phaser.Types.Math.Vector2Like[]=[],inner:Phaser.Types.Math.Vector2Like[]=[];
    for(let i=0;i<=20;i++){const t=i/20,a=angle-1.15+2.3*t,w=thick*Math.sin(Math.PI*t)*(0.35+0.65*t);outer.push({x:x+Math.cos(a)*r,y:y+Math.sin(a)*r});inner.push({x:x+Math.cos(a)*(r-w),y:y+Math.sin(a)*(r-w)});}
    g.fillStyle(color,alpha);g.fillPoints(outer.concat(inner.reverse()),true);
  }
}

const fonts = Promise.all([
  document.fonts.load('40px Marcellus'), document.fonts.load('600 12px "DM Sans"'), document.fonts.load('700 40px "Noto Serif JP"', '夜鬼滅敗休'),
]).catch(() => undefined);
Promise.race([fonts, new Promise(resolve => setTimeout(resolve, 2000))]).then(() => {
  new Phaser.Game({type:Phaser.AUTO,parent:'game',width:W,height:H,backgroundColor:'#0d171c',antialias:false,pixelArt:true,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:Arena});
});
