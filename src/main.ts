import Phaser from 'phaser';
import { RULES as R, inSwordArc } from './combat';
import { RIG } from './rig';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header><a class="wordmark" href="./"><span class="kanji">夜</span> <span>NIGHTFALL</span></a><span class="build">V1 / PROTOTYPE 01</span></header>
<main><section class="intro"><div><p class="eyebrow">THE FIRST STEP TO HASHIRA</p><h1>Find your footing.</h1><p>A moonlit training ground beneath the wisteria. One demon. Your sword.</p></div><div class="checkpoint"><span class="dot"></span> Combat playtest <small>Movement · timing · survival</small></div></section>
<div class="layout"><section class="game-panel"><div class="arena-heading"><span>01 — WISTERIA TRAINING GROUNDS</span><span>NIGHT / PRACTICE</span></div><div id="game" tabindex="0" aria-label="Combat arena. WASD to move, mouse to aim, click or J to attack, Space to dodge, Escape to pause."></div><div class="arena-footer"><span id="status" role="status">Enter the arena to begin.</span><span id="score">DEMONS DEFEATED 00</span></div></section>
<aside><p class="eyebrow">YOUR LOADOUT</p><h2>Slayer recruit</h2><p class="muted">Level 1 · Combat foundation</p><div class="resource"><div>Vitality <span id="hp">100 / 100</span></div><progress id="health" max="100" value="100"></progress></div><div class="resource"><div>Stamina <span id="sp">100 / 100</span></div><progress id="stamina" max="100" value="100"></progress></div><hr><p class="eyebrow">CONTROLS</p><dl><dt><kbd>W A S D</kbd></dt><dd>Move</dd><dt><kbd>MOUSE</kbd></dt><dd>Aim</dd><dt><kbd>CLICK</kbd> / <kbd>J</kbd></dt><dd>Sword attack</dd><dt><kbd>SPACE</kbd></dt><dd>Dodge · 28 stamina</dd><dt><kbd>ESC</kbd></dt><dd>Pause</dd></dl><button id="start">Enter the arena <span>↗</span></button><button id="retry" class="secondary">Reset encounter</button><p class="tip">Watch for the red warning circle. When the closing ring reaches the centre, the demon strikes.</p></aside></div>
<section class="notes"><div><p class="eyebrow">PLAYTEST 01</p><h3>Does the fight feel right?</h3></div><p>Try moving diagonally, dodging a strike, and attacking from different angles. Then tell us what feels responsive, confusing, or unfair.</p><span>Next checkpoint<br><strong>Breathing forms</strong></span></section></main><footer>Personal fan-game prototype · Original character art <span>Keyboard + mouse required</span></footer>`;

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
  private p = {x: 300, y: 340}; private e = {x: 700, y: 340};
  private hp = R.health; private stamina = R.stamina; private ehp = R.enemyHealth;
  private angle = 0; private swing = 0; private swordCooldown = 0;
  private dodge = 0; private dodgeCooldown = 0; private dodgeVector = new Phaser.Math.Vector2();
  private enemyState: 'chase' | 'windup' | 'recovery' | 'dead' = 'chase';
  private enemyTimer = 0; private target = {x: 0, y: 0};
  private hurt = 0; private wins = 0; private mode: Mode = 'ready';
  // Presentation-only state; none of it feeds back into combat rules.
  private clock = 0; private walk = 0; private moving = false; private demonWalk = 0;
  private hitFlash = 0; private hurtFx = 0; private ehpShown = R.enemyHealth; private deathFade = 0; private endDelay = 0; private ghostTimer = 0; private overlayAlpha = 0;
  private particles: Particle[] = []; private petals: Petal[] = []; private ghosts: Ghost[] = []; private floaters: Floater[] = [];
  private player!: Phaser.GameObjects.Container; private body!: Phaser.GameObjects.Image; private legL!: Phaser.GameObjects.Image; private legR!: Phaser.GameObjects.Image;
  private fallen!: Phaser.GameObjects.Image; private katana!: Phaser.GameObjects.Image; private demonSprite!: Phaser.GameObjects.Image; private ghostPool: Phaser.GameObjects.Image[] = [];
  private strikeAnim = 0; private aim = new Phaser.Math.Vector2();
  private playerFlash = 0; private clawLife = 0; private clawAt = {x: 0, y: 0};
  constructor() {super('Arena');}
  preload() {
    for (const key of ['slayer-body', 'slayer-leg-l', 'slayer-leg-r', 'slayer-full', 'demon', 'katana']) this.load.image(key, `art/${key}.png`);
  }
  create() {
    const layer = (key: string, paint: (ctx: CanvasRenderingContext2D) => void, depth: number) => {
      const texture = this.textures.createCanvas(key, W, H)!;
      paint(texture.getContext()); texture.refresh();
      return this.add.image(0, 0, key).setOrigin(0).setDepth(depth);
    };
    layer('ground', paintGround, 0);
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
    layer('foreground', paintForeground, 5);
    layer('light', paintLight, 6).setScrollFactor(0);
    this.hurtImage = layer('hurt', paintHurt, 7).setAlpha(0).setScrollFactor(0);
    this.label = this.add.text(0, 0, '', {fontFamily: SANS, fontSize: '12px', fontStyle: '600', color: '#e9cbd4', stroke: '#0b0e18', strokeThickness: 4}).setOrigin(0.5).setDepth(8).setLetterSpacing(1.5);
    this.top = this.add.graphics().setDepth(9);
    this.shade = this.add.rectangle(W / 2, H / 2, W, H, 0x060912, 0.66).setDepth(10).setScrollFactor(0);
    this.bigKanji = this.add.text(W / 2, 300, '', {fontFamily: KANJI, fontSize: '260px', fontStyle: '700', color: '#b49be0'}).setOrigin(0.5).setDepth(10).setScrollFactor(0);
    this.title = this.add.text(W / 2, 290, '', {fontFamily: SERIF, fontSize: '42px', color: '#f1eadb'}).setOrigin(0.5).setDepth(10).setLetterSpacing(4).setScrollFactor(0);
    this.subtitle = this.add.text(W / 2, 344, '', {fontFamily: SANS, fontSize: '15px', color: '#c3b8d8'}).setOrigin(0.5).setDepth(10).setLetterSpacing(1).setScrollFactor(0);
    const rand = seeded(99);
    for (let i = 0; i < 22; i++) this.petals.push({x: rand() * W, y: rand() * H, vx: 14 + rand() * 18, vy: 22 + rand() * 20, rot: rand() * 6, spin: (rand() - 0.5) * 4, color: [0xc6a8ee, 0xa985dc, 0xe2d2f7][i % 3]});
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,SPACE,ESC,J') as typeof this.keys;
    this.input.keyboard!.addCapture(['SPACE','W','A','S','D']);
    this.input.on('pointerdown', () => {if(this.mode === 'playing') this.attack();});
    document.querySelector('#start')!.addEventListener('click', () => {if(this.mode === 'playing')this.mode='paused';else if(this.mode === 'paused')this.mode='playing';else this.reset();this.sync();});
    document.querySelector('#retry')!.addEventListener('click', () => this.reset());
    window.addEventListener('blur', () => {if(this.mode==='playing'){this.mode='paused';this.sync();}});
    this.cameras.main.setZoom(ZOOM).setBounds(0, 0, W, H).startFollow(this.player, false, 0.12, 0.12, 0, 40);
    this.sync(); this.draw();
  }
  private reset() {
    this.p={x:300,y:340};this.e={x:700,y:340};this.hp=R.health;this.stamina=R.stamina;this.ehp=R.enemyHealth;
    this.swing=0;this.swordCooldown=0;this.dodge=0;this.dodgeCooldown=0;this.hurt=0;this.enemyTimer=0;this.enemyState='chase';this.mode='playing';
    this.hitFlash=0;this.hurtFx=0;this.ehpShown=R.enemyHealth;this.deathFade=0;this.endDelay=0;this.clawLife=0;this.overlayAlpha=0;this.playerFlash=0;
    this.particles=[];this.ghosts=[];this.strikeAnim=0;this.demonSprite.setCrop();for(const f of this.floaters)f.text.destroy();this.floaters=[];
    this.sync();
    document.querySelector<HTMLElement>('#game')!.focus();
  }
  private attack() {
    if(this.swordCooldown>0 || this.dodge>0)return;
    this.swordCooldown=R.swordCooldown;this.swing=0.15;
    if(inSwordArc(this.p.x,this.p.y,this.angle,this.e.x,this.e.y)) {
      this.ehp=Math.max(0,this.ehp-R.swordDamage);
      this.onSwordHit();
      if(this.ehp===0){this.enemyState='dead';this.mode='won';this.wins++;this.onDemonDefeated();}
    }
  }
  update(_time:number, delta:number) {
    const pointer=this.input.activePointer;this.cameras.main.getWorldPoint(pointer.x,pointer.y,this.aim);
    const dt=Math.min(delta/1000,0.04);
    if(Phaser.Input.Keyboard.JustDown(this.keys.ESC)) {if(this.mode==='playing')this.mode='paused';else if(this.mode==='paused')this.mode='playing';}
    if(this.mode==='playing'){
      this.angle=Phaser.Math.Angle.Between(this.p.x,this.p.y,this.aim.x,this.aim.y);
      this.swordCooldown=Math.max(0,this.swordCooldown-dt);this.swing=Math.max(0,this.swing-dt);this.hurt=Math.max(0,this.hurt-dt);this.dodgeCooldown=Math.max(0,this.dodgeCooldown-dt);
      const move=new Phaser.Math.Vector2(Number(this.keys.D.isDown)-Number(this.keys.A.isDown),Number(this.keys.S.isDown)-Number(this.keys.W.isDown)).normalize();
      this.moving=move.length()>0;
      if(Phaser.Input.Keyboard.JustDown(this.keys.SPACE)&&this.dodgeCooldown===0&&this.stamina>=R.dodgeCost){this.dodge=R.dodgeDuration;this.dodgeCooldown=R.dodgeCooldown;this.stamina-=R.dodgeCost;this.dodgeVector=move.length()>0?move.clone():new Phaser.Math.Vector2(Math.cos(this.angle),Math.sin(this.angle));this.onDodge();}
      const velocity=this.dodge>0?this.dodgeVector.clone().scale(R.dodgeSpeed):move.scale(R.speed);
      this.p.x=Phaser.Math.Clamp(this.p.x+velocity.x*dt,54,946);this.p.y=Phaser.Math.Clamp(this.p.y+velocity.y*dt,74,570);
      const invulnerable=this.dodge>0;
      this.dodge=Math.max(0,this.dodge-dt);if(!invulnerable)this.stamina=Math.min(100,this.stamina+R.staminaRegen*dt);
      if(Phaser.Input.Keyboard.JustDown(this.keys.J))this.attack();
      if(this.enemyState==='chase') {
        const distance=Phaser.Math.Distance.Between(this.p.x,this.p.y,this.e.x,this.e.y);
        if(distance<110){this.enemyState='windup';this.enemyTimer=R.windup;this.target={...this.p};}
        else {const a=Phaser.Math.Angle.Between(this.e.x,this.e.y,this.p.x,this.p.y);this.e.x+=Math.cos(a)*100*dt;this.e.y+=Math.sin(a)*100*dt;}
      } else if(this.enemyState==='windup') {
        this.enemyTimer-=dt;
        if(this.enemyTimer<=0){
          const inReach=Phaser.Math.Distance.Between(this.p.x,this.p.y,this.target.x,this.target.y)<R.enemyReach;
          if(inReach&&!invulnerable){this.hp=Math.max(0,this.hp-R.enemyDamage);this.hurt=0.25;this.cameras.main.shake(100,0.004);if(this.hp===0)this.mode='lost';}
          this.onDemonStrike(inReach, invulnerable);
          this.enemyState='recovery';this.enemyTimer=R.recovery;
        }
      } else if(this.enemyState==='recovery'){this.enemyTimer-=dt;if(this.enemyTimer<=0)this.enemyState='chase';}
    } else this.moving=false;
    this.animate(this.mode==='paused'?0:dt);
    this.sync();this.draw();
  }

  // ---- Combat feedback hooks -------------------------------------------------
  private onSwordHit() {
    this.hitFlash=0.14;
    this.cameras.main.shake(70,0.0025);
    for(let i=0;i<16;i++){const a=this.angle+(Math.random()-0.5)*1.6,s=140+Math.random()*260;this.burst(this.e.x,this.e.y-22,Math.cos(a)*s,Math.sin(a)*s,0.22+Math.random()*0.25,1.5+Math.random()*2.5,i%3===0?0xff5a6e:0xfff0d2,6,0,true);}
    for(let i=0;i<6;i++){const a=this.angle+(Math.random()-0.5)*1.2,s=80+Math.random()*120;this.burst(this.e.x,this.e.y-16,Math.cos(a)*s,Math.sin(a)*s,0.4+Math.random()*0.3,2.5,0x5c0c1e,4,260,false);}
    this.floatText(this.e.x+42+(Math.random()-0.5)*14,this.e.y-66,String(R.swordDamage),'#fff2da','#4a0f1d',24);
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
      this.hurtFx=1;this.playerFlash=0.25;this.floatText(this.p.x+32,this.p.y-70,String(-R.enemyDamage),'#ff9aa6','#3a0711',24);
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
    this.clock+=dt;
    if(this.moving)this.walk+=dt*13;
    if(this.enemyState==='chase'&&this.mode==='playing')this.demonWalk+=dt*9;
    this.hitFlash=Math.max(0,this.hitFlash-dt);this.hurtFx=Math.max(0,this.hurtFx-dt*1.8);this.deathFade=Math.max(0,this.deathFade-dt);this.endDelay=Math.max(0,this.endDelay-dt);this.clawLife=Math.max(0,this.clawLife-dt);this.playerFlash=Math.max(0,this.playerFlash-dt);this.strikeAnim=Math.max(0,this.strikeAnim-dt);
    if(this.mode==='won'||this.mode==='lost')this.swing=Math.max(0,this.swing-dt);
    this.ehpShown=this.ehpShown>this.ehp?Math.max(this.ehp,this.ehpShown-dt*70):this.ehp;
    if(this.dodge>0){this.ghostTimer-=dt;if(this.ghostTimer<=0){this.ghostTimer=0.03;const gf=Math.cos(this.angle)<0?-1:1;this.ghosts.push({x:this.p.x,y:this.p.y,facing:gf,life:0.24,lean:gf*0.22});}}
    if(this.enemyState==='dead'&&this.deathFade>0&&dt>0){
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
    document.querySelector<HTMLProgressElement>('#health')!.value=this.hp;document.querySelector('#hp')!.textContent=`${this.hp} / 100`;
    document.querySelector<HTMLProgressElement>('#stamina')!.value=this.stamina;document.querySelector('#sp')!.textContent=`${Math.floor(this.stamina)} / 100`;
    const messages={ready:'Enter the arena to begin.',playing:'Read the warning. Dodge the strike. Find your opening.',paused:'Paused — resume when you’re ready.',lost:'You fell in training. Reset and try another approach.',won:'Encounter cleared. Reset to practice again.'};
    document.querySelector('#status')!.textContent=messages[this.mode];document.querySelector('#score')!.textContent=`DEMONS DEFEATED ${String(this.wins).padStart(2,'0')}`;
    document.querySelector('#start')!.textContent=this.mode==='playing'?'Pause encounter':this.mode==='paused'?'Resume encounter':'Enter the arena ↗';
    const screens:Record<Mode,[string,string,string]>={ready:['夜','THE TRAINING GROUNDS','Enter the arena to begin'],paused:['休','PAUSED','Press Esc or Resume when you’re ready'],lost:['敗','FALLEN IN TRAINING','Reset the encounter to try again'],won:['滅','ENCOUNTER CLEARED','The demon crumbles to ash. Your first step forward.'],playing:['','','']};
    const [kanji,title,sub]=screens[this.mode];
    if(this.mode!=='playing'){this.bigKanji.setText(kanji);this.title.setText(title);this.subtitle.setText(sub);}
    const a=this.overlayAlpha;
    this.shade.setAlpha(a*(this.mode==='paused'?0.5:0.66));this.bigKanji.setAlpha(a*0.16);this.title.setAlpha(a);this.subtitle.setAlpha(a);
  }

  // ---- Drawing ---------------------------------------------------------------
  private draw() {
    const u=this.under,o=this.over,l=this.glow,t=this.top,c=this.clock;
    u.clear();o.clear();l.clear();t.clear();
    for(const [i,lantern] of LANTERNS.entries()){
      const f=0.85+0.1*Math.sin(c*9+i*2)+0.05*Math.sin(c*23+i);
      for(let k=0;k<6;k++){l.fillStyle(0xffa850,0.05*f);l.fillCircle(lantern.x,lantern.y-10,18+k*16*f);}
      l.fillStyle(0xffd38a,0.5*f);l.fillRect(lantern.x-5,lantern.y-14,10,8);
    }
    if(this.enemyState==='windup')this.drawTelegraph(u);
    if(this.clawLife>0)this.drawClaw(o,l);
    const facing=Math.cos(this.angle)<0?-1:1, demonFacing=this.p.x<this.e.x?-1:1;
    const pFeet=this.p.y+PLAYER_FEET, eFeet=this.e.y+DEMON_FEET, pDepth=2+pFeet/1000;
    const shadow=(x:number,y:number,w:number)=>{u.fillStyle(0x05070d,0.45);u.fillEllipse(x,y,w,w*0.36);};
    const demonShown=this.enemyState!=='dead'||this.deathFade>0;
    if(demonShown)shadow(this.e.x,eFeet,74);
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
      else if(st==='windup')this.demonSprite.setTint(0xffc4c4);
      else if(st==='recovery')this.demonSprite.setTint(0xc4bccb);
      else this.demonSprite.setTint(MOONLIGHT);
      if(!dead&&this.hitFlash===0){
        const glow=st==='recovery'?0.2:st==='windup'?0.9:0.6,cr=Math.cos(r),sr=Math.sin(r);
        for(const [lx,ly] of DM.eyes){
          const vx=demonFacing*lx*sx,vy=ly*sy,x=ex+vx*cr-vy*sr,y=ey+vx*sr+vy*cr;
          l.fillStyle(0xffc23a,glow);l.fillCircle(x,y,1.4);l.fillStyle(0xff7a2a,glow*0.4);l.fillCircle(x,y,4);
        }
        if(st==='windup'){const p=0.5+0.5*Math.sin(c*16);for(let k=0;k<4;k++){l.fillStyle(0xd0203a,0.05+0.04*p);l.fillCircle(this.e.x,this.e.y-20,44+k*15);}}
      }
    }
    // Slayer rig: body bob, swinging legs, lean into dodges and swings; katana in the front hand.
    const swingT=this.swing>0?Math.sin((1-this.swing/0.15)*Math.PI):0;
    const bob=this.moving?-Math.abs(Math.sin(this.walk))*2.2:Math.sin(c*2.4)*0.6;
    const lean=(this.dodge>0?0.22:this.moving?0.04:0)+0.06*swingT;
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
      const blade=this.swing>0?this.angle-1.15+2.3*(1-Math.pow(this.swing/0.15,2)):this.angle+0.5*facing;
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
      const x=this.e.x,y=this.e.y+DEMON_FEET-DM.height-12,w=80,seg=w/(R.enemyHealth/R.swordDamage);
      o.fillStyle(0x0a0d16,0.9);o.fillRect(x-w/2-2,y-2,w+4,9);
      o.fillStyle(0xf3d9c8,0.85);o.fillRect(x-w/2,y,w*this.ehpShown/R.enemyHealth,5);
      o.fillStyle(0xd2384f);o.fillRect(x-w/2,y,w*this.ehp/R.enemyHealth,5);
      o.fillStyle(0x0a0d16);for(let i=1;i<R.enemyHealth/R.swordDamage;i++)o.fillRect(x-w/2+seg*i-0.5,y,1,5);
      const warn=this.enemyState==='windup';
      this.label.setPosition(x,y-13).setText(warn?'! STRIKE INCOMING !':'鬼  LV 1 · DEMON').setColor(warn?'#ff8f9c':'#e9cbd4').setScale(warn?1+0.08*Math.sin(c*20):1).setVisible(true);
    } else this.label.setVisible(false);
    const low=this.mode==='playing'&&this.hp<=40?0.18+0.1*Math.sin(c*6):0;
    this.hurtImage.setAlpha(Math.max(this.hurtFx*0.9,low));
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
    l.lineStyle(4,0xff4058,0.6*a);l.strokeCircle(x,y,R.enemyReach*(1+grow*0.35));
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
  new Phaser.Game({type:Phaser.AUTO,parent:'game',width:W,height:H,backgroundColor:'#0d171c',antialias:true,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:Arena});
});
