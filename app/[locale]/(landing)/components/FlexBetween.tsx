const FlexBetween = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default FlexBetween;
