import { getAllFiles } from "@/lib/files";
import FilesClient from "./FilesClient";

export default function Files() {
  const fileSystem = getAllFiles();

  return <FilesClient initialFileSystem={fileSystem} />;
}
