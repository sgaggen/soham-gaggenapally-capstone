To run the server:
1. CD into the directory
2. Run npm install
3. Take a look at the .env.sample file and create your own .env file (see steps 4-5)
4. Create a database to use for the server and put its name into the .env file
5. Get your Spotify Cliend ID and Secret from the Spotify Developer's dashboard/toolkit
6. Run npm run migrate
7. Run npm run seed
8. Run npm run start

Notes:
If around an hour after you first start the server things start to break, it's probably because the Spotify token timed out. The token gets generated the first time the server calls the Spotify API and is then valied for an hour. In order to get it working again, just restart the server and continue using it as usual. It will automatically grab a new token for you, which in turn will be valid for another hour.