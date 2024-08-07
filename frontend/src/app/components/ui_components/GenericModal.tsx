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
    <div id={popoverId} className={style} role="dialog" popover="auto">
      {children}
    </div>
  );
};

export default GenericModal;
