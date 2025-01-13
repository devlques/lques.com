export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ActionResponse {
  success: boolean;
  errorMessage: string;
  inputs?: {
    [K in keyof ContactFormData]?: {
      error?: string[] | undefined;
      value?: string;
    };
  };
  successScreen?: {
    name?: string;
    email?: string;
  };
}

export interface ControlElements {
  upArrow: HTMLElement;
  downArrow: HTMLElement;
  rightArrow: HTMLElement;
  leftArrow: HTMLElement;
  spaceKey: HTMLElement;
}

export interface Position  {
  x: number;
  y: number
}
export interface EventInteractionControls {
  keyCode?: string;
  iconId?: string;
  snipper: HTMLElement;
  snipperContainer: HTMLElement;
  position: Position;
  step: number;
  setDataId: (id: string) => void;
  setOpenModal: (open: boolean) => void;
  controlElements: ControlElements;
}

export interface ModalProps {
  openStatus: boolean;
  setOpenStatus: (open:boolean) => void;
  selectedDataId: string;
}

