# Trigg.Track. v2

Reiterated version of [trigg.track.](https://github.com/mervin-njy/trigg-track), with the following key differences mostly in technologies used:

|    **Trigg.Track.** | **v1**                | **v2**                |
| ------------------: | --------------------- | --------------------- |
|               Model | NoSQL - Firestore     | SQL - PostgreSQL      |
|          Controller | -                     | Express with Node.js  |
|                View | React with JavaScript | React with TypeScript |
|             Styling | Vanilla CSS           | Tailwind CSS          |
| User Authentication | -                     | yes                   |
|  Data visualization | -                     | yes                   |

## Diagrams

### User Authentication

There are two main types of users.

|       **User type** | **Health loggers (HL)**                                                                                                                              | **Service Providers (SP)**                                                                                                                     | **Stretch Goal?** |
| ------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
|             Purpose | To log daily data regarding health condition and variables. By tracking potential triggers, one can seek external help to plan for lifestyle change. | To promote services, browse and connect with potential customers. Track conditions of existing customers, provide consultations and solutions. | NA                |
| Profile information | 1. username                                                                                                                                          | "                                                                                                                                              | -                 |
|                     | 2. password                                                                                                                                          | "                                                                                                                                              | -                 |
|                     | 3. user type                                                                                                                                         | "                                                                                                                                              | -                 |
|                     | 4. profile picture (nullable)                                                                                                                        | "                                                                                                                                              | yes               |
|                     | 5. name                                                                                                                                              | "                                                                                                                                              | -                 |
|                     | 6. profession                                                                                                                                        | "                                                                                                                                              | -                 |
|                     | 7. contact details                                                                                                                                   | "                                                                                                                                              | -                 |
|                     | 8. bio - description of condition and lifestyle                                                                                                      | " description of role and motivation etc.                                                                                                      | -                 |
|                     | 8. access - private / public / protected                                                                                                             | " public / protected                                                                                                                           | -                 |
|                     | 9. History - private or public                                                                                                                       | 9. reviews                                                                                                                                     | -                 |
|           Functions | - To create / update / delete user profile                                                                                                           | "                                                                                                                                              | -                 |
|                     | 1. To log daily data regarding health condition and variables to track                                                                               | -                                                                                                                                              | -                 |
|                     | 2. To add new options for condition and variable                                                                                                     | -                                                                                                                                              | yes               |
|                     | 3. To update / edit inputs on specific days                                                                                                          | -                                                                                                                                              | -                 |
|                     | 4. To view history of recorded data in various assortment                                                                                            | "                                                                                                                                              | -                 |
|                     | 5. To add potential triggers to separate trigger list                                                                                                | "                                                                                                                                              | -                 |
|                     | 6. To browse, request and access SPs for support                                                                                                     | "                                                                                                                                              | -                 |
|                     | 7. To access solutions from SPs                                                                                                                      | "                                                                                                                                              | -                 |
|                     | 8. To access comments from SPs on variables                                                                                                          | "                                                                                                                                              | -                 |
|                     | 9. To communicate with SPs                                                                                                                           | "                                                                                                                                              | yes               |
|                     | 10. To add review comments for SPs                                                                                                                   | "                                                                                                                                              | -                 |
|                     | 11. To communicate with other HLs in another platform                                                                                                | -                                                                                                                                              | yes               |

### Database tables & relationships

![database tables & relationships](./diagrams/database/database_tables_relationships.drawio.svg)

## Dependencies

### Client:

1. npm i -D tailwindcss
2. npx tailwindcss init

### Server:

1. npm init -y
2. npm i express nodemon
3. npm i express-validator
4. npm i pg cors dotenv
5. npm i express-session
6. npm i jsonwebtoken uuid bcrypt
