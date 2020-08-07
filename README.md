# Mk1092.github.io

# vs-code:
Progetto basato su phaser3 e typescript, usando visual studio code

## steps:

### installare node e npm

- guida (ubuntu): https://www.e2enetworks.com/help/how-to-install-nodejs-npm-on-ubuntu/
- passi:

	```
	#aggiunta dei ppa
	$ apt-get install python-software-properties
	$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash –
	$ apt-get install nodejs
	#verifica della versione
	$ node -v
	$ npm -v
	```

### installare Visual Studio Code

- guida (linux): https://code.visualstudio.com/docs/setup/linux
- passi:
  - scaricare il pacchetto .deb https://code.visualstudio.com/Download
  - eseguire:

	```
	$ sudo apt install ./<file>.deb
	```

### setup
- scaricare la repository e aprire Visual Studio Code (eseguire vs-code-boot.sh se si hanno problemi di permessi)
- scaricare le seguenti estensioni da Visual Studio:
  - ESLint 2.1.8 (autore Dirk Baumer)
  - JavaScript and TypeScript Nightly 4.1.20 (autore Microsoft)
  - Live Server 5.6.1 (autore Ritwick Dey)
  - npm 3.3.0 (autore Florian Knop)
  - Project Manager 11.1.0 (autore Alessandro Fragnani)

- da Visual Studio importare workspace e progetto
- click destro su index.html e selezionare "Open with Live Server" per fare partire il gioco nel browser
- da terminale di Visual Studio Code lanciare:
	```
 	tsc -watch
 	```
 	per il controllo e aggiornamento live del codice da parte del server
- lavorare sui file ts in src per il codice etc etc