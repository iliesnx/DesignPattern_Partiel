class EmailStrategy {
    send(message) {
        console.log(`email envoyé: ${message}`);
    }
}

class SMSStrategy {
    send(message) {
        console.log(`SMS envoyé: ${message}`);
    }
}

class NotificationCommand {
    constructor(strategy, message) {
        this.strategy = strategy;
        this.message = message;
        this.executed = false;
    }
    
    execute() {
        if (this.executed) {
            console.log(" commande déjà exécutée");
            return;
        }
        
        this.strategy.send(this.message);
        this.executed = true;
    }
    
    undo() {
        if (this.executed) {
            console.log(`Action annulée pour: "${this.message}"`);
            this.executed = false;
        }
    }
}

console.log("COMMAND PATTERN");

const emailStrategy = new EmailStrategy();
const smsStrategy = new SMSStrategy();

const cmd1 = new NotificationCommand(emailStrategy, "Votre commande est confirmée");
const cmd2 = new NotificationCommand(smsStrategy, "Votre colis est expédié");

console.log("Préparation des commandes...");
console.log("Exécution:");

cmd1.execute();
cmd2.execute();
