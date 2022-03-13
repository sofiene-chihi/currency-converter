In this README file, we will explain how we can run our currency converter backend application locally on our machine and using the docker containers.

************* RUNNING THE NEST REST API ON THE HOST MACHINE ********************

-In this case, you need nestjs and mysql on your computer
-Create mysql database called "currency_converter" that can be accessed using username "root" with password "sofiene"
-Install npm dependencies using "npm install"
-Make sure that the host in the TypeOrmModule config is set to "localhost"
-Add the CURRENCY_API_SECRET in the .env file to be able to interact with currencylayer API
-Run the backend using "npm run start:dev"

************* RUNNING THE NEST REST API USING DOCKER CONTAINER ********************

-This way is way easier than the previous one cause you don't need to install any dependencies, you just need docker and docker-compose installed in your computer
-Before building the docker image for our backend, make sure that the host in the TypeOrmModule config is set to "mysql_db"
-Our .env variables can't be red inside the container because of the production environment, so we have the set it as an env variable in our OS or just hard code it in the conversion.service.ts in currency_api ( second option is easier but dont recommand it )
-Create the docker volume for our container database for data persistency using : "docker volume create currency-converter-db"
-Create the database in our mysql container using :
  docker run -d -v /var/lib/docker/volumes/currency-converter-db/_data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=sofiene mysql
  docker exec -it container-id bash // container-id can be get using docker ps
  mysql -u root -p // here provide "sofiene" as a password
  create database currency_converter;
-Build the application using "docker build -t currency-converter ." , this will generate a docker image called currency-converter
-Run the backend app and mysql db containers together with our docker-compose.yaml file using "docker-compse up"


************* HOW TO USE OUR REST API ********************


-In order to make conversions between USD,EUR,CHF you need to create an account by providing {name,email,password} using post request to /auth/register : 
{
  name : string,
  email: string,
  password: string
}
-To login to your account and get your jwt token, send post request to /auth/login with the body containing :
{
  email : string,
  password : string
}
-To convert currency, send post request to /conversion/convert with the body containing 
{
  currencyFrom: string
  currencyTo: string
  amountInitial: number
}
*Dont forget to put your jwt token in the header of your request and you will get response containing the amountResult and the date
-To get your conversions history, send a get request to /conversion/history 
*Dont forget to put your jwt token in the header of your request and you will get response containing all the conversions you made with the date

NOTE: any request sent to /conversion/convert or /conversion/history without the jwt token will have a 401 unauthorized response