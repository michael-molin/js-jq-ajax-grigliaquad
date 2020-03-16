$(document).ready(function () {

    var source = $('#griglia-template').html();
    var grigliaTemplate = Handlebars.compile(source);

    creaGriglia();

    // METODO PRECEDENTE CORRETTO MA CON UNA SOLA CHIAMATA ALL'AJAX E QUINDI OGNI SINGOLO CLICK E FUNZIONE ALL'INTERNO DEL PROGRAMMA ERA LIMITATO ALL'UNICO DATO RECUPERATO
    // $.ajax({
    //     url: 'https://flynn.boolean.careers/exercises/api/random/int',
    //     method: 'GET',
    //     success: function (data) {
    //         var numero = data.response;
    //         checkNumero(numero);
    //     },
    //     error: function () {
    //         alert('ERRORE');
    //     }
    // });
    //
    // function checkNumero (numero) {
    //     $(document).on('click', '.quadrato' , function() {
    //         $('.quadrato').removeClass('active');
    //         $(this).addClass('active');
    //         $(this).find('span').text(numero);
    //             if (numero <=5) {
    //                 $('.quadrato.active').addClass('quadrato-giallo');
    //             } else {
    //                 $('.quadrato.active').addClass('quadrato-verde');
    //             }
    //         });
    //     }

    //  CHIAMATA RICOSTRUITA CON LUCA, QUI L'AJAX SI TROVA ALL'INTERNO DELLA .ON(CLICK), QUINDI LA CHIAMATA AJAX VIENE RIPETUTA AD OGNI CLICK E IL NUMERO AVRA' UN VALORE DIVERSO OGNI VOLTA

    $(document).on('click', '.quadrato' , function() {          // FUNZIONE CLICK COSTRUISTA SU ON DATA COMPILAZIONE DINAMICA DELLA GRIGLIA
        $('.quadrato').removeClass('active');                   // RIMOZIONE CLASSE ACTIVE AI PRECEDENTI QUADRATI
        $(this).addClass('active');                             // ASSEGNAZIONE CLASSE ACTIVE AL QUADRATO SELEZIONATO
        var questoQuadrato = $(this);                           // ASSEGNAZIONE ALLA VARIABILE DI QUESTO QUADRATO

        $.ajax({                                                // IN CHIAMATA AJAX IL THIS NON FA PIU' RIFERIMENTO AL PRECEDENTE QUADRATO MA ALLA CHIAMATA AJAX STESSA
            url: 'https://flynn.boolean.careers/exercises/api/random/int',
            method: 'GET',
            success: function (data) {                          // IN CASO DI RICEZIONE POSITIVA (DA URL) ESECUZIONE CODICE
                var numeroEsterno = data.response;              // ASSEGNO ALLA VARIABILE IL DATO ESTERNO RICEVUTO
                checkNumero(questoQuadrato, numeroEsterno);     // ESECUZIONE FUNZIONE DI INSERIMENTO NUMERO E CHECK NUMERO PER DETERMINARE LO SFONDO
            },
            error: function () {
                alert('ERRORE');
            }
        });
    });

    function checkNumero (quadrato , numero) {                  //FUNZIONE CHE INSERISCE A SCHERMO IL NUMERO RECUPERATO, IN BASE A TALE NUMERO CAMBIA LO SFONDO DEL QUADRATO CON LA CLASSE ACTIVE
        $(quadrato).find('span').text(numero);
            if (numero <=5) {
                $('.quadrato.active').addClass('quadrato-giallo');
            } else {
                $('.quadrato.active').addClass('quadrato-verde');
            }
    }

    function creaGriglia() {
        for (var i = 0; i < 36; i++) {
            var datiGriglia = {
                dataGriglia: i
            };
            var templateCompilato = grigliaTemplate(datiGriglia);
            $('.container-griglia').append(templateCompilato);
        };
    }                                 // COMPILAZIONE GRIGLIA
});
