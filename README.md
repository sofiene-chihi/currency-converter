# Currency Converter Challenge
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


This small project was my first coding challenge for the position of a Backend intern where the requested task was to : 

Create a REST API that converts currency rates between EUR, USD and CHF (all ways).
The application should allow the users to convert between currencies and save the
history of conversion operations to the database.
The main endpoints required are :
* /convert
* /history


## RUNNING THE NEST REST API ON YOUR HOST MACHINE

* Clone the project

* Install nestjs and mysql on your computer if you don't already have
  
* Create a "currency_converter" database that can be accessed using username "root" with password "sofiene" (you can change that to whatever you want)

* Install npm dependencies using ```npm install```

* Add the CURRENCY_API_SECRET in the .env file to be able to interact with currencylayer API

* Run the backend using ```npm run start:dev```

## RUNNING THE PROJECT USING DOCKER-COMPOSE

This way is way easier than the previous one since you don't have to deal with mysql installation on your machine and you can run the backend and the database using one command.

* Install docker and docker-compose if you don't already have

* Run the docker-compose file using this command
  
  ```docker-compose up -d``` 

* We can check if our containers are running using ```docker ps```

## Testing the Backend endpoints

* In order to make conversions between USD,EUR,CHF you need to create an account by sending post request to /auth/register containing
```
{
  name : string,
  email: string,
  password: string
}
```

* To login to your account and get your jwt token, send post request to /auth/login containing
```
{
  email : string,
  password : string
}
```

* To convert currency, send post request to /conversion/convert containing
```
{
  currencyFrom: string
  currencyTo: string
  amountInitial: number
}
```
PS : Dont forget to put your JWT in the header of your request in order to be authorized to access the conversion endpoints

* To get your conversions history, send a get request to /conversion/history 

PS: any request sent to /conversion/convert or /conversion/history without the jwt token will have a 401 unauthorized response