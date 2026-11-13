
(function(){
const $=id=>document.getElementById(id);
const ICONS={"coffee": "<path d=\"M4 4h16v2H4zm0 2h2v8H4zm2 8h10v2H6zm14-8h2v4h-2zm-2 4h2v2h-2zm-2-4h2v8h-2zM2 18h18v2H2z\"/>", "message-text": "<path d=\"M20 2H4v2h16zm0 14H6v2h14zm2-12h-2v12h2zM4 4H2v18h2zm2 14H4v2h2zm0-6h4v2H6zm0-4h8v2H6z\"/>", "contact": "<path d=\"M2 2h20v2H2zM0 4h2v16H0zm22 0h2v16h-2zM2 20h20v2H2zM14 7h6v2h-6zm0 4h6v2h-6zm0 4h4v2h-4zM6 7h4v4H6zm0 6h4v2H6zm4 2h2v2h-2zm-6 0h2v2H4z\"/>", "script": "<path d=\"M16 19h2v2H4v-2h10v-2h2v2ZM6 15h8v2H4v2H2v-4h2V5h2v10ZM20 5h2v6h-2v8h-2V5H6V3h14v2Z\"/>", "user-plus": "<path d=\"M9 2h6v2H9zm0 8h6v2H9zm6-6h2v6h-2zM7 4h2v6H7zM4 18h2v4H4zm14 0h2v4h-2zM8 14h8v2H8zm-2 2h2v2H6z\"/> <path d=\"M18 16h2v6h-2z\"/> <path d=\"M16 18h6v2h-6z\"/>", "users": "<path d=\"M5 2h6v2H5zm10 0h4v2h-4zM5 10h6v2H5zm10 0h4v2h-4zm4-6h2v6h-2zm-8 0h2v6h-2zM3 4h2v6H3zM0 18h2v4H0zm14 0h2v4h-2zm8 0h2v4h-2zM4 14h8v2H4zm12 0h4v2h-4zM2 16h2v2H2zm10 0h2v2h-2zm8 0h2v2h-2z\"/>", "coins": "<path d=\"M6 2h6v2H6zM4 4h2v2H4zm8 0h2v2h-2zm-8 8h2v2H4zm8 0h2v2h-2zm-6 2h6v2H6zM2 6h2v6H2zm12 0h2v6h-2z\"/> <path d=\"M14 8h4v2h-4zm-4 10h2v2h-2zm8-8h2v2h-2zm-6 10h2v2h-2zm6-2h2v2h-2z\"/> <path d=\"M12 20h6v2h-6zm-4-6h2v4H8zm12-2h2v6h-2zM7 6h4v2H7z\"/> <path d=\"M9 6h2v6H9zm6 8h2v4h-2zm-1-2h3v2h-3z\"/>", "trophy": "<path d=\"M16 17H13V19H15V21H9V19H11V17H8V15H16V17ZM18 5H22V11H20V7H18V11H20V13H18V15H16V5H8V15H6V13H4V11H6V7H4V11H2V5H6V3H18V5Z\"/>", "zap": "<path d=\"M4 13h8v6h2v2h-2v2h-2v-8H2v-4h2v2Zm12 6h-2v-2h2v2Zm2-2h-2v-2h2v2Zm2-2h-2v-2h2v2Zm-6-6h8v4h-2v-2h-8V5h-2V3h2V1h2v8Zm-8 2H4V9h2v2Zm2-2H6V7h2v2Zm2-2H8V5h2v2Z\"/>", "teach": "<path d=\"M3 2h4v4H3zM2 8h12v2H2zm7-4h11v2H9zm1 10h10v2H10z\"/> <path d=\"M2 9h6v7H2zm0 7h2v4H2zm4 0h2v4H6zM20 6h2v8h-2z\"/>"};
ICONS.billboard='<path d="M2 2h20v2H2zm0 2h2v10H2zm18 0h2v10h-2zM2 14h20v2H2zm9 2h2v4h-2zm-4 4h10v2H7zM6 6h4v4H6zm6 0h6v2h-6zm0 4h6v2h-6z"/>';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function ico(n,px,col){return '<svg class="ic" width="'+px+'" height="'+px+'" viewBox="0 0 24 24" fill="'+(col||'currentColor')+'" shape-rendering="crispEdges">'+ICONS[n]+'</svg>';}
document.querySelectorAll('[data-ic]').forEach(e=>{e.innerHTML=ico(e.dataset.ic,+e.dataset.s||16)+e.innerHTML;});
const EXC=new Image();EXC.src='assets/ui/exclamation.png';
const FONT="'Pixelify Sans',Verdana,sans-serif";

const cv=$('c'),ctx=cv.getContext('2d');
let W=0,H=0,DPR=1;
function resize(){DPR=Math.min(2,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;}
addEventListener('resize',resize);resize();

const WORLD={w:1800,h:1300},S=3,LW=600,LH=434;
let seed=7;function sr(){seed=(seed*16807)%2147483647;return seed/2147483647;}
const R=(a,b)=>a+Math.random()*(b-a);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function hash(x,y){let n=Math.imul(x,374761393)+Math.imul(y,668265263);n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;}
function vnoise(x,y){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,a=hash(xi,yi),b=hash(xi+1,yi),c=hash(xi,yi+1),d=hash(xi+1,yi+1),u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v;}
function rgb(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
function shade(h,a){const c=rgb(h);return'#'+c.map(v=>clamp(Math.round(v+a),0,255).toString(16).padStart(2,'0')).join('');}
function mkCanvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}

// ---------- world layout ----------
const buildings=[
 {x:250,y:190,w:210,h:130,name:'Kaviareň U Makléra',roof:'#b5532f',wall:'#e6d2a8',cafe:true},
 {x:1240,y:800,w:240,h:150,name:'Kancelária',roof:'#56708c',wall:'#c9d3dc',office:true},
 {x:820,y:230,w:150,h:110,name:'',roof:'#9a8a3e',wall:'#e2c9a0'},
 {x:1380,y:260,w:160,h:120,name:'',roof:'#8a4468',wall:'#ead7c0'},
 {x:330,y:860,w:170,h:120,name:'',roof:'#3f8573',wall:'#dfd3b6'},
 {x:800,y:950,w:190,h:130,name:'Akadémia',roof:'#6a4a9a',wall:'#efe6d0',acad:true}
];
const cafe=buildings[0];
const cafeDoor={x:cafe.x+cafe.w/2,y:cafe.y+cafe.h+26};
const acad=buildings[5],acadDoor={x:acad.x+acad.w/2,y:acad.y+acad.h+26};
const office=buildings[1],officeDoor={x:office.x+office.w/2,y:office.y+office.h+26};
const pond={x:1090,y:470,rx:110,ry:70};
function inBuilding(x,y,pad){for(const b of buildings){if(x>b.x-pad&&x<b.x+b.w+pad&&y>b.y-pad&&y<b.y+b.h+pad)return b;}return null;}
function inPond(x,y,pad){const dx=(x-pond.x)/(pond.rx+pad),dy=(y-pond.y)/(pond.ry+pad);return dx*dx+dy*dy<1;}
function pushOut(e,r){
  const b=inBuilding(e.x,e.y,r);
  if(b){const l=e.x-(b.x-r),rr=(b.x+b.w+r)-e.x,t=e.y-(b.y-r),bt=(b.y+b.h+r)-e.y,m=Math.min(l,rr,t,bt);
    if(m===l)e.x=b.x-r;else if(m===rr)e.x=b.x+b.w+r;else if(m===t)e.y=b.y-r;else e.y=b.y+b.h+r;}
  if(inPond(e.x,e.y,r)){const a=Math.atan2((e.y-pond.y)/(pond.ry+r),(e.x-pond.x)/(pond.rx+r));e.x=pond.x+Math.cos(a)*(pond.rx+r);e.y=pond.y+Math.sin(a)*(pond.ry+r);}
  e.x=clamp(e.x,30,WORLD.w-30);e.y=clamp(e.y,40,WORLD.h-30);
}
function freeSpot(){for(let i=0;i<50;i++){const x=R(80,WORLD.w-80),y=R(90,WORLD.h-80);if(!inBuilding(x,y,40)&&!inPond(x,y,40))return{x,y};}return{x:900,y:700};}

// ---------- pixel-art ground (rendered at 1/3 scale, drawn ×3 without smoothing) ----------
const ground=mkCanvas(LW,LH),kind=new Uint8Array(LW*LH);
(function(){
  const g=ground.getContext('2d');
  const m=mkCanvas(LW,LH),mg=m.getContext('2d');mg.lineCap='round';mg.lineJoin='round';mg.lineWidth=15;mg.strokeStyle='#000';
  const paths=[[[cafeDoor.x,cafeDoor.y-10],[355,620],[900,640],[1360,640],[1360,800]],[[900,340],[900,640],[895,960]],[[355,620],[415,860]],[[1360,640],[1460,380]],[[0,640],[355,620]],[[1360,640],[1800,620]]];
  for(const p of paths){mg.beginPath();mg.moveTo(p[0][0]/S,p[0][1]/S);for(let i=1;i<p.length;i++)mg.lineTo(p[i][0]/S,p[i][1]/S);mg.stroke();}
  const md=mg.getImageData(0,0,LW,LH).data,id=g.createImageData(LW,LH),d=id.data;
  const G=['#488838','#539640','#5fa447','#3e7a32'].map(rgb),PT=['#c9b07a','#b89c66','#dcc692','#8f7a4d'].map(rgb),WT=['#3478b0','#3f8fc4','#6fb6dc','#d8c48a','#bfa970'].map(rgb);
  const isPath=(x,y)=>x>=0&&y>=0&&x<LW&&y<LH&&md[(y*LW+x)*4+3]>110;
  for(let y=0;y<LH;y++)for(let x=0;x<LW;x++){
    const i=y*LW+x;let c;
    const ex=(x-pond.x/S)/(pond.rx/S),ey=(y-pond.y/S)/(pond.ry/S),pv=ex*ex+ey*ey+(vnoise(x/7,y/7)-.5)*.22;
    if(pv<1.02){kind[i]=2;c=pv<.55?WT[0]:pv<.9?WT[1]:WT[2];if(pv<.9&&hash(x>>1,y)>.965)c=WT[2];}
    else if(pv<1.2){kind[i]=2;c=hash(x,y)>.8?WT[4]:WT[3];}
    else if(isPath(x,y)){kind[i]=1;const h=hash(x,y);c=(!isPath(x-1,y)||!isPath(x+1,y)||!isPath(x,y-1)||!isPath(x,y+1))?PT[3]:h<.12?PT[1]:h>.93?PT[2]:PT[0];}
    else{const n=vnoise(x/16,y/16)*.6+vnoise(x/5,y/5)*.4;c=n<.42?G[0]:n<.6?G[1]:G[2];if(hash(x,y)<.035)c=G[3];}
    d[i*4]=c[0];d[i*4+1]=c[1];d[i*4+2]=c[2];d[i*4+3]=255;
  }
  g.putImageData(id,0,0);
  const P=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
  const grassAt=(x,y)=>x>2&&y>2&&x<LW-3&&y<LH-3&&kind[y*LW+x]===0&&!inBuilding(x*S,y*S,12);
  for(let i=0;i<520;i++){const x=sr()*LW|0,y=sr()*LH|0;if(!grassAt(x,y))continue;P(x,y,1,2,'#2f6a2a');P(x+2,y,1,2,'#2f6a2a');P(x+1,y+1,1,1,'#6fb651');}
  const FC=['#ffe066','#ff8fa3','#ffffff','#c9a0ff'];
  for(let i=0;i<220;i++){const x=sr()*LW|0,y=sr()*LH|0;if(!grassAt(x,y))continue;P(x,y+1,1,1,'#2f6a2a');P(x,y,1,1,FC[i%4]);if(i%3===0){P(x-1,y,1,1,FC[i%4]);P(x+1,y,1,1,FC[i%4]);P(x,y-1,1,1,FC[i%4]);P(x,y,1,1,'#ffb000');}}
  for(let i=0;i<40;i++){const x=sr()*LW|0,y=sr()*LH|0;if(!grassAt(x,y))continue;P(x,y,3,2,'#9a9a94');P(x,y,2,1,'#c4c4bc');}
  // buildings (3/4 view: roof on top, facade below)
  for(const b of buildings){
    const x=Math.round(b.x/S),y=Math.round(b.y/S),w=Math.round(b.w/S),h=Math.round(b.h/S),rh=Math.round(h*.6);
    P(x+3,y+4,w+1,h,'rgba(0,0,0,.28)');
    P(x,y+rh,w,h-rh,b.wall);P(x,y+rh,w,2,shade(b.wall,-40));P(x,y+h-2,w,2,shade(b.wall,-50));
    for(let i=0;i<w;i+=6)P(x+i,y+rh+2,1,h-rh-4,shade(b.wall,-10));
    const dx=x+(w>>1)-4;
    for(let wx=x+4;wx<x+w-9;wx+=(b.office?9:12)){
      if(wx+7>dx-3&&wx<dx+11)continue;
      P(wx,y+rh+4,7,8,'#3a2a1c');P(wx+1,y+rh+5,5,6,b.office?'#6fc0e8':'#8fd0f0');P(wx+1,y+rh+5,2,2,'#e4f7ff');P(wx+3,y+rh+5,1,6,'#3a2a1c');
      if(!b.office){P(wx-1,y+rh+12,9,1,shade(b.wall,-60));P(wx,y+rh+12,2,1,'#e0556a');P(wx+4,y+rh+12,2,1,'#ffd24a');}
    }
    P(dx-1,y+h-13,10,13,'#2a1a0c');P(dx,y+h-12,8,12,b.office?'#4a6a88':'#8a5426');P(dx+1,y+h-11,6,4,b.office?'#9fd6f0':'#a86a34');P(dx+6,y+h-6,1,1,'#ffd24a');
    P(dx-2,y+h,12,2,'#9a8a6a');
    P(x-1,y,w+2,rh,b.roof);
    if(b.office){for(let i=3;i<w-2;i+=10)P(x+i,y+3,1,rh-6,shade(b.roof,-14));P(x+6,y+5,9,6,'#8a96a0');P(x+7,y+6,7,4,'#5a646c');P(x+w-18,y+8,10,7,'#8a96a0');P(x+w-17,y+9,8,5,'#5a646c');}
    else{for(let ry=y+4,k=0;ry<y+rh-1;ry+=4,k++){P(x-1,ry,w+2,1,shade(b.roof,-26));for(let rx=x+(k%2?1:4);rx<x+w;rx+=7)P(rx,ry-3,1,3,shade(b.roof,-18));}
      P(x+w-14,y+3,6,8,'#7a5a4a');P(x+w-14,y+3,6,2,'#4a362c');P(x+w-13,y+5,1,5,'#9a7a68');}
    P(x-1,y,w+2,2,shade(b.roof,34));P(x-1,y+rh-2,w+2,2,shade(b.roof,-55));
    P(x-2,y-1,w+4,1,'#1a1410');P(x-2,y-1,1,rh+1,'#1a1410');P(x+w+1,y-1,1,rh+1,'#1a1410');P(x-1,y+rh,1,h-rh,'#1a1410');P(x+w,y+rh,1,h-rh,'#1a1410');P(x-1,y+h,w+2,1,'#1a1410');
    if(b.acad){for(let i=3;i<w-3;i+=8){if(x+i+3>dx-2&&x+i<dx+10)continue;P(x+i,y+rh+2,3,h-rh-4,'#fffaf0');P(x+i+2,y+rh+2,1,h-rh-4,'#cfc6b0');}P(x,y+rh,w,3,'#ffd24a');P(x,y+rh+3,w,1,'#a8801c');P(x+(w>>1)-1,y-10,1,13,'#3a3f48');P(x+(w>>1),y-10,7,4,'#ffd24a');P(x+(w>>1),y-9,7,1,'#d43c3c');}
    if(b.cafe){for(let i=0;i<w;i+=4)P(x+i,y+rh,Math.min(4,w-i),4,(i/4)%2?'#f4efe0':'#d43c3c');for(let i=0;i<w;i+=4)P(x+i,y+rh+4,Math.min(4,w-i),1,(i/4)%2?'#c9c3b2':'#9a2424');}
  }
})();

// ---------- sprites ----------
function outline(c){const g=c.getContext('2d'),id=g.getImageData(0,0,c.width,c.height),d=id.data,o=new Uint8ClampedArray(d),w=c.width,h=c.height;
  const a=(x,y)=>x>=0&&y>=0&&x<w&&y<h&&d[(y*w+x)*4+3]>0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(!a(x,y)&&(a(x-1,y)||a(x+1,y)||a(x,y-1)||a(x,y+1))){const i=(y*w+x)*4;o[i]=26;o[i+1]=20;o[i+2]=16;o[i+3]=255;}
  id.data.set(o);g.putImageData(id,0,0);return c;}
const FW=16,FH=20,sheets=new Map();
function sheet(L){
  const key=JSON.stringify(L);if(sheets.has(key))return sheets.get(key);
  const c=mkCanvas(FW*3,FH*3),g=c.getContext('2d');
  for(let d=0;d<3;d++)for(let f=0;f<3;f++){
    const ox=f*FW+2,oy=d*FH+2,px=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(ox+x,oy+y,w,h);};
    const sh=L.shoes||'#2a2018',dk=shade(L.top,-28);
    if(d<2){
      const lL=f===1?2:3,lR=f===2?2:3;
      px(3,12,3,lL,L.pants);px(6,12,3,lR,L.pants);px(3,12+lL,3,1,sh);px(6,12+lR,3,1,sh);
      if(L.skirt){px(2,11,8,3,L.pants);}
      px(2,7,8,5,L.top);
      const a=f===1?1:0,b=f===2?1:0;
      px(1,7+a,1,4,dk);px(10,7+b,1,4,dk);px(1,11+a,1,1,L.skin);px(10,11+b,1,1,L.skin);
      if(d===0){
        if(L.tie){px(4,7,4,2,'#f4f4f4');px(5,7,2,4,L.tie);}
        if(L.hood){px(3,7,6,1,dk);px(4,10,4,1,dk);px(5,8,1,2,'#f4f4f4');px(6,8,1,2,'#f4f4f4');}
        if(L.cardigan){px(5,7,2,5,'#f4ead0');px(5,9,1,1,dk);px(5,11,1,1,dk);}
      }
      if(L.case)px(10,11+b,3,3,'#8a5426'),px(11,10+b,1,1,'#3a2414');
      // head
      px(3,1,6,6,L.skin);
      if(d===0){
        px(4,4,1,1,'#222');px(7,4,1,1,'#222');
        if(L.brows){px(4,3,1,1,'#333');px(7,3,1,1,'#333');px(5,6,2,1,'#7a5a48');}
        if(L.glasses)px(3,4,6,1,'#111');
        if(L.style!=='bald'){px(3,0,6,2,L.hair);px(2,1,1,3,L.hair);px(9,1,1,3,L.hair);}
        if(L.style==='long'){px(2,1,1,7,L.hair);px(9,1,1,7,L.hair);}
        if(L.style==='cap'){px(3,0,6,2,L.hat);px(2,2,8,1,shade(L.hat,-40));}
      }else{
        if(L.style!=='bald'){px(3,0,6,5,L.hair);px(2,1,1,4,L.hair);px(9,1,1,4,L.hair);}else px(3,5,6,1,shade(L.skin,-20));
        if(L.style==='long'){px(2,1,8,7,L.hair);}
        if(L.style==='cap'){px(3,0,6,3,L.hat);}
      }
      if(L.style==='bun')px(5,-1,2,1,L.hair);
    }else{
      if(f===0){px(4,12,4,3,L.pants);px(4,15,5,1,sh);}
      else if(f===1){px(2,12,3,3,L.pants);px(7,12,3,2,L.pants);px(2,15,3,1,sh);px(8,14,3,1,sh);}
      else{px(4,12,2,3,L.pants);px(6,12,2,2,L.pants);px(4,15,3,1,sh);px(6,14,3,1,sh);}
      if(L.skirt)px(3,11,6,3,L.pants);
      px(3,7,6,5,L.top);
      const sw=f===1?1:f===2?-1:0;
      px(5+sw,8,2,3,dk);px(5+sw,11,2,1,L.skin);
      if(L.tie)px(8,7,1,3,'#f4f4f4');
      if(L.case)px(5+sw,12,4,3,'#8a5426');
      px(3,1,6,6,L.skin);px(7,4,1,1,'#222');
      if(L.glasses)px(6,4,3,1,'#111');
      if(L.style!=='bald'){px(3,0,6,2,L.hair);px(2,1,3,4,L.hair);}
      if(L.style==='long')px(2,1,3,7,L.hair);
      if(L.style==='cap'){px(3,0,6,2,L.hat);px(8,2,3,1,shade(L.hat,-40));}
      if(L.style==='bun')px(2,0,2,2,L.hair);
    }
  }
  outline(c);sheets.set(key,c);return c;
}
function drawChar(e,alpha,scale){
  const sc=scale||S,sh=sheet(e.look),d=e.dir==='d'?0:e.dir==='u'?1:2,f=e.mv?1+(Math.floor(e.wt*7)%2):0;
  ctx.globalAlpha=(alpha==null?1:alpha)*.28;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(e.x,e.y+4,5*sc,2*sc,0,0,7);ctx.fill();
  ctx.globalAlpha=alpha==null?1:alpha;
  const dw=FW*sc,dh=FH*sc;
  if(e.dir==='l'){ctx.save();ctx.translate(e.x,0);ctx.scale(-1,1);ctx.drawImage(sh,f*FW,d*FH,FW,FH,-7.5*sc,e.y+4-18*sc,dw,dh);ctx.restore();}
  else ctx.drawImage(sh,f*FW,d*FH,FW,FH,e.x-7.5*sc,e.y+4-18*sc,dw,dh);
  ctx.globalAlpha=1;
}
function anim(e,dt){const dx=e.x-(e._x==null?e.x:e._x),dy=e.y-(e._y==null?e.y:e._y);e._x=e.x;e._y=e.y;
  if(Math.abs(dx)+Math.abs(dy)>.05){e.mv=true;e.wt=(e.wt||0)+dt;e.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'r':'l'):(dy>0?'d':'u');}else e.mv=false;}
function portrait(cvs,look){const g=cvs.getContext('2d');g.clearRect(0,0,12,12);g.imageSmoothingEnabled=false;g.drawImage(sheet(look),2,1,12,12,0,0,12,12);}

// prop sprites
function mkTree(v){const c=mkCanvas(22,28),g=c.getContext('2d'),P=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h);};
  P(9,17,4,9,'#6b4a2b');P(9,17,1,9,'#8a6238');P(12,17,1,9,'#4a321c');P(8,25,6,1,'#4a321c');
  const cols=v===2?['#1f4f3a','#2a6648','#38805a','#4a9a6c']:v===1?['#2c5c22','#3c7a2a','#52973a','#6fb44c']:['#2a5e28','#35762f','#44903a','#5aa848'];
  const cx=11,cy=10,r=9.3;
  for(let y=0;y<20;y++)for(let x=1;x<21;x++){const dx=x-cx+.5,dy=(y-cy+.5)*1.08,dd=Math.hypot(dx,dy);if(dd>r+(hash(x+v*31,y)-.5)*1.6)continue;
    let l=(-dx*.55-dy*.75)/r+(hash(x*3+v,y*7)-.5)*.55;P(x,y,1,1,cols[l<-.35?0:l<.05?1:l<.5?2:3]);}
  return outline(c);}
