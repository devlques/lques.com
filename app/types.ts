export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ActionResponse {
  success: boolean;
  errorMessage?: string;
  inputs?: {
    [K in keyof ContactFormData]?: {
      error?: string[] | undefined,
      value?: string
     }
  };
  successScreen?: {
    name?: string,
    email?: string
  }
}
