import {
    createContext,
} from 'react'
import { QuestionContext as QuestionContextType } from '@/types/question'

export const QuestionContext = createContext<QuestionContextType | undefined>(
    undefined
)