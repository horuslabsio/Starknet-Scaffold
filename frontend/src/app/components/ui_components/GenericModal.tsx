const GenericModal = ({
  popoverId,
  style,
  children,
}: {
  children: React.ReactNode;
  popoverId: string;
  style: string;
}) => {
  return (
    <div
      id={popoverId}
      className={style}
      //@ts-ignore
      popover="auto"
    >
      {/* Note: Do NOT add any display property on this parent div, to avoid strange behavior  */}
      {children}
    </div>
  );
};

export default GenericModal;
