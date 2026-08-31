# Armonica Nature Festival

Landing page statica per **Armonica Nature Festival, La Spirale della Vita**.

## Anteprima locale

Apri `index.html` nel browser oppure avvia un server statico dalla cartella del progetto:

```powershell
python -m http.server 4173
```

## Pubblicazione con GitHub Pages

1. Apri **Settings > Pages** nel repository GitHub.
2. In **Build and deployment**, scegli **Deploy from a branch**.
3. Seleziona il branch `main` e la cartella `/ (root)`.
4. Salva e attendi la pubblicazione.

Il dominio personalizzato `armonicafestival.it` andrà configurato soltanto dopo avere impostato i record DNS richiesti da GitHub Pages.

## Sicurezza

Il file `.envlocal` contiene credenziali locali ed è escluso dal repository tramite `.gitignore`.
