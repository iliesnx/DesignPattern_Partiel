//Pattern Strategy
class EmailChannel {
    send(to, message) {
        console.log(`[EMAIL] À: ${to} | Message: ${message}`);
    }
}

class SMSChannel {
    send(to, message) {
        console.log(`[SMS] À: ${to} | Message: ${message}`);
    }
}

class InternalChannel {
    send(to, message) {
        console.log(`[INTERNE] À: ${to} | Message: ${message}`);
    }
}

//Pattern Factory
class ChannelFactory {
    static create(type) {
        switch(type) {
            case 'email': return new EmailChannel();
            case 'sms': return new SMSChannel();
            case 'internal': return new InternalChannel();
            default: throw new Error(`Canal ${type} inconnu`);
        }
    }
}

// Pattern Command
class SendNotificationCommand {
    constructor(channelType, recipient, message) {
        this.channel = ChannelFactory.create(channelType);
        this.recipient = recipient;
        this.message = message;
    }

    execute() {
        this.channel.send(this.recipient, this.message);
    }
}

// Pattern Observer
class EventManager {
    constructor() {
        this.listeners = {};
    }

    on(eventType, handler) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(handler);
    }

    emit(eventType, data) {
        console.log(`\n>>> event : ${eventType}`);
        const handlers = this.listeners[eventType] || [];
        handlers.forEach(handler => handler(data));
    }
}

// Systeme ShopEase
class ShopEaseNotificationSystem {
    constructor() {
        this.events = new EventManager();
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // Nouvelle commande faut envoyer un email au client
        this.events.on('nouv_comm', (data) => {
            const cmd = new SendNotificationCommand(
                'email',
                data.customerEmail,
                `Votre commande #${data.orderId} est confirmée. Montant: ${data.amount}€`
            );
            cmd.execute();
        });

        // paiement refusé faut envoyer un email au support
        this.events.on('paiement_refuse', (data) => {
            const cmd = new SendNotificationCommand(
                'email',
                'support@shopease.com',
                `Paiement refusé commande #${data.orderId}. Client: ${data.customerEmail}`
            );
            cmd.execute();
        });

        // Coli expédier faut envoyer un sms au client        
        this.events.on('colis_exp', (data) => {
            const cmd = new SendNotificationCommand(
                'sms',
                data.customerPhone,
                `Votre colis #${data.trackingNumber} est expédié!`
            );
            cmd.execute();
        });

        this.events.on('commande_elevee', (data) => {
            const cmd = new SendNotificationCommand(
                'internal',
                'equipe-ventes',
                `Grosse commande #${data.orderId}: ${data.amount}€ de ${data.customerName}`
            );
            cmd.execute();
        });
    }

    // méthodes pour simuler les events
    newOrder(orderId, customerEmail, amount) {
        this.events.emit('nouv_comm', { orderId, customerEmail, amount });
    }

    paymentRefused(orderId, customerEmail) {
        this.events.emit('paiement_refuse', { orderId, customerEmail });
    }

    packageShipped(orderId, customerPhone, trackingNumber) {
        this.events.emit('colis_exp', { orderId, customerPhone, trackingNumber });
    }

    highValueOrder(orderId, customerName, amount) {
        this.events.emit('commande_elevee', { orderId, customerName, amount });
    }
}

// Démo

const shopease = new ShopEaseNotificationSystem();

console.log("1. Nouvelle commande:");
shopease.newOrder('cmd-001', 'i.boudhan@myskolae.fr', 150);

console.log("\n2. Paiement refusé:");
shopease.paymentRefused('cmd-002', 'i.boudhan@myskolae.fr');

console.log("\n3. Colis expédié:");
shopease.packageShipped('cmd-001', '0717717171', 'track-12345');

console.log("\n4. Commande montant élevé:");
shopease.highValueOrder('cmd-003', 'Ilies BOUDHAN', 2500);
