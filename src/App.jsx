import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contatct";
import NewProject from "./components/pages/NewProject";
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";
import CustoTotal from './components/pages/custototal'



function App() {
  return (

    <Router>
      <Navbar />
      <Container >
        <Routes className='minHeigth'>
          <Route exact path="/" element= {< Home />}/>
          <Route path="/company" element= {< Company />}/>
          <Route path="/contact" element= {< Contact />}/>
          <Route path="/newproject" element= {< NewProject />}/>
          <Route path='/projects' element= {<Projects />}/>
          <Route path='/project/:id' element= {<Project />}/>
          <Route path="/custototal" element= {<CustoTotal />}/>
        </Routes>
      </Container>

      <Footer></Footer>

    </Router>
  );
}

export default App;