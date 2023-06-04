const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
//first we use the Array.map() method to iterate over our components and return values inputted by the user for each question.

let answers = context.params.event.data.components.map((componentRow) => {
  let textField = componentRow.components[0];
  return [textField.value]
})

let fn = answers[0].toString().trim();
let ln = answers[1].toString().trim();
let numcheck = answers[2].toString();
let nick = fn.concat(" ",ln);
let extnick = ("[EXT]").concat(" ",nick)

let verifiedRole = `${process.env.VerifiedRole}`;

var date = new Date()
var pstDate = date.toLocaleString("en-US", {
  timeZone: "America/Vancouver"
})

if (/^[A-Za-z ]+$/.test(nick) && /^\d+$/.test(numcheck)) {
  //we make a request using await lib.googlesheets.query['@0.3.0'].insert to insert data into our sheet
  await lib.googlesheets.query['@0.3.0'].insert({
    range: `A:F`, // define the range for our Sheet as A:F. This gives us access to the data stored in column A to F - the columns we will be working with. 
    fieldsets: [ //Inn this fieldsets parameter we link every answer in our array to the corresponding question column in the Google Sheet.
      {
        'Date': pstDate,
        'Discord ID': `${context.params.event.member.user.id}`,
        'Username': `${context.params.event.member.user.username}`, // We use the payload button to view the data that Discord returns and extract the username and id using dot notation.
        'First Name': fn,
        'Last Name': ln,
        'Student ID': answers[2]
      }
    ]
  });
  
  if (numcheck == "100000") {
    await lib.discord.guilds['@0.2.4'].members.update({
      user_id: context.params.event.member.user.id,
      guild_id: `${context.params.event.guild_id}`,
      nick: extnick,
      roles: [
        `${verifiedRole}`
      ]
    });
  } else {
    await lib.discord.guilds['@0.2.4'].members.update({
      user_id: context.params.event.member.user.id,
      guild_id: `${context.params.event.guild_id}`,
      nick: nick,
      roles: [
        `${verifiedRole}`
      ]
    });
  }
} else {
  await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `You must enter valid information.`,
  });
}
