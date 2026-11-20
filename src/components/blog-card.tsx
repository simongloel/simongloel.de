import Link from "next/link";

type BlogCardProps = {
  href: string;
  title: string;
  date: string;
  description: string;
};

export function BlogCard({ href, title, date, description }: BlogCardProps) {
  return (
    <Link href={href} className="group block space-y-1 py-3">
      <div className="flex items-end gap-2">
        <span className="font-serif text-lg text-ink transition-colors duration-500 ease-out group-hover:text-accent md:text-xl">
          {title}
        </span>
        <span className="mb-[7px] hidden min-w-6 flex-1 border-b border-dashed border-line transition-colors duration-500 group-hover:border-accent sm:block" />
        <time
          dateTime={date}
          className="hidden shrink-0 whitespace-nowrap text-xs uppercase tracking-wide text-muted tabular-nums transition-colors duration-500 group-hover:text-accent sm:block"
        >
          {date}
        </time>
      </div>
      <p className="text-muted transition-colors duration-500 group-hover:text-accent">{description}</p>
      <time dateTime={date} className="block text-xs uppercase tracking-wide text-muted tabular-nums sm:hidden">
        {date}
      </time>
    </Link>
  );
}
