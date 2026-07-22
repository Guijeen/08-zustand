// app/notes/filter/@sidebar/default.tsx

import css from "./SidebarNotes.module.css";
import { NoteTag } from "@/types/note";
import Link from "next/link";

const NotesSidebar = async () => {
  const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((category) => (
        <li className={css.menuItem} key={category}>
          <Link href={`/notes/filter/${category}`} className={css.menuLink}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
