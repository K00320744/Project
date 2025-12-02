// Theme toggle (persist)
const root = document.documentElement;
function setTheme(mode){
  if(mode === 'light') root.classList.add('light');
  else root.classList.remove('light');
  localStorage.setItem('acg_theme', mode);
}
document.addEventListener('DOMContentLoaded', ()=>{
  const mode = localStorage.getItem('acg_theme') || 'dark';
  setTheme(mode);
  // init reveal and progress
  revealInit();
  progressInit();
  setDemoThumbs();
  initAdminChart();
});

// theme toggle button
document.addEventListener('click', e=>{
  if(e.target.matches('.theme-btn')){
    const now = root.classList.contains('light') ? 'light' : 'dark';
    setTheme(now === 'light' ? 'dark' : 'light');
  }
  // hamburger
  if(e.target.matches('.hamburger')){
    document.querySelector('.header-nav')?.classList.toggle('show');
  }
});

// reveal on scroll
function revealInit(){
  const els = document.querySelectorAll('.reveal');
  const onScroll = ()=>{
    const h = window.innerHeight;
    els.forEach(el=>{
      const r = el.getBoundingClientRect();
      if(r.top < h - 80) el.classList.add('visible');
    });
  };
  onScroll();
  window.addEventListener('scroll', onScroll);
}

// reading progress
function progressInit(){
  const bar = document.querySelector('.progress-bar');
  if(!bar) return;
  const update = ()=>{
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const sc = window.scrollY;
    const pct = h ? (sc / h) * 100 : 0;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', update);
  update();
}

// demo login
function login(){
  const email = document.getElementById('email')?.value || '';
  const pwd = document.getElementById('password')?.value || '';
  if(email === 'admin@example.com' && pwd === '123456'){
    window.location.href = 'admin.html';
    return;
  }
  alert('Demo credentials: admin@example.com / 123456');
  const btn = document.querySelector('.btn');
  if(btn) btn.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}], {duration:320});
}

// Chart.js admin (if present)
function initAdminChart(){
  const ctx = document.getElementById('activityChart');
  if(!ctx) return;
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const data = [12,28,18,45,65,50,70];
  new Chart(ctx, {
    type:'line',
    data:{
      labels,
      datasets:[{
        label:'Visits',
        data,
        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-c') || '#00f0ff',
        backgroundColor:'rgba(0,240,255,0.06)',
        tension:0.36,
        borderWidth:3,
        pointRadius:3
      }]
    },
    options:{
      plugins:{legend:{display:false}},
      scales:{ y:{ grid:{color:'rgba(255,255,255,0.03)'}, ticks:{color:getComputedStyle(document.documentElement).getPropertyValue('--muted')||'#aeb6d6'} }, x:{ ticks:{color:getComputedStyle(document.documentElement).getPropertyValue('--muted')||'#aeb6d6'} } }
    }
  });
}

// demo thumbs placeholders
function setDemoThumbs(){
  document.querySelectorAll('.thumb').forEach((el,i)=>{
    if(!el.style.backgroundImage) el.style.backgroundImage = `url('https://picsum.photos/seed/acg${i}/900/600')`;
  });
}
