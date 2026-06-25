import './Home.css';
import Sidebar from '../../../../shared/components/molecules/Sidebar/Sidebar';
import Card from '../components/Card/Card';
import useProjectsHome from '../hooks/useProjectsHome';
import { useState } from 'react';
import { PiPlus } from 'react-icons/pi'
import Over from '../../../../shared/components/molecules/Over/Over';
import type { Project } from '../../../domain/entities/Project';
import DelForm from '../components/DelForm/DelForm';
import Create from '../components/Create/Create';

export default function Home() {
    const { projects, onFind, onUpdate } = useProjectsHome();
    const [openPanel, setOpenPanel] = useState<Project | null>(null);
    const [openCreate, setOpenCreate] = useState<boolean>(false);

    return (
        <>
            {openCreate && <Over content={<Create onClose={() => setOpenCreate(false)}/>} />}
            {openPanel && <Over content={<DelForm project={openPanel} onUpdate={onUpdate} onClose={() => setOpenPanel(null)} />} />}
            <div className='Home page'>
                <Sidebar />
                <div className='content'>
                    <p className='title' style={{ width: "95%" }}>Mis proyectos</p>
                    <div className='projects'>
                        <input className='searcher' type="text" placeholder='Buscar...' onChange={onFind} />
                        <div className='track'>
                            <div className='create' onClick={() => setOpenCreate(true)}>
                                <PiPlus />
                            </div>
                            {
                                projects.length > 0 ? projects?.map(p => (
                                    <Card
                                        project={p}
                                        key={p.id}
                                        onDelete={(p) => { setOpenPanel(p) }}
                                    />
                                )) :
                                    <div>
                                        <p className='subtitle'>No se encontraron proyectos</p>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='second-panel'>
                        <p>Aún no hay avances</p>
                    </div>
                </div>
            </div>
        </>
    );
}