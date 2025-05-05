import React, {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  Fragment,
} from "react";

const IPv6 = ({
  isIPv4,
  setIsIPv4,
  setIPData,
  IPData,
}: {
  isIPv4: boolean;
  setIsIPv4: (isIPv4: boolean) => void;
  setIPData: (
    data:
      | { IPv4Data: string; IPv6Data: string }
      | ((prev: { IPv4Data: string; IPv6Data: string }) => {
          IPv4Data: string;
          IPv6Data: string;
        })
  ) => void;
  IPData: string;
}) => {
  const MAX_HEX_VALUE = 0xffff;

  const IPArray = IPData ? IPData.split(":") : Array(8).fill("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    // Get the input's value and replace invalid characters
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9a-fA-F]/g, "");

    if (parseInt(input.value, 16) > MAX_HEX_VALUE) {
      input.value = MAX_HEX_VALUE.toString(16);
    }
    if (
      input.value.length === input.maxLength &&
      index < inputRefs.current.length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!inputRefs.current.every((ref) => ref !== null)) return;
    let IPResult = "";
    inputRefs.current.forEach((ref, index) => {
      IPResult += ref.value + (index + 1 < inputRefs.current.length ? ":" : "");
    });
    setIPData((p) => ({
      ...p,
      IPv6Data: IPResult,
    }));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = event.currentTarget;

    if (
      (event.key === "Backspace" && index > 0) ||
      (event.key === "ArrowLeft" && index > 0)
    ) {
      const cursorPosition = input.selectionEnd;
      if (cursorPosition === 0 || input.value.length === 0) {
        const nextInput = inputRefs.current[index - 1];
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(4, 4);
        }
      }
    } else if (
      (event.key === "Delete" && index < inputRefs.current.length - 1) ||
      (event.key === "ArrowRight" && index < inputRefs.current.length - 1)
    ) {
      const cursorPosition = input.selectionStart;
      if (cursorPosition === input.value.length || input.value.length === 0) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(0, 0);
        }
      }
    }
  };

  return (
    <div
      className={`top-0 transition-transform duration-500 ease-in-out absolute flex justify-between w-full py-3 rounded-xl px-2 bg-bg-ip ${
        !isIPv4 ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex gap-1 text-center items-center">
        {[...Array(8)].map((_, index) => (
          <Fragment key={index}>
            <input
              value={IPArray[index] ?? ""}
              type="text"
              ref={(el) => (inputRefs.current[index] = el)}
              className="text-sm rounded-md flex justify-center items-center border-1 border-black px-1 bg-bg-input-black w-[52px] py-1 focus:border-1 focus:border-black focus:ring-0 focus:outline-none text-center tracking-widest font-bold"
              maxLength={4}
              pattern="[0-9a-fA-F]+"
              title="Введите правильный IPv6 адрес"
              onInput={(e) => handleInputChange(e, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
            {index < 7 && <div className="text-neutral-bright">:</div>}
          </Fragment>
        ))}
      </div>

      <Switch isIPv4={isIPv4} setIsIPv4={setIsIPv4} />
    </div>
  );
};

const IPv4 = ({
  isIPv4,
  setIsIPv4,
  setIPData,
  IPData,
}: {
  isIPv4: boolean;
  setIsIPv4: (isIPv4: boolean) => void;
  setIPData: (
    data:
      | { IPv4Data: string; IPv6Data: string }
      | ((prev: { IPv4Data: string; IPv6Data: string }) => {
          IPv4Data: string;
          IPv6Data: string;
        })
  ) => void;
  IPData: string;
}) => {
  const MAX_VALUE = 255;
  const IPArray = IPData ? IPData.split(".") : Array(4).fill("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = event.currentTarget;
    input.value = input.value.replace(/[^0-9]/g, "");

    if (parseInt(input.value, 10) > MAX_VALUE) {
      input.value = MAX_VALUE.toString();
    }

    if (input.value.length > 1 && input.value[0] === "0") {
      input.value = input.value[1];
    }

    if (
      input.value.length === input.maxLength &&
      index < inputRefs.current.length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!inputRefs.current.every((ref) => ref !== null)) return;

    let IPResult = "";
    inputRefs.current.forEach((ref, i) => {
      IPResult += ref?.value + (i + 1 < inputRefs.current.length ? "." : "");
    });

    setIPData((prev) => ({
      ...prev,
      IPv4Data: IPResult,
    }));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = event.currentTarget;

    if (
      (event.key === "Backspace" && index > 0) ||
      (event.key === "ArrowLeft" && index > 0)
    ) {
      const cursorPosition = input.selectionEnd;
      if (cursorPosition === 0 || input.value.length === 0) {
        const nextInput = inputRefs.current[index - 1];
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(3, 3);
        }
      }
    } else if (
      (event.key === "Delete" && index < inputRefs.current.length - 1) ||
      (event.key === "ArrowRight" && index < inputRefs.current.length - 1)
    ) {
      const cursorPosition = input.selectionStart;
      if (cursorPosition === input.value.length || input.value.length === 0) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(0, 0);
        }
      }
    }
  };

  return (
    <div
      className={`flex absolute top-0 transition-transform duration-500 ease-in-out justify-between w-full rounded-xl px-2 py-3 bg-bg-ip ${
        isIPv4 ? "translate-y-0 opacity-100" : "-translate-y-full"
      }`}
    >
      <div className="gap-1 flex text-center items-center">
        {[...Array(4)].map((_, index) => (
          <Fragment key={index}>
            <input
              value={IPData ? IPArray[index] : ""}
              type="text"
              ref={(el) => (inputRefs.current[index] = el)}
              className="text-sm rounded-md border-1 border-black px-1 bg-bg-input-black w-[52px] py-1 focus:border-1 focus:border-black focus:ring-0 focus:outline-none text-center tracking-widest font-bold"
              maxLength={3}
              pattern="[0-9]+"
              title="Введите правильный IPv4 адрес"
              onInput={(event) => handleInputChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
            {index < 3 && <div className="text-neutral-bright">.</div>}
          </Fragment>
        ))}
      </div>
      <Switch isIPv4={isIPv4} setIsIPv4={setIsIPv4} />
    </div>
  );
};
const Switch = ({
  isIPv4,
  setIsIPv4,
}: {
  isIPv4: boolean;
  setIsIPv4: (isIPv4: boolean) => void;
}) => {
  return (
    <button
      className=" select-none px-3 py-1 bg-[#222222] border-2 border-[#212121] rounded-md"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setIsIPv4(!isIPv4);
      }}
    >
      {isIPv4 ? "IPv6" : "IPv4"}
    </button>
  );
};

export default forwardRef(function TextInput(
  {
    type = "text",
    className = "",
    isFocused = false,
    IPData,
    setIPData,
    isIPv4,
    setIsIPv4,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    IPData: string;
    setIPData: (
      data:
        | { IPv4Data: string; IPv6Data: string }
        | ((prev: { IPv4Data: string; IPv6Data: string }) => {
            IPv4Data: string;
            IPv6Data: string;
          })
    ) => void;
    isIPv4: boolean;
    setIsIPv4: (isIPv4: boolean) => void;
  },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <div
      {...props}
      className={
        "mt-1 h-[3.5rem] flex justify-center relative overflow-hidden items-center w-full text-sm text-center rounded-xl border border-border-input text-white bg-bg-ip focus:border-accent-main focus:ring-accent-main " +
        className
      }
      ref={localRef}
    >
      <IPv4
        isIPv4={isIPv4}
        setIsIPv4={setIsIPv4}
        setIPData={setIPData}
        IPData={isIPv4 ? IPData : ""}
      />
      <IPv6
        isIPv4={isIPv4}
        setIsIPv4={setIsIPv4}
        setIPData={setIPData}
        IPData={!isIPv4 ? IPData : ""}
      />
    </div>
  );
});
