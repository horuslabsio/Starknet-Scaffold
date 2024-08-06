"use client";
const GenericModal = ({
  isOpen,
  onClose,
  animate,
  children,
  className,
  position,
}: {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  animate: boolean;
  children: React.ReactNode;
  className?: string;
  position?: string;
}) => {
  return (
    <>
      {isOpen && (
        <section
          onClick={onClose}
          className={`fixed left-0 top-0 z-[99] grid h-screen w-screen backdrop-blur ${
            position ? position : "items-center justify-center"
          } ${!isOpen ? "hidden" : ""}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`border-outline-grey flex flex-col rounded-[25px] border-[1px] border-solid bg-[#1c1b1f] transition-[opacity,transform] duration-500 ease-in-out ${
              animate
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            } ${className}`}
          >
            {children}
          </div>
        </section>
      )}
    </>
  );
};

export default GenericModal;
