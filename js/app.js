const formulario = document.getElementById("cotizar-seguro");

function Seguro(marca,year,tipo){
    this.marca=marca;
    this.year=year;
    this.tipo=tipo;
}
Seguro.prototype.calcularSeguro = function(){
    let cantidad;
    const base=2000;
    switch(this.marca){
        case "1":
            cantidad = base*1.5;
            break;
        case "2":
            cantidad = base*1.25;
            break;
        case "3":
            cantidad = base*1.75;
            break;
        default:
            break;
    }

    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia*3)*cantidad)/100;
    
    if(this.tipo==="basico"){
        cantidad *= 1.25
    }else{
        cantidad *= 1.5
    }
    return cantidad
}

function UI(){}
UI.prototype.mostrarYear = ()=>{
    const year = document.getElementById("year");
    const max = new Date().getFullYear();
    const min = max - 20;
    for(let i = max; i > min ; i--){
        const option = document.createElement("option");
        option.value=i;
        option.textContent=i;
        year.appendChild(option);
    }
}
UI.prototype.mostrarMensaje= (mensaje,tipo)=>{
    const p = document.createElement("p");
    const resultado = document.getElementById("resultado");
    const spinner = document.getElementById("cargando");
    if(tipo==="error"){
        p.textContent=mensaje;
        p.classList.add("error");
        resultado.appendChild(p);
    }else{
        p.textContent=mensaje;
        p.classList.add("correcto");
        spinner.classList.remove("hidden");
        resultado.appendChild(p);
    }
    setTimeout(()=>{
        p.remove();
        spinner.classList.add("hidden");
    },2500)
}
UI.prototype.seguroHTML = (seguro,total) =>{
    const div = document.createElement("div");
    const resultado = document.getElementById("resultado");
    switch(seguro.marca){
        case "1":
            seguro.marca = "Americano";
            break;
        case "2":
            seguro.marca = "Asiatico";
            break;
        case "3":
            seguro.marca = "Europeo";
            break;
        default:
            break;
    }
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p>Total: ${total}</p>
        <p>Marca: ${seguro.marca}</p>
        <p>Año: ${seguro.year}</p>
        <p>Tipo: ${seguro.tipo}</p>
    `
    setTimeout(()=>{
        resultado.appendChild(div)
    },2500)
    
}

const ui = new UI();
cargarEventListeners()
function cargarEventListeners(){
    document.addEventListener("DOMContentLoaded",()=>{
        ui.mostrarYear();
    });
    formulario.addEventListener("submit",(e)=>{
        e.preventDefault();
        const marca = document.getElementById("marca").value;
        const year = document.getElementById("year").value;
        const tipo = document.querySelector("input[name=tipo]:checked").value;
        if(marca==="" || year==="" || tipo===""){
            console.log("vacio");
            ui.mostrarMensaje("Todos los campos son obligatorios","error");
            return;
        }
        ui.mostrarMensaje("Cotizando....","exito");
        const resultadoDiv = document.querySelector("#resultado div");
        console.log(resultadoDiv)
        if(resultadoDiv !== null){
            resultadoDiv.remove()
        }


        const seguro = new Seguro(marca,year,tipo);
        const total = seguro.calcularSeguro();
        ui.seguroHTML(seguro,total)
    })
}