import type { Component, Snippet } from 'svelte';

export interface ModalProps {
  /** Controls modal visibility. Supports bind:open. */
  open?: boolean;
  /** Additional classes on .modal-dialog (e.g. "modal-lg modal-dialog-centered"). */
  dialogClasses?: string;
  /** Show a clickable backdrop. Default: true. */
  backdrop?: boolean;
  /** Prevent backdrop click from closing the modal. Default: false. */
  ignoreBackdrop?: boolean;
  /** Close on Escape key. Default: true. */
  keyboard?: boolean;
  /** aria-describedby value. */
  describedby?: string;
  /** aria-labelledby value. */
  labelledby?: string;
  /** Called after the modal finishes opening. */
  onOpened?: () => void;
  /** Called after the modal finishes closing. */
  onClosed?: () => void;
  /** Enable open/close transitions. Default: true. */
  animated?: boolean;
  /** Override z-index on .modal. Backdrop is set to zIndex - 5. */
  zIndex?: number;
  children?: Snippet;
}

declare const Modal: Component<ModalProps, {}, 'open'>;
export default Modal;
