import { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

const PER_PAGE = 12;

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === "all" ? "All notes" : (slug[0] as NoteTag);
  return {
    title: `Filter notes -${category}`,
    description: `Filter notes -${category}`,
    openGraph: {
      title: `Filter notes -${category}`,
      description: `Filter notes -${category}`,
      url: `https://notehub.com/`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: category,
        },
      ],
    },
  };
}

const Notes = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : (slug[0] as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", category],
    queryFn: () =>
      fetchNotes({ page: 1, perPage: PER_PAGE, search: "", tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
};

export default Notes;
