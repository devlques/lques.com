'use server'
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2"
import { ActionResponse, ContactFormData } from "../types";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2', 
}

async function sendContactEmailSES({...props}:ContactFormData) {
  const ses = new SESv2Client(awsConfig);
  const input = { 
    FromEmailAddress: props.email,
    Destination: { 
      ToAddresses: [ 
        process.env.CONTACT_EMAIL as string
      ],
    },
    Content: { 
      Simple: { 
        Subject: { 
          Data: `Contact from devlques.com - ${props.name}`, // required
          Charset: "UTF-8",
        },
        Body: { // Body
          Text: {
            Data: props.message, // required
            Charset: "UTF-8",
          },
          Html: {
            Data: "", // required
            Charset: "UTF-8",
          },
        },
      },
    },
  };
  const command = new SendEmailCommand(input);
  return await ses.send(command);
}

export default async function submitAction(
  prevState: ActionResponse | null, 
  formData: FormData
): Promise<ActionResponse>
{ 
  let successResult = false
  let messageResult = '';
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message  = formData.get('message') as string
  try {
      await sendContactEmailSES({name, email, message })
      successResult = true
      new Response(JSON.stringify({ success: true, message: 'Email sent successfully!' }), { status: 200 }); 
  } catch (error:any) {
     successResult = true
     new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  } 

  return {
    success: successResult,
    message: messageResult,
    inputs: {
      name, 
      email, 
      message 
    }
  }
}


