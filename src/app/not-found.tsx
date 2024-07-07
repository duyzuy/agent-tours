import { headers } from "next/headers";
import { redirect } from "@/utils/navigation";
import { title } from "process";
import { SITE_NAME } from "@/configs/site";

export async function generateMetadata() {
  return {
    title: `Agent Hub | ${SITE_NAME}`,
  };
}

export default function NotFound() {
  const headersList = headers();
  // const domain = headersList.get("host") || "";
  // const fullUrl = headersList.get("referer") || "";
  const pathname = headersList.get("x-pathname") || "";

  if (pathname.startsWith("/vi") || pathname.startsWith("/en")) {
    redirect("/404");
  }

  return (
    <html>
      <body>
        <div className="flex items-center justify-center h-[100vh]">
          <div className="text-center">
            <h2 className="text-2xl">Not Found</h2>
            <p>Could not find requested resource</p>
          </div>
        </div>
      </body>
    </html>
  );
}
