import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

import ContentLayout from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { CoolMode } from "@/components/magicui/cool-mode";
import { Particles } from "@/components/magicui/particles";

import QuestionsProvider from "@/providers/question";

import { isStandalone } from "@/lib/utils";

import questions from "../../ressources/questions.json";

const Home: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [questionsIdAnswered, setQuestionsIdAnswered] = useState<Array<number>>([]);

    const [openEndDialog, setOpenEndDialog_] = useState<boolean>(false);
    const [openInstallDialog, setOpenInstallDialog_] = useState<boolean>(false);

    const [displayParicle, setDisplayParticle] = useState<boolean>(false);

    const setOpenEndDialog = (open: boolean) => {
        setOpenEndDialog_(open);
    }

    const setOpenInstallDialog = (open: boolean) => {
        setOpenInstallDialog_(open);
    }

    const nextQuestion = () => {
        if (questionsIdAnswered.length === questions.length) {
            setOpenEndDialog(true);
            return;
        }

        const getRandomIndex = (): number => {
            const randomIndex = Math.floor(Math.random() * questions.length);
            return questionsIdAnswered.includes(randomIndex) ? getRandomIndex() : randomIndex;
        };

        const randomIndex = getRandomIndex();
        setCurrentIndex(randomIndex);
        setQuestionsIdAnswered([...questionsIdAnswered, randomIndex]);
    };

    const end = () => {
        setQuestionsIdAnswered([]);
        setOpenEndDialog(false);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * questions.length);
            setCurrentIndex(randomIndex);
            setQuestionsIdAnswered([randomIndex]);
        }, 100);
    };

    useEffect(() => {
        nextQuestion();

        setTimeout(() => {
            setDisplayParticle(true);
        }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <QuestionsProvider
            openEndDialog={openEndDialog}
            setOpenEndDialog={setOpenEndDialog}
            openInstallDialog={openInstallDialog}
            setOpenInstallDialog={setOpenInstallDialog}
            end={end}
        >
            <ContentLayout className="min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Control your mind</h1>
                <div className="flex flex-col justify-center items-center h-[calc(100vh-5rem)]">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="-mt-20 mb-4"
                    >
                        <NeonGradientCard className="max-w-sm">
                            <p className="text-gray-500">Question</p>
                            <h2 className="text-xl font-semibold">{questions[currentIndex]}</h2>
                        </NeonGradientCard>
                    </motion.div>
                    {!isStandalone() && (
                        <Button
                            className="fixed bottom-4 left-4"
                            onClick={() => setOpenInstallDialog(true)}
                        >
                            <Download /> Installer l'application
                        </Button>
                    )}

                    <CoolMode>
                        <Button
                            className="fixed bottom-4 right-4"
                            variant={"outline"}
                            onClick={nextQuestion}
                        >
                            Suivant
                        </Button>
                    </CoolMode>
                </div>

                {displayParicle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Particles
                            className="absolute inset-0 z-0"
                            quantity={100}
                            ease={80}
                            color={"#ffffff"}
                            refresh
                        />
                    </motion.div>
                )}
            </ContentLayout>
        </QuestionsProvider>
    );
};

export default Home;