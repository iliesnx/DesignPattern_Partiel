class EmailStrategy {
    send(message) {
        console.log(`email envoyé: ${message}`);
    }
}

class SMSStrategy {
    send(message) {
        console.log(`sms envoyé: ${message}`);
    }
}

class PushNotificationStrategy {
    send(message) {
        console.log(`notification envoyée: ${message}`);
    }
}

console.log("STARTEGY PATTERN");

const email = new EmailStrategy();
const sms = new SMSStrategy();
const push = new PushNotificationStrategy();

const message = "commande est expédié";

email.send(message);
sms.send(message);
push.send(message);

console.log("\nOn peut facilement ajouté un nouveau canal sans changer le code ");
