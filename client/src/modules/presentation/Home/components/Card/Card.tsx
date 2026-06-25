import './Card.css';
import { PiTrash, PiArchive, PiClock, PiFolder } from 'react-icons/pi';
import { AiOutlineTeam } from "react-icons/ai";
import { MdOutlineUnarchive } from "react-icons/md";
import type { Project } from '../../../../domain/entities/Project';
import MiniBtn from '../MiniBtn/MiniBtn';
import { timeAgo } from '../../../../../shared/utils/time';
import useProjectsHome from '../../hooks/useProjectsHome';

interface ICard {
    project: Project;
    onDelete: (project: Project) => void;
    onUpdate: () => void;
}

export default function Card(props: ICard) {
    const isArchive: boolean = props.project.isArchiver == 1;
    const accessLevel: number = props.project.access;
    const { archiveProject } = useProjectsHome();

    return (
        <div className='Card container-1'>
            <p className='back-icon'>{isArchive ? < PiArchive /> : <PiFolder />}</p>
            <div className='head-card'>
                <p className='subtitle'><strong>{props.project.name}</strong></p>
                <p className='sub1 info'>
                    {timeAgo(Number(props.project.createdAt))}
                    <span><PiClock /></span>
                    {isArchive ? <span><PiArchive /></span> : <span><PiFolder /></span>}
                    {accessLevel !== 1 && <span><AiOutlineTeam /> </span>}
                </p>
            </div>
            <p className='content-data' >{props.project.description}</p>
            {
                accessLevel === 1 &&
                <div className='options'>
                    <MiniBtn customClass='del-btn' icon={<PiTrash />} onClick={() => props.onDelete(props.project)} text='Borrar' />
                    <MiniBtn icon={
                        isArchive ? <MdOutlineUnarchive /> : <PiArchive />
                    } onClick={async () => { await archiveProject(props.project.id, props.onUpdate) }} text={isArchive ? 'Desarchivar' : 'Archivar'} />
                </div>
            }
        </div>
    );
}