#WebRTC Virtual Classrooms


A Small Project that leverages the Licode WebRTC communications platform to create virtual classrooms using the relatively new WebRTC standard.
The project uses [meteor.js](https://www.meteor.com), [react.js](https://facebook.github.io/react/), [redux.js](http://redux.js.org/), [material-ui](http://material-ui.com/)
and the [Licode WebRTC communications platform](http://lynckia.com/licode/). 

This project is still under heavy development. A working feature-complete prototype will be available by the end of August 2016.

##Setting up a development environment 

1. Install a Licode server using the instructions at [http://lynckia.com/licode/install.html](http://lynckia.com/licode/install.html)
2. Install [meteor.js](https://www.meteor.com/install)
3. Clone this repo
4. Edit the project [config file](/imports/licode/config.js)
5. Run `npm install`
6. Run the project using the `meteor` command 

##Setting up https

You'll need this to be able to use screen capturing.

Below is a quick fix method to get your app running in https.

1. Create an ssl certificate and key in the private directory
2. Run `git clone https://github.com/Tarang/Meteor-SSL-proxy.git` outside the project
3. `cd Meteor-SSL-proxy`
4. Edit `PATH_to_KEY` and `PATH_TO_CERT` in main.js to point to your key and certificate
5. Comment `PATH_TO_CHAIN` and `ca : fs.readFileSync(PATH_TO_CHAIN, 'utf8')`
6. Set `target` to http://localhost:8888
7. Run main.js with forever or something

Since https won't let you make requests to http urls, you'll need to set your Licode server to https as well.



Open `licode/scripts/licode_default.js`
Change the settings as below:

```javascript
config.erizoController.hostname = 'your_server_hostname_include_domain_name'; //default value: ''
config.erizoController.port = 8443; //default value: 8080
// Use true if clients communicate with erizoController over SSL
config.erizoController.ssl = true; //default value: false
```

```javascript
// This configuration is used by erizoController server to listen for connections
// Use true if erizoController listens in HTTPS. SSL certificates located in /cert
config.erizoController.listen_ssl = true; //default value: false
config.erizoController.listen_port = 8443; //default value: 8080
```

Finally, replace both cert.pem and key.pem in /cert directory with your own cert files. 
