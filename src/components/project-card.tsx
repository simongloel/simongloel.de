import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  className?: string;
};

export function ProjectCard({ imgSrc, title, description, link, linkText = "Visit", className }: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="aspect-video overflow-hidden border-b border-line">
        <img
          src={imgSrc}
          alt={title}
          width={1280}
          height={720}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-medium text-ink transition-colors duration-300 group-hover:text-accent">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
          {linkText}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
