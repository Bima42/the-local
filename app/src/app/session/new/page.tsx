import { api } from "@/lib/trpc/server";
import { redirect } from "next/navigation";

export default async function NewSessionPage() {
  const session = await api.session.create({ title: "Nouvelle session" });
  redirect(`/session/${session.id}`);
}