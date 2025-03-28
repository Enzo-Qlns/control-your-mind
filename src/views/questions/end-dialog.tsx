import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useQuestion } from "@/hooks/use-question";

const EndDialog: React.FC = () => {
    const {
        openEndDialog,
        setOpenEndDialog,
        end
    } = useQuestion();
    
    return (
        <Dialog open={openEndDialog} onOpenChange={setOpenEndDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Fin du questionnaire</DialogTitle>
                </DialogHeader>
                <p>Vous avez répondu à toutes les questions ! Souhaitez-vous recommencer ?</p>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenEndDialog(false)}>
                        Fermer
                    </Button>
                    <Button onClick={end}>Recommencer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EndDialog;
