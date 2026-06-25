import { useEffect, useState } from "react";
import type { Project } from "../../../domain/entities/Project";
import { deleteProjectUc, getMyProjectsUc } from "../../../infrastructure/di/ProjectDi";
import { useNotification } from "../../../../shared/context/NotificationCtx";
import type { ApiResponse } from "../../../../shared/routes/Response";

export default function useProjectsHome() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [update, setUpdate] = useState<boolean>(false);
    const { pushNotification } = useNotification();

    useEffect(() => {
        const get = async () => {
            const apiProjects = await getMyProjectsUc.exec();
            const data = apiProjects.content!;

            setProjects(data);
            setFilteredProjects(data);
        };

        get();
        console.log("Actualizado")
    }, [update]);

    const onFind = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase().trim();

        if (!value) {
            setFilteredProjects(projects);
            return;
        }

        const result = projects.filter((project) =>
            project.name.toLowerCase().includes(value)
        );

        setFilteredProjects(result);
    };

    const deleteProject = async (id: number, upd: () => void, cls: () => void) => {
        try {
            const res = await deleteProjectUc.exec(id);
            pushNotification(res as ApiResponse<void>);
            upd();
            setTimeout(() => {
                cls();
            }, 500);
        } catch (err) {
            pushNotification(err as ApiResponse<void>);
        }
    }

    const onUpdate = () => {
        setUpdate(!update)
    }

    return { projects: filteredProjects, onFind, onUpdate, deleteProject };
}