const treeSpr=[mkTree(0),mkTree(1),mkTree(2)];
function mkProp(w,h,fn){const c=mkCanvas(w,h),g=c.getContext('2d');fn((x,y,ww,hh,col)=>{g.fillStyle=col;g.fillRect(x,y,ww,hh);});return outline(c);}
const SPR={
 lamp:mkProp(8,24,P=>{P(3,7,2,15,'#3a3f48');P(4,7,1,15,'#5a606c');P(2,21,4,2,'#2a2e36');P(1,2,6,5,'#3a3f48');P(2,3,4,3,'#ffe9a0');P(2,3,2,1,'#fff8d8');P(2,1,4,1,'#3a3f48');}),
 bench:mkProp(18,11,P=>{P(1,1,16,2,'#a8743a');P(1,4,16,2,'#8a5a28');P(1,1,16,1,'#c48a48');P(2,6,2,4,'#3a3f48');P(14,6,2,4,'#3a3f48');P(1,6,16,1,'#6a4420');}),
 bush:mkProp(14,11,P=>{for(let y=1;y<10;y++)for(let x=1;x<13;x++){const dx=(x-6.5)/6,dy=(y-5.5)/4.4;if(dx*dx+dy*dy<1)P(x,y,1,1,(dy<-.2&&dx<.3)?'#5aa848':dy>.45?'#2a5e28':'#3d8436');}P(4,3,1,1,'#ff8fa3');P(9,5,1,1,'#ff8fa3');P(6,7,1,1,'#ffe066');}),
 table:mkProp(14,14,P=>{P(1,1,12,7,'#f4efe0');P(1,7,12,1,'#c9c3b2');P(6,8,2,4,'#5a606c');P(4,12,6,1,'#3a3f48');P(3,3,3,2,'#fff');P(4,2,1,1,'#fff');P(3,3,2,1,'#6b3f1c');P(9,4,2,2,'#d43c3c');}),
 sign:mkProp(12,14,P=>{P(5,6,2,7,'#6b4a2b');P(1,1,10,6,'#c48a48');P(2,2,8,4,'#f4e2b0');P(3,3,2,1,'#6b3f1c');P(6,3,3,1,'#6b3f1c');P(3,4,5,1,'#6b3f1c');})
};
SPR.cup=mkProp(11,11,P=>{P(2,4,6,5,'#ffffff');P(2,4,6,1,'#6b3f1c');P(8,5,2,1,'#ffffff');P(9,6,1,2,'#ffffff');P(8,7,1,1,'#ffffff');P(4,1,1,2,'#e8e8e8');P(6,2,1,1,'#e8e8e8');});
SPR.star=mkProp(9,9,P=>{P(4,1,1,7,'#ffd24a');P(1,4,7,1,'#ffd24a');P(3,3,3,3,'#fff2a8');P(2,2,1,1,'#ffd24a');P(6,2,1,1,'#ffd24a');P(2,6,1,1,'#ffd24a');P(6,6,1,1,'#ffd24a');});
SPR.card=mkProp(11,8,P=>{P(1,1,9,6,'#ffffff');P(2,2,3,2,'#5ab0ff');P(6,2,3,1,'#888888');P(6,4,3,1,'#888888');P(2,5,7,1,'#bbbbbb');});
const statics=[];
function isGrass(x,y){const lx=x/S|0,ly=y/S|0;return lx>3&&ly>3&&lx<LW-3&&ly<LH-3&&kind[ly*LW+lx]===0&&!inBuilding(x,y,26);}
for(let i=0;i<90&&statics.length<44;i++){const x=50+sr()*(WORLD.w-100),y=80+sr()*(WORLD.h-120);if(isGrass(x,y)&&isGrass(x-24,y)&&isGrass(x+24,y)&&Math.hypot(x-cafeDoor.x,y-cafeDoor.y)>110)statics.push({x,y,spr:treeSpr[i%3],sh:16});}
for(let i=0;i<60;i++){const x=50+sr()*(WORLD.w-100),y=60+sr()*(WORLD.h-100);if(isGrass(x,y)&&i%3!==2)statics.push({x,y,spr:SPR.bush,sh:8});}
[[300,585],[640,592],[862,470],[1140,676],[1402,540],[938,820],[1330,720],[380,760]].forEach(p=>statics.push({x:p[0],y:p[1],spr:SPR.lamp,sh:4}));
[[1090,572],[520,662],[720,592],[1250,676]].forEach(p=>statics.push({x:p[0],y:p[1],spr:SPR.bench,sh:9}));
statics.push({x:cafe.x+34,y:cafe.y+cafe.h+34,spr:SPR.table,sh:6},{x:cafe.x+cafe.w-34,y:cafe.y+cafe.h+34,spr:SPR.table,sh:6},{x:1215,y:975,spr:SPR.sign,sh:4});

