const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll('#formulario input');


let clientes = [];
let error=false;

//Expresiones regulares
const expresiones = {
  cedula: /^\d{10}$/,
  apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  nombres: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  direccion: /^[a-zA-Z0-9À-ÿ\s,.\#-]{1,100}$/,
  telefono: /^(\+593|0)?(9[0-9]{8}|[2-7][0-9]{6,7})$/,
  correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}

const campos = {
  cedula: false,
  apellidos: false,
  nombres: false,
  direccion: false,
  telefono: false,
  correo: false
}

const ValidarFormulario = (e) => {
  switch (e.target.name) {
    case "nombres":
      validarCampo(expresiones.nombres, e.target, "nombres");
      break;
    case "apellidos":
      validarCampo(expresiones.apellidos, e.target, "apellidos");
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "direccion":
      validarCampo(expresiones.direccion, e.target, "direccion");
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;
    case "cedula":
      validarCampo(expresiones.cedula, e.target, "cedula");
      break;

  }
}

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
    document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
    campos[campo] = true;

  } else {
    document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
    document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', ValidarFormulario)
  input.addEventListener('blur', ValidarFormulario)

});


const agregarcliente = (e) => {

  const nuevoCliente = {
    cedula: document.getElementById('cedula').value,
    apellidos: document.getElementById('apellidos').value,
    nombres: document.getElementById('nombres').value,
    direccion: document.getElementById('direccion').value,
    telefono: document.getElementById('telefono').value,
    correo: document.getElementById('correo').value
  };
  let clientesGuardados = JSON.parse(localStorage.getItem('clientes')) || [];
  const cedulaExistente = clientesGuardados.some(cliente => cliente.cedula === nuevoCliente.cedula);
  const correoExistente = clientesGuardados.some(cliente => cliente.correo === nuevoCliente.correo);
  const telefonoExistente = clientesGuardados.some(cliente => cliente.telefono === nuevoCliente.telefono);

  if (cedulaExistente) {
    document.getElementById(`grupo__cedula`).classList.add("formulario__grupo-incorrecto");
    document.getElementById(`grupo__cedula`).classList.remove("formulario__grupo-correcto");
    document.querySelector(`#grupo__cedula .formulario__input-error2`).classList.add("formulario__input-error-activo");
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    setTimeout(() => {
      document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

      document.getElementById(`grupo__cedula`).classList.remove("formulario__grupo-incorrecto");
      document.getElementById(`grupo__cedula`).classList.add("formulario__grupo-correcto");
      document.querySelector(`#grupo__cedula .formulario__input-error2`).classList.remove("formulario__input-error-activo");
    }, 3000);
  }

  if (correoExistente) {
    document.getElementById(`grupo__correo`).classList.add("formulario__grupo-incorrecto");
    document.getElementById(`grupo__correo`).classList.remove("formulario__grupo-correcto");
    document.querySelector(`#grupo__correo .formulario__input-error2`).classList.add("formulario__input-error-activo");

    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    setTimeout(() => {
      document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

      document.getElementById(`grupo__correo`).classList.remove("formulario__grupo-incorrecto");
      document.getElementById(`grupo__correo`).classList.add("formulario__grupo-correcto");
      document.querySelector(`#grupo__correo .formulario__input-error2`).classList.remove("formulario__input-error-activo");
    }, 3000);
  }
  if (telefonoExistente) {
    document.getElementById(`grupo__telefono`).classList.add("formulario__grupo-incorrecto");
    document.getElementById(`grupo__telefono`).classList.remove("formulario__grupo-correcto");
    document.querySelector(`#grupo__telefono .formulario__input-error2`).classList.add("formulario__input-error-activo");
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    setTimeout(() => {
      document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
      document.getElementById(`grupo__telefono`).classList.remove("formulario__grupo-incorrecto");
      document.getElementById(`grupo__telefono`).classList.add("formulario__grupo-correcto");
      document.querySelector(`#grupo__telefono .formulario__input-error2`).classList.remove("formulario__input-error-activo");
    }, 3000);
  }
  else{
    error=true;
    clientesGuardados.push(nuevoCliente);
    localStorage.setItem('clientes', JSON.stringify(clientesGuardados));
  }
}

formulario.addEventListener('submit', (e) => {
  agregarcliente();
  e.preventDefault();

  if (error && campos.nombres && campos.correo && campos.apellidos && campos.direccion && campos.telefono && campos.cedula) {
    /* formulario.reset(); */
    formulario.reset();
    document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
    setTimeout(() => {
      document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
    }, 5000);

    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
      icono.classList.remove('formulario__grupo-correcto');
    });

  }
  else {
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    setTimeout(() => {
      document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    }, 3000);

  }

});

