import { Toaster } from "../ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="">{children}</main>
      <Toaster position="top-right" duration={4000} />
    </div>
  );
}
