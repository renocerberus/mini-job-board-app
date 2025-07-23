export default function BannerCaption({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-2 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-accent leading-relaxed max-w-sm sm:max-w-md">
          {subtitle}
        </p>
    </div>
  );
}