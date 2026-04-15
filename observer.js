// OBSERVER PATTERN - Un objet notifie automatiquement d'autres objets

class Subject {
    constructor() {
        this.observers = [];
    }
    
    subscribe(observer) {
        this.observers.push(observer);
        console.log(`${observer.name} s'est abonné`);
    }
    
    notify(data) {
        console.log(`\nNotification: "${data}"`);
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    
    update(data) {
        console.log(`${this.name} a reçu: ${data}`);
    }
}

// Démonstration
console.log("=== OBSERVER PATTERN ===");

const shopEase = new Subject();
const client = new Observer("Client");
const support = new Observer("Support");

shopEase.subscribe(client);
shopEase.subscribe(support);

shopEase.notify("Nouvelle commande reçue!");
shopEase.notify("Paiement confirmé");
