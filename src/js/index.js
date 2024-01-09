   const $stepText = $('#step-text');
   const $stepDescription = $('#step-description');
   const $stepOne = $('.step.one');
   const $stepTwo = $('.step.two');
   const $stepThree = $('.step.three');

   const $containerBtnFormOne = ('#containerBtnFormOne');
   const $btnFormOne = ('#btnFormOne');
   const $inputNome = $('#nome');
   const $inputSobrenome = $('#sobrenome');
   const $inputDataNascimento = $('#dataNascimento');
   const $inputEmail = $('#email');
   const $inputMinibio = $('#minibio');
   const $inputEndereco = $('#endereco');
   const $inputComplemento = $('#complemento');
   const $inputCidade = $('#cidade');
   const $inputCep = $('#cep');

   let nomeValido = false;
   let sobrenomeValido = false;
   let dataNascimentoValido = false;
   let emailValido = false;
   let enderecolValido = false;
   let cidadeValida = false;
   let cepValido = false;


   const minLengthTextArea = 10;
   const minLengthText = 2;
   const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/
   function validarInput(element, minLength, maxLength, regex) {
      const closest = $(element).closest('.input-data');
      if (!element.value
         || (minLength && element.value.trim().length < minLength)
         || (maxLength && element.value.trim().length > maxLength)
         || (regex && !element.value.toLowerCase().match(regex))
      ) {
         closest.addClass('error');
         return false;
      }
      closest.removeClass('error');
      return true;

   }


   function iniciarFormulario2() {
      $stepText.text(' Passo 2 de 3 - Dados de correspondência');
      $stepDescription.text('Precisamos desses dados para que possamos entrar em contato se necessário.');
      $stepOne.hide();
      $stepTwo.show();

      $inputEndereco.keyup(function () {
         enderecolValido = validarInput(this, minLengthTextArea);
      });

      $inputCidade.keyup(function () {
         cidadeValida = validarInput(this, minLengthText);
      });

      $inputCep.keyup(function () {
         this.value = this.value.replace(/\D/g, '');
         cepValido = validarInput(this, null, null, cepRegex);
         if (cepValido) {
            this.value = this.value.replace(cepRegex, "$1.$2-$3");
         }
      });

   };

   function validaFormularioUm() {
      if (nomeValido && sobrenomeValido && emailValido && dataNascimentoValido) {
         $containerBtnFormOne.removeClass('disabled');
         $btnFormOne.removeClass('disabled');
         $btnFormOne.off('click').on('click', iniciarFormulario2);
      } else {
         $containerBtnFormOne.addClass('disabled');
         $btnFormOne.addClass('disabled');
         $btnFormOne.off('click');

      }
   }

   function init() {
      $stepText.text('Passo 1 de 3 - Dados pessoais');
      $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor.');
      $stepTwo.hide();
      $stepThree.hide();

      $inputNome.keyup(function () {
         nomeValido = validarInput(this, minLengthText);
         validaFormularioUm();

      });

      $inputSobrenome.keyup(function () {
         sobrenomeValido = validarInput(this, minLengthText);
         validaFormularioUm();
      });

      $inputDataNascimento.keyup(function () {
         dataNascimentoValido = validarInput(this, minLengthText);
         validaFormularioUm();
      });

      $inputDataNascimento.change(function () {
         dataNascimentoValido = validarInput(this, minLengthText);
         validaFormularioUm();
      });

      $inputEmail.keyup(function () {
         emailValido = validarInput(this, null, null, emailRegex);
         validaFormularioUm();
      });

      $inputMinibio.keyup(function () {
         validaFormularioUm();
      });

      $inputDataNascimento.on('focus', function () {
         this.type = 'date';
      });

      $inputDataNascimento.on('blur', function () {
         if (!this.value) {
            this.type = 'text';
         }
      });

   }

   init();