var btn9 = document.getElementById("btn9");
var btn8 = document.getElementById("btn8");
var btn7 = document.getElementById("btn7");
var btn6 = document.getElementById("btn6");
var btn5 = document.getElementById("btn5");
var btn4 = document.getElementById("btn4");
var btn3 = document.getElementById("btn3");
var btn2 = document.getElementById("btn2");
var btn1 = document.getElementById("btn1");
var btn_ = document.getElementById("btn_");
var btn0 = document.getElementById("btn0");
var btnDer = document.getElementById("btnDer");
var btnDelete = document.getElementById("btnDelete");
var btnIzq = document.getElementById("btnIzq");
var btnX = document.getElementById("btnX");
var btnDividir = document.getElementById("btnDividir");
var btnMas = document.getElementById("btnMas");
var btnMenos = document.getElementById("btnMenos");
var btnIgual = document.getElementById("btnIgual");
var resultadoCalculadora = document.getElementById("resultadoCalculadora");
var historial = document.getElementById("historial");
var contenedor_txtHistorial = document.getElementById("contenedor_txtHistorial");
var txt_historial = document.getElementById("txt_historial");

var pusoOperativo = true, primeraOperacion = true, position = true, seDioIgual = false;
var resultadoTotal = 0, operativoActual = false, tipoOperacion = "";
var numero1 = "", numero2 = "", localStoragePosition = 0;
var verHistorial = true;

btn9.addEventListener("click", (e)=>{ ingresarExpresion("9");});
btn8.addEventListener("click", (e)=>{ ingresarExpresion("8");});
btn7.addEventListener("click", (e)=>{ ingresarExpresion("7");});
btn6.addEventListener("click", (e)=>{ ingresarExpresion("6");});
btn5.addEventListener("click", (e)=>{ ingresarExpresion("5");});
btn4.addEventListener("click", (e)=>{ ingresarExpresion("4");});
btn3.addEventListener("click", (e)=>{ ingresarExpresion("3");});
btn2.addEventListener("click", (e)=>{ ingresarExpresion("2");});
btn1.addEventListener("click", (e)=>{ ingresarExpresion("1");});
btn_.addEventListener("click", (e)=>{ ingresarExpresion(".");});
btn0.addEventListener("click", (e)=>{ ingresarExpresion("0");});
btnDelete.addEventListener("click", (e)=>{ ingresarExpresion("cancelar");});
btnX.addEventListener("click", (e)=>{ ingresarExpresion("*");});
btnDividir.addEventListener("click", (e)=>{ ingresarExpresion("/");});
btnMas.addEventListener("click", (e)=>{ ingresarExpresion("+");});
btnMenos.addEventListener("click", (e)=>{ ingresarExpresion("-");});
btnIgual.addEventListener("click", (e)=>{
	if (!pusoOperativo) {
		localStoragePosition++;
		escrituraCorrecta();
		let isResultado = resolver("");
		pusoOperativo = true;
		seDioIgual = true;
		localStorage.setItem("resultado"+localStoragePosition, isResultado);

	}else errorEscritura();
});
historial.addEventListener("click", (e)=>{
	if (verHistorial) {
		contenedor_txtHistorial.style.display = "flex";
		contenedor_txtHistorial.style.width = "25vw";
		contenedor_txtHistorial.style.height = "25vh";
		rellenarHistorial();
		historial.innerText = "Dejar de ver";
		verHistorial = false;
	}else{
		contenedor_txtHistorial.style.display = "none";
		historial.innerText = "Ver el historial";
		verHistorial = true;
	}
});

function rellenarHistorial(){
	if (localStoragePosition == 0) txt_historial.value = "historial vacío";
	else txt_historial.value = "";
	for (var i = localStoragePosition; i >= 1; i--) {
		txt_historial.value += localStorage.getItem("resultado"+i)+" 		("+i+")"+"\n"
													+"––––––––––––––––––––––––––––– \n";
	}
}

