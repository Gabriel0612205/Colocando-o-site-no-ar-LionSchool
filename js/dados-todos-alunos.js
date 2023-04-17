"use strict";

// Função que retorna todos os alunos de um curso especifico, com os status especifico daqueles alunos
//Função criada para selecionar os status dos alunos que estão cursando
const statusAlunos=async function(a,b){const c=await fetch(`http://localhost:8080/v1/lion-school/alunos?curso=${a}&status=${b}`),d=await c.json();return{image:d.alunos.map(a=>a.foto),name:d.alunos.map(a=>a.nome),registration:d.alunos.map(a=>a.matricula),conclusion:d.alunos.map(a=>a.curso.map(a=>a.conclusao)),status:d.alunos.map(a=>a.status)}},anoConclusãoAlunos=async function(a,b){const c=await fetch(`http://localhost:8080/v1/lion-school/alunos?curso=${a}&ano=${b}`),d=await c.json();return{image:d.alunos.map(a=>a.foto),name:d.alunos.map(a=>a.nome),registration:d.alunos.map(a=>a.matricula),conclusion:d.alunos.map(a=>a.curso.map(a=>a.conclusao)),status:d.alunos.map(a=>a.status)}},filtragemAlunoStatusEAnoConclusao=async function(a,b,c){const d=await fetch(`http://localhost:8080/v1/lion-school/alunos?curso=${a}&status=${b}&ano=${c}`),e=await d.json();return{image:e.alunos.map(a=>a.foto),name:e.alunos.map(a=>a.nome),registration:e.alunos.map(a=>a.matricula),conclusion:e.alunos.map(a=>a.curso.map(a=>a.conclusao)),status:e.alunos.map(a=>a.status)}},todosAlunosCursoEspecifico=async function(a){const b=await fetch(`http://localhost:8080/v1/lion-school/alunos?curso=${a}`),c=await b.json();return{image:c.alunos.map(a=>a.foto),name:c.alunos.map(a=>a.nome),registration:c.alunos.map(a=>a.matricula),conclusion:c.alunos.map(a=>a.curso.map(a=>a.conclusao)),status:c.alunos.map(a=>a.status)}},filtragemNomesCursos=async function(){let a=localStorage.getItem("nome_curso");a=a.replace(/[0-9]/g,"").replace("-","").trim();let b=document.querySelector(".titulo_curso");b.textContent=a};filtragemNomesCursos();const filtragemAnoConclusao=async function(){let a=localStorage.getItem("acronym");const b=await todosAlunosCursoEspecifico(a);let c=[];b.conclusion.forEach(a=>{c.push(a[0])}),c.sort();const d=c.filter((a,b)=>c.indexOf(a)===b),e=document.querySelector(".ano__filtragem");let f;d.forEach(a=>{f=document.createElement("option"),f.classList.add("tipo_filtragem"),f.setAttribute("value",a),f.textContent=a,e.append(f)});let g=[];b.conclusion.forEach(a=>{g.push(a[0])})};filtragemAnoConclusao();const filtragemStatus=document.querySelector(".filtragem__status"),getStatusSelecionadoAluno=function(){const a=filtragemStatus.options[filtragemStatus.selectedIndex].value;return a},filtragemAno=document.querySelector(".ano__filtragem"),getAnoFiltrado=function(){const a=filtragemAno.options[filtragemAno.selectedIndex].value;return a},filtragemDadosAlunos=async function(){let a,b=localStorage.getItem("acronym");a=""!=getAnoFiltrado()&&""==getStatusSelecionadoAluno()?await anoConclusãoAlunos(b,getAnoFiltrado()):""==getAnoFiltrado()&&""!=getStatusSelecionadoAluno()?await statusAlunos(b,getStatusSelecionadoAluno()):""!=getAnoFiltrado()&&""!=getStatusSelecionadoAluno()?await filtragemAlunoStatusEAnoConclusao(b,getStatusSelecionadoAluno(),getAnoFiltrado()):await todosAlunosCursoEspecifico(b);const c=document.querySelector(".container_alunos");let d,e,f;c.innerHTML="";for(let b=0;b<a.image.length;b++)d=document.createElement("a"),d.setAttribute("href","./alunoEspecifico.html"),d.classList.add("aluno"),d.dataset.index=b,e=document.createElement("img"),e.classList.add("imagem_aluno"),e.setAttribute("src",a.image[b]),f=document.createElement("span"),f.classList.add("nome_aluno"),f.textContent=a.name[b],d.style.backgroundColor="Cursando"==a.status[b]?"#3347B0":"#E5B657",d.append(e,f),c.append(d);const g=function(b){const c=function(){localStorage.setItem("numeroRegistro",a.registration[b.currentTarget.dataset.index])};c()},h=document.querySelectorAll(".aluno");h.forEach(a=>{a.addEventListener("click",g)})};filtragemDadosAlunos(),filtragemStatus.addEventListener("change",getStatusSelecionadoAluno),filtragemStatus.addEventListener("change",filtragemDadosAlunos),filtragemAno.addEventListener("change",getAnoFiltrado),filtragemAno.addEventListener("change",filtragemDadosAlunos);