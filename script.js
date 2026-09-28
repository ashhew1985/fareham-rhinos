const matches=[
 {kind:"result",label:"Recent Result",opponent:"Bury",score:"62 – 54",meta:"National League"},
 {kind:"result",label:"Recent Result",opponent:"Leeds",score:"58 – 61",meta:"National League"},
 {kind:"fixture",label:"Next Fixture",opponent:"Portsmouth",score:"VS",meta:"Date & time TBC"},
 {kind:"fixture",label:"Next Fixture",opponent:"Guildford",score:"VS",meta:"Date & time TBC"}
];
document.getElementById("match-grid").innerHTML=matches.map(m=>`<article class="match-card ${m.kind}"><div class="match-type">${m.label}</div><div class="match-team">Rhinos <span class="orange">${m.kind==="fixture"?"v":""}</span> ${m.opponent}</div><div class="match-score">${m.score}</div><div class="match-meta">${m.meta}</div></article>`).join("");
document.getElementById("year").textContent=new Date().getFullYear();
const menu=document.querySelector(".menu"),nav=document.querySelector("nav");menu.addEventListener("click",()=>{nav.classList.toggle("open");menu.setAttribute("aria-expanded",nav.classList.contains("open"))});