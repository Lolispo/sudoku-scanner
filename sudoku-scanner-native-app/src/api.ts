import { loadProfile } from "./profile"

const foo = () => {
  const { BACKEND_URL } = loadProfile();
  
}