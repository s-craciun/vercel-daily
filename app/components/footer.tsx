const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="px-40 border-t border-border bg-background/80 backdrop-blur-md flex flex-row justify-center gap-8 py-4">
      <p className="text-muted-foreground">
        Copyright {currentYear} Vercel, Inc.
      </p>
    </footer>
  );
};
