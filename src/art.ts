// Original character art, painted once into textures at startup with smooth Canvas 2D curves.
// Every drawing faces right; the scene mirrors sprites to face left.
export const RES = 2;

type Ctx = CanvasRenderingContext2D;
type Pt = [number, number];

const INK = '#140d1a';

function shape(ctx: Ctx, fill: string | CanvasGradient, path: (c: Ctx) => void, line = 1.5) {
  ctx.beginPath(); path(ctx); ctx.closePath();
  ctx.fillStyle = fill; ctx.fill();
  if (line > 0) {ctx.lineWidth = line; ctx.strokeStyle = INK; ctx.stroke();}
}

function poly(ctx: Ctx, pts: Pt[]) {
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (const [x, y] of pts.slice(1)) ctx.lineTo(x, y);
}

// An outlined limb: an ink stroke with a narrower coloured stroke on top.
function limb(ctx: Ctx, pts: Pt[], width: number, color: string) {
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); poly(ctx, pts); ctx.strokeStyle = INK; ctx.lineWidth = width + 2.6; ctx.stroke();
  ctx.beginPath(); poly(ctx, pts); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
}

function lerp(a: Pt, b: Pt, t: number): Pt {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function dot(ctx: Ctx, x: number, y: number, r: number, color: string) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
}

// ---- Slayer recruit -------------------------------------------------------------

export const SLAYER = {w: 64, h: 88, feet: 82, shoulder: {x: 5, y: -44}};
export type SlayerFrame = {step: number; bob: number; lean: number; flutter: number; sway: number};

const S = {
  uniform: '#1b2031', uniformBack: '#121625', uniformLight: '#323b5a', wrap: '#ece6d6', wrapBack: '#c4bdb0',
  sandal: '#3a2a22', skin: '#f3d4b9', skinShade: '#d6ad8f', hair: '#1e1829', hairLight: '#4a4068',
  haoriTop: '#3c2f5f', haoriBottom: '#8a70c2', haoriBand: '#ddd0f3', haoriMark: '#57438a', gold: '#d8b25a',
  cord: '#c3303f', iris: '#8a2a3a', saya: '#17131c',
};

function haoriPanel(ctx: Ctx, path: (c: Ctx) => void) {
  const g = ctx.createLinearGradient(0, 36, 0, 72);
  g.addColorStop(0, S.haoriTop); g.addColorStop(1, S.haoriBottom);
  ctx.beginPath(); path(ctx); ctx.closePath(); ctx.fillStyle = g; ctx.fill();
  ctx.save(); ctx.clip();
  // Pale hem band with a row of dark scale triangles, plus scattered wisteria blossoms.
  ctx.fillStyle = S.haoriBand; ctx.fillRect(0, 62, 64, 14);
  ctx.fillStyle = S.haoriMark;
  for (let x = -6; x < 70; x += 5) {ctx.beginPath(); ctx.moveTo(x, 62.2); ctx.lineTo(x + 2.5, 58); ctx.lineTo(x + 5, 62.2); ctx.closePath(); ctx.fill();}
  for (const [x, y] of [[20, 47], [24, 55], [43, 49], [44, 57], [19, 59], [38, 43], [30, 66], [39, 66]]) dot(ctx, x, y, 0.9, 'rgba(240,230,255,0.6)');
  ctx.restore();
  ctx.beginPath(); path(ctx); ctx.closePath(); ctx.lineWidth = 1.5; ctx.strokeStyle = INK; ctx.stroke();
}

