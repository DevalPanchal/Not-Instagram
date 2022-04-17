# Web Dev Final Project
| Group Member Name | GitHub Username (GitHub URL)|
| :------------------------:|:--------------------------------------:|
| Deval Panchal | [DevalPanchal](https://github.com/DevalPanchal) |
| Daniel Earley | [daniel-earley](https://github.com/daniel-earley) |
| FirstName LastName | [Username](https://github.com/) |
| FirstName LastName | [Username](https://github.com/) |
| FirstName LastName | [Username](https://github.com/) |

# Project Overview
The project that was decided to be developed was an instagram clone dubbed "Not-Instagram", which covers the basic functionalities of the actual instagram app.

# How to run
1. Navigate to the server directory
2. run `npm install`
3. create a `.env` file
4. add value `MONGO_URI="insert your mongodb atlas uri here"`
    - to get you mongodb atlas uri make an account on https://www.mongodb.com/
    - then sign up for a free mongodb cluster (512 mb)
    - once the cluster is made click `Connect` on your cluster
    - then in the pop-up modal click on `Connect your application`
    - then copy the uri and paste it in the `.env` file `MONGO_URI="your uri here"`
    - make necessary changes to the uri (i.e. username, password, db name)
5. run the server with `npm run server`
6. navigate to the client directory
7. run `npm install`
8. npm the client with `npm run serve` on a different terminal
9. navigate to localhost:8080 on your browser
