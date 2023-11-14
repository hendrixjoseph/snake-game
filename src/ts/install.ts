export const setupInstall = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(
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

    let installButton = document.getElementById("installButton");

    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("beforeinstallprompt triggered", e.type);
      e.preventDefault();
      deferredPrompt = e as typeof deferredPrompt;
      installButton?.removeAttribute("hidden");
    });

    window.addEventListener("appinstalled", () => {
      installButton?.setAttribute("hidden", "");
    });

    installButton?.addEventListener("click", () => {
      deferredPrompt?.prompt();
    });
  }
};
