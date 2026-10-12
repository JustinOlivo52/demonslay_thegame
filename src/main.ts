import Phaser from 'phaser';
import { RULES as R, inSwordArc } from './combat';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header><a class="wordmark" href="./">夜 <span>NIGHTFALL</span></a><span class="build">V1 / PROTOTYPE 01</span></header>
<main><section class="intro"><div><p class="eyebrow">THE FIRST STEP TO HASHIRA</p><h1>Find your footing.</h1><p>A moonlit training ground. One demon. Your sword.</p></div><div class="checkpoint"><span class="dot"></span> Combat playtest <small>Movement · timing · survival</small></div></section>
<div class="layout"><section class="game-panel"><div class="arena-heading"><span>01 — WISTERIA TRAINING GROUNDS</span><span>NIGHT / PRACTICE</span></div><div id="game" tabindex="0" aria-label="Combat arena. WASD to move, mouse to aim, click or J to attack, Space to dodge, Escape to pause."></div><div class="arena-footer"><span id="status" role="status">Enter the arena to begin.</span><span id="score">DEMONS DEFEATED 00</span></div></section>
<aside><p class="eyebrow">YOUR LOADOUT</p><h2>Slayer recruit</h2><p class="muted">Level 1 · Combat foundation</p><div class="resource"><div>Vitality <span id="hp">100 / 100</span></div><progress id="health" max="100" value="100"></progress></div><div class="resource"><div>Stamina <span id="sp">100 / 100</span></div><progress id="stamina" max="100" value="100"></progress></div><hr><p class="eyebrow">CONTROLS</p><dl><dt><kbd>W A S D</kbd></dt><dd>Move</dd><dt><kbd>MOUSE</kbd></dt><dd>Aim</dd><dt><kbd>CLICK</kbd> / <kbd>J</kbd></dt><dd>Sword attack</dd><dt><kbd>SPACE</kbd></dt><dd>Dodge · 28 stamina</dd><dt><kbd>ESC</kbd></dt><dd>Pause</dd></dl><button id="start">Enter the arena <span>↗</span></button><button id="retry" class="secondary">Reset encounter</button><p class="tip">Watch for the red warning circle. Dodge before the demon strikes.</p></aside></div>
<section class="notes"><div><p class="eyebrow">PLAYTEST 01</p><h3>Does the fight feel right?</h3></div><p>Try moving diagonally, dodging a strike, and attacking from different angles. Then tell us what feels responsive, confusing, or unfair.</p><span>Next checkpoint<br><strong>Breathing forms</strong></span></section></main><footer>Personal fan-game prototype · Original placeholder artwork <span>Keyboard + mouse required</span></footer>`;

class Arena extends Phaser.Scene {
  private ink!: Phaser.GameObjects.Graphics;
  private label!: Phaser.GameObjects.Text;
  private overlay!: Phaser.GameObjects.Text;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private p = {x: 300, y: 340}; private e = {x: 700, y: 340};
  private hp = R.health; private stamina = R.stamina; private ehp = R.enemyHealth;
  private angle = 0; private swing = 0; private swordCooldown = 0;
  private dodge = 0; private dodgeCooldown = 0; private dodgeVector = new Phaser.Math.Vector2();
  private enemyState: 'chase' | 'windup' | 'recovery' | 'dead' = 'chase';
  private enemyTimer = 0; private target = {x: 0, y: 0};
  private hurt = 0; private wins = 0; private mode: 'ready' | 'playing' | 'paused' | 'lost' | 'won' = 'ready';
  constructor() {super('Arena');}
  create() {
    this.ink = this.add.graphics();
    this.label = this.add.text(0, 0, '', {fontFamily:'monospace',fontSize:'13px',color:'#ffc5bf'}).setOrigin(0.5);
    this.overlay = this.add.text(500, 302, '', {fontFamily:'Georgia',fontSize:'30px',color:'#f1ecdb',align:'center', backgroundColor:'#101b20'}).setOrigin(0.5).setPadding(25);
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,SPACE,ESC,J') as typeof this.keys;
    this.input.keyboard!.addCapture(['SPACE','W','A','S','D']);
    this.input.on('pointerdown', () => {if(this.mode === 'playing') this.attack();});
    document.querySelector('#start')!.addEventListener('click', () => {if(this.mode === 'playing')this.mode='paused';else if(this.mode === 'paused')this.mode='playing';else this.reset();this.sync();});
    document.querySelector('#retry')!.addEventListener('click', () => this.reset());
    window.addEventListener('blur', () => {if(this.mode==='playing'){this.mode='paused';this.sync();}});
    this.sync(); this.draw();
  }
  private reset() {
    this.p={x:300,y:340};this.e={x:700,y:340};this.hp=R.health;this.stamina=R.stamina;this.ehp=R.enemyHealth;
    this.swing=0;this.swordCooldown=0;this.dodge=0;this.dodgeCooldown=0;this.hurt=0;this.enemyTimer=0;this.enemyState='chase';this.mode='playing';this.sync();
    document.querySelector<HTMLElement>('#game')!.focus();
  }
  private attack() {
    if(this.swordCooldown>0 || this.dodge>0)return;
    this.swordCooldown=R.swordCooldown;this.swing=0.15;
    if(inSwordArc(this.p.x,this.p.y,this.angle,this.e.x,this.e.y)) {
      this.ehp=Math.max(0,this.ehp-R.swordDamage);
      if(this.ehp===0){this.enemyState='dead';this.mode='won';this.wins++;}
    }
  }
  update(_time:number, delta:number) {
    const dt=Math.min(delta/1000,0.04);
    if(Phaser.Input.Keyboard.JustDown(this.keys.ESC)) {if(this.mode==='playing')this.mode='paused';else if(this.mode==='paused')this.mode='playing';}
    if(this.mode==='playing'){
      this.angle=Phaser.Math.Angle.Between(this.p.x,this.p.y,this.input.activePointer.x,this.input.activePointer.y);
      this.swordCooldown=Math.max(0,this.swordCooldown-dt);this.swing=Math.max(0,this.swing-dt);this.hurt=Math.max(0,this.hurt-dt);this.dodgeCooldown=Math.max(0,this.dodgeCooldown-dt);
      const move=new Phaser.Math.Vector2(Number(this.keys.D.isDown)-Number(this.keys.A.isDown),Number(this.keys.S.isDown)-Number(this.keys.W.isDown)).normalize();
      if(Phaser.Input.Keyboard.JustDown(this.keys.SPACE)&&this.dodgeCooldown===0&&this.stamina>=R.dodgeCost){this.dodge=R.dodgeDuration;this.dodgeCooldown=R.dodgeCooldown;this.stamina-=R.dodgeCost;this.dodgeVector=move.length()>0?move.clone():new Phaser.Math.Vector2(Math.cos(this.angle),Math.sin(this.angle));}
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
        if(this.enemyTimer<=0){if(Phaser.Math.Distance.Between(this.p.x,this.p.y,this.target.x,this.target.y)<R.enemyReach&&!invulnerable){this.hp=Math.max(0,this.hp-R.enemyDamage);this.hurt=0.25;this.cameras.main.shake(100,0.004);if(this.hp===0)this.mode='lost';}this.enemyState='recovery';this.enemyTimer=R.recovery;}
      } else if(this.enemyState==='recovery'){this.enemyTimer-=dt;if(this.enemyTimer<=0)this.enemyState='chase';}
    }
    this.sync();this.draw();
  }
  private sync() {
    document.querySelector<HTMLProgressElement>('#health')!.value=this.hp;document.querySelector('#hp')!.textContent=`${this.hp} / 100`;
    document.querySelector<HTMLProgressElement>('#stamina')!.value=this.stamina;document.querySelector('#sp')!.textContent=`${Math.floor(this.stamina)} / 100`;
    const messages={ready:'Enter the arena to begin.',playing:'Read the warning. Dodge the strike. Find your opening.',paused:'Paused — resume when you’re ready.',lost:'You fell in training. Reset and try another approach.',won:'Encounter cleared. Reset to practice again.'};
    document.querySelector('#status')!.textContent=messages[this.mode];document.querySelector('#score')!.textContent=`DEMONS DEFEATED ${String(this.wins).padStart(2,'0')}`;
    document.querySelector('#start')!.textContent=this.mode==='playing'?'Pause encounter':this.mode==='paused'?'Resume encounter':'Enter the arena ↗';
    this.overlay.setVisible(this.mode!=='playing').setText({ready:'THE TRAINING GROUNDS\n\nEnter the arena to begin',paused:'PAUSED',lost:'FALLEN IN TRAINING\n\nReset to try again',won:'ENCOUNTER CLEARED\n\nYour first step forward',playing:''}[this.mode]);
  }
  private draw() {
    const g=this.ink;g.clear();g.fillStyle(0x14282a);g.fillRect(0,0,1000,620);
    for(let y=0;y<620;y+=32)for(let x=0;x<1000;x+=32){g.fillStyle(((x/32+y/32)%3===0)?0x192d2d:0x172a2b);g.fillRect(x,y,30,30);}
    g.fillStyle(0x35413b);g.fillRect(48,65,904,516);g.fillStyle(0x2b3732);g.fillRect(60,77,880,492);
    for(let i=0;i<90;i++){const x=76+(i*137)%846,y=90+(i*79)%456;g.fillStyle(0x526052,0.28);g.fillRect(x,y,3,2);}
    g.lineStyle(1,0xb5b28b,0.12);g.strokeCircle(500,325,170);g.strokeCircle(500,325,175);
    for(let i=0;i<12;i++){const x=20+i*86;for(const y of [30,598]){g.fillStyle(0x1a3432);g.fillCircle(x,y,35);g.fillStyle(0x314237);g.fillRect(x-3,y-14,6,26);g.fillStyle(0x9279a8,0.65);g.fillRect(x-15,y-6,6,14);g.fillRect(x+10,y,6,20);}}
    for(const x of [65,935]){g.fillStyle(0xe8be68,0.08);g.fillCircle(x,325,40);g.fillStyle(0x69543a);g.fillRect(x-5,310,10,30);g.fillStyle(0xf2ce89);g.fillRect(x-7,300,14,14);}
    if(this.enemyState==='windup'){g.fillStyle(0xe66e62,0.16);g.fillCircle(this.target.x,this.target.y,R.enemyReach);g.lineStyle(3,0xff8a77,0.85);g.strokeCircle(this.target.x,this.target.y,R.enemyReach);g.lineStyle(3,0xffd5a0);g.beginPath();g.arc(this.target.x,this.target.y,R.enemyReach-7,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-this.enemyTimer/R.windup));g.strokePath();}
    if(this.enemyState==='recovery'&&this.enemyTimer>R.recovery-0.15){g.lineStyle(5,0xee9b86,0.6);g.strokeCircle(this.target.x,this.target.y,R.enemyReach);}
    if(this.enemyState!=='dead') {this.actor(this.e.x,this.e.y,0x925064,true);g.fillStyle(0x101b20);g.fillRect(this.e.x-35,this.e.y-48,70,5);g.fillStyle(0xe78579);g.fillRect(this.e.x-35,this.e.y-48,70*this.ehp/R.enemyHealth,5);this.label.setPosition(this.e.x,this.e.y-62).setText(this.enemyState==='windup'?'STRIKE INCOMING':'LV 1 · DEMON').setVisible(true);}else this.label.setVisible(false);
    this.actor(this.p.x,this.p.y,this.hurt>0?0xffffff:this.dodge>0?0xb4e7dd:0x78aeb0,false);
    g.lineStyle(3,0xe7e4cb);g.lineBetween(this.p.x+Math.cos(this.angle)*12,this.p.y+Math.sin(this.angle)*12,this.p.x+Math.cos(this.angle)*34,this.p.y+Math.sin(this.angle)*34);
    if(this.swing>0){g.lineStyle(7,0xd6f4ed,this.swing/0.15);g.beginPath();g.arc(this.p.x,this.p.y,70,this.angle-1.15,this.angle+1.15);g.strokePath();}
    g.lineStyle(1,0xb4d8ce,0.6);g.strokeCircle(this.input.activePointer.x,this.input.activePointer.y,5);
  }
  private actor(x:number,y:number,color:number,demon:boolean){const g=this.ink;g.fillStyle(0x071316,0.4);g.fillEllipse(x,y+20,36,13);g.fillStyle(0x18232a);g.fillRect(x-10,y+9,8,13);g.fillRect(x+3,y+9,8,13);g.fillStyle(color);g.fillRect(x-14,y-9,28,25);g.fillStyle(demon?0xada19b:0xe0c7a7);g.fillRect(x-9,y-23,18,16);g.fillStyle(0x20202c);g.fillRect(x-10,y-25,20,6);if(demon){g.fillStyle(0xf7b2a2);g.fillRect(x-6,y-16,4,3);g.fillRect(x+3,y-16,4,3);}}
}
new Phaser.Game({type:Phaser.AUTO,parent:'game',width:1000,height:620,backgroundColor:'#14282a',pixelArt:true,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:Arena});
