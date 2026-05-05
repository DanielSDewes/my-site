import { useSmoothScroll } from './hooks/useSmoothScroll';

import CustomCursor    from './components/CustomCursor';
import ScrollProgress  from './components/ScrollProgress';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import About           from './components/About';
import Skills          from './components/Skills';
import Experience      from './components/Experience';
import Projects        from './components/Projects';
import GithubStats     from './components/GithubStats';
import Contact         from './components/Contact';
import CodeRacer       from './components/CodeRacer';
import Footer          from './components/Footer';
import Divider         from './components/Divider';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <GithubStats />
        <Divider />
        <Contact />
        <Divider />
        <CodeRacer />
        <Divider />
      </main>
      <Footer />
    </>
  );
}
