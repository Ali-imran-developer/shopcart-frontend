import { Text, Avatar, AvatarProps } from "rizzui";
import cn from "@utils/helperFunctions/class-names";

interface AvatarCardProps {
  src?: any;
  name: any;
  className?: string;
  nameClassName?: string;
  avatarProps?: AvatarProps;
  description?: React.ReactNode;
}

export default function AvatarCard({
  src,
  name,
  className,
  description,
  avatarProps,
  nameClassName,
}: AvatarCardProps) {
  return (
    <figure className={cn("flex items-center gap-3", className)}>
      <Avatar name={name} src={src} />
      <figcaption className="grid gap-0.5">
        <Text
          className={cn(
            "font-lexend text-sm font-medium text-gray-900 dark:text-gray-700",
            nameClassName
          )}
        >
          {name}
        </Text>
        {description && (
          <Text className="text-[13px] text-gray-500">{description}</Text>
        )}
      </figcaption>
    </figure>
  );
}