// ---------- game data ----------
const SKIN=['#f1c9a0','#e8b98c','#d9a273','#f6d7b8'],HAIR=['#5a3a1c','#2a1c12','#c98a3a','#8a4a22','#1a1a1a'];
const TYPES=[
 {t:'Dôchodkyňa',coffee:1.6,promise:.7,decay:.8,com:40,names:['pani Helena','teta Marta','pani Božena','babka Anka'],look:()=>({top:'#9a6fc0',pants:'#5a4a6a',skirt:1,cardigan:1,style:'bun',hair:pick(['#c9c9c9','#e4e4e4','#a8a8b0'])})},
 {t:'Podnikateľ',coffee:.7,promise:1.5,decay:1.5,com:120,names:['Ing. Kováč','pán Horváth','Mgr. Varga','pán Baláž'],look:()=>({top:'#444a58',pants:'#2a2d35',tie:pick(['#3a8fd0','#c9a020','#7a3ac0']),style:'short',hair:pick(HAIR)})},
 {t:'Študent',coffee:1.3,promise:1.3,decay:1,com:15,names:['Maťo','Kika','Dominik','Simča'],look:()=>({top:pick(['#e07a3f','#3fa0c0','#d0508a']),pants:'#3a5a8a',hood:1,style:pick(['cap','long','short']),hat:pick(['#c22','#2a2a2a','#2a7a3a']),hair:pick(HAIR)})},
 {t:'Skeptik',coffee:.6,promise:.55,decay:1.2,com:95,names:['pán Novák','pani Tóthová','pán Lukáč','pani Kučerová'],look:()=>({top:'#7a7468',pants:'#4a463e',brows:1,style:pick(['bald','short']),hair:'#6a6a6a'})},
 {t:'Mladá rodina',coffee:1,promise:1,decay:1,com:70,kid:1,names:['Molnárovci','Szabóovci','Nagyovci','Polákovci'],look:()=>({top:pick(['#3fa37a','#e0b03a','#d06a5a']),pants:'#3a4a6a',style:pick(['long','short']),hair:pick(HAIR)})}
];
const TITLES=['Nováčik','Tovariš zmlúv','Majster kávičiek','Barón provízií','Kráľ trhu'];
const SAY={
 coffee:['Mmm, kávička...','S mliekom? Vy ma poznáte!','No keď už ste ju doniesli...','Presso! Dobre teda, počúvam.'],
 promise:['To znie až príliš dobre...','Naozaj garantované?','A to je bez poplatkov?','Hmm, švagor vravel niečo iné.'],
 card:['Ďakujem, založím si.','Pekný papier.','Zavolám vám. Možno.'],
 sign:['Kde to mám podpísať?','Hádam to nie je pyramída.','Dobre, ale manželke to poviete vy.','Tak teda na 30 rokov...'],
 lost:['Ja si to ešte rozmyslím.','Viete čo, ozvem sa.'],
 rsign:['U nich to bolo lacnejšie.','Prepáčte, už som podpísal inde.','Ten druhý pán mal lepšie pero.']
};
const PROM=['Garantovaný výnos 12 %!','Produkt šitý vám na mieru!','Žiadne poplatky, čestné slovo!','O 30 rokov budete milionár!','Toto mám aj ja sám!'];
const SPAM=[
 ['#ffb6b6','[Obchod] Xx_Maklér_xX: WTS životná poistka, pero grátis'],
 ['#ffc864','[Všeobecný] Peter_z_cechu: Kto ide v sobotu na školenie? Motivácia +50'],
 ['#ffb6b6','[Obchod] BabkaHelena: LF agent, kávu mám doma vlastnú'],
 ['#7be05a','[Cech] Cechmajster: Kto nemá tento mesiac 3 zmluvy, kupuje kofolu'],
 ['#ffc864','[Všeobecný] Nováčik_Fero: kde sa tu farmia klienti?'],
 ['#ffc864','[Všeobecný] SkeptikJano: zase mi niekto strčil vizitku za stierač'],
 ['#7be05a','[Cech] Peter_z_cechu: kávička je najsilnejší spell, zapamätajte si to'],
 ['#ffb6b6','[Obchod] Dominik22: predám nepoužité vizitky, 500 ks']
];
const SPELLS=[
 {ic:'cup',icon:'coffee',tint:'#f4e2b0',name:'Kávička',desc:'Dones klientovi kávu. Veľa dôvery, musíš stáť pri ňom.',range:75,cast:.8,mana:0,cd:.5,coffee:true,power:30,kind:'coffee'},
 {ic:'star',icon:'message-text',tint:'#ffd24a',name:'Sľub',desc:'Sľúb hory-doly. Funguje aj z diaľky.',range:190,cast:1.4,mana:30,cd:.5,power:18,kind:'promise'},
 {ic:'card',icon:'contact',tint:'#bfe3ff',name:'Vizitka',desc:'Rýchlo, lacno, slabo.',range:190,cast:0,mana:8,cd:3,power:6,kind:'card'},
 {icon:'script',tint:'#9be07a',name:'Podpis zmluvy',desc:'Pri 100 % dôvere uzavri zmluvu.',range:80,cast:1.8,mana:0,cd:.5,sign:true},
 {icon:'user-plus',tint:'#d9a0ff',name:'Nábor do cechu',desc:'Pri 100 % dôvere prijmi klienta do cechu. Zápisné rastie s veľkosťou cechu.',range:80,cast:2,mana:0,cd:.5,recruit:true}
];

const P={x:1360,y:1010,r:13,speed:200,mana:100,maxMana:100,coffee:1,gold:0,inc:0,xp:0,lvl:1,signed:0,move:null,dir:'d',
  look:{skin:'#f1c9a0',hair:'#5a3a1c',top:'#1d2b4f',pants:'#141d36',shoes:'#111',tie:'#d22',case:1,style:'short'}};

// ---------- company profile (edited in the start menu, kept in localStorage) ----------
const LOGO_PAL=['','#ffffff','#1a1410','#d43c3c','#ffd24a','#3fa37a','#2f6fb8','#8a4ac0','#e07a3f','#f4e2b0','#1d2b4f'],LOGO_N=12;
const LOGO_PRESETS={
 stit:['....kkkk....','..kkyyyykk..','.kyyyyyyyyk.','.kyyyyyyyyk.','.kyyybbyyyk.','.kyybbbbyyk.','.kyybbbbyyk.','.kyyybbyyyk.','..kyyyyyyk..','..kkyyyykk..','....kyyk....','.....kk.....'],
 dazdnik:['.....kk.....','...kkrrkk...','..krrrrrrk..','.krrwwrrrrk.','krrrwwrrrrrk','kkkkkkkkkkkk','.....kk.....','.....kk.....','.....kk.....','.....kk.kk..','.....kkkkk..','......kkk...'],
 dom:['.....kk.....','....krrk....','...krrrrk...','..krrrrrrk..','.krrrrrrrrk.','kkkkkkkkkkkk','.kccccccccck','.kccbbccbbck','.kccbbccbbck','.kcccckkccck','.kcccckkccck','.kkkkkkkkkkk'],
 srdce:['............','..kkk..kkk..','.krrrkkrrrk.','krrrrrrrrrrk','krrwrrrrrrrk','krrrrrrrrrrk','.krrrrrrrrk.','..krrrrrrk..','...krrrrk...','....krrk....','.....kk.....','............'],
 hviezda:['.....kk.....','.....kk.....','....kyyk....','....kyyk....','kkkkkyykkkkk','kyyyyyyyyyyk','.kyyyyyyyyk.','..kyyyyyyk..','..kyyyyyyk..','.kyyykkyyyk.','.kykk..kkyk.','.kk......kk.'],
 minca:['...kkkkkk...','..kyyyyyyk..','.kyyyyyyyyk.','kyyyokkkoyyk','kyyokyyyyyyk','kyykkkkkyyyk','kyykkkkkyyyk','kyyokyyyyyyk','kyyyokkkoyyk','.kyyyyyyyyk.','..kyyyyyyk..','...kkkkkk...']
};
const LOGO_NAMES={stit:'Štít',dazdnik:'Dáždnik',dom:'Dom',srdce:'Srdce',hviezda:'Hviezda',minca:'Minca'};
function logoFrom(name){const rows=LOGO_PRESETS[name],out=new Array(LOGO_N*LOGO_N).fill(0);if(rows)rows.forEach((r,y)=>{for(let x=0;x<LOGO_N;x++)out[y*LOGO_N+x]=Math.max(0,'.wkrygbpocn'.indexOf(r[x]));});return out;}
function drawLogo(cvs,logo,bg){const g=cvs.getContext('2d');g.clearRect(0,0,LOGO_N,LOGO_N);if(bg){g.fillStyle=bg;g.fillRect(0,0,LOGO_N,LOGO_N);}for(let i=0;i<logo.length;i++)if(logo[i]){g.fillStyle=LOGO_PAL[logo[i]];g.fillRect(i%LOGO_N,i/LOGO_N|0,1,1);}}
const logoCanvas=mkCanvas(LOGO_N,LOGO_N);
const CO_COLS=['#2f6fb8','#d43c3c','#3fa37a','#ffd24a','#8a4ac0','#e07a3f','#1d2b4f','#5a5a5a'];
const CO_NAMES=['Istota & Syn','PoistiMa s.r.o.','Dôvera Plus','Bezpečný Zajtrajšok','Kryté Strechy a.s.','Provízia Expres'];
const AG_NAMES=['Fero Istota','Katka Poistná','Jano Provízia','Zuza Zmluvová','Miro Kávička','Lenka Vizitková'];
const LOOK_OPTS=[
 {k:'skin',l:'Pleť',sw:['#f6d7b8','#f1c9a0','#e8b98c','#d9a273','#b57a4a','#7a4a2a']},
 {k:'style',l:'Účes',opt:[['short','Krátke'],['long','Dlhé'],['bun','Drdol'],['cap','Šiltovka'],['bald','Plešina']]},
 {k:'hair',l:'Vlasy',sw:['#1a1a1a','#2a1c12','#5a3a1c','#8a4a22','#c98a3a','#e8d08a','#a8a8b0','#d04a3a']},
 {k:'hat',l:'Šiltovka',sw:['#c22','#2a2a2a','#2a7a3a','#2f6fb8','#ffd24a']},
 {k:'top',l:'Sako',sw:['#1d2b4f','#444a58','#2f6fb8','#8a1414','#3fa37a','#6a2a9a','#e07a3f','#f4f4f4']},
 {k:'pants',l:'Nohavice',sw:['#141d36','#2a2d35','#4a463e','#1f3f6a','#5a4a6a','#8a5426']},
 {k:'skirt',l:'Sukňa',opt:[[0,'Nie'],[1,'Áno']]},
 {k:'tie',l:'Kravata',sw:['','#d22','#3a8fd0','#c9a020','#7a3ac0','#111']},
 {k:'glasses',l:'Okuliare',opt:[[0,'Nie'],[1,'Áno']]},
 {k:'case',l:'Kufrík',opt:[[0,'Nie'],[1,'Áno']]}
];
const prof={co:pick(CO_NAMES),col:CO_COLS[0],logo:logoFrom('stit'),name:pick(AG_NAMES),look:Object.assign({glasses:0,skirt:0,hat:'#c22'},P.look)};
let hasSaved=false;
(function(){try{const s=JSON.parse(localStorage.getItem('insurance-tycoon.prof')||'null');if(!s)return;hasSaved=true;
  if(typeof s.co==='string'&&s.co.trim())prof.co=s.co.slice(0,20);if(typeof s.name==='string'&&s.name.trim())prof.name=s.name.slice(0,16);if(CO_COLS.includes(s.col))prof.col=s.col;
  if(Array.isArray(s.logo)&&s.logo.length===LOGO_N*LOGO_N)prof.logo=s.logo.map(v=>clamp(v|0,0,LOGO_PAL.length-1));
  if(s.look&&typeof s.look==='object')for(const o of LOOK_OPTS){const v=s.look[o.k];if(o.sw?o.sw.includes(v):o.opt.some(p=>p[0]===v))prof.look[o.k]=v;}}catch(e){}})();
function saveProf(){try{localStorage.setItem('insurance-tycoon.prof',JSON.stringify(prof));}catch(e){}}
let clients=[],target=null,casting=null,cds=[0,0,0,0,0],floats=[],parts=[],shots=[],running=false;
const RLOOK={skin:'#e8b98c',hair:'#111',top:'#8a1414',pants:'#4a0c0c',shoes:'#111',tie:'#111',glasses:1,case:1,style:'short'};
const rivals=[];let rivDeals=0,rivLvl=0,myDeals=0,goal=40,nextRiv=10,coursesBought=0,course=null,fw=[],fwGlow=0;
let quest={need:3,done:0,reward:50};
const agents=[],MAXA=24,MAXDIRECT=6;function recruitCost(){return 60+15*agents.length;}function courseCost(){return Math.round((200+50*agents.length)*Math.pow(1.22,coursesBought)/10)*10;}function mine(){return P.signed+myDeals;}
let passive=0,treeOpen=false,treeTab='me',wasRunning=false;

function newClient(){const T=pick(TYPES),s=freeSpot(),look=T.look();look.skin=pick(SKIN);
  return{T,look,name:pick(T.names),x:s.x,y:s.y,tx:s.x,ty:s.y,wait:R(0,2),trust:0,rtrust:0,ptrust:0,lastHit:-99,rHit:-99,pHit:-99,signed:false,fade:0,say:'',sayT:0,r:12,dir:'d',kidLook:T.kid?{skin:look.skin,hair:look.hair,top:'#ffd24a',pants:'#c0504a',style:'short'}:null};}
for(let i=0;i<8;i++)clients.push(newClient());
function mkAgent(c,boss,team){const me=team==='me';const look=Object.assign({},c.look,{top:me?prof.col:'#8a1414',pants:me?shade(prof.col,-50):'#4a0c0c',tie:me?(prof.col==='#ffd24a'?'#1d2b4f':'#ffd24a'):'#111',case:1,skirt:0,cardigan:0,hood:0,brows:0});
  return{team,name:c.name,look,x:c.x,y:c.y,boss,depth:boss?boss.depth+1:1,lvl:me?coursesBought:0,rank:1,inc:0,trained:!me,fails:0,tryT:0,solo:false,paraT:0,paraOn:false,state:'work',deals:0,earned:0,kids:0,target:null,avoid:null,t:0,chase:0,goT:0,r:12,dir:'d',sayT:0};}

