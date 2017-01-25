// Se crea form1 desde document ( Basado en gist )
if (document.form1) form1 = document.form1;

// Creando métodos no disponibles
window.navigate = function (url) {
    window.location = url;
};

// Obtener Param fix basado en Gist
function obtenerParam() {
    var tramite_tempo,
        parametro,
        motivo = "---",
        cuit,
        inteSoc,
        eventual,
        asocCoop = "N",
        cuitCoop = 0;

    var carSacar1 = /\./gi,
        carSacar2 = /,/gi,
        carSacar3 = /-/gi,
        carNum = /.[a-z]/gi;

    for (tramite_tempo = 0; tramite_tempo <= (document.form1.motivo_tramite.length - 1); tramite_tempo++) {
        if (document.form1.motivo_tramite[tramite_tempo].checked) {
            motivo = document.form1.motivo_tramite[tramite_tempo].value;
            break;
        }
    }
    if (motivo == "---") {
        window.alert("Debe seleccionar el Tipo de Tramite que desea realizar.");
        return "ERROR";
    }

    if (document.form1.cuit.value == "-1") {
        window.alert("Debe seleccionar la CUIT sobre la que realizará el Empadronamiento.");
        return "ERROR";
    } else {
        cuit = document.form1.cuit.value;
    }

    inteSoc = (document.form1.inte_sociedad.checked) ? "S" : "N";
    eventual = document.form1.eventual_al_final.value;

    if (document.form1.cooperativa.checked) {
        if (document.form1.cuit_coperativa.value == "") {
            window.alert("Debe ingresar la CUIT de la Cooperativa de Trabajo a la que está asociado.");
            return "ERROR";
        } else {
            // Verifico la cuit de la cooperativa
            var stringIntermedio = document.form1.cuit_coperativa.value;
            // Le saco los puntos
            stringIntermedio = stringIntermedio.replace(carSacar1, "");
            // Le saco las comas.
            stringIntermedio = stringIntermedio.replace(carSacar2, "");
            // Le saco los guiones.
            stringIntermedio = stringIntermedio.replace(carSacar3, "");

            document.form1.cuit_coperativa.value = stringIntermedio;

            if (carNum.test(document.form1.cuit_coperativa.value) == true) {
                window.alert("Debe ingresar una CUIT para la Cooperativa de Trabajo válida. (Solo se permiten valores numéricos)");
                return "ERROR";
            }

            if (document.form1.cuit_coperativa.value.length != 11) {
                window.alert("La CUIT de la Cooperativa de Trabajo debe tener un largo de 11 números.");
                return "ERROR";
            }
        }

        asocCoop = "S";
        cuitCoop = document.form1.cuit_coperativa.value;
    }

    parametro = "?tramite=" + motivo + "&cuit=" + cuit + "&intesoc=" + inteSoc + "&eventual=" + eventual + "&coop=" + asocCoop + "&cuitcoop=" + cuitCoop;

    return parametro;
}