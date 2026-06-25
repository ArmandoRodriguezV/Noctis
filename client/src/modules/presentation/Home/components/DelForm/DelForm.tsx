import './DelForm.css';
import type { Project } from '../../../../domain/entities/Project';
import useProjectsHome from '../../hooks/useProjectsHome';

interface IDelForm {
    project: Project;
    onClose: () => void;
    onUpdate: () => void;
}

export default function DelForm(props: IDelForm) {
    const { deleteProject } = useProjectsHome();
    return (
        <div className='DelForm container-1'>
            <p className='subtitle'>¿Estas seguro de borrar <strong>{props.project.name}</strong>?</p>
            <p style={{ color: "#ff4040" }}>Este proceso es irreversible</p>
            <div className='actions'>
                <button className='del' onClick={async () => deleteProject(props.project.id, props.onUpdate, props.onClose)}>Eliminar</button>
                <button onClick={props.onClose} className='cls' >Cancelar</button>
            </div>
        </div>
    );
}