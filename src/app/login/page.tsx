import { Toaster } from "react-hot-toast";
import LoginForm from "../components/LoginForm";


export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <LoginForm />
      <Toaster />
    </div>
  )
}