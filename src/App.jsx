import { useRecoilState } from "recoil"
import page from "./atoms/PageAtom"
import Contact from "./components/Contact"
import Contacts from "./components/Contacts"
import Container from "./components/Container"
import Header from "./components/Header"

function App() {
  const [active, setActive] = useRecoilState(page)
  return (
    <>
      <Container >
        <Header />
        {
          active !== 'inbox' && active !== 'archive' ?
            <Contact id={active} />
            :
            <Contacts />
        }

      </Container>
    </>
  )
}

export default App