// ---------- HUD helpers ----------
const ab=$('ab');const spEls=SPELLS.map((s,i)=>{const d=document.createElement('div');d.className='sp';d.innerHTML='<span class="k">'+(i+1)+'</span><span class="n"></span><span class="cd"></span>'+ico(s.icon,48,s.tint);
  d.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();tip(s);useSpell(i);});
  d.addEventListener('pointerenter',()=>tip(s));d.addEventListener('pointerleave',()=>{$('tip').textContent='';});
  ab.appendChild(d);return d;});
let tipT=0;function tip(s){const cost=s.mana?s.mana+' charizmy':s.coffee?'1 káva':s.recruit?'Zápisné '+recruitCost()+' €':'';$('tip').innerHTML='<b>'+s.name+'</b>'+(cost?'<em>'+cost+'</em>':'')+s.desc;tipT=3;}
function chat(txt,col){const c=$('chat'),d=document.createElement('div');d.textContent=txt;d.style.color=col||'#ffe9a8';c.appendChild(d);while(c.children.length>9)c.removeChild(c.firstChild);}
let errT=0;function err(m){$('err').textContent=m;$('err').style.opacity=1;errT=1.6;}
let lvlT=0;
function float(x,y,txt,col){floats.push({x,y,txt,col,t:0});}
function burst(x,y,n,cols,spd,grav,life,sz){for(let i=0;i<n;i++){const a=R(0,6.28),v=R(.3,1)*spd;parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(grav?spd*.6:0),g:grav||0,t:0,life:R(.5,1)*(life||.8),col:pick(cols),sz:sz||3});}}
function shoot(ic,from,to){shots.push({ic,x0:from.x,y0:from.y-26,to,t:0});}
function say(c,arr){c.say=pick(arr);c.sayT=2.6;}
function xpNeed(){return 80+P.lvl*50;}
function title(){return TITLES[Math.min(P.lvl-1,TITLES.length-1)];}
function addXp(){}
function levelUp(){P.lvl++;P.maxMana+=10;P.mana=P.maxMana;
  $('lvl').innerHTML='LEVEL '+P.lvl+'<small>'+title()+'</small>';$('lvl').style.opacity=1;lvlT=3;
  burst(P.x,P.y-20,40,['#ffd24a','#fff2a8','#ffffff'],160,0,1.2);
  chat('Postúpil si na level '+P.lvl+': '+title()+'!','#ffd24a');}
function questCheck(){if(quest.done>=quest.need){P.gold+=quest.reward;P.inc+=quest.reward;P.mana=P.maxMana;chat('Mesačný plán splnený! Bonus '+quest.reward+' € a plná charizma.','#7be05a');quest={need:quest.need+2,done:0,reward:quest.reward+50};}}
function toggleOrg(v){const on=v==null?!treeOpen:v;if(on===treeOpen)return;treeOpen=on;$('tree').style.display=on?'flex':'none';
  if(on){wasRunning=running;running=false;for(const k in keys)keys[k]=false;renderTree();}else if(wasRunning&&$('end').style.display!=='flex')running=true;}
function renderTree(){
  const tabs=[['me','Môj cech']];if(rivals.length)tabs.push(['riv','Konkurencia']);if(paras.length)tabs.push(['par','Paralelné']);
  if(!tabs.some(t=>t[0]===treeTab))treeTab='me';
  $('ttabs').innerHTML=tabs.length>1?tabs.map(t=>'<span class="btn tab'+(t[0]===treeTab?' on':'')+'" data-t="'+t[0]+'">'+t[1].toUpperCase()+'</span>').join(''):'';
  const list=TEAMS[treeTab].list,mk=a=>({a,kids:list.filter(b=>b.boss===a).map(mk)});
  const root=treeTab==='me'?{me:true,kids:list.filter(b=>!b.boss).map(mk)}:treeTab==='riv'?mk(rivals[0]):{virt:true,kids:list.filter(b=>b.leader).map(mk)};
  const NW=innerWidth<=700?128:152,NH=66,GX=10,GY=46,nodes=[],lines=[];let H=0;
  const kw=n=>n.kids.reduce((t,k)=>t+k.w,0)+GX*Math.max(0,n.kids.length-1);
  const width=n=>{n.kids.forEach(width);return n.w=Math.max(NW,kw(n));};
  const place=(n,x,d)=>{n.x=Math.round(x+n.w/2-NW/2);n.y=d*(NH+GY);if(!n.virt){nodes.push(n);H=Math.max(H,n.y+NH);}
    let cx=x+(n.w-kw(n))/2;for(const k of n.kids){place(k,cx,d+1);if(!n.virt)lines.push([n.x+NW/2,n.y+NH,k.x+NW/2,k.y]);cx+=k.w+GX;}};
  width(root);place(root,0,root.virt?-1:0);
  let h='<svg width="'+root.w+'" height="'+H+'">'+lines.map(l=>{const m=(l[1]+l[3])/2;return '<path d="M'+l[0]+' '+l[1]+'C'+l[0]+' '+m+' '+l[2]+' '+m+' '+l[2]+' '+l[3]+'" fill="none" stroke="'+(treeTab==='me'?'#ffd24a':treeTab==='riv'?'#e0483a':'#b040ff')+'" stroke-width="2"/>';}).join('')+'</svg>';
  nodes.forEach((n,i)=>{const a=n.a;let cls='nd',rk,nm,meta;
    if(n.me){cls+=' me';rk='L'+P.lvl;nm=esc(prof.name);meta=P.signed+' zmlúv · '+Math.floor(P.inc)+' €';}
    else{rk=a.trained?'L'+a.rank:'NOVÁČIK';nm=a.name;meta=a.deals+' zmlúv · '+Math.floor(a.inc)+' €';
      if(treeTab==='riv')cls+=' riv';else if(treeTab==='par')cls+=' par';
      else if(!a.trained){cls+=' nb';meta='odmietnutia '+a.fails+'/2';}
      else if(a.paraOn){cls+=' dg';meta='paralelita o '+Math.ceil(a.paraT)+' s';}}
    h+='<div class="'+cls+'" style="left:'+n.x+'px;top:'+n.y+'px;width:'+NW+'px"><canvas width="12" height="12" data-i="'+i+'"></canvas><b>'+rk+'</b><span>'+nm+'</span><em>'+meta+'</em></div>';});
  const tin=$('tin');tin.style.width=root.w+'px';tin.style.height=H+'px';tin.innerHTML=nodes.length?h:'<div style="padding:30px;text-align:center">Zatiaľ nikto.</div>';
  tin.querySelectorAll('canvas').forEach(c=>{const n=nodes[+c.dataset.i];portrait(c,n.me?P.look:n.a.look);});
  const direct=agents.filter(a=>!a.boss).length;
  $('tsum').innerHTML=treeTab==='me'?'Členov '+agents.length+'/'+MAXA+' · priamo pod tebou '+direct+'/'+MAXDIRECT+' · príjem z cechu '+passive+' € · kurz v Akadémii '+courseCost()+' €'+(agents.length?'':'<br>Presvedč klienta na 100 % a použi Nábor ('+recruitCost()+' €).'):treeTab==='riv'?'Konkurencia: '+rivals.length+' ľudí · '+rivDeals+' zmlúv':'Odtrhnuté štruktúry: '+paras.length+' ľudí · '+paraDeals+' zmlúv';
  const tv=$('tview');tv.scrollLeft=Math.max(0,(root.w-tv.clientWidth)/2+14);
}
function careerHtml(){const fmt=o=>o.map(x=>x[1]+'× L'+x[0]).join(' + ');let h='';
  for(let l=MAXLVL;l>=1;l--){const r=REQ[l];
    h+='<div class="cl"><div class="lv">L'+l+'</div><b>'+TITLES[l-1]+(l===MAXLVL?' – cieľ hry':'')+'</b>'+(r?'<i>Príjem: '+r.inc+' €</i><i>Priamo pod tebou: '+r.opts.map(fmt).join(' alebo ')+'</i>':'<i>Tu začína každý, ty aj nový člen cechu.</i><i>Žiadne podmienky.</i>')+'</div>'+(l>1?'<div class="ca">▲</div>':'');}
  return h+'<div class="goal"><b>Príjem</b> sa počíta za celú hru: tvoje provízie, podiel zo zmlúv cechu a bonusy za mesačný plán. Míňanie ho neznižuje.<br><b>Pod tebou</b> sa rátajú len zaučení členovia priamo pod tebou. Vyšší level platí aj za nižší (L3 splní požiadavku na L2).<br><b>Nováčik</b> sám nikoho nepresvedčí: zacieľ jeho klienta a pomôž mu kúzlom. Po dvoch odmietnutiach odíde. Kurz v Akadémii zaučí všetkých naraz.<br><b>Paralelita:</b> rovnaké pravidlá platia aj pre tvojich ľudí. Ak sa niekto dostane na tvoj level, máš 60 sekúnd na postup, inak sa odtrhne aj so svojimi ľuďmi a ide proti tebe.</div>';}
function toggleCareer(on){if(on)$('cbody').innerHTML=careerHtml();$('career').style.display=on?'flex':'none';}
// ---------- spells ----------
function useSpell(i){
  if(!running)return;
  const s=SPELLS[i];
  if(casting)return;
  if(cds[i]>0)return err('Ešte to nie je pripravené');
  const t=target;
  if(!t||t.signed)return err('Nemáš cieľ – klikni na klienta');
  if(dist(P,t)>s.range)return err('Si príliš ďaleko');
  if(s.coffee&&P.coffee<1)return err('Nemáš kávu – zájdi do kaviarne');
  if(P.mana<s.mana)return err('Nedostatok charizmy');
  if((s.sign||s.recruit)&&t.trust<100)return err('Klient ešte nie je presvedčený');
  if(s.recruit&&P.gold<recruitCost())return err('Zápisné je '+recruitCost()+' € – najprv niečo zarob');
  if(s.recruit&&agents.length>=MAXA)return err('Cech je plný');
  if(s.recruit&&agents.filter(a=>!a.boss).length>=MAXDIRECT)return err('Priamo pod sebou môžeš mať najviac '+MAXDIRECT+' ľudí');
  if(s.cast>0){casting={i,t:0,target:t};P.move=null;}
  else finish(i,t);
}
function finish(i,t){
  const s=SPELLS[i];
  if(t.signed||!clients.includes(t))return;
  if(dist(P,t)>s.range+25)return err('Klient ti ušiel');
  if(s.coffee){if(P.coffee<1)return;P.coffee--;}
  P.mana-=s.mana;cds[i]=s.cd;
  if(s.recruit){
    if(t.trust<100)return err('Dôvera klesla, nábor padol');
    if(P.gold<recruitCost()||agents.length>=MAXA)return;
    const rc=recruitCost();P.gold-=rc;const n=mkAgent(t,null,'me');agents.push(n);clients.splice(clients.indexOf(t),1);target=null;
    burst(n.x,n.y-20,30,['#7be05a','#d8ffc8','#ffd24a'],140,0,1);
    float(n.x,n.y-70,'Vitaj v cechu!','#7be05a');float(P.x,P.y-60,'−'+rc+' €','#ff6a5a');
    chat(n.name+' vstupuje do tvojho cechu ako nováčik. Choď s ním k jeho prvému klientovi a pomôž mu!','#7be05a');
    addXp(40);return;
  }
  if(s.sign){
    if(t.trust<100)return err('Dôvera klesla, zmluva padla');
    t.signed=true;t.fade=5;say(t,SAY.sign);
    const xp=30+Math.round(t.T.com/3);
    P.gold+=t.T.com;P.inc+=t.T.com;P.signed++;quest.done++;
    burst(t.x,t.y-24,22,['#ffd24a','#ffb000','#fff2a8'],150,420,1.1);
    float(t.x,t.y-70,'+'+t.T.com+' € provízia','#ffd24a');
    chat('Uzavrel si zmluvu: '+t.name+' ('+t.T.t+'). Provízia '+t.T.com+' €.','#ffd24a');
    if(target===t)target=null;
    questCheck();addXp(xp);
    return;
  }
  const mult=s.kind==='coffee'?t.T.coffee:s.kind==='promise'?t.T.promise:1;
  const gain=Math.round(s.power*mult);
  t.trust=Math.min(100,t.trust+gain);t.lastHit=now;if(t.byMe&&t.byMe.target===t&&!t.byMe.trained&&!t.helped){t.helped=true;float(t.byMe.x,t.byMe.y-84,'Pomáhaš nováčikovi','#ffd24a');}if(t.rtrust<100)t.rtrust=Math.max(0,t.rtrust-gain*.5);if(t.ptrust<100)t.ptrust=Math.max(0,t.ptrust-gain*.5);
  shoot(s.ic,P,t);
  float(t.x,t.y-70,'+'+gain+' dôvera',mult>1.1?'#ffd24a':mult<.9?'#aaa':'#7be05a');
  if(s.kind==='promise'){float(P.x,P.y-62,pick(PROM),'#fff');}
  say(t,SAY[s.kind]);
  if(t.trust>=100){float(t.x,t.y-90,'Presvedčený!','#ffd24a');burst(t.x,t.y-24,18,['#ffd24a','#fff'],110,0,.9);}
}

