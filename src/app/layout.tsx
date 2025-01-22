import "@/assets/styles/global.scss";

export default async function RootLayout({ children }: { children: React.ReactNode; params: Record<string, any> }) {
  return <>{children}</>;
}
