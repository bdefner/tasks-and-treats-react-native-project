# The tasks

1. "Invite friends & family to the application + gain 10 (lazy) points"
2. "Sharing of the challenges - or dashboard with your friends - (maybe even a leaderboard)"

## Task #1 - Gain 10 stars for inviting friends to the app

### Pseudo code

1. - I created an additional column "invite_token" in the user table of the database, which has to be unique to every user. On signup, the token is created using crypto and consits of a string of 10 characters (base64).
1. - **In the backend**, I hab to update the api endpoints /signup, /login and /auth as well as the functions getUserByUsername(), createUser() and getUserBySessionToken() to create the token on signup and send the token to the frontend, when needed.
1. - As well, I created the api endpoint /usepromotion. This endpoint takes an inviteToken as well as a sessionToken as arguments. It checks (a) if the sessionToken is valid and which user is associated with it (userA), (b) if the inviteToken is valid and which user is associated with it (userB) and (c) if userA != userB. When passed the budget of userB gets updated by 10 stars by calling the function updateUserByInviteToken().
1. - Also in the backend, I added a (first to display) challenge, which asks the user to invite friends to the app by using the users inviteToken.
1. - **In the frontend**, I added some elements and styles to the component ChallengeItem.js: A field to display the inviteToken and a Button to trigger sharing. When pressed, a link to the app (on expo) and a text containing the inviteToken is passed.
1. - On signup, I created a new screen which appears after creating the user account. There the new user get's asked "How did you hear about this app" and get's to choose "Invited by a friend". If that option gets chosen, the user get's asked for the "invitation code" (= inviteToken), which she/he can paste inside. Then, the token gets fetched to the api endpoint /usepromotion as described above. If valid, the new user sees a message "<username of userB> received 10 stars!" while a Lottie animation is played and the current available challenges gets fetched from the backend.

### Code snips corresponding to the pseudo code above

1. In postgreSQL: create table user with invite_token

```
CREATE TABLE users(
  user_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(70) NOT NULL UNIQUE,
  email varchar(70) NOT NULL,
  password_hash varchar (100) NOT NULL,
  budget integer,
  invite_token varchar(10) NOT NULL UNIQUE
```

in the /signup endpoint:

```
// Create an inviteToken

const inviteToken = cryptoRandomString({ length: 10, type: 'base64' });

// Create user with inviteToken

export async function createUser(
  username: string,
  email: string,
  passwordHash: string,
  budget: number,
  inviteToken: string,
) {
  const [userWithoutPasswordHash] = await sql<UserWithoutPasswordHash[]>`
  INSERT INTO users
    (username, email, password_hash, budget, invite_token)
  VALUES
  (${username}, ${email}, ${passwordHash}, 0, ${inviteToken})
  RETURNING
    user_id,
    username,
    email,
    budget,
    invite_token
  `;

  // return the user without the password_hash!
  return userWithoutPasswordHash;
}

    const userWithoutPasswordHash = await createUser(
      parsedRequestBody.username,
      parsedRequestBody.email,
      passwordHash,
      0,
      inviteToken,
    );


```
