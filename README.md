# Web Dev Final Project
| Group Member Name | GitHub Username (GitHub URL)|
| :------------------------:|:--------------------------------------:|
| Deval Panchal | [DevalPanchal](https://github.com/DevalPanchal) |
| Daniel Earley | [daniel-earley](https://github.com/daniel-earley) |
| Richard Pena | [RichardAPena](https://github.com/RichardAPena) |
| Sirichai Justin Wong | [SJustinWong](https://github.com/SJustinWong) |
| Samih Ejel | [samihejel](https://github.com/samihejel) |

# Project Overview
The project that was decided to be developed was an instagram clone dubbed "Not-Instagram", which covers the basic functionalities of the actual instagram app.

# Software/Tools used:
MongoDB, Vue, JSON Web Tokens, Vue-Toast-Notification, and Bootstrap

# Independant Study, JSON WebTokens:
Slides: https://docs.google.com/presentation/d/1ES5ZXtfi_e5v1DEcb-tyO_oPXYZSgRCLVn3dOxMJpgk/edit?usp=sharing

# Main functionalities include:
- Dedicated user accounts with a username + password
- Functioning account login + registration
- User posts made up of an image, caption, and comments
- Friend system that allows you to request friendship from other users, as well as view your current list of friends
- Upload-based profile picture customization
- Filter-based user searching, that allows for friend requests and searched user profile viewing

# How to run
1. Navigate to the server directory
2. run `npm install`
3. create a `.env` file
4. add value `JWT_SECRET="type anything you want here and it should work"`
5. add value `MONGO_URI="insert your mongodb atlas uri here"`
    - to get you mongodb atlas uri make an account on https://www.mongodb.com/
    - then sign up for a free mongodb cluster (512 mb)
    - once the cluster is made click `Connect` on your cluster
    - then in the pop-up modal click on `Connect your application`
    - then copy the uri and paste it in the `.env` file `MONGO_URI="your uri here"`
    - make necessary changes to the uri (i.e. username, password, db name)
6. run with "npm run dev"
