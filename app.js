// Parallax + reveals + countdown + demo checkout modal
(function(){
  // Stronger parallax for hero
  const media = document.querySelector('.hero-media');
  if (media){
    window.addEventListener('scroll', () => {
      media.style.transform = `translateY(${window.scrollY * 0.35}px)`; // stronger effect
    }, { passive:true });
  }

  // Scroll reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); }
    });
  }, { threshold: .18 });
  document.querySelectorAll('.reveal').forEach(n=>io.observe(n));

  // Countdown to next 1st Saturday 8am
  function firstSat(y,m){ const d=new Date(y,m,1); const off=(6-d.getDay()+7)%7; d.setDate(1+off); d.setHours(8,0,0,0); return d; }
  function nextFirstSaturday(){
    const now=new Date(); let y=now.getFullYear(), m=now.getMonth();
    let d=firstSat(y,m); if(d<=now){ m++; if(m>11){m=0;y++;} d=firstSat(y,m); } return d;
  }
  function tick(){
    const t=nextFirstSaturday().getTime(), now=Date.now(), diff=Math.max(0,t-now);
    const s=Math.floor(diff/1000)%60, mi=Math.floor(diff/1000/60)%60, h=Math.floor(diff/1000/60/60)%24, d=Math.floor(diff/1000/60/60/24);
    const el=document.querySelector('.js-countdown'); if(el) el.textContent=`${d}d ${h}h ${mi}m ${s}s`;
  }
  setInterval(tick,1000); tick();

  // Generate next five future dates
  function nextFive(){
    const out=[]; const now=new Date();
    for(let i=0;i<8 && out.length<5;i++){
      const d=new Date(now.getFullYear(), now.getMonth()+i, 1);
      const off=(6 - d.getDay() + 7)%7; d.setDate(1+off); d.setHours(8,0,0,0);
      if(d>now) out.push(d);
    } return out;
  }
  const list=document.querySelector('.js-market-dates');
  if(list){
    nextFive().forEach(d=>{
      const div=document.createElement('div');
      div.className='mk reveal';
      div.innerHTML=`<div class="img" style="background-image:url('https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?q=80&w=1400&auto=format&fit=crop')"></div>
      <div class="pad"><strong>Danville Farmers’ Market</strong><br><span>${d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} • 8:00 AM – 1:00 PM</span></div>`;
      list.appendChild(div);
    });
  }

  // Demo checkout modal (placeholder until Stripe)
  document.querySelectorAll('[data-buy]').forEach(btn=>{
    btn.addEventListener('click',()=>{ document.querySelector('.modal')?.classList.add('show'); });
  });
  document.querySelectorAll('[data-close]').forEach(btn=>{
    btn.addEventListener('click',()=>{ document.querySelector('.modal')?.classList.remove('show'); });
  });
})();