function ingresarExpresion(expresion) {
	if (expresion == "+"){
		if (!pusoOperativo) {
			pusoOperativo = true;
			resultadoCalculadora.innerText += expresion;
			if (position) position = false;
			else position = true;
			if (tipoOperacion == "") tipoOperacion = expresion;
			resolver(expresion);
			tipoOperacion = expresion;

		}else{
			errorEscritura();
		}

	}else if(expresion == "-"){
		if (!pusoOperativo) {
			pusoOperativo = true;
			resultadoCalculadora.innerText += expresion;
			if (position) position = false;
			else position = true;
			if (tipoOperacion == "") tipoOperacion = expresion;
			resolver(expresion);
			tipoOperacion = expresion;

		}else{
			errorEscritura();
		}
		
	}else if(expresion == "*"){
		if (!pusoOperativo) {
			pusoOperativo = true;
			resultadoCalculadora.innerText += "x";
			if (position) position = false;
			else position = true;
			if (tipoOperacion == "") tipoOperacion = expresion;
			resolver(expresion);
			tipoOperacion = expresion;

		}else{
			errorEscritura();
		}
		
	}else if(expresion == "/"){
		if (!pusoOperativo) {
			pusoOperativo = true;
			resultadoCalculadora.innerText += expresion;
			if (position) position = false;
			else position = true;

			if (tipoOperacion == "") tipoOperacion = expresion;
			resolver(expresion);
			tipoOperacion = expresion;

		}else{
			errorEscritura();
		}
	
	}else if(expresion == "cancelar"){
		limpiar();
		
	}else if(expresion == "."){
		if (!seDioIgual) {
			resultadoCalculadora.innerText += expresion;
			if (position) numero1 += expresion;
			else numero2 += expresion;
			pusoOperativo = false;
		}else errorEscritura();
		
	}else{
		if (seDioIgual) {
			limpiar();
			resultadoCalculadora.innerText += expresion;
			escrituraCorrecta();
			if (position) numero1 += expresion;
			else numero2 += expresion;
			pusoOperativo = false;
			seDioIgual = false;
		}else{
			resultadoCalculadora.innerText += expresion;
			escrituraCorrecta();
			if (position) numero1 += expresion;
			else numero2 += expresion;
			pusoOperativo = false;
		}
	}
}

function errorEscritura(){
	resultadoCalculadora.style.background = "#f00";
}
function escrituraCorrecta(){
	resultadoCalculadora.style.background = "#555";	
}
function limpiar(){
	resultadoCalculadora.innerText = "";
	pusoOperativo = false; primeraOperacion = true; position = true;
	resultadoTotal = 0; operativoActual = false;
	numero1 = ""; numero2 = "";
}

function resolver(expresion){
	if (tipoOperacion == "+") {
		if (primeraOperacion) primeraOperacion = false;
		else{
			if (operativoActual) {
				resultadoTotal = resultadoTotal + parseFloat(numero1);
			}else{
				resultadoTotal = parseFloat(numero1) + parseFloat(numero2);
			}
			position = true;
			operativoActual = true;
			resultadoCalculadora.innerText = resultadoTotal + expresion;
			numero1 = ""; numero2 = "";
		}

	}else if(tipoOperacion == "-"){
		if (primeraOperacion) primeraOperacion = false;
		else{
			if (operativoActual) {
				resultadoTotal = resultadoTotal - parseFloat(numero1);
			}else{
				resultadoTotal = parseFloat(numero1) - parseFloat(numero2);
			}
			position = true;
			operativoActual = true;
			resultadoCalculadora.innerText = resultadoTotal + expresion;
			numero1 = ""; numero2 = "";
		}

	}else if(tipoOperacion == "*"){
		if (primeraOperacion) primeraOperacion = false;
		else{
			if (operativoActual) {
				resultadoTotal = resultadoTotal * parseFloat(numero1);
			}else{
				resultadoTotal = parseFloat(numero1) * parseFloat(numero2);
			}
			position = true;
			operativoActual = true;
			resultadoCalculadora.innerText = resultadoTotal + expresion;
			numero1 = ""; numero2 = "";
		}
	}else if(tipoOperacion == "/"){
		if (primeraOperacion) primeraOperacion = false;
		else{
			if (operativoActual) {
				resultadoTotal = resultadoTotal / parseFloat(numero1);
			}else{
				resultadoTotal = parseFloat(numero1) / parseFloat(numero2);
			}
			position = true;
			operativoActual = true;
			resultadoCalculadora.innerText = resultadoTotal + expresion;
			numero1 = ""; numero2 = "";
		}
	}
	return resultadoTotal;
}
///////////////////////////// parte de las palabras ////////////////////////////////////////////////////////

var mayusculas = document.getElementById("mayusculas");
var minusculas = document.getElementById("minusculas");
var numCaracteres = document.getElementById("numCaracteres"); //boton para el numero de caracteres
var txt_numCaracteres = document.getElementById("txt_numCaracteres");
var boton_limpiar = document.getElementById("boton_limpiar");
var textoPrueba = document.getElementById("textoPrueba");

mayusculas.addEventListener("click", (e)=>{
	let textoIngresado = textoPrueba.value;
	textoPrueba.value = textoIngresado.toUpperCase();
});

minusculas.addEventListener("click", (e)=>{
	let textoIngresado = textoPrueba.value;
	textoPrueba.value = textoIngresado.toLowerCase();
});

numCaracteres.addEventListener("click", (e)=>{
	let textoIngresado = textoPrueba.value;
	txt_numCaracteres.value = textoIngresado.length;
});

boton_limpiar.addEventListener("click", (e)=>{
	textoPrueba.value = "";
	txt_numCaracteres.value = "";
});