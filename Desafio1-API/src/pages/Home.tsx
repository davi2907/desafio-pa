import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className='bg-black min-h-screen'>

            <h1 className='text-5xl font-semibold text-white text-center p-7'>Escolha o Script</h1>

            <div className='flex justify-center pt-10 space-x-10'>
                <button
                    className='text-white text-2xl font-semibold px-6 py-3 hover:text-blue-500 hover:underline border border-white rounded-md'
                    onClick={() => navigate('/script1')}>Script 1</button>
                <button
                    className='text-white text-2xl font-semibold px-6 py-3 hover:text-blue-500 hover:underline border border-white rounded-md'
                    onClick={() => navigate('/script2')}>Script 2</button>
                <button
                    className='text-white text-2xl font-semibold px-6 py-3 hover:text-blue-500 hover:underline border border-white rounded-md'
                    onClick={() => navigate('/script3')}>Script 3</button>
            </div>
        </div>
    );
}
