import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Pages
import TestLucy from './TestLucy';
import TestMin from './TestMin';
import TestPI from './TestPI';

const IndexPage = (): JSX.Element => {
  // Return an element
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/test/lucy' element={<TestLucy />}></Route>
        <Route path='/test/min' element={<TestMin />}></Route>
        <Route path='/test/pi' element={<TestPI />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default IndexPage;