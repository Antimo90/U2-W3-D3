// oggi, per la prima volta, creeremo una lista di utenti con dati provenienti
// da un'API
// per recuperare questi dati avremo bisogno di effettuare una REQUEST HTTP a cui
// sperabilmente susseguirà una RESPONSE HTTP con i dati richiesti

// il metodo integrato in JS per effettuare una HTTP REQUEST si chiama fetch()
// e fetch() ritornerà una Response incapsulato in una PROMISE

const getData = function () {
  // utilizzo fetch per fare una HTTP REQUEST
  fetch("https://jsonplaceholder.typicode.com/users", {
    // questo è il secondo parametro di fetch, un oggetto di configurazione
    // method: 'GET' // però GET è anche il valore di default
    // body: ''
    // headers: {
    // authorization: 'xxxxxx',
    // 'Content-Type': 'application/json'
    // }
  })
    .then((response) => {
      console.log("RESPONSE", response);
      if (response.ok) {
        // entro qui se la response.ok ha valore true; significa che la response
        // è tornata e il suo status code è nella famiglia dei 200
        // la response ha i dati, ma non sono ancora codificati in JSON (sono uno stream)
        // esiste un metodo per trasformare questo stream in un oggetto/array
        return response.json(); // metodo che "jsonifizza" il body della Response
      } else {
        // entro qui se la response.ok ha valore false; significa che la response
        // è tornata ma il suo status code è nella famiglia dei 400 o dei 500

        // qui semplicemente mi teletrasporto nel blocco .catch() con un mio
        // messaggio d'errore personalizzato
        throw new Error("La chiamata non ha tornato 200");
      }
    })
    .then((data) => {
      console.log("DATA", data);
      // data in questo caso è un array di oggetti
      //   prendo un riferimento alla lista
      const ul = document.getElementById("userlist");
      data.forEach((user) => {
        ul.innerHTML += `
            <li class="list-group-item">${user.name} - ${user.phone}</li>
        `;
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
};

getData();
