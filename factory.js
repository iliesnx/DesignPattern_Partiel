class EmailStrategy {
    send(message) {
        console.log(`email: ${message}`);
    }
}

class SMSStrategy {
    send(message) {
        console.log(`sms: ${message}`);
    }
}

class NotificationFactory {
    static create(type) {
        switch(type) {
            case 'email': 
                return new EmailStrategy();
            case 'sms': 
                return new SMSStrategy();
            default: 
                throw new Error(`Type ${type} non supporté`);
        }
    }
}


console.log("FACTORY PATTERN");

const canal1 = NotificationFactory.create('email');
const canal2 = NotificationFactory.create('sms');

canal1.send("Votre commande est confirmée");
canal2.send("Votre colis est en route");
