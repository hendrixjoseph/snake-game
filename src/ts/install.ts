export const setupInstall = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(
      (registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope,
        );
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err);
      },
    );

    let deferredPrompt: Event & { prompt: () => void };

    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("beforeinstallprompt triggered", e.type);
      e.preventDefault();
      deferredPrompt = e as typeof deferredPrompt;
    });

    document.getElementById("installButton")?.addEventListener("click", () => {
      deferredPrompt?.prompt();
    });
  }
};