function slayerLeg(ctx: Ctx, hipX: number, footX: number, lift: number, back: boolean) {
  const hip: Pt = [hipX, 55], knee: Pt = [(hipX + footX) / 2 + 1.5, 68 - lift], ankle: Pt = [footX, 79.5 - lift * 0.7];
  limb(ctx, [hip, knee, lerp(knee, ankle, 0.35)], 7.5, back ? S.uniformBack : S.uniform);
  limb(ctx, [lerp(knee, ankle, 0.25), ankle], 5.2, back ? S.wrapBack : S.wrap);
  ctx.strokeStyle = 'rgba(80,70,60,0.45)'; ctx.lineWidth = 0.7;
  for (const t of [0.45, 0.7]) {const [x, y] = lerp(knee, ankle, t); ctx.beginPath(); ctx.moveTo(x - 2.4, y + 0.8); ctx.lineTo(x + 2.4, y - 0.8); ctx.stroke();}
  shape(ctx, S.sandal, c => c.ellipse(ankle[0] + 1.6, ankle[1] + 2.2, 4.2, 1.9, 0, 0, Math.PI * 2), 1.2);
}

function animeEye(ctx: Ctx, x: number, y: number, w: number, h: number) {
  ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2); ctx.fillStyle = '#fffaf2'; ctx.fill();
  ctx.save(); ctx.clip();
  const g = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2);
  g.addColorStop(0, '#3a0d18'); g.addColorStop(1, S.iris);
  ctx.beginPath(); ctx.ellipse(x + w * 0.12, y + h * 0.06, w * 0.36, h * 0.46, 0, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
  ctx.beginPath(); ctx.ellipse(x + w * 0.14, y + h * 0.1, w * 0.15, h * 0.22, 0, 0, Math.PI * 2); ctx.fillStyle = '#12080e'; ctx.fill();
  ctx.restore();
  dot(ctx, x + w * 0.02, y - h * 0.14, w * 0.12, '#ffffff');
  dot(ctx, x + w * 0.26, y + h * 0.22, w * 0.06, 'rgba(255,255,255,0.8)');
  ctx.strokeStyle = INK; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, Math.PI * 1.05, Math.PI * 1.97); ctx.stroke();
}

