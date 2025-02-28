import { Transition } from "@headlessui/react";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import {
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

const Dropdown = ({ children }: PropsWithChildren) => {
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
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <div
        onClick={toggleOpen}
        className="border bg-black border-neutral-light rounded-md"
      >
        {children}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 border-neutral-light border-1 border",
  children,
}: PropsWithChildren<{
  align?: "left" | "right";
  width?: "48";
  contentClasses?: string;
}>) => {
  const { open, setOpen } = useContext(DropDownContext);

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
  }

  let widthClasses = "";

  if (width === "48") {
    widthClasses = "w-48";
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
          className={`absolute z-50 mt-2 bg-black rounded-xl shadow-lg ${alignmentClasses} ${widthClasses}`}
        >
          <div
            className={
              `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses
            }
          >
            {children}
          </div>
        </div>
      </Transition>
    </>
  );
};

const DropdownLink = ({
  prefetch,
  className = "",
  children,
  ...props
}: InertiaLinkProps) => {
  return (
    <Link
      prefetch
      {...props}
      className={
        "block w-full px-4 py-2 text-start text-sm  leading-5 bg-black transition duration-150 ease-in-out focus:outline-none text-gray-300 hover:bg-[#000] focus:bg-black backdrop-blur-sm " +
        className
      }
    >
      {children}
    </Link>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
