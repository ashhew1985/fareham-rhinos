async function loadMatchCentre(){
  const grid=document.getElementById("match-grid");
  try{
    const response=await fetch("fixtures.json",{cache:"no-store"});
    if(!response.ok) throw new Error("Fixture data unavailable");
    const {matches}=await response.json();
    const completed=matches.filter(m=>m.status==="completed").sort((a,b)=>new Date(b.date+"T"+(b.time||"00:00"))-new Date(a.date+"T"+(a.time||"00:00"))).slice(0,2).reverse();
    const upcoming=matches.filter(m=>m.status==="upcoming").sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,2);
    const cards=[...completed,...upcoming];
    grid.innerHTML=cards.map(renderCard).join("");
  }catch(error){
    grid.innerHTML='<article class="match-card"><div class="match-type">Match centre</div><div class="match-team">Fixtures temporarily unavailable</div></article>';
  }
}
function prettyDate(date){return new Date(date+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}
function renderCard(m){
  if(m.status==="completed"){
    const result=m.rhinosScore>m.opponentScore?"WIN":m.rhinosScore<m.opponentScore?"LOSS":"DRAW";
    return `<article class="match-card result">
      <div class="match-type">Recent Result · ${result}</div>
      <div class="match-versus"><span>RHINOS BLACK</span><strong>${m.rhinosScore} – ${m.opponentScore}</strong><span>${m.opponent}</span></div>
      <div class="match-meta">${prettyDate(m.date)} · ${m.time}<br>${m.competition}</div>
    </article>`;
  }
  if(m.type==="tournament"){
    return `<article class="match-card fixture tournament">
      <div class="match-type">Up Next · Tournament</div>
      <div class="tournament-mark">🏆</div>
      <div class="match-team">${m.competition}</div>
      <div class="match-meta">${prettyDate(m.date)} – ${new Date(m.endDate+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}<br>${m.venue}, ${m.location}</div>
    </article>`;
  }
  return "";
}
loadMatchCentre();
document.getElementById("year").textContent=new Date().getFullYear();
const menu=document.querySelector(".menu"),nav=document.querySelector("nav");
menu.addEventListener("click",()=>{nav.classList.toggle("open");menu.setAttribute("aria-expanded",nav.classList.contains("open"))});