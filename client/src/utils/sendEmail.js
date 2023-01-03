

export const sendEmail = {
  method: 'POST',
  url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '40cc8d09acmsh34f6aa050abb320p12ea9fjsn96e9de79fa91',
    'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
  },
  data: '{"personalizations":[{"to":[{"email":"zurcemozz@example.com"}],"subject":"Hello, World!"}],"from":{"email":"emmanueljosephkcruz@example.com"},"content":[{"type":"text/plain","value":"Hello, World!"}]}'
};
