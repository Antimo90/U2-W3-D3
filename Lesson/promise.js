// un'evoluzione sul concetto delle CALLBACKS sono le cosiddette PROMISES
// una Promise è un oggetto JS che simboleggia un'operazione asincrona, delineata
// nelle seguenti fasi:

// 1) Promise PENDING (in esecuzione)
// 2) Promise SETTLED (conclusa), che può risultare in un'operazione
// -resolved- (finale buono) oppure -rejected- (finale cattivo)

// il codice per gestire la fase -resolved- va inserito in un metodo chiamato .then()
// il codice per gestire la fase -rejeceted- va inserito in un metodo chiamato .catch()

// noi oggi studiamo le Promise in generale perchè il metodo moderno dei browser
// per effettuare una HTTP REQUEST si chiama .fetch() e RITORNA UNA PROMISE!

// fetch() -> fetch è un metodo HTTP che effettua una REQUEST dal nostro client,
// ritornerà la RESPONSE da parte del server incapsulata in una Promise