// ---------- levels: income + structure (same rules for me, my members, the rival chief and break-away leaders) ----------
const MAXLVL=5,paras=[];let paraDeals=0,paraCount=0,ended=false,scareT=0,warnTxt='',AC=null,relT=0;
const PARA_TIME=60;
// REQ[level] = income needed + alternative structures, each a list of [minimum level, how many direct members]
const REQ={2:{inc:100,opts:[[[1,1]]]},3:{inc:500,opts:[[[1,3]],[[2,2]]]},4:{inc:2000,opts:[[[2,3],[1,2]],[[3,2],[2,1]]]},5:{inc:6000,opts:[[[3,3],[2,2]],[[4,2],[3,1]]]}};
const TEAMS={me:{list:agents,mk:'trust',hk:'lastHit',byk:'byMe',col:'#9fd0ff'},riv:{list:rivals,mk:'rtrust',hk:'rHit',byk:'byRiv',col:'#ff8a7a'},par:{list:paras,mk:'ptrust',hk:'pHit',byk:'byPar',col:'#d9a0ff'}};
function structProg(ranks,opt){let idx=0,have=0,tot=0;for(const o of opt){tot+=o[1];for(let i=0;i<o[1];i++){if(idx<ranks.length&&ranks[idx]>=o[0]){idx++;have++;}else break;}}return[have,tot];}
function subRanks(list,node){return list.filter(b=>b.boss===node&&b.trained).map(b=>b.rank).sort((x,y)=>y-x);}
function reqInfo(inc,ranks,next){const r=REQ[next];if(!r)return null;const ps=r.opts.map(o=>structProg(ranks,o));let bi=0;ps.forEach((p,i)=>{if(p[0]/p[1]>ps[bi][0]/ps[bi][1])bi=i;});
  const b=ps[bi];return{r,ps,bi,incOk:inc>=r.inc,ok:inc>=r.inc&&b[0]>=b[1],prog:(Math.min(1,inc/r.inc)+b[0]/b[1])/2};}
function lvNode(list,node){for(const b of list)if(b.boss===node)lvNode(list,b);
  while(node.rank<MAXLVL){const q=reqInfo(node.inc,subRanks(list,node),node.rank+1);if(!q||!q.ok)break;node.rank++;
    if(node.team==='me'){float(node.x,node.y-84,'Postup na L'+node.rank,'#9fd0ff');chat(node.name+' z tvojho cechu postúpil(a) na L'+node.rank+'.','#9fd0ff');}
    else if(node.chief)chat('Šéf konkurencie postúpil na L'+node.rank+'!','#ff6a5a');
    else if(node.leader)chat('Paralelná štruktúra ('+node.name+') postúpila na L'+node.rank+'!','#d9a0ff');}}
function relevel(){
  for(const a of agents.slice())if(!a.boss)lvNode(agents,a);
  while(P.lvl<MAXLVL){const q=reqInfo(P.inc,subRanks(agents,null),P.lvl+1);if(!q||!q.ok)break;levelUp();}
  if(rivals.length)lvNode(rivals,rivals[0]);
  for(const a of paras.slice())if(a.leader)lvNode(paras,a);
  checkEnd();}
function credit(a,C){a.inc+=C;let k=1;for(let b=a.boss;b;b=b.boss,k++)b.inc+=C*Math.pow(.5,k);}
function mult(a){return a.team==='riv'?1.25+.3*rivLvl+(a.chief?.25:0):(1+.35*a.lvl)*(a.trained?1:.5);}
function spawnRival(){let s=freeSpot();for(let i=0;i<30&&dist(s,P)<500;i++)s=freeSpot();
  rivals.push({team:'riv',chief:true,trained:true,name:'Šéf konkurencie',look:RLOOK,x:s.x,y:s.y,boss:null,depth:0,lvl:0,rank:1,inc:0,fails:0,state:'work',deals:0,earned:0,kids:0,target:null,avoid:null,t:0,chase:0,goT:0,r:12,dir:'d',sayT:0});
  burst(s.x,s.y-20,40,['#ff5a4a','#8a1414','#ffd24a'],170,0,1.2);
  chat('Do mesta dorazila KONKURENCIA! Poisťuje, verbuje a stavia vlastnú štruktúru. Sleduj červenú lištu u klientov.','#ff6a5a');
  $('lvl').innerHTML='KONKURENCIA<small>Preteky o level '+MAXLVL+' sa začínajú</small>';$('lvl').style.opacity=1;lvlT=3;}
function checkEnd(){if(ended)return;let w=null;
  if(P.lvl>=MAXLVL)w='me';else if(rivals.length&&rivals[0].rank>=MAXLVL)w='Konkurencia';else{const l=paras.find(a=>a.leader&&a.rank>=MAXLVL);if(l)w='Paralelná štruktúra ('+l.name+')';}
  if(!w)return;ended=true;running=false;for(const k in keys)keys[k]=false;
  $('endt').textContent=w==='me'?'Si Kráľ trhu!':'Prehral si';$('endt').style.color=w==='me'?'#1f5a14':'#7a0c0c';
  $('endd').textContent=w==='me'?'Level '+MAXLVL+' si dosiahol ako prvý. Zmluvy: '+P.signed+' osobne, '+myDeals+' cez cech. Príjem: '+Math.floor(P.inc)+' €.':w+' dosiahla level '+MAXLVL+' skôr než ty (bol si na leveli '+P.lvl+').';
  $('end').style.display='flex';}
function scream(final){if(!AC)return;try{const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type='sawtooth';
  o.frequency.setValueAtTime(final?70:240,t);o.frequency.exponentialRampToValueAtTime(final?35:1150,t+.45);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.2,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+1);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+1.1);
  const b=AC.createBuffer(1,Math.floor(AC.sampleRate*.7),AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
  const n=AC.createBufferSource(),g2=AC.createGain();g2.gain.value=.13;n.buffer=b;n.connect(g2);g2.connect(AC.destination);n.start(t);}catch(e){}}
function scare(a){
  $('sct').textContent='PARALELITA';$('scs').textContent=a.name+' sa od teba odtrhol';
  const el=$('scare');el.classList.remove('on');void el.offsetWidth;el.classList.add('on');scareT=2;scream(true);for(const k in keys)keys[k]=false;}
function breakaway(a){
  const sub=[a];for(let i=0;i<sub.length;i++)for(const b of agents)if(b.boss===sub[i]&&!sub.includes(b))sub.push(b);
  for(const b of sub){agents.splice(agents.indexOf(b),1);b.team='par';b.state='work';b.trained=true;b.paraOn=false;if(b.target){b.target.byMe=null;b.target=null;}
    b.look=Object.assign({},b.look,{top:'#6a2a9a',pants:'#3a1458',tie:'#ffffff'});paras.push(b);burst(b.x,b.y-20,16,['#b040ff','#d9a0ff','#fff'],140,0,1);}
  a.boss=null;a.leader=true;a.depth=0;paraCount++;
  if(course)course.list=course.list.filter(b=>!sub.includes(b));
  chat('PARALELITA! '+a.name+' (L'+a.rank+') sa odtrhol'+(sub.length>1?' aj s '+(sub.length-1)+' ľuďmi':'')+'. Odteraz idú proti tebe.','#d9a0ff');
  scare(a);
}
function checkPara(dt){warnTxt='';let worst=null;
  for(const a of agents){
    if(a.rank>=2&&a.rank>=P.lvl){
      if(!a.paraOn){a.paraOn=true;a.paraT=PARA_TIME;chat(a.name+' je na tvojej úrovni (L'+a.rank+'). Ak do '+PARA_TIME+' s nepostúpiš, odtrhne sa!','#ffb84a');}
      a.paraT-=dt;if(a.paraT<=0){breakaway(a);return;}
      if(!worst||a.paraT<worst.paraT)worst=a;
    }else a.paraOn=false;
  }
  if(worst)warnTxt=worst.name+' je na tvojej úrovni (L'+worst.rank+'). PARALELITA o '+Math.ceil(worst.paraT)+' s – postúp na L'+(P.lvl+1)+'!';
}
function leave(a){a.gone=true;if(a.boss)a.boss.kids=Math.max(0,a.boss.kids-1);if(a.target){a.target.byMe=null;a.target=null;}if(course)course.list=course.list.filter(b=>b!==a);
  burst(a.x,a.y-20,14,['#888','#bbb'],90,0,.9);float(a.x,a.y-84,'Odchádza z cechu','#ff6a5a');
  chat(a.name+' to po dvoch odmietnutiach vzdal(a) a odišiel z cechu. Nováčikom treba pomáhať.','#ff6a5a');}
// ---------- AI agents: my guild, the rival team and break-away (parallel) teams share one brain ----------
function updTeam(team,dt){
  const T=TEAMS[team],list=T.list,me=team==='me',mk=T.mk,byk=T.byk,hk=T.hk;
  for(const a of list){
    if(a.sayT>0)a.sayT-=dt;
    if(a.state==='in'||a.gone)continue;
    if(a.state==='go'){a.goT+=dt;const d=dist(a,acadDoor);
      if(d<26||a.goT>9){a.state='in';burst(a.x,a.y-20,6,['#c9a0ff','#fff'],60,0,.5);}
      else{a.x+=(acadDoor.x-a.x)/d*250*dt;a.y+=(acadDoor.y-a.y)/d*250*dt;pushOut(a,a.r);}
      continue;}
    let c=a.target;
    if(c&&(c.signed||!clients.includes(c))){c=a.target=null;}
    if(!c){let bd=1e9;
      for(let pass=0;pass<2&&!c;pass++)for(const k of clients){if(k.signed||(me&&a.trained&&k===target)||k===a.avoid||(k[byk]&&k[byk]!==a&&k[byk].target===k))continue;
        if(!pass){let busy=false;for(const o in TEAMS){const ob=TEAMS[o].byk;if(ob!==byk&&k[ob]&&k[ob].target===k)busy=true;}if(busy)continue;}
        let d=dist(a,k);if(a.chief&&k.trust>15&&k.trust<100)d-=600;if(d<bd){bd=d;c=k;}}
      if(c){a.target=c;c[byk]=a;a.t=0;a.chase=0;if(!a.trained){a.tryT=0;a.solo=!!a.boss&&Math.random()<.5;c.helped=false;}}else continue;}
    const d=dist(a,c),m=mult(a);
    if(d>46){a.chase+=dt;a.x+=(c.x-a.x)/d*118*dt;a.y+=(c.y-a.y)/d*118*dt;pushOut(a,a.r);
      if(a.chase>10){a.avoid=c;c[byk]=null;a.target=null;}
      continue;}
    a.chase=0;a.t+=dt;c[hk]=now;a.dir=Math.abs(c.x-a.x)>Math.abs(c.y-a.y)?(c.x>a.x?'r':'l'):(c.y>a.y?'d':'u');
    const newbie=me&&!a.trained,alone=newbie&&!a.solo&&!c.helped;
    if(alone){a.tryT+=dt;
      if(a.tryT>11&&c.trust<100){a.fails++;a.target=null;a.avoid=c;c.byMe=null;c.trust=Math.min(c.trust,20);
        say(c,['Nie, ďakujem.','Vy tomu vôbec nerozumiete.','Pošlite niekoho skúsenejšieho.']);float(a.x,a.y-84,'Odmietnutý '+a.fails+'/2','#ff6a5a');
        if(a.fails>=2)leave(a);continue;}}
    if(c[mk]<100){if(a.t>=1.5/m){a.t=0;const cof=Math.random()<.5;const g=Math.round(R(8,13)*(cof?c.T.coffee:c.T.promise));
        c[mk]=alone?Math.max(c[mk],Math.min(65,c[mk]+g)):Math.min(100,c[mk]+g);if(a.chief&&c.trust<100)c.trust=Math.max(0,c.trust-g*.5);shoot(cof?'cup':'star',a,c);float(c.x,c.y-70,'+'+g,T.col);
        if(a.chief&&a.sayT<=0&&Math.random()<.3){a.say='Ja vám dám lepšiu ponuku!';a.sayT=2.4;}}}
    else if(a.t>=1.8/m){a.t=0;a.target=null;a.avoid=null;
      const cap=me?MAXA:team==='riv'?Math.min(MAXA,Math.max(5,agents.length+4)):MAXA;
      const kidsNow=list.filter(b=>b.boss===a).length,maxKids=(a.chief||a.leader)?MAXDIRECT:a.depth===1?3:0;
      if(a.trained&&kidsNow<maxKids&&a.deals>=(a.chief?2:3)*(a.kids+1)&&list.length<cap){
        const n=mkAgent(c,a,team);if(team==='par'){n.look=Object.assign({},n.look,{top:'#6a2a9a',pants:'#3a1458',tie:'#ffffff'});n.trained=true;}
        a.kids++;clients.splice(clients.indexOf(c),1);list.push(n);if(target===c)target=null;
        burst(n.x,n.y-20,24,me?['#7be05a','#d8ffc8']:team==='riv'?['#ff5a4a','#8a1414']:['#b040ff','#d9a0ff'],130,0,1);
        if(me){float(n.x,n.y-70,'Nový nováčik v cechu','#7be05a');chat(a.name+' prijal(a) do cechu nováčika: '+n.name+'.','#7be05a');}
        else if(team==='riv'){float(n.x,n.y-70,'Prebehol ku konkurencii!','#ff6a5a');chat('Konkurencia naverbovala: '+n.name+' (majú už '+rivals.length+' ľudí).','#ff6a5a');}
        else float(n.x,n.y-70,'Paralelná štruktúra rastie','#d9a0ff');
      }else if(me){
        c.signed=true;c.fade=5;say(c,SAY.sign);a.deals++;myDeals++;if(target===c)target=null;
        if(!a.trained){a.trained=true;burst(a.x,a.y-20,20,['#ffd24a','#fff'],120,0,1);float(a.x,a.y-84,'Zaučený!','#ffd24a');chat(a.name+' uzavrel(a) prvú zmluvu a je zaučený. Odteraz poisťuje sám.','#7be05a');}
        const g=Math.max(1,Math.round(c.T.com*Math.pow(.5,a.depth)));a.earned+=g;P.gold+=g;P.inc+=g;passive+=g;quest.done++;credit(a,c.T.com);
        burst(c.x,c.y-24,12,['#ffd24a','#ffb000'],130,420,1);
        float(a.x,a.y-70,'+'+g+' € z cechu','#ffd24a');questCheck();
        if(!rivals.length)spawnRival();
      }else{
        c.signed=true;c.lost=team;c.fade=5;say(c,SAY.rsign);a.deals++;if(target===c)target=null;credit(a,c.T.com);
        if(team==='riv'){rivDeals++;burst(c.x,c.y-24,12,['#ff5a4a','#8a1414'],110,0,.9);float(c.x,c.y-90,'Získala konkurencia','#ff6a5a');
          if(rivDeals>=nextRiv){rivLvl++;nextRiv=rivDeals+20+14*rivLvl;chat('Konkurencia absolvovala školenie (rýchlosť '+rivLvl+'). Poisťujú rýchlejšie!','#ff6a5a');}}
        else{paraDeals++;burst(c.x,c.y-24,12,['#b040ff','#d9a0ff'],110,0,.9);float(c.x,c.y-90,'Získala paralelná','#d9a0ff');}
      }
    }
  }
  for(let i=list.length-1;i>=0;i--)if(list[i].gone)list.splice(i,1);
}
// ---------- academy ----------
function buyCourse(){
  if(!running||course)return;
  if(dist(P,acadDoor)>70)return;
  if(!agents.length)return err('Najprv niekoho prijmi do cechu');
  const c=courseCost();if(P.gold<c)return err('Kurz stojí '+c+' € – ešte nemáš dosť');
  P.gold-=c;coursesBought++;course={phase:'gather',t:0,list:agents.slice()};
  for(const a of course.list){a.state='go';a.goT=0;if(a.target){a.target.byMe=null;a.target=null;}}
  float(P.x,P.y-60,'−'+c+' €','#ff6a5a');chat('Kúpil si kurz pre celý cech ('+c+' €). Všetci bežia do Akadémie!','#c9a0ff');
}
function updCourse(dt){
  for(let i=fw.length-1;i>=0;i--){fw[i].t-=dt;if(fw[i].t<=0){const f=fw[i],pal=pick([['#ff5a4a','#ffd24a','#fff'],['#5ab0ff','#c9a0ff','#fff'],['#7be05a','#ffd24a','#fff'],['#ff8fd0','#ffd24a','#fff']]);burst(f.x,f.y,70,pal,330,170,1.9,6);burst(f.x,f.y,30,['#fff'],150,60,1,9);for(let k=0;k<12;k++)parts.push({x:f.x+R(-3,3),y:f.y+k*((acad.y-f.y)/12),vx:0,vy:20,g:0,t:0,life:.25+k*.03,col:'#fff2a8',sz:3});fw.splice(i,1);}}
  if(fwGlow>0)fwGlow-=dt;
  if(!course)return;course.t+=dt;
  if(course.phase==='gather'){if(course.list.every(a=>a.state==='in')){course.phase='run';course.t=0;}}
  else if(course.t>=2){
    for(const a of agents)a.lvl=coursesBought;
    for(const a of course.list)if(!a.trained){a.trained=true;float(a.x,a.y-84,'Zaučený!','#ffd24a');}
    for(const a of course.list){a.state='work';a.x=acadDoor.x+R(-60,60);a.y=acadDoor.y+R(0,30);a._x=null;a._y=null;a.t=0;float(a.x,a.y-70,'Level '+a.lvl+'!','#c9a0ff');}
    for(let i=0;i<9;i++)fw.push({t:i*.28,x:acad.x+acad.w/2+R(-150,150),y:acad.y-R(50,210)});
    fwGlow=4.6;chat('Kurz ukončený! Tvoj cech poisťuje rýchlejšie.','#c9a0ff');course=null;
  }
}

