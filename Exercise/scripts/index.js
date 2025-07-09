// Array globale per tenere traccia degli elementi
let cart = [];
// Funzione per salvare il carrello nel localStorage
const saveCart = () => {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  // Aggiorna l'interfaccia utente dopo aver salvato
  updateCartUI();
};
// Funzione per caricare il carrello dal localStorage
const loadCart = () => {
  const storedCart = localStorage.getItem("shoppingCart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  updateCartUI();
};

// Funzione per aggiornare l'interfaccia utente del carrello
const updateCartUI = () => {
  const cartItemsList = document.getElementById("cart-items");
  // Pulizia della lista corrente
  cartItemsList.innerHTML = "";
  // prendiamo l'elemento del saldo totale
  const cartTotalElement = document.getElementById("cart-total");
  //   inizio totale
  let total = 0;

  const emptyCartMessage = document.getElementById("empty-cart-message");
  //  il messaggio esiste?
  if (emptyCartMessage) {
    // Rimuovi il messaggio "Carrello vuoto" se presente
    emptyCartMessage.remove();
  }

  if (cart.length === 0) {
    // Se il carrello è vuoto, aggiungi il messaggio "Carrello vuoto"
    const emptyMessage = document.createElement("li");
    emptyMessage.id = "empty-cart-message";
    emptyMessage.className =
      "list-group-item d-flex justify-content-between align-items-center";
    emptyMessage.textContent = "Il carrello è vuoto.";
    cartItemsList.appendChild(emptyMessage);
  } else {
    cart.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      listItem.innerHTML = `
                ${item.title} - €${item.price.toFixed(2)}
                <button class="btn btn-danger btn-sm remove-from-cart-btn" data-index="${index}">Rimuovi</button>
            `;
      cartItemsList.appendChild(listItem);
      // Aggiungi il prezzo dell'articolo al totale
      total += item.price;
    });
  }
  cartTotalElement.textContent = `€${total.toFixed(2)}`;
};

// Funzione per aggiungere un libro al carrello
const addToCart = (book) => {
  cart.push(book);
  // Salva il carrello dopo l'aggiunta
  saveCart();
};

// Funzione per rimuovere un libro dal carrello
const removeFromCart = (index) => {
  // Rimuove 1 elemento all'indice specificato
  cart.splice(index, 1);
  // Salva il carrello dopo la rimozione
  saveCart();
};

// Listener per il pulsante "Svuota Carrello"
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  // Svuota l'array del carrello
  cart = [];
  // Salva lo stato vuoto
  saveCart();
});

// Listener per i pulsanti "Rimuovi" nel carrello (delegazione eventi)
document.getElementById("cart-items").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const index = parseInt(event.target.dataset.index);
    removeFromCart(index);
  }
});

// creiamo una richiesta
const getBookshelf = function () {
  // utiliziamo il metodo fetch
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log("RESPONSE", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Lbreria non trovata!!");
      }
    })
    .then((data) => {
      console.log("DATA", data);
      const containerCard = document.getElementById("container-card");
      // Itera su ogni libro ricevuto dall'API
      data.forEach((book) => {
        //  Crea l'elemento div per la colonna
        const col = document.createElement("div");
        col.className = "col col-12 col-md-4 col-lg-3";
        col.innerHTML += `
            <div class="card h-100 position-relative bg-light"> 
                <img src="${book.img}" class="card-img-top" alt="${book.title}" />
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text flex-grow-1"> 
                        Asin: ${book.asin} <br />
                        Category: ${book.category} <br />
                        Price: ${book.price} 
                    </p>
                    <div class="d-flex justify-content-between mt-auto">
                        <a href="#" class="btn btn-success add-to-cart-btn">Aggiungi al carrello</a>
                        <a href="#" class="btn btn-danger remove-btn">Scarta</a>
                    </div>
                </div>
            </div>`;
        // ora richiamo il bottone scarta
        const removeButton = col.querySelector(".remove-btn");
        // aggiunta evento listener
        if (removeButton) {
          removeButton.addEventListener("click", function (event) {
            // prevengo il comportamento predefinito
            event.preventDefault();
            // risalgo all'elemento card genitore e rimuovilo
            const cardToRemove = event.target.closest(".card");
            if (cardToRemove) {
              // rimuove la card
              cardToRemove.classList.add("hidden-card");
            }
          });
        }
        // ora passiamo al bottone aggiungi al carrello
        const addToCartButton = col.querySelector(".add-to-cart-btn");
        if (addToCartButton) {
          addToCartButton.addEventListener("click", function (event) {
            event.preventDefault();
            // Passa l'intero oggetto 'book' alla funzione addToCart
            addToCart(book);
          });
        }
        containerCard.appendChild(col);
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
};

// Carica il carrello all'avvi
loadCart();
// Poi carica i libri
getBookshelf();
