import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { PropsWithChildren } from "react";

export default function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {},
  transparent,
}: PropsWithChildren<{
  show: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "fit";
  closeable?: boolean;
  onClose: CallableFunction;
  transparent?: boolean;
}>) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
    fit: "sm:max-w-fit",
  }[maxWidth];

  return (
    <Transition show={show} leave="duration-200">
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
        onClose={close}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-neutral-transparent-sheet" />
        </TransitionChild>

        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <DialogPanel
            style={{ backgroundColor: "transparent" }}
            className={`mb-6 ${
              transparent
                ? " outline-none"
                : "bg-neutral-muted outline-neutral-soft"
            } text-white transform  rounded-lg shadow-xl transition-all w-fit sm:mx-auto sm:w-fit outline outline-1 ${maxWidthClass}`}
          >
            {children}
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
