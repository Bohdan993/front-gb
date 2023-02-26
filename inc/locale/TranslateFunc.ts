import strings from "./strings";
import { useRouter } from "next/router";

const translate = (string: string) => {
  const router = useRouter();
  const locale = router.locale ? router.locale : "uk";

  if (!strings[string] || !strings[string][locale]) {
    return string;
  }
  return strings[string][locale];
};
export default translate;
