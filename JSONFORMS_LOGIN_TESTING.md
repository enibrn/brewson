# JSONForms Login Integration - Testing Guide

## Overview
Il form di login è stato integrato con JSONForms e i Vue Vuetify Renderers, implementando un sistema di validazione a 3 fasi come richiesto.

## 🧪 Come Testare le Validazioni

### Fase 1: Validazioni Frontend (JSON Schema)
Queste validazioni avvengono in tempo reale nel browser:

**Username/Email:**
- ✅ **Test valido**: `test@example.com` (almeno 4 caratteri)
- ❌ **Test invalido**: `abc` (meno di 4 caratteri)
- ❌ **Campo obbligatorio**: lascia vuoto

**Password:**
- ✅ **Test valido**: `password123` (almeno 8 caratteri)
- ❌ **Test invalido**: `pass` (meno di 8 caratteri)
- ❌ **Campo obbligatorio**: lascia vuoto

### Fase 2: Validazioni Backend sui Singoli Campi
Queste validazioni simulate appaiono come errori sui campi specifici:

**Per testare "User not found":**
- Username: `notfound@test.com` oppure `notfound`
- Password: qualsiasi password valida (minimo 8 caratteri)
- Risultato: errore rosso sotto il campo Username/Email

**Per testare "Password incorrect":**
- Username: qualsiasi username valido (tranne "notfound")
- Password: `wrongpass`
- Risultato: errore rosso sotto il campo Password

### Fase 3: Validazioni Generiche Backend
Questi errori appaiono nel v-alert sopra i pulsanti:

**Per testare "Ops something went wrong code:123":**
- Usa qualsiasi credenziale valida che passa le fasi 1 e 2
- L'errore appare casualmente nel 30% dei tentativi
- Esempio: `user@test.com` + `validpassword123`
- Risultato: alert rosso con messaggio generico

## 🎯 Scenari di Test Completi

### Test 1: Validazione Frontend
```
Username: "ab"
Password: "123"
Risultato: Errori di validazione frontend (minimo caratteri)
```

### Test 2: Backend Field Error - User Not Found
```
Username: "notfound@test.com"
Password: "validpassword123"
Risultato: "User not found" sotto il campo username
```

### Test 3: Backend Field Error - Wrong Password
```
Username: "validuser@test.com"
Password: "wrongpass"
Risultato: "Password is incorrect" sotto il campo password
```

### Test 4: Generic Backend Error (30% chance)
```
Username: "user@test.com"
Password: "validpassword123"
Risultato: Potenziale "Ops something went wrong code:123" nell'alert
```

### Test 5: Login Successful
```
Username: "admin@brewson.com" (da TestAccountsMenu)
Password: "validpassword123"
Risultato: Reindirizzamento alla home page
```

## 🔧 Implementazione Tecnica

### JSONForms Schema (Fase 1)
- `minLength: 4` per username/email
- `minLength: 8` per password
- `required: ['usernameOrEmail', 'password']`

### External Errors (Fase 2)
- Utilizza `additional-errors` prop di JSONForms
- Errori mappati sui campi specifici tramite `instancePath`

### Generic Errors (Fase 3)
- Gestiti tramite `v-alert` separato
- Non collegati a campi specifici
- Clearance automatica quando l'utente modifica i dati

## 🎨 Benefici dell'Integrazione

1. **Validazione Real-time**: JSONForms fornisce validazione immediata
2. **Styling Coerente**: Vuetify renderers mantengono il design system
3. **Gestione Errori Strutturata**: Separazione clara tra errori di campo e generici
4. **Esperienza Utente Migliorata**: Feedback visivo immediato e chiaro
5. **Codice Pulito**: Schema-driven approach riduce la complessità
