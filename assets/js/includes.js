
async function includePart(id,file){const el=document.getElementById(id); if(!el)return; try{const r=await fetch(file,{cache:'no-cache'}); if(r.ok){el.innerHTML=await r.text(); initMenu();}}catch(e){initMenu();}}
function initMenu(){const t=document.querySelector('.mobile-toggle'); const m=document.querySelector('.menu'); if(t&&m&&!t.dataset.ready){t.dataset.ready=1;t.onclick=()=>m.classList.toggle('open')} document.querySelectorAll('.dropbtn').forEach(b=>{if(!b.dataset.ready){b.dataset.ready=1;b.onclick=(e)=>{if(innerWidth<850){e.preventDefault();b.parentElement.classList.toggle('open')}}}})}
document.addEventListener('DOMContentLoaded',()=>{includePart('menu-placeholder','/menu.html');includePart('footer-placeholder','/footer.html');initMenu();});
