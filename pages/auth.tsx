// auth.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMsal } from "@azure/msal-react";

export default function Auth() {
    const { instance, accounts } = useMsal();
    const router = useRouter();

    useEffect(() => {
        if (accounts.length > 0) {
            router.push("/");
        } else {
            instance
                .loginRedirect({
                    scopes: [],
                })
                .catch((error) => console.error("Login failed:", error));
        }
    }, [instance, accounts, router]);

    return (
        <div>
            <h1>Please Wait</h1>
        </div>
    );
}
