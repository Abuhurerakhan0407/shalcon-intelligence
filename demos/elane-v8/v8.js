(()=>{
  'use strict';
  const $=(s,c=document)=>c.querySelector(s);
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  const space=$('#space');
  const finder=$('#finder');
  if(!space||!finder)return;

  let vh=innerHeight,vw=innerWidth,ticking=false;
  const progress=(el)=>{
    const top=el.offsetTop;
    const range=Math.max(1,el.offsetHeight-vh);
    return clamp(((scrollY||document.documentElement.scrollTop)-top)/range);
  };

  function render(){
    ticking=false;
    vh=innerHeight;vw=innerWidth;
    const mobile=vw<=900;

    /* Finder: quiet reveal. Keep heading completely inside its section. */
    const fr=finder.getBoundingClientRect();
    const fp=clamp((vh-fr.top)/(vh+fr.height*.42));
    const media=$('.finder-right');
    const heading=$('.finder-left h2');
    if(media){
      media.style.transform=`translate3d(0,${lerp(2,-1,ease(fp))}%,0) scale(${lerp(1.025,1,ease(fp))})`;
    }
    if(heading){
      heading.style.transform=`translate3d(0,${lerp(18,0,ease(fp))}px,0)`;
      heading.style.opacity=lerp(.5,1,fp);
    }

    /* Space: horizontal entrances only. No upward drift, and final positions live below the heading. */
    const p=progress(space);
    const a=$('.space-shot.a'),b=$('.space-shot.b'),c=$('.space-shot.c');
    const pa=ease(clamp((p-.08)/.56));
    const pb=ease(clamp((p-.18)/.56));
    const pc=ease(clamp((p-.28)/.54));
    if(a)a.style.transform=`translate3d(${lerp(mobile?105:68,0,pa)}vw,0,0) rotate(${lerp(1.2,0,pa)}deg)`;
    if(b)b.style.transform=`translate3d(${lerp(mobile?-92:-62,0,pb)}vw,0,0) rotate(${lerp(-1.1,0,pb)}deg)`;
    if(c)c.style.transform=`translate3d(${lerp(mobile?88:58,0,pc)}vw,0,0) rotate(${lerp(.8,0,pc)}deg)`;
    const title=$('.space-stage h2');
    if(title)title.style.transform=`translate3d(0,${lerp(10,0,ease(clamp(p/.32)))}px,0)`;
  }

  function request(){if(!ticking){ticking=true;requestAnimationFrame(render)}}
  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request,{passive:true});
  addEventListener('orientationchange',()=>setTimeout(request,240),{passive:true});
  request();
  setTimeout(request,720);
})();
