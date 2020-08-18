
# VacayCity


## Live Demo

To see the app in action, go to https://vacaycity.herokuapp.com/

## Features

* Authentication:
  
  * User login with username and password

  * Admin sign-up with admin code

* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users

  * Admin can manage all posts and comments

* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload site photos
  
  * Search existing sites

* Manage user account with basic functionalities:

  * Profile page setup with sign-up

* Flash messages responding to users' interaction with the app

* Responsive web design

### Custom Enhancements

* Update campground photos when editing sites

* Update personal information on profile page
 
## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone or download this repository

```sh
git clone https://github.com/sachingw777/VacayCity.git
```

### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [async](http://caolan.github.io/async/)
* [crypto](https://nodejs.org/api/crypto.html#crypto_crypto)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Heroku](https://www.heroku.com/)
* [CleverCloud] (https://www.clever-cloud.com/)

## License

#### [MIT](./LICENSE)
