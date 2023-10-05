import PhoneNumber from "./PhoneNumber";

export default interface Contact {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: PhoneNumber[];
}
