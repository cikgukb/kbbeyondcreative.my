(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const a={threshold:.1},l=new IntersectionObserver(o=>{o.forEach(r=>{r.isIntersecting&&r.target.classList.add("animate-in")})},a);document.querySelectorAll("section").forEach(o=>{o.classList.add("reveal"),l.observe(o)});const i=document.createElement("style");i.textContent=`
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;document.head.appendChild(i);console.log("KB Beyond Creative Website Loaded");
