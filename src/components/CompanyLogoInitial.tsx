export default function CompanyLogoInitial({
  companyName,
  width = 100,
  height = 100,
}: {
  companyName: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className="flex flex-col bg-tertiary rounded-xl items-center justify-center"
      style={{ width: width, height: height }}
    >
      <h1
        className="text-accent font-bold"
        style={{ fontSize: `${width / 2}px` }}
      >
        {companyName.slice(0, 1)}
      </h1>
    </div>
  );
}
