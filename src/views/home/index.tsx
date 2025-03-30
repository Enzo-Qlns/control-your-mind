import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import TitleRotate from "./text-rotate";

import routes from "@/route";

import ContentLayout from "@/components/content-layout";

const HomePage = (): React.ReactNode => {
    return (
        <ContentLayout className="flex flex-col items-center justify-center w-full h-dvh">
            <TitleRotate />
            <NavLink to={routes.QUESTIONS}>
                <Button
                    size={"lg"}
                >
                    Commencer
                </Button>
            </NavLink>
        </ContentLayout>
    );
}

export default HomePage;