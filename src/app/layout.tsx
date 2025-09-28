import "@/assets/styles/global.css";

export default async function RootLayout({ children }: { children: React.ReactNode; params: Record<string, any> }) {
  return <>{children}</>;
}
