type QuestionContext = {
    openEndDialog: boolean
    setOpenEndDialog: (open: boolean) => void
    openInstallDialog: boolean
    setOpenInstallDialog: (open: boolean) => void
    end: () => void
}

export type {
    QuestionContext
}