import React, { useEffect, useState } from "react";
import {
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    IonIcon
} from "@ionic/react";
import { closeCircle, download } from "ionicons/icons";

// Définition du type pour l'événement beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstallPrompt: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isIos, setIsIos] = useState<boolean>(false);
    const [isStandalone, setIsStandalone] = useState<boolean>(false);

    useEffect(() => {
        // Détecter iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        setIsIos(/iphone|ipad|ipod/.test(userAgent));

        // Vérifier si l'app est déjà installée
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

        // Gérer l'événement beforeinstallprompt (Android)
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsOpen(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const installPWA = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("L'utilisateur a installé la PWA");
                } else {
                    console.log("L'utilisateur a refusé d'installer la PWA");
                }
                setDeferredPrompt(null);
            });
        }
        setIsOpen(false);
    };

    // Ne pas afficher si l'app est déjà installée
    if (isStandalone) return null;

    return (
        <>
            <IonButton expand="block" onClick={() => setIsOpen(true)}>
                <IonIcon icon={download} slot="start" />
                Installer l'application
            </IonButton>

            <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Installer l'application</IonTitle>
                        <IonButton slot="end" fill="clear" onClick={() => setIsOpen(false)}>
                            <IonIcon icon={closeCircle} />
                        </IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent class="ion-padding">
                    {deferredPrompt ? (
                        <>
                            <IonText>
                                Cliquez sur le bouton ci-dessous pour installer l'application.
                            </IonText>
                            <IonButton expand="block" onClick={installPWA}>
                                Installer
                            </IonButton>
                        </>
                    ) : isIos ? (
                        <>
                            <IonText>
                                <p>
                                    Sur iOS, vous devez ajouter l'application manuellement :
                                </p>
                                <ol>
                                    <li>Ouvrez Safari et accédez à cette page.</li>
                                    <li>Appuyez sur l'icône <strong>Partager</strong> (📤).</li>
                                    <li>Sélectionnez <strong>"Ajouter à l'écran d'accueil"</strong>.</li>
                                    <li>Confirmez en appuyant sur <strong>"Ajouter"</strong>.</li>
                                </ol>
                            </IonText>
                        </>
                    ) : (
                        <IonText>
                            <p>
                                Pour installer l'application, ouvrez le menu de votre navigateur et sélectionnez{" "}
                                <strong>"Ajouter à l'écran d'accueil"</strong>.
                            </p>
                        </IonText>
                    )}
                </IonContent>
            </IonModal>
        </>
    );
};

export default PWAInstallPrompt;