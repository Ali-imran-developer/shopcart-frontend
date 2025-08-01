import { Title } from "rizzui";
import cn from "@utils/helperFunctions/class-names";

type BannerCardProps = {
  title: string;
  className?: string;
  titleClassName?: string;
  bgImage?: string;
  imageClassName?: string;
};
export default function BannerCard({
  bgImage,
  className,
  titleClassName = "text-white",
  children,
  title,
  imageClassName,
}: React.PropsWithChildren<BannerCardProps>) {
  return (
    <div className={cn("relative p-8", className)}>
      <img
        src={
          bgImage
            ? bgImage
            : "https://isomorphic-furyroad.s3.amazonaws.com/public/upgrade-storage-bg.webp"
        }
        alt="Upgrade Storage"
        // fill
        sizes="(max-width: 768px) 100vw"
        className={imageClassName}
      />
      <div className="relative z-10">
        <Title as="h2" className={cn("text-2xl font-semibold", titleClassName)}>
          {title}
        </Title>
        {children}
      </div>
    </div>
  );
}