export function drawSlayer(ctx: Ctx, q: SlayerFrame) {
  const f = q.flutter, sw = q.sway;
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.translate(32 - q.lean * 22, 82); ctx.rotate(q.lean); ctx.translate(-32, -82 + q.bob);
  // Ponytail behind the head.
  shape(ctx, S.hair, c => {c.moveTo(25, 10); c.quadraticCurveTo(14 + sw, 7, 8 + sw * 1.6, 21); c.lineTo(12.5 + sw, 19.5); c.lineTo(9 + sw * 1.8, 31); c.lineTo(14 + sw * 1.2, 25); c.quadraticCurveTo(19 + sw, 20, 24.5, 17);});
  haoriPanel(ctx, c => {c.moveTo(25, 37); c.lineTo(41, 37); c.quadraticCurveTo(45, 52, 46 + f * 0.3, 68); c.lineTo(31, 70.5); c.lineTo(17 - f, 70); c.quadraticCurveTo(20, 52, 25, 37);});
  slayerLeg(ctx, 30, 28 - q.step * 6, Math.max(0, -q.step) * 4, true);
  slayerLeg(ctx, 35.5, 37 + q.step * 6, Math.max(0, q.step) * 4, false);
  // Empty scabbard at the hip.
  limb(ctx, [[29, 55], [13, 66.5]], 3, S.saya);
  dot(ctx, 13.4, 66.3, 1.5, S.gold); dot(ctx, 25.5, 57, 1.1, S.gold);
  // Uniform jacket with gold buttons and a white belt.
  shape(ctx, S.uniform, c => {c.moveTo(26, 37); c.lineTo(41, 37); c.quadraticCurveTo(42.6, 47, 41, 57); c.lineTo(26.5, 57); c.quadraticCurveTo(25, 47, 26, 37);});
  ctx.strokeStyle = S.uniformLight; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(30.5, 41); ctx.quadraticCurveTo(29.5, 47, 30.5, 52); ctx.stroke();
  for (const y of [42, 46.5, 51]) dot(ctx, 37.5, y, 0.95, S.gold);
  shape(ctx, S.wrap, c => c.rect(26, 53, 15.6, 3.6), 1.2);
  haoriPanel(ctx, c => {c.moveTo(38.5, 37); c.lineTo(42, 37); c.quadraticCurveTo(46, 52, 46.5 + f * 0.3, 68); c.lineTo(41, 67.5); c.quadraticCurveTo(40.5, 50, 38.5, 37);});
  haoriPanel(ctx, c => {c.moveTo(25, 37); c.lineTo(28.5, 37.5); c.quadraticCurveTo(27.5, 52, 27, 67.5); c.lineTo(18.5 - f, 69.5); c.quadraticCurveTo(21, 52, 25, 37);});
  // Far arm in a wide haori sleeve.
  shape(ctx, '#4d3d78', c => {c.moveTo(25.5, 38); c.quadraticCurveTo(19, 44, 17.5, 54); c.lineTo(24.5, 55.5); c.quadraticCurveTo(25, 47, 28.5, 40.5);});
  shape(ctx, S.haoriBand, c => {c.moveTo(17.6, 53); c.lineTo(24.6, 54.4); c.lineTo(24.4, 56); c.lineTo(17.3, 55);}, 1);
  shape(ctx, S.skin, c => c.arc(21, 57.5, 2.3, 0, Math.PI * 2), 1.1);
  // Neck, high collar, ear, head.
  shape(ctx, S.skinShade, c => c.rect(30, 30, 6.5, 7), 1.1);
  shape(ctx, S.uniform, c => c.roundRect(28.2, 33.5, 10.6, 4.6, 1.6), 1.2);
  shape(ctx, S.skin, c => c.ellipse(24.2, 23.5, 2.2, 3, 0, 0, Math.PI * 2), 1.2);
  shape(ctx, S.skin, c => {c.moveTo(22.5, 19); c.bezierCurveTo(22, 8, 44, 8, 43.5, 19); c.bezierCurveTo(44, 27, 40.5, 32, 36, 34); c.bezierCurveTo(31, 35, 24, 30, 22.5, 19);});
  dot(ctx, 40, 28.6, 1.6, 'rgba(232,140,140,0.35)');
  animeEye(ctx, 38.2, 23.4, 5.6, 6.4);
  animeEye(ctx, 29.6, 23.6, 4.4, 6);
  ctx.strokeStyle = INK; ctx.lineWidth = 0.9;
  ctx.beginPath(); ctx.moveTo(42.2, 26.4); ctx.lineTo(42.7, 27.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(36.6, 30.4); ctx.quadraticCurveTo(38, 30.9, 39.3, 30.1); ctx.stroke();
  // Spiky bangs and side locks.
  shape(ctx, S.hair, c => {
    c.moveTo(21, 26); c.lineTo(19.5, 15); c.quadraticCurveTo(22, 4, 33, 2.5); c.quadraticCurveTo(44.5, 3, 47.5, 13); c.lineTo(46.5, 23.5);
    c.lineTo(44.2, 17.5); c.lineTo(42.5, 21); c.lineTo(41, 14.5); c.lineTo(37.5, 19); c.lineTo(35, 13); c.lineTo(31.5, 18.5); c.lineTo(29, 13); c.lineTo(26.5, 19.5); c.lineTo(25, 15.5); c.lineTo(23.5, 27);
  });
  ctx.strokeStyle = S.hairLight; ctx.lineWidth = 1.3;
  ctx.beginPath(); ctx.arc(32, 11, 7, Math.PI * 1.15, Math.PI * 1.6); ctx.stroke();
  ctx.beginPath(); ctx.arc(38, 10, 6, Math.PI * 1.55, Math.PI * 1.8); ctx.stroke();
  shape(ctx, S.cord, c => c.roundRect(22.5, 9.5, 3.4, 4, 1), 1);
  ctx.restore();
}

// ---- Nichirin katana ------------------------------------------------------------

export const KATANA = {w: 68, h: 16, grip: 9, bladeStart: 21, length: 57};

export function drawKatana(ctx: Ctx) {
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // Blade with a slight curve, steel body, tempered edge and ridge line.
  const steel = ctx.createLinearGradient(0, 5, 0, 10);
  steel.addColorStop(0, '#8d9bb0'); steel.addColorStop(0.45, '#e8eef5'); steel.addColorStop(1, '#b9c6d6');
  shape(ctx, steel, c => {c.moveTo(21, 6.2); c.quadraticCurveTo(44, 4.6, 66, 6.6); c.lineTo(63, 8.4); c.quadraticCurveTo(44, 9.2, 21, 9.6);}, 1.1);
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 0.7;
  ctx.beginPath(); ctx.moveTo(22, 8.8);
  for (let x = 24; x <= 60; x += 3) ctx.quadraticCurveTo(x - 1.5, 8.2 + (x % 2), x, 8.6 - (x - 24) * 0.008);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(70,82,104,0.6)'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(22, 7.4); ctx.quadraticCurveTo(44, 6.3, 62, 7.2); ctx.stroke();
  // Habaki collar and an ornate guard.
  shape(ctx, S.gold, c => c.rect(19.4, 5.8, 2.2, 4.2), 0.9);
  shape(ctx, '#2a2230', c => c.ellipse(17.6, 8, 2.2, 6.4, 0, 0, Math.PI * 2), 1.1);
  ctx.strokeStyle = S.gold; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.ellipse(17.6, 8, 1.3, 5, 0, 0, Math.PI * 2); ctx.stroke();
  // Wrapped handle: dark cord diamonds over white ray skin, gold end cap.
  shape(ctx, '#e9e2d0', c => c.roundRect(2.5, 5.8, 13.4, 4.4, 1.4), 1.1);
  ctx.fillStyle = '#231b2b';
  for (let x = 3.2; x < 15; x += 3) {ctx.beginPath(); ctx.moveTo(x, 6); ctx.lineTo(x + 1.5, 8); ctx.lineTo(x, 10); ctx.lineTo(x + 3, 10); ctx.lineTo(x + 1.5, 8); ctx.lineTo(x + 3, 6); ctx.closePath(); ctx.fill();}
  shape(ctx, S.gold, c => c.roundRect(0.8, 5.6, 2.4, 4.8, 1), 0.9);
}

// ---- Demon -----------------------------------------------------------------------

export const DEMON = {w: 96, h: 116, feet: 110, center: 48};
export type DemonFrame = {step: number; arms: 'hang' | 'raise' | 'slump'; breath: number; mouth: boolean};

const D = {
  skin: '#c4b0c6', skinShade: '#8f7a99', robe: '#2b1530', robeLight: '#4a2852', sash: '#8e1b2e',
  bone: '#efe3cc', boneShade: '#a8957a', mane: '#1a0f22', maneLight: '#3a2446', mark: '#b3203a', claw: '#f3ebdc', vein: '#6d3a6f',
};

function claws(ctx: Ctx, hand: Pt, from: Pt, len: number) {
  const a = Math.atan2(hand[1] - from[1], hand[0] - from[0]);
  for (let i = -1.5; i <= 1.5; i++) {
    const b = a + i * 0.28, base: Pt = [hand[0] + Math.cos(a + Math.PI / 2) * i * 1.6, hand[1] + Math.sin(a + Math.PI / 2) * i * 1.6];
    const tip: Pt = [base[0] + Math.cos(b) * len, base[1] + Math.sin(b) * len], n: Pt = [Math.cos(b + Math.PI / 2) * 0.9, Math.sin(b + Math.PI / 2) * 0.9];
    shape(ctx, D.claw, c => {c.moveTo(base[0] + n[0], base[1] + n[1]); c.quadraticCurveTo(base[0] + Math.cos(b) * len * 0.6 + n[0] * 2.4, base[1] + Math.sin(b) * len * 0.6 + n[1] * 2.4, tip[0], tip[1]); c.lineTo(base[0] - n[0], base[1] - n[1]);}, 0.9);
  }
}

function demonArm(ctx: Ctx, shoulder: Pt, elbow: Pt, hand: Pt, near: boolean) {
  limb(ctx, [shoulder, elbow, hand], near ? 5 : 4.4, near ? D.skin : D.skinShade);
  ctx.strokeStyle = D.vein; ctx.lineWidth = 0.7;
  const m = lerp(elbow, hand, 0.25), e = lerp(elbow, hand, 0.8);
  ctx.beginPath(); ctx.moveTo(m[0], m[1]); ctx.quadraticCurveTo(m[0] + 1.5, (m[1] + e[1]) / 2, e[0], e[1]); ctx.stroke();
  limb(ctx, [shoulder, lerp(shoulder, elbow, 0.6)], 8, near ? D.robe : '#22101f');
  claws(ctx, hand, elbow, 8.5);
}

export function drawDemon(ctx: Ctx, q: DemonFrame): Pt[] {
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const h: Pt = q.arms === 'raise' ? [60, 31] : q.arms === 'slump' ? [65, 47 + q.breath] : [62, 37 + q.breath];
  const sw = q.step * 3;
  const arms = {
    hang: {near: [[65, 51], [72, 67], [70 + sw, 85]], far: [[47, 49], [41, 65], [37 - sw, 81]]},
    raise: {near: [[65, 50], [76, 36], [75, 18]], far: [[48, 48], [51, 32], [46, 16]]},
    slump: {near: [[66, 53], [70, 72], [66, 93]], far: [[48, 52], [44, 71], [40, 91]]},
  }[q.arms] as {near: Pt[]; far: Pt[]};
  // Wild mane streaming behind.
  shape(ctx, D.mane, c => {
    c.moveTo(h[0] - 1, h[1] - 13); c.quadraticCurveTo(h[0] - 18, h[1] - 16, 30, h[1] - 2); c.lineTo(35, h[1] + 1); c.lineTo(23, h[1] + 14);
    c.lineTo(31, h[1] + 13); c.lineTo(22, 78); c.lineTo(33, 68); c.lineTo(32, 80); c.lineTo(41, 64); c.lineTo(h[0] - 6, h[1] + 8);
  });
  ctx.strokeStyle = D.maneLight; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(h[0] - 6, h[1] - 10); ctx.quadraticCurveTo(38, h[1] - 6, 30, h[1] + 12); ctx.stroke();
  demonArm(ctx, arms.far[0], arms.far[1], arms.far[2], false);
  // Long clawed legs under a torn robe.
  for (const [hipX, foot, near] of [[45, 41 - q.step * 7, false], [53, 56 + q.step * 7, true]] as [number, number, boolean][]) {
    const lift = Math.max(0, near ? q.step : -q.step) * 4, knee: Pt = [(hipX + foot) / 2 + 6, 95 - lift], ankle: Pt = [foot, 108 - lift];
    limb(ctx, [[hipX, 80], knee, ankle], near ? 4.6 : 4, near ? D.skin : D.skinShade);
    for (const k of [-1, 0, 1]) shape(ctx, D.claw, c => {c.moveTo(ankle[0] + 1, ankle[1] - 0.8 + k * 0.6); c.lineTo(ankle[0] + 6, ankle[1] + 1.5 + k * 1.2); c.lineTo(ankle[0] + 1, ankle[1] + 1 + k * 0.6);}, 0.8);
  }
  shape(ctx, D.robe, c => {
    c.moveTo(38, 72); c.lineTo(61, 72); c.lineTo(64, 89); c.lineTo(60, 86); c.lineTo(57, 93); c.lineTo(53, 87); c.lineTo(49, 94); c.lineTo(45, 87); c.lineTo(41, 92); c.lineTo(39, 86); c.lineTo(34, 90);
  });
  // Hunched torso, open robe over ribs, blood-red sash with a trailing end.
  shape(ctx, D.robe, c => {c.moveTo(44, 44); c.quadraticCurveTo(35, 57, 38, 76); c.lineTo(61, 76); c.quadraticCurveTo(64, 60, 69, 49); c.quadraticCurveTo(58, 42, 44, 44);});
  shape(ctx, D.skin, c => {c.moveTo(57, 45.5); c.lineTo(66, 48); c.lineTo(59, 64);}, 1.1);
  ctx.strokeStyle = D.skinShade; ctx.lineWidth = 0.8;
  for (const y of [51, 55, 59]) {ctx.beginPath(); ctx.moveTo(58.5, y); ctx.quadraticCurveTo(60.5, y - 1, 62.5 - (y - 51) * 0.4, y); ctx.stroke();}
  ctx.strokeStyle = D.robeLight; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(46, 50); ctx.quadraticCurveTo(43, 60, 45, 70); ctx.stroke();
  shape(ctx, D.sash, c => {c.moveTo(37.8, 68); c.lineTo(61, 68); c.lineTo(61.3, 74.5); c.lineTo(37.8, 75);}, 1.2);
  shape(ctx, D.sash, c => {c.moveTo(40, 72); c.lineTo(36, 86); c.lineTo(38.5, 84); c.lineTo(38, 89); c.lineTo(43, 74);}, 1.1);
  if (q.arms !== 'raise') demonArm(ctx, arms.near[0], arms.near[1], arms.near[2], true);
  // Head: neck, rear horn, gaunt face, front horn, bangs, eyes, markings, fangs.
  limb(ctx, [[60, 47], [h[0] - 2, h[1] + 6]], 6, D.skinShade);
  shape(ctx, D.boneShade, c => {c.moveTo(h[0] - 7, h[1] - 8); c.quadraticCurveTo(h[0] - 7, h[1] - 20, h[0] - 15, h[1] - 27); c.quadraticCurveTo(h[0] - 1, h[1] - 22, h[0] - 1, h[1] - 10);}, 1.2);
  shape(ctx, D.skin, c => {
    c.moveTo(h[0] - 9, h[1] - 4); c.bezierCurveTo(h[0] - 10, h[1] - 14, h[0] + 6, h[1] - 16, h[0] + 9, h[1] - 6);
    c.lineTo(h[0] + 11.5, h[1] + 2); c.quadraticCurveTo(h[0] + 10.5, h[1] + 10, h[0] + 5, h[1] + 12); c.quadraticCurveTo(h[0] - 4, h[1] + 12, h[0] - 9, h[1] - 4);
  });
  ctx.fillStyle = 'rgba(110,80,120,0.35)';
  ctx.beginPath(); ctx.moveTo(h[0] + 1, h[1] + 3); ctx.quadraticCurveTo(h[0] + 4, h[1] + 10, h[0] + 9, h[1] + 7); ctx.quadraticCurveTo(h[0] + 5, h[1] + 7, h[0] + 1, h[1] + 3); ctx.fill();
  const horn = ctx.createLinearGradient(h[0], h[1] - 32, h[0], h[1] - 8);
  horn.addColorStop(0, D.bone); horn.addColorStop(1, D.boneShade);
  shape(ctx, horn, c => {c.moveTo(h[0] + 1, h[1] - 10); c.quadraticCurveTo(h[0] + 9, h[1] - 22, h[0] - 1, h[1] - 33); c.quadraticCurveTo(h[0] + 12, h[1] - 23, h[0] + 6.5, h[1] - 9);}, 1.2);
  ctx.strokeStyle = D.boneShade; ctx.lineWidth = 0.7;
  for (const t of [0.35, 0.6]) {ctx.beginPath(); ctx.moveTo(h[0] + 2 + t * 4, h[1] - 12 - t * 12); ctx.lineTo(h[0] + 6 + t * 3, h[1] - 12 - t * 11); ctx.stroke();}
  shape(ctx, D.mane, c => {
    c.moveTo(h[0] - 10, h[1] + 2); c.quadraticCurveTo(h[0] - 12, h[1] - 14, h[0] + 1, h[1] - 15); c.quadraticCurveTo(h[0] + 9, h[1] - 14, h[0] + 10, h[1] - 6);
    c.lineTo(h[0] + 6, h[1] - 9); c.lineTo(h[0] + 4, h[1] - 5); c.lineTo(h[0] + 1, h[1] - 10); c.lineTo(h[0] - 2, h[1] - 5); c.lineTo(h[0] - 4, h[1] - 9); c.lineTo(h[0] - 7, h[1] + 4);
  });
  const eyes: Pt[] = [[h[0] + 5.6, h[1] - 1.6], [h[0] - 0.4, h[1] - 2]];
  for (const [i, [x, y]] of eyes.entries()) {
    const s = i === 0 ? 1 : 0.8;
    shape(ctx, D.mark, c => {c.moveTo(x - 2.8 * s, y + 0.9); c.quadraticCurveTo(x, y - 2.4 * s, x + 3 * s, y - 1.3); c.quadraticCurveTo(x + 0.8, y + 1.8 * s, x - 2.8 * s, y + 0.9);}, 0.9);
    dot(ctx, x + 0.2, y - 0.2, 1.5 * s, '#ffd54a');
    ctx.strokeStyle = '#120408'; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(x + 0.2, y - 1.4 * s); ctx.lineTo(x + 0.2, y + 1 * s); ctx.stroke();
  }
  ctx.strokeStyle = D.mark; ctx.lineWidth = 1;
  for (const [x0, y0, x1, y1] of [[h[0] + 3.4, h[1] + 1.4, h[0] + 2.6, h[1] + 6], [h[0] + 7, h[1] + 1, h[0] + 7.4, h[1] + 5]]) {ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();}
  shape(ctx, D.mark, c => {c.moveTo(h[0] + 3, h[1] - 9); c.lineTo(h[0] + 4.2, h[1] - 7); c.lineTo(h[0] + 3, h[1] - 5); c.lineTo(h[0] + 1.8, h[1] - 7);}, 0);
  if (q.mouth) {
    shape(ctx, '#3a0610', c => {c.moveTo(h[0] + 1, h[1] + 6.5); c.quadraticCurveTo(h[0] + 6, h[1] + 13, h[0] + 10.5, h[1] + 5); c.quadraticCurveTo(h[0] + 6, h[1] + 7.5, h[0] + 1, h[1] + 6.5);}, 1);
    for (const [x, y, d] of [[h[0] + 4, h[1] + 7, 1], [h[0] + 7.6, h[1] + 6.4, 1], [h[0] + 5, h[1] + 10.4, -1], [h[0] + 8, h[1] + 9, -1]]) shape(ctx, D.claw, c => {c.moveTo(x - 0.9, y); c.lineTo(x + 0.9, y); c.lineTo(x, y + d * 2.2);}, 0.6);
  } else {
    ctx.strokeStyle = INK; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(h[0] + 1, h[1] + 7); ctx.quadraticCurveTo(h[0] + 5, h[1] + 9, h[0] + 10, h[1] + 5.4); ctx.stroke();
    for (const [x, y] of [[h[0] + 4, h[1] + 8], [h[0] + 7.6, h[1] + 7.2]]) shape(ctx, D.claw, c => {c.moveTo(x - 0.9, y); c.lineTo(x + 0.9, y); c.lineTo(x, y + 2.4);}, 0.6);
  }
  if (q.arms === 'raise') demonArm(ctx, arms.near[0], arms.near[1], arms.near[2], true);
  return eyes;
}
