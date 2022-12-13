document.addEventListener('DOMContentLoaded', function () {

  const contact = {
    name: '',
    email: '',
    text: ''
  }

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const text = document.getElementById('text');
  const formEmail = document.getElementById('form');
  const spinner = document.getElementById('spinner');
  const btnSubmit = document.querySelector('input[type="submit"]');
  const imgLink = document.getElementById('linkContac');

  name.addEventListener('input', valid); 
  email.addEventListener('blur', valid); 
  text.addEventListener('input', valid);
  formEmail.addEventListener('submit', sendEmail);

  function sendEmail(eve) {
    eve.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout( () => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');
     
      resetForm();

      // Crear una alerta
      const alertaSend = document.createElement('P');
      alertaSend.classList.add('error');
      alertaSend.textContent = 'Esto es una prueba y no se ha enviado ningún mensaje. Puedes contactar conmigo a través de:';
      formEmail.appendChild(alertaSend);
      imgLink.classList.remove('hidden')

      setTimeout( () => {
        alertaSend.remove();
      }, 6000);
    }, 3000);
  }


  function valid(eve) {
    const target = eve.target;
    const father = target.parentElement;
    
    if (target.value.trim() === '') {
      alertError(`El campo ${target.placeholder} es obligatorio`, father);
      contact[target.id] = '';
      checkObject();
      return
    }

    if (target.id === 'email' && !emailValid(target.value)) {
      alertError('No es un email valido', father);
      contact[target.id] = '';
      checkObject();
      return
    }

    cleanError(father)

    contact[target.id] = target.value.trim().toLowerCase();

    checkObject();
  }


  function alertError(mensaje, reference) {
    cleanError(reference);
    
    // Generar alerta en HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('error')

    // Inyectar el error al formulario
    reference.appendChild(error);
  }


  function cleanError(reference) {
    const alerta = reference.querySelector('.error');
    
    if(alerta) {
      alerta.remove();
    }
  }

  function emailValid(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
    
  }

  function checkObject() {
    if (Object.values(contact).includes('')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return;
    }

    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
    
  }

  function resetForm() {
    // Reiniciar objeto
    contact.email = '';
    contact.asunto = '';
    contact.mensaje = '';

    formEmail.reset();
    checkObject(); 
  }





})