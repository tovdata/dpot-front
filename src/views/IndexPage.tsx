import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Pages
import PIIPage from './PIIPage';
import PIIAddPage from './PIIAddPage';

const IndexPage = (): JSX.Element => {
  // Return an element
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/pii/add' element={<PIIAddPage />}></Route>
        <Route path='/pii/view' element={<PIIPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default IndexPage;