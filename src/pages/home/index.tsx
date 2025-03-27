import React, {
    useEffect,
    useState
} from 'react';
import {
    motion,
    AnimatePresence
} from 'framer-motion';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCardSubtitle,
} from '@ionic/react';

import questions from '../../ressources/questions.json';

import PWAInstallPrompt from './pwa-install-prompt';

const Home: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [questionsIdAnswered, setQuestionsIdAnswered] = useState<Array<number>>([]);
    const [isEnd, setIsEnd] = useState<boolean>(false);


    const nextQuestion = () => {
        if (questionsIdAnswered.length === questions.length) {
            alert('Vous avez répondu à toutes les questions');
            setIsEnd(true);
            return;
        }

        const getRandomIndex = (): number => {
            const randomIndex = Math.floor(Math.random() * questions.length);
            // Vérifier que la question n'a pas déjà été répondue
            return questionsIdAnswered.includes(randomIndex) ? getRandomIndex() : randomIndex;
        };

        const randomIndex = getRandomIndex();
        setCurrentIndex(randomIndex);
        setQuestionsIdAnswered([...questionsIdAnswered, randomIndex]);
    };

    const end = () => {
        // Réinitialiser l'état pour revenir au début
        setQuestionsIdAnswered([]);
        setCurrentIndex(0); // Réinitialiser le currentIndex ici
        setIsEnd(false);
        nextQuestion();  // Recommencer avec une nouvelle question
    };

    useEffect(() => {
        nextQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Controls your mind</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding" style={{ position: 'relative' }} scrollY={false}>
                <div className="flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <IonCard className="ion-padding">
                                <IonCardHeader>
                                    <IonCardTitle className="text-xl">{questions[currentIndex]}</IonCardTitle>
                                    <IonCardSubtitle>
                                        Question
                                    </IonCardSubtitle>
                                </IonCardHeader>
                            </IonCard>
                        </motion.div>
                    </AnimatePresence>

                    {/* Button at the bottom */}
                    {isEnd ? (
                        <IonButton
                            expand="block"
                            onClick={end}
                            style={{
                                position: 'absolute',
                                bottom: '20px', // Adjust to your liking
                                width: '90%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            Revenir au début
                        </IonButton>
                    ) : (
                        <IonButton
                            expand="block"
                            onClick={nextQuestion}
                            style={{
                                position: 'absolute',
                                bottom: '20px', // Adjust to your liking
                                width: '90%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            Suivant
                        </IonButton>
                    )}
                </div>
            </IonContent>

            <PWAInstallPrompt />

        </IonPage>
    );
};

export default Home;
