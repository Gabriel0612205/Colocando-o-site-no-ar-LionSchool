"use strict";

const todosCursosEscola=async function(){const a=await fetch("http://localhost:8080/v1/lion-school/cursos"),b=await a.json();return{name:b.cursos.map(a=>a.nome),acronym:b.cursos.map(a=>a.sigla),icon:b.cursos.map(a=>a.icone)}},preenchimentoDadosCursos=async function(){const a=await todosCursosEscola(),b=document.querySelector(".container_cursos_alunos");let c,d,e;for(let f=0;f<a.acronym.length;f++)c=document.createElement("a"),c.setAttribute("href","./alunos.html"),c.classList.add("card_cursos"),c.dataset.index=f,d=document.createElement("span"),d.classList.add("card_texto_curso"),d.textContent=a.acronym[f],c.classList.add("card_cursos"),e=document.createElement("img"),e.classList.add("icones_curso"),e.setAttribute("src",a.icon[f]),c.append(e,d),b.append(c);const f=function(b){(function(){localStorage.setItem("acronym",a.acronym[b.currentTarget.dataset.index]),localStorage.setItem("nome_curso",a.name[b.currentTarget.dataset.index])})()},g=document.querySelectorAll(".card_cursos");g.forEach(a=>{a.addEventListener("click",f)})};preenchimentoDadosCursos();