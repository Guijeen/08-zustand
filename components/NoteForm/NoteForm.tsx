"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { CreateNotePayload } from "@/lib/api";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/stores/noteStore";

// const initialValues: CreateNotePayload = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
      clearDraft();
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as CreateNotePayload;
    if (values.title != "") {
      mutate(values);
    }
    console.log(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={draft?.title}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          value={draft?.content}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          className={css.select}
          onChange={handleChange}
          value={draft?.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => {
            router.push("/notes/filter/all");
          }}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
      </div>
    </form>
  );
}
