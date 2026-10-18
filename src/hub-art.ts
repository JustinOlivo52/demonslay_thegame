import {paintCrow} from './crow-art';
import {HUB_SIZE} from './hub-world';
type C=CanvasRenderingContext2D;
function roof(c:C,x:number,y:number,w:number){
 const small=w<150,h=small?30:66,rows=small?3:6;
 c.fillStyle='#17272c';c.fillRect(x-28,y+15,w+56,19);
 for(let row=0;row<rows;row++){const t=row/(rows-1),left=Math.round(x+12-36*t),yy=Math.round(y-h+row*h/rows),width=Math.round(w-24+72*t),height=Math.ceil(h/rows)+2;
  c.fillStyle=['#40575d','#3c5259','#344a53','#30434e','#293e49','#263944'][row%6];c.fillRect(left,yy,width,height);
  c.fillStyle='#1e303b';c.fillRect(left,yy+height-2,width,2);
  for(let tx=left+(row%2)*8;tx<left+width-6;tx+=16){c.fillStyle='#637a7b';c.fillRect(tx,yy+2,2,height-5);c.fillStyle='#4f696e';c.fillRect(tx+2,yy+2,9,2);c.fillStyle='#233b46';c.fillRect(tx+11,yy+3,2,height-4);}
 }
 c.fillStyle='#7e8a80';c.fillRect(x+5,y-h-4,w-10,3);c.fillStyle='#384e55';c.fillRect(x-31,y+1,w+62,9);c.fillStyle='#88938b';c.fillRect(x-31,y+1,w+62,2);c.fillStyle='#1d3039';c.fillRect(x-34,y+10,w+68,7);
 for(const side of [-1,1]){const edge=side<0?x-34:x+w+19;c.fillStyle='#354c54';c.fillRect(edge,y-4,15,15);c.fillStyle='#7d8c86';c.fillRect(edge,y-5,15,3);}
}
function house(c:C,x:number,y:number,w:number,h:number){
 c.fillStyle='#263b32';c.fillRect(x-18,y+30,w+36,h+26);c.fillStyle='#bbb18c';c.fillRect(x,y,w,h);c.fillStyle='#8d9479';c.fillRect(x,y+18,w,20);c.fillStyle='#515444';c.fillRect(x,y+h-25,w,25);
 for(let yy=38;yy<h-28;yy+=6)for(let xx=6;xx<w-8;xx+=13){c.fillStyle=(xx+yy)%3?'#b4ac89':'#c5b995';c.fillRect(x+xx,y+yy,4,2);}
 for(let i=12;i<w;i+=72){c.fillStyle='#66543f';c.fillRect(x+i,y+26,8,h-26);c.fillStyle='#937553';c.fillRect(x+i+1,y+29,2,h-33);c.fillStyle='#d6cbaa';c.fillRect(x+i+14,y+48,42,57);
  for(let k=0;k<4;k++){c.fillStyle='#91937c';c.fillRect(x+i+14+k*11,y+48,2,57);}for(let k=0;k<5;k++){c.fillStyle='#a8a389';c.fillRect(x+i+14,y+49+k*12,42,1);}c.fillStyle='#675e48';c.fillRect(x+i+11,y+105,48,4);
 }
 const dx=x+w/2-26;c.fillStyle='#303e36';c.fillRect(dx-3,y+55,58,h-62);c.fillStyle='#5d604c';c.fillRect(dx,y+59,52,h-65);for(let i=0;i<2;i++){c.fillStyle='#d6c9a3';c.fillRect(dx+4+i*25,y+62,19,45);for(let k=1;k<4;k++){c.fillStyle='#92957b';c.fillRect(dx+4+i*25,y+62+k*11,19,1);}c.fillStyle='#443d2f';c.fillRect(dx+12+i*25,y+116,4,5);}c.fillStyle='#958264';c.fillRect(dx+25,y+59,2,h-65);
 // Engawa veranda, worn planks and stacked stone foundation.
 c.fillStyle='#948365';c.fillRect(x-14,y+h-14,w+28,21);for(let xx=x-12;xx<x+w+10;xx+=18){c.fillStyle='#655a43';c.fillRect(xx,y+h-12,1,18);c.fillStyle='#b09b74';c.fillRect(xx+3,y+h-10,10,1);}c.fillStyle='#535e52';c.fillRect(x-16,y+h+7,w+32,9);c.fillStyle='#a1a38b';c.fillRect(dx-14,y+h+16,80,9);c.fillStyle='#626c5c';c.fillRect(dx-18,y+h+25,88,5);
 roof(c,x,y,w);
}
function tree(c:C,x:number,y:number,wisteria=false){
 let seed=Math.abs(Math.round(x*71+y*127));const r=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 c.fillStyle='#2b4434';c.fillRect(x-23,y+12,48,9);c.fillStyle='#514a35';c.fillRect(x-6,y-70,13,90);c.fillStyle='#88704c';c.fillRect(x-4,y-57,3,70);c.fillStyle='#3e3f2e';c.fillRect(x-13,y+10,26,9);
 for(let i=0;i<36;i++){const xx=Math.round((x+(r()-.5)*106)/3)*3,yy=Math.round((y-91+(r()-.5)*52)/3)*3;c.fillStyle=['#294737','#355a3c','#466b45','#587c4e'][i%4];c.fillRect(xx-15,yy-8,30,16);c.fillRect(xx-10,yy-13,20,23);if(i%2===0){c.fillStyle='#6e8b53';c.fillRect(xx-9,yy-10,9,3);}}
 if(wisteria)for(let i=0;i<30;i++){const xx=x-53+i*3.6,top=y-65+r()*12,len=13+r()*42;for(let j=0;j<len;j+=4){c.fillStyle=['#76618d','#9680a6','#b29ac0','#d1bdd5'][Math.min(3,Math.floor(j/len*4))];c.fillRect(Math.round(xx+(r()-.5)*4),Math.round(top+j),j<len*.65?4:2,3);}}
}
function lantern(c:C,x:number,y:number){c.fillStyle='#434b41';c.fillRect(x-7,y-8,14,21);c.fillRect(x-13,y+10,26,6);c.fillRect(x-4,y-23,8,18);c.fillStyle='#b1a783';c.fillRect(x-11,y-42,22,20);c.fillStyle='#e8cf94';c.fillRect(x-6,y-38,12,12);c.fillStyle='#546156';c.fillRect(x-16,y-47,32,6);c.fillRect(x-10,y-53,20,7);}
export function paintHeadquarters(c:C){let n=64;const r=()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};c.imageSmoothingEnabled=false;c.fillStyle='#36523d';c.fillRect(0,0,HUB_SIZE.width,HUB_SIZE.height);
 for(let i=0;i<17000;i++){const x=Math.floor(r()*1600/3)*3,y=Math.floor(r()*1080/3)*3;c.fillStyle=['#416047','#496a48','#304c38','#56734a'][i%4];c.fillRect(x,y,3,3);}
 // Broad gravel courtyard and connected walks leave room to explore between buildings.
 c.fillStyle='#88876d';c.fillRect(210,410,1200,220);c.fillRect(470,350,570,480);c.fillRect(270,590,190,300);c.fillRect(1160,590,260,300);c.fillRect(350,760,980,120);
 c.fillStyle='#73795f';c.fillRect(215,625,1190,8);c.fillRect(470,825,570,8);
 for(let i=0;i<6400;i++){const x=Math.floor(r()*1600/4)*4,y=Math.floor(r()*1080/4)*4;if((x>210&&x<1410&&y>410&&y<630)||(x>470&&x<1040&&y>350&&y<830)||(x>270&&x<460&&y>590&&y<890)||(x>1160&&x<1420&&y>590&&y<890)||(x>350&&x<1330&&y>760&&y<880)){c.fillStyle=['#a09b7b','#787e67','#919177'][i%3];c.fillRect(x,y,3+(i%2)*2,2);}}
 // Broken stone edging, sparse leaf litter and a welcoming approach.
 for(let i=0;i<28;i++){const x=221+i*42;c.fillStyle=i%2?'#727e68':'#9b9f80';c.fillRect(x,631+(i%3)*2,31,4);c.fillStyle='#506648';c.fillRect(x+33,628,2,8);}
 for(const [bx,by] of [[490,530],[650,842],[1390,650],[205,540]]){for(let i=0;i<7;i++){c.fillStyle=['#6b8052','#849060','#9ca06c'][i%3];c.fillRect(bx+i*4,by+(i%3)*3,2,8);}c.fillStyle='#b7a4bc';c.fillRect(bx+9,by-2,3,3);}
 // Northern boundary, main residence, recruits’ quarters and storehouse.
 c.fillStyle='#666f55';c.fillRect(50,285,1500,26);c.fillStyle='#36473a';c.fillRect(45,278,1510,8);for(let x=75;x<1550;x+=70){c.fillStyle='#838a68';c.fillRect(x,288,6,20);}
 for(let x=70;x<1550;x+=95)tree(c,x,200+(x%3)*12,x%2===0);
 house(c,560,115,470,175);house(c,140,225,320,160);house(c,1110,230,320,155);
 c.fillStyle='#e1d4b2';c.fillRect(724,156,140,29);c.fillStyle='#524d40';c.font='10px Georgia';c.textAlign='center';c.fillText('CORPS HEADQUARTERS',794,175);
 // Stone approach, crow perch and notice board.
 for(let y=315;y<425;y+=26){c.fillStyle='#9f9f87';c.fillRect(742,y,125,20);c.fillStyle='#b4b196';c.fillRect(748,y,113,3);}
 c.fillStyle='#544936';c.fillRect(855,356,6,60);c.fillRect(925,356,6,60);c.fillStyle='#79664a';c.fillRect(848,340,90,60);c.fillStyle='#c9bd94';c.fillRect(855,348,76,42);c.fillStyle='#746d52';for(let i=0;i<4;i++)c.fillRect(864,356+i*7,55-i*6,2);roof(c,853,329,80);
 c.fillStyle='#4c4537';c.fillRect(805,370,7,55);c.fillStyle='#8b7753';c.fillRect(807,374,2,46);c.fillStyle='#776348';c.fillRect(783,368,54,6);c.fillStyle='#b8a078';c.fillRect(783,368,54,2);paintCrow(c,777,316,1);
 // Quiet garden pond with stepping stones around, never across, its collision.
 c.fillStyle='#5d6d58';c.beginPath();c.ellipse(1050,720,137,97,0,0,Math.PI*2);c.fill();c.fillStyle='#385f62';c.beginPath();c.ellipse(1050,720,123,83,0,0,Math.PI*2);c.fill();c.strokeStyle='#8aa69a';c.lineWidth=2;for(let i=0;i<7;i++){c.beginPath();c.ellipse(1020+i*9,700+i*6,32+i*6,4,0,0,Math.PI*2);c.stroke();}c.fillStyle='#76906a';c.fillRect(1000,750,24,8);c.fillRect(1080,685,19,7);c.fillStyle='#e0c0bc';c.fillRect(1007,747,6,5);
 // Layered shoreline stones, reeds and two koi in the garden water.
 for(let i=0;i<34;i++){const a=i/34*Math.PI*2,px=Math.round(1050+Math.cos(a)*132),py=Math.round(720+Math.sin(a)*92);c.fillStyle=['#667464','#83907b','#9aa18a'][i%3];c.fillRect(px-7,py-4,12+(i%3)*3,8);c.fillStyle='#abb09a';c.fillRect(px-4,py-4,7,2);}
 for(const [px,py] of [[1103,754],[1015,684]]){c.fillStyle='#c5bd97';c.fillRect(px,py,13,4);c.fillRect(px+3,py-2,6,7);c.fillStyle='#c7825d';c.fillRect(px+4,py-1,4,3);c.fillStyle='#819a8a';c.fillRect(px+13,py-2,3,3);c.fillRect(px+13,py+3,3,3);}
 for(const [px,py] of [[942,727],[1125,661],[1125,773]])for(let i=0;i<5;i++){c.fillStyle=i%2?'#7a8851':'#486748';c.fillRect(px+i*3,py-(i%3)*5,2,15);}
 // Wooden training targets stand beyond the generous practice approach.
 c.fillStyle='#786f50';c.fillRect(1190,420,165,44);for(const x of [1210,1270,1330]){c.fillStyle='#61513c';c.fillRect(x,411,7,53);c.fillRect(x-14,428,34,7);c.fillStyle='#a18a5d';c.fillRect(x-6,412,20,18);c.fillStyle='#c0ae7b';c.fillRect(x-2,417,12,8);}
 // Outbound gates frame future destinations.
 for(const x of [350,1300]){c.fillStyle='#5b483a';c.fillRect(x-50,710,11,88);c.fillRect(x+40,710,11,88);c.fillRect(x-65,707,130,10);c.fillStyle='#9e7957';c.fillRect(x-69,697,138,10);c.fillRect(x-52,731,104,6);}
 for(const [x,y] of [[155,430],[450,430],[630,360],[970,360],[1150,530],[1400,530],[300,790],[400,790],[1250,790],[1350,790]])lantern(c,x,y);
 // Wisteria and cedars border the destination paths rather than creating tight lanes.
 for(const [x,y] of [[90,380],[490,370],[1080,350],[1490,420],[150,740],[540,950],[850,980],[1480,890],[85,970],[1540,620]])tree(c,x,y,true);

 c.fillStyle='rgba(235,218,166,.06)';c.fillRect(0,0,1600,1080);
}
export function paintRoom(c:C){c.imageSmoothingEnabled=false;c.fillStyle='#111e24';c.fillRect(0,0,1000,620);c.fillStyle='#716b50';c.fillRect(190,125,620,430);c.fillStyle='#b6b08a';c.fillRect(210,245,580,300);for(let y=250;y<545;y+=72)for(let x=215;x<785;x+=142){c.fillStyle='#a19f78';c.fillRect(x,y,Math.min(134,785-x),Math.min(65,545-y));c.fillStyle='#777e60';c.fillRect(x,y,Math.min(134,785-x),3);c.fillRect(x,y,3,Math.min(65,545-y));}
 c.fillStyle='#dad0aa';c.fillRect(210,145,580,100);for(let x=220;x<790;x+=95){c.fillStyle='#81795c';c.fillRect(x,145,5,100);c.fillRect(x,180,90,3);}c.fillStyle='#4b4d3e';c.fillRect(190,125,620,18);c.fillRect(190,125,20,430);c.fillRect(790,125,20,430);
 // Folded bedding, journal desk and sword rack are deliberately separated from the exit.
 c.fillStyle='#686b56';c.fillRect(390,265,145,150);c.fillStyle='#d8d0ad';c.fillRect(400,275,125,130);c.fillStyle='#62717a';c.fillRect(400,317,125,85);c.fillStyle='#8d9a98';c.fillRect(405,326,115,4);c.fillStyle='#e6ddc0';c.fillRect(415,285,95,25);
 c.fillStyle='#604f3a';c.fillRect(620,220,135,65);c.fillStyle='#937653';c.fillRect(613,215,149,48);c.fillStyle='#d8cba4';c.fillRect(654,228,46,24);c.fillStyle='#514a38';c.fillRect(676,228,2,24);c.fillStyle='#a3936d';c.fillRect(662,234,10,2);c.fillRect(683,234,11,2);c.fillStyle='#2b3436';c.fillRect(721,231,11,11);
 c.fillStyle='#574b39';c.fillRect(270,227,8,41);c.fillRect(345,227,8,41);c.fillRect(262,242,100,7);c.fillStyle='#bfc5b6';c.fillRect(281,231,52,3);c.fillStyle='#323a3c';c.fillRect(330,229,19,7);
 c.fillStyle='#515b4d';c.fillRect(440,544,120,14);c.fillStyle='#ac9570';c.fillRect(465,545,70,4);
 // Woven tatami, stitching and worn wood add scale without filling the walking floor.
 for(let yy=253;yy<540;yy+=4)for(let xx=218;xx<780;xx+=12){c.fillStyle=(xx+yy)%5?'#aaa77d':'#b8b18a';c.fillRect(xx,yy,8,1);}
 // Redraw furniture details above the floor weave.
 c.fillStyle='#d3c7a3';c.fillRect(400,276,125,126);c.fillStyle='#5e7380';c.fillRect(400,317,125,85);for(let yy=324;yy<399;yy+=9){c.fillStyle='#718891';c.fillRect(406,yy,113,1);}c.fillStyle='#9babb0';c.fillRect(405,320,115,3);c.fillStyle='#ede1be';c.fillRect(414,284,97,25);c.fillStyle='#baaf91';c.fillRect(414,307,97,2);
 for(let xx=622;xx<752;xx+=8){c.fillStyle='#806441';c.fillRect(xx,216,1,45);}c.fillStyle='#e4d8b6';c.fillRect(654,228,46,24);c.fillStyle='#8e8466';c.fillRect(676,228,2,24);for(let j=0;j<3;j++){c.fillStyle='#a89c78';c.fillRect(659,233+j*5,13,1);c.fillRect(681,233+j*5,14,1);}c.fillStyle='#2b3436';c.fillRect(721,231,11,11);c.fillStyle='#bcb393';c.fillRect(721,231,11,2);
 c.fillStyle='#b5baae';c.fillRect(422,156,155,68);c.fillStyle='#466358';c.fillRect(430,163,139,53);for(const x of [462,501,540]){c.fillStyle='#8f9779';c.fillRect(x,163,3,53);}c.fillStyle='#3c503e';c.fillRect(435,204,129,12);c.fillStyle='#a28cba';c.fillRect(437,166,7,20);c.fillRect(445,165,5,26);
}
