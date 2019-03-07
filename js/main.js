(function(){
    "use strict";



    var regalo=document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded',function(){
        //console.log("listo");

        //Mapa
        if(document.getElementById('mapa')){
            var map = L.map('mapa').setView([-12.06029, -77.041476], 17);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([-12.06029, -77.041476]).addTo(map)
            
                .bindTooltip('GdlWebCamp 2019 <br> Boletos ya disponibles')
                .openTooltip();
        }
        

        //Campos datos usuario
        var nombre=document.getElementById('nombre');
        var apellido=document.getElementById('apellido');
        var email=document.getElementById('email');

        //Campos pases
        var pase_dia=document.getElementById('pase_dia');
        var pase_completo=document.getElementById('pase_completo');
        var pase_dosdias=document.getElementById('pase_dosdias');

        //Botones y divs

        var calcular=document.getElementById('calcular');
        var errorDiv=document.getElementById('error');
        var botonRegistro=document.getElementById('btnRegistro');
        var lista_productos=document.getElementById('lista-productos');
        var suma=document.getElementById('suma-total');

        //Extras

        var etiquetas=document.getElementById('etiquetas');
        var camisas=document.getElementById('camisa_evento');

     //previniendo errores de javascript, jquery
        if(document.getElementById('calcular')){
            calcular.addEventListener('click',calcularMontos);

        pase_dia.addEventListener('blur',mostrarDias);
        pase_completo.addEventListener('blur',mostrarDias);
        pase_dosdias.addEventListener('blur',mostrarDias);

        nombre.addEventListener('blur',validarCampos);
        apellido.addEventListener('blur',validarCampos);
        email.addEventListener('blur',validarCampos);
        email.addEventListener('blur',validarMail);

        function validarCampos(){
            if(this.value==''){
                errorDiv.style.display='block';
                errorDiv.innerHTML="este campo es obligatorio";
                this.style.border='1px solid red';
                errorDiv.style.border='1px solid red';
            }else{
                errorDiv.style.display='none';
                this.style.border='1px solid #cccccc ';
            }
        }

        function validarMail(){
            if(this.value.indexOf("@")>-1){
                errorDiv.style.display='none';
                this.style.border='1px solid #cccccc ';
            }else{
                errorDiv.style.display='block';
                errorDiv.innerHTML="debe tener al menos una @";
                this.style.border='1px solid red';
                errorDiv.style.border='1px solid red';
            }
        }

        function calcularMontos(event){
            event.preventDefault();
            if(regalo.value===''){
                alert("Debes elegir un regalo");
                regalo.focus();
            }else{
                var boletosDia=parseInt(pase_dia.value,10) || 0;
                var boletos2Dias=parseInt(pase_dosdias.value,10) || 0;
                var boletoCompleto=parseInt(pase_completo.value,10) || 0;

                var cantCamisas=parseInt(camisas.value,10)|| 0;
                var cantEtiquetas=parseInt(etiquetas.value,10)|| 0;
                    
                var totalPagar=(boletosDia*30)+(boletos2Dias*45)+(boletoCompleto*50) + ((cantCamisas*10)*0.93)+(cantEtiquetas*2);
                
                var listadoProductos=[];
                if(boletosDia>0){
                    listadoProductos.push(boletosDia+' Pases por dia');
                }
                
                if(boletos2Dias>0){
                    listadoProductos.push(boletos2Dias+' Pases por 2 dias');
                }

                if(boletoCompleto>0){
                    listadoProductos.push(boletoCompleto+' Pase(s) completo(s)');
                }

                if(cantCamisas>0){
                    listadoProductos.push(cantCamisas+' Camisas');
                }

                if(cantEtiquetas>0){
                    listadoProductos.push(cantEtiquetas+' Paquete de etiquetas');
                }

                if(listadoProductos.length>0){
                    lista_productos.style.display='block';
                    suma.innerHTML="$ "+ totalPagar.toFixed(2);
                }
                
                lista_productos.innerHTML='';

                for(var i=0;i<listadoProductos.length;i++){
                    lista_productos.innerHTML+=listadoProductos[i] + '<br>';
                }

            }

        }
        function mostrarDias(){
            var boletosDia=parseInt(pase_dia.value,10) || 0;
            var boletos2Dias=parseInt(pase_dosdias.value,10) || 0;
            var boletoCompleto=parseInt(pase_completo.value,10) || 0;

            var diasElegidos=[];

            if(boletosDia>0){
                diasElegidos.push('viernes');
            }

            if(boletos2Dias>0){
                diasElegidos.push('viernes' , 'sabado');
            }

            if(boletoCompleto>0){
                diasElegidos.push('viernes','sabado','domingo');
            }
            
           for(var i=0;i<diasElegidos.length;i++){
                document.getElementById(diasElegidos[i]).style.display='block';
            }
        }
        }
      

    });//DOM CONTENT LOADED;
})();


$(function(){

    //lettering

    $('.nombre-sitio').lettering();

    //Menu fijo

        var windowHeight=$(window).height();
        //console.log(windowHeight)

        var barraAltura=$('.barra').innerHeight();

        //console.log(barraAltura)

    $(window).scroll(function(){
        var scroll=$(window).scrollTop();
        // console.log(scroll)

        if(scroll>windowHeight){
            $('.barra').addClass('fixed');
            $('body').css({'margin-top':barraAltura+'px'});
        }else{
            $('.barra').removeClass('fixed');
            $('body').css({'margin-top':'0px'});
        }
    });

    //Menu responsive

    $('.menu-movil').on('click',function(){
        $('.navegacion-principal').slideToggle();
    })


    //programa de conferencia
    
    $('.ocultar').hide();
   
    $('.programa-evento .infor-curso:first').show();
    
    $('.menu-programa a:first').addClass('activo');

    $('.menu-programa a').on('click',function(){


        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');

        $('div.ocultar').hide();
        var enlace=$(this).attr('href');
        
        $(enlace).fadeIn(1000);
        
        return false; 
    });

    //animaciones para los numeros
    var resumenLista=$('.resumen-evento');

    if(resumenLista.length>0){
        
        $('.resumen-evento').waypoint(function(){
            $('.resumen-evento li:nth-child(1) p').animateNumber({number:6},1200);
            $('.resumen-evento li:nth-child(2) p').animateNumber({number:15},1200);
            $('.resumen-evento li:nth-child(3) p').animateNumber({number:3},1500);
            $('.resumen-evento li:nth-child(4) p').animateNumber({number:9},1200);
        },{
            offset:'60%'
        });
    }


   

    //cuenta regresiva

    $('.cuenta-regresiva').countdown('2019/06/28 00:00:00',function(event){
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));

    });

});