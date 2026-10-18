import {HUB_SIZE} from './hub-world';
type C=CanvasRenderingContext2D;
function roof(c:C,x:number,y:number,w:number){c.fillStyle='#283941';c.fillRect(x-24,y,w+48,22);c.fillRect(x-12,y-14,w+24,20);c.fillRect(x,y-26,w,18);c.fillStyle='#647477';for(let i=0;i<w+40;i+=14){c.fillRect(x-20+i,y+3,10,3);c.fillRect(x-8+i,y-11,9,2);}c.fillStyle='#172e35';c.fillRect(x-28,y+19,w+56,7);}
function house(c:C,x:number,y:number,w:number,h:number){c.fillStyle='#233b34';c.fillRect(x-13,y+33,w+26,h+12);c.fillStyle='#a49b7c';c.fillRect(x,y,w,h);c.fillStyle='#74674c';c.fillRect(x,y+35,w,7);c.fillRect(x,y+h-12,w,12);for(let i=12;i<w;i+=72){c.fillStyle='#504c3e';c.fillRect(x+i,y,7,h);c.fillStyle='#d1c5a3';c.fillRect(x+i+13,y+48,43,48);c.fillStyle='#6c7468';c.fillRect(x+i+32,y+48,3,48);c.fillRect(x+i+13,y+71,43,3);}c.fillStyle='#48483d';c.fillRect(x+w/2-24,y+65,48,h-65);c.fillStyle='#9a8a66';c.fillRect(x+w/2-2,y+68,3,h-69);c.fillStyle='#7c806a';c.fillRect(x-12,y+h,w+24,14);roof(c,x,y,w);}
function tree(c:C,x:number,y:number,wisteria=false){c.fillStyle='#263d30';c.fillRect(x-13,y+13,34,9);c.fillStyle='#4b4936';c.fillRect(x-5,y-60,11,80);c.fillStyle='#736348';c.fillRect(x-4,y-58,3,68);for(let i=0;i<7;i++){c.fillStyle=['#304e3a','#3d6042','#52764c'][i%3];const xx=x-52+(i%3)*30,yy=y-95+Math.floor(i/3)*17;c.fillRect(xx,yy,58,28);c.fillRect(xx+8,yy-6,42,8);}if(wisteria)for(let i=0;i<21;i++){c.fillStyle=['#81769e','#ab94bb','#c3add0'][i%3];c.fillRect(x-55+i*5,y-61,4,13+(i%6)*5);}}
function lantern(c:C,x:number,y:number){c.fillStyle='#434b41';c.fillRect(x-7,y-8,14,21);c.fillRect(x-13,y+10,26,6);c.fillRect(x-4,y-23,8,18);c.fillStyle='#b1a783';c.fillRect(x-11,y-42,22,20);c.fillStyle='#e8cf94';c.fillRect(x-6,y-38,12,12);c.fillStyle='#546156';c.fillRect(x-16,y-47,32,6);c.fillRect(x-10,y-53,20,7);}
export function paintHeadquarters(c:C){let n=64;const r=()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};c.imageSmoothingEnabled=false;c.fillStyle='#36523d';c.fillRect(0,0,HUB_SIZE.width,HUB_SIZE.height);
 for(let i=0;i<17000;i++){const x=Math.floor(r()*1600/3)*3,y=Math.floor(r()*1080/3)*3;c.fillStyle=['#416047','#496a48','#304c38','#56734a'][i%4];c.fillRect(x,y,3,3);}
 // Broad gravel courtyard and connected walks leave room to explore between buildings.
 c.fillStyle='#88876d';c.fillRect(210,410,1200,220);c.fillRect(470,350,570,480);c.fillRect(270,590,190,300);c.fillRect(1160,590,260,300);c.fillRect(350,760,980,120);
 c.fillStyle='#73795f';c.fillRect(215,625,1190,8);c.fillRect(470,825,570,8);
 for(let i=0;i<6400;i++){const x=Math.floor(r()*1600/4)*4,y=Math.floor(r()*1080/4)*4;if((x>210&&x<1410&&y>410&&y<630)||(x>470&&x<1040&&y>350&&y<830)||(x>270&&x<460&&y>590&&y<890)||(x>1160&&x<1420&&y>590&&y<890)||(x>350&&x<1330&&y>760&&y<880)){c.fillStyle=['#a09b7b','#787e67','#919177'][i%3];c.fillRect(x,y,3+(i%2)*2,2);}}
 // Northern boundary, main residence, recruits’ quarters and storehouse.
 c.fillStyle='#666f55';c.fillRect(50,285,1500,26);c.fillStyle='#36473a';c.fillRect(45,278,1510,8);for(let x=75;x<1550;x+=70){c.fillStyle='#838a68';c.fillRect(x,288,6,20);}
 house(c,560,115,470,175);house(c,140,225,320,160);house(c,1110,230,320,155);
 c.fillStyle='#e1d4b2';c.fillRect(724,156,140,29);c.fillStyle='#524d40';c.font='14px Georgia';c.textAlign='center';c.fillText('CORPS HEADQUARTERS',794,175);
 // Stone approach, crow perch and notice board.
 for(let y=315;y<425;y+=26){c.fillStyle='#9f9f87';c.fillRect(742,y,125,20);c.fillStyle='#b4b196';c.fillRect(748,y,113,3);}
 c.fillStyle='#544936';c.fillRect(855,356,6,60);c.fillRect(925,356,6,60);c.fillStyle='#79664a';c.fillRect(848,340,90,60);c.fillStyle='#c9bd94';c.fillRect(855,348,76,42);c.fillStyle='#746d52';for(let i=0;i<4;i++)c.fillRect(864,356+i*7,55-i*6,2);roof(c,853,329,80);
 c.fillStyle='#554e3b';c.fillRect(805,370,7,55);c.fillRect(790,368,39,6);c.fillStyle='#1b2931';c.fillRect(798,349,23,17);c.fillRect(790,340,13,16);c.fillRect(815,359,16,7);c.fillStyle='#50606a';c.fillRect(803,351,14,3);c.fillStyle='#d2b875';c.fillRect(786,347,7,3);c.fillStyle='#e2d2ae';c.fillRect(794,345,2,2);
 // Quiet garden pond with stepping stones around, never across, its collision.
 c.fillStyle='#5d6d58';c.beginPath();c.ellipse(1050,720,137,97,0,0,Math.PI*2);c.fill();c.fillStyle='#385f62';c.beginPath();c.ellipse(1050,720,123,83,0,0,Math.PI*2);c.fill();c.strokeStyle='#8aa69a';c.lineWidth=2;for(let i=0;i<7;i++){c.beginPath();c.ellipse(1020+i*9,700+i*6,32+i*6,4,0,0,Math.PI*2);c.stroke();}c.fillStyle='#76906a';c.fillRect(1000,750,24,8);c.fillRect(1080,685,19,7);c.fillStyle='#e0c0bc';c.fillRect(1007,747,6,5);
 // Wooden training targets stand beyond the generous practice approach.
 c.fillStyle='#786f50';c.fillRect(1190,420,165,44);for(const x of [1210,1270,1330]){c.fillStyle='#61513c';c.fillRect(x,411,7,53);c.fillRect(x-14,428,34,7);c.fillStyle='#a18a5d';c.fillRect(x-6,412,20,18);c.fillStyle='#c0ae7b';c.fillRect(x-2,417,12,8);}
 // Outbound gates frame future destinations.
 for(const x of [350,1300]){c.fillStyle='#5b483a';c.fillRect(x-50,710,11,88);c.fillRect(x+40,710,11,88);c.fillRect(x-65,707,130,10);c.fillStyle='#9e7957';c.fillRect(x-69,697,138,10);c.fillRect(x-52,731,104,6);}
 for(const [x,y] of [[155,430],[450,430],[630,360],[970,360],[1150,530],[1400,530],[300,790],[400,790],[1250,790],[1350,790]])lantern(c,x,y);
 // Wisteria and cedars border the destination paths rather than creating tight lanes.
 for(const [x,y] of [[90,380],[490,370],[1080,350],[1490,420],[150,740],[540,950],[850,980],[1480,890],[85,970],[1540,620]])tree(c,x,y,true);
 for(let x=70;x<1550;x+=95)tree(c,x,200+(x%3)*12,x%2===0);
 c.fillStyle='rgba(235,218,166,.06)';c.fillRect(0,0,1600,1080);
}
export function paintRoom(c:C){c.imageSmoothingEnabled=false;c.fillStyle='#111e24';c.fillRect(0,0,1000,620);c.fillStyle='#716b50';c.fillRect(190,125,620,430);c.fillStyle='#b6b08a';c.fillRect(210,245,580,300);for(let y=250;y<545;y+=72)for(let x=215;x<785;x+=142){c.fillStyle='#a19f78';c.fillRect(x,y,Math.min(134,785-x),Math.min(65,545-y));c.fillStyle='#777e60';c.fillRect(x,y,Math.min(134,785-x),3);c.fillRect(x,y,3,Math.min(65,545-y));}
 c.fillStyle='#dad0aa';c.fillRect(210,145,580,100);for(let x=220;x<790;x+=95){c.fillStyle='#81795c';c.fillRect(x,145,5,100);c.fillRect(x,180,90,3);}c.fillStyle='#4b4d3e';c.fillRect(190,125,620,18);c.fillRect(190,125,20,430);c.fillRect(790,125,20,430);
 // Folded bedding, journal desk and sword rack are deliberately separated from the exit.
 c.fillStyle='#686b56';c.fillRect(390,265,145,150);c.fillStyle='#d8d0ad';c.fillRect(400,275,125,130);c.fillStyle='#62717a';c.fillRect(400,317,125,85);c.fillStyle='#8d9a98';c.fillRect(405,326,115,4);c.fillStyle='#e6ddc0';c.fillRect(415,285,95,25);
 c.fillStyle='#604f3a';c.fillRect(620,220,135,65);c.fillStyle='#937653';c.fillRect(613,215,149,48);c.fillStyle='#d8cba4';c.fillRect(654,228,46,24);c.fillStyle='#514a38';c.fillRect(676,228,2,24);c.fillStyle='#a3936d';c.fillRect(662,234,10,2);c.fillRect(683,234,11,2);c.fillStyle='#2b3436';c.fillRect(721,231,11,11);
 c.fillStyle='#574b39';c.fillRect(270,227,8,41);c.fillRect(345,227,8,41);c.fillRect(262,242,100,7);c.fillStyle='#bfc5b6';c.fillRect(281,231,52,3);c.fillStyle='#323a3c';c.fillRect(330,229,19,7);
 c.fillStyle='#515b4d';c.fillRect(440,544,120,14);c.fillStyle='#ac9570';c.fillRect(465,545,70,4);
 c.fillStyle='#b5baae';c.fillRect(422,156,155,68);c.fillStyle='#466358';c.fillRect(430,163,139,53);for(const x of [462,501,540]){c.fillStyle='#8f9779';c.fillRect(x,163,3,53);}c.fillStyle='#3c503e';c.fillRect(435,204,129,12);c.fillStyle='#a28cba';c.fillRect(437,166,7,20);c.fillRect(445,165,5,26);
}
