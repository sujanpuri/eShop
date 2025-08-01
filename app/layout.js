import "./globals.css";
import { AuthProvider } from "./provider";
import { UserProvider } from "./context/userContext";
import { ItemProvider } from "./context/ItemContext";

export const metadata = {
  title: "My App",
  description: "Using Google Auth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UserProvider>
            <ItemProvider>{children}</ItemProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
