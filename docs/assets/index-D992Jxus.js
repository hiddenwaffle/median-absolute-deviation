(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();function h(t,e,o){const a=new google.visualization.DataTable;a.addColumn("number","Count");for(let i of o)a.addRow([i]);const n={title:t,width:420,height:320,legend:{position:"none"},hAxis:{showTextEvery:Math.floor(10)}},r=document.getElementById(e);new google.visualization.Histogram(r).draw(a,n)}function S(t,e,o,a,n,r,s){var i=google.visualization.arrayToDataTable([["Distribution","Avg Mean Difference %","Avg Std Dev Difference %"],["Uniform",o.mean*100,o.stddev*100],["Symmetric",a.mean*100,a.stddev*100],["Skewed",n.mean*100,n.stddev*100]]),c={chart:{title:t,subtitle:"Lower is better"},bars:"horizontal",hAxis:{format:"decimal",viewWindow:{min:r,max:s}},width:1280,height:400,colors:["#89138a","#e6bb18"]},d=new google.charts.Bar(document.getElementById(e));d.draw(i,google.charts.Bar.convertOptions(c))}function f(t){return document.getElementById(t)}function p(t,e=!0){const o=f(t),a=o.value;let n=Math.floor(Math.abs(parseInt(a)));return(isNaN(n)||n<0)&&(n=0),e&&n===0&&(n=1),o.value=n,n}function w(){f("start-button").style.display="block",["population-chart-section","comparison-section"].forEach(t=>{f(t).style.display="none"})}function L(){f("population-chart-section").style.display="flex"}function B(){f("comparison-section").style.display="block"}function A(t){t?f("start-button").disabled="":f("start-button").disabled="disabled"}function g(t,e){f(t).value=`Mean     ${e.mean.toFixed(2)}
SD       ${e.stddev.toFixed(2)}

Median   ${e.median.toFixed(2)}
MAD1     ${e.mad1.toFixed(2)}
MAD2     ${e.mad2.toFixed(2)}`}function I(t){return Math.floor(t*1.25+Math.random()*t/3)}function D(t,e,o){const a=[];for(let n=0;n<t;n++)a.push(Math.floor(e()*t));for(let n=0;n<o;n++)a.push(I(t));return a}function N(t,e){return D(t,()=>Math.random(),e)}function z(t,e){return D(t,()=>(Math.random()+Math.random()+Math.random()+Math.random())/4,e)}function $(t,e){return D(t,()=>Math.max(Math.random(),Math.random(),Math.random(),Math.random()),e)}function U(t){return t%2}function q(t,e){return Math.sqrt(t.map(o=>(o-e)**2).reduce((o,a)=>o+a,0)/t.length)}function G(t,e){return x(t.map(o=>Math.abs(o-e)))}function R(t,e){return t.map(o=>Math.abs(o-e)).reduce((o,a)=>o+a,0)/t.length}function x(t){const e=t.sort((o,a)=>o-a);return U(e.length)?e[Math.floor(e.length/2)]:(e[e.length/2-1]+e[e.length/2])/2}function m(t,e=!1){const o=t.reduce((i,c)=>i+c,0)/(e?t.length:t.length-1),a=q(t,o),n=x(t),r=G(t,n),s=R(t,n);return{median:n,mean:o,stddev:a,mad1:r,mad2:s}}function _(t){const e=[...t];for(let o=e.length-1;o>0;o-=1){const a=Math.floor(Math.random()*(o+1)),n=e[a],r=e[o];e[o]=n,e[a]=r}return e}function y(t,e){return _(t).slice(0,e)}function M(t,e){return t.map(o=>Math.abs(o-e)/e)}function v(t,e){const o=e.map(u=>u.stddev),a=e.map(u=>u.mad1),n=e.map(u=>u.mad2),r=M(o,t.stddev),s=M(a,t.mad1),i=M(n,t.mad2),c=m(r),d=m(s),l=m(i);return{stddevPercentDiffStats:c,mad1PercentDiffStats:d,mad2PercentDiffStats:l}}function j(t,e,o){let a=Number.MAX_SAFE_INTEGER,n=0;for(let r of[t,e,o])for(let s of["stddevPercentDiffStats","mad1PercentDiffStats","mad2PercentDiffStats"]){const i=r[s],c=Math.min(i.mean,i.stddev),d=Math.max(i.mean,i.stddev);c<a&&(a=c),d>n&&(n=d)}return[Math.floor(a*100),Math.ceil(n*100)]}google.charts.load("current",{packages:["corechart","bar"]});google.charts.setOnLoadCallback(()=>{w(),setTimeout(()=>{document.getElementById("start-button").click()},1)});document.getElementById("parameters-form").addEventListener("submit",t=>{t.preventDefault(),w(),setTimeout(()=>H(),33)});function H(){A(!1);const t=p("population-size"),e=p("sample-size"),o=p("sample-count"),a=p("outliers-count",!1),n=N(t,a),r=z(t,a),s=$(t,a);h("Uniform Population","popchart-uniform",n),h("Symmetric Population","popchart-symmetric",r),h("Skewed Population","popchart-skewed",s);const i=m(n,!0),c=m(r,!0),d=m(s,!0);g("population-uniform-stats",i),g("population-symmetric-stats",c),g("population-skewed-stats",d),L(),setTimeout(()=>{const l=[],u=[],b=[];for(let P=0;P<o;P++){const C=y(n,e),E=m(C);l.push(E);const k=y(r,e),O=m(k);u.push(O);const T=y(s,e),F=m(T);b.push(F)}K(i,c,d,l,u,b)},33)}function K(t,e,o,a,n,r){const s=v(t,a),i=v(e,n),c=v(o,r),[d,l]=j(s,i,c);S("Standard Deviation Percent Difference","stddev-comparison-chart",s.stddevPercentDiffStats,i.stddevPercentDiffStats,c.stddevPercentDiffStats,d,l),S("Median Absolute Deviation #1 Percent Difference","mad1-comparison-chart",s.mad1PercentDiffStats,i.mad1PercentDiffStats,c.mad1PercentDiffStats,d,l),S("Median Absolute Deviation #2 Percent Difference","mad2-comparison-chart",s.mad2PercentDiffStats,i.mad2PercentDiffStats,c.mad2PercentDiffStats,d,l),B(),A(!0)}
