import { useContext } from "react"
import { QuestionContext } from "@/contexts/questions"

export function useQuestion() {
    const context = useContext(QuestionContext)
    if (!context) {
        throw new Error('useQuestionContext must be used within a QuestionProvider')
    }
    return context
}