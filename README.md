## Design Patterns Identifiés

**Observer** : Permet aux événements e-commerce de notifier automatiquement les canaux de notification

**Strategy** : Chaque canal (Email, SMS, Interne) est une stratégie interchangeable, facilitant l'ajout de nouveaux canaux.

**Factory** : Pour centraliser la création des notifications sans exposer les détails d'implémentation des canaux.

**Command** : Encapsule chaque notification comme une commande exécutable, permettant le traitement asynchrone et les tentatives de renvoi.

**Decorator** (optionnel) : Ajoute dynamiquement des fonctionnalités comme la priorité ou le formatage sans modifier les classes existantes.