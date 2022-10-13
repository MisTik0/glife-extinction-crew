# How to install the Crew Bot:

1 - Have a VPS 

2 - If not done : Install Node-Js (See the github if problem)

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs

3 - Installed PM2 :

 npm install pm2 -g

4 - Added the Crew Bot on your VPS

5 - Create an application here --> https://discord.com/developers/applications

6 - Go to 'Bot' then check, and get the token

7 - Put the token in the '.env' file (TOKEN)

8 - Oauth2 --> Retrieve the ClientID and put it in the '.env' file (CLIENTID)

9 - Right click on your discord server --> Copy the ID and put it in the file '.env' (GUILD)

10 - Create a role for the give points permission and retrieve the identifier and put it in the file '.env' --> POINTPERMISSION

11 - Create a role for the lead role and retrieve the identifier and put it in the file '.env' --> LEADROLE

12 - Create a voice channel for the airdrop players list (Put it in the file '.env' --> VOCALDROP)

13 - And if you want, change the bot status && default give point for the presence drop (in the file '.env' --> STATUS && PRESENCEGIVEPOINTS)

14 - On (Putty, Termius, etc) 'cd /root/filename

15 - Then 'pm2 start index.js

# Credits
Created by me 
S/o @bycop (https://github.com/bycop) 
