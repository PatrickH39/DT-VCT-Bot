
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.interactions['@1.0.0'].responses.modals.create({
  token: context.params.event.token,
  custom_id: `verify_modal`, // The unique custom id for this modal,
  title: `Complete Verification`,
  components: [
    {
      type: 1, // Component row
      components: [{
        type: 4, // Text input component, only valid in modals
        custom_id: 'firstName',
        label: `First Name`,
        style: 1, // 1 for line, 2 for paragraph
        min_length: 1,
        max_length: 100,
        required: true
      }],
    },
    {
      type: 1, // You must use a new row for each text input
      components: [{
        type: 4, // Text input component, only valid in modals
        custom_id: 'lastName',
        label: `Last Name`,
        style: 1,
        min_length: 1,
        max_length: 100,
        required: true
      }]
    },
    {
      type: 1, // You must use a new row for each text input
      components: [{
        type: 4, // Text input component, only valid in modals
        custom_id: 'studentNumber',
        label: `Student Number`,
        style: 1,
        min_length: 6,
        max_length: 7,
        required: true
      }]
    }
  ],
});