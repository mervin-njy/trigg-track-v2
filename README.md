# trigg-track-v2

Reiterated version of [trigg.track](https://github.com/mervin-njy/trigg-track), with the following key differences mostly in technologies used:

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

|       **User type** | **Health loggers**                                                     | **Service Providers** |
|--------------------:|------------------------------------------------------------------------|-----------------------|
|             Purpose | 1. To log daily data regarding health condition and variables to track | 1. To                 |
|                     | 2. To view history of recorded data in various assortment.             |                       |
|                     | 3. To key in                                                           |                       |
| Profile information | 1                                                                      | 1                     |
|           Functions | 1                                                                      | 1                     |
