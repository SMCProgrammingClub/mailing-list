const Mailchimp = require('mailchimp-api-v3')
const isEmail = require('validator/lib/isEmail')
const dotenv = require('dotenv')
const micro = require('micro')
const microCors = require('micro-cors')


// Load the contents of .env file into environment variables
dotenv.load()
// Initiate Mailchimp with API key from environment
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)
// Configure CORS
const cors = microCors({ origin: '*' })


// This function handles all requests to the server
module.exports = cors(async (req, res) => {

    // This API only supports POST requests to add emails to the mailing list
    if (req.method === 'POST') {

        // Load the request data as a json object
        const data = await micro.json(req)

        // Validate email parameter before adding it
        if (data.email && isEmail(data.email)) {

            try {
                // POST the new email to the Mailchimp API to add it to our mailing list
                await mailchimp.post(
                    `/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
                    email_address: data.email,
                    status: 'subscribed',
                })
                return `${data.email} added to mailing list`
            }

            catch (err) {
                // Pass Mailchimp's error along to the client
                micro.send(res, 400, `${err.title}\nEmail: ${data.email}`)
            }
        }
        else {
            // The response had invalid parameters, respond with code 400: Bad Request
            micro.send(res, 400, `Email parameter is missing or invalid\nEmail: ${data.email}`)
        }
    }

    else {
        return 'Improper Usage. Try POSTing here with a JSON "email" parameter.'
    }
})
