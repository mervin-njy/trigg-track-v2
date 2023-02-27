# trigg-track-v2

Reiterated version of [trigg.track.](https://github.com/mervin-njy/trigg-track), with the following key differences mostly in technologies used:

|    **Trigg.Track.** | **v1**                | **v2**                |
|---------------------|-----------------------|-----------------------|
|               Model | NoSQL - Firestore     | SQL - PostgreSQL      |
|          Controller | -                     | Express with Node.js  |
|                View | React with JavaScript | React with TypeScript |
|             Styling | Vanilla CSS           | Tailwind CSS          |
| User Authentication | -                     | yes                   |
|  Data visualization | -                     | yes                   |

The server side repository can be found [here](https://github.com/mervin-njy/trigg-track-v2_client).

### User Authentication

There are two main types of users. 

|       **User type** | **Health loggers**                                                                                                                                     | **Service Providers**                                                                                                                          |
|--------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
|             Purpose | To log daily data regarding health condition and variables.  By tracking potential triggers, one can seek external help  to plan for lifestyle change. | To promote services, browse and connect with potential customers. Track conditions of existing customers, provide consultations and solutions. |
| Profile information | 1. Username                                                                                                                                            | 1. Username                                                                                                                                    |
|                     | 2. Password                                                                                                                                            | 2. Password                                                                                                                                    |
|                     | 3. User type                                                                                                                                           | 3. User type                                                                                                                                   |
|                     | 4. Profile picture (nullable)                                                                                                                          | 4. Profile picture (not nullable)                                                                                                              |
|                     | 5. Name                                                                                                                                                | 5. Name                                                                                                                                        |
|                     | 6. Bio - description of condition and lifestyle                                                                                                        | 6. Profession                                                                                                                                  |
|                     | 7. Access - private or public                                                                                                                          | 7. Contact details                                                                                                                             |
|                     | 8. History display - private or public                                                                                                                 | 8. Bio - description of role, motivation etc.                                                                                                  |
|                     |                                                                                                                                                        | 9. Reviews                                                                                                                                     |
|           Functions | 1. To log daily data regarding health condition and variables to track                                                                                 | 1. To                                                                                                                                          |
|                     | 2. To view history of recorded data in various assortment.                                                                                             |                                                                                                                                                |
|                     | 3. To add potential triggers to separate trigger list                                                                                                  |                                                                                                                                                |
|                     | 4. To browse, request and access service providers for support                                                                                         |                                                                                                                                                |
|                     | 5. To add                                                                                                                                              |                                                                                                                                                |