// ---------- office & billboards ----------
const OFFICE_R=70,OFFICE_REGEN=12,MANA_REGEN=2;let officeHint=false;
const billboards=[],MAXBB=3,BB_R=170,BB_RATE=9,BB_PULL=420;let BBSPR=null;
function bbCost(){return 200*Math.pow(2,billboards.length);}
function nearBB(e,r){for(const b of billboards)if(Math.hypot(e.x-b.x,(e.y-b.y)/.6)<r)return b;return null;}
function mkBillboard(){const c=mkCanvas(48,42),g=c.getContext('2d'),Q=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h);};
  Q(6,27,3,14,'#3a3f48');Q(39,27,3,14,'#3a3f48');Q(7,27,1,14,'#5a606c');Q(40,27,1,14,'#5a606c');Q(4,40,7,2,'#2a2e36');Q(37,40,7,2,'#2a2e36');
  Q(20,0,8,1,'#ffe9a0');Q(22,1,4,2,'#3a3f48');
  Q(0,3,48,25,'#1a1410');Q(1,4,46,23,shade(prof.col,-30));Q(2,5,44,21,'#f4efe0');Q(2,5,44,2,prof.col);
  g.imageSmoothingEnabled=false;g.drawImage(logoCanvas,5,9,12,12);g.drawImage(sheet(P.look),2,1,12,12,31,9,12,12);
  Q(19,11,10,1,'#4a2c10');Q(19,14,10,1,'#8a7a5a');Q(19,17,7,1,'#8a7a5a');Q(19,20,10,1,prof.col);
  return outline(c);}
function buildBillboard(){
  if(!running)return;
  if(billboards.length>=MAXBB)return err('Mesto povolí najviac '+MAXBB+' billboardy');
  const c=bbCost();if(P.gold<c)return err('Billboard stojí '+c+' € – ešte nemáš dosť');
  const s={x:P.x,y:P.y-30};
  if(inBuilding(s.x,s.y,44)||inPond(s.x,s.y,40)||dist(s,cafeDoor)<110||dist(s,acadDoor)<110||dist(s,officeDoor)<110||s.x<80||s.x>WORLD.w-80||s.y<130||s.y>WORLD.h-60)return err('Tu sa billboard postaviť nedá – odstúp od budov');
  if(nearBB(s,BB_R*1.6))return err('Príliš blízko iného billboardu');
  P.gold-=c;billboards.push(s);statics.push({x:s.x,y:s.y,spr:BBSPR,sh:14,bb:true});
  burst(s.x,s.y-40,40,[prof.col,'#ffd24a','#fff'],170,0,1.2);float(P.x,P.y-60,'−'+c+' €','#ff6a5a');
  chat('Postavil si billboard ('+c+' €). Ľudia v jeho okolí sa presviedčajú sami – stačí prísť po podpis.','#ffd24a');
}

// ---------- input ----------
const keys={};
addEventListener('keydown',e=>{
  if(treeOpen||$('career').style.display==='flex'){const k=e.key.toLowerCase();if(k==='escape'||k==='o'){if($('career').style.display==='flex')toggleCareer(false);else toggleOrg(false);}return;}
  if(!running)return;
  const k=e.key.toLowerCase();keys[k]=true;
  if(k==='o'){toggleOrg();}
  if(k==='e'){buyCourse();}
  if(k==='b'){buildBillboard();}
  if(k>='1'&&k<='5'){useSpell(+k-1);}
  if(k==='tab'){e.preventDefault();cycle();}
  if(k==='escape'){target=null;}
  if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault();
});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false;});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false;});
function cycle(){const l=clients.filter(c=>!c.signed).sort((a,b)=>dist(P,a)-dist(P,b)).slice(0,5);if(!l.length)return;const i=l.indexOf(target);target=l[(i+1)%l.length];}
let cam={x:0,y:0};
cv.addEventListener('pointerdown',e=>{
  if(!running)return;
  const wx=e.clientX+cam.x,wy=e.clientY+cam.y;
  let best=null,bd=36;
  for(const c of clients){if(c.signed)continue;const d=Math.hypot(c.x-wx,c.y-24-wy);if(d<bd){bd=d;best=c;}}
  if(best){target=best;return;}
  P.move={x:clamp(wx,30,WORLD.w-30),y:clamp(wy,40,WORLD.h-30)};
});

// ---------- update ----------
let now=0,spamT=6,lastTarget=null,lbT=0,statK='',acadK='',bbK='';
function update(dt){
  now+=dt;
  let mx=0,my=0;
  if(keys.w||keys.arrowup)my--;if(keys.s||keys.arrowdown)my++;if(keys.a||keys.arrowleft)mx--;if(keys.d||keys.arrowright)mx++;
  if(mx||my){P.move=null;}
  else if(P.move){const dx=P.move.x-P.x,dy=P.move.y-P.y,d=Math.hypot(dx,dy);if(d<6)P.move=null;else{mx=dx/d;my=dy/d;}}
  if(mx||my){const l=Math.hypot(mx,my);const ox=P.x,oy=P.y;P.x+=mx/l*P.speed*dt;P.y+=my/l*P.speed*dt;pushOut(P,P.r);
    if(P.move&&Math.hypot(P.x-ox,P.y-oy)<P.speed*dt*.3)P.move=null;
    if(casting){casting=null;err('Prerušené');}}
  {const atOffice=dist(P,officeDoor)<OFFICE_R;P.mana=Math.min(P.maxMana,P.mana+(atOffice?OFFICE_REGEN:MANA_REGEN)*dt);
    if(atOffice&&P.mana<P.maxMana){if(Math.random()<dt*10)parts.push({x:P.x+R(-16,16),y:P.y-R(0,30),vx:0,vy:-R(30,70),g:0,t:0,life:.7,col:pick(['#8fd0ff','#d8f0ff'])});
      if(!officeHint){officeHint=true;chat('Asistentka: „Šéfe, v kancelárii sa charizma dobíja '+(OFFICE_REGEN/MANA_REGEN)+'× rýchlejšie. Sadnite si na chvíľu.“','#8fd0ff');}}}
  for(let i=0;i<5;i++)cds[i]=Math.max(0,cds[i]-dt);
  if(P.coffee<3&&dist(P,cafeDoor)<42){P.coffee=3;float(P.x,P.y-60,'Káva ×3','#ffe9a8');burst(P.x,P.y-30,10,['#fff','#e8dcc8'],60,-80,1);chat('Barista: „Tri pressá so sebou, ako vždy.“','#ffe9a8');}
  if(casting){casting.t+=dt;const s=SPELLS[casting.i];
    if(Math.random()<dt*24)parts.push({x:P.x+R(-16,16),y:P.y+R(-4,6),vx:0,vy:-R(40,90),g:0,t:0,life:.6,col:pick(['#ffd24a','#fff2a8'])});
    const t=casting.target;P.dir=Math.abs(t.x-P.x)>Math.abs(t.y-P.y)?(t.x>P.x?'r':'l'):(t.y>P.y?'d':'u');
    if(casting.t>=s.cast){const c=casting;casting=null;finish(c.i,c.target);}}
  for(let i=clients.length-1;i>=0;i--){const c=clients[i];
    if(c.sayT>0)c.sayT-=dt;
    if(c.signed){c.fade-=dt;if(c.fade<=0){clients[i]=newClient();}continue;}
    c.ad=nearBB(c,BB_R);if(c.ad&&c.trust<100){c.trust=Math.min(100,c.trust+BB_RATE*dt);if(Math.random()<dt*3)parts.push({x:c.x+R(-14,14),y:c.y-R(10,44),vx:0,vy:-30,g:0,t:0,life:.7,col:prof.col});}
    const listening=now-c.lastHit<3.5||now-c.rHit<3.5||now-c.pHit<3.5;if(c.ptrust>0&&now-c.pHit>4.5)c.ptrust=Math.max(0,c.ptrust-2.2*c.T.decay*dt);if(c.rtrust>0&&now-c.rHit>4.5)c.rtrust=Math.max(0,c.rtrust-2.2*c.T.decay*dt);
    if(!listening){
      if(c.trust>0&&now-c.lastHit>4.5&&!c.ad){const was=c.trust;c.trust=Math.max(0,c.trust-2.2*c.T.decay*dt);if(was>=40&&c.trust<40&&Math.random()<.5)say(c,SAY.lost);}
      if(c.wait>0)c.wait-=dt;
      else{const dx=c.tx-c.x,dy=c.ty-c.y,d=Math.hypot(dx,dy);
        if(d<5){c.wait=R(1,4);const a=R(0,6.28),pull=Math.random()<.7?nearBB(c,BB_PULL):null,r=pull?R(30,110):R(80,260),ox=pull?pull.x:c.x,oy=pull?pull.y+30:c.y;let nx=clamp(ox+Math.cos(a)*r,60,WORLD.w-60),ny=clamp(oy+Math.sin(a)*r*(pull?.6:1),80,WORLD.h-60);if(inBuilding(nx,ny,20)||inPond(nx,ny,20)){nx=c.x;ny=c.y;}c.tx=nx;c.ty=ny;}
        else{c.x+=dx/d*38*dt;c.y+=dy/d*38*dt;const bx=c.x,by=c.y;pushOut(c,c.r);if(bx!==c.x||by!==c.y){c.tx=c.x;c.ty=c.y;}}}
    }
    if(c.trust>=100&&Math.random()<dt*6)parts.push({x:c.x+R(-14,14),y:c.y-R(10,44),vx:0,vy:-30,g:0,t:0,life:.7,col:'#ffd24a'});
  }
  updTeam('me',dt);updTeam('riv',dt);updTeam('par',dt);updCourse(dt);checkPara(dt);relT-=dt;if(relT<=0){relT=.5;relevel();}
  {const want=Math.min(46,8+Math.floor((agents.length+rivals.length+paras.length)*1.5));if(clients.length<want)clients.push(newClient());}
  anim(P,dt);for(const a of rivals)anim(a,dt);for(const a of paras)anim(a,dt);for(const c of clients)if(!c.signed)anim(c,dt);else c.mv=false;for(const a of agents)anim(a,dt);
  for(let i=floats.length-1;i>=0;i--){floats[i].t+=dt;if(floats[i].t>1.6)floats.splice(i,1);}
  for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.t+=dt;p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.t>p.life)parts.splice(i,1);}
  for(let i=shots.length-1;i>=0;i--){const s=shots[i];s.t+=dt/.3;if(s.t>=1){burst(s.to.x,s.to.y-26,8,s.ic==='cup'?['#fff','#e8dcc8','#c9a070']:['#ffd24a','#fff2a8'],70,0,.6);shots.splice(i,1);}}
  spamT-=dt;if(spamT<=0){spamT=R(7,13);const s=pick(SPAM);chat(s[1],s[0]);}
  if(errT>0){errT-=dt;if(errT<=0)$('err').style.opacity=0;}
  if(lvlT>0){lvlT-=dt;if(lvlT<=0)$('lvl').style.opacity=0;}
  if(tipT>0){tipT-=dt;if(tipT<=0)$('tip').textContent='';}
  if(target&&(target.signed||!clients.includes(target)))target=null;
}

