import { CONTAINER_PADDING } from "@/constants/constants";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer
      className={`border-t border-gray-200 bg-background/80 backdrop-blur-md flex flex-col items-center gap-8 ${CONTAINER_PADDING} !py-4`}
    >
      <p className="text-muted-foreground">
        Copyright {currentYear} Vercel Daily.
      </p>
    </footer>
  );
};
