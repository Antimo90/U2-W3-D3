// CODICE ASINCRONO IN JS
// Da sempre, per la gestione delle operazioni asincrone, in JS si è utilizzata
// la tecnica delle CALLBACKS

// una CALLBACK è una FUNZIONE passata come PARAMETRO ad un'altra FUNZIONE
const creaCards = function () {
  // questa è una simulazione di una funzione che è in grado di
  // generare delle cards a partire da un array di oggetti
  console.log("Adesso genero le cards per la pagina");
};

// quando devo invocare creaCards? eh, quando ho ottenuto l'array dei dati...
// e immaginiamo che l'array dei dati arrivi in seguito ad una chiamata di rete
// che per sua natura è un'operazione asincrona

const chiamataAsincrona = function (nextStep) {
  // questa è un'operazione asincrona, NON sappiamo quanto tempo ci metterà
  // nella sua risoluzione. Ipotizziamo per semplicità che questa operazione
  // ci metta 2s (fissi) a risolversi
  console.log("ORA COMINCIA L'OPERAZIONE ASINCRONA");
  setTimeout(() => {
    // dopo 2 secondi... l'operazione asincrona termina e ottengo l'array di oggetti
    console.log("L'OPERAZIONE ASINCRONA È TERMINATA");
    nextStep();
  }, 2000);
};

chiamataAsincrona(creaCards);

// il metodo delle callbacks consiste nel FORNIRE all'operazione asincrona già
// COSA FARE una volta che il suo svolgimento sarà arrivato al termine
