export default function BannerCaption({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>
        <p className="text-accent text-base">
          {subtitle}
        </p>
    </div>
  );
}