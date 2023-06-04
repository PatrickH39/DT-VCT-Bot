const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content.startsWith('!verify'))  { // Change !apply As Per Your Msg To Send Msg With Button

let result = await lib.discord.users['@0.2.1'].me.status.update({
  activity_name: `VALORANT`, // The custom status!
  activity_type: 'GAME', // What it is doing.
  status: 'ONLINE', // Change this to DND or IDLE.
});

await lib.discord.channels['@0.3.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "components": [
    {
      "type": 1,
      "components": [
        {
          "style": 3,
          "label": `I agree to these terms and conditions`,
          "custom_id": `verify_modal`,
          "disabled": false,
          "type": 2
        }
      ]
    }
  ],
  "embeds": [
    {
      "type": "rich",
      "title": `Welcome to the DT Valorant Champions Tour server!`,
      "description": `To get access to the rest of the server, please read through our <#1081072005530538115>.\n\nThen, click the button below this message to indicate that you've **read the rules and will follow them to the best of your ability**.\n\nIf you do not enter valid information, you will be permanently banned from this server and may be blacklisted from any Discord servers associated with DT.`,
      "color": 0xfa4454
    }
  ]
});}