import { useEffect } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "@/styles/globals.scss";
import "normalize.css";

import i18n from "../i18n";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import MsalAuth from "@/pages/components/MsalAuth";

const msalInstance = new PublicClientApplication({
    auth: {
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
        authority: "https://login.microsoftonline.com/" + process.env.NEXT_PUBLIC_AD_DOMAIN,
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
});

function App({ Component, pageProps }: AppProps) {
    // 设置默认语言
    i18n.changeLanguage("zh");
    useEffect(() => {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            const app = document.querySelector("#app") as HTMLElement;
            const appAside = document.querySelector("#appAside") as HTMLElement;
            if (!app || !appAside) return;
            app.style.height = window.innerHeight + "px";
            appAside.style.height = window.innerHeight + "px";

        }
    }, []);

    const WrappedComponent = MsalAuth(Component);
    return (
        <MsalProvider instance={msalInstance}>
            <WrappedComponent {...pageProps} />
        </MsalProvider>
    );
}

export default appWithTranslation(App);
