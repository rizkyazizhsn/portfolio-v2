import { cacheLife } from "next/cache";

export async function getCurrentYear() {
  "use cache";
  cacheLife("days");

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date());
}
