import { QuestionContext } from "@/contexts/questions";

import EndDialog from "@/views/questions/end-dialog";
import InstallDialog from "@/views/questions/install-dialog";

import { QuestionContext as QuestionContextType } from '@/types/question'

export default function QuestionsProvider({
    openEndDialog,
    setOpenEndDialog,
    openInstallDialog,
    setOpenInstallDialog,
    end,
    children,
}: QuestionContextType & {
    children: React.ReactNode
}) {
    return (
        <QuestionContext.Provider
            value={{
                openEndDialog,
                setOpenEndDialog,
                openInstallDialog,
                setOpenInstallDialog,
                end
            }}
        >
            {children}
            <EndDialog />
            <InstallDialog />
        </QuestionContext.Provider>
    )
}