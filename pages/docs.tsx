import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

function ApiDoc() {
    return (
        <div className="bg-white min-h-screen text-black">
            <SwaggerUI url="/api/docs" />
        </div>
    );
}

export default ApiDoc;
