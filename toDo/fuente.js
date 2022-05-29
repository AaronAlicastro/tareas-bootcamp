const body = document.querySelector("#body");
const opciones = document.querySelectorAll(".opciones");
const containerFormulario = document.querySelector("#containerFormulario");
const inputFormulario = document.querySelectorAll(".inputFormulario");
const containerListaToDoList = document.querySelector("#containerListaToDoList");
const pape_pape = document.querySelector("#pape_pape");
const ok = document.querySelector("#ok");
const eliminar = document.querySelector("#eliminar");

opciones[0].addEventListener("click",e=>{
	aparecerCartillaInfo();
});
opciones[2].addEventListener("click",e=>{
	let busqueda = opciones[1].value; opciones[1].value = "";
	let seEncontro = false;
	if (busqueda.trim() != "") {
		let titulosB = document.querySelectorAll(".tituloTarea");
		let descripcionB = document.querySelectorAll(".almacen");
		titulosB.forEach((ti,i)=>{
			if (ti.innerText.trim() == busqueda.trim()) {
				aparecerCartillaInfo();
				inputFormulario[0].value = ti.innerText;
				inputFormulario[1].value = descripcionB[i].innerText;
				seEncontro = true;
			}
		});
		if (!seEncontro) {
			opciones[1].setAttribute("placeholder","No se encontro");
			setTimeout(e=>{ opciones[1].setAttribute("placeholder","Busque por el título");},1000);
		}
	}else alert("Debe ingresar su busqueda")
});

inputFormulario[2].addEventListener("click",e=>{
	let titulo = inputFormulario[0].value;
	let descripcion = inputFormulario[1].value;
	if (titulo.trim() != "") {
		if (descripcion.trim() != "") {
			inputFormulario[0].value = ""; inputFormulario[1].value = "";
			anadirTarea(titulo,descripcion);
			limpiarFormulario();
		}else alert("No inresó su contenido");
	}else alert("No ingresó un título");
});
inputFormulario[3].addEventListener("click",e=>{
	inputFormulario[0].value = "";
	inputFormulario[1].value = "";
	containerFormulario.style.display = "none";
});
ok.addEventListener("click",e=>{
	limpiarFormulario();
});
eliminar.addEventListener("click",e=>{
	containerListaToDoList.removeChild(tareaCliqueada);
	limpiarFormulario();
	setTimeout(e=>{ alert("Se ha eliminado");
		conteoEliminados++;
		pape_pape.innerHTML = conteoEliminados;
	},300);
});
var conteoEliminados = 0;

function limpiarFormulario(){
	inputFormulario[0].value = "";
	inputFormulario[1].value = "";
	inputFormulario[2].style.display = "block";
	inputFormulario[3].style.display = "block";
	ok.style.display = "none";
	eliminar.style.display = "none";
	containerFormulario.style.display = "none";
}

var tareaCliqueada;
function anadirTarea(titulo,descripcion) {
	let containerTarea = document.createElement("DIV");
	let h1Titulo = document.createElement("H1");
	let h4DescripcionCorto = document.createElement("H4");
	let h3Descripcion = document.createElement("H3");

	containerTarea.classList.add("tareaAgregada");
	h1Titulo.classList.add("tituloTarea");
	h1Titulo.innerHTML = titulo;
	h4DescripcionCorto.classList.add("descripcionTarea");
	h4DescripcionCorto.innerHTML = primerasPalabras(descripcion)+"...";
	h3Descripcion.classList.add("almacen");
	h3Descripcion.innerHTML = descripcion;

	containerTarea.appendChild(h4DescripcionCorto);
	containerTarea.appendChild(h1Titulo);
	containerTarea.appendChild(h3Descripcion);
	containerListaToDoList.appendChild(containerTarea);
	let tarea = document.querySelectorAll(".tareaAgregada");
	tarea[tarea.length - 1].addEventListener("click",e=>{
		tareaCliqueada = tarea[tarea.length - 1];
		aparecerCartillaInfo();
		inputFormulario[0].value = titulo;
		inputFormulario[1].value = descripcion;
		inputFormulario[2].style.display = "none";
		inputFormulario[3].style.display = "none";
		ok.style.display = "block";
		eliminar.style.display = "block";
	});
}
function primerasPalabras(texto){
	if(texto.length > 10) texto = texto.substring(0,10);
	return texto;
}

function aparecerCartillaInfo(){
	let a = body.offsetWidth;
	let h = body.offsetHeight;
	containerFormulario.style.display = "block";
	containerFormulario.style.top = (h/7)+"px";
	containerFormulario.style.left = ((a/2)-200)+"px";
}