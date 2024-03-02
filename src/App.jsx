import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contatct";
import NewProject from "./components/pages/NewProject";
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Projects from "./components/pages/Projects";



function App() {
  return (

    <Router>
      <Navbar />
      <Container >
        <Routes className='minHeigth'>
          <Route path="/" element= {< Home />}/>
          <Route path="/company" element= {< Company />}/>
          <Route path="/contact" element= {< Contact />}/>
          <Route path="/newproject" element= {< NewProject />}/>
          <Route path='/projects' element= {<Projects />}/>
        </Routes>
      </Container>

      <Footer></Footer>

    </Router>
  );
}

export default App;