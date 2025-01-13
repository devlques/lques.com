"use server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { ActionResponse, ContactFormData } from "../types";
import { z } from "zod";

const ACCESS_KEY_ID = process.env.DEVLQUES_AWS_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.DEVLQUES_AWS_SECRET_ACCESS_KEY as string
const REGION = process.env.DEVLQUES_AWS_REGION as string;
const CONTACT_EMAIL = process.env.DEVLQUES_CONTACT_EMAIL as string

if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
  throw new Error("AWS credentials are missing");
}
const awsConfig = {
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
};

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(20, "Name cannot exceed 20 characters."),
  email: z.string().trim().email("Please provide a valid email address."),
  message: z
    .string()
    .trim()
    .min(30, "Message should be at least 30 characters."),
});

async function sendContactEmailSES({ ...props }: ContactFormData) {
  console.log('PROCESS.ENV', process.env)
  const ses = new SESv2Client(awsConfig);
  const input = {
    FromEmailAddress: props.email,
    Destination: {
      ToAddresses: [CONTACT_EMAIL],
    },
    Content: {
      Simple: {
        Subject: {
          Data: `Contact from devlques.com - ${props.name}`, // required
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: props.message,
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
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const validatedData = contactFormSchema.safeParse({ name, email, message });
  if (!validatedData.success) {
    return {
      success: validatedData.success,
      errorMessage: "Please fix the errors and submit again.",
      inputs: {
        name: {
          error: validatedData.error.flatten().fieldErrors.name,
          value: name,
        },
        email: {
          error: validatedData.error.flatten().fieldErrors.email,
          value: email,
        },
        message: {
          error: validatedData.error.flatten().fieldErrors.message,
          value: message,
        },
      },
    };
  }
  try {
    await sendContactEmailSES({ name, email, message });
    return {
      success: true,
      errorMessage: "",
      successScreen: {
        name,
        email,
      },
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error at submitAction:", error?.message);
    return {
      success: false,
      errorMessage: error?.message || "There was an error submitting the form. Please try again later.", };
  }
}
