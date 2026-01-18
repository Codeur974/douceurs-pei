import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  href?: string;
}

export function Logo({ className, imageClassName, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="Aller a l'accueil"
    >
      <div className="relative h-32 w-96 md:h-36 md:w-md shrink-0">
        <Image
          src="/images/logo.png"
          alt="Patisserie a Domicile"
          fill
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 440px"
          className={cn("object-contain", imageClassName)}
          priority
        />
      </div>
    </Link>
  );
}