// ---------- draw ----------
function label(txt,x,y,col,size,bold){ctx.font=(bold?'bold ':'')+(size+3)+'px '+FONT;ctx.textAlign='center';ctx.lineWidth=3;ctx.lineJoin='round';ctx.strokeStyle='#000';ctx.strokeText(txt,x,y);ctx.fillStyle=col;ctx.fillText(txt,x,y);}
function plate(txt,x,y){ctx.font='bold 15px '+FONT;const w=ctx.measureText(txt).width+18;
  ctx.fillStyle='#1a1410';ctx.fillRect(x-w/2-2,y-17,w+4,24);ctx.fillStyle='#c48a48';ctx.fillRect(x-w/2,y-15,w,20);ctx.fillStyle='#f4e2b0';ctx.fillRect(x-w/2+2,y-13,w-4,16);
  ctx.fillStyle='#4a2c10';ctx.textAlign='center';ctx.fillText(txt,x,y);}
function bubble(txt,x,y){ctx.font='14px '+FONT;const w=Math.ceil(ctx.measureText(txt).width)+14;x=Math.round(x);y=Math.round(y);
  ctx.fillStyle='#1a1410';ctx.fillRect(x-w/2-2,y-22,w+4,24);ctx.fillRect(x-4,y+2,8,3);ctx.fillRect(x-2,y+5,4,3);
  ctx.fillStyle='#fffdf2';ctx.fillRect(x-w/2,y-20,w,20);ctx.fillRect(x-2,y,4,3);
  ctx.fillStyle='#222';ctx.textAlign='center';ctx.fillText(txt,x,y-6);}
function draw(){
  cam.x=WORLD.w>W?clamp(P.x-W/2,0,WORLD.w-W):(WORLD.w-W)/2;
  cam.y=WORLD.h>H?clamp(P.y-20-H/2,0,WORLD.h-H):(WORLD.h-H)/2;
  ctx.setTransform(DPR,0,0,DPR,0,0);ctx.fillStyle='#1b2a17';ctx.fillRect(0,0,W,H);
  ctx.translate(-Math.round(cam.x),-Math.round(cam.y));
  ctx.imageSmoothingEnabled=false;
  ctx.drawImage(ground,0,0,LW*S,LH*S);
  // pond glints
  ctx.fillStyle='#d8f2ff';for(let i=0;i<5;i++){const gx=pond.x+Math.sin(now*.6+i*2.1)*pond.rx*.55,gy=pond.y+(i-2)*20;ctx.globalAlpha=.35+.25*Math.sin(now*2+i);ctx.fillRect(Math.round(gx/3)*3,Math.round(gy/3)*3,18,3);}
  ctx.globalAlpha=1;
  // cafe marker
  if(P.coffee<3){ctx.strokeStyle='#ffe9a8';ctx.lineWidth=3;ctx.globalAlpha=.5+.4*Math.sin(now*5);ctx.beginPath();ctx.ellipse(cafeDoor.x,cafeDoor.y,30,16,0,0,7);ctx.stroke();ctx.globalAlpha=1;}
  if(P.mana<P.maxMana-1){ctx.strokeStyle='#8fd0ff';ctx.lineWidth=3;ctx.globalAlpha=.5+.4*Math.sin(now*5);ctx.beginPath();ctx.ellipse(officeDoor.x,officeDoor.y,30,16,0,0,7);ctx.stroke();ctx.globalAlpha=1;}
  for(const b of billboards){ctx.setLineDash([9,9]);ctx.lineDashOffset=-now*15;ctx.beginPath();ctx.ellipse(b.x,b.y,BB_R,BB_R*.6,0,0,7);ctx.globalAlpha=.45;ctx.strokeStyle='#1a1410';ctx.lineWidth=5;ctx.stroke();ctx.globalAlpha=.8;ctx.strokeStyle='#fff2a8';ctx.lineWidth=2;ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;}
  if(P.move){ctx.strokeStyle='#ffd24a';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(P.move.x,P.move.y,8+Math.sin(now*8)*2,4+Math.sin(now*8),0,0,7);ctx.stroke();}
  if(target){ctx.strokeStyle='#ffd24a';ctx.lineWidth=3;ctx.setLineDash([8,6]);ctx.lineDashOffset=-now*20;ctx.beginPath();ctx.ellipse(target.x,target.y+4,24,12,0,0,7);ctx.stroke();ctx.setLineDash([]);}
  if(casting){ctx.strokeStyle='#ffd24a';ctx.globalAlpha=.6;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(P.x,P.y+4,20+Math.sin(now*12)*3,10+Math.sin(now*12)*1.5,0,0,7);ctx.stroke();ctx.globalAlpha=1;}
  // y-sorted entities and props
  const ents=statics.slice();
  for(const c of clients)ents.push({y:c.y,c});ents.push({y:P.y,e:P});for(const a of agents)if(a.state!=='in')ents.push({y:a.y,e:a});for(const a of rivals)ents.push({y:a.y,e:a});for(const a of paras)if(a.state!=='in')ents.push({y:a.y,e:a});
  ents.sort((a,b)=>a.y-b.y);
  for(const e of ents){
    if(e.spr){const w=e.spr.width*S,h=e.spr.height*S;ctx.globalAlpha=.25;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(e.x+3,e.y,e.sh*1.6,e.sh*.6,0,0,7);ctx.fill();ctx.globalAlpha=1;
      ctx.drawImage(e.spr,Math.round(e.x-w/2),Math.round(e.y-h+6),w,h);}
    else if(e.e)drawChar(e.e);
    else{const c=e.c,a=c.signed?clamp(c.fade/2,0,1):1;
      if(c.kidLook)drawChar({x:c.x+18,y:c.y+3,look:c.kidLook,dir:c.dir,mv:c.mv,wt:(c.wt||0)+.07},a,2);
      drawChar(c,a);}
  }
  for(const b of buildings)if(b.name)plate(b.name,b.x+b.w/2,b.y-12);
  if(P.coffee<3)label('Doplň kávu',cafeDoor.x,cafeDoor.y+34,'#fff',11,true);
  if(P.mana<P.maxMana-1)label('Dobi charizmu',officeDoor.x,officeDoor.y+34,'#fff',11,true);
  for(const b of billboards)plate(prof.co,b.x,b.y-126);
  // particles & projectiles
  if(fwGlow>0){ctx.fillStyle='rgba(8,8,40,'+Math.min(.5,fwGlow*.5)+')';ctx.fillRect(cam.x-2,cam.y-2,W+4,H+4);}
  for(const p of parts){ctx.globalAlpha=clamp(1-p.t/p.life,0,1);ctx.fillStyle=p.col;const z=p.sz||3;ctx.fillRect(Math.round(p.x/3)*3,Math.round(p.y/3)*3,z,z);}
  ctx.globalAlpha=1;
  for(const s of shots){const x=s.x0+(s.to.x-s.x0)*s.t,y=s.y0+(s.to.y-26-s.y0)*s.t-Math.sin(s.t*3.14)*18,sp=SPR[s.ic];if(sp)ctx.drawImage(sp,Math.round(x-sp.width*1.5),Math.round(y-sp.height*1.5),sp.width*3,sp.height*3);}
  // nameplates
  for(const c of clients){
    if(c.signed){ctx.globalAlpha=clamp(c.fade/2,0,1);label(c.lost==='par'?'U paralelnej':c.lost?'U konkurencie':'Poistený',c.x,c.y-58,c.lost==='par'?'#d9a0ff':c.lost?'#ff6a5a':'#7be05a',11,true);ctx.globalAlpha=1;}
    else{
      label(c.name,c.x,c.y-64,c===target?'#ffd24a':'#fff',11,true);
      const w=60,x=Math.round(c.x-w/2),y=Math.round(c.y-60);
      ctx.fillStyle='#1a1410';ctx.fillRect(x-2,y-2,w+4,10);ctx.fillStyle='#3a2e22';ctx.fillRect(x,y,w,6);
      const f=c.trust/100;ctx.fillStyle=f>=1?(Math.sin(now*10)>0?'#ffd24a':'#fff2a8'):f>.6?'#7be05a':f>.3?'#e0c23a':'#d4552f';
      ctx.fillRect(x,y,Math.round(w*f/3)*3,6);ctx.fillStyle='#ffffff55';ctx.fillRect(x,y,Math.round(w*f/3)*3,2);
      if(c.ptrust>0){const yy=c.rtrust>0?15:8;ctx.fillStyle='#1a1410';ctx.fillRect(x-2,y+yy,w+4,7);ctx.fillStyle='#b040ff';ctx.fillRect(x,y+yy+1,Math.round(w*c.ptrust/300)*3,4);}
      if(c.rtrust>0){ctx.fillStyle='#1a1410';ctx.fillRect(x-2,y+8,w+4,7);ctx.fillStyle='#e0483a';ctx.fillRect(x,y+9,Math.round(w*c.rtrust/300)*3,4);}
      if(f>=1&&EXC.complete&&EXC.naturalWidth)ctx.drawImage(EXC,Math.round(c.x-12),Math.round(c.y-104+Math.sin(now*6)*3),24,24);
    }
    if(!c.signed&&c.byMe&&c.byMe.target===c&&!c.byMe.trained&&!c.byMe.solo&&!c.helped&&dist(c.byMe,c)<60&&Math.sin(now*8)>-.3)label('POMÔŽ NOVÁČIKOVI!',c.x,c.y-96,'#ffe066',11,true);
    if(c.sayT>0)bubble(c.say,c.x,c.y-(c.signed?72:80));
  }
  for(const a of agents){if(a.state==='in')continue;label(a.name,a.x,a.y-64,'#7be05a',11,true);const dg=a.paraOn;if(!a.trained)label('<Nováčik · odmietnutia '+a.fails+'/2>',a.x,a.y-53,'#ffe066',9,true);else label('<Tvoj cech · L'+a.rank+(dg?' · paralelita '+Math.ceil(a.paraT)+' s':'')+'>',a.x,a.y-53,dg?'#ffb84a':'#7be05a',9,dg);}
  for(const a of paras){if(a.state==='in')continue;label(a.name,a.x,a.y-64,'#d9a0ff',11,true);label(a.leader?'<Paralelná štruktúra · L'+a.rank+'>':'<Paralelná štruktúra>',a.x,a.y-53,'#d9a0ff',9,false);}
  for(const a of rivals){label(a.name,a.x,a.y-64,'#ff6a5a',11,true);label(a.chief?'<Konkurencia · L'+a.rank+'>':'<Konkurencia>',a.x,a.y-53,'#ff6a5a',9,false);if(a.sayT>0)bubble(a.say,a.x,a.y-80);}
  if(course){const cx=acad.x+acad.w/2,cy=acad.y-34;
    if(course.phase==='gather')label('Čaká sa na členov cechu '+course.list.filter(a=>a.state==='in').length+'/'+course.list.length,cx,cy,'#c9a0ff',12,true);
    else{label('Kurz prebieha…',cx,cy,'#c9a0ff',12,true);ctx.fillStyle='#1a1410';ctx.fillRect(cx-62,cy+5,124,10);ctx.fillStyle='#c9a0ff';ctx.fillRect(cx-60,cy+7,120*clamp(course.t/2,0,1),6);}}
  label(prof.name,P.x,P.y-66,'#fff',11,true);label(title(),P.x,P.y-54,'#8fd0ff',10,false);
  for(const f of floats){ctx.globalAlpha=clamp(1.6-f.t,0,1);label(f.txt,f.x,f.y-f.t*30,f.col,13,true);}
  ctx.globalAlpha=1;
  // vignette
  ctx.setTransform(DPR,0,0,DPR,0,0);
  const vg=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.45,W/2,H/2,Math.max(W,H)*.75);vg.addColorStop(0,'rgba(20,12,0,0)');vg.addColorStop(1,'rgba(20,12,0,.45)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
  hud();
}
const mini=$('mini'),mc=mini.getContext('2d');
function hud(){
  $('ptitle').textContent='Level '+P.lvl+' · '+title();
  $('mana').firstElementChild.style.width=(P.mana/P.maxMana*100)+'%';$('mana').lastElementChild.textContent='Charizma '+Math.floor(P.mana)+'/'+P.maxMana;
  {const k=P.coffee+'|'+P.gold+'|'+P.signed+'|'+agents.length;if(k!==statK){statK=k;const ch=(i,t)=>'<div class="chip">'+ico(i,16)+t+'</div>';$('stats').innerHTML=ch('coffee',P.coffee+'/3')+ch('coins',P.gold+' €')+ch('script',P.signed)+ch('users',agents.length);}}
  if(target){$('tf').style.display='flex';$('tname').textContent=target.name;
    if(target!==lastTarget)portrait($('tp'),target.look);
    const T=target.T;$('ttype').textContent=T.t+' · '+(T.coffee>1.1?'ľúbi kávu':T.promise>1.1?'verí sľubom':T.coffee<.7&&T.promise<.7?'neverí nikomu':'bežný klient');
    $('trust').firstElementChild.style.width=target.trust+'%';$('trust').lastElementChild.textContent='Dôvera '+Math.floor(target.trust)+' %';
    $('rtrust').style.display=target.rtrust>0?'block':'none';$('rtrust').firstElementChild.style.width=target.rtrust+'%';
    $('ptrust').style.display=target.ptrust>0?'block':'none';$('ptrust').firstElementChild.style.width=target.ptrust+'%';}
  else $('tf').style.display='none';
  lastTarget=target;
  $('quest').innerHTML='<b>Mesačný plán</b><br>Uzavri zmluvy: '+quest.done+'/'+quest.need+'<br><span style="color:#cdbf9a">Odmena: '+quest.reward+' €</span>';
  lbT-=1/60;if(lbT<=0){lbT=.3;const myQ=reqInfo(P.inc,subRanks(agents,null),P.lvl+1),pr=(l,a)=>{const q=reqInfo(a.inc,subRanks(l,a),a.rank+1);return q?q.prog:1;};
    const E=[{n:esc(prof.name),l:P.lvl,p:myQ?myQ.prog:1,c:'#7be05a',me:1}];
    if(rivals.length)E.push({n:'Konkurencia',l:rivals[0].rank,p:pr(rivals,rivals[0]),c:'#ff6a5a'});
    for(const a of paras)if(a.leader)E.push({n:'Paralelná · '+a.name,l:a.rank,p:pr(paras,a),c:'#d9a0ff'});
    agents.filter(a=>a.trained).map(a=>({a,v:a.rank+pr(agents,a)*.99})).sort((x,y)=>y.v-x.v).slice(0,3).forEach(o=>E.push({n:'Cech · '+o.a.name,l:o.a.rank,p:o.v-o.a.rank,c:o.a.paraOn?'#ffb84a':'#9fd0ff'}));
    if(myQ){const fmt=o=>o.map(x=>x[1]+'× L'+x[0]).join(' + ');
      $('req').innerHTML='<h4>POSTUP NA L'+(P.lvl+1)+'</h4><div class="'+(myQ.incOk?'ok':'no')+'">Príjem: '+Math.floor(P.inc)+' / '+myQ.r.inc+' €</div>'+myQ.r.opts.map((o,k)=>(k?'<div class="or">alebo</div>':'')+'<div class="'+(myQ.ps[k][0]>=myQ.ps[k][1]?'ok':'no')+'">Pod tebou: '+fmt(o)+' ('+myQ.ps[k][0]+'/'+myQ.ps[k][1]+')</div>').join('');}
    else $('req').innerHTML='<h4>NAJVYŠŠÍ LEVEL</h4>';
    E.sort((a,b)=>b.l+b.p-a.l-a.p);
    $('lb').innerHTML='<h4>'+ico('trophy',12)+' REBRÍČEK · CIEĽ L'+MAXLVL+'</h4>'+E.map((e,i)=>'<div class="lr'+(e.me?' me':'')+'"><i>'+(i+1)+'.</i><span style="color:'+e.c+'">'+e.n+'</span><b>L'+e.l+'</b><em><u style="width:'+Math.floor(clamp(e.p,0,1)*100)+'%;background:'+e.c+'"></u></em></div>').join('');}
  $('warn').style.display=warnTxt?'block':'none';if(warnTxt)$('warn').textContent=warnTxt;
  $('warn').style.display=warnTxt?'block':'none';if(warnTxt)$('warn').textContent=warnTxt;
  const ab2=$('acadbtn'),near=running&&!course&&dist(P,acadDoor)<70;ab2.style.display=near?'block':'none';if(!near)acadK='';
  if(near){const cc=courseCost(),k=cc+'|'+agents.length+'|'+(P.gold>=cc);ab2.classList.toggle('no',!agents.length||P.gold<cc);if(k!==acadK){acadK=k;ab2.innerHTML=agents.length?ico('teach',14)+' KURZ PRE CECH · '+cc+' € (E)<small>Všetci členovia +1 úroveň rýchlosti</small>':ico('teach',14)+' AKADÉMIA<small>Najprv niekoho prijmi do cechu</small>';}}
  {const bb=$('bbbtn'),cc=bbCost(),full=billboards.length>=MAXBB,k=cc+'|'+billboards.length+'|'+(P.gold>=cc);bb.classList.toggle('no',full||P.gold<cc);
    if(k!==bbK){bbK=k;bb.innerHTML=ico('billboard',12)+' BILLBOARD (B)<small>'+(full?'postavené '+MAXBB+'/'+MAXBB:cc+' € · '+billboards.length+'/'+MAXBB)+'</small>';}}
  {const nq=REQ[P.lvl+1];$('xp').firstElementChild.style.width=(nq?Math.min(1,P.inc/nq.inc)*100:100)+'%';$('xp').lastElementChild.textContent=nq?'Príjem '+Math.floor(P.inc)+' / '+nq.inc+' €':'Príjem '+Math.floor(P.inc)+' €';}
  SPELLS.forEach((s,i)=>{const el=spEls[i];const ok=!!target&&P.mana>=s.mana&&(!s.coffee||P.coffee>0)&&(!(s.sign||s.recruit)||(target.trust>=100))&&(!s.recruit||(P.gold>=recruitCost()&&agents.length<MAXA))&&dist(P,target)<=s.range;
    el.classList.toggle('off',!ok);el.classList.toggle('rdy',!!(ok&&(s.sign||s.recruit)));
    el.children[1].textContent=s.coffee?P.coffee:'';el.children[2].style.height=(cds[i]/s.cd*100)+'%';});
  const cb=$('cast');if(casting){const s=SPELLS[casting.i];cb.style.visibility='visible';cb.firstElementChild.style.width=(casting.t/s.cast*100)+'%';cb.lastElementChild.textContent=s.name;}else cb.style.visibility='hidden';
  const s=144/WORLD.w,oy=0;mc.imageSmoothingEnabled=false;
  mc.drawImage(ground,0,0,144,104);
  for(const c of clients){if(c.signed)continue;mc.fillStyle='#000';mc.fillRect(c.x*s-2.5,oy+c.y*s-2.5,5,5);mc.fillStyle=c.trust>=100?'#fff':'#ffd24a';mc.fillRect(c.x*s-1.5,oy+c.y*s-1.5,3,3);}
  mc.fillStyle='#7be05a';for(const a of agents)if(a.state!=='in')mc.fillRect(a.x*s-2,oy+a.y*s-2,4,4);
  mc.fillStyle='#ff3a2a';for(const a of rivals)mc.fillRect(a.x*s-2,oy+a.y*s-2,4,4);
  mc.fillStyle='#b040ff';for(const a of paras)mc.fillRect(a.x*s-2,oy+a.y*s-2,4,4);
  for(const b of billboards){mc.fillStyle='#000';mc.fillRect(b.x*s-3.5,oy+b.y*s-3.5,7,7);mc.fillStyle=prof.col;mc.fillRect(b.x*s-2.5,oy+b.y*s-2.5,5,5);}
  mc.fillStyle='#5ab0ff';mc.strokeStyle='#000';mc.lineWidth=1.5;mc.beginPath();mc.arc(P.x*s,oy+P.y*s,3.5,0,7);mc.fill();mc.stroke();
}

