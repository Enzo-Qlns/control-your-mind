import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useQuestion } from "@/hooks/use-question";

import { isIos } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallDialog: React.FC = () => {
    const {
        openInstallDialog,
        setOpenInstallDialog,
    } = useQuestion();

    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
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
                console.log(choiceResult.outcome === "accepted" ? "L'utilisateur a installé la PWA" : "L'utilisateur a refusé d'installer la PWA");
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <Dialog open={openInstallDialog} onOpenChange={setOpenInstallDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Installer l'application</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    {deferredPrompt ? (
                        <>
                            <p>Cliquez sur le bouton ci-dessous pour installer l'application.</p>
                            <Button
                                className="mt-4"
                                onClick={installPWA}
                            >
                                Installer
                            </Button>
                        </>
                    ) : isIos() ? (
                        <>
                            <p>Ajoutez l'application :</p>
                            <ol className="list-decimal ml-5 mt-2">
                                <li>Ouvrez Safari et accédez à cette page.</li>
                                <li>Appuyez sur l'icône <strong>Partager</strong> (📤).</li>
                                <li>Sélectionnez <strong>"Ajouter à l'écran d'accueil"</strong>.</li>
                                <li>Confirmez en appuyant sur <strong>"Ajouter"</strong>.</li>
                            </ol>
                        </>
                    ) : (
                        <p>Ouvrez le menu de votre navigateur et sélectionnez <strong>"Ajouter à l'écran d'accueil"</strong>.</p>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenInstallDialog(false)}>
                        Fermer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InstallDialog;
