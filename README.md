# mailing-list
A small API to add emails to our Mailchimp mailing list

## Setup
Clone the repository and install dependencies
```
$ git clone git@github.com:smcprogrammingclub/mailing-list.git
$ npm install
```
Sign into the club's Mailchimp and [grab an API key][mc-api-key].
Next, [find the list ID][mc-list-id] of the mailing list.
Create a `.env` file in the project root and save your API key and list ID:
```
MAILCHIMP_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-XXXX
MAILCHIMP_LIST_ID=XXXXXXXXXX
```

## Usage
Run the server with `npm start`

Make a POST request to the server with a JSON `email` parameter.

### Using cURL (Terminal)
```
$ curl -H "Content-Type: application/json" -X POST -d '{"email":"lisa@jupiter.com"}' http://localhost:3000
```
Alternatively, use [Postman][postman] for a GUI tool.

## Deployment
Install and login to [now][now]. From the root of the project, run `now -E` to deploy the server.


[postman]: https://www.getpostman.com/
[mc-api-key]: http://kb.mailchimp.com/integrations/api-integrations/about-api-keys
[mc-list-id]: http://kb.mailchimp.com/lists/manage-contacts/find-your-list-id
[now]: https://zeit.co/now
