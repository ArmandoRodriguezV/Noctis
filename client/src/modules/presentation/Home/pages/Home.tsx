import Sidebar from '../../../../shared/components/molecules/Sidebar/Sidebar';
import useProjectsHome from '../hooks/useProjectsHome';
import './Home.css';

export default function Home() {
    const { projects } = useProjectsHome();
    return (
        <div className='Home page'>
            <Sidebar />
            <div className='content'>
                { projects?.map((p) => (
                    <div>
                        {p.name}
                        {p.description}
                    </div>
                )) }
            </div>
        </div>
    );
}