// ---------- start menu wizard: title, character, company, tutorial pages ----------
const STEPS=document.querySelectorAll('#start .stp'),LAST=STEPS.length-1;let stepIdx=0,lcol=2,painting=false;
function applyProf(){
  P.look=Object.assign({},prof.look);office.name=prof.co;
  drawLogo(logoCanvas,prof.logo,'');drawLogo($('pl'),prof.logo,'#fff');
  portrait($('pp'),P.look);
  $('pname').textContent=prof.name;
  $('quick').innerHTML='RÝCHLO DO HRY<small>'+esc(prof.name)+' · '+esc(prof.co)+'</small>';
  BBSPR=mkBillboard();for(const s of statics)if(s.bb)s.spr=BBSPR;
}
function crRender(){
  const grid=$('lgrid');if(!grid.children.length){let h='';for(let i=0;i<LOGO_N*LOGO_N;i++)h+='<i data-i="'+i+'"></i>';grid.innerHTML=h;}
  for(let i=0;i<LOGO_N*LOGO_N;i++)grid.children[i].style.background=LOGO_PAL[prof.logo[i]]||'transparent';
  const sw=(cls,c,attrs)=>'<span class="sw'+(c?'':' none')+cls+'" '+attrs+(c?' style="background:'+c+'"':'')+'></span>';
  $('lpal').innerHTML=LOGO_PAL.map((c,i)=>sw(i===lcol?' on':'',c,'data-c="'+i+'"')).join('');
  $('cocol').innerHTML=CO_COLS.map(c=>sw(c===prof.col?' on':'',c,'data-col="'+c+'"')).join('');
  $('lpre').innerHTML=Object.keys(LOGO_PRESETS).map(k=>'<span class="opt" data-p="'+k+'">'+LOGO_NAMES[k]+'</span>').join('')+'<span class="opt" data-p="">Vymazať</span>';
  $('copts').innerHTML=LOOK_OPTS.filter(o=>o.k!=='hat'||prof.look.style==='cap').map(o=>'<div class="row"><span>'+o.l+'</span><div class="sws">'+
    (o.sw?o.sw.map(c=>sw((prof.look[o.k]||'')===c?' on':'',c,'data-k="'+o.k+'" data-v="'+c+'"')).join(''):o.opt.map(p=>'<span class="opt'+((prof.look[o.k]||0)===p[0]?' on':'')+'" data-k="'+o.k+'" data-v="'+p[0]+'">'+p[1]+'</span>').join(''))+'</div></div>').join('');
  drawLogo($('lprev'),prof.logo,'#fff');
}
function commitProf(){prof.co=($('coname').value.trim()||pick(CO_NAMES)).slice(0,20);prof.name=($('agname').value.trim()||pick(AG_NAMES)).slice(0,16);$('coname').value=prof.co;$('agname').value=prof.name;applyProf();saveProf();}
function showStep(i){
  commitProf();stepIdx=clamp(i,0,LAST);
  STEPS.forEach((s,k)=>s.classList.toggle('on',k===stepIdx));
  const tut=stepIdx>=3&&stepIdx<LAST;
  $('snav').style.display=stepIdx?'flex':'none';$('sdots').style.display=stepIdx?'flex':'none';$('sskip').style.display=tut?'inline-block':'none';
  $('snext').textContent=stepIdx===LAST?'VSTÚPIŤ DO SVETA':'ĎALEJ';
  $('sdots').innerHTML=Array.from({length:LAST},(_,k)=>'<i'+(k+1===stepIdx?' class="on"':'')+'></i>').join('');
}
function paint(e){const t=document.elementFromPoint(e.clientX,e.clientY);if(!t||t.parentNode!==$('lgrid'))return;const i=+t.dataset.i;if(prof.logo[i]===lcol)return;prof.logo[i]=lcol;t.style.background=LOGO_PAL[lcol]||'transparent';drawLogo($('lprev'),prof.logo,'#fff');}
function drawPreview(){const g=$('cprev').getContext('2d'),t=performance.now()/1000,d=[0,2,1,2][Math.floor(t/1.3)%4],f=1+Math.floor(t*4)%2;g.imageSmoothingEnabled=false;g.clearRect(0,0,FW,FH);g.drawImage(sheet(prof.look),f*FW,d*FH,FW,FH,0,0,FW,FH);}
$('cocol').addEventListener('click',e=>{const t=e.target.closest('[data-col]');if(t){prof.col=t.dataset.col;crRender();}});
$('lpal').addEventListener('click',e=>{const t=e.target.closest('[data-c]');if(t){lcol=+t.dataset.c;crRender();}});
$('lpre').addEventListener('click',e=>{const t=e.target.closest('[data-p]');if(t){prof.logo=logoFrom(t.dataset.p);crRender();}});
$('lgrid').addEventListener('pointerdown',e=>{e.preventDefault();painting=true;paint(e);});
$('lgrid').addEventListener('pointermove',e=>{if(painting)paint(e);});
addEventListener('pointerup',()=>{painting=false;});
$('copts').addEventListener('click',e=>{const t=e.target.closest('[data-k]');if(!t)return;const o=LOOK_OPTS.find(x=>x.k===t.dataset.k);prof.look[o.k]=o.sw?t.dataset.v:o.opt.find(p=>String(p[0])===t.dataset.v)[0];crRender();});
$('coname').value=prof.co;$('agname').value=prof.name;$('quick').style.display=hasSaved?'inline-block':'none';
applyProf();crRender();showStep(0);
$('orgbtn').addEventListener('pointerdown',e=>{e.preventDefault();if(running||treeOpen)toggleOrg();});
$('tclose').addEventListener('click',()=>toggleOrg(false));
$('ttabs').addEventListener('click',e=>{const t=e.target.closest('[data-t]');if(t){treeTab=t.dataset.t;renderTree();}});
$('tcareer').addEventListener('click',()=>toggleCareer(true));
document.querySelectorAll('.cbtn').forEach(b=>b.addEventListener('click',()=>toggleCareer(true)));
$('cclose').addEventListener('click',()=>toggleCareer(false));
$('acadbtn').addEventListener('pointerdown',e=>{e.preventDefault();buyCourse();});
$('bbbtn').addEventListener('pointerdown',e=>{e.preventDefault();buildBillboard();});
$('endb').addEventListener('click',()=>{$('end').style.display='none';running=true;});
$('endn').addEventListener('click',()=>{try{location.reload();}catch(e){}});
window.__pc={toggleOrg,P,agents,rivals,paras,clients,update,buyCourse,mkAgent,acadDoor,relevel,officeDoor,buildBillboard,billboards,prof,applyProf,showStep,commitProf,enterGame,get s(){return{pl:P.lvl,inc:Math.floor(P.inc),rl:rivals.length?rivals[0].rank:0,rinc:rivals.length?Math.floor(rivals[0].inc):0,pal:paras.filter(a=>a.leader).map(a=>a.rank).join('/'),paraCount,ended,gold:P.gold,ranks:agents.map(a=>a.trained?a.rank:'n').join('')}}};
let last=0;
function loop(ts){const dt=Math.min(.05,(ts-last)/1000||0);last=ts;if(scareT>0){scareT-=dt;if(scareT<=0)$('scare').classList.remove('on');}else if(running)update(dt);if(stepIdx===1&&!running)drawPreview();draw();requestAnimationFrame(loop);}
requestAnimationFrame(loop);
function enterGame(){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}
  commitProf();$('start').style.display='none';running=true;
  chat('Vitaj v hre Insurance Tycoon, '+prof.name+'! Firma '+prof.co+' práve otvorila kanceláriu.','#ffd24a');chat('Cechmajster šepká: „Zober kávu a choď medzi ľudí. Tri zmluvy do konca mesiaca.“','#ff9ad5');}
$('snew').addEventListener('click',()=>showStep(1));
$('quick').addEventListener('click',enterGame);
$('sback').addEventListener('click',()=>showStep(stepIdx-1));
$('snext').addEventListener('click',()=>stepIdx===LAST?enterGame():showStep(stepIdx+1));
$('sskip').addEventListener('click',enterGame);
})();
