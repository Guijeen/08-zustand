"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal"; // Шлях до вашого компонента Modal
import css from "./NotePreview.module.css"; // Ваші стилі для деталей нотатки

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {isLoading && (
        <div className={css.loadingStatus}>
          <p>Loading note details...</p>
        </div>
      )}

      {error && (
        <div className={css.errorStatus}>
          <p>Failed to load note. Please try again later.</p>
        </div>
      )}

      {note && (
        <main className={css.main}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note?.title}</h2>
              </div>
              <p className={css.tag}>{note?.tag}</p>
              <p className={css.content}>{note?.content}</p>
              <p className={css.date}>{note?.createdAt}</p>
            </div>
          </div>
          <button className={css.closeBtn} onClick={handleClose}>
            Close
          </button>
        </main>
      )}
    </Modal>
  );
}
