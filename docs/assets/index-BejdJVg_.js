(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();function S(t,e,o){const a=new google.visualization.DataTable;a.addColumn("number","Count");for(let i of o)a.addRow([i]);const n={title:t,width:420,height:320,legend:{position:"none"},hAxis:{showTextEvery:Math.floor(10)}},r=document.getElementById(e);new google.visualization.Histogram(r).draw(a,n)}function y(t,e,o,a,n,r,s){var i=google.visualization.arrayToDataTable([["Distribution","Avg Mean Difference %","Avg Std Dev Difference %"],["Uniform",o.mean*100,o.stddev*100],["Symmetric",a.mean*100,a.stddev*100],["Skewed",n.mean*100,n.stddev*100]]),c={chart:{title:t,subtitle:"Lower is better"},bars:"horizontal",hAxis:{format:"decimal",viewWindow:{min:r,max:s}},width:1280,height:400,colors:["#89138a","#e6bb18"]},l=new google.charts.Bar(document.getElementById(e));l.draw(i,google.charts.Bar.convertOptions(c))}function d(t){return document.getElementById(t)}function h(t,e=!0){const o=d(t),a=o.value;let n=Math.floor(Math.abs(parseInt(a)));return(isNaN(n)||n<0)&&(n=0),e&&n===0&&(n=1),o.value=n,n}function C(){d("start-button").style.display="block",["population-chart-section","samples-progress-bar-section","comparison-section"].forEach(t=>{d(t).style.display="none"})}function N(){d("population-chart-section").style.display="flex"}function T(t,e,o=!1){const a=Math.floor(t/e*100),n=d("samples-progress-bar");n.style.width=`${a}%`,n.innerText=`${a}%`;const r=d("samples-progress-bar-text");r.innerText="Generating Samples..."}function $(){d("samples-progress-bar-section").style.display="block"}function z(){d("comparison-section").style.display="block"}function E(t){t?d("start-button").disabled="":d("start-button").disabled="disabled"}function M(t,e){d(t).value=`Mean     ${e.mean.toFixed(2)}
SD       ${e.stddev.toFixed(2)}

Median   ${e.median.toFixed(2)}
MAD1     ${e.mad1.toFixed(2)}
MAD2     ${e.mad2.toFixed(2)}`}function U(t){return Math.floor(t*1.25+Math.random()*t/3)}function P(t,e,o){const a=[];for(let n=0;n<t;n++)a.push(Math.floor(e()*t));for(let n=0;n<o;n++)a.push(U(t));return a}function G(t,e){return P(t,()=>Math.random(),e)}function q(t,e){return P(t,()=>(Math.random()+Math.random()+Math.random()+Math.random())/4,e)}function R(t,e){return P(t,()=>Math.max(Math.random(),Math.random(),Math.random(),Math.random()),e)}function _(t){return t%2}function j(t,e){return Math.sqrt(t.map(o=>(o-e)**2).reduce((o,a)=>o+a,0)/t.length)}function H(t,e){return k(t.map(o=>Math.abs(o-e)))}function K(t,e){return t.map(o=>Math.abs(o-e)).reduce((o,a)=>o+a,0)/t.length}function k(t){const e=t.sort((o,a)=>o-a);return _(e.length)?e[Math.floor(e.length/2)]:(e[e.length/2-1]+e[e.length/2])/2}function m(t,e=!1){const o=t.reduce((i,c)=>i+c,0)/(e?t.length:t.length-1),a=j(t,o),n=k(t),r=H(t,n),s=K(t,n);return{median:n,mean:o,stddev:a,mad1:r,mad2:s}}function W(t){const e=[...t];for(let o=e.length-1;o>0;o-=1){const a=Math.floor(Math.random()*(o+1)),n=e[a],r=e[o];e[o]=n,e[a]=r}return e}function v(t,e){return W(t).slice(0,e)}function b(t,e){return t.map(o=>Math.abs(o-e)/e)}function D(t,e){const o=e.map(f=>f.stddev),a=e.map(f=>f.mad1),n=e.map(f=>f.mad2),r=b(o,t.stddev),s=b(a,t.mad1),i=b(n,t.mad2),c=m(r),l=m(s),u=m(i);return{stddevPercentDiffStats:c,mad1PercentDiffStats:l,mad2PercentDiffStats:u}}function X(t,e,o){let a=Number.MAX_SAFE_INTEGER,n=0;for(let r of[t,e,o])for(let s of["stddevPercentDiffStats","mad1PercentDiffStats","mad2PercentDiffStats"]){const i=r[s],c=Math.min(i.mean,i.stddev),l=Math.max(i.mean,i.stddev);c<a&&(a=c),l>n&&(n=l)}return[Math.floor(a*100),Math.ceil(n*100)]}google.charts.load("current",{packages:["corechart","bar"]});google.charts.setOnLoadCallback(()=>{C(),setTimeout(()=>{document.getElementById("start-button").click()},1)});document.getElementById("parameters-form").addEventListener("submit",t=>{t.preventDefault(),C(),setTimeout(()=>J(),33)});function J(){E(!1);const t=h("population-size"),e=h("sample-size"),o=h("sample-count"),a=h("outliers-count",!1),n=G(t,a),r=q(t,a),s=R(t,a);S("Uniform Population","popchart-uniform",n),S("Symmetric Population","popchart-symmetric",r),S("Skewed Population","popchart-skewed",s);const i=m(n,!0),c=m(r,!0),l=m(s,!0);M("population-uniform-stats",i),M("population-symmetric-stats",c),M("population-skewed-stats",l),N(),setTimeout(()=>{const u=[],f=[],w=[];function B(){const g=v(n,e),x=m(g);u.push(x);const O=v(r,e),F=m(O);f.push(F);const L=v(s,e),I=m(L);w.push(I)}let p=0;function A(){const g=Date.now();for(;p<o&&(p+=1,B(),!(Date.now()-g>100)););T(p,o),p>=o?(T(p,o,!0),Q(i,c,l,u,f,w)):setTimeout(A,1)}$(),A()},33)}function Q(t,e,o,a,n,r){const s=D(t,a),i=D(e,n),c=D(o,r),[l,u]=X(s,i,c);y("Standard Deviation Percent Difference","stddev-comparison-chart",s.stddevPercentDiffStats,i.stddevPercentDiffStats,c.stddevPercentDiffStats,l,u),y("Median Absolute Deviation #1 Percent Difference","mad1-comparison-chart",s.mad1PercentDiffStats,i.mad1PercentDiffStats,c.mad1PercentDiffStats,l,u),y("Median Absolute Deviation #2 Percent Difference","mad2-comparison-chart",s.mad2PercentDiffStats,i.mad2PercentDiffStats,c.mad2PercentDiffStats,l,u),z(),E(!0)}