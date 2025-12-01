export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CountdownProps {
  targetDate: string; // ISO string or date string
  onComplete: () => void;
}
