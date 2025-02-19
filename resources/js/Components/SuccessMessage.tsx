import { useEffect, useState } from "react";

const SuccessMessage = ({
  success,
  refreshed,
  time,
}: {
  success: string | null;
  refreshed: boolean | null;
  time: number | null;
}) => {
  const [isVisible, setIsVisible] = useState(refreshed);

  useEffect(() => {
    if (refreshed && time) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [time, refreshed]);

  return (
    isVisible && (
      <div
        className={`border-accent-main border backdrop-blur-md shadow-[0_0px_7px_1px_rgba(0,0,0,0.3)] z-[9001] shadow-pink-500 right-20 text-xl fixed font-bold text-white w-fit py-4 px-6 rounded-sm mb-8    bottom-[100px]
    animate-bounce
       `}
      >
        {success}
      </div>
    )
  );
};

export default SuccessMessage;
