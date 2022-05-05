# Server side of Linkedin Autobot application

## About

The application is aimed to crawl in Linkedin and collect data of accounts according to search settings.

**Preset in search:**
Search is carried out in Israel. But there are no other presets of search words: users can add or delete search words, run the scraper manually.

The application is designed for working on the found profiles by 1 team.

**Application functionality for users:**

- Sign in for team members
- Choose personal search words for search
- Get results of crawling
  Users have 3 lists: all results, latest results, stared results
- Star a profile (add to a list "Stared")
- Hide a profile (without deleting from the database)
- Start a process of crawling manually

## Deployment

Frontend of the application is deployed on [Netlify - Linkedin Autobot Frontend](https://velocity-ventures-linkedin-autobot.netlify.app/)

Backend of the application was deployed on [Heroku - Linkedin Autobot Backend](https://linkedin-autobot-server.herokuapp.com/")

## Technologies

- Typescript
- Node.js
- Express.js
- Puppeteer.js
- MongoDB
- Mongoose
- Bcrypt
- JWT
- Eslint (for development)

## Scrapper with Puppeteer.js

**Scrapping flow:**

1. Puppeteer runs the browser by the link that was defined by search words.
2. Login in Linkedin with cookies (set cookies into Chromium)
3. Getting new cookies, storing them and setting them into Chromium
4. Scrapping and getting links of all profiles
5. Scrapping each profile
   Some users of Linkedin limit access to their profiles if he/she is not in the first connection. Because of this setting we check if the account is not closed and don't add the scrapper result to the database.
6. Checking if the scrapped profiles exists in the database
   If the profile has already existed, we don't add it to the database.

**Challenge:**
Linkedin tries to block attempts of scrapping its web site and want to make sure that the real person searches for results.
In this project we tried to imitate the human behaviour by adding random time interval between each action.

## Hashing with Bcrypt

To secure the stored in the database password, hashing with adding salt rounds was implemented.

## JWT middleware

Autentication was implemented to provide sign in for various users by adding token to user (without storing the token in the database) and sending it as a response to the frontend.

## Other middleware

In the scr/app.ts middleware was implemented to catch errors and if the round is not correct, the message that page was not found is sent.

```ts
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err) return res.status(err.status).send(err);
  return next(req);
});

app.use('/api', router);

app.use((req: Request, res: Response) => {
  res.status(404).send('Page Not Found');
});
```
