# Oauth2 Express

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/badge/express-v4.17.1-green)](https://www.npmjs.com/package/express) [![npm version](https://img.shields.io/badge/googleapis-v52.1.0-red)](https://www.npmjs.com/package/googleapis) 

Project is used to authenticate user using google account and get user info from google. Secure way of authenticating user.

Let's start with implementation,

### Step 1 - 

- Go to the [Google developer console] and login without your google account. Create or select project in google.
- Go to OAuth consent screen. Click on Create by selecting user type. Choose the support email and other settings. Save settings.

### Step 2 -

- Go to Credentials and create new Credentials by choosing OAuth client ID.
- Add you URL and callback url in which the successful token will be redirected to.
- You will get Client ID and Client Secrete from the created credentials.

### Step 3-

- Fork this repository and run 
```sh
 $ npm install
```
- Edit the environment file located in location env/env.js with your client ID and client Secrete.
- That's it you are good to go.
```sh
 $ node app.js
 ```

[Google developer console]: <https://console.developers.google.com/apis/credentials>
