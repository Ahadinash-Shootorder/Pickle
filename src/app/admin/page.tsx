import { getContent } from "@/lib/content";
import AdminApp from "@/components/admin/AdminApp";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — The Pachadi Project",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const content = getContent();
  return <AdminApp initial={content} />;
}
