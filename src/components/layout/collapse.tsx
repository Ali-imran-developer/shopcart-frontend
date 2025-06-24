import { useState, useEffect, createContext, useContext } from "react";
import cn from "@utils/helperFunctions/class-names";

interface CollapseContextType {
  openItems: { [level: number]: string | null };
  setOpenItem: (id: string | null, level: number) => void;
}

const CollapseContext = createContext<CollapseContextType>({
  openItems: {},
  setOpenItem: () => {},
});

export const CollapseProvider = ({ children }: any) => {
  const [openItems, setOpenItems] = useState<{ [level: number]: string | null }>({});

  const setOpenItem = (id: string | null, level: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [level]: id,
    }));
  };

  return (
    <CollapseContext.Provider value={{ openItems, setOpenItem }}>
      {children}
    </CollapseContext.Provider>
  );
};

interface CustomCollapseProps {
  id: string;
  header: ({ open, toggle }: { open: boolean; toggle: () => void }) => React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  level?: number;
}

export const CustomCollapse = ({
  id,
  header,
  children,
  defaultOpen = false,
  className = "",
  level = 0,
}: CustomCollapseProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { openItems, setOpenItem } = useContext(CollapseContext);

  useEffect(() => {
    if (defaultOpen && !openItems[level]) {
      setOpenItem(id, level);
    }
  }, []);

  useEffect(() => {
    if (openItems[level] === id) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [openItems, id, level]);

  const toggle = () => {
    if (isOpen) {
      setOpenItem(null, level);
    } else {
      setOpenItem(id, level);
    }
  };

  return (
    <div className={cn("transition-all duration-200", className)}>
      {header({ open: isOpen, toggle })}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};
