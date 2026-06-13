import { useEffect, useState } from "react";
import type { Project } from "../../../domain/entities/Project";
import { getMyProjectsUc } from "../../../infrastructure/di/ProjectDi";

export default function useProjectsHome() {
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
        const get = async () => {
            const apiProjects = await getMyProjectsUc.exec();
            setProjects(apiProjects.content);
        }
        get();
    }, []);

    return { projects };
}