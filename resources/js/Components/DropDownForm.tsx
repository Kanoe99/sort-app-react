import { Transition } from "@headlessui/react";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

const DropDownContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: () => void;
}>({
  open: false,
  setOpen: () => {},
  toggleOpen: () => {},
});

const DropdownForm = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }: PropsWithChildren) => {
  const { open, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <div
        onClick={toggleOpen}
        className="border bg-bg-input-black border-border-input rounded-xl"
      >
        {children}
      </div>

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => toggleOpen()}></div>
      )}
    </>
  );
};

const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 border-neutral-light border-1 border",
  children,
  position = "below",
}: PropsWithChildren<{
  position?: "below" | "right";
  align?: "left" | "right";
  width?: "48";
  contentClasses?: string;
}>) => {
  const { open, setOpen } = useContext(DropDownContext);

  let alignmentClasses = "origin-top";
  let positionClasses = "";

  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
  }

  if (position === "below") {
    positionClasses = "w-full";
  } else if (position === "right") {
    positionClasses = "top-[-10rem] left-[107%] w-fit whitespace-nowrap";
  }

  return (
    <>
      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          className={`bg-bg-input-black border-border-input absolute  z-50 mt-2 rounded-md shadow-lg ${positionClasses} ${alignmentClasses}`}
          onClick={() => setOpen(false)}
        >
          <div
            className={`rounded-xl py-[.8rem] ring-1 ring-black ring-opacity-0 ${contentClasses}`}
          >
            {children}
          </div>
        </div>
      </Transition>
    </>
  );
};

const Option = ({
  className = "",
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: (e: any) => void;
}) => {
  return (
    <div
      className={
        "block cursor-pointer w-full px-4 py-2 text-start leading-5 transition duration-150 ease-in-out focus:outline-none text-white hover:bg-[#000] focus:bg-black" +
        className
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
};

DropdownForm.Trigger = Trigger;
DropdownForm.Content = Content;
DropdownForm.Option = Option;

export default DropdownForm;
