// components/MsalAuth.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

const MsalAuth = (WrappedComponent: React.ComponentType<any>) => {
    const MsalAuthWrapper = (props: any) => {
        const { accounts } = useMsal();
        const router = useRouter();

        useEffect(() => {
            if (accounts.length === 0 && router.pathname !== "/auth") {
                router.push("/auth");
            }
        }, [accounts, router]);

        return <WrappedComponent {...props} />;
    };

    MsalAuthWrapper.displayName = `MsalAuth(${getDisplayName(
        WrappedComponent
    )})`;

    return MsalAuthWrapper;
};

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
    return (
        WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"
    );
}

export default MsalAuth;
