import 'bootstrap/dist/css/bootstrap.min.css';
import 'maplibre-gl/dist/maplibre-gl.css';

import { BrowserRouter, Route, Routes} from 'react-router';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/app.tsx'
import SUHIPage from './app/routes/suhi.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/suhi" element={<SUHIPage />} />
        </Routes>
    </BrowserRouter>
)
